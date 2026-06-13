from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class SubscribeCreate(BaseModel):
    email: EmailStr


class Subscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class DecodeRequest(BaseModel):
    text: str = Field(..., min_length=4, max_length=1200)


class DecodeResponse(BaseModel):
    translation: str
    confidence: int
    flagged_phrases: List[str] = []


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Decoded API is live"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/subscribe", response_model=Subscriber)
async def subscribe(payload: SubscribeCreate):
    email = payload.email.lower().strip()

    existing = await db.subscribers.find_one({"email": email}, {"_id": 0})
    if existing:
        # idempotent: return existing record so UX still shows success
        if isinstance(existing.get("created_at"), str):
            existing["created_at"] = datetime.fromisoformat(existing["created_at"])
        return Subscriber(**existing)

    sub = Subscriber(email=email)
    doc = sub.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.subscribers.insert_one(doc)
    return sub


@api_router.get("/subscribers/count")
async def subscribers_count():
    count = await db.subscribers.count_documents({})
    return {"count": count}


DECODE_SYSTEM_PROMPT = """You are Decoded — a tool that rewrites corporate earnings-call jargon into blunt, plain English.

Given a single sentence or paragraph from an earnings call, you must:
1. Translate it into 1-2 short sentences of plain, direct English. Be honest, not diplomatic. Use everyday words. Do not soften the message. Do not add caveats. If management is hedging, say so plainly (e.g. "Sales are down and they have no fix yet").
2. Identify the specific jargon/hedge phrases from the original text (exact substrings).
3. Score a Confidence Index from 0 to 100 — how trustworthy / non-evasive the original statement is. 0 = pure spin, 100 = blunt and specific.

Respond with ONLY a valid JSON object — no prose, no markdown fences — in this exact shape:
{"translation": "<plain english>", "confidence": <int 0-100>, "flagged_phrases": ["<phrase1>", "<phrase2>"]}"""


@api_router.post("/decode", response_model=DecodeResponse)
async def decode(payload: DecodeRequest):
    api_key = os.environ.get("EMERGENT_LLM_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    try:
        chat = LlmChat(
            api_key=api_key,
            session_id=f"decode-{uuid.uuid4()}",
            system_message=DECODE_SYSTEM_PROMPT,
        ).with_model("anthropic", "claude-sonnet-4-6")

        user_message = UserMessage(text=payload.text.strip())
        raw = await chat.send_message(user_message)
    except Exception as e:
        logger.exception("LLM call failed")
        raise HTTPException(status_code=502, detail=f"Translation engine unavailable: {e}")

    # Extract text content from response (may be str or object)
    text = raw if isinstance(raw, str) else getattr(raw, "content", str(raw))
    text = text.strip()

    # Strip code fences if model wrapped JSON in them
    if text.startswith("```"):
        text = text.strip("`")
        if text.lower().startswith("json"):
            text = text[4:]
        text = text.strip()

    # Pull the JSON object out (model may add stray prose)
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1:
        raise HTTPException(status_code=502, detail="Could not parse model response")

    try:
        data = json.loads(text[start : end + 1])
    except json.JSONDecodeError as e:
        logger.error("JSON decode failed: %s | raw=%s", e, text)
        raise HTTPException(status_code=502, detail="Malformed model response")

    translation = str(data.get("translation", "")).strip()
    try:
        confidence = int(data.get("confidence", 0))
    except (TypeError, ValueError):
        confidence = 0
    confidence = max(0, min(100, confidence))
    flagged = [str(p) for p in (data.get("flagged_phrases") or []) if str(p).strip()]

    if not translation:
        raise HTTPException(status_code=502, detail="Empty translation from model")

    return DecodeResponse(
        translation=translation,
        confidence=confidence,
        flagged_phrases=flagged,
    )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

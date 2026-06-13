"""Backend tests for Decoded API: /api/subscribe and /api/subscribers/count"""
import os
import uuid
import pytest
import requests
from datetime import datetime

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://plain-speak-28.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_root_health(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data


# ---------- Subscribe: valid email ----------
def test_subscribe_valid_email_creates_record(session):
    email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    r = session.post(f"{API}/subscribe", json={"email": email})
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert data["email"] == email.lower()
    assert "created_at" in data
    # parseable ISO datetime
    datetime.fromisoformat(data["created_at"].replace("Z", "+00:00"))


# ---------- Subscribe: invalid email format ----------
def test_subscribe_invalid_email_returns_422(session):
    r = session.post(f"{API}/subscribe", json={"email": "not-an-email"})
    assert r.status_code == 422, r.text


# ---------- Subscribe: idempotency ----------
def test_subscribe_idempotent_for_duplicate_email(session):
    email = f"idemp_{uuid.uuid4().hex[:8]}@example.com"
    r1 = session.post(f"{API}/subscribe", json={"email": email})
    assert r1.status_code == 200, r1.text
    d1 = r1.json()

    r2 = session.post(f"{API}/subscribe", json={"email": email})
    assert r2.status_code == 200, r2.text
    d2 = r2.json()

    # Same email, same id (idempotent - returns existing record)
    assert d1["email"] == d2["email"]
    assert d1["id"] == d2["id"], "Idempotent subscribe should return same record id"


# ---------- Subscribe: case insensitivity (email lowercased) ----------
def test_subscribe_email_normalized_to_lowercase(session):
    email_upper = f"MIXED_{uuid.uuid4().hex[:6]}@Example.COM"
    r = session.post(f"{API}/subscribe", json={"email": email_upper})
    assert r.status_code == 200, r.text
    assert r.json()["email"] == email_upper.lower()


# ---------- Subscribers count ----------
def test_subscribers_count_returns_int(session):
    r = session.get(f"{API}/subscribers/count")
    assert r.status_code == 200, r.text
    data = r.json()
    assert "count" in data
    assert isinstance(data["count"], int)
    assert data["count"] >= 0


def test_subscribers_count_increments_after_new_subscribe(session):
    before = session.get(f"{API}/subscribers/count").json()["count"]
    email = f"count_{uuid.uuid4().hex[:8]}@example.com"
    r = session.post(f"{API}/subscribe", json={"email": email})
    assert r.status_code == 200
    after = session.get(f"{API}/subscribers/count").json()["count"]
    assert after == before + 1, f"Expected count to be {before+1}, got {after}"


# ---------- Subscribe: missing field ----------
def test_subscribe_missing_email_returns_422(session):
    r = session.post(f"{API}/subscribe", json={})
    assert r.status_code == 422

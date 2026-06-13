"""Backend tests for Decoded API: /api/decode (Claude Sonnet via Emergent LLM).

Asserts shape + ranges, not exact text. LLM calls take ~3-8s, so timeout=45s.
"""
import os
import pytest
import requests

BASE_URL = os.environ.get(
    "REACT_APP_BACKEND_URL", "https://plain-speak-28.preview.emergentagent.com"
).rstrip("/")
API = f"{BASE_URL}/api"

LLM_TIMEOUT = 60


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- /api/decode: valid jargon input ----------
def test_decode_valid_jargon_returns_shape(session):
    payload = {
        "text": "We're taking a prudent approach to capital allocation as we recalibrate spend across priority workstreams."
    }
    r = session.post(f"{API}/decode", json=payload, timeout=LLM_TIMEOUT)
    assert r.status_code == 200, f"status={r.status_code} body={r.text}"
    data = r.json()

    # Required keys present
    assert "translation" in data
    assert "confidence" in data
    assert "flagged_phrases" in data

    # Types
    assert isinstance(data["translation"], str)
    assert isinstance(data["confidence"], int)
    assert isinstance(data["flagged_phrases"], list)
    for p in data["flagged_phrases"]:
        assert isinstance(p, str)

    # Ranges / non-empty
    assert len(data["translation"].strip()) > 0, "translation must be non-empty"
    assert 0 <= data["confidence"] <= 100, f"confidence out of range: {data['confidence']}"


# ---------- /api/decode: too short rejected ----------
def test_decode_too_short_returns_422(session):
    r = session.post(f"{API}/decode", json={"text": "hi"}, timeout=LLM_TIMEOUT)
    assert r.status_code == 422, r.text


# ---------- /api/decode: empty string rejected ----------
def test_decode_empty_returns_422(session):
    r = session.post(f"{API}/decode", json={"text": ""}, timeout=LLM_TIMEOUT)
    assert r.status_code == 422, r.text


# ---------- /api/decode: too long rejected ----------
def test_decode_too_long_returns_422(session):
    long_text = "blah " * 400  # ~2000 chars
    r = session.post(f"{API}/decode", json={"text": long_text}, timeout=LLM_TIMEOUT)
    assert r.status_code == 422, r.text


# ---------- /api/decode: blunt non-jargon text still returns valid JSON ----------
def test_decode_blunt_text_returns_valid_json(session):
    payload = {"text": "Our revenue grew 12 percent year over year to 4.2 billion dollars."}
    r = session.post(f"{API}/decode", json=payload, timeout=LLM_TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert isinstance(data["translation"], str) and len(data["translation"].strip()) > 0
    assert isinstance(data["confidence"], int)
    assert 0 <= data["confidence"] <= 100
    assert isinstance(data["flagged_phrases"], list)


# ---------- /api/decode: missing field rejected ----------
def test_decode_missing_text_returns_422(session):
    r = session.post(f"{API}/decode", json={}, timeout=LLM_TIMEOUT)
    assert r.status_code == 422, r.text

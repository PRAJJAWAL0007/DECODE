# Decoded — Landing Page PRD

## Original Problem Statement
Landing page for "Decoded" — a tool that translates corporate earnings-call jargon into plain English (e.g., "navigating near-term headwinds" → "sales are down and we don't have a fix yet").

Design: editorial/document aesthetic, redacted financial document. Cream paper (#F1EFE7), navy ink (#0B1F2A), stamp-red accent (#C1442D). Serif display (Cormorant Garamond) + monospace (IBM Plex Mono).

## User Choices (explicit)
- Email signup → stored to MongoDB via `POST /api/subscribe`
- "Decode a Transcript" CTA → smooth-scrolls to footer signup
- Editorial-style subtle motion (Framer Motion: fade-up, stamp roll-in, document card lift on hover)

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + sonner (toast). Routes: `/` → `Landing.jsx`.
- **Backend**: FastAPI under `/api`, MongoDB (motor), Pydantic v2.
- **Endpoints**:
  - `POST /api/subscribe` — { email } → Subscriber. Idempotent on duplicate.
  - `GET  /api/subscribers/count` — { count }.
  - `GET/POST /api/status` — legacy health endpoints.

## Components Built
- `Nav.jsx` — sticky nav, logo + Request Access btn (scrolls to signup)
- `Hero.jsx` — H1 "What they said. What it actually means.", side margin notes (§01 Premise / §02 Method), primary CTA
- `DocumentCard.jsx` — 3 jargon→translation specimens, struck-through quotes, "TRANSLATION →" labels, rotated DECODED stamp with animated entry, per-item Confidence Index bar
- `Features.jsx` — 3-column 01 Detect / 02 Translate / 03 Score with hover red title transition
- `SocialProof.jsx` — 4 audience pills (Buy-Side Analysts, Fintwit, Newsletter Writers, Equity Research)
- `Ticker.jsx` — infinite-scrolling row of struck-through jargon phrases (extra editorial touch)
- `Footer.jsx` — dark navy section, "Get early access to Decoded" headline, email form → POST /api/subscribe, sonner toasts

## What's Implemented (2026-06-13)
- Full single-page landing with 7 sections
- MongoDB-backed email signup, idempotent on duplicates
- Sonner toasts (success/error) styled to match palette
- Responsive at 390 / 768 / 1920 px (verified, zero horizontal overflow)
- All `data-testid` attributes per design spec
- Tested: 8/8 backend + 100% frontend (see `/app/test_reports/iteration_1.json`)

## Backlog / Next Action Items
- **P1**: Add a "decode my own transcript" textarea/upload flow (currently CTA only scrolls to signup)
- **P1**: Admin dashboard view of subscribers (export CSV)
- **P2**: Add unique index on `subscribers.email` at MongoDB level
- **P2**: Live demo widget — paste a sentence, get an instant LLM-powered translation (would need LLM integration)
- **P2**: Add OG/meta tags + favicon for shareability
- **P3**: A/B test alternate hero copy

# Product Brief — Manifestation Algorithm

**Version:** 1.0  
**Date:** 2026-02-22  
**Status:** Active  
**Owner:** Product Team

---

## 1. What Is It?

**Manifestation Algorithm** is a privacy-first, offline desktop app that helps individuals
quantify and track their personal alignment across 40 life categories through a structured
10-point self-assessment questionnaire.

The app produces a single **Manifestation Score** (0 – 10,000 points) that serves as an
objective, repeatable measure of a user's overall alignment with their chosen principles
and practices. Over time, the score history shows whether a person is improving, plateauing,
or declining across the full breadth of their self-development work.

**Platform:** macOS, Windows, Linux _(Tauri 2 desktop app — no cloud, no account)_

---

## 2. The Problem It Solves

| Pain Point | Existing Solutions | Our Approach |
|---|---|---|
| Tracking apps are narrow (sleep OR fitness OR journaling) | Siloed single-category apps | One score across 40 categories |
| Cloud-first apps require trusting a company with private data | Notion, Airtable, Superhuman | SQLite on-device, zero telemetry |
| "Score" systems are opaque or gamified | Duolingo streaks, mood apps | Transparent weighted formula, fully documented |
| No tool maps to manifestation / alignment frameworks | Generic productivity trackers | Purpose-built 40-category schema |

---

## 3. Target Users

### Primary — The Intentional Practitioner
- **Profile:** High-tech-comfort, 28–45, deeply invested in personal development
- **Frequency:** Weekly assessment (Sunday morning ritual)
- **Core need:** A single honest number that reflects total alignment, not just one area
- **Privacy:** Strongly prefers local-only; willing to opt into anonymous P2P benchmarking

### Secondary — The Curious Newcomer
- **Profile:** Medium-tech-comfort, 22–35, new to structured self-assessment
- **Frequency:** Infrequent initially, growing with familiarity
- **Core need:** Low-friction entry; ability to submit with partial answers
- **Privacy:** Appreciates default privacy; may not understand the P2P feature yet

_See `/docs/user-personas.md` for full persona detail._

---

## 4. Scoring Model

The **Manifestation Score** is calculated as:

$$\text{Total Score} = \sum_{i=1}^{N} \text{MaxPoints}_i \times \frac{\text{UserRating}_i}{10}$$

- **40 categories** mapped to leaf questions, each weighted by maximum point value
- **Max score: 10,000 points**
- **Scale:** 0–10 per question (user-chosen; no answer defaults to 0 on submit)
- **Score tiers:** Excellent (> 7,000) · Good (4,000–7,000) · Needs Work (< 4,000)

_See `/docs/scoring-formula.md` for full specification._  
_See `ADR-006` for the decision to allow partial submissions with a minimum default._

---

## 5. Core Feature Set (v1.0)

| Feature | Status |
|---|---|
| 40-category questionnaire (scroll + step modes) | ✅ Shipped |
| Manifestation Score with quality tier | ✅ Shipped |
| Session history with date-range filtering | ✅ Shipped |
| Category breakdown sparklines + trend detection | ✅ Shipped |
| Excel / CSV / PDF / HTML export | ✅ Shipped |
| Clipboard chart copy | ✅ Shipped |
| Chart fullscreen mode | ✅ Shipped |
| Keyboard shortcuts (digit keys 1–0 for quick rating) | ✅ Shipped |
| Anonymous P2P peer ranking via libp2p | ✅ Shipped |
| Auto-updater (Tauri updater) | ✅ Shipped (pending prod key) |
| First-run onboarding screen | 📋 v1.0 target |
| Category improvement recommendations | 📋 v1.0 target |

---

## 6. Non-Goals (v1.0)

- Mobile app (web or native)
- Cloud sync or account creation
- Social sharing of individual scores (anonymous aggregate only)
- AI-generated recommendations
- Gamification (badges, streaks, leaderboards)

---

## 7. Success Metrics (v1.0)

| Metric | Target |
|---|---|
| 7-day retention (returns for second assessment) | > 40 % |
| Completion rate (answered all 40 categories) | > 60 % of sessions |
| Crash-free sessions | > 99 % |
| Test coverage | 100 % unit · all E2E green |
| App bundle size | < 50 MB |

---

## 8. v1.0 Definition

v1.0 is declared "done" when:
1. First-run onboarding explains the scoring model before first submit
2. Post-submission category recommendations are displayed on the Dashboard
3. The tauri updater pubkey is replaced with a valid signing key
4. All P0 and P1 issues from the multi-agent review are closed

---

## 9. Key Constraints

- **No network writes without explicit user opt-in** — the P2P sharing toggle defaults to off
- **All personal data stays on disk** — no analytics, no crash reporting to external servers
- **The scoring formula is transparent** — fully open-source; no hidden weighting
- **Must run offline** — all features except P2P ranking work without internet

---

## 10. Related Documents

| Document | Location |
|---|---|
| Architecture decisions | `_bmad-output/planning-artifacts/ADR-001 … ADR-006` |
| Scoring formula | `docs/scoring-formula.md` |
| Database schema | `docs/database.md` |
| Network architecture | `docs/network-architecture.md` |
| User personas | `docs/user-personas.md` |
| Roadmap | `ROADMAP.md` |

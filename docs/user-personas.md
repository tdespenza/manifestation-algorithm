# User Personas — Manifestation Algorithm

**Created:** 2026-02-21  
**Version:** 1.0

---

## Primary Persona: The Intentional Practitioner

**Name:** Jordan, 34  
**Occupation:** Software engineer, part-time entrepreneur  
**Tech comfort:** High — uses Homebrew, terminal, productivity apps

### Background
Jordan is deeply invested in personal development. They've read broadly on mindset, intentions, habits, and manifestation practices. They track their reading, workouts, and journaling with apps like Obsidian and Apple Health, but haven't found a tool that quantifies their alignment across the full breadth of their practice — not just fitness or productivity in isolation.

### Goals
- **Measure comprehensively** — Want a single score that reflects their overall alignment, not just one dimension
- **Track change over time** — Need to see whether their practices are improving or declining week-over-week
- **Stay private** — Uncomfortable with cloud sync; strongly prefers local storage
- **Benchmark anonymously** — Curious how their score compares to peers, but not willing to share identity

### Pain Points
- Most tracking apps are narrow (only sleep, only workouts, only finances)
- Cloud-first apps require trusting a company with personal data
- Most "score" systems are opaque or gamified without real meaning behind the number
- No existing tool maps to their conceptual framework around manifestation principles

### How They Use The App
1. Opens the app weekly, on Sunday mornings
2. Completes the full 40-category questionnaire (~10 minutes)
3. Checks the Dashboard for their score trend
4. Notes which categories declined since last week
5. Opts in to anonymous P2P ranking to see how they compare globally

### Quote
> "I want to know where I actually am, not just feel like I'm doing well. Give me the number."

---

## Secondary Persona: The Curious Newcomer

**Name:** Morgan, 27  
**Occupation:** Marketing coordinator  
**Tech comfort:** Medium — comfortable with apps but not power user

### Background
Morgan came across the app via a personal development community online. They're new to structured self-assessment and find the idea of "scoring" their life both intriguing and slightly intimidating. They aren't sure they'll answer every question or fully understand the scoring system.

### Goals
- **Explore the concept** — Want to try a full self-assessment without committing
- **Understand what scores mean** — Need clear explanation of what "7,200 points" actually signifies
- **Low friction** — Prefers to skip questions they don't understand rather than block on them

### Pain Points
- Jargon-heavy interfaces are off-putting
- Not knowing what happens after submitting creates hesitation
- Long questionnaires feel like homework without visible progress

### How They Use The App
1. Launches the app and scrolls through the questions quickly the first time
2. Answers only the categories they feel confident about (~50%)
3. Submits and checks the Dashboard to see a score for the first time
4. Returns a week later after reading the scoring documentation
5. Does a full assessment the second time

### Quote
> "I don't know what half of these categories mean yet, but I want to see where I land."

---

## Out-of-Scope Persona (NOT the primary target): The Skeptic

**Characteristics:** Doesn't believe in manifestation as a concept, views self-assessment tools as fluff, prefers empirical productivity metrics (time tracking, OKRs)

**Why out of scope:** The product is built on the premise that self-assessment against the 40 categories is meaningful. Users who reject the conceptual framework will not find value in the score. This is an intentional product decision.

---

## Design Implications

| Persona | Design Priority |
|---|---|
| Intentional Practitioner | Efficient re-assessment flow, history charts, P2P ranking visibility |
| Curious Newcomer | Onboarding explanation, score meaning, partial completion support |
| Both | Privacy-first, offline-first, no sign-up |

### Key UX Requirements Derived From Personas
1. **Score context** — Show what the score means (the tier labels: Starting Out → Manifesting) immediately
2. **Progress visibility** — Show answered vs. unanswered count at all times  
3. **Partial submit OK** — Never block submission; default unanswered to minimum
4. **Trend chart** — Jordan's primary retention hook; must be prominent on Dashboard
5. **Category breakdown** — Let both personas identify specific areas to improve
6. **Onboarding** (future) — Brief explanation of the scoring framework for Morgan

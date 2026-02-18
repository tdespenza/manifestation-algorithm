# ADR-005: Privacy-First Architecture - Zero PII Collection by Design

**Date**: 2026-02-18  
**Status**: Accepted  
**Context**: Building user trust through explicit non-collection of personal data  
**Deciders**: Product Lead, Security Lead, Privacy Officer  

---

## Problem Statement

Most applications collect user data for:
- Analytics (improvement)
- Monetization (selling data)
- Legal liability (terms of service)

For a free application intended to help with personal development, data collection creates:
- Privacy risk (stolen data)
- Trust problem (sell data? government req?)
- Legal burden (GDPR, CCPA compliance)
- Ethical dilemma (whose benefit?)

The Manifestation Algorithm solves this through architectural constraints.

---

## Decision

**Design the application to make PII collection impossible—not just discouraged, but architecturally impossible.**

This means:
- No login/registration system (can't collect names, emails)
- No user tracking or identifiers
- No telemetry or analytics
- No cookies, localStorage for tracking
- No central server (can't intercept)
- Data stays on user's device
- Network sharing is anonymous by default

---

## Rationale

### Trust is the Core Asset
- Users share sensitive goals and aspirations in questionnaire
- If we collect data, users naturally assume tracking
- Even if we promise no tracking, nobody believes it (tech industry burned trust)
- Only solution: Make tracking technically impossible
- **Advantage**: User knows we can't share data because architecture prevents it

### Legal Simplicity
- **No PII collection** → No GDPR/CCPA compliance burden
- **No server** → No data breach liability
- **No tracking** → No privacy policy needed
- **No insurance** → No legal overhead
- **Advantage**: Dramatically simpler to operate (no lawyers needed)

### Feature Parity Without Data
- **Alternative apps track**: Learning from user behavior
- **Us**: Provide same insights through questionnaire design
  - Questions reveal patterns better than tracking
  - User self-reports more accurate than inferred
  - Fewer confounding variables
- **Advantage**: Better analytics without data collection

### Philosophical Alignment
The application helps users manifest their goals. If we're secretly collecting their data:
- **Contradiction**: What are we manifesting? Their loss of privacy
- **Instead**: Model the behavior we're teaching
- **Advantage**: Values alignment with mission

### Monetization Model Clarity
- **No data collection** → Can never be tempted to "monetize data"
- **Only option**: Transparent charging (subscription, premium)
- **We chosen**: Completely free (no monetization needed)
- **Advantage**: No future conflicts of interest

---

## Consequences

### Positive
✅ User trust: Users know data can't be shared  
✅ Legal simplicity: No GDPR/CCPA burden  
✅ Ethical integrity: Values match behavior  
✅ Hacker-proof: No database to steal  
✅ Government-proof: Can't hand over what we don't have  
✅ Marketing advantage: Privacy-first attracts users  
✅ No privacy policy needed: Architecture provides guarantees  

### Negative
❌ No analytics: Can't measure user behavior  
❌ Product decisions harder: Must guess or ask users directly  
❌ A/B testing impossible: Can't track user cohorts  
❌ Feature usage unknown: Rely on feedback, not metrics  
❌ Slower optimization: No data to drive decisions  

### Mitigation Strategies
- **Surveys**: Ask users directly (quarterly, optional)
- **Feedback form**: In-app option to share thoughts
- **GitHub issues**: Community reports bugs/suggestions
- **Reddit**: Monitor r/ManifestationAlgorithm for discussions
- **Local analytics**: Opt-in anonymized event logging (if needed)

---

## Technical Implementation

### What's NEVER Collected
```
❌ Name, email, phone
❌ IP address (IPFS routing is anonymous)
❌ Device ID, MAC address, Hardware serial
❌ Location (beyond optional timezone)
❌ Exact timestamp (day-precision only)
❌ Device identifiers (IDFA, GAID)
❌ Browser fingerprint
❌ User habits or patterns
❌ API keys or credentials
❌ Diagnostic data
```

### What's ONLY Local
```
✅ Questionnaire responses
✅ Calculated scores
✅ User preferences (theme, language)
✅ Session state
✅ Auto-saved drafts
```

### What's OPTIONALLY Shared
```
⚪ Anonymous results (timestamps, scores, no identity)
   - User must explicitly opt-in
   - Can disable anytime
   - Can view exact JSON before sending
```

### Architecture Enforcement

#### No Server = No Collection Point
```
Traditional app:
  User → API → Server stores data
  (We can accidentally/intentionally collect at server)

Our app:
  User → Local storage only
  (No collection point exists)

Network sharing (optional):
  User → IPFS → Anonymous hash published
  (User remains anonymous, we don't see it)
```

#### No Accounts = No Identity
```
Traditional:
  Register → Email + Password → Account ID → Track user
  
Our app:
  Launch → Start immediately → No registration
  (Can't track what doesn't have identity)
```

#### No Cookies/LocalStorage Tracking
```
// This code is NEVER in our app:
localStorage.setItem('userId', 'abc123')
document.cookie = 'tracking_id=xyz'
fetch('/api/analytics?user=abc&action=click')

// Instead:
localStorage.setItem('last_question', 20)  // Local only
```

#### No Third-Party Scripts
```
// These libraries are FORBIDDEN:
- Google Analytics
- Mixpanel
- Amplitude
- Segment
- Facebook Pixel
- Any tracking pixel
- Any third-party CDN (except open frameworks)
```

---

## Privacy Policy

The application requires minimal privacy policy:

```markdown
# Privacy Policy - Manifestation Algorithm

## What We Collect
- Nothing. We don't collect any personal data.

## How Data is Stored
- All questionnaire responses are stored on your device only.
- Data is encrypted with AES-256.
- We have zero access to your data.

## How Data is Shared
- You choose whether to share anonymous results with the network.
- Sharing is opt-in (off by default).
- Shared data contains: date, scores, and anonymous hash only.
- We cannot identify who shared results.

## Third Parties
- We don't work with any third parties.
- No ads, no analytics, no tracking partners.

## Data Deletion
- Delete the app = delete all data.
- No accounts to close, no data on servers to request deletion.
- You have 100% data control.

## Contact
- No privacy officer (no privacy team needed).
- See source code on GitHub (trust but verify).
```

Compare this to typical app (10+ pages of legalese).

---

## Competitive Advantage

### Market Positioning
```
"The only [category] app where we can't monetize your data
--because we don't collect it. Trust, by design."
```

### Privacy Certification
When privacy certifications exist (Privacy by Design, B Corp, etc.):
- Can easily qualify (architectural compliance)
- Use as marketing advantage
- "Privacy certified" badge

### User Segment
- Privacy-conscious users
- Professionals (therapists, coaches) trusting with sensitive info
- Users in regulated industries (healthcare, finance)
- Users in countries with strict privacy laws

---

## Monitoring & Enforcement

### Code Review Checklist
Every PR must verify:
- [ ] No `localStorage` tracking code
- [ ] No third-party analytics libraries
- [ ] No API calls to tracking endpoints
- [ ] No account/user ID systems
- [ ] No cross-device tracking
- [ ] No device fingerprinting

### Testing
```bash
# Scan for FTC or privacy violations
npm run audit:privacy
# Returns: ✅ No tracking detected
```

### Annual Audit
- Third-party privacy audit annually
- Verify no data collection accidentally added
- Certify compliance with stated principles
- Publish audit report

---

## User Education

### In-App Privacy Explanation
```
┌─────────────────────────────────────┐
│ 🔒 Your Privacy                     │
├─────────────────────────────────────┤
│                                     │
│ ✓ No account or login               │
│ ✓ All data stays on your device     │
│ ✓ Encrypted with military strength  │
│ ✓ No tracking or analytics          │
│ ✓ No third parties                  │
│(+ optional) ✓ Anonymous sharing     │
│                                     │
│ Learn more: [Privacy policy]        │
└─────────────────────────────────────┘
```

### Privacy Badge
```
🔒 PRIVACY VERIFIED
   No collection. No tracking.
   100% local data.
```

On homepage, GitHub, app store listings.

---

## Future Scenarios

### Scenario 1: "We Need Analytics"
If team wants product analytics:
```
Option A (Rejected): Set up server, start collecting
  → Violates this ADR
  → Breaks user trust
  → Requires GDPR/CCPA compliance

Option B (Acceptable): Optional local analytics
  → User can enable in Settings
  → Logs stored locally only (not sent)
  → User can export their own logs
```

### Scenario 2: "Investor Wants Data"
If private equity investor wants user data:
```
Response: "Our competitive advantage IS user privacy.
 If we collect data, that advantage disappears.
 This isn't a constraint—it's our strategy."
```

### Scenario 3: "Government Demands Data"
If government requests user data:
```
Response: "We have no data to provide.
 All data stays on user's device.
 Request data subject directly, not us."
 
(This is actual advantage of architecture)
```

---

## References

- [Privacy by Design Principles](https://privacybydesign.ca/7-foundational-principles/)
- [GDPR Article 5 - Data Protection Principles](https://gdpr-info.eu/art-5-gdpr/)
- [CCPA Consumer Privacy Rights](https://www.iab.com/guidelines/ccpa/)
- [FTC Standards – Safeguards Rule](https://www.ftc.gov/business-guidance/privacy-security/safeguards-rule)
- [Apple Privacy Policy Best Practices](https://developer.apple.com/privacy/)

---

## Related ADRs
- ADR-002: SQLite encrypted storage (local only)
- ADR-003: IPFS for anonymous P2P (user stays anonymous)
- ADR-006: No central server (no data collection point)

---

## Sign-Off
**Approved by**: Product Lead, Security Lead, Legal Counsel  
**Date**: 2026-02-18  

### Stakeholder Commitments
- [ ] Engineering: Will review all PRs for data collection
- [ ] Product: Will maintain zero-collection policy
- [ ] Marketing: Will publicize privacy advantage
- [ ] Legal: Will monitor regulatory changes

---

**Document End: ADR-005.md**

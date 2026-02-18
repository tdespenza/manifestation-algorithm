# Product Requirements Document (PRD)
## Phase 1: Core Application - Questionnaire & Local Storage

**Project**: Manifestation Algorithm Desktop Application  
**Phase**: 1 - Core Application  
**Duration**: Weeks 1-4 (4 weeks)  
**Status**: Planning  
**Created**: February 18, 2026  
**BMAD Artifact Type**: Planning - Product Requirements  

---

## Executive Summary

Phase 1 establishes the foundational desktop application with the questionnaire interface and local SQLite storage. This phase delivers a fully functional, cross-platform desktop application that allows users to complete the Manifestation Algorithm questionnaire, calculate scores, and persist results locally with encryption.

**Success Criteria**: Questionnaire functional on Windows, macOS, and Linux with encrypted local storage working end-to-end.

---

## 1. Product Overview

### Problem Statement
The existing Manifestation Algorithm questionnaire is an HTML/JavaScript webapp that:
- Runs only in browsers
- Lacks persistent data storage across sessions
- Has no statistical analysis capabilities
- Cannot be easily distributed as a standalone application
- Offers no privacy guarantees regarding data storage

### Solution Vision
Create a lightweight, privacy-first desktop application that:
- Runs natively on Windows, macOS, and Linux
- Stores all responses securely on the user's device
- Calculates and persists questionnaire scores
- Prepares infrastructure for future stats dashboard and P2P sharing
- Operates completely offline

### Target Users
- Individual users interested in tracking manifestation progress
- Desktop users (Windows, macOS, Linux)
- Privacy-conscious users who want full data control
- Users seeking a lightweight desktop application (<50MB footprint)

---

## 2. Core Features

### Feature 1.1: Desktop Application Shell
**Description**: Cross-platform desktop application using Tauri and Vue 3

**Acceptance Criteria**:
- [ ] Application launches on Windows 10+, macOS 10.15+, Ubuntu 20.04+
- [ ] Application window initializes in <3 seconds
- [ ] Menu bar includes "Questionnaire" and "Settings" tabs
- [ ] Window resize and close buttons functional
- [ ] Application icon visible in taskbar/dock
- [ ] Graceful shutdown without errors
- [ ] No console errors in development tools

**Technical Details**:
- Framework: Tauri 1.x with Vue 3
- Build tool: Vite
- Language: TypeScript
- Package manager: npm
- Target: Windows (x64), macOS (x64 + aarch64), Linux (amd64)

### Feature 1.2: Questionnaire Component
**Description**: Port existing HTML questionnaire to Vue 3 interactive component

**Functional Requirements**:
- Display all 40 questions in hierarchical structure
  - Parent questions (Q1-Q10)
  - Sub-questions (Q1a, Q1b, Q1c, Q1d, etc.)
- Rating scale: 1-10 sliders for each question
- Visual feedback: Current value displayed above slider
- Progress indicator: "Question X of 40" or similar
- Navigation: Previous/Next buttons
- Submit button: Calculates and saves score on completion

**Acceptance Criteria**:
- [ ] All 40 questions load without errors
- [ ] Sliders accept 1-10 input values
- [ ] Slider values update display in real-time
- [ ] Previous/Next buttons navigate without losing data
- [ ] Page loads in <1 second
- [ ] Works on 1024x768 minimum screen size
- [ ] Touch-friendly sliders (minimum 44x44px)
- [ ] Keyboard navigation fully supported
- [ ] Estimated time shown: "Estimated time: 12-15 minutes"

**Accessibility**:
- ARIA labels for all form inputs
- Keyboard tab order correct
- Focus indicators visible
- Color contrast meets WCAG AA

### Feature 1.3: Score Calculation Engine
**Description**: Calculate questionnaire scores based on weighted formula

**Technical Specification**:

```
Total Score = SUM(question_score × question_weight)

Question Weights:
Q1 (Master Basics): weight = 1.0 (base)
Q1a, Q1b, Q1c, Q1d: weight = 0.25 each
Q2-Q10: Per-question analysis required from original HTML

Score Range: 0-10,000 points
```

**Acceptance Criteria**:
- [ ] Score calculation produces consistent results
- [ ] 10 test cases pass with known input/output pairs
- [ ] Edge cases handled: minimum (1 on all) and maximum (10 on all) scores
- [ ] Decimal precision: 2 places (e.g., 7,234.56)
- [ ] Calculation performance: <100ms for all 40 questions
- [ ] Formula matches original HTML questionnaire exactly

### Feature 1.4: Auto-Save Functionality
**Description**: Automatically persist questionnaire responses as user progresses

**Requirements**:
- Save interval: Every 5 seconds while answering
- Save on question change: Before moving to next question
- Save on app close: Final backup before shutdown
- Update UI: Show "Saving..." indicator (2 seconds max)
- No data loss: Resume from last saved question if app crashes

**Acceptance Criteria**:
- [ ] Auto-save triggered every 5 seconds of inactivity
- [ ] Each answer persists to SQLite within 500ms
- [ ] "Saving..." indicator appears and disappears smoothly
- [ ] Resume functionality: App remembers last answered question
- [ ] Test: Force quit app mid-questionnaire, reopen, verify data recovery
- [ ] Test: Answer 20 questions, close app, reopen, verify all answers present

### Feature 1.5: SQLite Database Integration
**Description**: Set up encrypted, persistent local database for all user data

**Database Schema**:

```sql
-- Main stats table
CREATE TABLE stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  completion_date TEXT NOT NULL UNIQUE,
  total_score REAL NOT NULL,
  category_1_score REAL,
  category_2_score REAL,
  -- ... (categories 3-40)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questionnaire responses (detailed)
CREATE TABLE questionnaire_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  question_number TEXT NOT NULL,
  answer_value INTEGER NOT NULL,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(session_id, question_number)
);

-- Settings table
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indices
CREATE INDEX idx_stats_date ON stats(completion_date);
CREATE INDEX idx_responses_session ON questionnaire_responses(session_id);
```

**Encryption Specifications**:
- Algorithm: AES-256-CBC
- Key derivation: PBKDF2 (64,000 iterations)
- Page size: 4096 bytes
- Library: sqlcipher

**Acceptance Criteria**:
- [ ] Database file encrypted at rest
- [ ] Database size <5MB after 100 test completions
- [ ] Query performance: <100ms for any single query
- [ ] VACUUM operation reduces size and fragments correctly
- [ ] Backup file created automatically in AppData/user folder
- [ ] Database connection pooling configured
- [ ] No unencrypted temporary files created

### Feature 1.6: Session Management
**Description**: Track and resume incomplete questionnaires

**Requirements**:
- New session: Generate unique session ID on app start
- In-progress tracking: Store current question and answers
- Resume capability: User can close and reopen without losing progress
- Session timeout: 30 days (auto-clear old sessions)
- Multiple sessions: Support parallel incomplete questionnaires (stretch goal for Phase 1)

**Acceptance Criteria**:
- [ ] Session ID generated as UUID v4
- [ ] Current progress saved every question change
- [ ] Questionnaire resumes at last answered question
- [ ] Visual indicator shows "Resuming previous session" if applicable
- [ ] Users can "Start Over" to begin fresh questionnaire
- [ ] Test: Session persists through app restart

### Feature 1.7: Settings & Preferences
**Description**: Store basic user preferences locally

**Settings to Store**:
- Theme: Light/Dark mode (default: system)
- Auto-start on launch: Yes/No
- Notifications: On/Off
- Data folder location: Customizable (optional Phase 1)

**Acceptance Criteria**:
- [ ] Settings persist across app restarts
- [ ] Theme changes apply immediately
- [ ] Settings UI accessible from main menu

---

## 3. User Flows

### Flow 1: First-Time User
```
1. User downloads and installs .exe/.dmg/.AppImage
2. App launches for first time
3. Welcome screen: "Welcome to Manifestation Algorithm"
4. Questionnaire tab opens automatically
5. User sees all 40 questions
6. User fills out questionnaire (12-15 minutes)
7. User clicks Submit
8. Score calculated and saved
9. UI confirmation: "Score saved successfully!"
10. Transition to empty Stats tab (Phase 2 feature)
```

### Flow 2: Returning User
```
1. User opens app
2. App detects previous session
3. UI shows: "You have an incomplete questionnaire from [DATE]. Resume or Start Over?"
4. User selects Resume
5. Questionnaire reopens at last answered question
6. User continues answering
7. User submits
8. Score updated in database
```

### Flow 3: Data Loss Recovery
```
1. App crashes mid-questionnaire
2. User restarts app
3. App detects incomplete session
4. UI shows: "We saved your progress. Select Resume to continue."
5. All previous answers restored from auto-save
6. User resumes from exact question where stopped
```

---

## 4. User Interface Specifications

### Main Window Layout
```
┌─────────────────────────────────────────────┐
│ Manifestation Algorithm App  |  Settings [⚙] │
├─────────────────────────────────────────────┤
│  [Questionnaire] [Stats] [Share] [Help]     │ ← Tab Navigation
├─────────────────────────────────────────────┤
│                                             │
│  Question 1 of 40                           │
│  What is your primary manifestation goal?   │
│                                             │
│  ○ ─────────○───── ● ─────────○  (slider)  │
│  Score: 5 / 10                              │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ [< Previous]      [Save] [Next >]    │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  Progress: ████████░░░░░░░░ 50%            │
│                                             │
│  Saving... ✓                                │ (Auto-save indicator)
│                                             │
└─────────────────────────────────────────────┘
```

### Questionnaire Tab View
- Question number and title at top
- Single slider per question
- Current value displayed clearly
- Navigation buttons (Previous, Next, Submit)
- Progress bar showing completion percentage
- Auto-save status indicator

### Settings Tab View
```
┌─────────────────────────────────┐
│ Settings                        │
├─────────────────────────────────┤
│ Theme:  [Light] [Dark] [System] │
│ Auto-start: [ ] Yes              │
│ Show notifications: [✓] Yes      │
│ Data location: /Users/...       │
│                                 │
│              [Save] [Reset]      │
└─────────────────────────────────┘
```

### Responsive Design
- **Desktop (1024px+)**: Full layout with all elements visible
- **Laptop (800-1024px)**: Stacked layout, full functionality
- **Tablet (600-800px)**: Single question per screen, full-width slider (if supported)
- **Minimum**: 1024x768 (no lower for Phase 1)

---

## 5. Technical Architecture

### Technology Stack
```
Frontend:
├─ Vue 3 + TypeScript
├─ Vite (bundler)
├─ TailwindCSS (styling)
└─ Tauri (desktop bridge)

Backend (Rust):
├─ Tauri commands
├─ SQLx + SQLcipher (database)
├─ Tokio (async runtime)
├─ Serde (JSON serialization)
└─ SHA2 (hashing)

Database:
└─ SQLite (encrypted, local-only)

Distribution:
├─ GitHub Actions (CI/CD)
├─ Tauri bundler (installers)
└─ GitHub Releases (distribution)
```

### Project Structure
```
manifestation-algorithm/
├── src/
│   ├── components/
│   │   ├── Questionnaire.vue
│   │   ├── QuestionSlider.vue
│   │   ├── ProgressBar.vue
│   │   └── Navigation.vue
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Settings.vue
│   │   └── Stats.vue (empty, Phase 2)
│   ├── stores/
│   │   └── questionnaire.ts (Pinia store)
│   ├── types/
│   │   └── index.ts
│   ├── App.vue
│   └── main.ts
├── src-tauri/
│   ├── src/
│   │   ├── main.rs
│   │   ├── commands/
│   │   │   ├── questionnaire.rs
│   │   │   ├── database.rs
│   │   │   └── settings.rs
│   │   ├── db/
│   │   │   ├── schema.sql
│   │   │   └── migrations.rs
│   │   ├── models/
│   │   │   ├── score.rs
│   │   │   ├── response.rs
│   │   │   └── settings.rs
│   │   └── utils/
│   │       └── encryption.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
├── tests/
│   ├── e2e/
│   │   └── questionnaire.spec.ts
│   └── unit/
│       ├── scoring.test.ts
│       └── database.test.rs
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

### Build Process
```bash
# Development
npm run dev                    # Hot reload, local testing

# Production
npm run build                  # Build frontend + backend
npm run tauri build           # Create installers
npm run tauri build -- --target universal-apple-darwin  # macOS universal
```

---

## 6. Testing Requirements

### Unit Tests
- [ ] Score calculation: 10 test cases (min, max, mid-range)
- [ ] Database operations: Create, Read, Update, Delete
- [ ] Settings persistence: Load and save
- [ ] UUID generation: Uniqueness and format

### Integration Tests
- [ ] Questionnaire → Score calculation → Database save
- [ ] Resume session: Restart app, verify data loaded
- [ ] Auto-save: Modify answer, verify persisted within 500ms
- [ ] Database encryption: Verify file is encrypted at rest

### E2E Tests
- [ ] New user flow: Install → Launch → Complete → Submit
- [ ] Resume flow: Start → Answer 20 Qs → Close → Reopen → Resume → Complete
- [ ] Settings persistence: Change theme → Close → Reopen → Verify
- [ ] Cross-platform: Run tests on Windows, macOS, Linux

### Performance Tests
- [ ] Page load: <1 second
- [ ] Slider interaction: Smooth 60fps
- [ ] Database query: <100ms
- [ ] App startup: <3 seconds

### Security Tests
- [ ] Database encryption: Verify sqlcipher applied
- [ ] No plaintext storage: Audit all temp files
- [ ] No telemetry: Verify no network calls (offline check)
- [ ] Input validation: Test edge cases and malformed input

---

## 7. Acceptance Criteria (Phase Gate)

Phase 1 is **COMPLETE** when:

- [ ] Application launches successfully on Windows 10+, macOS 10.15+, Ubuntu 20.04+
- [ ] All 40 questions display and accept input (1-10 scale)
- [ ] Auto-save stores responses every 5 seconds
- [ ] Score calculation matches original HTML formula exactly
- [ ] Questionnaire can be resumed from last answered question
- [ ] SQLite database encrypted with AES-256
- [ ] All E2E tests pass (new user, resume, recovery flows)
- [ ] All performance targets met (<1s page load, <3s startup)
- [ ] Zero critical security findings
- [ ] Windows, macOS (Intel + Apple Silicon), Linux builds successful
- [ ] Installer sizes: Windows <50MB, macOS <55MB, Linux <45MB

---

## 8. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **App Launch Time** | <3 seconds | Stopwatch from double-click to window visible |
| **Questionnaire Load** | <1 second | DevTools Performance > Network tab |
| **Auto-Save Latency** | <500ms | Verify DB timestamp vs UI timestamp |
| **Database Query Speed** | <100ms | Slowest query in test suite |
| **Crash Rate** | 0 | Monitoring via logs (Phase 1) |
| **Test Coverage** | >80% | Code coverage report |
| **Installation Time** | <15 seconds | Manual testing on each OS |

---

## 9. Dependencies & Prerequisites

### Frontend Dependencies
```json
{
  "vue": "^3.3.0",
  "typescript": "^5.0.0",
  "vite": "^4.0.0",
  "tailwindcss": "^3.0.0",
  "pinia": "^2.1.0"
}
```

### Backend Dependencies
```toml
[dependencies]
tauri = "1.0"
sqlx = { version = "0.7", features = ["runtime-tokio", "sqlite"] }
sqlcipher = "0.25"
tokio = { version = "1.0", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
uuid = { version = "1.0", features = ["v4"] }
chrono = "0.4"
sha2 = "0.10"
```

### System Requirements
- Rust 1.70+ (for backend compilation)
- Node.js 18+ with npm
- Visual Studio Build Tools (Windows)
- Xcode Command Line Tools (macOS)
- Build essentials (Linux)

---

## 10. Timeline & Milestones

### Week 1: Project Setup & Architecture
- [ ] Initialize Tauri + Vue 3 project
- [ ] Set up development environment
- [ ] Configure build pipelines for all OS
- [ ] Set up testing framework

**Deliverable**: Project scaffold, Windows/macOS/Linux builds successful

### Week 2: Questionnaire Component
- [ ] Port HTML questionnaire to Vue
- [ ] Implement score calculation engine
- [ ] Build slider components
- [ ] Create navigation (Previous/Next/Submit)

**Deliverable**: Questionnaire fully interactive, score calculation working

### Week 3: Database & Auto-Save
- [ ] Set up SQLite with encryption
- [ ] Implement Tauri commands for DB operations
- [ ] Build auto-save mechanism
- [ ] Create session management

**Deliverable**: Data persists to encrypted database, auto-save functional

### Week 4: Testing & Polish
- [ ] Write comprehensive test suite
- [ ] Cross-platform testing (Win/Mac/Linux)
- [ ] Performance optimization
- [ ] Security audit

**Deliverable**: All Phase 1 acceptance criteria met, ready for Phase 2

---

## 11. Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| SQLcipher integration delays | Medium | High | Pre-test encryption setup in week 1 |
| macOS Apple Silicon build issues | Medium | Medium | Early testing with multiarch toolchain |
| Performance bottlenecks | Low | Medium | Performance profiling at end of week 2 |
| Questionnaire formula ambiguity | Low | High | Validate against original HTML line-by-line |
| Cross-platform UI differences | Medium | Low | Comprehensive UI testing on all platforms |

---

## 12. Out of Scope (Phase 1)

The following features are **NOT** included in Phase 1 and will be addressed in subsequent phases:

- Statistics dashboard
- Line graphs or trends
- IPFS integration
- P2P result sharing
- Auto-updates system
- Multiple questionnaire sessions (supporting multiple in-progress questionnaires)
- Mobile apps
- Web version
- Advanced settings (data folder customization, etc.)

---

## 13. Sign-Off

**Product Manager**: [TBD]  
**Engineering Lead**: [TBD]  
**Date**: February 18, 2026  

This PRD establishes all requirements for Phase 1 delivery. Phase 1 is critical path for all subsequent phases.

**Status**: Ready for Development

---

**Document End: PRD-Phase-1-Core-Application.md**

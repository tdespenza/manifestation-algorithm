# Test Plan - Phase 1: Core Application
## Questionnaire & Local Storage Testing

**Project**: Manifestation Algorithm Desktop Application  
**Phase**: 1 - Core Application  
**Duration**: Weeks 1-4  
**Status**: Planning  
**Created**: February 18, 2026  
**Test Lead**: [TBD]  

---

## 1. Test Plan Overview

### Scope
This test plan covers all Phase 1 deliverables:
- Desktop application shell (Tauri + Vue 3)
- Questionnaire component (40 questions, hierarchical structure)
- Score calculation engine
- Auto-save mechanism
- SQLite database with encryption
- Session management and resume functionality
- Multi-platform (Windows, macOS, Linux)

### Out of Scope
- Statistics dashboard (Phase 2)
- Network features (Phase 3)
- Distribution/updates (Phase 4)
- Mobile platforms
- Performance optimization beyond targets

### Test Strategy
```
Unit Tests (50%)
├─ Score calculation logic
├─ Database operations
├─ Session management
├─ Cryptography/encryption
└─ Input validation

Integration Tests (30%)
├─ Questionnaire → Score calc → DB save
├─ Auto-save mechanism
├─ Resume from saved state
├─ Database transaction handling
└─ Error recovery

E2E Tests (15%)
├─ New user flow (install → complete → submit)
├─ Resume flow (crash recovery → continue)
├─ Settings persistence
├─ Cross-platform validation
└─ Data migration

Performance Tests (5%)
├─ Load time targets
├─ Memory usage
├─ Database query speed
└─ Crash recovery speed
```

### Test Environment
```
Development:
├─ Windows 10/11 (local dev machine)
├─ macOS 11+ (Intel + M-series)
└─ Ubuntu 20.04 LTS (VM or native)

Testing:
├─ Clean VM snapshots (before/after)
├─ Test data generators
├─ Mock IPFS node (Phase 3)
└─ CI/CD test runners (GitHub Actions)
```

---

## 2. Unit Testing

### 2.1 Score Calculation Tests

**Module**: `src-tauri/src/score_calculation.rs`

#### Test Cases

```rust
#[test]
fn test_minimum_score() {
  let answers = vec![1; 40];  // All question 1
  let score = calculate_score(answers);
  assert_eq!(score, 400);  // 40 questions × 10 = 400
}

#[test]
fn test_maximum_score() {
  let answers = vec![10; 40];  // All question 10
  let score = calculate_score(answers);
  assert_eq!(score, 4000);  // 40 questions × 10 = 4000
}

#[test]
fn test_mid_range_score() {
  let mut answers = vec![5; 40];
  let score = calculate_score(answers);
  assert_eq!(score, 2000);  // 40 × 5 = 2000
}

#[test]
fn test_weighted_calculation() {
  // Verify weights match original HTML formula
  let answers = [
    (1, 8.0),   // Master Basics: weight 1.0
    (2, 9.0),   // Next category
    // ... 40 categories
  ];
  let score = calculate_score(answers);
  // Verify against known value from original HTML
  assert_eq!(score, 7234.56, , "Score matches original formula");
}

#[test]
fn test_decimal_precision() {
  // Two decimal places: 7234.56
  let score = calculate_score(test_answers);
  assert!(score.to_string().matches_regex(r"^\d+\.\d{2}$"));
}

#[test]
fn test_edge_case_single_question() {
  let answers = vec![7];
  let score = calculate_score_single(answer);
  assert_eq!(score, 7);  // Single question = its value
}

#[test]
fn test_category_breakdown() {
  let answers = [8, 7, 9, 6, 5, ...];  // 40 values
  let categories = calculate_categories(answers);
  
  assert_eq!(categories[0], 8.2);  // Category 1
  assert_eq!(categories[1], 7.0);  // Category 2
  // ... verify all 40
}

#[test]
fn test_null_input() {
  let result = calculate_score(vec![]);
  assert!(result.is_err(), "Empty input should error");
}

#[test]
fn test_invalid_range_input() {
  let answers = vec![11];  // > 10, invalid
  let result = calculate_score(answers);
  assert!(result.is_err(), "Out-of-range input should error");
}

#[test]
fn test_float_input() {
  let answers = vec![5.5];  // Should be integer
  let result = calculate_score(answers);
  assert!(result.is_err(), "Only integers 1-10 allowed");
}
```

**Acceptance Criteria**:
- [ ] All 10 test cases pass
- [ ] Edge cases handled (empty, invalid range, wrong type)
- [ ] Matches original HTML formula exactly
- [ ] Two decimal precision maintained
- [ ] 100% code coverage for calculation logic

---

### 2.2 Database Operations Tests

**Module**: Database layer (SQLx + sqlcipher)

```rust
#[test]
async fn test_database_connection() {
  let db = Database::new(":memory:").await;
  assert!(db.is_ok());
}

#[test]
async fn test_database_encryption_enabled() {
  let db = Database::new("test.db").await?;
  let result: (String,) = sqlx::query_as(
    "PRAGMA cipher"
  ).fetch_one(&db).await?;
  
  assert_eq!(result.0, "aes-256-cbc");
}

#[test]
async fn test_encrypted_data_unreadable() {
  // Create encrypted DB
  let db = Database::new("encrypted.db", "password").await?;
  db.insert_response(question_1, answer_5).await?;
  drop(db);
  
  // Try to read without decryption
  let raw_file = std::fs::read("encrypted.db")?;
  assert!(!raw_file.contains(b"5"));  // Value NOT visible
}

#[test]
async fn test_insert_questionnaire_response() {
  let db = Database::new(":memory:").await?;
  let row_id = db.insert_response(
    session_id: "sess-123",
    question_number: "1a",
    answer_value: 7
  ).await?;
  
  assert!(row_id > 0);
}

#[test]
async fn test_retrieve_questionnaire_response() {
  let db = Database::new(":memory:").await?;
  db.insert_response("sess-123", "1a", 7).await?;
  
  let result = db.get_response("sess-123", "1a").await?;
  assert_eq!(result, 7);
}

#[test]
async fn test_session_isolation() {
  let db = Database::new(":memory:").await?;
  
  db.insert_response("sess-1", "q1", 5).await?;
  db.insert_response("sess-2", "q1", 8).await?;
  
  let sess1_response = db.get_response("sess-1", "q1").await?;
  let sess2_response = db.get_response("sess-2", "q1").await?;
  
  assert_ne!(sess1_response, sess2_response);
}

#[test]
async fn test_update_response() {
  let db = Database::new(":memory:").await?;
  
  db.insert_response("sess-1", "q1", 5).await?;
  db.update_response("sess-1", "q1", 8).await?;
  
  let result = db.get_response("sess-1", "q1").await?;
  assert_eq!(result, 8);
}

#[test]
async fn test_get_all_responses_for_session() {
  let db = Database::new(":memory:").await?;
  
  for i in 1..=10 {
    db.insert_response("sess-1", format!("q{}", i), i as i32).await?;
  }
  
  let responses = db.get_session_responses("sess-1").await?;
  assert_eq!(responses.len(), 10);
}

#[test]
async fn test_delete_session() {
  let db = Database::new(":memory:").await?;
  
  db.insert_response("sess-1", "q1", 5).await?;
  db.delete_session("sess-1").await?;
  
  let responses = db.get_session_responses("sess-1").await?;
  assert_eq!(responses.len(), 0);
}

#[test]
async fn test_database_persistence() {
  {
    let db = Database::new("persist.db").await?;
    db.insert_response("sess-1", "q1", 5).await?;
    // DB goes out of scope and closes
  }
  
  // Reopen same database
  {
    let db = Database::new("persist.db").await?;
    let result = db.get_response("sess-1", "q1").await?;
    assert_eq!(result, 5);  // Data persisted
  }
}

#[test]
async fn test_database_vacuum() {
  let db = Database::new(":memory:").await?;
  
  // Insert and delete to create fragmentation
  for i in 1..=1000 {
    let id = db.insert_response("sess-1", format!("q{}", i), i as i32).await?;
    if i % 2 == 0 {
      db.delete_response(id).await?;
    }
  }
  
  let before_size = db.file_size().await?;
  db.vacuum().await?;
  let after_size = db.file_size().await?;
  
  assert!(after_size < before_size);  // Defragmented
}
```

**Acceptance Criteria**:
- [ ] All database tests pass
- [ ] Encryption verified (data unreadable without key)
- [ ] Persistence verified across app restarts
- [ ] No data corruption detected
- [ ] Database size <5MB for 100 completions
- [ ] Query performance <100ms

---

### 2.3 Session Management Tests

**Module**: `src/stores/questionnaire.ts` (Vue Pinia store)

```typescript
import { setActivePinia, createPinia } from 'pinia'
import { useQuestionnaireStore } from '@/stores/questionnaire'

describe('Session Management', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should create new session on app initialization', () => {
    const store = useQuestionnaireStore()
    expect(store.sessionId).toBeDefined()
    expect(store.sessionId).toMatch(/^[a-f0-9-]{36}$/)  // UUID format
  })

  it('should store current question', () => {
    const store = useQuestionnaireStore()
    store.setCurrentQuestion(5)
    expect(store.currentQuestion).toBe(5)
  })

  it('should record answer for question', () => {
    const store = useQuestionnaireStore()
    store.recordAnswer("q1", 7)
    expect(store.answers["q1"]).toBe(7)
  })

  it('should retrieve all answers for session', () => {
    const store = useQuestionnaireStore()
    store.recordAnswer("q1", 7)
    store.recordAnswer("q2", 8)
    store.recordAnswer("q3", 6)
    
    const answers = store.getAllAnswers()
    expect(answers).toEqual({ "q1": 7, "q2": 8, "q3": 6 })
  })

  it('should resume from last saved question', () => {
    const store = useQuestionnaireStore()
    store.recordAnswer("q1", 7)
    store.recordAnswer("q2", 8)
    store.setCurrentQuestion(2)
    
    // Simulate app restart
    const restoredStore = useQuestionnaireStore()
    restoredStore.resumeSession()
    
    expect(restoredStore.currentQuestion).toBe(2)
    expect(restoredStore.answers).toEqual({ "q1": 7, "q2": 8 })
  })

  it('should start fresh questionnaire', () => {
    const store = useQuestionnaireStore()
    store.recordAnswer("q1", 7)
    
    store.startNewSession()
    
    expect(store.answers).toEqual({})
    expect(store.currentQuestion).toBe(1)
  })

  it('should generate unique session IDs', () => {
    const store1 = useQuestionnaireStore()
    const id1 = store1.sessionId
    
    store1.startNewSession()
    const id2 = store1.sessionId
    
    expect(id1).not.toBe(id2)
  })

  it('should handle session timeout (30 days)', () => {
    const store = useQuestionnaireStore()
    store.recordAnswer("q1", 7)
    
    // Simulate 31 days passing
    store.createdAt = Date.now() - (31 * 24 * 60 * 60 * 1000)
    
    expect(store.isExpired()).toBe(true)
  })

  it('should track session progress', () => {
    const store = useQuestionnaireStore()
    expect(store.progressPercentage()).toBe(0)
    
    for (let i = 1; i <= 40; i++) {
      store.recordAnswer(`q${i}`, 5)
    }
    
    expect(store.progressPercentage()).toBe(100)
  })
})
```

**Acceptance Criteria**:
- [ ] Session creation and ID generation working
- [ ] Progress tracking accurate (0-100%)
- [ ] Resume from last question verified
- [ ] Session expiry after 30 days
- [ ] Multiple concurrent sessions possible (future)

---

### 2.4 Auto-Save Mechanism Tests

**Module**: Auto-save service

```typescript
describe('Auto-Save', () => {
  it('should save every 5 seconds', async () => {
    const store = useQuestionnaireStore()
    const spy = jest.spyOn(store, 'save')
    
    store.recordAnswer("q1", 7)
    await wait(5100)  // Wait 5.1 seconds
    
    expect(spy).toHaveBeenCalled()
  })

  it('should not save if no changes made', async () => {
    const store = useQuestionnaireStore()
    store.recordAnswer("q1", 7)
    await wait(1000)
    
    store.recordAnswer("q2", 8)
    const spy = jest.spyOn(store, 'save')
    await wait(6000)
    
    // 2 saves: after q1, after q2
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should save on question navigation', async () => {
    const store = useQuestionnaireStore()
    const spy = jest.spyOn(store, 'save')
    
    store.recordAnswer("q1", 7)
    store.setCurrentQuestion(2)
    
    await wait(100)  // Small delay for async
    expect(spy).toHaveBeenCalled()
  })

  it('should save on app close', async () => {
    const store = useQuestionnaireStore()
    const spy = jest.spyOn(store, 'save')
    
    store.recordAnswer("q1", 7)
    window.dispatchEvent(new Event('beforeunload'))
    
    await wait(100)
    expect(spy).toHaveBeenCalled()
  })

  it('should show saving indicator', async () => {
    const store = useQuestionnaireStore()
    const wrapper = mount(App)
    
    store.recordAnswer("q1", 7)
    expect(wrapper.find('.saving-indicator').exists()).toBe(true)
    
    await wait(1000)
    expect(wrapper.find('.saving-indicator').exists()).toBe(false)
  })

  it('should save within 500ms', async () => {
    const store = useQuestionnaireStore()
    const start = performance.now()
    
    store.recordAnswer("q1", 7)
    await store.save()
    
    const end = performance.now()
    expect(end - start).toBeLessThan(500)
  })

  it('should retry failed saves', async () => {
    const store = useQuestionnaireStore()
    
    // Simulate first save failure
    const mockService = jest.mock('./saveService')
    mockService.save.mockRejectedValueOnce(new Error('DB error'))
    mockService.save.mockResolvedValueOnce(true)
    
    store.recordAnswer("q1", 7)
    await wait(6000)  // Wait for retry
    
    expect(mockService.save).toHaveBeenCalledTimes(2)
  })
})
```

**Acceptance Criteria**:
- [ ] Saves triggered every 5 seconds
- [ ] Saves triggered on question change
- [ ] Saves triggered on app close
- [ ] Saving completes in <500ms
- [ ] Failed saves retried
- [ ] UI indicator shows save status

---

## 3. Integration Testing

### 3.1 Questionnaire → Score → Database Flow

**Test Scenario**: Complete questionnaire and verify end-to-end flow

```typescript
describe('Complete Questionnaire Flow', () => {
  it('should complete questionnaire and calculate score', async () => {
    const app = mount(App)
    
    // Answer 40 questions
    const answers = generateTestAnswers(40)
    for (let i = 0; i < 40; i++) {
      const slider = app.find(`[data-question="q${i+1}"]`)
      slider.setValue(answers[i])
      
      if (i < 39) {
        await app.find('.btn-next').trigger('click')
      }
    }
    
    // Submit
    await app.find('.btn-submit').trigger('click')
    
    // Verify score calculated
    const store = useQuestionnaireStore()
    expect(store.totalScore).toBeDefined()
    expect(store.totalScore).toBeGreaterThan(400)
    expect(store.totalScore).toBeLessThan(4000)
  })

  it('should save to database on submission', async () => {
    const app = mount(App)
    const db = await Database.new()
    
    // Complete and submit
    await completeQuestionnaire(app, generateTestAnswers(40))
    
    // Verify in database
    const saved = await db.getStats(getToday())
    expect(saved).toBeDefined()
    expect(saved.total_score).toEqual(store.totalScore)
  })

  it('should record all individual category scores', async () => {
    const store = useQuestionnaireStore()
    await completeQuestionnaire(40)
    
    // Verify all 40 categories recorded
    for (let i = 1; i <= 40; i++) {
      expect(store.categoryScores[i]).toBeDefined()
      expect(store.categoryScores[i]).toBeGreaterThan(0)
      expect(store.categoryScores[i]).toBeLessThanOrEqual(10)
    }
  })

  it('should update timestamp when submitted', async () => {
    const db = await Database.new()
    const before = new Date()
    
    await completeQuestionnaire(40)
    
    const after = new Date()
    const saved = await db.getStats(getToday())
    
    expect(new Date(saved.created_at)).toBeGreaterThanOrEqual(before)
    expect(new Date(saved.created_at)).toBeLessThanOrEqual(after)
  })
})
```

---

### 3.2 Resume Session Flow

**Test Scenario**: Start questionnaire, close app, reopen and resume

```typescript
describe('Resume from Saved Session', () => {
  it('should resume from last answered question', async () => {
    // Session 1: Answer 20 questions
    const app1 = mount(App)
    await answerQuestions(app1, 1, 20, testAnswers)
    await app1.unmount()  // App closed
    
    // Session 2: Reopen app
    const app2 = mount(App)
    
    // Should show "Resume?" dialog
    const dialog = app2.find('[data-test="resume-dialog"]')
    expect(dialog.exists()).toBe(true)
    
    // Click resume
    await dialog.find('.btn-resume').trigger('click')
    
    // Verify current question is 21
    const store = useQuestionnaireStore()
    expect(store.currentQuestion).toBe(21)
    
    // Verify answers 1-20 are restored
    for (let i = 1; i <= 20; i++) {
      expect(store.answers[`q${i}`]).toBe(testAnswers[i-1])
    }
  })

  it('should offer "Start Over" option', async () => {
    // Have incomplete session
    await startIncompleteSession(20)
    
    // Reopen app
    const app = mount(App)
    const dialog = app.find('[data-test="resume-dialog"]')
    
    await dialog.find('.btn-start-over').trigger('click')
    
    // Questionnaire should restart
    expect(useQuestionnaireStore().currentQuestion).toBe(1)
    expect(Object.keys(useQuestionnaireStore().answers)).toHaveLength(0)
  })

  it('should verify data integrity after resume', async () => {
    const testAnswers = [5, 7, 3, 8, 6, ...]  // 20 answers
    
    // Session 1: Answer 20, save, close
    const app1 = mount(App)
    await answerQuestions(app1, 1, 20, testAnswers)
    const store1 = useQuestionnaireStore()
    const sessionId1 = store1.sessionId
    const checkpoint1 = { ...store1.answers }
    
    // Session 2: Resume and verify
    const app2 = mount(App)
    await app2.find('.btn-resume').trigger('click')
    const store2 = useQuestionnaireStore()
    
    expect(store2.answers).toEqual(checkpoint1)
  })
})
```

---

### 3.3 Auto-Save & Crash Recovery

**Test Scenario**: Auto-save works during typing and recovers from app crash

```typescript
describe('Auto-Save & Crash Recovery', () => {
  it('should auto-save and recover all data', async () => {
    const app = mount(App)
    
    // Answer 10 questions
    for (let i = 1; i <= 10; i++) {
      app.find(`[data-q="q${i}"]`).setValue(i)
      await wait(500)  // Auto-save every 5 sec
    }
    
    // Simulate crash (kill process)
    process.kill(process.pid, 'SIGKILL')
    
    // App restarts
    const appRecovered = mount(App)
    const store = useQuestionnaireStore()
    await appRecovered.find('.btn-resume').trigger('click')
    
    // All 10 answers should be present
    for (let i = 1; i <= 10; i++) {
      expect(store.answers[`q${i}`]).toBe(i)
    }
  })

  it('should show "unsaved changes" warning when closing', async () => {
    const app = mount(App)
    
    app.find('[data-q="q1"]').setValue(5)
    await wait(100)  // Before auto-save (5 sec)
    
    // Trigger close event
    const event = new Event('beforeunload')
    window.dispatchEvent(event)
    
    // Should show warning or save before closing
    expect(event.returnValue).toBeDefined()
  })
})
```

---

## 4. End-to-End (E2E) Testing

### 4.1 New User Flow

**Test**: Install app, complete questionnaire, submit results

```mermaid
New User Flow:
1. Download installer
2. Install app
3. App launches
4. Welcome screen
5. Questionnaire tab opens
6. Answer 40 questions (12-15 min)
7. Click Submit
8. Score calculated & saved
9. Confirmation: "Results saved!"
10. Stats tab shows placeholder (Phase 2)
```

**Test Script**:
```bash
#!/bin/bash
# test-new-user-flow.sh

# 1. Start app
./Manifestation-Algorithm

# 2. Wait for launch
sleep 3
assert_window_title "Manifestation Algorithm"

# 3. Verify questionnaire visible
assert_visible_element "[data-test='questionnaire-tab']"

# 4. Fill out questionnaire
for Q in {1..40}; do
  find_slider "[data-question='q$Q']" \
    set_value $((5 + $((RANDOM % 5))))  # Random 5-10
  
  if [ $Q -lt 40 ]; then
    click_button "[data-test='btn-next']"
    wait_animation_complete  # Wait for slide transition
  fi
done

# 5. Submit
click_button "[data-test='btn-submit']"
wait 2

# 6. Verify confirmation
assert_element_contains "[data-test='success-message']" "saved successfully"

# 7. Verify score displayed
assert_visible_element "[data-test='total-score']"
assert_element_matches "[data-test='total-score']" "\d{4,5}"

# Report
echo "✅ New user flow test passed"
```

---

### 4.2 Cross-Platform E2E Tests

**Test Windows**:
```bash
# Windows 10/11 VM
pytest -k test_e2e_questionnaire --pyargs tauri --platform windows
```

**Test macOS**:
```bash
# macOS Intel
pytest -k test_e2e_questionnaire --pyargs tauri --platform macos-x64

# macOS Apple Silicon
pytest -k test_e2e_questionnaire --pyargs tauri --platform macos-aarch64
```

**Test Linux**:
```bash
# Ubuntu 20.04+
pytest -k test_e2e_questionnaire --pyargs tauri --platform linux
```

---

## 5. Performance Testing

### 5.1 Load Time

**Target**: App launch in <3 seconds

```bash
#!/bin/bash
# Measure app startup

TIME_START=$(date +%s%N)
./app &
PID=$!

# Wait for main window visible
while ! xdotool search --name "Manifestation Algorithm"; do
  sleep 0.1
done

TIME_END=$(date +%s%N)
DURATION=$(( (TIME_END - TIME_START) / 1000000 ))  # Convert to ms

echo "App launch time: ${DURATION}ms"
assert_less_than $DURATION 3000  # <3 seconds

kill $PID
```

### 5.2 Memory Usage

**Target**: <100MB idle, <200MB with full questionnaire

```bash
#!/bin/bash
# Monitor memory during questionnaire

./app &
PID=$!
sleep 2

# Idle memory
IDLE_MEM=$(ps aux | grep $PID | awk '{print $6}')  # KB
echo "Idle memory: ${IDLE_MEM}KB"
assert_less_than $IDLE_MEM 102400  # 100MB

# Simulate interaction (answer questions)
for i in {1..40}; do
  xdotool search --name "Manifestation" windowactivate
  xdotool key Right Right Right Right Right  # Drag slider
  sleep 0.1
done

# Active memory
ACTIVE_MEM=$(ps aux | grep $PID | awk '{print $6}')  # KB
echo "Active memory: ${ACTIVE_MEM}KB"
assert_less_than $ACTIVE_MEM 204800  # 200MB

kill $PID
```

### 5.3 Database Query Performance

**Target**: <100ms for any query

```rust
#[test]
fn bench_query_response() {
  let db = Database::new(":memory:")?;
  
  // Insert 1000 responses
  for i in 0..1000 {
    db.insert_response("s1", format!("q{}", i), 5).await?;
  }
  
  let start = Instant::now();
  let result = db.get_response("s1", "q500").await?;
  let elapsed = start.elapsed();
  
  assert!(elapsed < Duration::from_millis(100));
}
```

---

## 6. Security Testing

### 6.1 Database Encryption

**Test**: Verify data is encrypted at rest

```bash
#!/bin/bash
# Test encryption

# Create test data
./app &
PID=$!
sleep 2

# Complete questionnaire with known values
# (through E2E automation)

sleep 1
kill $PID

# Examine database file
DB_FILE="$HOME/.manifestation-algorithm/data.db"

# Try to read without decryption
FILE_CONTENT=$(xxd $DB_FILE | head -20)
echo "$FILE_CONTENT" | grep -q "7"  # Answer was 7

# Should NOT find readable number
if ! echo "$FILE_CONTENT" | grep -q "^.*07.*$"; then
  echo "✅ Database encryption verified"
else
  echo "❌ Data found unencrypted!"
  exit 1
fi
```

### 6.2 Input Validation

**Test**: Invalid inputs rejected

```typescript
describe('Input Validation', () => {
  it('should reject values >10', () => {
    const store = useQuestionnaireStore()
    const result = store.recordAnswer("q1", 11)
    expect(result).toBeFalsy()
  })

  it('should reject values <1', () => {
    const store = useQuestionnaireStore()
    const result = store.recordAnswer("q1", 0)
    expect(result).toBeFalsy()
  })

  it('should reject non-integer values', () => {
    const store = useQuestionnaireStore()
    
    const result1 = store.recordAnswer("q1", 5.5)
    const result2 = store.recordAnswer("q1", "5")
    
    expect(result1).toBeFalsy()
    expect(result2).toBeFalsy()
  })

  it('should reject invalid question IDs', () => {
    const store = useQuestionnaireStore()
    const result = store.recordAnswer("invalid-q", 5)
    expect(result).toBeFalsy()
  })
})
```

---

## 7. Test Coverage Goals

| Component | Target | Method |
|-----------|--------|--------|
| Score calculation | 100% | Unit tests |
| Database ops | 95% | Unit + integration |
| Session management | 90% | Unit + integration |
| Auto-save | 85% | Integration |
| UI components | 70% | Snapshot + E2E |
| Error handling | 90% | Unit + integration |
| **Overall** | **>85%** | Code coverage tool |

---

## 8. Test Execution Schedule

### Week 1-2
- Set up test infrastructure
- Write unit tests (score, database, session)
- Achieve 70% coverage

### Week 3
- Integration tests (full flows)
- E2E test development
- Performance testing

### Week 4
- Cross-platform E2E (Windows/Mac/Linux)
- Security audit
- Bug fixes
- Final testing sprint

---

## 9. Defect Management

### Severity Levels
```
CRITICAL: App crash, data loss, security issue
  → Fix immediately, block release

HIGH: Feature broken, major workaround needed
  → Fix in next build, track for release

MEDIUM: Feature partially broken, workaround exists
  → Plan for next sprint

LOW: Minor issue, cosmetic, or edge case
  → Backlog for future
```

### Known Issues (To Test)
- macOS Monterey slider rendering (adjust CSS)
- Linux GTK text field scrolling (update gtk dep)
- Windows 10 high DPI scaling (Tauri handles)

---

## 10. Test Automation & CI/CD

### GitHub Actions Workflow

```yaml
name: Phase 1 Tests

on: [push, pull_request]

jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    
    runs-on: ${{ matrix.os }}
    
    steps:
      - uses: actions/checkout@v3
      - uses: rust-lang/rust-toolchain@v1
      
      - name: Run unit tests
        run: cargo test --lib
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        run: |
          cargo tarpaulin --out Xml
          bash <(curl -s https://codecov.io/bash)
```

---

## 11. Acceptance Criteria

Phase 1 is **TEST COMPLETE** when:

- [ ] Unit test coverage >85%
- [ ] All integration tests passing
- [ ] E2E tests passing on Windows 10+, macOS 10.15+, Ubuntu 20.04+
- [ ] Performance targets met (load time, memory, query speed)
- [ ] Security audit: No unencrypted data found
- [ ] Input validation: Rejects all invalid inputs
- [ ] Data recovery: Crash recovery verified
- [ ] Cross-platform: No OS-specific issues
- [ ] Manual QA: Sign-off from test lead

---

## Sign-Off

**Test Lead**: [TBD]  
**QA Manager**: [TBD]  
**Date**: 2026-02-18  

---

**Document End: Test-Plan-Phase-1.md**

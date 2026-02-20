# Manifestation Algorithm - Scoring Formula Specification

## Overview
The application calculates a "Manifestation Score" based on user self-assessments across 40 distinct categories. The maximum possible score is **10,000 points**.

## Core Formula

The total score is calculated by summing the weighted score of all active input fields.

$$
\text{Total Score} = \sum_{i=1}^{N} S_i
$$

Where $S_i$ is the score for an individual question, calculated as:

$$
S_i = \text{MaxPoints}_i \times \left( \frac{\text{UserRating}_i}{10} \right)
$$

- **MaxPoints**: The maximum weight assigned to a specific question (defined in the data schema).
- **UserRating**: An integer value selected by the user, ranging from **1 to 10**.

## Question Hierarchy & Implementation Rules

### 1. Standalone Questions
Questions without sub-items function as variable inputs.
- **Example**: Question 2 "Activate & Illuminate Words" (100 points).
- **Logic**: User rates 1-10.
- **Calculation**: $100 \times (Rating / 10)$.

### 2. Parent Questions with Sub-points
Questions that act as containers for sub-questions do **not** accept direct user input. Their score is effectively the sum of their children, but the calculation is performed on the children directly.
- **Example**: Question 1 "Master the Basics" (Header only).
    - Q1a (25 points)
    - Q1b (25 points)
    - Q1c (25 points)
    - Q1d (25 points)
- **Logic**: User rates Q1a, Q1b, Q1c, Q1d individually. The Parent Q1 does not have a slider.

### 3. Data Schema (Weights)
Table of weights extracted from the legacy system:

| ID | Description | Max Points | Type |
| :--- | :--- | :--- | :--- |
| **1** | **Master the Basics** | **100** | **Container** |
| 1a | Who do you listen to? | 25 | Input |
| 1b | Teachability Index | 25 | Input |
| 1c | Training Balance Scale | 25 | Input |
| 1d | Unconscious competence | 25 | Input |
| **2** | **Activate & Illuminate Words** | **100** | **Input** |
| **3** | **Find Pain & Contract Energy** | **250** | **Input** |
| **4** | **Define what you want** | **250** | **Input** |
| **5** | **Write down what you want** | **250** | **Input** |
| **6** | **Don't share your dream with others** | **50** | **Input** |
| **7** | **Get a burning desire for your goal** | **200** | **Input** |
| **8** | **Goal must be in Sweet Spot** | **50** | **Input** |
| **9** | **Make a Decision** | **200** | **Input** |
| **10** | **See/Feel good in possession of your goal** | **300** | **Input** |
| **11** | **Release attachment to the outcome** | **250** | **Input** |
| **12** | **Allow the HOW to present itself** | **100** | **Input** |
| **13** | **Know the difference between Dream & Chief Aim** | **50** | **Input** |
| **14** | **Be Focused / Singleness of purpose** | **50** | **Input** |
| **15** | **Daily TO DO list of Priorities** | **50** | **Input** |
| **16** | **Chart Progress / Know the Score** | **50** | **Input** |
| **17** | **Use Momentum Cycle of Success** | **50** | **Input** |
| **18** | **Dream Build - Dream Book & Vision Board** | **200** | **Input** |
| **19** | **Plug into System** | **500** | **Container** |
| 19a | Read books | 100 | Input |
| 19b | Listen to Audios | 100 | Input |
| 19c | Attend Events (monthly) | 100 | Input |
| 19d | Give and receive Recognition | 100 | Input |
| 19e | Develop relationships with like minded people | 100 | Input |
| **20** | **Science of Personal Mastery Course** | **750** | **Input** |
| **21** | **Watch the words you speak** | **200** | **Input** |
| **22** | **Physiology / Dress for success** | **50** | **Input** |
| **23** | **Clear Counter Intentions** | **1250** | **Container** |
| 23a | Money Processes | 500 | Input |
| 23b | Relationship Processes | 150 | Input |
| 23c | Leadership Processes | 150 | Input |
| 23d | Communication Processes | 100 | Input |
| 23e | Health Processes | 50 | Input |
| 23f | Spiritual Awareness Processes | 50 | Input |
| 23g | Dream Processes | 200 | Input |
| 23h | Organization & Focus Processes | 50 | Input |
| **24** | **Awaken your Inner Power: Superpower Processes** | **600** | **Input** |
| **25** | **Broadcast on Alpha-theta brainwave** | **100** | **Input** |
| **26** | **Stop Telling Your Story of woe** | **100** | **Input** |
| **27** | **Show Appreciation / Gratitude** | **100** | **Input** |
| **28** | **Replace Failure Habits w/ Success Habits** | **600** | **Input** |
| **29** | **Create a Mastermind** | **50** | **Input** |
| **30** | **Watch Successful People/Apprentice** | **250** | **Input** |
| **31** | **Listen to/Read Success Stories** | **50** | **Input** |
| **32** | **Give away what you want first** | **200** | **Input** |
| **33** | **Do It Now Mentality** | **50** | **Input** |
| **34** | **Take Care of Your Body** | **50** | **Input** |
| **35** | **Find the Gold in Adversity** | **50** | **Input** |
| **36** | **Clear Samskaras from Field** | **200** | **Input** |
| **37** | **Take 100% Responsibility** | **200** | **Input** |
| **38** | **Attractor Field Generators** | **800** | **Input** |
| **39** | **Join a Club that connects you to a Power Source** | **1200** | **Input** |
| **40** | **Live life with deliberate intent** | **100** | **Input** |

## Test Cases

| Scenario | Input | Logic | Expected Total |
| :--- | :--- | :--- | :--- |
| **Minimum** | 1 for all inputs | $\sum (\text{Point}_i \times 0.1)$ | 1,000 |
| **Maximum** | 10 for all inputs | $\sum (\text{Point}_i \times 1.0)$ | 10,000 |
| **Mid-range** | 5 for all inputs | $\sum (\text{Point}_i \times 0.5)$ | 5,000 |
| **Single Item** | Q2=10, rest=0 | $100 \times 1.0$ | 100 |

Note: "0" rating is not possible in standard UI (min is 1), but effectively represents unanswered.

## Default Rating for Unanswered Questions

When a session is submitted, any question that was never touched by the user receives a default rating of **1** (not 0). This is applied in `questionnaire` store's `submitSession()` before the score is calculated:

```typescript
// questionnaire.ts — submitSession()
const fullAnswers: AnswerSheet = {};
for (const q of questions) {
  const subIds = q.subPoints?.map(s => s.id) ?? [q.id];
  for (const id of subIds) {
    fullAnswers[id] = answers.value[id] ?? 1; // default = 1, not 0
  }
}
```

This means a completely empty submission scores **1,000 points** (10% of maximum), not 0.

## getMaxPossibleScore()

The `scoring.ts` service exposes a helper that computes the theoretical maximum:

```typescript
function getMaxPossibleScore(): number {
  const allTen: AnswerSheet = {};
  for (const q of questions) {
    const targets = q.subPoints ?? [q];
    for (const t of targets) {
      allTen[t.id] = 10;
    }
  }
  return calculateScore(allTen); // always 10,000
}
```

This is used by the dashboard percentage display:

```typescript
const percent = (score / getMaxPossibleScore()) * 100;
```

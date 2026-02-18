# Product Requirements Document (PRD)
## Phase 2: Statistics Dashboard - Trends & Analytics

**Project**: Manifestation Algorithm Desktop Application  
**Phase**: 2 - Statistics Dashboard  
**Duration**: Weeks 5-8 (4 weeks)  
**Status**: Planning  
**Created**: February 18, 2026  
**BMAD Artifact Type**: Planning - Product Requirements  
**Dependency**: Phase 1 Complete  

---

## Executive Summary

Phase 2 adds data visualization and analytics capabilities to the core application. Users can now view their questionnaire scores over time through an interactive statistics dashboard featuring 40 individual category trend charts, overall score tracking, drill-down analysis, and color-coded trend indicators. This phase transforms stored historical data into actionable insights.

**Success Criteria**: Statistics dashboard displays 40 category scores with interactive line graphs, trend percentages, and drill-down capability without performance degradation.

---

## 1. Product Overview

### Problem Statement
Currently (after Phase 1), users can take questionnaires and store results but have no way to:
- Visualize score progression over time
- Compare individual category performance
- Identify improvement trends vs. declines
- Access detailed historical analysis
- Export data for personal review

### Solution Vision
Create a comprehensive statistics dashboard that:
- Displays all 40 manifestation categories with current scores
- Shows 30-90 day trend sparklines for each category
- Provides interactive line graphs for detailed analysis
- Color-codes trends (black = uptrend, red = downtrend, gray = neutral)
- Calculates and displays trend percentages
- Allows date range filtering and data export
- Includes overall score tracking with trend analysis

### Primary Users
- Users completing questionnaires repeatedly (weekly/monthly)
- Users tracking manifestation progress
- Users wanting statistical validation of progress
- Data-driven users wanting detailed analytics

---

## 2. Core Features

### Feature 2.1: Overview Grid (40 Categories)

**Description**: Dashboard landing page showing all 40 manifestation categories in a responsive grid format.

**Layout Specifications**:
```
┌─────────────────────────────────────────────────────┐
│  Category 1        Category 2        Category 3     │
│  Master Basics     Activate Words    Find Pain      │
│  ┌──────────────┐┌──────────────┐┌──────────────┐  │
│  │ Score: 8.5   ││ Score: 7.2   ││ Score: 9.1   │  │
│  │ ▁▂▃▄▅▄▃▂▁   ││ ▃▄▅▆▅▄▃▂▁    ││ ▂▃▄▅▆▇▆▅▄  │  │
│  │ ↑ +2.3%      ││ ↓ -1.5%      ││ ↑ +3.2%      │  │
│  └──────────────┘└──────────────┘└──────────────┘  │
│                                                     │
│  Category 4        Category 5        Category 6     │
│  [Similar cards continue...]                       │
│                                                     │
│  Category 40                                        │
│  [Last category card]                              │
└─────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] All 40 categories displayed in responsive grid
- [ ] Grid auto-adjusts: 3 columns (1280px+), 2 columns (800px+), 1 column (<800px)
- [ ] Each card shows: Category name, current score, sparkline, trend
- [ ] Cards are clickable to drill into detail view
- [ ] Page loads in <1 second
- [ ] Smooth scroll through all categories (lazy loading optional)

**Card Components**:
- **Category Name**: 20px font, bold
- **Score**: 32px font, color-coded:
  - Green (8-10): High manifestation readiness
  - Yellow (5-7): Moderate
  - Red (1-4): Low (improvement area)
- **Sparkline**: 60px wide, 30px tall, showing last 30 days
  - Black line = uptrend
  - Red line = downtrend
  - Gray line = neutral
- **Trend Arrow + %**: 
  - ↑ + green for positive
  - ↓ + red for negative
  - → + gray for neutral

### Feature 2.2: Category Detail View

**Description**: Full-page drill-down showing detailed history and analytics for a single category.

**Layout**:
```
┌─────────────────────────────────────────────────────┐
│ ← Back     Category 5: "Write Down Your Goal"       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Current Score: 8.5                   ↑ +12.5%     │
│  (updated March 18, 2026)                           │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │                      9 │                      │  │
│  │               ╱╲       │      ╱╲               │  │
│  │             ╱    ╲     │    ╱    ╲             │  │
│  │           ╱        ╲   │  ╱        ╲           │  │
│  │  ┌┐─────────────────────────────────────────┐  │  │
│  │  └┘ 2 Mar  9 Mar  16 Mar 23 Mar 1 Apr       │  │  (Line Graph)
│  │                                              │  │
│  │  [From: Mar 1 ----] [To: Apr 18 ----] [Reset] │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  Change from previous period:                       │
│  Last 30 days: ↑ +8.2%                              │
│  Last 90 days: ↑ +15.3%                             │
│  All-time high: 9.2 (Jan 15, 2026)                  │
│  All-time low: 4.1 (Oct 2025)                       │
│                                                     │
│ ┌─── History Table ───────────────────────────────┐│
│ │ Date      │ Score │ Change │ 7-Day Avg         ││
│ │ Mar 18    │ 8.5   │ +0.1   │ 8.4               ││
│ │ Mar 11    │ 8.4   │ +0.5   │ 8.3               ││
│ │ Mar 4     │ 7.9   │ -0.2   │ 8.1               ││
│ │ Feb 25    │ 8.1   │ +1.2   │ 8.3               ││
│ │ ... more rows                                  ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│  [Download CSV]  [Print]                            │
└─────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Line graph renders in <500ms with 90+ data points
- [ ] Interactive hover: Shows exact value and date
- [ ] Date range slider: Adjustable start and end dates
- [ ] History table: Shows all entries in selected range (50 max visible, paginated)
- [ ] Statistics calculated:
  - Current score (largest text)
  - Trend % (vs previous period)
  - All-time high/low
  - 7-day/30-day/90-day averages
- [ ] Export CSV: Includes all data in selected range
- [ ] Colors: Black line (uptrend), Red line (downtrend), Gray (neutral)
- [ ] Touch support: Can pan and zoom chart on mobile/tablet

### Feature 2.3: Overall Score Graph

**Description**: Full-page view of total manifestation score trends over entire history.

**Layout**:
```
┌──────────────────────────────────────────────────┐
│ Your Manifestation Readiness Score               │
│ Overall Progress Tracker                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  Total Score: 7,500 / 10,000 (75%)              │
│  Trend: ↑ +15% over 3 months                    │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │  10k │                    ╱╲               │  │
│  │      │                  ╱    ╲             │  │
│  │   8k │                ╱        ╲╱╲          │  │
│  │      │              ╱              ╲        │  │
│  │   6k │            ╱                 ╲╱──    │  │
│  │      │          ╱                              │  │
│  │   4k │────────────────────────────────────    │  │
│  │      │                                        │  │
│  │   0k │───────────────────────────────────    │  │
│  │      └────────────────────────────────────    │  │
│  │   Jan  Feb  Mar  Apr  May  Jun  Jul  Aug   │  │
│  │                                              │  │
│  │ [From: Jan 1 ----] [To: Aug 31 ----]       │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│ Analysis:                                        │
│ • Highest score: 7,850 (May 15, 2026)            │
│ • Lowest score: 6,200 (Jan 30, 2026)             │
│ • Average (all-time): 7,100                      │
│ • Momentum: Strong upward trend                  │
│ • Completions: 24 questionnaires                 │
│                                                  │
│ Categories with highest improvement (90 days):  │
│ 1. Master the Basics: ↑ +18%                    │
│ 2. Activate & Illuminate: ↑ +15%                │
│ 3. Find the Pain: ↑ +12%                        │
│                                                  │
│ Categories needing focus (last 30 days):        │
│ 1. Take Decisive Action: ↓ -5%                  │
│ 2. Leverage Your Gifts: ↓ -3%                   │
│                                                  │
│ [Download Chart as PNG] [Download CSV]          │
└──────────────────────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Line graph spans entire history with all data points
- [ ] Y-axis: 0 to 10,000 points with 1,000 point intervals
- [ ] X-axis: Date range (automatic)
- [ ] Current total score prominently displayed (48px font)
- [ ] Trend calculation: Percentage change vs 90 days ago
- [ ] Statistics block shows: high, low, average, momentum
- [ ] Top 3 improving categories listed
- [ ] Top 3 declining categories listed (if any)
- [ ] Can filter by date range
- [ ] Export options: PNG (chart), CSV (data)

### Feature 2.4: Statistics Summary Cards

**Description**: Quick-reference cards showing key performance metrics.

**Summary Block Layout** (Top of dashboard):
```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Overall Score     Last (7 Days)  Best (All-Time) │
│  7,500 points      7,485 points   8,150 points   │
│  ↑ +15%            ↑ +2%          [Achievement]  │
│                                                  │
│  Completions       Days Tracked   Consistency    │
│  24 total          156 days       85% regular    │
│  (6 this month)    (5+ months)    (weekly avg)   │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Cards show current snapshot of key metrics
- [ ] Update immediately when new questionnaire completed
- [ ] Trends color-coded: Green (up), Red (down), Gray (neutral)
- [ ] Load in <100ms
- [ ] Responsive to screen size

### Feature 2.5: Category Sorting & Filtering

**Description**: Tools to organize and focus on specific categories.

**Controls**:
```
[SORT]              [FILTER]           [GROUP BY]
▼ Alphabetical      ▼ All Scores       ← Back
  Score (High→Low)    Improving Only
  Trend (Best)        Declining Only
  Trend (Worst)       Top 10
  Recent Change       Bottom 10
```

**Acceptance Criteria**:
- [ ] Sorting persists during session
- [ ] Filtering updates grid immediately
- [ ] "Improving Only" shows categories with positive trend
- [ ] "Declining Only" shows categories needing focus
- [ ] "Top 10" shows highest scoring categories
- [ ] "Bottom 10" shows lowest scoring categories
- [ ] Multiple filters can combine (OR logic)

### Feature 2.6: History Table & CSV Export

**Description**: Detailed tabular view of all questionnaire completions and data export.

**Table Structure**:
```
Date Completed | Total Score | Avg Categories | # Improved | # Declined | # Flat
──────────────────────────────────────────────────────────────────────────────
Mar 18, 2026   | 7,500       | 7.5            | 18         | 15         | 7
Mar 11, 2026   | 7,485       | 7.4            | 17         | 16         | 7
Mar 4, 2026    | 7,380       | 7.3            | 14         | 19         | 7
[... more rows]
```

**Export CSV Format**:
```csv
Date,Total_Score,Category_1,Category_2,Category_3,...,Category_40
2026-03-18,7500,8.5,7.2,9.1,...,6.8
2026-03-11,7485,8.4,7.1,9.0,...,6.9
...
```

**Acceptance Criteria**:
- [ ] Table shows all completions with key metrics
- [ ] CSV export includes all 40 categories
- [ ] Export filename: manifestation-data-[DATE].csv
- [ ] CSV opens cleanly in Excel, Google Sheets, etc.
- [ ] Can filter by date range before exporting
- [ ] Export button visible and functional

---

## 3. User Flows

### Flow 1: First-Time Review After Completion
```
1. User completes questionnaire (Phase 1)
2. Submit button shown → Click Submit
3. Auto-transition to Stats Dashboard
4. Dashboard loads: Overview grid visible
5. Stats cards show:
   - Overall Score: [First Score]
   - Last 7 Days: [This score only]
   - Best: [This score only]
   - Completions: 1
6. Category cards show current scores, no sparklines (only 1 data point)
```

### Flow 2: Comparing Two Completions
```
1. User completes second questionnaire (after 1 week)
2. Dashboard refreshes
3. Sparklines now visible (2 data points)
4. Trend arrows show: ↑ for improved, ↓ for declined
5. User clicks Category 5 to drill down
6. Detail view shows: Score increased from 7.2 → 8.5
7. Line graph shows small uptrend
8. User downloads CSV to track externally
```

### Flow 3: Analyzing 3-Month Progress
```
1. User has completed 12 questionnaires (weekly)
2. Opens Stats Dashboard
3. Overview grid shows all 40 categories with 30-day sparklines
4. Color-coding clear: mostly black lines (improving trend)
5. User identifies 3 weakest categories:
   - Category 15: Score 4.2 (red downtrend)
   - Category 22: Score 5.1 (gray, no trend)
   - Category 8: Score 5.5 (slight uptrend)
6. User clicks Category 15 to see detailed history
7. Detail view shows date of each completion
8. User notices decline after specific date
9. User exports CSV to analyze correlation with life events
```

---

## 4. Data Architecture

### Database Schema Extensions

```sql
-- Categories master table (reference data)
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  category_name TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Individual category scores (per completion, per category)
CREATE TABLE category_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stats_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  score REAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(stats_id) REFERENCES stats(id),
  FOREIGN KEY(category_id) REFERENCES categories(id),
  UNIQUE(stats_id, category_id)
);

-- Aggregated statistics (calculated fields)
CREATE TABLE stat_summaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  completion_date TEXT NOT NULL UNIQUE,
  total_score REAL NOT NULL,
  avg_category_score REAL,
  num_improved INTEGER,
  num_declined INTEGER,
  num_flat INTEGER,
  created_at TIMESTAMP
);

-- Indices for performance
CREATE INDEX idx_category_scores_stats ON category_scores(stats_id);
CREATE INDEX idx_category_scores_category ON category_scores(category_id);
CREATE INDEX idx_stat_summaries_date ON stat_summaries(completion_date DESC);
```

### Calculated Fields

```typescript
// Trend calculation for category
trend_percentage = ((latest_score - oldest_score) / oldest_score) * 100

// Color determination
getTrendColor(trend: number): string {
  if (trend > 0.5) return '#000000'      // Black for uptrend
  if (trend < -0.5) return '#e74c3c'     // Red for downtrend
  return '#999999'                       // Gray for neutral
}

// Sparkline data (last 30 days)
sparklineData = categoryScores
  .filter(score => score.date >= (today - 30 days))
  .map(score => score.value)

// Overall metrics
overallImprovement = (current_total_score - 90_day_ago_score) / 90_day_ago_score * 100
```

---

## 5. User Interface Components

### New Vue Components to Create

```
src/components/
├── Statistics/
│   ├── OverviewGrid.vue          (40 category cards)
│   ├── CategoryCard.vue           (Single category card)
│   ├── CategoryDetail.vue         (Drill-down detail view)
│   ├── OverallScoreGraph.vue      (Total score line graph)
│   ├── LineChart.vue             (Reusable chart component)
│   ├── StatsSummary.vue          (Key metrics cards)
│   ├── HistoryTable.vue          (Completion history)
│   ├── DateRangeFilter.vue       (Date range picker)
│   └── ExportButton.vue          (CSV/PNG export)
├── Settings/
│   └── StatisticsSettings.vue    (Privacy, data export)
└── Shared/
    ├── LoadingSpinner.vue
    ├── EmptyState.vue
    └── ErrorBoundary.vue
```

### Chart.js Integration

```typescript
// Chart configuration
const chartConfig = {
  type: 'line',
  data: {
    labels: dates,     // X-axis (dates)
    datasets: [{
      label: categoryName,
      data: scores,    // Y-axis (score values)
      borderColor: trendColor,  // Black/Red/Gray
      borderWidth: 2,
      fill: false,
      tension: 0.2,    // Smooth curves
      pointRadius: 3,
      pointBackgroundColor: trendColor,
      hoverBackgroundColor: '#fff',
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    interaction: { mode: 'index', intersect: false },
    scales: {
      y: { min: 0, max: 10, ticks: { stepSize: 1 } }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  }
}
```

---

## 6. Performance Requirements

### Rendering Targets
| Component | Load Time | Interaction |
|-----------|-----------|-------------|
| Overview Grid (40 cards) | <1s | Immediate scroll |
| Category Detail Graph | <500ms | Responsive hover |
| Overall Score Graph | <500ms | Smooth pan/zoom |
| History Table (50 rows) | <300ms | Instant sort/filter |

### Data Query Targets
| Query | Target Time | Sample Size |
|-------|-------------|-------------|
| Get all category scores | <100ms | 40 categories × 90 data points |
| Calculate trend | <50ms | 90-day history |
| Export CSV | <1s | 40 cats × 100 completions |
| Aggregate statistics | <100ms | All-time data |

### Browser Performance
- Initial load: <2 seconds
- Chart interaction: 60fps
- Scroll smoothness: No jank
- Memory usage: <100MB (including all 40 charts in DOM)

---

## 7. Testing Requirements

### Unit Tests
- [ ] Trend calculation logic (positive, negative, neutral cases)
- [ ] Color coding function (returns correct hex for trend values)
- [ ] Sparkline data generation (handles < 30 days)
- [ ] CSV export formatting (40 columns, valid CSV)
- [ ] Statistics aggregation (all-time, 30-day, 90-day calculations)

### Integration Tests
- [ ] Questionnaire completion → Score saved → Dashboard updates
- [ ] Category card click → Detail view displays correct data
- [ ] Date range filter → Only selected dates shown
- [ ] CSV export → File opens correctly in Excel

### E2E Tests
- [ ] Complete questionnaire → Dashboard auto-loads with new score
- [ ] Overview grid → All 40 cards render
- [ ] Click 5 random categories → All drill-down views load correctly
- [ ] Filter by date → Table updates, chart re-renders
- [ ] Export CSV → File downloads, contains expected data
- [ ] Responsive: Test on 1024px, 768px, 375px widths

### Visual Regression Tests
- [ ] Card layouts look identical across all platforms
- [ ] Line graphs render consistently
- [ ] Responsive breakpoints function correctly
- [ ] Colors (black/red/gray) display correctly

---

## 8. Acceptance Criteria (Phase Gate)

Phase 2 is **COMPLETE** when:

- [ ] Overview grid displays all 40 categories with sparklines
- [ ] Each category card shows: name, score, sparkline, trend %
- [ ] Drill-down detail view opens for any category
- [ ] Detail view shows: line graph, history table, date range filter
- [ ] Overall score graph displays total score trend
- [ ] All charts render in <500ms
- [ ] Color coding correct: Black (up), Red (down), Gray (neutral)
- [ ] CSV export includes all 40 categories
- [ ] Statistics update immediately after new questionnaire
- [ ] All E2E tests pass on Windows, macOS, Linux
- [ ] No performance degradation from Phase 1
- [ ] Responsive design works on 1024px minimum width

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Overview Grid Load** | <1 second | Chrome DevTools Performance |
| **Chart Interactivity** | 60fps | Hover, zoom performance |
| **Data Refresh** | <2 seconds | After questionnaire submit |
| **CSV Export** | <1 second | Time to download file |
| **Memory Usage** | <100MB | Chrome Task Manager |
| **Test Coverage** | >85% | Code coverage report |
| **Responsive Breakpoints** | 100% pass | Manual + automated tests |

---

## 10. Timeline & Milestones

### Week 5: Data Architecture & Setup
- [ ] Extend database schema for category scores
- [ ] Create category reference data
- [ ] Implement score aggregation queries
- [ ] Set up Pinia store for stats state management

**Deliverable**: Database ready, test data loaded, state management functional

### Week 6: Overview Grid & Detail View
- [ ] Build OverviewGrid component with all 40 cards
- [ ] Create CategoryCard sub-component
- [ ] Implement Category Detail view with drill-down
- [ ] Build responsive grid layout

**Deliverable**: Overview and detail views fully interactive

### Week 7: Charts & Visualization
- [ ] Integrate Chart.js library
- [ ] Create LineChart wrapper component
- [ ] Build Overall Score graph
- [ ] Implement date range filter

**Deliverable**: All charts rendering with correct data

### Week 8: Polish & Testing
- [ ] Add history table with sorting/filtering
- [ ] Implement CSV export functionality
- [ ] Comprehensive testing (unit, integration, E2E)
- [ ] Performance optimization and cross-platform testing

**Deliverable**: All Phase 2 criteria met, ready for Phase 3

---

## 11. Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Chart.js performance with 40+ charts | Medium | High | Virtualize, lazy-load charts |
| Database query performance at scale | Low | Medium | Index optimization, caching |
| Responsive design complexity | Medium | Low | Early mobile testing |
| Data export format compatibility | Low | Low | Test with multiple spreadsheet tools |

---

## 12. Dependencies

- Phase 1: Core Application (MUST be complete)
- Chart.js library: ^4.0.0
- Database optimization: Indices on category_scores and stats

---

## 13. Out of Scope (Phase 2)

- IPFS integration (Phase 3)
- Network statistics aggregation (Phase 3)
- Predictions or machine learning (Post-Phase 4)
- Collaboration or sharing (Phase 3)
- Mobile apps (Future expansion)
- Social features (Future expansion)

---

## 14. Sign-Off

**Product Manager**: [TBD]  
**Engineering Lead**: [TBD]  
**Date**: February 18, 2026  

This PRD establishes all requirements for Phase 2 statistics dashboard implementation. Phase 2 depends on successful Phase 1 completion.

**Status**: Ready for Development (after Phase 1 complete)

---

**Document End: PRD-Phase-2-Statistics-Dashboard.md**

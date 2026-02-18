# Test Plan - Phase 2: Statistics Dashboard
## Interactive Analytics & Visualization Testing

**Project**: Manifestation Algorithm Desktop Application  
**Phase**: 2 - Statistics Dashboard  
**Duration**: Weeks 5-8  
**Status**: Planning  
**Created**: February 18, 2026  
**Test Lead**: [TBD]  

---

## 1. Test Plan Overview

### Scope
This test plan covers all Phase 2 deliverables:
- 40-category overview grid with sparklines
- Category detail drill-down views
- Overall score trend graph (line chart)
- Statistics cards (mean, median, quartiles)
- Date range filtering
- CSV export functionality
- Real-time data aggregation from Phase 1 database

### Out of Scope
- Network features (Phase 3)
- Distribution (Phase 4)
- Mobile responsiveness
- Advanced analytics (Phase 4 potential)

### Test Strategy
```
Unit Tests (40%)
├─ Statistics calculations (mean, median, stddev)
├─ Sparkline data generation
├─ Date filtering logic
├─ CSV export formatting
└─ Chart.js data transformation

Integration Tests (35%)
├─ Database → Stats calculation → UI display
├─ Real-time updates on new data
├─ Drill-down navigation
├─ Export accuracy (matches displayed data)
└─ Performance with large datasets

E2E Tests (20%)
├─ View dashboard
├─ Drill-down to detail
├─ Date range filtering
├─ CSV download and verify
└─ Responsiveness across screen sizes

Performance Tests (5%)
├─ 40-category render time
├─ Chart render performance
├─ Large dataset (5 years) handling
└─ Memory usage during interaction
```

---

## 2. Unit Testing

### 2.1 Statistics Calculation Tests

**Module**: `src-tauri/src/statistics.rs`

```rust
#[test]
fn test_calculate_mean() {
  let scores = vec![1.0, 2.0, 3.0, 4.0, 5.0];
  let mean = calculate_mean(&scores);
  assert_eq!(mean, 3.0);
}

#[test]
fn test_calculate_median() {
  let scores = vec![5.0, 1.0, 3.0, 2.0, 4.0];
  let median = calculate_median(&scores);
  assert_eq!(median, 3.0);
}

#[test]
fn test_calculate_median_even() {
  let scores = vec![1.0, 2.0, 3.0, 4.0];
  let median = calculate_median(&scores);
  assert_eq!(median, 2.5);  // Average of 2 and 3
}

#[test]
fn test_calculate_stddev() {
  let scores = vec![1.0, 2.0, 3.0];
  let stddev = calculate_standard_deviation(&scores);
  assert!((stddev - 0.816).abs() < 0.01);  // ≈0.816
}

#[test]
fn test_calculate_quartiles() {
  let scores = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0];
  let (q1, q2, q3) = calculate_quartiles(&scores);
  
  assert_eq!(q1, 2.5);   // 25th percentile
  assert_eq!(q2, 4.5);   // 50th percentile (median)
  assert_eq!(q3, 6.5);   // 75th percentile
}

#[test]
fn test_calculate_percentile() {
  let scores = vec![1.0, 2.0, 3.0, 4.0, 5.0];
  let p90 = calculate_percentile(&scores, 90);
  assert_eq!(p90, 4.6);
}

#[test]
fn test_stats_by_category() {
  let responses = vec![
    Response { question: 1, answer: 7, date: today() },
    Response { question: 1, answer: 8, date: today() },
    Response { question: 2, answer: 5, date: today() },
  ];
  
  let stats = calculate_stats_by_category(&responses);
  
  assert_eq!(stats[1].mean, 7.5);
  assert_eq!(stats[1].count, 2);
  assert_eq!(stats[2].mean, 5.0);
  assert_eq!(stats[2].count, 1);
}

#[test]
fn test_trend_detection() {
  // Upward trend
  let scores = vec![5.0, 6.0, 7.0, 8.0, 9.0];
  let trend = detect_trend(&scores);
  assert_eq!(trend, "improving");
  
  // Downward trend
  let scores = vec![9.0, 8.0, 7.0, 6.0, 5.0];
  let trend = detect_trend(&scores);
  assert_eq!(trend, "declining");
  
  // Stable
  let scores = vec![5.0, 5.0, 5.0, 5.0, 5.0];
  let trend = detect_trend(&scores);
  assert_eq!(trend, "stable");
}

#[test]
fn test_empty_dataset() {
  let empty: Vec<f64> = vec![];
  assert!(calculate_mean(&empty).is_nan());
}

#[test]
fn test_single_value() {
  let single = vec![5.0];
  assert_eq!(calculate_mean(&single), 5.0);
  assert_eq!(calculate_median(&single), 5.0);
}
```

---

### 2.2 Sparkline Data Generation

**Module**: Sparkline generation

```typescript
describe('Sparkline Generation', () => {
  it('should generate 7-day sparkline', () => {
    const scores = [
      { date: '2026-02-11', value: 5 },
      { date: '2026-02-12', value: 6 },
      { date: '2026-02-13', value: 7 },
      { date: '2026-02-14', value: 6 },
      { date: '2026-02-15', value: 5 },
      { date: '2026-02-16', value: 8 },
      { date: '2026-02-17', value: 7 },
    ]
    
    const sparkline = generateSparkline(scores, 7)
    expect(sparkline.length).toBe(7)
    expect(sparkline.max).toBe(8)
    expect(sparkline.min).toBe(5)
  })

  it('should handle missing days', () => {
    const scores = [
      { date: '2026-02-11', value: 5 },
      // 2026-02-12 missing
      { date: '2026-02-13', value: 7 },
    ]
    
    const sparkline = generateSparkline(scores, 7)
    expect(sparkline.length).toBe(7)
    // Missing value should be null or interpolated
    expect(sparkline[1]).toBeNull()
  })

  it('should color code sparkline', () => {
    const scores = [
      { date: '2026-02-13', value: 3 },  // Low
      { date: '2026-02-14', value: 5 },  // Mid
      { date: '2026-02-15', value: 8 },  // High
    ]
    
    const sparkline = generateSparkline(scores)
    expect(sparkline[0].color).toBe('red')     // Low
    expect(sparkline[1].color).toBe('gray')    // Mid
    expect(sparkline[2].color).toBe('black')   // High
  })

  it('should scale values 0-100', () => {
    const scores = [
      { date: '2026-02-13', value: 1 },   // Min
      { date: '2026-02-14', value: 5.5 }, // Mid
      { date: '2026-02-15', value: 10 },  // Max
    ]
    
    const sparkline = generateSparkline(scores, 7, 'scaled')
    expect(sparkline[0]).toBe(0)
    expect(sparkline[1]).toBe(50)
    expect(sparkline[2]).toBe(100)
  })
})
```

---

### 2.3 Date Filtering Tests

**Module**: Date range filter

```typescript
describe('Date Filtering', () => {
  it('should filter by date range', () => {
    const data = [
      { date: '2026-02-10', value: 5 },
      { date: '2026-02-13', value: 7 },
      { date: '2026-02-17', value: 6 },
    ]
    
    const filtered = filterByDateRange(data, '2026-02-13', '2026-02-17')
    expect(filtered).toEqual([
      { date: '2026-02-13', value: 7 },
      { date: '2026-02-17', value: 6 },
    ])
  })

  it('should support "last 7 days" filter', () => {
    const today = new Date('2026-02-18')
    const data = generateDataForDays(30)
    
    const filtered = filterByPreset(data, 'last7days', today)
    expect(filtered.length).toBe(7)
  })

  it('should support "last 30 days" filter', () => {
    const filtered = filterByPreset(data, 'last30days', today)
    expect(filtered.length).toBe(30)
  })

  it('should support "last year" filter', () => {
    const filtered = filterByPreset(data, 'last365days', today)
    expect(filtered.length).toBeLessThanOrEqual(365)
  })

  it('should aggregate by week', () => {
    const data = generateDailyData(30)
    const weekly = aggregateByPeriod(data, 'week')
    
    expect(weekly.length).toBe(5)  // ~4.3 weeks
    expect(weekly[0].value).toBeDefined()  // Average for week
  })

  it('should aggregate by month', () => {
    const data = generateDailyData(90)
    const monthly = aggregateByPeriod(data, 'month')
    
    expect(monthly.length).toBe(3)  // 3 months
  })
})
```

---

### 2.4 CSV Export Tests

**Module**: CSV export

```typescript
describe('CSV Export', () => {
  it('should generate CSV from displayed data', () => {
    const stats = [
      { category: 'Sleep', mean: 7.2, count: 30 },
      { category: 'Exercise', mean: 6.8, count: 30 },
    ]
    
    const csv = generateCSV(stats)
    expect(csv).toContain('category,mean,count')
    expect(csv).toContain('Sleep,7.2,30')
    expect(csv).toContain('Exercise,6.8,30')
  })

  it('should escape special characters', () => {
    const stats = [
      { category: 'Work/Life "Balance"', mean: 5.5 },
    ]
    
    const csv = generateCSV(stats)
    expect(csv).toContain('"Work/Life ""Balance"""')
  })

  it('should include date range in header', () => {
    const csv = generateCSV(data, {
      startDate: '2026-02-01',
      endDate: '2026-02-18'
    })
    
    expect(csv).toContain('Date Range: 2026-02-01 to 2026-02-18')
  })

  it('should format numbers consistently', () => {
    const stats = [
      { mean: 7.2, median: 7, stddev: 1.234567 },
    ]
    
    const csv = generateCSV(stats)
    expect(csv).toContain('7.2')     // 1 decimal
    expect(csv).toContain('7')       // Integer
    expect(csv).toContain('1.23')    // 2 decimals
  })

  it('should save file with correct name', async () => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const filename = generateFilename()
    
    expect(filename).toMatch(/^manifestation-stats-\d{4}-\d{2}-\d{2}\.csv$/)
  })
})
```

---

### 2.5 Chart.js Data Transformation

**Module**: Chart data generation

```typescript
describe('Chart Data Transformation', () => {
  it('should transform daily scores to chart format', () => {
    const scores = [
      { date: '2026-02-10', value: 5 },
      { date: '2026-02-11', value: 6 },
      { date: '2026-02-12', value: 7 },
    ]
    
    const chartData = transformToChartData(scores)
    
    expect(chartData.labels).toEqual(['2026-02-10', '2026-02-11', '2026-02-12'])
    expect(chartData.datasets[0].data).toEqual([5, 6, 7])
  })

  it('should color-code line chart by trend', () => {
    const scores = [5, 6, 7, 8, 9]  // Improving
    const chartData = transformToChartData(scores)
    
    expect(chartData.datasets[0].borderColor).toBe('rgb(34, 197, 94)')  // Green
  })

  it('should set chart boundaries 0-10', () => {
    const scores = [5, 6, 7]
    const chartData = transformToChartData(scores)
    
    expect(chartData.options.scales.y.min).toBe(0)
    expect(chartData.options.scales.y.max).toBe(10)
  })

  it('should smooth line with tension', () => {
    const chartData = transformToChartData(scores)
    expect(chartData.datasets[0].tension).toBeGreaterThan(0)
  })
})
```

---

## 3. Integration Testing

### 3.1 Dashboard Data Flow

**Test Scenario**: Database → Statistics → UI Display

```typescript
describe('Dashboard Data Flow', () => {
  it('should calculate stats from Phase 1 data', async () => {
    // Assume Phase 1 data: 30 days of questionnaires
    // Each with 40 category scores
    
    const db = await Database.new()
    const dashboard = createDashboard(db)
    
    // Calculate all stats
    const stats = await dashboard.calculateStats()
    
    // Should have 40 categories
    expect(stats.categories.length).toBe(40)
    
    // Each should have mean, median, stddev
    stats.categories.forEach(cat => {
      expect(cat.mean).toBeGreaterThan(0)
      expect(cat.median).toBeGreaterThan(0)
      expect(cat.stddev).toBeGreaterThanOrEqual(0)
    })
  })

  it('should update stats on new data', async () => {
    const db = await Database.new()
    const dashboard = createDashboard(db)
    
    const before = await dashboard.calculateStats()
    const before_mean = before.categories[0].mean
    
    // Add new response
    await db.insertResponse('new-session', 'q1', 10)
    
    const after = await dashboard.calculateStats()
    const after_mean = after.categories[0].mean
    
    expect(after_mean).not.toBe(before_mean)  // Updated
  })

  it('should display sparkline for each category', async () => {
    const db = await Database.new()
    const dashboard = createDashboard(db)
    
    const categories = await dashboard.getCategoryCards()
    
    categories.forEach(cat => {
      expect(cat.sparkline).toBeDefined()
      expect(cat.sparkline.length).toBeGreaterThan(0)
    })
  })
})
```

---

### 3.2 Drill-Down Navigation

**Test Scenario**: Click category → View detail chart

```typescript
describe('Drill-Down Functionality', () => {
  it('should navigate to category detail', async () => {
    const wrapper = mount(Dashboard)
    
    // Click on "Sleep" category card
    await wrapper.find('[data-category="sleep"]').trigger('click')
    
    // Detail view should show
    expect(wrapper.find('[data-view="detail"]').exists()).toBe(true)
    expect(wrapper.find('[data-chart="sleep-detail"]').exists()).toBe(true)
  })

  it('should show 30-day history', async () => {
    const wrapper = mount(Dashboard)
    await wrapper.find('[data-category="sleep"]').trigger('click')
    
    const chart = wrapper.find('[data-chart="sleep-detail"]')
    const dataPoints = chart.vm.chartData.labels.length
    
    expect(dataPoints).toBeLessThanOrEqual(30)
  })

  it('should show statistics sidebar', async () => {
    const wrapper = mount(Dashboard)
    await wrapper.find('[data-category="sleep"]').trigger('click')
    
    expect(wrapper.find('[data-test="stats-sidebar"]').exists()).toBe(true)
    expect(wrapper.find('[data-stat="mean"]').exists()).toBe(true)
    expect(wrapper.find('[data-stat="median"]').exists()).toBe(true)
    expect(wrapper.find('[data-stat="stddev"]').exists()).toBe(true)
  })

  it('should allow back to overview', async () => {
    const wrapper = mount(Dashboard)
    await wrapper.find('[data-category="sleep"]').trigger('click')
    
    await wrapper.find('[data-action="back"]').trigger('click')
    
    expect(wrapper.find('[data-view="overview"]').exists()).toBe(true)
  })
})
```

---

### 3.3 Export Accuracy

**Test Scenario**: Data in UI matches exported CSV

```typescript
describe('Export Accuracy', () => {
  it('should export visible data', async () => {
    const wrapper = mount(Dashboard)
    
    // Apply date filter
    await wrapper.find('[data-filter="date-range"]').setValue({
      start: '2026-02-01',
      end: '2026-02-18'
    })
    
    // Trigger export
    await wrapper.find('[data-action="export-csv"]').trigger('click')
    
    // Read CSV
    const csv = readDownloadedFile('manifestation-stats-*.csv')
    const lines = csv.split('\n')
    
    // Count data rows (exclude header)
    const dataRows = lines.length - 2  // -1 header, -1 empty
    
    // Should match displayed categories
    const displayedRows = wrapper.findAll('[data-test="stats-row"]').length
    expect(dataRows).toBe(displayedRows)
  })

  it('should include all statistics columns', async () => {
    const csv = await exportStats()
    const header = csv.split('\n')[0]
    
    expect(header).toContain('category')
    expect(header).toContain('mean')
    expect(header).toContain('median')
    expect(header).toContain('stddev')
    expect(header).toContain('q1')
    expect(header).toContain('q3')
    expect(header).toContain('count')
  })
})
```

---

## 4. End-to-End Testing

### 4.1 Dashboard Workflows

```bash
#!/bin/bash
# test-dashboard-e2e.sh

# 1. App should open to questionnaire (Phase 1 assumption)
assert_window_visible "Manifestation Algorithm"

# 2. Click Stats tab
click_element "[data-tab='stats']"
wait_animation 500

# 3. Dashboard should show 40 category cards
CARD_COUNT=$(count_elements "[data-test='category-card']")
assert_equals $CARD_COUNT 40

# 4. Each card should have sparkline
for CARD in $(find_elements "[data-test='category-card']"); do
  assert_element_exists "$CARD [data-test='sparkline']"
done

# 5. Test drill-down
click_element "[data-test='category-card'][data-category='sleep']"
wait_animation 500

# 6. Detail view should show
assert_element_exists "[data-test='detail-chart']"
assert_element_contains "[data-test='detail-title']" "Sleep"

# 7. Back button
click_element "[data-action='back']"
wait_animation 500
assert_element_visible "[data-test='overview-grid']"

# 8. Filter by date range
click_element "[data-filter='date-range']"
set_date_range "2026-02-01" "2026-02-18"
apply_filter

# 9. Stats should update
UPDATED_STATS=$(get_element_text "[data-test='category-card'][data-category='sleep'] [data-stat='mean']")
# (would compare to previous value)

# 10. Export CSV
click_element "[data-action='export-csv']"
wait_download

assert_file_exists "manifestation-stats-*.csv"
echo "✅ Dashboard E2E test passed"
```

---

### 4.2 Performance Verification

```bash
#!/bin/bash
# Measure dashboard render time with 40 categories

TIME_START=$(date +%s%N)

./app &
sleep 2
click_element "[data-tab='stats']"

# Wait for all 40 cards to render
while [ $(count_elements "[data-test='category-card']") -lt 40 ]; do
  sleep 0.1
done

TIME_END=$(date +%s%N)
DURATION=$(( (TIME_END - TIME_START) / 1000000 ))

echo "Dashboard render time: ${DURATION}ms"
assert_less_than $DURATION 2000  # <2 seconds
```

---

## 5. Performance Testing

### 5.1 Large Dataset Handling

**Test**: 5 years of daily questionnaires (1,825 entries)

```typescript
describe('Large Dataset Performance', () => {
  it('should calculate stats within 500ms for 5 years', async () => {
    const db = await Database.new()
    
    // Insert 5 years of daily questionnaires
    for (let d = 0; d < 1825; d++) {
      for (let q = 1; q <= 40; q++) {
        await db.insertResponse(
          `session-${d}`,
          `q${q}`,
          Math.floor(Math.random() * 10) + 1
        )
      }
    }
    
    const start = performance.now()
    const stats = await calculateAllStats(db)
    const elapsed = performance.now() - start
    
    expect(elapsed).toBeLessThan(500)
  })

  it('should render 40 cards + charts within 1 second', async () => {
    // Create dashboard UI with large dataset
    const wrapper = mount(Dashboard, {
      props: { 
        data: generateLargeDataset(1825) 
      }
    })
    
    const start = performance.now()
    await wrapper.vm.$nextTick()
    const elapsed = performance.now() - start
    
    expect(elapsed).toBeLessThan(1000)
  })

  it('should maintain <150MB memory with large dataset', async () => {
    const memBefore = process.memoryUsage().heapUsed
    
    const stats = await calculateStats(largeDataset)
    const wrapper = mount(Dashboard, { props: { stats } })
    
    const memAfter = process.memoryUsage().heapUsed
    expect((memAfter - memBefore) / 1024 / 1024).toBeLessThan(150)
  })
})
```

---

### 5.2 Chart Rendering Performance

**Test**: Chart.js rendering 40 line charts

```typescript
describe('Chart Rendering Performance', () => {
  it('should render line chart in <500ms', async () => {
    const chartData = generateChartData(365)  // 1 year
    
    const start = performance.now()
    const chart = new Chart(canvas, {
      type: 'line',
      data: chartData,
      options: defaultOptions
    })
    const elapsed = performance.now() - start
    
    expect(elapsed).toBeLessThan(500)
  })

  it('should update chart in <200ms', async () => {
    const chart = createChart(initialData)
    
    const start = performance.now()
    chart.data = newData
    chart.update()
    const elapsed = performance.now() - start
    
    expect(elapsed).toBeLessThan(200)
  })
})
```

---

## 6. Security Testing

### 6.1 Data Privacy

**Test**: Exported CSV contains only visible data (no internal values)

```typescript
describe('Export Privacy', () => {
  it('should not export database IDs', async () => {
    const csv = await exportStats()
    expect(csv).not.toMatch(/\b\d{10,}\b/)  // Large IDs
  })

  it('should not export user identifiers', () => {
    const csv = await exportStats()
    expect(csv).not.toMatch(/uuid|session|user/i)
  })

  it('should not export internal fields', () => {
    const csv = await exportStats()
    expect(csv).not.toMatch(/created_at|updated_at|_id/)
  })
})
```

---

## 7. Acceptance Criteria

Phase 2 is **TEST COMPLETE** when:

- [ ] All statistics calculations verified against reference data
- [ ] Chart.js integrations render correctly on all platforms
- [ ] Date filtering logic works (all presets: last 7/30/365 days)
- [ ] CSV export matches displayed data exactly
- [ ] Dashboard renders 40 categories in <2 seconds
- [ ] Drill-down drill-out navigation smooth and responsive
- [ ] Performance targets met (stats calc <500ms, chart render <500ms)
- [ ] Export privacy verified (no internal data leakage)
- [ ] Cross-platform compatibility (Windows/Mac/Linux)
- [ ] Manual QA sign-off

---

**Document End: Test-Plan-Phase-2.md**

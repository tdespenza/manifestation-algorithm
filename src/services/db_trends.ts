import { getDb } from './db';

export interface TrendPoint {
  date: string;
  value: number;
}

export type CategoryTrends = Record<string, TrendPoint[]>;

export async function loadConsolidatedCategoryTrends(): Promise<CategoryTrends> {
  const db = await getDb();

  // Optimized SQL aggregation
  const results = await db.select<{ date: string; category: string; score: number }[]>(`
    SELECT 
      s.completed_at as date,
      r.category,
      AVG(r.answer_value) as score
    FROM historical_responses r
    JOIN historical_sessions s ON s.id = r.session_id
    GROUP BY s.id, r.category
    ORDER BY s.completed_at ASC
  `);

  const trends: CategoryTrends = {};

  if (!results.length) return trends;

  for (const row of results) {
    if (!trends[row.category]) {
      trends[row.category] = [];
    }
    trends[row.category].push({
      date: row.date,
      value: Number(Number(row.score).toFixed(2))
    });
  }

  return trends;
}

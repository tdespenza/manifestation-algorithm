import type { CategoryTrends } from '../services/db_trends';

export interface FocusArea {
  category: string;
  latestScore: number;
  trend: 'up' | 'down' | 'flat';
  tip: string;
}

/** Static improvement tips keyed by a sub-string of the category description */
const TIPS: Array<[RegExp, string]> = [
  [
    /master the basics/i,
    'Audit who you listen to daily. Replace one negative input with a mentor or instructor who is already where you want to be.'
  ],
  [
    /activate.*words/i,
    'Write down three power-words that represent your goal and read them aloud every morning before checking your phone.'
  ],
  [
    /pain.*contract|contract.*energy/i,
    'Spend 15 minutes journaling on the cost of staying the same. Let discomfort motivate, not paralyse.'
  ],
  [
    /define what you want/i,
    'Get specific: write your goal as a SMART target with a concrete deadline. Vague goals create vague results.'
  ],
  [
    /write down/i,
    'Write your goal every day — by hand. This single habit has an outsized impact on momentum and clarity.'
  ],
  [
    /burning desire/i,
    'Create a "why" list of at least 10 compelling reasons your goal must happen. Re-read it whenever motivation dips.'
  ],
  [
    /sweet spot/i,
    'Examine whether your goal is too easy (no excitement) or too hard (constant overwhelm). Adjust the scope until it feels both challenging and achievable.'
  ],
  [
    /make a decision/i,
    "Stop hedging. Commit to your goal in writing and burn the boats — eliminate the alternative paths you've been keeping open."
  ],
  [
    /see.*feel.*possession|feel.*possession/i,
    'Spend 5 minutes each morning in vivid visualisation: feel the emotions of already having your goal.'
  ],
  [
    /release attachment/i,
    'After taking action, let go of how and when results arrive. Write "I release the outcome" in your journal before bed.'
  ],
  [
    /allow the how/i,
    'Daily meditation, even 10 minutes, trains your mind to stay open and notice opportunities you would otherwise miss.'
  ],
  [
    /dream.*chief aim/i,
    'Distinguish your one Chief Aim from supporting dreams. Focus 80% of your energy on the Chief Aim this week.'
  ],
  [
    /focused.*singleness|singleness/i,
    'Identify one thing to advance your Chief Aim tomorrow morning. Do it before any other task.'
  ],
  [
    /daily.*to.?do|to.?do.*list/i,
    `Plan tomorrow\u2019s top-3 priorities the night before. Batch deep-work blocks and protect them from interruptions.`
  ],
  [
    /chart progress|know the score/i,
    'Re-run this questionnaire weekly. Visible progress charts amplify motivation through the Momentum Cycle.'
  ],
  [
    /momentum cycle/i,
    'Celebrate small wins explicitly — tell a mentor, write them down. Success begets success when you acknowledge it.'
  ],
  [
    /dream build|vision board/i,
    'Add at least one new image or phrase to your vision board this week that represents your Chief Aim exactly as achieved.'
  ],
  [
    /plug into system/i,
    'Book the next live event now. Consistent exposure to the system compounds faster than any single action.'
  ],
  [
    /personal mastery/i,
    'Block 30 minutes daily for course material. Learning in small daily chunks outperforms weekend marathons.'
  ],
  [
    /watch the words|words you speak/i,
    'For 48 hours, catch every "I can\'t", "I\'ll try", or "I\'m tired" and rephrase it as a positive intention statement.'
  ],
  [
    /physiology|dress for success/i,
    "Your body language shapes your mindset. Dress as if you've already achieved your goal and notice the energy shift."
  ],
  [
    /counter intentions/i,
    'Run the relevant clearing process (money, relationship, or health) for 21 consecutive days. Consistency breaks the pattern.'
  ],
  [
    /inner power|superpower/i,
    'Identify your top superpower process and practise it daily for the next 30 days. Mastery compounds quickly.'
  ],
  [
    /alpha.?theta|brainwave/i,
    'Use binaural beats (alpha or theta range) during your morning visualisation to lower mental resistance.'
  ],
  [
    /telling.*story.*woe|story of woe/i,
    'Every time you catch yourself retelling a struggle, pivot to "and here\'s what I learned / am doing about it."'
  ],
  [
    /appreciation|gratitude/i,
    'Write 5 specific gratitudes every morning — not generics like "family" but vivid details that evoke genuine feeling.'
  ],
  [
    /failure habits|success habits|accelerator/i,
    'Pick one failure habit to replace this month. Install the replacement habit by stacking it onto an existing routine.'
  ],
  [
    /mastermind/i,
    "If you don't have a mastermind group, recruit 2–3 peers committed to growth and meet weekly — even for 30 minutes."
  ],
  [
    /watch successful|apprentice/i,
    'Shadow or study one successful person this month: read their biography, watch interviews, or request a meeting.'
  ],
  [
    /success stories/i,
    'Replace one entertainment session per week with a success story (podcast, book chapter, or interview).'
  ],
  [
    /give away/i,
    'Give freely what you want most — encouragement, expertise, or resources — and observe how the cycle returns to you.'
  ],
  [
    /do it now/i,
    'When you think of an important action, start within 60 seconds. Delay is the single biggest momentum killer.'
  ],
  [
    /take care.*body|body/i,
    'Schedule exercise three times this week now. Physical vitality directly amplifies mental clarity and goal focus.'
  ],
  [
    /gold in adversity/i,
    'After each setback, write down one lesson and one opportunity it has opened. Reframe before the day ends.'
  ],
  [
    /samskaras/i,
    'Work through a samskara clearing exercise: identify the earliest memory tied to a limiting belief and write a new empowering conclusion.'
  ],
  [
    /100.*responsibility|take.*responsibility/i,
    'For one week, eliminate all blame and complaint from your vocabulary. Own every result, then choose a new action.'
  ],
  [
    /attractor field/i,
    'Complete an attractor field generator each morning. The practice shifts your energetic baseline and attracts aligned opportunities.'
  ],
  [
    /join a club|power source/i,
    "If you haven't joined your power-source community yet, identify it today and take the first step to join this week."
  ],
  [
    /deliberate intent|present time/i,
    'Practice mono-tasking: one task, no notifications, for 25 minutes. Presence multiplies the quality of every action.'
  ]
];

function getTip(category: string): string {
  for (const [pattern, tip] of TIPS) {
    if (pattern.test(category)) return tip;
  }
  return 'Review this area in detail and identify one concrete action you can take in the next 48 hours to raise your score.';
}

function trendDirection(points: { value: number }[]): 'up' | 'down' | 'flat' {
  if (points.length < 2) return 'flat';
  const first = points[0].value;
  const last = points[points.length - 1].value;
  const delta = last - first;
  if (delta > 0.05) return 'up';
  if (delta < -0.05) return 'down';
  return 'flat';
}

/**
 * Derive the 3 weakest focus areas from a CategoryTrends map.
 * "Weakest" = lowest average score across all time-points.
 */
export function computeFocusAreas(trends: CategoryTrends, topN = 3): FocusArea[] {
  const entries = Object.entries(trends);
  if (entries.length === 0) return [];

  const scored = entries
    .map(([category, points]) => {
      const avg = points.reduce((s, p) => s + p.value, 0) / points.length;
      return { category, avg, points };
    })
    .sort((a, b) => a.avg - b.avg)
    .slice(0, topN);

  return scored.map(({ category, avg, points }) => ({
    category,
    latestScore: Math.round(avg * 100) / 100,
    trend: trendDirection(points),
    tip: getTip(category)
  }));
}

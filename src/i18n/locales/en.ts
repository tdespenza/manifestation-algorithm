/**
 * English (en) locale messages — default language.
 * All translatable UI strings are keyed by feature/component.
 */
const en = {
  nav: {
    questionnaire: 'Questionnaire',
    history: 'History',
    settings: 'Settings'
  },

  app: {
    name: 'Manifestation Algorithm',
    unexpectedError: 'An unexpected error occurred.'
  },

  home: {
    subtitle: 'Rate each area of your life — discover your alignment score'
  },

  dashboard: {
    title: 'Manifestation Algorithm Tracking History',
    subtitle: 'Track your progress over time',
    loading: 'Loading your history\u2026',
    noData: 'No data for this period',
    progressTrend: 'Progress Trend',
    progressToGoal: 'Progress to Goal',
    ofGoal: '{pct}% of goal',
    goalReached: '\uD83C\uDFAF Goal Reached!',
    categoryBreakdown: 'Category Breakdown',
    noSessionsRange: 'No sessions in this range',
    tryWiderRange: 'Try a wider range or select a different period.',
    noSessionsYet: 'No sessions yet',
    completeFirst: 'Complete your first assessment to see your progress and trends here.',
    startFirst: 'Start First Assessment',
    export: {
      date: 'Date',
      time: 'Time',
      totalScore: 'Total Score',
      duration: 'Duration (min)',
      notes: 'Notes'
    }
  },

  stats: {
    averageScore: 'Average Score',
    medianScore: 'Median Score',
    highestScore: 'Highest Score',
    totalSessions: 'Total Sessions'
  },

  network: {
    rankings: 'Network Rankings',
    searchingPeers: 'Searching for peers...',
    searching: 'Searching...',
    online: 'Online',
    peers: '{count} peers',
    results: '{count} results',
    avgShort: 'Avg',
    p90Short: 'P90',
    averageScoreTitle: 'Average Score',
    percentile90Title: '90th Percentile',
    globalAverage: 'Global Average',
    percentile90: '90th Percentile',
    manifestations: 'Manifestations',
    activePeers: 'Active Peers',
    categoryRankings: 'Category Rankings'
  },

  focusAreas: {
    title: 'Focus Areas',
    subtitle: 'Your 3 lowest-scoring categories — improving these drives the biggest gains.',
    empty: 'Complete more sessions to see personalised focus area recommendations.'
  },

  sessions: {
    recent: 'Recent Sessions',
    deselectAll: 'Deselect All',
    selectAll: 'Select All',
    deleteCount: 'Delete {count}',
    cancel: 'Cancel',
    select: 'Select',
    deleting: 'Deleting\u2026'
  },

  settings: {
    title: 'App Settings',
    close: 'Close settings',
    dataManagement: 'Data Management',
    saveLastSession: 'Save Last Session',
    saveLastSessionDesc: 'Pre-fill answers from your most recent completed session.',
    resetProgress: 'Reset Progress',
    resetProgressDesc: 'Delete all saved answers and start fresh.',
    goals: 'Goals',
    targetScore: 'Target Score',
    targetScoreDesc:
      'Set a goal score (1,000\u201310,000) to track your progress on the dashboard.',
    set: 'Set',
    clearGoal: 'Clear',
    currentTarget: 'Current target:',
    on: 'On',
    off: 'Off',
    version: 'Manifestation Algorithm {version}',
    clearAllAnswers: 'Clear All Answers',
    clearConfirmTitle: 'Clear All Answers',
    clearConfirmMessage:
      'This will permanently delete all your current answers and cannot be undone.',
    clearConfirmLabel: 'Clear',
    keepAnswers: 'Keep Answers',
    language: 'Language',
    languageDesc: 'Choose the display language for the application.',
    languageCount: '{count} languages available',
    goalErrorRange: 'Please enter a score between 1,000 and 10,000.'
  },

  questionnaire: {
    saving: 'Saving...',
    saved: 'Saved',
    progressText: '{pct}% complete ({answered}/{total})',
    progressAria: 'Assessment completion progress',
    maxScore: 'Max: {score}',
    answerToScore: 'Answer to score',
    currentScore: 'Current Score',
    scrollAll: 'Scroll All',
    stepByStep: 'Step by Step',
    questionOf: 'Question {current} of {total}',
    previous: '\u2190 Previous',
    next: 'Next \u2192',
    completeAssessment: 'Complete Assessment',
    startFresh: 'Want to start fresh?',
    resetAllAnswers: 'Reset all answers',
    resetTitle: 'Reset All Answers?',
    resetMessage: 'This will clear every answer and start from scratch. This cannot be undone.',
    resetLabel: 'Reset',
    scoreQuality: {
      notStarted: 'Not Started',
      manifesting: 'Manifesting \u2746',
      aligned: 'Aligned',
      building: 'Building',
      startingOut: 'Starting Out'
    },
    submitHint: {
      zero: '0 of {total} questions answered \u2014 unanswered questions default to minimum',
      partial:
        '{remaining} question remaining \u2014 unanswered questions default to minimum | {remaining} questions remaining \u2014 unanswered questions default to minimum',
      complete: 'All questions answered \u2014 ready to submit!'
    },
    submitTitle: {
      zero: 'Answer some questions to complete your assessment',
      partial: '{remaining} question remaining | {remaining} questions remaining',
      complete: 'Submit your completed assessment'
    },
    submitError: 'Failed to save session: {error}',
    dotTitle: 'Question {index}',
    dotAria: 'Go to question {index}',
    keyboardHint: 'Tip: Use ← → to navigate · 1–9 / 0 to rate'
  },

  onboarding: {
    step0Title: 'Welcome to the Manifestation Algorithm',
    step0Body1:
      'This tool helps you measure how aligned your mindset, habits, and daily actions are with achieving your goals. Answer each question honestly to get your current score.',
    step0Body2:
      'Complete the questionnaire at regular intervals to track your growth over time and see which areas need the most attention.',
    step1Title: 'How Scoring Works',
    step1Body:
      'Each question is worth a set number of points. Rate yourself on a scale of\u00a01\u201310 for every question. A rating of 10 means you fully embody that principle; 1 means you haven\u2019t started.',
    step1TargetHint: '🎯 Target: {target} | Maximum: {maximum}',
    excellent: 'Excellent',
    excellentRange: '7,001 \u2013 10,000',
    excellentNote: 'Strong alignment \u2014 keep going',
    good: 'Good',
    goodRange: '4,001 \u2013 7,000',
    goodNote: 'Solid foundation \u2014 room to grow',
    needsWork: 'Needs Work',
    needsWorkRange: '0 \u2013 4,000',
    needsWorkNote: 'Focus on fundamentals first',
    step2Title: 'Your Data Stays Private',
    step2Body1:
      'All your answers and score history are stored locally on your device using an encrypted SQLite database. Nothing is sent to any server without your explicit permission.',
    step2Body2:
      'The optional peer-to-peer sharing feature lets you see anonymised aggregate scores from other users. It only shares a cryptographically signed summary \u2014 never your individual answers.',
    readyText: 'Ready? Let\u2019s get your baseline score.',
    skipIntro: 'Skip intro',
    next: 'Next',
    getStarted: 'Get Started'
  },

  sharing: {
    title: 'Anonymous Network Sharing',
    privacyFirst: '\uD83D\uDD12 Privacy-First',
    description:
      'Optionally contribute your results anonymously to the global network. No name, email, IP address, or device ID is ever shared.',
    enabled: 'Sharing enabled \u2014 contributing to network',
    disabled: 'Sharing disabled (default)',
    activeBadge: '\u2713 Your anonymised scores are being shared with peers',
    enableNote: 'Enable to see your percentile rank compared to the global network.'
  },

  category: {
    back: '\u2039 Back',
    history: 'History',
    date: 'Date',
    score: 'Score',
    loading: 'Loading...',
    notEnoughData: 'Not enough data',
    noData: 'No data found for \u201c{category}\u201d.',
    goToDashboard: 'Go to Dashboard'
  },

  chartActions: {
    viewFullscreen: 'View full screen',
    exitFullscreen: 'Exit full screen',
    copyChart: 'Copy Chart',
    exportChart: 'Export chart',
    exportDefault: '⬇ Export',
    exportExcel: '📊 Export Excel',
    exportCsv: '📄 Export CSV',
    exportPdf: '📑 Export PDF',
    exportHtml: '🌐 Export HTML',
    copied: 'Chart copied to clipboard',
    copyFailed: 'Copy failed — clipboard not available',
    saveCancelled: 'Save cancelled'
  },

  resume: {
    continueLastSession: 'Continue from Last Session?',
    welcomeBack: 'Welcome Back!',
    historicalBody:
      'Your answers from your last completed session have been pre-loaded. Would you like to keep those values as a starting point, or begin with a completely blank questionnaire?',
    activeBody:
      'You have a session in progress. Would you like to resume where you left off, or start a fresh assessment?',
    clearWarning: '⚠️ This will clear all current answers. Are you sure?',
    yesStartFresh: 'Yes, Start Fresh',
    cancel: 'Cancel',
    keepLastValues: 'Keep Last Values',
    resumeSession: 'Resume Session',
    startFresh: 'Start Fresh'
  },

  questionItem: {
    pointsSuffix: 'pts',
    low: 'Low',
    high: 'High',
    rateAria: 'Rate {question}'
  },

  questions: {
    '1': 'Master the Basics',
    '1a': 'Who do you listen to?',
    '1b': 'Teachability Index',
    '1c': 'Training Balance Scale',
    '1d': 'Unconscious competence',
    '2': 'Activate & Illuminate Words',
    '3': 'Find Pain & Contract Energy',
    '4': 'Define what you want',
    '5': 'Write down what you want',
    '6': "Don't share your dream with others",
    '7': 'Get a burning desire for your goal',
    '8': 'Goal must be in Sweet Spot',
    '9': 'Make a Decision',
    '10': 'See/Feel good in possession of your goal',
    '11': 'Release attachment to the outcome',
    '12': 'Allow the HOW to present itself',
    '13': 'Know the difference between Dream & Chief Aim',
    '14': 'Be Focused / Singleness of purpose',
    '15': 'Daily TO DO list of Priorities',
    '16': 'Chart Progress / Know the Score',
    '17': 'Use Momentum Cycle of Success',
    '18': 'Dream Build - Dream Book & Vision Board',
    '19': 'Plug into System',
    '19a': 'Read books',
    '19b': 'Listen to Audios',
    '19c': 'Attend Events (monthly)',
    '19d': 'Give and receive Recognition / expanded Golden Rule',
    '19e': 'Develop relationships with like minded people',
    '20': 'Science of Personal Mastery Course',
    '21': 'Watch the words you speak - what you say is what you get',
    '22': 'Physiology / Dress for success',
    '23': 'Clear Counter Intentions',
    '23a': 'Money Processes',
    '23b': 'Relationship Processes',
    '23c': 'Leadership Processes',
    '23d': 'Communication Processes',
    '23e': 'Health Processes',
    '23f': 'Spiritual Awareness Processes',
    '23g': 'Dream Processes',
    '23h': 'Organization & Focus Processes',
    '24': 'Awaken your Inner Power: Superpower Processes',
    '25': 'Broadcast on Alpha-theta brainwave',
    '26': 'Stop Telling Your Story of woe',
    '27': 'Show Appreciation / Gratitude',
    '28': 'Replace Failure Habits w/ Success Habits (Accelerator Processes)',
    '29': 'Create a Mastermind',
    '30': 'Watch Successful People/Apprentice',
    '31': 'Listen to/Read Success Stories',
    '32': 'Give away what you want first',
    '33': 'Do It Now Mentality',
    '34': 'Take Care of Your Body',
    '35': 'Find the Gold in Adversity',
    '36': 'Clear Samskaras from Field',
    '37': 'Take 100% Responsibility',
    '38': 'Attractor Field Generators',
    '39': 'Join a Club that connects you to a Power Source',
    '40': 'Live life with deliberate intent - be in present time'
  },

  dateRange: {
    rangeLabel: 'Range:',
    startDate: 'Start date',
    endDate: 'End date',
    presets: {
      '7d': '7 Days',
      '30d': '30 Days',
      '90d': '90 Days',
      '1y': '1 Year',
      all: 'All Time',
      custom: 'Custom'
    }
  },

  update: {
    availableTitle: 'v{version} is available!',
    releaseNotesFallback: 'Visit the release page to download the latest version.',
    getUpdate: 'Get Update',
    dismiss: 'Dismiss'
  }
};

export default en;
export type Messages = typeof en;

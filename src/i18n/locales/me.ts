/**
 * Auto-converted locale module for me.
 */
import type { Messages } from './en';

const me: Messages = {
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
    loading: 'Loading your history…',
    noData: 'No data for this period',
    progressTrend: 'Progress Trend',
    progressToGoal: 'Progress to Goal',
    ofGoal: '{pct}% of goal',
    goalReached: '🎯 Goal Reached!',
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
    deleting: 'Deleting…'
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
    targetScoreDesc: 'Set a goal score (1,000–10,000) to track your progress on the dashboard.',
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
    previous: '← Previous',
    next: 'Next →',
    completeAssessment: 'Complete Assessment',
    startFresh: 'Want to start fresh?',
    resetAllAnswers: 'Reset all answers',
    resetTitle: 'Reset All Answers?',
    resetMessage: 'This will clear every answer and start from scratch. This cannot be undone.',
    resetLabel: 'Reset',
    scoreQuality: {
      notStarted: 'Not Started',
      manifesting: 'Manifesting ❆',
      aligned: 'Aligned',
      building: 'Building',
      startingOut: 'Starting Out'
    },
    submitHint: {
      zero: '0 of {total} questions answered — unanswered questions default to minimum',
      partial:
        '{remaining} question remaining — unanswered questions default to minimum | {remaining} questions remaining — unanswered questions default to minimum',
      complete: 'All questions answered — ready to submit!'
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
      'Each question is worth a set number of points. Rate yourself on a scale of 1–10 for every question. A rating of 10 means you fully embody that principle; 1 means you haven’t started.',
    step1TargetHint: '🎯 Target: {target} | Maximum: {maximum}',
    excellent: 'Excellent',
    excellentRange: '7,001 – 10,000',
    excellentNote: 'Strong alignment — keep going',
    good: 'Good',
    goodRange: '4,001 – 7,000',
    goodNote: 'Solid foundation — room to grow',
    needsWork: 'Needs Work',
    needsWorkRange: '0 – 4,000',
    needsWorkNote: 'Focus on fundamentals first',
    step2Title: 'Your Data Stays Private',
    step2Body1:
      'All your answers and score history are stored locally on your device using an encrypted SQLite database. Nothing is sent to any server without your explicit permission.',
    step2Body2:
      'The optional peer-to-peer sharing feature lets you see anonymised aggregate scores from other users. It only shares a cryptographically signed summary — never your individual answers.',
    readyText: 'Ready? Let’s get your baseline score.',
    skipIntro: 'Skip intro',
    next: 'Next',
    getStarted: 'Get Started'
  },
  sharing: {
    title: 'Anonymous Network Sharing',
    privacyFirst: '🔒 Privacy-First',
    description:
      'Optionally contribute your results anonymously to the global network. No name, email, IP address, or device ID is ever shared.',
    enabled: 'Sharing enabled — contributing to network',
    disabled: 'Sharing disabled (default)',
    activeBadge: '✓ Your anonymised scores are being shared with peers',
    enableNote: 'Enable to see your percentile rank compared to the global network.'
  },
  category: {
    back: '‹ Back',
    history: 'History',
    date: 'Date',
    score: 'Score',
    loading: 'Loading...',
    notEnoughData: 'Not enough data',
    noData: 'No data found for “{category}”.',
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
  },
  questions: {
    '1': 'Savladajte osnove',
    '2': 'Aktiviraj i osvijetli riječi',
    '3': 'Pronađi bol i kontrahuj energiju',
    '4': 'Definiraj što želiš',
    '5': 'Zapiši što želiš',
    '6': 'Nemoj dijeliti svoj san s drugima',
    '7': 'Osjeti goruću želju za svojim ciljem',
    '8': 'Cilj mora biti u Sweet Spotu',
    '9': 'Donesi odluku',
    '10': 'Vidi/Osjećaj se dobro kad imaš svoj cilj',
    '11': 'Oslobađanje vezanosti za ishod',
    '12': 'Dopusti da se KAKO samo pokaže',
    '13': 'Znajte razliku između Dream i Chief Aim',
    '14': 'Budi fokusiran / Jedinstvenost svrhe',
    '15': 'Dnevni popis prioriteta ZADATAKA',
    '16': 'Napredak na ljestvicama / Poznajte rezultat',
    '17': 'Ciklus uspjeha zamaha',
    '18': 'Dream Build - Dream Book i Vision Board',
    '19': 'Priključivanje u sustav',
    '20': 'Tečaj znanosti osobnog majstorstva',
    '21': 'Pazi na riječi koje govoriš – što kažeš, to i dobiješ',
    '22': 'Fiziologija / Odijevanje za uspjeh',
    '23': 'Jasne protunamjere',
    '24': 'Probudi svoju unutarnju moć: procesi supermoći',
    '25': 'Emitirano na Alpha-theta moždanim valovima',
    '26': 'Prestani pričati svoju tužnu priču',
    '27': 'Pokažite zahvalnost / zahvalnost',
    '28': 'Zamijeniti navike neuspjeha navikama uspjeha (akceleratorski procesi)',
    '29': 'Stvori Mastermind',
    '30': 'Pogledajte Uspješne ljude/Pripravnika',
    '31': 'Slušajte/čitajte priče o uspjehu',
    '32': 'Prvo daj ono što želiš',
    '33': "Mentalitet 'Učini to sada'",
    '34': 'Brinite o svom tijelu',
    '35': 'Pronađi zlato u nevolji',
    '36': 'Čisti samskare s polja',
    '37': 'Preuzmi 100% odgovornost',
    '38': 'Generatori atraktorskog polja',
    '39': 'Pridruži se klubu koji te povezuje s izvorom moći',
    '40': 'Živi život s namjernom namjerom – budi u sadašnjem vremenu',
    '1a': 'Koga slušaš?',
    '1b': 'Indeks podučavanja',
    '1c': 'Vaga ravnoteže treninga',
    '1d': 'Nesvjesna kompetencija',
    '19a': 'Čitaj knjige',
    '19b': 'Slušajte audio snimke',
    '19c': 'Sudjelovanje na događanjima (mjesečno)',
    '19d': 'Davati i primati priznanje / prošireno Zlatno pravilo',
    '19e': 'Razvijajte odnose s istomišljenicima',
    '23a': 'Procesi plaćanja',
    '23b': 'Procesi odnosa',
    '23c': 'Procesi vođenja',
    '23d': 'Komunikacijski procesi',
    '23e': 'Zdravstveni procesi',
    '23f': 'Procesi duhovne svjesnosti',
    '23g': 'Procesi snova',
    '23h': 'Procesi organizacije i fokusa'
  }
};

export default me;

/**
 * Auto-converted locale module for ps.
 */
import type { Messages } from './en';

const ps: Messages = {
  nav: {
    questionnaire: 'پوښتنلیک',
    history: 'تاریخ',
    settings: 'ترتیبات'
  },
  app: {
    name: 'منشور الګوریتم',
    unexpectedError: 'یوه ناڅاپي تېروتنه رامنځته شوه.'
  },
  home: {
    subtitle: 'د خپل ژوند هرې برخې ته درجه ورکړئ - خپل د سمون نمرې ومومئ'
  },
  dashboard: {
    title: 'د منشور الګوریتم تعقیب تاریخ',
    subtitle: 'د وخت په تیریدو سره خپل پرمختګ تعقیب کړئ',
    loading: 'ستاسو تاریخ پورته کول…',
    noData: 'د دې مودې لپاره هیڅ معلومات نشته',
    progressTrend: 'د پرمختګ رجحان',
    progressToGoal: 'موخې ته پرمختګ',
    ofGoal: '{pct}٪ هدف',
    goalReached: '🎯 هدف ته ورسیدل!',
    categoryBreakdown: 'د کټګورۍ ماتول',
    noSessionsRange: 'پدې لړ کې هیڅ ناستې نشته',
    tryWiderRange: 'پراخه سلسله هڅه وکړئ یا یو بل دوره غوره کړئ.',
    noSessionsYet: 'تر اوسه کومه غونډه نه ده شوې',
    completeFirst: 'دلته د خپل پرمختګ او رجحاناتو د لیدلو لپاره خپله لومړنۍ ارزونه بشپړه کړئ.',
    startFirst: 'لومړی ارزونه پیل کړئ',
    export: {
      date: 'نیټه',
      time: 'وخت',
      totalScore: 'ټول نمرې',
      duration: 'موده (دقیقه)',
      notes: 'یادښتونه'
    }
  },
  stats: {
    averageScore: 'اوسط نمرې',
    medianScore: 'منځنۍ نمرې',
    highestScore: 'لوړ نمرې',
    totalSessions: 'ټولی سیشنونه'
  },
  network: {
    rankings: 'د شبکې درجه بندي',
    searchingPeers: 'د ملګرو په لټه کې...',
    searching: 'لټون...',
    online: 'آنلاین',
    peers: '{count} ملګري',
    results: '{count} پایلې',
    avgShort: 'اوسط',
    p90Short: 'P90',
    averageScoreTitle: 'اوسط نمرې',
    percentile90Title: '90 فیصده',
    globalAverage: 'نړیوال اوسط',
    percentile90: '90 فیصده',
    manifestations: 'څرګندونه',
    activePeers: 'فعال ملګري',
    categoryRankings: 'د کټګورۍ درجه بندي'
  },
  focusAreas: {
    title: 'د تمرکز ساحې',
    subtitle: 'ستاسو د 3 ټیټ نمرې کټګورۍ - د دې چلولو ښه کول ترټولو لوی لاسته راوړنې لري.',
    empty: 'د شخصي تمرکز ساحې وړاندیزونو لیدو لپاره نورې ناستې بشپړ کړئ.'
  },
  sessions: {
    recent: 'وروستي ناستې',
    deselectAll: 'ټول غیر انتخاب کړئ',
    selectAll: 'ټول وټاکئ',
    deleteCount: 'ړنګول {count}',
    cancel: 'لغوه کړئ',
    select: 'وټاکئ',
    deleting: 'ړنګول…'
  },
  settings: {
    title: 'د اپلیکیشن تنظیمات',
    close: 'تنظیمات بند کړئ',
    dataManagement: 'د معلوماتو مدیریت',
    saveLastSession: 'وروستۍ ناسته خوندي کړئ',
    saveLastSessionDesc: 'ستاسو د وروستي بشپړ شوي ناستې څخه ځوابونه مخکې ډک کړئ.',
    resetProgress: 'پرمختګ بیا تنظیم کړئ',
    resetProgressDesc: 'ټول خوندي شوي ځوابونه حذف کړئ او تازه پیل کړئ.',
    goals: 'موخې',
    targetScore: 'د هدف نمرې',
    targetScoreDesc: 'په ډشبورډ کې د خپل پرمختګ د تعقیب لپاره د هدف سکور (1,000-10,000) وټاکئ.',
    set: 'ټاکل',
    clearGoal: 'روښانه',
    currentTarget: 'اوسنی هدف:',
    on: 'پر',
    off: 'بند',
    version: 'منشور الګوریتم {version}',
    clearAllAnswers: 'ټول ځوابونه پاک کړئ',
    clearConfirmTitle: 'ټول ځوابونه پاک کړئ',
    clearConfirmMessage:
      'دا به ستاسو ټول اوسني ځوابونه د تل لپاره له مینځه یوسي او بیرته نه شي کیدی.',
    clearConfirmLabel: 'روښانه',
    keepAnswers: 'ځوابونه وساتئ',
    language: 'ژبه',
    languageDesc: 'د غوښتنلیک لپاره د ښودلو ژبه غوره کړئ.',
    languageCount: '{count} ژبې شتون لري',
    goalErrorRange: 'مهرباني وکړئ د 1,000 او 10,000 ترمنځ نمرې ولیکئ.'
  },
  questionnaire: {
    saving: 'خوندي کول...',
    saved: 'خوندي شوی',
    progressText: '{pct}% بشپړ شوی ({answered}/@PH_2@@)',
    progressAria: 'د ارزونې بشپړولو پرمختګ',
    maxScore: 'اعظمي: {score}',
    answerToScore: 'نمرې ته ځواب',
    currentScore: 'اوسنۍ نمرې',
    scrollAll: 'ټول سکرول کړئ',
    stepByStep: 'ګام په ګام',
    questionOf: 'پوښتنه {current} {total}',
    previous: '← مخکینی',
    next: 'بل →',
    completeAssessment: 'بشپړه ارزونه',
    startFresh: 'غواړئ تازه پیل کړئ؟',
    resetAllAnswers: 'ټول ځوابونه بیا تنظیم کړئ',
    resetTitle: 'ټول ځوابونه بیا تنظیم کړئ؟',
    resetMessage: 'دا به هر ځواب پاک کړي او له پیل څخه پیل شي. دا نشي رد کیدی.',
    resetLabel: 'بیا تنظیم کړئ',
    scoreQuality: {
      notStarted: 'نه پیل شوی',
      manifesting: 'ښکاره کول ❆',
      aligned: 'سره یوځای شوی',
      building: 'ودانۍ',
      startingOut: 'پیل کول'
    },
    submitHint: {
      zero: 'د {total} پوښتنو څخه 0 ځواب شوي — بې ځوابه پوښتنې په ډیفالټ کې لږترلږه',
      partial:
        '{remaining} پوښتنه پاتې ده — بې ځوابه پوښتنې ډیفالټ تر لږترلږه | {remaining} پوښتنې پاتې دي — بې ځوابه پوښتنې ډیفالټ حد اقل ته',
      complete: 'ټولې پوښتنې ځواب شوې - د سپارلو لپاره چمتو دي!'
    },
    submitTitle: {
      zero: 'ستاسو د ارزونې بشپړولو لپاره ځینې پوښتنې ځواب کړئ',
      partial: '{remaining} پوښتنه پاتې ده | {remaining} پوښتنې پاتې دي',
      complete: 'خپل بشپړ شوی ارزونه وسپارئ'
    },
    submitError: 'د سیشن په خوندي کولو کې پاتې راغلی: {error}',
    dotTitle: 'پوښتنه {index}',
    dotAria: 'پوښتنې ته لاړ شئ {index}',
    keyboardHint: 'لارښوونه: ← ← د نیویګیټ لپاره وکاروئ · 1–9 / 0 د نرخ کولو لپاره'
  },
  onboarding: {
    step0Title: 'د منشور الګوریتم ته ښه راغلاست',
    step0Body1:
      'دا وسیله تاسو سره مرسته کوي چې اندازه کړئ چې ستاسو ذهنیت، عادتونه، او ورځني کړنې ستاسو اهدافو ته د رسیدو سره څومره سمون لري. هرې پوښتنې ته په صادقانه توګه ځواب ورکړئ ترڅو خپل اوسني نمرې ترلاسه کړئ.',
    step0Body2:
      'پوښتنلیک په منظمو وقفو کې ډک کړئ ترڅو د وخت په تیریدو سره ستاسو وده تعقیب کړئ او وګورئ چې کومې سیمې ډیرې پاملرنې ته اړتیا لري.',
    step1Title: 'نمرې څنګه کار کوي',
    step1Body:
      'هره پوښتنه د ټاکل شوي شمیر ټکو ارزښت لري. د هرې پوښتنې لپاره خپل ځان د 1-10 په پیمانه درجه بندي کړئ. د 10 درجه پدې معنی ده چې تاسو په بشپړه توګه دا اصول منعکس کوئ. 1 پدې معنی چې تاسو پیل نه دی کړی.',
    step1TargetHint: '🎯 هدف: {target} | اعظمي: {maximum}',
    excellent: 'ډیر ښه',
    excellentRange: '7,001 – 10,000',
    excellentNote: 'قوي سمون - دوام ورکړئ',
    good: 'ښه',
    goodRange: '4,001 – 7,000',
    goodNote: 'قوي بنسټ - د ودې لپاره خونه',
    needsWork: 'کار ته اړتیا لري',
    needsWorkRange: '0 - 4,000',
    needsWorkNote: 'لومړی په اساساتو تمرکز وکړئ',
    step2Title: 'ستاسو ډاټا شخصي پاتې کیږي',
    step2Body1:
      'ستاسو ټول ځوابونه او د نمرې تاریخ د کوډ شوي SQLite ډیټابیس په کارولو سره ستاسو په وسیله کې په محلي ډول زیرمه شوي. ستاسو د واضح اجازې پرته هیڅ سرور ته هیڅ شی نه لیږل کیږي.',
    step2Body2:
      'د ګډ شریک شریکولو اختیاري خصوصیت تاسو ته اجازه درکوي د نورو کاروونکو څخه نامعلوم شوي مجموعي نمرې وګورئ. دا یوازې د کریپټوګرافیک لاسلیک شوي لنډیز شریکوي - هیڅکله ستاسو انفرادي ځوابونه.',
    readyText: 'چمتو؟ راځئ چې ستاسو اساسی نمره ترلاسه کړو.',
    skipIntro: 'تعارف پریږدئ',
    next: 'بل',
    getStarted: 'پیل کړئ'
  },
  sharing: {
    title: 'د نامعلومې شبکې شریکول',
    privacyFirst: '🔒 محرمیت - لومړی',
    description:
      'په اختیاري توګه خپلې پایلې په نامعلوم ډول نړیوال شبکې ته شریک کړئ. هیڅ نوم، بریښنالیک، IP پته، یا د وسیله ID هیڅکله شریک شوی نه دی.',
    enabled: 'شریکول فعال شوي - په شبکه کې مرسته کول',
    disabled: 'شریکول غیر فعال شوي (ډیفالټ)',
    activeBadge: '✓ ستاسو نامعلوم نمرې د ملګرو سره شریکیږي',
    enableNote: 'د نړیوالې شبکې په پرتله ستاسو د فیصدي درجه وګورئ فعال کړئ.'
  },
  category: {
    back: '‹ شاته',
    history: 'تاریخ',
    date: 'نیټه',
    score: 'سکور',
    loading: 'بار کول...',
    notEnoughData: 'کافي معلومات نشته',
    noData: 'د "{category}" لپاره هیڅ معلومات ونه موندل شول.',
    goToDashboard: 'ډشبورډ ته لاړ شئ'
  },
  chartActions: {
    viewFullscreen: 'بشپړ سکرین وګورئ',
    exitFullscreen: 'د بشپړ سکرین څخه وتل',
    copyChart: 'چارټ کاپي',
    exportChart: 'د صادراتو چارټ',
    exportDefault: '⬇ صادرول',
    exportExcel: '📊 ایکسل صادر کړئ',
    exportCsv: '📄 CSV صادر کړئ',
    exportPdf: '📑 PDF صادر کړئ',
    exportHtml: '🌐 HTML صادر کړئ',
    copied: 'چارټ کلپ بورډ ته کاپي شوی',
    copyFailed: 'کاپي ناکامه شوه - کلپ بورډ شتون نلري',
    saveCancelled: 'خوندي کول لغوه شوي'
  },
  resume: {
    continueLastSession: 'د تیرې ناستې څخه ادامه ورکوئ؟',
    welcomeBack: 'بیرته پخیر راغلې!',
    historicalBody:
      'ستاسو د تیرې بشپړې شوې ناستې څخه ستاسو ځوابونه دمخه بار شوي دي. ایا تاسو غواړئ دا ارزښتونه د پیل ټکي په توګه وساتئ، یا د بشپړ خالي پوښتنلیک سره پیل کړئ؟',
    activeBody:
      'ستاسو یوه غونډه روانه ده. ایا تاسو غواړئ له کوم ځای څخه چې تاسو پریښودل بیا پیل کړئ، یا نوې ارزونه پیل کړئ؟',
    clearWarning: '⚠️ دا به ټول اوسني ځوابونه پاک کړي. ایا تاسو ډاډه یاست؟',
    yesStartFresh: 'هو، تازه پیل کړئ',
    cancel: 'لغوه کړئ',
    keepLastValues: 'وروستي ارزښتونه وساتئ',
    resumeSession: 'سیشن بیا پیل کړئ',
    startFresh: 'تازه پیل کړئ'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'ټیټ',
    high: 'لوړ',
    rateAria: 'نرخ {question}'
  },
  dateRange: {
    rangeLabel: 'سلسله:',
    startDate: 'د پیل نیټه',
    endDate: 'د پای نیټه',
    presets: {
      '7d': '7 ورځې',
      '30d': '30 ورځې',
      '90d': '90 ورځې',
      '1y': '1 کال',
      all: 'ټول وخت',
      custom: 'ګمرک'
    }
  },
  update: {
    availableTitle: 'v{version} شتون لري!',
    releaseNotesFallback: 'د وروستي نسخې ډاونلوډ کولو لپاره د خوشې پاڼې څخه لیدنه وکړئ.',
    getUpdate: 'تازه معلومات ترلاسه کړئ',
    dismiss: 'ګوښه کول'
  },
  questions: {
    '1': 'Master the Basics',
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
    '20': 'Science of Personal Mastery Course',
    '21': 'Watch the words you speak - what you say is what you get',
    '22': 'Physiology / Dress for success',
    '23': 'Clear Counter Intentions',
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
    '40': 'Live life with deliberate intent - be in present time',
    '1a': 'Who do you listen to?',
    '1b': 'Teachability Index',
    '1c': 'Training Balance Scale',
    '1d': 'Unconscious competence',
    '19a': 'Read books',
    '19b': 'Listen to Audios',
    '19c': 'Attend Events (monthly)',
    '19d': 'Give and receive Recognition / expanded Golden Rule',
    '19e': 'Develop relationships with like minded people',
    '23a': 'Money Processes',
    '23b': 'Relationship Processes',
    '23c': 'Leadership Processes',
    '23d': 'Communication Processes',
    '23e': 'Health Processes',
    '23f': 'Spiritual Awareness Processes',
    '23g': 'Dream Processes',
    '23h': 'Organization & Focus Processes'
  }
};

export default ps;

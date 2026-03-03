/**
 * Auto-converted locale module for ky.
 */
import type { Messages } from './en';

const ky: Messages = {
  nav: {
    questionnaire: 'Анкета',
    history: 'тарых',
    settings: 'Орнотуулар'
  },
  app: {
    name: 'Манифестация алгоритми',
    unexpectedError: 'Күтүлбөгөн ката кетти.'
  },
  home: {
    subtitle: 'Жашооңуздун ар бир тармагына баа бериңиз — өзүңүздүн тегиздөө упайыңызды табыңыз'
  },
  dashboard: {
    title: 'Манифестация алгоритмине көз салуу тарыхы',
    subtitle: 'Убакыттын өтүшү менен прогрессиңизге көз салыңыз',
    loading: 'Таржымалыңыз жүктөлүүдө…',
    noData: 'Бул мезгил үчүн маалымат жок',
    progressTrend: 'Прогресс тенденциясы',
    progressToGoal: 'Максатка жылыш',
    ofGoal: 'Максаттын {pct}%',
    goalReached: '🎯 Максатына жетти!',
    categoryBreakdown: 'Категорияларды бөлүштүрүү',
    noSessionsRange: 'Бул диапазондо сеанстар жок',
    tryWiderRange: 'Кеңири диапазонду колдонуп көрүңүз же башка мезгилди тандаңыз.',
    noSessionsYet: 'Азырынча сеанстар жок',
    completeFirst:
      'Бул жерден прогрессиңизди жана тенденцияңызды көрүү үчүн биринчи баалооңузду бүтүрүңүз.',
    startFirst: 'Биринчи баалоону баштоо',
    export: {
      date: 'Дата',
      time: 'Убакыт',
      totalScore: 'Жалпы упай',
      duration: 'Узактыгы (мүн.)',
      notes: 'Эскертүүлөр'
    }
  },
  stats: {
    averageScore: 'Орточо упай',
    medianScore: 'Медиандык упай',
    highestScore: 'Эң жогорку упай',
    totalSessions: 'Жалпы сессиялар'
  },
  network: {
    rankings: 'Network Rankings',
    searchingPeers: 'Курдаштарды издөө...',
    searching: 'Издөө...',
    online: 'Онлайн',
    peers: '{count} теңтуштар',
    results: '{count} натыйжалары',
    avgShort: 'Орт',
    p90Short: 'P90',
    averageScoreTitle: 'Орточо упай',
    percentile90Title: '90-пайыз',
    globalAverage: 'Дүйнөлүк орточо',
    percentile90: '90-пайыз',
    manifestations: 'Манифестациялар',
    activePeers: 'Активдүү курбулар',
    categoryRankings: 'Категориялардын рейтингдери'
  },
  focusAreas: {
    title: 'Фокустук аймактар',
    subtitle: 'Эң төмөн балл алган 3 категорияңыз — буларды жакшыртуу эң чоң пайда алып келет.',
    empty: 'Жекелештирилген фокус аймагынын сунуштарын көрүү үчүн көбүрөөк сеанстарды бүтүрүңүз.'
  },
  sessions: {
    recent: 'Акыркы сессиялар',
    deselectAll: 'Баарын тандоо',
    selectAll: 'Баарын тандаңыз',
    deleteCount: '{count} жок кылуу',
    cancel: 'Жокко чыгаруу',
    select: 'Тандоо',
    deleting: 'Жок кылынууда…'
  },
  settings: {
    title: 'Колдонмонун жөндөөлөрү',
    close: 'Жөндөөлөрдү жабуу',
    dataManagement: 'Маалыматтарды башкаруу',
    saveLastSession: 'Акыркы сессияны сактоо',
    saveLastSessionDesc: 'Эң акыркы аяктаган сессияңыздагы жоопторду алдын ала толтуруңуз.',
    resetProgress: 'Прогрессти баштапкы абалга келтирүү',
    resetProgressDesc: 'Сакталган жооптордун баарын жок кылып, жаңыдан баштаңыз.',
    goals: 'Максаттар',
    targetScore: 'Максаттуу упай',
    targetScoreDesc:
      'Куралдар тактасында прогрессиңизге көз салуу үчүн максат упайын (1,000–10,000) коюңуз.',
    set: 'коюу',
    clearGoal: 'Таза',
    currentTarget: 'Учурдагы максат:',
    on: 'Күйүк',
    off: 'Өчүк',
    version: 'Манифестация алгоритми {version}',
    clearAllAnswers: 'Бардык жоопторду тазалоо',
    clearConfirmTitle: 'Бардык жоопторду тазалоо',
    clearConfirmMessage:
      'Бул учурдагы бардык жоопторуңузду биротоло жок кылат жана аны артка кайтарууга болбойт.',
    clearConfirmLabel: 'Таза',
    keepAnswers: 'Жоопторду сактаңыз',
    language: 'Тил',
    languageDesc: 'Колдонмо үчүн дисплей тилин тандаңыз.',
    languageCount: '{count} тилдер жеткиликтүү',
    goalErrorRange: 'Сураныч, 1000ден 10000ге чейинки балл киргизиңиз.'
  },
  questionnaire: {
    saving: 'Сакталууда...',
    saved: 'Сакталган',
    progressText: '{pct}% аткарылды ({answered}/{total})',
    progressAria: 'Аяктоо жүрүшүн баалоо',
    maxScore: 'Макс: {score}',
    answerToScore: 'Упайга жооп бер',
    currentScore: 'Учурдагы упай',
    scrollAll: 'Баарын жылдырыңыз',
    stepByStep: 'Кадам кадам',
    questionOf: '{current} суроосу {total}',
    previous: '← Мурунку',
    next: 'Кийинки →',
    completeAssessment: 'Толук баалоо',
    startFresh: 'Жаңыдан баштагыңыз келеби?',
    resetAllAnswers: 'Бардык жоопторду баштапкы абалга келтириңиз',
    resetTitle: 'Бардык жооптор баштапкы абалга келтирилсинби?',
    resetMessage: 'Бул ар бир жоопту тазалап, нөлдөн башталат. Муну артка кайтаруу мүмкүн эмес.',
    resetLabel: 'Калыбына келтирүү',
    scoreQuality: {
      notStarted: 'Башталган жок',
      manifesting: 'Манифестация ❆',
      aligned: 'Тегизделген',
      building: 'Building',
      startingOut: 'Баштоо'
    },
    submitHint: {
      zero: '{total} суроолордун 0ү жооп берди — жоопсуз суроолор демейки минималдуу',
      partial:
        '{remaining} суроо калды — жоопсуз суроолор демейки минимумга | {remaining} суроолор калды — жоопсуз суроолор минималдуу',
      complete: 'Бардык суроолорго жооп берилди — тапшырууга даяр!'
    },
    submitTitle: {
      zero: 'Баалооңузду аягына чыгаруу үчүн кээ бир суроолорго жооп бериңиз',
      partial: '{remaining} суроо калды | {remaining} суроолор калды',
      complete: 'Толук баалооңузду тапшырыңыз'
    },
    submitError: 'Сеанс сакталбай калды: {error}',
    dotTitle: 'Суроо {index}',
    dotAria: '{index} суроого өтүү',
    keyboardHint: 'Кеңеш: Чабыттоо үчүн ← → колдонуңуз · Баалоо үчүн 1–9 / 0'
  },
  onboarding: {
    step0Title: 'Манифестация алгоритмине кош келиңиз',
    step0Body1:
      'Бул курал сиздин ой жүгүртүүңүз, адаттарыңыз жана күнүмдүк аракеттериңиз максаттарыңызга жетүү менен канчалык дал келгенин өлчөөгө жардам берет. Учурдагы упайыңызды алуу үчүн ар бир суроого чынчылдык менен жооп бериңиз.',
    step0Body2:
      'Убакыттын өтүшү менен өсүшүңүзгө көз салуу үчүн анкетаны үзгүлтүксүз толтуруңуз жана кайсы аймактарга көбүрөөк көңүл буруу керектигин көрүңүз.',
    step1Title: 'Скоринг кантип иштейт',
    step1Body:
      'Ар бир суроо упайлардын белгиленген санын түзөт. Ар бир суроо үчүн 1–10 шкала боюнча өзүңүздү балаңыз. 10 рейтинги бул принципти толугу менен камтыганыңызды билдирет; 1 баштала элексиз дегенди билдирет.',
    step1TargetHint: '🎯 Максат: {target} | Максималдуу: {maximum}',
    excellent: 'Мыкты',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Күчтүү түздөө — уланта бер',
    good: 'Жакшы',
    goodRange: '4 001 – 7 000',
    goodNote: 'Катуу пайдубал - өсүү үчүн бөлмө',
    needsWork: 'Жумуш керек',
    needsWorkRange: '0 – 4000',
    needsWorkNote: 'Алгач негиздерине көңүл буруңуз',
    step2Title: 'Дайындарыңыз купуя бойдон калат',
    step2Body1:
      'Бардык жоопторуңуз жана упай таржымалыңыз шифрленген SQLite маалымат базасын колдонуу менен түзмөгүңүздө жергиликтүү түрдө сакталат. Сиздин уруксатыңызсыз эч кандай серверге эч нерсе жөнөтүлбөйт.',
    step2Body2:
      'Кошумча теңдештер менен бөлүшүү өзгөчөлүгү башка колдонуучулардын анонимдүү жалпы упайларын көрүүгө мүмкүнчүлүк берет. Ал криптографиялык кол коюлган корутундуну гана бөлүшөт — сиздин жеке жоопторуңуз эч качан.',
    readyText: 'Даярсызбы? Сиздин базалык упайыңызды алалы.',
    skipIntro: 'Киргизүүнү өткөрүп жиберүү',
    next: 'Кийинки',
    getStarted: 'Баштоо'
  },
  sharing: {
    title: 'Анонимдүү тармак бөлүшүү',
    privacyFirst: '🔒 Купуялык-Биринчи',
    description:
      'Кааласаңыз, натыйжаларыңызды глобалдык тармакка анонимдүү түрдө кошуңуз. Эч кандай ысым, электрондук почта, IP дарек же түзмөк ID эч качан бөлүшүлбөйт.',
    enabled: 'Бөлүшүү иштетилди — тармакка салым кошуу',
    disabled: 'Бөлүшүү өчүрүлгөн (демейки)',
    activeBadge: '✓ Сиздин анонимдүү упайларыңыз теңтуштарыңыз менен бөлүшүлүүдө',
    enableNote: 'Глобалдык тармакка салыштырмалуу пайыздык даражаңызды көрүү үчүн иштетиңиз.'
  },
  category: {
    back: '‹ Артка',
    history: 'тарых',
    date: 'Дата',
    score: 'Упай',
    loading: 'Жүктөлүүдө...',
    notEnoughData: 'Дайындар жетишсиз',
    noData: '“{category}” үчүн эч кандай маалымат табылган жок.',
    goToDashboard: 'Башкаруу тактасына өтүңүз'
  },
  chartActions: {
    viewFullscreen: 'Толук экранды көрүү',
    exitFullscreen: 'Толук экрандан чыгуу',
    copyChart: 'Диаграмманы көчүрүү',
    exportChart: 'Экспорт диаграммасы',
    exportDefault: '⬇ Экспорттоо',
    exportExcel: '📊 Excelди экспорттоо',
    exportCsv: '📄 CSV экспорттоо',
    exportPdf: '📑 PDF экспорттоо',
    exportHtml: '🌐 HTML экспорттоо',
    copied: 'Диаграмма алмашуу буферине көчүрүлдү',
    copyFailed: 'Көчүрүү ишке ашкан жок — алмашуу буфери жеткиликтүү эмес',
    saveCancelled: 'Сактоо жокко чыгарылды'
  },
  resume: {
    continueLastSession: 'Акыркы сеанстан улантасызбы?',
    welcomeBack: 'Кайра кош келиңиз!',
    historicalBody:
      'Акыркы аяктаган сессияңыздагы жоопторуңуз алдын ала жүктөлгөн. Бул баалуулуктарды баштапкы чекит катары сактап калгыңыз келеби же толугу менен бош анкета менен баштагыңыз келеби?',
    activeBody:
      'Сизде сессия жүрүп жатат. Калган жериңизден улантууну каалайсызбы же жаңы баа берүүнү баштайсызбы?',
    clearWarning: '⚠️ Ушуну менен учурдагы бардык жооптор тазаланат. Ишенесиңби?',
    yesStartFresh: 'Ооба, жаңы баштоо',
    cancel: 'Жокко чыгаруу',
    keepLastValues: 'Акыркы баалуулуктарды сактаңыз',
    resumeSession: 'Сеансты улантуу',
    startFresh: 'Жаңы баштоо'
  },
  questionItem: {
    pointsSuffix: 'п.т',
    low: 'Төмөн',
    high: 'Жогорку',
    rateAria: 'Баалоо {question}'
  },
  dateRange: {
    rangeLabel: 'Диапазон:',
    startDate: 'Башталыш күнү',
    endDate: 'Аяктоо күнү',
    presets: {
      '7d': '7 күн',
      '30d': '30 күн',
      '90d': '90 күн',
      '1y': '1 жыл',
      all: 'Бардык убакыт',
      custom: 'Ыңгайлаштырылган'
    }
  },
  update: {
    availableTitle: 'v{version} жеткиликтүү!',
    releaseNotesFallback: 'Акыркы версиясын жүктөп алуу үчүн релиз барагына өтүңүз.',
    getUpdate: 'Жаңыртуу',
    dismiss: 'Иштен чыгаруу'
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

export default ky;

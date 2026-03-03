/**
 * Auto-converted locale module for kk.
 */
import type { Messages } from './en';

const kk: Messages = {
  nav: {
    questionnaire: 'Сауалнама',
    history: 'Тарих',
    settings: 'Параметрлер'
  },
  app: {
    name: 'Көрініс алгоритмі',
    unexpectedError: 'Күтпеген қате орын алды.'
  },
  home: {
    subtitle: 'Өміріңіздің әр саласын бағалаңыз - теңестіру ұпайыңызды табыңыз'
  },
  dashboard: {
    title: 'Көрініс алгоритмін қадағалау тарихы',
    subtitle: 'Уақыт өте келе үлгерімді қадағалаңыз',
    loading: 'Тарих жүктелуде…',
    noData: 'Осы кезеңге қатысты деректер жоқ',
    progressTrend: 'Прогресс тенденциясы',
    progressToGoal: 'Мақсатқа жету',
    ofGoal: 'Мақсаттың {pct}%',
    goalReached: '🎯 Мақсатқа жетті!',
    categoryBreakdown: 'Санаттарды бөлу',
    noSessionsRange: 'Бұл ауқымда сеанстар жоқ',
    tryWiderRange: 'Кеңірек ауқымды қолданып көріңіз немесе басқа кезеңді таңдаңыз.',
    noSessionsYet: 'Сеанстар әлі жоқ',
    completeFirst:
      'Прогресс пен трендтеріңізді көру үшін бірінші бағалауыңызды осы жерден аяқтаңыз.',
    startFirst: 'Бірінші бағалауды бастау',
    export: {
      date: 'Күн',
      time: 'Уақыт',
      totalScore: 'Жалпы ұпай',
      duration: 'Ұзақтығы (мин)',
      notes: 'Ескертпелер'
    }
  },
  stats: {
    averageScore: 'Орташа балл',
    medianScore: 'Медиандық ұпай',
    highestScore: 'Ең жоғары ұпай',
    totalSessions: 'Жалпы сеанстар'
  },
  network: {
    rankings: 'Желілік рейтингтер',
    searchingPeers: 'Құрдастарды іздеуде...',
    searching: 'Іздеуде...',
    online: 'Онлайн',
    peers: '{count} құрбылары',
    results: '{count} нәтижелері',
    avgShort: 'Орт',
    p90Short: 'P90',
    averageScoreTitle: 'Орташа балл',
    percentile90Title: '90-шы пайыздық',
    globalAverage: 'Жаһандық орташа',
    percentile90: '90-шы пайыздық',
    manifestations: 'Көріністері',
    activePeers: 'Белсенді құрбылар',
    categoryRankings: 'Санаттардың рейтингтері'
  },
  focusAreas: {
    title: 'Фокус аймақтары',
    subtitle: 'Ең төмен ұпай жинаған 3 санатыңыз — осыларды жақсарту ең үлкен табысқа әкеледі.',
    empty: 'Жекелендірілген фокус аймағы ұсыныстарын көру үшін қосымша сеанстарды аяқтаңыз.'
  },
  sessions: {
    recent: 'Соңғы сеанстар',
    deselectAll: 'Барлығын таңдауды алып тастаңыз',
    selectAll: 'Барлығын таңдаңыз',
    deleteCount: '{count} жою',
    cancel: 'Болдырмау',
    select: 'таңдаңыз',
    deleting: 'Жоюда…'
  },
  settings: {
    title: 'Қолданба параметрлері',
    close: 'Параметрлерді жабу',
    dataManagement: 'Деректерді басқару',
    saveLastSession: 'Соңғы сеансты сақтау',
    saveLastSessionDesc: 'Ең соңғы аяқталған сеанстағы жауаптарды алдын ала толтырыңыз.',
    resetProgress: 'Орындалу барысын қалпына келтіру',
    resetProgressDesc: 'Барлық сақталған жауаптарды жойып, жаңадан бастаңыз.',
    goals: 'Мақсаттар',
    targetScore: 'Мақсатты ұпай',
    targetScoreDesc:
      'Бақылау тақтасындағы ілгерілеуді бақылау үшін мақсатты балл қойыңыз (1000–10000).',
    set: 'Орнату',
    clearGoal: 'Таза',
    currentTarget: 'Ағымдағы мақсат:',
    on: 'Қосулы',
    off: 'Өшірулі',
    version: 'Көрініс алгоритмі {version}',
    clearAllAnswers: 'Барлық жауаптарды өшіру',
    clearConfirmTitle: 'Барлық жауаптарды өшіру',
    clearConfirmMessage:
      'Бұл барлық ағымдағы жауаптарыңызды біржола жояды және оны қайтару мүмкін емес.',
    clearConfirmLabel: 'Таза',
    keepAnswers: 'Жауаптарды сақтаңыз',
    language: 'Тіл',
    languageDesc: 'Қолданба үшін дисплей тілін таңдаңыз.',
    languageCount: '{count} тілдері қолжетімді',
    goalErrorRange: '1000 мен 10 000 аралығындағы балл енгізіңіз.'
  },
  questionnaire: {
    saving: 'Сақталуда...',
    saved: 'Сақталды',
    progressText: '{pct}% аяқталды ({answered}/{total})',
    progressAria: 'Аяқталу барысын бағалау',
    maxScore: 'Максимум: {score}',
    answerToScore: 'Ұпайға жауап беріңіз',
    currentScore: 'Ағымдағы ұпай',
    scrollAll: 'Барлығын айналдырыңыз',
    stepByStep: 'Қадам қадам',
    questionOf: '{current} сұрағы, {total}',
    previous: '← Алдыңғы',
    next: 'Келесі →',
    completeAssessment: 'Толық бағалау',
    startFresh: 'Жаңадан бастағыңыз келе ме?',
    resetAllAnswers: 'Барлық жауаптарды қалпына келтіріңіз',
    resetTitle: 'Барлық жауаптарды қалпына келтіру керек пе?',
    resetMessage:
      'Бұл әрбір жауапты тазартады және нөлден басталады. Бұл әрекетті қайтару мүмкін емес.',
    resetLabel: 'Қалпына келтіру',
    scoreQuality: {
      notStarted: 'Басталған жоқ',
      manifesting: 'Манифестация ❆',
      aligned: 'Туралы',
      building: 'Ғимарат',
      startingOut: 'Бастау'
    },
    submitHint: {
      zero: '{total} сұрақтың 0-і жауап берді — жауапсыз сұрақтар әдепкі бойынша ең аз',
      partial:
        '{remaining} сұрақ қалды — жауапсыз сұрақтар әдепкі бойынша минимумға | {remaining} сұрақтар қалды — жауапсыз сұрақтар әдепкі бойынша минимумға дейін',
      complete: 'Барлық сұрақтарға жауап берілді - жіберуге дайын!'
    },
    submitTitle: {
      zero: 'Бағалауды аяқтау үшін бірнеше сұрақтарға жауап беріңіз',
      partial: '{remaining} сұрақ қалды | {remaining} сұрақтар қалды',
      complete: 'Аяқталған бағалауыңызды жіберіңіз'
    },
    submitError: 'Сеанс сақталмады: {error}',
    dotTitle: 'Сұрақ {index}',
    dotAria: '{index} сұраққа өту',
    keyboardHint: 'Кеңес: Шарлау үшін ← → түймесін басыңыз · Бағалау үшін 1–9 / 0'
  },
  onboarding: {
    step0Title: 'Манифестация алгоритміне қош келдіңіз',
    step0Body1:
      'Бұл құрал сіздің ойыңыздың, әдеттеріңіздің және күнделікті әрекеттеріңіздің мақсаттарыңызға жетуге қаншалықты сәйкес келетінін өлшеуге көмектеседі. Ағымдағы ұпайыңызды алу үшін әрбір сұраққа шынайы жауап беріңіз.',
    step0Body2:
      'Уақыт өте келе өсуіңізді бақылап, қай аймақтарға көбірек көңіл бөлу керектігін білу үшін сауалнаманы жүйелі түрде толтырыңыз.',
    step1Title: 'Скоринг қалай жұмыс істейді',
    step1Body:
      'Әрбір сұрақ белгілі бір ұпай санымен бағаланады. Әрбір сұрақ үшін 1-10 шкаласымен өзіңізді бағалаңыз. 10 рейтингі бұл принципті толығымен жүзеге асырғаныңызды білдіреді; 1 басталмағаныңызды білдіреді.',
    step1TargetHint: '🎯 Мақсат: {target} | Максималды: {maximum}',
    excellent: 'Өте жақсы',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Күшті теңестіру — жалғастырыңыз',
    good: 'Жақсы',
    goodRange: '4 001 – 7 000',
    goodNote: 'Қатты негіз - өсу үшін бөлме',
    needsWork: 'Жұмыс қажет',
    needsWorkRange: '0 – 4000',
    needsWorkNote: 'Алдымен негіздерге назар аударыңыз',
    step2Title: 'Деректеріңіз құпия болып қалады',
    step2Body1:
      'Барлық жауаптарыңыз бен ұпайлар журналы шифрланған SQLite дерекқорын пайдаланып құрылғыңызда жергілікті түрде сақталады. Сіздің рұқсатыңызсыз ешбір серверге ештеңе жіберілмейді.',
    step2Body2:
      'Қосымша тең дәрежелі ортақ пайдалану мүмкіндігі басқа пайдаланушылардың анонимді жиынтық ұпайларын көруге мүмкіндік береді. Ол тек криптографиялық қол қойылған түйіндемені бөліседі - ешқашан сіздің жеке жауаптарыңыз емес.',
    readyText: 'Дайын ба? Сіздің негізгі ұпайыңызды алайық.',
    skipIntro: 'Кіріспеді өткізіп жіберу',
    next: 'Келесі',
    getStarted: 'Жұмысты бастау'
  },
  sharing: {
    title: 'Анонимді желіні ортақ пайдалану',
    privacyFirst: '🔒 Құпиялылық - бірінші',
    description:
      'Нәтижелеріңізді ғаламдық желіге жасырын түрде енгізіңіз. Ешбір атау, электрондық пошта, IP мекенжайы немесе құрылғы идентификаторы ешқашан бөлісілмейді.',
    enabled: 'Бөлісу қосулы — желіге үлес қосу',
    disabled: 'Бөлісу өшірілген (әдепкі)',
    activeBadge: '✓ Сіздің анонимді ұпайларыңыз құрдастармен бөлісілуде',
    enableNote: 'Жаһандық желімен салыстырғанда пайыздық дәрежеңізді көру үшін қосыңыз.'
  },
  category: {
    back: '‹ Артқа',
    history: 'Тарих',
    date: 'Күн',
    score: 'Ұпай',
    loading: 'Жүктелуде...',
    notEnoughData: 'Деректер жеткіліксіз',
    noData: '“{category}” үшін деректер табылмады.',
    goToDashboard: 'Бақылау тақтасына өтіңіз'
  },
  chartActions: {
    viewFullscreen: 'Толық экранды көру',
    exitFullscreen: 'Толық экраннан шығу',
    copyChart: 'Диаграмманы көшіру',
    exportChart: 'Экспорттық диаграмма',
    exportDefault: '⬇ Экспорттау',
    exportExcel: '📊 Excel бағдарламасын экспорттау',
    exportCsv: '📄 CSV экспорттау',
    exportPdf: '📑 PDF файлын экспорттау',
    exportHtml: '🌐 HTML экспорттау',
    copied: 'Диаграмма алмасу буферіне көшірілді',
    copyFailed: 'Көшіру орындалмады — алмасу буфері қолжетімді емес',
    saveCancelled: 'Сақтау тоқтатылды'
  },
  resume: {
    continueLastSession: 'Соңғы сеанстан жалғастыру керек пе?',
    welcomeBack: 'Қайтадан қош келдіңіз!',
    historicalBody:
      'Соңғы аяқталған сеанстағы жауаптарыңыз алдын ала жүктелді. Бұл мәндерді бастапқы нүкте ретінде сақтағыңыз келе ме, әлде толығымен бос сауалнамадан бастағыңыз келе ме?',
    activeBody:
      'Сізде сеанс жүріп жатыр. Тоқтаған жерден жалғастырғыңыз келе ме, әлде жаңа бағалауды бастағыңыз келе ме?',
    clearWarning: '⚠️ Бұл барлық ағымдағы жауаптарды өшіреді. Сіз сенімдісіз бе?',
    yesStartFresh: 'Иә, жаңадан бастаңыз',
    cancel: 'Болдырмау',
    keepLastValues: 'Соңғы мәндерді сақтаңыз',
    resumeSession: 'Сеансты жалғастыру',
    startFresh: 'Жаңадан бастау'
  },
  questionItem: {
    pointsSuffix: 'ұпай',
    low: 'Төмен',
    high: 'Жоғары',
    rateAria: 'Бағалау {question}'
  },
  dateRange: {
    rangeLabel: 'Ауқым:',
    startDate: 'Басталу күні',
    endDate: 'Аяқталу күні',
    presets: {
      '7d': '7 күн',
      '30d': '30 күн',
      '90d': '90 күн',
      '1y': '1 жыл',
      all: 'Барлық уақытта',
      custom: 'Арнаулы'
    }
  },
  update: {
    availableTitle: 'v{version} қолжетімді!',
    releaseNotesFallback: 'Соңғы нұсқаны жүктеп алу үшін шығарылым бетіне өтіңіз.',
    getUpdate: 'Жаңарту алу',
    dismiss: 'Босату'
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

export default kk;

/**
 * Auto-converted locale module for mn.
 */
import type { Messages } from './en';

const mn: Messages = {
  nav: {
    questionnaire: 'Санал асуулга',
    history: 'Түүх',
    settings: 'Тохиргоо'
  },
  app: {
    name: 'Илэрхийлэх алгоритм',
    unexpectedError: 'Гэнэтийн алдаа гарлаа.'
  },
  home: {
    subtitle: 'Амьдралынхаа талбар бүрийг үнэлээрэй - таарсан оноогоо олж мэдээрэй'
  },
  dashboard: {
    title: 'Илэрхийллийн алгоритмыг хянах түүх',
    subtitle: 'Цаг хугацааны явцад ахиц дэвшлээ хянах',
    loading: 'Таны түүхийг ачаалж байна...',
    noData: 'Энэ хугацааны мэдээлэл алга',
    progressTrend: 'Хөгжил дэвшлийн чиг хандлага',
    progressToGoal: 'Зорилгодоо хүрэх ахиц дэвшил',
    ofGoal: 'Зорилгын {pct}%',
    goalReached: '🎯 Зорилгодоо хүрлээ!',
    categoryBreakdown: 'Ангилал задаргаа',
    noSessionsRange: 'Энэ мужид сесс байхгүй',
    tryWiderRange: 'Илүү өргөн хүрээг оролдох эсвэл өөр үе сонгоно уу.',
    noSessionsYet: 'Одоогоор сесс алга',
    completeFirst:
      'Өөрийн ахиц дэвшил, чиг хандлагыг эндээс харахын тулд эхний үнэлгээгээ бөглөнө үү.',
    startFirst: 'Эхний үнэлгээг эхлүүлэх',
    export: {
      date: 'Огноо',
      time: 'Цаг хугацаа',
      totalScore: 'Нийт оноо',
      duration: 'Үргэлжлэх хугацаа (мин)',
      notes: 'Тэмдэглэл'
    }
  },
  stats: {
    averageScore: 'Дундаж оноо',
    medianScore: 'Дундаж оноо',
    highestScore: 'Хамгийн өндөр оноо',
    totalSessions: 'Нийт сесс'
  },
  network: {
    rankings: 'Сүлжээний зэрэглэл',
    searchingPeers: 'Үе тэнгийнхнээ хайж байна...',
    searching: 'Хайж байна...',
    online: 'Онлайн',
    peers: '{count} үе тэнгийнхэн',
    results: '{count} үр дүн',
    avgShort: 'Дундаж',
    p90Short: 'P90',
    averageScoreTitle: 'Дундаж оноо',
    percentile90Title: '90 хувь',
    globalAverage: 'Дэлхийн дундаж',
    percentile90: '90 хувь',
    manifestations: 'Илэрхийлэл',
    activePeers: 'Идэвхтэй үе тэнгийнхэн',
    categoryRankings: 'Ангилал зэрэглэл'
  },
  focusAreas: {
    title: 'Анхаарал төвлөрүүлэх газрууд',
    subtitle:
      'Таны хамгийн бага оноотой 3 ангилал — эдгээрийг сайжруулах нь хамгийн их ашиг авчирна.',
    empty: 'Хувийн болгосон фокусын зөвлөмжийг харахын тулд илүү олон сешнүүдийг дуусгана уу.'
  },
  sessions: {
    recent: 'Сүүлийн хуралдаанууд',
    deselectAll: 'Бүгдийг сонгоно уу',
    selectAll: 'Бүгдийг сонгоно уу',
    deleteCount: '{count}-г устгах',
    cancel: 'Цуцлах',
    select: 'Сонго',
    deleting: 'Устгаж байна...'
  },
  settings: {
    title: 'Програмын тохиргоо',
    close: 'Тохиргоог хаах',
    dataManagement: 'Өгөгдлийн менежмент',
    saveLastSession: 'Сүүлийн сессийг хадгалах',
    saveLastSessionDesc: 'Хамгийн сүүлд дууссан сессийн хариултуудыг урьдчилан бөглөнө үү.',
    resetProgress: 'Явцыг дахин тохируулах',
    resetProgressDesc: 'Хадгалсан бүх хариултыг устгаад шинээр эхлүүлнэ үү.',
    goals: 'Зорилго',
    targetScore: 'Зорилтот оноо',
    targetScoreDesc:
      'Хяналтын самбар дээр ахиц дэвшлээ хянахын тулд зорилгоо (1,000–10,000) тогтоо.',
    set: 'Тохируулах',
    clearGoal: 'Тодорхой',
    currentTarget: 'Одоогийн зорилт:',
    on: 'Асаалттай',
    off: 'Унтраах',
    version: 'Илэрхийлэх алгоритм {version}',
    clearAllAnswers: 'Бүх хариултыг арилгах',
    clearConfirmTitle: 'Бүх хариултыг арилгах',
    clearConfirmMessage:
      'Энэ нь таны одоогийн бүх хариултыг бүрмөсөн устгах бөгөөд буцаах боломжгүй.',
    clearConfirmLabel: 'Тодорхой',
    keepAnswers: 'Хариултуудыг хадгалах',
    language: 'Хэл',
    languageDesc: 'Програмын дэлгэцийн хэлийг сонгоно уу.',
    languageCount: '{count} хэл боломжтой',
    goalErrorRange: '1000-аас 10000 хүртэлх оноог оруулна уу.'
  },
  questionnaire: {
    saving: 'Хадгалж байна...',
    saved: 'Хадгалсан',
    progressText: '{pct}% дууссан ({answered}/{total})',
    progressAria: 'Үнэлгээний гүйцэтгэлийн явц',
    maxScore: 'Хамгийн их: {score}',
    answerToScore: 'Онооны хариу',
    currentScore: 'Одоогийн оноо',
    scrollAll: 'Бүгдийг гүйлгэх',
    stepByStep: 'Алхам алхмаар',
    questionOf: 'Асуулт {current}-ийн {total}',
    previous: '← Өмнөх',
    next: 'Дараагийн →',
    completeAssessment: 'Бүрэн үнэлгээ',
    startFresh: 'Шинээр эхэлмээр байна уу?',
    resetAllAnswers: 'Бүх хариултыг дахин тохируулна уу',
    resetTitle: 'Бүх хариултыг дахин тохируулах уу?',
    resetMessage: 'Энэ нь хариулт бүрийг цэвэрлэж, эхнээс нь эхлэх болно. Үүнийг буцаах боломжгүй.',
    resetLabel: 'Дахин тохируулах',
    scoreQuality: {
      notStarted: 'Эхлээгүй байна',
      manifesting: 'Илрэх ❆',
      aligned: 'Зэрэгцүүлсэн',
      building: 'Барилга',
      startingOut: 'Эхлэх'
    },
    submitHint: {
      zero: '{total} асуултын 0-д нь хариулсан - хариултгүй асуултууд хамгийн бага байна',
      partial:
        '{remaining} асуулт үлдсэн — хариултгүй асуултууд хамгийн багадаа | {remaining} асуултууд үлдсэн - хариултгүй асуултууд хамгийн багадаа тохируулна',
      complete: 'Бүх асуултад хариулсан - илгээхэд бэлэн байна!'
    },
    submitTitle: {
      zero: 'Үнэлгээгээ дуусгахын тулд зарим асуултанд хариулна уу',
      partial: '{remaining} асуулт үлдсэн | {remaining} асуулт үлдсэн',
      complete: 'Дууссан үнэлгээгээ илгээнэ үү'
    },
    submitError: 'Сешн хадгалж чадсангүй: {error}',
    dotTitle: 'Асуулт {index}',
    dotAria: '{index} асуулт руу очно уу',
    keyboardHint: 'Зөвлөмж: ← → ашиглан шилжих · 1–9 / 0 үнэлгээ өгнө'
  },
  onboarding: {
    step0Title: 'Илэрхийлэх алгоритмд тавтай морилно уу',
    step0Body1:
      'Энэхүү хэрэгсэл нь таны сэтгэлгээ, зуршил, өдөр тутмын үйлдлүүд зорилгодоо хүрэхтэй хэр зэрэг нийцэж байгааг хэмжихэд тусална. Одоогийн оноогоо авахын тулд асуулт бүрт үнэнчээр хариул.',
    step0Body2:
      'Цаг хугацаа өнгөрөх тусам таны өсөлтийг хянахын тулд асуумжийг тогтмол хугацаанд бөглөж, аль хэсэгт хамгийн их анхаарал хандуулж байгааг хараарай.',
    step1Title: 'Оноо хэрхэн ажилладаг',
    step1Body:
      'Асуулт бүр тодорхой тооны оноотой. Асуулт бүрийг 1-10 хүртэлх оноогоор үнэл. 10 оноо гэдэг нь та энэ зарчмыг бүрэн хэрэгжүүлсэн гэсэн үг; 1 гэдэг нь та эхлээгүй байна гэсэн үг.',
    step1TargetHint: '🎯 Зорилтот: {target} | Хамгийн их: {maximum}',
    excellent: 'Маш сайн',
    excellentRange: '7,001 - 10,000',
    excellentNote: 'Хүчтэй тохируулга - үргэлжлүүлээрэй',
    good: 'Сайн байна',
    goodRange: '4,001 - 7,000',
    goodNote: 'Хатуу суурь - ургах өрөө',
    needsWork: 'Ажил хэрэгтэй',
    needsWorkRange: '0 - 4000',
    needsWorkNote: 'Юуны өмнө үндсэн зүйлд анхаарлаа хандуулаарай',
    step2Title: 'Таны өгөгдөл нууц хэвээр үлдэнэ',
    step2Body1:
      'Таны бүх хариулт болон онооны түүх нь шифрлэгдсэн SQLite мэдээллийн баазыг ашиглан таны төхөөрөмж дээр хадгалагдана. Таны тодорхой зөвшөөрөлгүйгээр ямар ч сервер рүү юу ч илгээгдэхгүй.',
    step2Body2:
      'Үе тэнгийн хооронд хуваалцах нэмэлт функц нь бусад хэрэглэгчдийн нэрээ нууцалсан нийт оноог харах боломжийг танд олгоно. Энэ нь зөвхөн криптографийн гарын үсэгтэй хураангуйг хуваалцдаг бөгөөд таны хувийн хариулт хэзээ ч байдаггүй.',
    readyText: 'Бэлэн үү? Таны үндсэн оноог авцгаая.',
    skipIntro: 'Танилцуулга алгасах',
    next: 'Дараа нь',
    getStarted: 'Эхлэх'
  },
  sharing: {
    title: 'Нэргүй сүлжээ хуваалцах',
    privacyFirst: '🔒 Нууцлал-Нэгдүгээрт',
    description:
      'Өөрийн үр дүнг нэрээ нууцлан дэлхийн сүлжээнд оруулах боломжтой. Нэр, имэйл, IP хаяг, төхөөрөмжийн ID-г хэзээ ч хуваалцдаггүй.',
    enabled: 'Хуваалцахыг идэвхжүүлсэн — сүлжээнд хувь нэмэр оруулж байна',
    disabled: 'Хуваалцах идэвхгүй (өгөгдмөл)',
    activeBadge: '✓ Таны нэрээ нууцалсан оноог үе тэнгийнхэнтэйгээ хуваалцаж байна',
    enableNote: 'Глобал сүлжээтэй харьцуулахад таны хувийн зэрэглэлийг харах боломжтой.'
  },
  category: {
    back: '‹ Буцах',
    history: 'Түүх',
    date: 'Огноо',
    score: 'Оноо',
    loading: 'Ачааж байна...',
    notEnoughData: 'Дата хангалтгүй байна',
    noData: '"{category}"-н өгөгдөл олдсонгүй.',
    goToDashboard: 'Хяналтын самбар руу очно уу'
  },
  chartActions: {
    viewFullscreen: 'Бүтэн дэлгэцээр үзэх',
    exitFullscreen: 'Бүтэн дэлгэцээс гарах',
    copyChart: 'Диаграм хуулах',
    exportChart: 'Экспортын диаграм',
    exportDefault: '⬇ Экспортлох',
    exportExcel: '📊 Excel экспортлох',
    exportCsv: '📄 CSV экспортлох',
    exportPdf: '📑 PDF файлыг экспортлох',
    exportHtml: '🌐 HTML экспортлох',
    copied: 'Диаграмыг санах ой руу хуулсан',
    copyFailed: 'Хуулж чадсангүй — санах ой байхгүй',
    saveCancelled: 'Хадгалахыг цуцалсан'
  },
  resume: {
    continueLastSession: 'Сүүлийн хичээлээс үргэлжлүүлэх үү?',
    welcomeBack: 'Эргээд тавтай морил!',
    historicalBody:
      'Таны хамгийн сүүлд дууссан сессийн хариултуудыг урьдчилан ачааллаа. Та эдгээр утгыг эхлэлийн цэг болгон хадгалах уу эсвэл бүрэн хоосон асуулгаар эхлэх үү?',
    activeBody:
      'Танд сесс үргэлжилж байна. Та орхисон газраасаа үргэлжлүүлэх үү эсвэл дахин үнэлгээ хийх үү?',
    clearWarning: '⚠️ Энэ нь одоо байгаа бүх хариултыг арилгах болно. Та итгэлтэй байна уу?',
    yesStartFresh: 'Тийм ээ, Шинээр эхэл',
    cancel: 'Цуцлах',
    keepLastValues: 'Сүүлийн утгыг хадгал',
    resumeSession: 'Сессийг үргэлжлүүлэх',
    startFresh: 'Шинээр эхэл'
  },
  questionItem: {
    pointsSuffix: 'оноо',
    low: 'Бага',
    high: 'Өндөр',
    rateAria: 'Үнэлгээ {question}'
  },
  dateRange: {
    rangeLabel: 'Хүрээ:',
    startDate: 'Эхлэх огноо',
    endDate: 'Дуусах огноо',
    presets: {
      '7d': '7 хоног',
      '30d': '30 хоног',
      '90d': '90 хоног',
      '1y': '1 жил',
      all: 'Бүх цаг',
      custom: 'Захиалгат'
    }
  },
  update: {
    availableTitle: 'v{version} боломжтой!',
    releaseNotesFallback:
      'Хамгийн сүүлийн хувилбарыг татаж авахын тулд хувилбарын хуудсанд зочилно уу.',
    getUpdate: 'Шинэчлэлт авах',
    dismiss: 'Хаах'
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

export default mn;

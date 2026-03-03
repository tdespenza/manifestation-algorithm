/**
 * Auto-converted locale module for sr.
 */
import type { Messages } from './en';

const sr: Messages = {
  nav: {
    questionnaire: 'Упитник',
    history: 'Историја',
    settings: 'Подешавања'
  },
  app: {
    name: 'Алгоритам манифестације',
    unexpectedError: 'Дошло је до неочекиване грешке.'
  },
  home: {
    subtitle: 'Оцените сваку област свог живота — откријте свој резултат усклађености'
  },
  dashboard: {
    title: 'Историја праћења алгоритма манифестације',
    subtitle: 'Пратите свој напредак током времена',
    loading: 'Учитавање историје…',
    noData: 'Нема података за овај период',
    progressTrend: 'Тренд напретка',
    progressToGoal: 'Напредак до циља',
    ofGoal: '@@ПХ_0@@% циља',
    goalReached: '🎯 Циљ постигнут!',
    categoryBreakdown: 'Цатегори Бреакдовн',
    noSessionsRange: 'Нема сесија у овом опсегу',
    tryWiderRange: 'Покушајте са ширим опсегом или изаберите други период.',
    noSessionsYet: 'Још нема сесија',
    completeFirst: 'Завршите своју прву процену да бисте видели свој напредак и трендове овде.',
    startFirst: 'Почните са првом проценом',
    export: {
      date: 'Датум',
      time: 'Време',
      totalScore: 'Тотал Сцоре',
      duration: 'Трајање (мин)',
      notes: 'Напомене'
    }
  },
  stats: {
    averageScore: 'Просечна оцена',
    medianScore: 'Медиан Сцоре',
    highestScore: 'Највиша оцена',
    totalSessions: 'Тотал Сессионс'
  },
  network: {
    rankings: 'Нетворк Ранкингс',
    searchingPeers: 'У потрази за вршњацима...',
    searching: 'Тражи се...',
    online: 'Онлине',
    peers: '@@ПХ_0@@ вршњаци',
    results: '@@ПХ_0@@ резултати',
    avgShort: 'Авг',
    p90Short: 'П90',
    averageScoreTitle: 'Просечна оцена',
    percentile90Title: '90тх Перцентиле',
    globalAverage: 'Глобални просек',
    percentile90: '90тх Перцентиле',
    manifestations: 'Манифестације',
    activePeers: 'Ацтиве Пеерс',
    categoryRankings: 'Категорија Ранкингс'
  },
  focusAreas: {
    title: 'Фокусне области',
    subtitle: 'Ваше 3 категорије са најнижим резултатом — побољшање ових доноси највеће добитке.',
    empty: 'Завршите више сесија да бисте видели персонализоване препоруке за фокусну област.'
  },
  sessions: {
    recent: 'Недавне сесије',
    deselectAll: 'Опозовите избор свих',
    selectAll: 'Изаберите Све',
    deleteCount: 'Избриши @@ПХ_0@@',
    cancel: 'Откажи',
    select: 'Изаберите',
    deleting: 'Брисање…'
  },
  settings: {
    title: 'Подешавања апликације',
    close: 'Затворите подешавања',
    dataManagement: 'Управљање подацима',
    saveLastSession: 'Сачувај последњу сесију',
    saveLastSessionDesc: 'Унапред попуните одговоре из своје последње завршене сесије.',
    resetProgress: 'Ресетујте напредак',
    resetProgressDesc: 'Избришите све сачуване одговоре и почните испочетка.',
    goals: 'Голови',
    targetScore: 'Таргет Сцоре',
    targetScoreDesc:
      'Поставите резултат (1.000–10.000) да бисте пратили свој напредак на контролној табли.',
    set: 'Сет',
    clearGoal: 'Јасно',
    currentTarget: 'Тренутни циљ:',
    on: 'Он',
    off: 'Офф',
    version: 'Алгоритам манифестације @@ПХ_0@@',
    clearAllAnswers: 'Обриши све одговоре',
    clearConfirmTitle: 'Обриши све одговоре',
    clearConfirmMessage:
      'Ово ће трајно избрисати све ваше тренутне одговоре и не може се опозвати.',
    clearConfirmLabel: 'Јасно',
    keepAnswers: 'Задржи одговоре',
    language: 'Језик',
    languageDesc: 'Изаберите језик приказа за апликацију.',
    languageCount: '@@ПХ_0@@ доступни језици',
    goalErrorRange: 'Унесите резултат између 1.000 и 10.000.'
  },
  questionnaire: {
    saving: 'Чување...',
    saved: 'Сачувано',
    progressText: '@@ПХ_0@@% завршено (@@ПХ_1@@/@@ПХ_2@@)',
    progressAria: 'Напредак завршетка процене',
    maxScore: 'Макс: @@ПХ_0@@',
    answerToScore: 'Одговор на гол',
    currentScore: 'Тренутни резултат',
    scrollAll: 'Помери све',
    stepByStep: 'Корак по корак',
    questionOf: 'Питање @@ПХ_0@@ од @@ПХ_1@@',
    previous: '← Претходно',
    next: 'Следеће →',
    completeAssessment: 'Комплетна процена',
    startFresh: 'Желите да почнете изнова?',
    resetAllAnswers: 'Ресетујте све одговоре',
    resetTitle: 'Ресетовати све одговоре?',
    resetMessage: 'Ово ће очистити сваки одговор и почети од нуле. Ово се не може поништити.',
    resetLabel: 'Ресетуј',
    scoreQuality: {
      notStarted: 'Није започето',
      manifesting: 'Манифестирање ❆',
      aligned: 'Алигнед',
      building: 'Зграда',
      startingOut: 'Стартинг Оут'
    },
    submitHint: {
      zero: 'Одговорено је 0 од @@ПХ_0@@ питања — неодговорена питања су подразумевана на минимум',
      partial:
        '@@ПХ_0@@ преостало питање — неодговорена питања подразумевано на минимум | @@ПХ_1@@ преостала питања — неодговорена питања су подразумевана на минимум',
      complete: 'Одговори на сва питања — спремни за слање!'
    },
    submitTitle: {
      zero: 'Одговорите на нека питања да бисте довршили своју процену',
      partial: '@@ПХ_0@@ преостало питање | @@ПХ_1@@ преостала питања',
      complete: 'Пошаљите своју завршену процену'
    },
    submitError: 'Чување сесије није успело: @@ПХ_0@@',
    dotTitle: 'Питање @@ПХ_0@@',
    dotAria: 'Иди на питање @@ПХ_0@@',
    keyboardHint: 'Савет: Користите ← → за навигацију · 1–9 / 0 да бисте оценили'
  },
  onboarding: {
    step0Title: 'Добродошли у алгоритам манифестације',
    step0Body1:
      'Овај алат вам помаже да измерите колико су ваш начин размишљања, навике и свакодневне радње усклађени са постизањем ваших циљева. Одговорите искрено на свако питање да бисте добили тренутни резултат.',
    step0Body2:
      'Попуните упитник у редовним интервалима да бисте пратили свој раст током времена и видели којим областима треба највише пажње.',
    step1Title: 'Како функционише бодовање',
    step1Body:
      'Свако питање вреди одређени број поена. Оцените себе на скали од 1–10 за свако питање. Оцена 10 значи да сте у потпуности оличили тај принцип; 1 значи да нисте почели.',
    step1TargetHint: '🎯 Циљ: @@ПХ_0@@ | Максимум: @@ПХ_1@@',
    excellent: 'Одлично',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Снажно поравнање - наставите',
    good: 'Добро',
    goodRange: '4.001 – 7.000',
    goodNote: 'Чврста основа - простор за раст',
    needsWork: 'Неедс Ворк',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Прво се фокусирајте на основе',
    step2Title: 'Ваши подаци остају приватни',
    step2Body1:
      'Сви ваши одговори и историја резултата се чувају локално на вашем уређају помоћу шифроване СКЛите базе података. Ништа се не шаље ни на један сервер без ваше изричите дозволе.',
    step2Body2:
      'Опциона функција пеер-то-пеер дељења омогућава вам да видите анонимне збирне резултате других корисника. Делује само криптографски потписан резиме - никада ваше појединачне одговоре.',
    readyText: 'Спреман? Хајде да добијемо ваш основни резултат.',
    skipIntro: 'Прескочи увод',
    next: 'Следеће',
    getStarted: 'Започните'
  },
  sharing: {
    title: 'Анонимно дељење мреже',
    privacyFirst: '🔒 Приватност на првом месту',
    description:
      'Опционо, анонимно донесите своје резултате глобалној мрежи. Име, имејл, ИП адреса или ИД уређаја се никада не деле.',
    enabled: 'Дељење је омогућено — доприносите мрежи',
    disabled: 'Дељење је онемогућено (подразумевано)',
    activeBadge: '✓ Ваши анонимни резултати се деле са колегама',
    enableNote: 'Омогућите да видите свој проценат у поређењу са глобалном мрежом.'
  },
  category: {
    back: '‹ Назад',
    history: 'Историја',
    date: 'Датум',
    score: 'Резултат',
    loading: 'Учитавање...',
    notEnoughData: 'Нема довољно података',
    noData: 'Нису пронађени подаци за „@@ПХ_0@@“.',
    goToDashboard: 'Идите на контролну таблу'
  },
  chartActions: {
    viewFullscreen: 'Прикажи цео екран',
    exitFullscreen: 'Изађите преко целог екрана',
    copyChart: 'Копирај графикон',
    exportChart: 'Извези графикон',
    exportDefault: '⬇ Извоз',
    exportExcel: '📊 Извези Екцел',
    exportCsv: '📄 Извези ЦСВ',
    exportPdf: '📑 Извези ПДФ',
    exportHtml: '🌐 Извези ХТМЛ',
    copied: 'Графикон је копиран у међуспремник',
    copyFailed: 'Копирање није успело — међуспремник није доступан',
    saveCancelled: 'Чување је отказано'
  },
  resume: {
    continueLastSession: 'Желите ли да наставите са последње сесије?',
    welcomeBack: 'Добродошли назад!',
    historicalBody:
      'Ваши одговори са ваше последње завршене сесије су унапред учитани. Да ли бисте желели да задржите те вредности као полазну тачку или да почнете са потпуно празним упитником?',
    activeBody:
      'Имате сесију у току. Да ли желите да наставите тамо где сте стали или да започнете нову процену?',
    clearWarning: '⚠ Ово ће избрисати све тренутне одговоре. Јесте ли сигурни?',
    yesStartFresh: 'Да, почни изнова',
    cancel: 'Откажи',
    keepLastValues: 'Задржи последње вредности',
    resumeSession: 'Настави сесију',
    startFresh: 'Старт Фресх'
  },
  questionItem: {
    pointsSuffix: 'птс',
    low: 'Ниско',
    high: 'Високо',
    rateAria: 'Оцените @@ПХ_0@@'
  },
  dateRange: {
    rangeLabel: 'Опсег:',
    startDate: 'Датум почетка',
    endDate: 'Датум завршетка',
    presets: {
      '7d': '7 дана',
      '30d': '30 дана',
      '90d': '90 дана',
      '1y': '1 година',
      all: 'Алл Тиме',
      custom: 'Цустом'
    }
  },
  update: {
    availableTitle: 'в@@ПХ_0@@ је доступан!',
    releaseNotesFallback: 'Посетите страницу издања да бисте преузели најновију верзију.',
    getUpdate: 'Гет Упдате',
    dismiss: 'Одбаци'
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

export default sr;

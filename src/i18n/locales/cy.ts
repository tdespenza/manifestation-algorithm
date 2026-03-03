/**
 * Auto-converted locale module for cy.
 */
import type { Messages } from './en';

const cy: Messages = {
  nav: {
    questionnaire: 'Holiadur',
    history: 'Hanes',
    settings: 'Gosodiadau'
  },
  app: {
    name: 'Algorithm Amlygiad',
    unexpectedError: 'Digwyddodd gwall annisgwyl.'
  },
  home: {
    subtitle: "Graddiwch bob rhan o'ch bywyd - darganfyddwch eich sgôr aliniad"
  },
  dashboard: {
    title: 'Hanes Olrhain Algorithm Amlygiad',
    subtitle: 'Traciwch eich cynnydd dros amser',
    loading: "Wrthi'n llwytho eich hanes…",
    noData: 'Dim data ar gyfer y cyfnod hwn',
    progressTrend: 'Tuedd Cynnydd',
    progressToGoal: "Cynnydd i'r Nod",
    ofGoal: '{pct}% o gôl',
    goalReached: '🎯 Cyrhaeddwyd y gôl!',
    categoryBreakdown: 'Dadansoddiad Categori',
    noSessionsRange: 'Dim sesiynau yn yr ystod hon',
    tryWiderRange: 'Rhowch gynnig ar ystod ehangach neu dewiswch gyfnod gwahanol.',
    noSessionsYet: 'Dim sesiynau eto',
    completeFirst: "Cwblhewch eich asesiad cyntaf i weld eich cynnydd a'ch tueddiadau yma.",
    startFirst: 'Dechrau Asesiad Cyntaf',
    export: {
      date: 'Dyddiad',
      time: 'Amser',
      totalScore: 'Cyfanswm Sgôr',
      duration: 'Hyd (munud)',
      notes: 'Nodiadau'
    }
  },
  stats: {
    averageScore: 'Sgôr Cyfartalog',
    medianScore: 'Sgôr Canolrif',
    highestScore: 'Sgôr Uchaf',
    totalSessions: 'Cyfanswm y Sesiynau'
  },
  network: {
    rankings: 'Safle Rhwydwaith',
    searchingPeers: 'Chwilio am gyfoedion...',
    searching: "Wrthi'n chwilio...",
    online: 'Ar-lein',
    peers: '{count} cyfoedion',
    results: 'canlyniadau {count}',
    avgShort: 'Cyf',
    p90Short: 't90',
    averageScoreTitle: 'Sgôr Cyfartalog',
    percentile90Title: '90fed Canradd',
    globalAverage: 'Cyfartaledd Byd-eang',
    percentile90: '90fed Canradd',
    manifestations: 'Amlygiadau',
    activePeers: 'Arglwyddi Gweithgar',
    categoryRankings: 'Dosbarthiadau Categori'
  },
  focusAreas: {
    title: 'Meysydd Ffocws',
    subtitle: "Eich 3 chategori â'r sgôr isaf - gwella'r rhain sy'n gyrru'r enillion mwyaf.",
    empty: 'Cwblhau mwy o sesiynau i weld argymhellion maes ffocws personol.'
  },
  sessions: {
    recent: 'Sesiynau Diweddar',
    deselectAll: 'Dad-ddewis Pawb',
    selectAll: 'Dewiswch Pawb',
    deleteCount: 'Dileu {count}',
    cancel: 'Canslo',
    select: 'Dewiswch',
    deleting: "Wrthi'n dileu…"
  },
  settings: {
    title: 'Gosodiadau Ap',
    close: 'Cau gosodiadau',
    dataManagement: 'Rheoli Data',
    saveLastSession: 'Cadw Sesiwn Olaf',
    saveLastSessionDesc: "Atebion o'ch sesiwn orffenedig ddiweddaraf ymlaen llaw.",
    resetProgress: 'Ailosod Cynnydd',
    resetProgressDesc: "Dileu'r holl atebion sydd wedi'u cadw a dechrau o'r newydd.",
    goals: 'Nodau',
    targetScore: 'Sgôr Targed',
    targetScoreDesc: 'Gosodwch sgôr gôl (1,000-10,000) i olrhain eich cynnydd ar y dangosfwrdd.',
    set: 'Gosod',
    clearGoal: 'Clir',
    currentTarget: 'Targed presennol:',
    on: 'Ar',
    off: 'I ffwrdd',
    version: 'Algorithm Amlygiad {version}',
    clearAllAnswers: 'Clirio Pob Ateb',
    clearConfirmTitle: 'Clirio Pob Ateb',
    clearConfirmMessage:
      'Bydd hyn yn dileu eich holl atebion cyfredol yn barhaol ac ni ellir eu dadwneud.',
    clearConfirmLabel: 'Clir',
    keepAnswers: 'Cadw Atebion',
    language: 'Iaith',
    languageDesc: 'Dewiswch yr iaith arddangos ar gyfer y rhaglen.',
    languageCount: '{count} ieithoedd ar gael',
    goalErrorRange: 'Nodwch sgôr rhwng 1,000 a 10,000.'
  },
  questionnaire: {
    saving: "Wrthi'n cadw...",
    saved: 'Cadwedig',
    progressText: '{pct} % complete ({answered}/{total})',
    progressAria: 'Cynnydd cwblhau asesiadau',
    maxScore: 'Uchafswm: {score}',
    answerToScore: 'Ateb i sgôr',
    currentScore: 'Sgôr Presennol',
    scrollAll: 'Sgroliwch i Bawb',
    stepByStep: 'Cam wrth Gam',
    questionOf: 'Cwestiwn {current} o {total}',
    previous: '← Blaenorol',
    next: 'Nesaf →',
    completeAssessment: 'Asesiad Cwblhau',
    startFresh: "Eisiau dechrau o'r newydd?",
    resetAllAnswers: 'Ailosod pob ateb',
    resetTitle: 'Ailosod Pob Ateb?',
    resetMessage: "Bydd hyn yn clirio pob ateb ac yn dechrau o'r dechrau. Ni ellir dadwneud hyn.",
    resetLabel: 'Ailosod',
    scoreQuality: {
      notStarted: 'Heb Ddechrau',
      manifesting: 'Yn amlygu ❆',
      aligned: 'Alinio',
      building: 'Adeilad',
      startingOut: 'Dechrau Allan'
    },
    submitHint: {
      zero: "0 o gwestiynau {total} wedi'u hateb — cwestiynau heb eu hateb yn ddiofyn i'r lleiafswm",
      partial:
        "{remaining} cwestiwn yn weddill — cwestiynau heb eu hateb yn rhagosodedig i'r lleiafswm | {remaining} cwestiynau ar ôl — cwestiynau heb eu hateb yn ddiofyn i'r lleiafswm",
      complete: "Atebwyd pob cwestiwn - yn barod i'w gyflwyno!"
    },
    submitTitle: {
      zero: 'Atebwch rai cwestiynau i gwblhau eich asesiad',
      partial: '{remaining} cwestiwn yn weddill | {remaining} cwestiynau yn weddill',
      complete: "Cyflwyno'ch asesiad gorffenedig"
    },
    submitError: 'Wedi methu cadw sesiwn: {error}',
    dotTitle: 'Cwestiwn {index}',
    dotAria: 'Ewch i gwestiwn {index}',
    keyboardHint: 'Awgrym: Defnyddiwch ← → i lywio · 1–9 / 0 i raddio'
  },
  onboarding: {
    step0Title: "Croeso i'r Algorithm Amlygiad",
    step0Body1:
      "Mae'r offeryn hwn yn eich helpu i fesur pa mor gyson yw'ch meddylfryd, eich arferion a'ch gweithredoedd dyddiol â chyflawni'ch nodau. Atebwch bob cwestiwn yn onest i gael eich sgôr gyfredol.",
    step0Body2:
      'Cwblhewch yr holiadur yn rheolaidd i olrhain eich twf dros amser a gweld pa feysydd sydd angen y sylw mwyaf.',
    step1Title: "Sut Mae Sgorio'n Gweithio",
    step1Body:
      "Mae pob cwestiwn yn werth nifer penodol o bwyntiau. Graddiwch eich hun ar raddfa o 1–10 ar gyfer pob cwestiwn. Mae sgôr o 10 yn golygu eich bod yn ymgorffori'r egwyddor honno'n llawn; Mae 1 yn golygu nad ydych chi wedi dechrau.",
    step1TargetHint: '🎯 Targed: {target} | Uchafswm: {maximum}',
    excellent: 'Ardderchog',
    excellentRange: '7,001 – 10,000',
    excellentNote: 'Aliniad cryf - daliwch ati',
    good: 'Da',
    goodRange: '4,001 – 7,000',
    goodNote: 'Sylfaen solet - lle i dyfu',
    needsWork: 'Angen Gwaith',
    needsWorkRange: '0 – 4,000',
    needsWorkNote: 'Canolbwyntiwch ar hanfodion yn gyntaf',
    step2Title: "Mae'ch Data'n aros yn breifat",
    step2Body1:
      "Mae eich holl atebion a hanes sgôr yn cael eu storio'n lleol ar eich dyfais gan ddefnyddio cronfa ddata SQLite wedi'i hamgryptio. Nid oes dim yn cael ei anfon i unrhyw weinydd heb eich caniatâd penodol.",
    step2Body2:
      "Mae'r nodwedd rhannu cymar-i-gymar opsiynol yn gadael i chi weld sgoriau cyfanredol dienw gan ddefnyddwyr eraill. Dim ond crynodeb wedi'i lofnodi'n cryptograffaidd y mae'n ei rannu - byth eich atebion unigol.",
    readyText: 'Barod? Gadewch i ni gael eich sgôr sylfaenol.',
    skipIntro: 'Hepgor y cyflwyniad',
    next: 'Nesaf',
    getStarted: 'Cychwyn Arni'
  },
  sharing: {
    title: 'Rhannu Rhwydwaith Anhysbys',
    privacyFirst: '🔒 Preifatrwydd-Cyntaf',
    description:
      "Yn ddewisol, cyfrannwch eich canlyniadau yn ddienw i'r rhwydwaith byd-eang. Nid oes unrhyw enw, e-bost, cyfeiriad IP, nac ID dyfais byth yn cael ei rannu.",
    enabled: "Rhannu wedi'i alluogi — cyfrannu at y rhwydwaith",
    disabled: 'Analluogwyd rhannu (rhagosodedig)',
    activeBadge: '✓ Mae eich sgorau dienw yn cael eu rhannu gyda chyfoedion',
    enableNote: "Galluogi i weld eich safle canradd o gymharu â'r rhwydwaith byd-eang."
  },
  category: {
    back: '‹ Yn ôl',
    history: 'Hanes',
    date: 'Dyddiad',
    score: 'Sgôr',
    loading: "Wrthi'n llwytho...",
    notEnoughData: 'Dim digon o ddata',
    noData: 'Ni chanfuwyd unrhyw ddata ar gyfer “{category}”.',
    goToDashboard: "Ewch i'r Dangosfwrdd"
  },
  chartActions: {
    viewFullscreen: 'Gweld sgrin lawn',
    exitFullscreen: 'Gadael sgrin lawn',
    copyChart: 'Copïo Siart',
    exportChart: 'Siart allforio',
    exportDefault: '⬇ Allforio',
    exportExcel: '📊 Allforio Excel',
    exportCsv: '📄 Allforio CSV',
    exportPdf: '📑 Allforio PDF',
    exportHtml: '🌐 Allforio HTML',
    copied: "Siart wedi'i gopïo i'r clipfwrdd",
    copyFailed: "Methodd y copi - nid yw'r clipfwrdd ar gael",
    saveCancelled: "Cadw wedi'i ganslo"
  },
  resume: {
    continueLastSession: "Parhau o'r Sesiwn Olaf?",
    welcomeBack: 'Croeso Nôl!',
    historicalBody:
      "Mae eich atebion o'ch sesiwn orffenedig ddiwethaf wedi'u llwytho ymlaen llaw. Hoffech chi gadw'r gwerthoedd hynny fel man cychwyn, neu ddechrau gyda holiadur cwbl wag?",
    activeBody:
      'Mae gennych sesiwn ar y gweill. Hoffech chi ailddechrau lle gwnaethoch chi adael, neu ddechrau asesiad newydd?',
    clearWarning: "⚠️ Bydd hyn yn clirio'r holl atebion cyfredol. Ydych chi'n siŵr?",
    yesStartFresh: 'Ie, Start Fresh',
    cancel: 'Canslo',
    keepLastValues: 'Cadw Gwerthoedd Diwethaf',
    resumeSession: 'Sesiwn Ail-ddechrau',
    startFresh: 'Dechrau Ffres'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Isel',
    high: 'Uchel',
    rateAria: 'Cyfradd {question}'
  },
  dateRange: {
    rangeLabel: 'Amrediad:',
    startDate: 'Dyddiad cychwyn',
    endDate: 'Dyddiad gorffen',
    presets: {
      '7d': '7 Dydd',
      '30d': '30 Diwrnod',
      '90d': '90 Dydd',
      '1y': '1 Flwyddyn',
      all: 'Pob Amser',
      custom: 'Custom'
    }
  },
  update: {
    availableTitle: 'v{version} ar gael!',
    releaseNotesFallback: "Ewch i'r dudalen rhyddhau i lawrlwytho'r fersiwn diweddaraf.",
    getUpdate: 'Cael Diweddariad',
    dismiss: 'Diystyru'
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

export default cy;

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
    '1': "Meistroli'r Hanfodion",
    '2': 'Ysgogi a goleuo geiriau',
    '3': 'Darganfod Poen ac Ynni Contract',
    '4': 'Diffiniwch yr hyn yr ydych ei eisiau',
    '5': 'Ysgrifennwch beth rydych chi ei eisiau',
    '6': 'Peidiwch â rhannu eich breuddwyd gyda phobl eraill',
    '7': 'Cael awydd llosgi ar gyfer eich nod',
    '8': "Rhaid i'r gôl fod yn Sweet Spot",
    '9': 'Gwneud Penderfyniad',
    '10': "Gweld/Teimlo'n dda bod gennych chi'ch gôl",
    '11': "Rhyddhau atodiad i'r canlyniad",
    '12': 'Caniatáu i SUT gyflwyno ei hun',
    '13': 'Gwybod y gwahaniaeth rhwng Breuddwyd a Phrif Nod',
    '14': 'Byddwch yn Ffocws / Unigryw pwrpas',
    '15': "Rhestr o Flaenoriaethau Dyddiol I'W WNEUD",
    '16': 'Cynnydd Siart / Gwybod y Sgôr',
    '17': 'Defnyddiwch Cylch Llwyddiant Momentwm',
    '18': 'Dream Build - Llyfr Breuddwydion a Bwrdd Gweledigaeth',
    '19': "Plygiwch i mewn i'r System",
    '20': 'Cwrs Meistrolaeth Bersonol Gwyddoniaeth',
    '21': "Gwyliwch y geiriau rydych chi'n eu siarad - yr hyn rydych chi'n ei ddweud yw'r hyn a gewch",
    '22': 'Ffisioleg / Gwisg ar gyfer llwyddiant',
    '23': 'Bwriadau cownter clir',
    '24': 'Deffro eich Pŵer Mewnol: Prosesau Pŵer Uwch',
    '25': 'Darlledu ar Alpha-theta tonnau ymennydd',
    '26': 'Stopiwch Ddweud Eich Stori o Wae',
    '27': 'Dangos Gwerthfawrogiad / Diolchgarwch',
    '28': 'Disodli Arferion Methiant w/ Arferion Llwyddiant (Prosesau Cyflymydd)',
    '29': 'Creu Mastermind',
    '30': 'Gwyliwch Pobl Llwyddiannus/Prentis',
    '31': 'Gwrando ar/Darllen Straeon Llwyddiant',
    '32': 'Rhowch yr hyn rydych chi ei eisiau yn gyntaf',
    '33': 'Ei Wneud Nawr Meddwl',
    '34': 'Gofalwch am Eich Corff',
    '35': "Dod o hyd i'r Aur mewn Adfyd",
    '36': "Clirio Samskaras o'r Cae",
    '37': 'Cymerwch 100% Cyfrifoldeb',
    '38': 'Cynhyrchwyr Maes Denu',
    '39': "Ymunwch â Chlwb sy'n eich cysylltu â Ffynhonnell Pŵer",
    '40': 'Byw bywyd gyda bwriad bwriadol - byddwch yn yr amser presennol',
    '1a': "Ar bwy wyt ti'n gwrando?",
    '1b': 'Mynegai Addysgadwyedd',
    '1c': 'Graddfa Balans Hyfforddiant',
    '1d': 'Cymhwysedd anymwybodol',
    '19a': 'Darllen llyfrau',
    '19b': 'Gwrandewch ar Audios',
    '19c': 'Mynychu Digwyddiadau (misol)',
    '19d': 'Rhoi a derbyn Cydnabyddiaeth / Rheol Aur estynedig',
    '19e': "Datblygu perthynas gyda phobl o'r un anian",
    '23a': 'Prosesau Arian',
    '23b': 'Prosesau Perthynas',
    '23c': 'Prosesau Arweinyddiaeth',
    '23d': 'Prosesau Cyfathrebu',
    '23e': 'Prosesau Iechyd',
    '23f': 'Prosesau Ymwybyddiaeth Ysbrydol',
    '23g': 'Prosesau Breuddwydion',
    '23h': 'Trefniadaeth a Phrosesau Ffocws'
  }
};

export default cy;

/**
 * Auto-converted locale module for ceb.
 */
import type { Messages } from './en';

const ceb: Messages = {
  nav: {
    questionnaire: 'Pangutana',
    history: 'Kasaysayan',
    settings: 'Mga setting'
  },
  app: {
    name: 'Algorithm sa Pagpadayag',
    unexpectedError: 'Usa ka wala damha nga sayup ang nahitabo.'
  },
  home: {
    subtitle: 'I-rate ang matag bahin sa imong kinabuhi — pagdiskobre sa imong alignment score'
  },
  dashboard: {
    title: 'Kasaysayan sa Pagsubay sa Algoritma sa Pagpadayag',
    subtitle: 'Sunda ang imong pag-uswag sa paglabay sa panahon',
    loading: 'Nagkarga sa imong kasaysayan…',
    noData: 'Walay datos alang niini nga panahon',
    progressTrend: 'Trend sa Pag-uswag',
    progressToGoal: 'Pag-uswag sa Tumong',
    ofGoal: '{pct}% sa tumong',
    goalReached: '🎯 Naabot ang Tumong!',
    categoryBreakdown: 'Pagkabungkag sa Kategorya',
    noSessionsRange: 'Walay mga sesyon niini nga range',
    tryWiderRange: 'Sulayi ang mas lapad nga range o pagpili og lain nga panahon.',
    noSessionsYet: 'Wala pay session',
    completeFirst:
      'Kompletoha ang imong una nga pagsusi aron makita ang imong pag-uswag ug mga uso dinhi.',
    startFirst: 'Pagsugod sa Unang Pagsusi',
    export: {
      date: 'Petsa',
      time: 'Panahon',
      totalScore: 'Kinatibuk-ang Puntos',
      duration: 'Gidugayon (min)',
      notes: 'Mga nota'
    }
  },
  stats: {
    averageScore: 'Average nga Puntos',
    medianScore: 'Median nga Puntos',
    highestScore: 'Pinakataas nga Score',
    totalSessions: 'Kinatibuk-ang mga Sesyon'
  },
  network: {
    rankings: 'Mga Ranggo sa Network',
    searchingPeers: 'Nangita ug mga kaedad...',
    searching: 'Gipangita...',
    online: 'Online',
    peers: '{count} mga kaedad',
    results: '{count} resulta',
    avgShort: 'Avg',
    p90Short: 'P90',
    averageScoreTitle: 'Average nga Puntos',
    percentile90Title: 'Ika-90 nga Porsiyento',
    globalAverage: 'Global Average',
    percentile90: 'Ika-90 nga Porsiyento',
    manifestations: 'Mga pagpakita',
    activePeers: 'Aktibo nga mga Kaedad',
    categoryRankings: 'Mga Ranggo sa Kategorya'
  },
  focusAreas: {
    title: 'Focus nga mga Lugar',
    subtitle:
      'Ang imong 3 ka mga kategorya nga labing ubos nga marka - ang pagpaayo niini nagduso sa labing kadaghan nga kadaugan.',
    empty:
      'Kompletoha ang dugang nga mga sesyon aron makita ang personal nga mga rekomendasyon sa focus area.'
  },
  sessions: {
    recent: 'Bag-ong mga Sesyon',
    deselectAll: 'Deselect Tanan',
    selectAll: 'Pilia ang Tanan',
    deleteCount: 'Pagtangtang {count}',
    cancel: 'Pagkanselar',
    select: 'Pagpili',
    deleting: 'Gipapas…'
  },
  settings: {
    title: 'Mga Setting sa App',
    close: 'Isira ang mga setting',
    dataManagement: 'Pagdumala sa datos',
    saveLastSession: 'I-save ang Katapusang Sesyon',
    saveLastSessionDesc:
      'Pun-a daan ang mga tubag gikan sa imong pinakabag-o nga nahuman nga sesyon.',
    resetProgress: 'I-reset ang Pag-uswag',
    resetProgressDesc: 'I-delete ang tanang na-save nga tubag ug sugdi og bag-o.',
    goals: 'Mga tumong',
    targetScore: 'Target nga Puntos',
    targetScoreDesc:
      'Paghimo og score sa tumong (1,000–10,000) aron masubay ang imong pag-uswag sa dashboard.',
    set: 'Gitakda',
    clearGoal: 'Klaro',
    currentTarget: 'Target karon:',
    on: 'Sa',
    off: 'Off',
    version: 'Algorithm sa Pagpadayag {version}',
    clearAllAnswers: 'Klaroha ang Tanang Tubag',
    clearConfirmTitle: 'Klaroha ang Tanang Tubag',
    clearConfirmMessage:
      'Kini permanente nga mapapas ang tanan nimong mga tubag karon ug dili na mabawi.',
    clearConfirmLabel: 'Klaro',
    keepAnswers: 'Hupti ang mga Tubag',
    language: 'Pinulongan',
    languageDesc: 'Pilia ang display nga pinulongan alang sa aplikasyon.',
    languageCount: '{count} mga pinulongan anaa',
    goalErrorRange: 'Palihog pagsulod ug score tali sa 1,000 ug 10,000.'
  },
  questionnaire: {
    saving: 'Nagtipig...',
    saved: 'Naluwas',
    progressText: '{pct}% kompleto ({answered}/{total})',
    progressAria: 'Pag-uswag sa pagkompleto sa pagtasa',
    maxScore: 'Max: {score}',
    answerToScore: 'Tubag sa score',
    currentScore: 'Kasamtangang Score',
    scrollAll: 'I-scroll ang Tanan',
    stepByStep: 'Lakang sa Lakang',
    questionOf: 'Pangutana {current} sa {total}',
    previous: '← Kaniadto',
    next: 'Sunod →',
    completeAssessment: 'Kompleto nga Pagsusi',
    startFresh: 'Gusto nga magsugod sa bag-o?',
    resetAllAnswers: 'I-reset ang tanang tubag',
    resetTitle: 'I-reset ang Tanang Tubag?',
    resetMessage: 'Kini magwagtang sa matag tubag ug magsugod gikan sa wala. Kini dili na mabawi.',
    resetLabel: 'I-reset',
    scoreQuality: {
      notStarted: 'Wala Nagsugod',
      manifesting: 'Nagpakita ❆',
      aligned: 'Nahiangay',
      building: 'Pagtukod',
      startingOut: 'Pagsugod'
    },
    submitHint: {
      zero: '0 sa {total} mga pangutana nga natubag — wala matubag nga mga pangutana default sa minimum',
      partial:
        '{remaining} pangutana nga nahabilin — wala matubag nga mga pangutana default sa minimum | {remaining} mga pangutana nga nahabilin — wala matubag nga mga pangutana default sa minimum',
      complete: 'Gitubag ang tanan nga mga pangutana - andam nga isumite!'
    },
    submitTitle: {
      zero: 'Tubaga ang pipila ka mga pangutana aron makompleto ang imong assessment',
      partial: '{remaining} pangutana nga nahabilin | {remaining} mga pangutana nga nahabilin',
      complete: 'Isumite ang imong nahuman nga assessment'
    },
    submitError: 'Napakyas sa pagluwas sa sesyon: {error}',
    dotTitle: 'Pangutana {index}',
    dotAria: 'Adto sa pangutana {index}',
    keyboardHint: 'Tip: Gamita ang ← → sa pag-navigate · 1–9 / 0 sa pag-rate'
  },
  onboarding: {
    step0Title: 'Welcome sa Manifestation Algorithm',
    step0Body1:
      'Kini nga himan makatabang kanimo sa pagsukod kung unsa ka nahiuyon ang imong panghunahuna, pamatasan, ug adlaw-adlaw nga mga aksyon sa pagkab-ot sa imong mga katuyoan. Tubaga ang matag pangutana nga matinuoron aron makuha ang imong karon nga marka.',
    step0Body2:
      'Kompletoha ang questionnaire sa regular nga mga agwat aron masubay ang imong pag-uswag sa paglabay sa panahon ug tan-awa kung unsang mga lugar ang nanginahanglan og labing atensyon.',
    step1Title: 'Giunsa ang Pag-iskor',
    step1Body:
      'Ang matag pangutana nagkantidad ug gitakdang gidaghanon sa mga puntos. I-rate ang imong kaugalingon sa sukod nga 1–10 para sa matag pangutana. Ang usa ka rating nga 10 nagpasabut nga imong gilangkuban sa hingpit kana nga prinsipyo; Ang 1 nagpasabot nga wala ka pa magsugod.',
    step1TargetHint: '🎯 Target: {target} | Kinatas-an: {maximum}',
    excellent: 'Maayo kaayo',
    excellentRange: '7,001 – 10,000',
    excellentNote: 'Kusog nga pag-align — padayon',
    good: 'Maayo',
    goodRange: '4,001 – 7,000',
    goodNote: 'Lig-on nga pundasyon - lawak sa pagtubo',
    needsWork: 'Nagkinahanglan ug Trabaho',
    needsWorkRange: '0 – 4,000',
    needsWorkNote: 'Pag-focus una sa mga sukaranan',
    step2Title: 'Ang Imong Data Nagpabiling Pribado',
    step2Body1:
      'Ang tanan nimong mga tubag ug kasaysayan sa marka gitipigan sa lokal sa imong aparato gamit ang usa ka naka-encrypt nga database sa SQLite. Wala’y gipadala sa bisan unsang server nga wala ang imong klaro nga pagtugot.',
    step2Body2:
      'Ang opsyonal nga peer-to-peer nga bahin sa pagpaambit makapahimo kanimo nga makakita sa wala mailhi nga aggregate nga mga marka gikan sa ubang mga tiggamit. Nag-ambit lang kini sa usa ka summary nga gipirmahan sa cryptographically - dili ang imong indibidwal nga mga tubag.',
    readyText: 'Andam na? Atong kuhaon ang imong baseline score.',
    skipIntro: 'Laktawan ang intro',
    next: 'Sunod',
    getStarted: 'Pagsugod'
  },
  sharing: {
    title: 'Anonymous nga Pagpakigbahin sa Network',
    privacyFirst: '🔒 Privacy-Una',
    description:
      'Opsyonal nga itampo ang imong mga resulta nga dili mailhan sa tibuok kalibutan nga network. Walay ngalan, email, IP address, o device ID nga gipaambit.',
    enabled: 'Nahimo ang pagpaambit — pagtampo sa network',
    disabled: 'Gipugngan ang pagpaambit (default)',
    activeBadge: '✓ Ang imong wala mailhi nga mga marka gipaambit sa mga kaedad',
    enableNote: 'I-enable nga makita ang imong percentile nga ranggo kumpara sa global network.'
  },
  category: {
    back: '‹ Balik',
    history: 'Kasaysayan',
    date: 'Petsa',
    score: 'Puntos',
    loading: 'Nagkarga...',
    notEnoughData: 'Dili igo nga datos',
    noData: 'Walay datos nga nakit-an para sa “{category}”.',
    goToDashboard: 'Adto sa Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Tan-awa ang tibuok screen',
    exitFullscreen: 'Paggawas sa full screen',
    copyChart: 'Kopyaha ang Tsart',
    exportChart: 'Export nga tsart',
    exportDefault: '⬇ Export',
    exportExcel: '📊 I-export ang Excel',
    exportCsv: '📄 I-export ang CSV',
    exportPdf: '📑 I-export ang PDF',
    exportHtml: '🌐 I-export ang HTML',
    copied: 'Ang tsart gikopya sa clipboard',
    copyFailed: 'Napakyas ang pagkopya — dili magamit ang clipboard',
    saveCancelled: 'Gikansela ang pagluwas'
  },
  resume: {
    continueLastSession: 'Pagpadayon gikan sa Katapusang Sesyon?',
    welcomeBack: 'Maayong Pagbalik!',
    historicalBody:
      'Ang imong mga tubag gikan sa imong katapusan nga nahuman nga sesyon na-pre-loaded. Gusto ba nimong itago ang mga mithi ingon usa ka punto sa pagsugod, o magsugod sa usa ka hingpit nga blangko nga pangutana?',
    activeBody:
      'Adunay ka usa ka sesyon nga nagpadayon. Gusto ba nimong ipadayon kung diin ka mihunong, o magsugod usa ka bag-ong pagsusi?',
    clearWarning: '⚠️ Kini magwagtang sa tanang kasamtangang tubag. Sigurado ka?',
    yesStartFresh: 'Oo, Pagsugod sa Bag-o',
    cancel: 'Pagkanselar',
    keepLastValues: 'Hupti ang Katapusan nga mga Bili',
    resumeSession: 'Ipadayon ang Sesyon',
    startFresh: 'Pagsugod sa Bag-o'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Ubos',
    high: 'Taas',
    rateAria: 'Rate {question}'
  },
  dateRange: {
    rangeLabel: 'sakup:',
    startDate: 'Petsa sa pagsugod',
    endDate: 'Petsa sa pagtapos',
    presets: {
      '7d': '7 ka adlaw',
      '30d': '30 ka adlaw',
      '90d': '90 ka adlaw',
      '1y': '1 ka tuig',
      all: 'Tanan nga Panahon',
      custom: 'Custom'
    }
  },
  update: {
    availableTitle: 'v{version} anaa na!',
    releaseNotesFallback: 'Bisitaha ang release page aron ma-download ang pinakabag-o nga bersyon.',
    getUpdate: 'Pagkuha og Update',
    dismiss: 'Isalikway'
  },
  questions: {
    '1': 'Pag-master sa mga sukaranan',
    '2': 'Pag-aktibo ug Pagdan-ag sa mga Pulong',
    '3': 'Pangitag Sakit ug Enerhiya sa Kontrata',
    '4': 'Define unsay imong gusto',
    '5': 'Isulat ang imong gusto',
    '6': 'Ayaw isulti ang imong damgo sa uban',
    '7': 'Pagbaton og nagdilaab nga tinguha alang sa imong tumong',
    '8': 'Ang tumong kinahanglang anaa sa Sweet Spot',
    '9': 'Paghimo og Desisyon',
    '10': 'Tan-awa/Pagbati nga maayo sa pagpanag-iya sa imong tumong',
    '11': 'Ipagawas ang attachment sa resulta',
    '12': 'Tugoti ang UNSAON sa pagpresentar sa iyang kaugalingon',
    '13': 'Hibal-i ang kalainan tali sa Damgo ug Chief Aim',
    '14': 'Pag-focus / Pagkausa sa katuyoan',
    '15': 'Adlaw-adlaw nga BUHATON lista sa mga Priyoridad',
    '16': 'Pag-uswag sa Tsart / Hibal-i ang Iskor',
    '17': 'Gamita ang Momentum Cycle of Success',
    '18': 'Damgo Pagtukod - Damgo Libro & Panan-awon Board',
    '19': 'I-plug sa System',
    '20': 'Siyensiya sa Personal nga Mastery nga Kurso',
    '21': 'Tan-awa ang mga pulong nga imong gisulti - kung unsa ang imong gisulti mao ang imong makuha',
    '22': 'Physiology / Pagsinina alang sa kalampusan',
    '23': 'Tin-aw nga Kontra Intensiyon',
    '24': 'Pagmata sa imong Inner Power: Superpower nga Proseso',
    '25': 'Sibya sa Alpha-theta brainwave',
    '26': 'Hunonga ang Pagsulti sa Imong Istorya sa kaalaot',
    '27': 'Ipakita ang Apresasyon / Pagpasalamat',
    '28': 'Ilisan ang mga Kinaiya sa Pagkapakyas w/ Mga Kinaiya sa Kalampusan (Mga Proseso sa Accelerator)',
    '29': 'Paghimo og usa ka Mastermind',
    '30': 'Tan-awa ang Malampusong mga Tawo/Apprentice',
    '31': 'Paminaw / Basaha ang Mga Istorya sa Kalampusan',
    '32': 'Ihatag una ang imong gusto',
    '33': 'Buhata Kini Karon Mentality',
    '34': 'Ampingi ang Imong Lawas',
    '35': 'Pangitaa ang Bulawan sa Kalisod',
    '36': 'Tin-aw ang Samskaras gikan sa Field',
    '37': 'Dad-a ang 100% nga Responsibilidad',
    '38': 'Mga Generator sa Attractor Field',
    '39': 'Apil sa usa ka Club nga nagkonektar kanimo sa usa ka Gahum nga Tinubdan',
    '40': 'Pagkinabuhi nga adunay tinuyo nga katuyoan - naa sa karon nga panahon',
    '1a': 'Kinsa imong paminawon?',
    '1b': 'Index sa Pagkamatudloan',
    '1c': 'Balanse nga Scale sa Pagbansay',
    '1d': 'Walay panimuot nga katakus',
    '19a': 'Magbasa ug libro',
    '19b': 'Paminaw sa Audios',
    '19c': 'Pagtambong sa mga Hitabo (binulanan)',
    '19d': 'Paghatag ug pagdawat Pag-ila / gipalapdan nga Bulawanon nga Lagda',
    '19e': 'Pagpalambo og mga relasyon uban sa sama sa hunahuna nga mga tawo',
    '23a': 'Mga Proseso sa Salapi',
    '23b': 'Mga Proseso sa Relasyon',
    '23c': 'Mga Proseso sa Pagpangulo',
    '23d': 'Mga Proseso sa Komunikasyon',
    '23e': 'Mga Proseso sa Panglawas',
    '23f': 'Mga Proseso sa Espirituhanong Kaamgohan',
    '23g': 'Mga Proseso sa Damgo',
    '23h': 'Organisasyon ug Mga Proseso sa Pagtutok'
  }
};

export default ceb;

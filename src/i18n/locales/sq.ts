/**
 * Auto-converted locale module for sq.
 */
import type { Messages } from './en';

const sq: Messages = {
  nav: {
    questionnaire: 'Pyetësor',
    history: 'Historia',
    settings: 'Cilësimet'
  },
  app: {
    name: 'Algoritmi i Manifestimit',
    unexpectedError: 'Ndodhi një gabim i papritur.'
  },
  home: {
    subtitle: 'Vlerësoni çdo fushë të jetës tuaj - zbuloni rezultatin tuaj të shtrirjes'
  },
  dashboard: {
    title: 'Historia e përcjelljes së algoritmit të manifestimit',
    subtitle: 'Ndiqni përparimin tuaj me kalimin e kohës',
    loading: 'Po ngarkon historikun tënd…',
    noData: 'Nuk ka të dhëna për këtë periudhë',
    progressTrend: 'Trendi i progresit',
    progressToGoal: 'Përparim drejt qëllimit',
    ofGoal: '{pct}% e golit',
    goalReached: '🎯 Qëllimi u arrit!',
    categoryBreakdown: 'Ndarja e kategorisë',
    noSessionsRange: 'Nuk ka sesione në këtë gamë',
    tryWiderRange: 'Provoni një gamë më të gjerë ose zgjidhni një periudhë tjetër.',
    noSessionsYet: 'Nuk ka ende seanca',
    completeFirst:
      'Plotësoni vlerësimin tuaj të parë për të parë përparimin dhe tendencat tuaja këtu.',
    startFirst: 'Filloni vlerësimin e parë',
    export: {
      date: 'Data',
      time: 'Koha',
      totalScore: 'Rezultati total',
      duration: 'Kohëzgjatja (min)',
      notes: 'Shënime'
    }
  },
  stats: {
    averageScore: 'Nota mesatare',
    medianScore: 'Rezultati mesatar',
    highestScore: 'Rezultati më i lartë',
    totalSessions: 'Totali i seancave'
  },
  network: {
    rankings: 'Renditja e rrjetit',
    searchingPeers: 'Në kërkim të bashkëmoshatarëve...',
    searching: 'Po kërkon...',
    online: 'Online',
    peers: '{count} bashkëmoshatarët',
    results: 'Rezultatet {count}',
    avgShort: 'Mesatar',
    p90Short: 'P90',
    averageScoreTitle: 'Nota mesatare',
    percentile90Title: 'Përqindja e 90-të',
    globalAverage: 'Mesatarja globale',
    percentile90: 'Përqindja e 90-të',
    manifestations: 'Manifestimet',
    activePeers: 'Bashkëmoshatarët aktivë',
    categoryRankings: 'Renditjet e kategorive'
  },
  focusAreas: {
    title: 'Zonat e fokusit',
    subtitle:
      '3 kategoritë tuaja me pikët më të ulëta — përmirësimi i këtyre sjell fitimet më të mëdha.',
    empty:
      'Përfundoni më shumë seanca për të parë rekomandimet e personalizuara të zonës së fokusit.'
  },
  sessions: {
    recent: 'Sesionet e fundit',
    deselectAll: 'Çzgjidh të gjitha',
    selectAll: 'Zgjidhni Të gjitha',
    deleteCount: 'Fshi {count}',
    cancel: 'Anulo',
    select: 'Zgjidhni',
    deleting: 'Po fshihet…'
  },
  settings: {
    title: 'Cilësimet e aplikacionit',
    close: 'Mbyll cilësimet',
    dataManagement: 'Menaxhimi i të Dhënave',
    saveLastSession: 'Ruaj seancën e fundit',
    saveLastSessionDesc:
      'Plotësoni paraprakisht përgjigjet nga sesioni juaj më i fundit i përfunduar.',
    resetProgress: 'Rivendos progresin',
    resetProgressDesc: 'Fshini të gjitha përgjigjet e ruajtura dhe filloni të reja.',
    goals: 'Golat',
    targetScore: 'Rezultati i synuar',
    targetScoreDesc:
      'Vendosni një rezultat gol (1,000–10,000) për të gjurmuar përparimin tuaj në panelin e kontrollit.',
    set: 'Set',
    clearGoal: 'E qartë',
    currentTarget: 'Objektivi aktual:',
    on: 'Aktiv',
    off: 'Joaktiv',
    version: 'Algoritmi i Manifestimit {version}',
    clearAllAnswers: 'Pastro të gjitha përgjigjet',
    clearConfirmTitle: 'Pastro të gjitha përgjigjet',
    clearConfirmMessage:
      'Kjo do të fshijë përgjithmonë të gjitha përgjigjet tuaja aktuale dhe nuk mund të zhbëhet.',
    clearConfirmLabel: 'E qartë',
    keepAnswers: 'Mbani përgjigjet',
    language: 'Gjuha',
    languageDesc: 'Zgjidhni gjuhën e shfaqjes për aplikacionin.',
    languageCount: 'Gjuhët {count} të disponueshme',
    goalErrorRange: 'Ju lutemi, vendosni një pikë midis 1000 dhe 10000.'
  },
  questionnaire: {
    saving: 'Po ruan...',
    saved: 'U ruajt',
    progressText: '{pct}% i përfunduar ({answered}/{total})',
    progressAria: 'Ecuria e përfundimit të vlerësimit',
    maxScore: 'Maksimumi: {score}',
    answerToScore: 'Përgjigja për të shënuar',
    currentScore: 'Rezultati aktual',
    scrollAll: 'Lëvizni të gjitha',
    stepByStep: 'Hap pas Hapi',
    questionOf: 'Pyetje {current} nga {total}',
    previous: '← E mëparshme',
    next: 'Tjetra →',
    completeAssessment: 'Vlerësimi i plotë',
    startFresh: 'Dëshironi të filloni të freskët?',
    resetAllAnswers: 'Rivendos të gjitha përgjigjet',
    resetTitle: 'Të rivendosen të gjitha përgjigjet?',
    resetMessage:
      'Kjo do të pastrojë çdo përgjigje dhe do të fillojë nga e para. Kjo nuk mund të zhbëhet.',
    resetLabel: 'Rivendos',
    scoreQuality: {
      notStarted: 'Nuk ka filluar',
      manifesting: 'Duke manifestuar ❆',
      aligned: 'Rreshtuar',
      building: 'Ndërtesa',
      startingOut: 'Duke filluar nga'
    },
    submitHint: {
      zero: 'U përgjigjën 0 nga {total} pyetjet — pyetjet pa përgjigje të paracaktuara në minimum',
      partial:
        'Pyetja {remaining} e mbetur — pyetjet pa përgjigje të paracaktuara në minimum | {remaining} pyetje të mbetura — pyetjet pa përgjigje të paracaktuara në minimum',
      complete: "Të gjitha pyetjet janë përgjigjur - gati për t'u paraqitur!"
    },
    submitTitle: {
      zero: 'Përgjigjuni disa pyetjeve për të përfunduar vlerësimin tuaj',
      partial: '{remaining} pyetje e mbetur | {remaining} pyetjet e mbetura',
      complete: 'Paraqisni vlerësimin tuaj të përfunduar'
    },
    submitError: 'Ruajtja e seancës dështoi: {error}',
    dotTitle: 'Pyetje {index}',
    dotAria: 'Shko te pyetja {index}',
    keyboardHint: 'Këshillë: Përdorni ← → për të lundruar · 1–9 / 0 për të vlerësuar'
  },
  onboarding: {
    step0Title: 'Mirë se vini në Algoritmin e Manifestimit',
    step0Body1:
      'Ky mjet ju ndihmon të matni se sa të harmonizuara janë mendësia, zakonet dhe veprimet tuaja të përditshme me arritjen e qëllimeve tuaja. Përgjigjuni çdo pyetjeje me ndershmëri për të marrë rezultatin tuaj aktual.',
    step0Body2:
      'Plotësoni pyetësorin në intervale të rregullta për të ndjekur rritjen tuaj me kalimin e kohës dhe për të parë se cilat fusha kanë nevojë për më shumë vëmendje.',
    step1Title: 'Si funksionon shënimi',
    step1Body:
      'Çdo pyetje vlen një numër pikësh. Vlerësoni veten në një shkallë nga 1-10 për çdo pyetje. Një vlerësim prej 10 do të thotë që ju e mishëroni plotësisht atë parim; 1 do të thotë se nuk keni filluar.',
    step1TargetHint: '🎯 Objektivi: {target} | Maksimumi: {maximum}',
    excellent: 'E shkëlqyeshme',
    excellentRange: '7001 – 10000',
    excellentNote: 'Rreshtimi i fortë - vazhdoni',
    good: 'Mirë',
    goodRange: '4001 – 7000',
    goodNote: "Baza e fortë - hapësirë për t'u rritur",
    needsWork: 'Nevojë për Punë',
    needsWorkRange: '0 – 4000',
    needsWorkNote: 'Përqendrohuni së pari në bazat',
    step2Title: 'Të dhënat tuaja mbeten private',
    step2Body1:
      'Të gjitha përgjigjet tuaja dhe historia e rezultateve ruhen në nivel lokal në pajisjen tuaj duke përdorur një bazë të dhënash të koduar SQLite. Asgjë nuk dërgohet në asnjë server pa lejen tuaj të qartë.',
    step2Body2:
      'Funksioni opsional i ndarjes nga kolegë në kolegë ju lejon të shihni rezultate të përgjithshme anonime nga përdoruesit e tjerë. Ai ndan vetëm një përmbledhje të nënshkruar kriptografikisht - kurrë nuk përgjigjet tuaja individuale.',
    readyText: 'Gati? Le të marrim rezultatin tuaj bazë.',
    skipIntro: 'Kalo hyrjen',
    next: 'Tjetra',
    getStarted: 'Filloni'
  },
  sharing: {
    title: 'Ndarja anonime e rrjetit',
    privacyFirst: '🔒 Privatësia-Së pari',
    description:
      'Kontribuoni opsionalisht rezultatet tuaja në mënyrë anonime në rrjetin global. Asnjë emër, email, adresë IP ose ID pajisjeje nuk ndahet kurrë.',
    enabled: 'Ndarja është aktivizuar — duke kontribuar në rrjet',
    disabled: 'Ndarja është çaktivizuar (e parazgjedhur)',
    activeBadge: '✓ Rezultatet tuaja anonime po ndahen me kolegët',
    enableNote: 'Aktivizo për të parë renditjen tënde të përqindjes në krahasim me rrjetin global.'
  },
  category: {
    back: '‹ Kthehu',
    history: 'Historia',
    date: 'Data',
    score: 'Rezultati',
    loading: 'Po ngarkohet...',
    notEnoughData: 'Jo të dhëna të mjaftueshme',
    noData: 'Nuk u gjetën të dhëna për "{category}".',
    goToDashboard: 'Shkoni te Paneli'
  },
  chartActions: {
    viewFullscreen: 'Shikoni ekranin e plotë',
    exitFullscreen: 'Dilni nga ekrani i plotë',
    copyChart: 'Kopjo grafikun',
    exportChart: 'Grafiku i eksportit',
    exportDefault: '⬇ Eksporto',
    exportExcel: '📊 Eksporto Excel',
    exportCsv: '📄 Eksporto CSV',
    exportPdf: '📑 Eksporto PDF',
    exportHtml: '🌐 Eksporto HTML',
    copied: 'Grafiku u kopjua në kujtesën e fragmenteve',
    copyFailed: 'Kopjimi dështoi — kujtesa e fragmenteve nuk disponohet',
    saveCancelled: 'Ruajtja u anulua'
  },
  resume: {
    continueLastSession: 'Të vazhdohet nga Sesioni i fundit?',
    welcomeBack: 'Mirë se vini përsëri!',
    historicalBody:
      "Përgjigjet tuaja nga sesioni juaj i fundit i përfunduar janë ngarkuar paraprakisht. Dëshironi t'i mbani ato vlera si pikënisje, apo të filloni me një pyetësor krejtësisht bosh?",
    activeBody:
      'Ju keni një seancë në vazhdim. Dëshironi të rifilloni aty ku e latë, apo të filloni një vlerësim të ri?',
    clearWarning: '⚠️ Kjo do të pastrojë të gjitha përgjigjet aktuale. je i sigurt?',
    yesStartFresh: 'Po, Fillo Fresh',
    cancel: 'Anulo',
    keepLastValues: 'Mbani vlerat e fundit',
    resumeSession: 'Rifillimi i sesionit',
    startFresh: 'Fillo Fresh'
  },
  questionItem: {
    pointsSuffix: 'pikë',
    low: 'E ulët',
    high: 'Lartë',
    rateAria: 'Vlerësoni {question}'
  },
  dateRange: {
    rangeLabel: 'Gama:',
    startDate: 'Data e fillimit',
    endDate: 'Data e përfundimit',
    presets: {
      '7d': '7 ditë',
      '30d': '30 ditë',
      '90d': '90 ditë',
      '1y': '1 vit',
      all: 'Gjithë Kohën',
      custom: 'Me porosi'
    }
  },
  update: {
    availableTitle: 'v{version} është në dispozicion!',
    releaseNotesFallback: 'Vizitoni faqen e lëshimit për të shkarkuar versionin më të fundit.',
    getUpdate: 'Merr Përditësimin',
    dismiss: 'Largoje'
  },
  questions: {
    '1': 'Zotëroni bazat',
    '2': 'Aktivizoni dhe ndriçoni fjalët',
    '3': 'Gjeni energjinë e dhimbjes dhe kontratës',
    '4': 'Përcaktoni atë që dëshironi',
    '5': 'Shkruani atë që dëshironi',
    '6': 'Mos e ndajnë ëndrrën tënde me të tjerët',
    '7': 'Merrni një dëshirë të zjarrtë për qëllimin tuaj',
    '8': 'Goli duhet të jetë në pikën e ëmbël',
    '9': 'Merrni një vendim',
    '10': 'Shihni/Ndjehuni mirë në zotërimin e qëllimit tuaj',
    '11': 'Lëshoni bashkëngjitjen me rezultatin',
    '12': 'Lejoni SI të paraqitet',
    '13': 'Njihni ndryshimin midis Dream & Chief Aim',
    '14': 'Jini të fokusuar / Singleness i qëllimit',
    '15': 'Lista ditore e prioriteteve TO DO',
    '16': 'Grafiku Progresi / Njihni rezultatin',
    '17': 'Përdorni ciklin e vrullit të suksesit',
    '18': 'Ndërtimi i ëndrrave - Libri i ëndrrave dhe bordi i vizionit',
    '19': 'Lidheni në sistem',
    '20': 'Kursi i Shkencës së Mjeshtërisë Personale',
    '21': 'Shikoni fjalët që thoni - ajo që thoni është ajo që merrni',
    '22': 'Fiziologjia / Vishuni për sukses',
    '23': 'Qëllime të qarta të kundërta',
    '24': 'Zgjoni fuqinë tuaj të brendshme: Proceset e superfuqive',
    '25': 'Transmetohet në valën e trurit Alpha-theta',
    '26': 'Ndaloni së treguari historinë tuaj të mjerimit',
    '27': 'Tregoni vlerësim / mirënjohje',
    '28': 'Zëvendësoni zakonet e dështimit me zakonet e suksesit (proceset e përshpejtimit)',
    '29': 'Krijoni një mendje',
    '30': 'Shikoni njerëz/praktikant të suksesshëm',
    '31': 'Dëgjoni/lexoni histori suksesi',
    '32': 'Jepni atë që dëshironi së pari',
    '33': 'Bëje tani mentaliteti',
    '34': 'Kujdesuni për trupin tuaj',
    '35': 'Gjeni arin në fatkeqësi',
    '36': 'Pastroni Samskaras nga fusha',
    '37': 'Merrni përgjegjësi 100%',
    '38': 'Gjeneratorët e fushës tërheqëse',
    '39': 'Bashkohuni me një klub që ju lidh me një burim energjie',
    '40': 'Jetoni jetën me qëllim të qëllimshëm - jini në kohën e tanishme',
    '1a': 'Kë dëgjoni?',
    '1b': 'Indeksi i mësimdhënies',
    '1c': 'Shkalla e ekuilibrit të trajnimit',
    '1d': 'Kompetenca e pavetëdijshme',
    '19a': 'Lexoni libra',
    '19b': 'Dëgjoni audio',
    '19c': 'Merrni pjesë në ngjarje (mujore)',
    '19d': 'Jep dhe merr njohje / zgjeroni rregullin e artë',
    '19e': 'Zhvilloni marrëdhënie me njerëz me të njëjtin mendim',
    '23a': 'Proceset e parave',
    '23b': 'Proceset e marrëdhënieve',
    '23c': 'Proceset e lidershipit',
    '23d': 'Proceset e komunikimit',
    '23e': 'Proceset shëndetësore',
    '23f': 'Proceset e ndërgjegjësimit shpirtëror',
    '23g': 'Proceset e ëndrrave',
    '23h': 'Proceset e organizimit dhe fokusit'
  }
};

export default sq;

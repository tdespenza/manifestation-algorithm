/**
 * Auto-converted locale module for eu.
 */
import type { Messages } from './en';

const eu: Messages = {
  nav: {
    questionnaire: 'Galdetegia',
    history: 'Historia',
    settings: 'Ezarpenak'
  },
  app: {
    name: 'Manifestazio Algoritmoa',
    unexpectedError: 'Ustekabeko errore bat gertatu da.'
  },
  home: {
    subtitle: 'Baloratu zure bizitzako arlo bakoitza — ezagutu zure lerrokatze puntuazioa'
  },
  dashboard: {
    title: 'Manifestazio-algoritmoaren jarraipenaren historia',
    subtitle: 'Jarraitu zure aurrerapena denboran zehar',
    loading: 'Zure historia kargatzen…',
    noData: 'Ez dago epe honetarako daturik',
    progressTrend: 'Aurrerapen joera',
    progressToGoal: 'Helbururako aurrerapena',
    ofGoal: '{pct} helburuaren %',
    goalReached: '🎯 Helburua lortuta!',
    categoryBreakdown: 'Kategorien banaketa',
    noSessionsRange: 'Ez dago saiorik tarte honetan',
    tryWiderRange: 'Probatu sorta zabalago bat edo hautatu beste aldi bat.',
    noSessionsYet: 'Oraindik ez dago saiorik',
    completeFirst: 'Osatu zure lehen ebaluazioa hemen zure aurrerapenak eta joerak ikusteko.',
    startFirst: 'Hasi Lehen Ebaluazioa',
    export: {
      date: 'Data',
      time: 'Denbora',
      totalScore: 'Puntuazio osoa',
      duration: 'Iraupena (min)',
      notes: 'Oharrak'
    }
  },
  stats: {
    averageScore: 'Batez besteko puntuazioa',
    medianScore: 'Puntuazio mediana',
    highestScore: 'Puntuazio altuena',
    totalSessions: 'Saioak guztira'
  },
  network: {
    rankings: 'Sare Sailkapenak',
    searchingPeers: 'Ikaskideen bila...',
    searching: 'Bilatzen...',
    online: 'Sarean',
    peers: '{count} parekoak',
    results: '{count} emaitzak',
    avgShort: 'Batez',
    p90Short: 'P90',
    averageScoreTitle: 'Batez besteko puntuazioa',
    percentile90Title: '90. pertzentila',
    globalAverage: 'Batez besteko globala',
    percentile90: '90. pertzentila',
    manifestations: 'Manifestazioak',
    activePeers: 'Ikaskide Aktiboak',
    categoryRankings: 'Kategoria Sailkapenak'
  },
  focusAreas: {
    title: 'Foku-eremuak',
    subtitle:
      'Puntuazio baxueneko zure 3 kategoriak — hauek hobetzeak irabazi handienak lortzen ditu.',
    empty: 'Osatu saio gehiago foku-eremu pertsonalizatuen gomendioak ikusteko.'
  },
  sessions: {
    recent: 'Azken saioak',
    deselectAll: 'Deshautatu Guztiak',
    selectAll: 'Hautatu Guztiak',
    deleteCount: 'Ezabatu {count}',
    cancel: 'Utzi',
    select: 'Hautatu',
    deleting: 'Ezabatzen…'
  },
  settings: {
    title: 'Aplikazioaren ezarpenak',
    close: 'Itxi ezarpenak',
    dataManagement: 'Datuen kudeaketa',
    saveLastSession: 'Gorde azken saioa',
    saveLastSessionDesc: 'Bete aldez aurretik egindako azken saioko erantzunak.',
    resetProgress: 'Berrezarri Aurrerapena',
    resetProgressDesc: 'Ezabatu gordetako erantzun guztiak eta hasi berria.',
    goals: 'Helburuak',
    targetScore: 'Helburuko puntuazioa',
    targetScoreDesc:
      'Ezarri gol puntuazio bat (1.000-10.000) zure aurrerapena kontrolatzeko panelean.',
    set: 'Ezarri',
    clearGoal: 'Garbi',
    currentTarget: 'Egungo helburua:',
    on: 'On',
    off: 'Desaktibatuta',
    version: 'Manifestazio algoritmoa {version}',
    clearAllAnswers: 'Garbitu erantzun guztiak',
    clearConfirmTitle: 'Garbitu erantzun guztiak',
    clearConfirmMessage:
      'Honek betiko ezabatuko ditu zure uneko erantzun guztiak eta ezin izango dira desegin.',
    clearConfirmLabel: 'Garbi',
    keepAnswers: 'Mantendu erantzunak',
    language: 'Hizkuntza',
    languageDesc: 'Aukeratu aplikazioaren bistaratzeko hizkuntza.',
    languageCount: '{count} hizkuntzak erabilgarri',
    goalErrorRange: 'Mesedez, idatzi 1.000 eta 10.000 arteko puntuazioa.'
  },
  questionnaire: {
    saving: 'Gordetzen...',
    saved: 'Gordetuta',
    progressText: '{pct}% osatuta ({answered}/{total})',
    progressAria: 'Ebaluazioa osatzeko aurrerapena',
    maxScore: 'Gehienez: {score}',
    answerToScore: 'Erantzuna puntuatzeko',
    currentScore: 'Uneko puntuazioa',
    scrollAll: 'Korritu Guztiak',
    stepByStep: 'Urratsez Urrats',
    questionOf: '{total}-ren {current} galdera',
    previous: '← Aurrekoa',
    next: 'Hurrengoa →',
    completeAssessment: 'Ebaluazio osoa',
    startFresh: 'Berriz hasi nahi?',
    resetAllAnswers: 'Berrezarri erantzun guztiak',
    resetTitle: 'Erantzun guztiak berrezarri?',
    resetMessage:
      'Honek erantzun guztiak garbituko ditu eta hutsetik hasiko da. Hau ezin da desegin.',
    resetLabel: 'Berrezarri',
    scoreQuality: {
      notStarted: 'Hasi gabe',
      manifesting: 'Manifestatzen ❆',
      aligned: 'Lerrokatuta',
      building: 'Eraikina',
      startingOut: 'Hasten'
    },
    submitHint: {
      zero: '{total} galderetatik 0 erantzun dira; erantzunik gabeko galderak gutxieneko gisa',
      partial:
        '{remaining} galdera geratzen da — erantzun gabeko galderak gutxieneko | {remaining} galderak geratzen dira — erantzunik gabeko galderak gutxieneko gisa lehenetsita daude',
      complete: 'Galdera guztiak erantzun dira, bidaltzeko prest!'
    },
    submitTitle: {
      zero: 'Erantzun galdera batzuk zure ebaluazioa osatzeko',
      partial: '{remaining} galdera geratzen da | {remaining} galderak geratzen dira',
      complete: 'Bidali amaitutako ebaluazioa'
    },
    submitError: 'Ezin izan da gorde saioa: {error}',
    dotTitle: '{index} galdera',
    dotAria: 'Joan {index} galderara',
    keyboardHint: 'Aholkua: Erabili ← → nabigatzeko · 1–9 / 0 baloratzeko'
  },
  onboarding: {
    step0Title: 'Ongi etorri Manifestazio Algoritmora',
    step0Body1:
      'Tresna honek zure pentsamoldea, ohiturak eta eguneroko ekintzak zure helburuak lortzearekin zenbaterainoko lerrokatuta dauden neurtzen laguntzen dizu. Erantzun galdera bakoitza zintzotasunez zure uneko puntuazioa lortzeko.',
    step0Body2:
      'Bete galdetegia aldian-aldian zure hazkundea denboran zehar jarraitzeko eta arreta gehien behar duten eremuak ikusteko.',
    step1Title: 'Puntuazioa nola funtzionatzen duen',
    step1Body:
      'Galdera bakoitzak puntu kopuru jakin bat balio du. Baloratu zure burua 1-10eko eskalan galdera bakoitzeko. 10eko balorazio batek printzipio hori guztiz gorpuzten duzula esan nahi du; 1ek esan nahi du ez zarela hasi.',
    step1TargetHint: '🎯 Helburua: {target} | Gehienez: {maximum}',
    excellent: 'Bikaina',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Lerrokatze sendoa - jarraitu aurrera',
    good: 'Ona',
    goodRange: '4.001 – 7.000',
    goodNote: 'Oinarri sendoa - hazteko lekua',
    needsWork: 'Lana behar du',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Lehenik eta behin oinarrietan zentratu',
    step2Title: 'Zure datuak pribatuak dira',
    step2Body1:
      'Zure erantzun guztiak eta puntuazioaren historia lokalean gordetzen dira zure gailuan SQLite datu-base enkriptatutako bat erabiliz. Ez da ezer bidaliko edozein zerbitzarira zure baimen esplizitua gabe.',
    step2Body2:
      'Peer-to-peer partekatzeko aukerako eginbideari esker, beste erabiltzaile batzuen puntuazio orokor anonimoak ikusteko aukera dago. Kriptografiako sinatutako laburpen bat bakarrik partekatzen du, inoiz ez zure erantzun indibidualak.',
    readyText: 'Prest? Lor dezagun zure oinarrizko puntuazioa.',
    skipIntro: 'Saltatu sarrera',
    next: 'Hurrengoa',
    getStarted: 'Hasi'
  },
  sharing: {
    title: 'Sare partekatzea anonimoa',
    privacyFirst: '🔒 Pribatutasuna-lehenik',
    description:
      'Aukeran, eman zure emaitzak anonimoki sare globalari. Ez da inoiz partekatzen izenik, posta elektronikorik, IP helbiderik edo gailuaren IDrik.',
    enabled: 'Partekatzea gaituta — sarean laguntzea',
    disabled: 'Partekatzea desgaituta (lehenetsia)',
    activeBadge: '✓ Zure puntuazio anonimoak kideekin partekatzen ari dira',
    enableNote: 'Gaitu zure pertzentilaren sailkapena ikusteko sare globalarekin alderatuta.'
  },
  category: {
    back: '‹ Itzuli',
    history: 'Historia',
    date: 'Data',
    score: 'Puntuazioa',
    loading: 'Kargatzen...',
    notEnoughData: 'Datu nahikorik ez',
    noData: 'Ez da aurkitu "{category}"-rentzat daturik.',
    goToDashboard: 'Joan Arbelera'
  },
  chartActions: {
    viewFullscreen: 'Ikusi pantaila osoa',
    exitFullscreen: 'Irten pantaila osotik',
    copyChart: 'Kopiatu taula',
    exportChart: 'Esportatu taula',
    exportDefault: '⬇ Esportatu',
    exportExcel: '📊 Esportatu Excel',
    exportCsv: '📄 Esportatu CSV',
    exportPdf: '📑 Esportatu PDFa',
    exportHtml: '🌐 Esportatu HTML',
    copied: 'Diagrama arbelean kopiatu da',
    copyFailed: 'Ezin izan da kopiatu — arbela ez dago erabilgarri',
    saveCancelled: 'Gorde bertan behera utzi da'
  },
  resume: {
    continueLastSession: 'Azken saiotik jarraitu nahi duzu?',
    welcomeBack: 'Ongi etorri berriro!',
    historicalBody:
      'Amaitutako azken saioko zure erantzunak aurrez kargatu dira. Balio horiek abiapuntu gisa mantendu nahi al dituzu, edo guztiz hutsik dagoen galdetegi batekin hasi?',
    activeBody:
      'Saio bat abian duzu. Gustatuko litzaizuke utzitako lekutik ekin edo balorazio berri bat hasi?',
    clearWarning: '⚠️ Honek oraingo erantzun guztiak garbituko ditu. Ziur al zaude?',
    yesStartFresh: 'Bai, Hasi Berriz',
    cancel: 'Utzi',
    keepLastValues: 'Mantendu azken balioak',
    resumeSession: 'Hasi saioa',
    startFresh: 'Hasi Berria'
  },
  questionItem: {
    pointsSuffix: 'puntuak',
    low: 'Baxua',
    high: 'Alta',
    rateAria: 'Baloratu {question}'
  },
  dateRange: {
    rangeLabel: 'Tartea:',
    startDate: 'Hasiera data',
    endDate: 'Amaiera data',
    presets: {
      '7d': '7 Egun',
      '30d': '30 Egun',
      '90d': '90 Egun',
      '1y': '1 Urte',
      all: 'Denbora guztian',
      custom: 'Pertsonalizatua'
    }
  },
  update: {
    availableTitle: 'v{version} eskuragarri dago!',
    releaseNotesFallback: 'Bisitatu bertsioaren orria azken bertsioa deskargatzeko.',
    getUpdate: 'Eskuratu eguneratzea',
    dismiss: 'Baztertu'
  },
  questions: {
    '1': 'Oinarrizkoak menperatu',
    '2': 'Aktibatu & Argiztatu Hitzak',
    '3': 'Bilatu Pain & Contract Energy',
    '4': 'Definitu nahi duzuna',
    '5': 'Idatzi nahi duzuna',
    '6': 'Ez partekatu zure ametsik besteekin',
    '7': 'Lortu zure helbururako desio sutsua',
    '8': 'Golak Sweet Spot-en egon behar du',
    '9': 'Erabaki bat hartu',
    '10': 'Ikusi/Sentitu ondo zure helburuaren jabe',
    '11': 'Askatu emaitzari eranskina',
    '12': 'Onartu NOLA aurkezteko',
    '13': 'Ezagutu Dream eta Chief Aim arteko aldea',
    '14': 'Kontzentratua izan / Helburu bakarra',
    '15': 'Eguneko EGITEN EGITEKO lehentasunen zerrenda',
    '16': 'Grafikoaren aurrerapena / Puntuazioa ezagutu',
    '17': 'Erabili Momentum Arrakastaren Zikloa',
    '18': 'Amets Eraiki - Amets Liburua & Ikuspegi Taula',
    '19': 'Konektatu sisteman',
    '20': 'Maisutasun pertsonalaren zientzia ikastaroa',
    '21': 'Ikusi hitz egiten dituzun hitzak - esaten duzuna lortzen duzuna da',
    '22': 'Fisiologia / Arrakastarako jantzi',
    '23': 'Kontrako Asmo argiak',
    '24': 'Esna ezazu zure Barne Indarra: Superbotere Prozesuak',
    '25': 'Alpha-theta brainwave-n emititzen da',
    '26': 'Utzi zure zorigaiztoko istorioa kontatzea',
    '27': 'Erakutsi estimua / esker ona',
    '28': 'Ordeztu huts-ohiturak arrakasta-ohiturarekin (azelerazio-prozesuak)',
    '29': 'Sortu adimena',
    '30': 'Ikusi pertsona arrakastatsuak/aprendiz',
    '31': 'Entzun/Irakurri arrakasta-istorioak',
    '32': 'Eman nahi duzuna lehenik',
    '33': 'Egin ezazu orain Mentalitatea',
    '34': 'Zaindu zure gorputza',
    '35': 'Aurkitu urrea Adversity',
    '36': 'Garbitu Samskaras Eremutik',
    '37': 'Hartu %100eko erantzukizuna',
    '38': 'Erakargarri Eremu Sorgailuak',
    '39': 'Sartu energia-iturri batera konektatzen zaituen klub batean',
    '40': 'Bizi bizitza nahita asmo batekin - izan oraingoan',
    '1a': 'Nori entzuten diozu?',
    '1b': 'Irakasgarritasun Indizea',
    '1c': 'Prestakuntza-balantze-eskala',
    '1d': 'Konpetentzia inkontzientea',
    '19a': 'Irakurri liburuak',
    '19b': 'Entzun audioak',
    '19c': 'Ekitaldietara joan (hilero)',
    '19d': 'Eman eta jaso Aitorpena / Urrezko Araua zabaldua',
    '19e': 'Harremanak garatzea gogo berdineko pertsonekin',
    '23a': 'Diru Prozesuak',
    '23b': 'Harreman Prozesuak',
    '23c': 'Lidergo Prozesuak',
    '23d': 'Komunikazio Prozesuak',
    '23e': 'Osasun Prozesuak',
    '23f': 'Kontzientzia Espiritualaren Prozesuak',
    '23g': 'Amets Prozesuak',
    '23h': 'Antolaketa eta foku prozesuak'
  }
};

export default eu;

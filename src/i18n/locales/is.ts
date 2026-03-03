/**
 * Auto-converted locale module for is.
 */
import type { Messages } from './en';

const is: Messages = {
  nav: {
    questionnaire: 'Spurningalisti',
    history: 'Saga',
    settings: 'Stillingar'
  },
  app: {
    name: 'Birtingaralgrím',
    unexpectedError: 'Óvænt villa kom upp.'
  },
  home: {
    subtitle: 'Gefðu hverju svið lífs þíns einkunn - uppgötvaðu stöðuna þína'
  },
  dashboard: {
    title: 'Sýningarreiknirit Rekjasögu',
    subtitle: 'Fylgstu með framförum þínum með tímanum',
    loading: 'Hleður ferilinn þinn...',
    noData: 'Engin gögn fyrir þetta tímabil',
    progressTrend: 'Framfarastefna',
    progressToGoal: 'Framfarir að marki',
    ofGoal: '{pct}% af markmiði',
    goalReached: '🎯 Markmiðinu náð!',
    categoryBreakdown: 'Sundurliðun flokka',
    noSessionsRange: 'Engar lotur á þessu sviði',
    tryWiderRange: 'Prófaðu meira úrval eða veldu annað tímabil.',
    noSessionsYet: 'Engar fundir ennþá',
    completeFirst: 'Ljúktu fyrsta matinu þínu til að sjá framfarir þínar og þróun hér.',
    startFirst: 'Byrjaðu fyrsta námsmat',
    export: {
      date: 'Dagsetning',
      time: 'Tími',
      totalScore: 'Heildarstig',
      duration: 'Lengd (mín.)',
      notes: 'Skýringar'
    }
  },
  stats: {
    averageScore: 'Meðalstig',
    medianScore: 'Miðgildi stigs',
    highestScore: 'Hæsta stig',
    totalSessions: 'Samtals lotur'
  },
  network: {
    rankings: 'Röðun neta',
    searchingPeers: 'Leitar að jafnöldrum...',
    searching: 'Leitar...',
    online: 'Á netinu',
    peers: '{count} jafnaldrar',
    results: '{count} niðurstöður',
    avgShort: 'Meðaltal',
    p90Short: 'P90',
    averageScoreTitle: 'Meðalstig',
    percentile90Title: '90. hundraðshluti',
    globalAverage: 'Alþjóðlegt meðaltal',
    percentile90: '90. hundraðshluti',
    manifestations: 'Birtingarmyndir',
    activePeers: 'Virkir jafnaldrar',
    categoryRankings: 'Staða flokka'
  },
  focusAreas: {
    title: 'Fókussvæði',
    subtitle: 'Þrír flokkar sem eru með lægstu stigin þín - að bæta þessa skilar mestum ávinningi.',
    empty: 'Ljúktu við fleiri lotur til að sjá persónulegar tillögur um áherslusvið.'
  },
  sessions: {
    recent: 'Nýlegir fundir',
    deselectAll: 'Afvelja allt',
    selectAll: 'Veldu Allt',
    deleteCount: 'Eyða {count}',
    cancel: 'Hætta við',
    select: 'Veldu',
    deleting: 'Eyðir...'
  },
  settings: {
    title: 'Stillingar forrita',
    close: 'Lokaðu stillingum',
    dataManagement: 'Gagnastjórnun',
    saveLastSession: 'Vista síðasta lotu',
    saveLastSessionDesc: 'Forfylltu svör frá síðustu lotunni þinni.',
    resetProgress: 'Endurstilla framvindu',
    resetProgressDesc: 'Eyddu öllum vistuðum svörum og byrjaðu upp á nýtt.',
    goals: 'Markmið',
    targetScore: 'Markskor',
    targetScoreDesc:
      'Settu markaskorun (1.000–10.000) til að fylgjast með framförum þínum á mælaborðinu.',
    set: 'Sett',
    clearGoal: 'Hreinsa',
    currentTarget: 'Núverandi markmið:',
    on: 'Á',
    off: 'Slökkt',
    version: 'Birtingaralgrím {version}',
    clearAllAnswers: 'Hreinsaðu öll svör',
    clearConfirmTitle: 'Hreinsaðu öll svör',
    clearConfirmMessage:
      'Þetta mun eyða öllum núverandi svörum þínum varanlega og ekki er hægt að afturkalla það.',
    clearConfirmLabel: 'Hreinsa',
    keepAnswers: 'Geymdu svör',
    language: 'Tungumál',
    languageDesc: 'Veldu skjátungumálið fyrir forritið.',
    languageCount: '{count} tungumál í boði',
    goalErrorRange: 'Vinsamlega sláðu inn stig á milli 1.000 og 10.000.'
  },
  questionnaire: {
    saving: 'Vistar...',
    saved: 'Vistað',
    progressText: '{pct}% lokið ({answered}/{total})',
    progressAria: 'Framvinda námsmats',
    maxScore: 'Hámark: {score}',
    answerToScore: 'Svar við að skora',
    currentScore: 'Núverandi stig',
    scrollAll: 'Skrunaðu allt',
    stepByStep: 'Skref fyrir skref',
    questionOf: 'Spurning {current} af {total}',
    previous: '← Fyrri',
    next: 'Næsta →',
    completeAssessment: 'Heildarmat',
    startFresh: 'Viltu byrja ferskt?',
    resetAllAnswers: 'Endurstilla öll svör',
    resetTitle: 'Endurstilla öll svör?',
    resetMessage:
      'Þetta mun hreinsa hvert svar og byrja frá grunni. Þetta er ekki hægt að afturkalla.',
    resetLabel: 'Endurstilla',
    scoreQuality: {
      notStarted: 'Ekki Byrjað',
      manifesting: 'Birtist ❆',
      aligned: 'Jafnt',
      building: 'Bygging',
      startingOut: 'Byrjar út'
    },
    submitHint: {
      zero: '0 af {total} spurningum svarað — ósvaruðum spurningum sjálfgefið að lágmarki',
      partial:
        '{remaining} spurning eftir — ósvaraðar spurningum sjálfgefið lágmark | {remaining} spurningar eftir — ósvaraðar spurningum sjálfgefið lágmark',
      complete: 'Öllum spurningum svarað - tilbúið til að senda inn!'
    },
    submitTitle: {
      zero: 'Svaraðu nokkrum spurningum til að ljúka matinu þínu',
      partial: '{remaining} spurning eftir | {remaining} spurningar eftir',
      complete: 'Sendu fullbúið mat þitt'
    },
    submitError: 'Mistókst að vista lotu: {error}',
    dotTitle: 'Spurning {index}',
    dotAria: 'Farðu í spurningu {index}',
    keyboardHint: 'Ábending: Notaðu ← → til að fletta · 1–9 / 0 til að gefa einkunn'
  },
  onboarding: {
    step0Title: 'Velkomin í birtingaralgrímið',
    step0Body1:
      'Þetta tól hjálpar þér að mæla hvernig hugarfar þitt, venjur og daglegar aðgerðir eru í samræmi við að ná markmiðum þínum. Svaraðu hverri spurningu heiðarlega til að fá núverandi stig þitt.',
    step0Body2:
      'Fylltu út spurningalistann með reglulegu millibili til að fylgjast með vexti þínum með tímanum og sjá hvaða svæði þurfa mesta athygli.',
    step1Title: 'Hvernig stigagjöf virkar',
    step1Body:
      'Hver spurning er ákveðins fjölda stiga virði. Gefðu þér einkunn á kvarðanum 1–10 fyrir hverja spurningu. Einkunnin 10 þýðir að þú fullyrðir þá meginreglu; 1 þýðir að þú ert ekki byrjaður.',
    step1TargetHint: '🎯 Markmið: {target} | Hámark: {maximum}',
    excellent: 'Frábært',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Sterk samstilling - haltu áfram',
    good: 'Gott',
    goodRange: '4.001 – 7.000',
    goodNote: 'Sterkur grunnur - pláss til að vaxa',
    needsWork: 'Þarfnast vinnu',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Einbeittu þér fyrst að grundvallaratriðum',
    step2Title: 'Gögnin þín haldast einka',
    step2Body1:
      'Öll svör þín og stigasaga eru geymd á staðnum í tækinu þínu með því að nota dulkóðaðan SQLite gagnagrunn. Ekkert er sent til nokkurs netþjóns án þíns skýru leyfis.',
    step2Body2:
      'Valfrjáls jafningjadeilingareiginleikinn gerir þér kleift að sjá nafnlaus heildarstig frá öðrum notendum. Það deilir aðeins dulmáls undirrituðu yfirliti - aldrei einstök svör þín.',
    readyText: 'Tilbúinn? Við skulum fá grunnlínustigið þitt.',
    skipIntro: 'Slepptu inngangi',
    next: 'Næst',
    getStarted: 'Byrjaðu'
  },
  sharing: {
    title: 'Nafnlaus netmiðlun',
    privacyFirst: '🔒 Persónuvernd-fyrst',
    description:
      'Leggðu niðurstöðurnar þínar nafnlaust inn á alþjóðlegt net. Engu nafni, netfangi, IP tölu eða auðkenni tækis er aldrei deilt.',
    enabled: 'Samnýting virkjuð — stuðlar að netkerfinu',
    disabled: 'Slökkt á deilingu (sjálfgefið)',
    activeBadge: '✓ Verið er að deila nafnlausum stigum þínum með jafningjum',
    enableNote: 'Virkjaðu til að sjá hundraðshlutastöðu þína miðað við alþjóðlegt net.'
  },
  category: {
    back: '‹ Til baka',
    history: 'Saga',
    date: 'Dagsetning',
    score: 'Skora',
    loading: 'Hleður...',
    notEnoughData: 'Ekki næg gögn',
    noData: 'Engin gögn fundust fyrir „{category}“.',
    goToDashboard: 'Farðu í mælaborð'
  },
  chartActions: {
    viewFullscreen: 'Skoða allan skjáinn',
    exitFullscreen: 'Hætta á öllum skjánum',
    copyChart: 'Afrita graf',
    exportChart: 'Útflutningsrit',
    exportDefault: '⬇ Útflutningur',
    exportExcel: '📊 Flytja út Excel',
    exportCsv: '📄 Flytja út CSV',
    exportPdf: '📑 Flytja út PDF',
    exportHtml: '🌐 Flytja út HTML',
    copied: 'Myndrit afritað á klippiborð',
    copyFailed: 'Afritun mistókst — klippiborð ekki tiltækt',
    saveCancelled: 'Hætt við vistun'
  },
  resume: {
    continueLastSession: 'Halda áfram frá síðasta fundi?',
    welcomeBack: 'Velkomin aftur!',
    historicalBody:
      'Svörin þín frá síðustu lokuðu lotunni þinni hafa verið forhlaðin. Viltu halda þessum gildum sem útgangspunkt, eða byrja með algjörlega auðan spurningalista?',
    activeBody:
      'Þú ert með lotu í gangi. Viltu halda áfram þar sem frá var horfið, eða hefja nýtt mat?',
    clearWarning: '⚠️ Þetta mun hreinsa öll núverandi svör. Ertu viss?',
    yesStartFresh: 'Já, Byrjaðu ferskt',
    cancel: 'Hætta við',
    keepLastValues: 'Haltu síðustu gildum',
    resumeSession: 'Halda áfram fundi',
    startFresh: 'Byrjaðu ferskt'
  },
  questionItem: {
    pointsSuffix: 'punktar',
    low: 'Lágt',
    high: 'Hátt',
    rateAria: 'Gefðu {question} einkunn'
  },
  dateRange: {
    rangeLabel: 'Svið:',
    startDate: 'Upphafsdagur',
    endDate: 'Lokadagur',
    presets: {
      '7d': '7 dagar',
      '30d': '30 dagar',
      '90d': '90 dagar',
      '1y': '1 ár',
      all: 'Allur tími',
      custom: 'Sérsniðin'
    }
  },
  update: {
    availableTitle: 'v{version} er í boði!',
    releaseNotesFallback: 'Farðu á útgáfusíðuna til að hlaða niður nýjustu útgáfunni.',
    getUpdate: 'Fáðu uppfærslu',
    dismiss: 'Segja frá'
  },
  questions: {
    '1': 'Náðu tökum á grunnatriðunum',
    '2': 'Virkjaðu og lýstu orðum',
    '3': 'Finna sársauka- og samningsorku',
    '4': 'Skilgreindu hvað þú vilt',
    '5': 'Skrifaðu niður það sem þú vilt',
    '6': 'Ekki deila draumnum þínum með öðrum',
    '7': 'Fáðu brennandi löngun til markmiðsins þíns',
    '8': 'Markmiðið verður að vera í Sweet Spot',
    '9': 'Taktu ákvörðun',
    '10': 'Sjáðu/Finndu þig vel með markmið þitt',
    '11': 'Losaðu viðhengi við útkomuna',
    '12': 'Leyfðu HVERNIG að birtast',
    '13': 'Kynntu þér muninn á Dream og Chief Aim',
    '14': 'Vertu einbeittur / Einhleypur tilgangur',
    '15': 'Daglegur verkefnalisti yfir forgangsverkefni',
    '16': 'Framvinda í töflum / Vita stöðuna',
    '17': 'Notaðu Momentum Cycle of Success',
    '18': 'Dream Build - Draumabók og Vision Board',
    '19': 'Tengja við kerfið',
    '20': 'Námskeið í vísindum um persónulega færni',
    '21': 'Fylgstu með orðunum sem þú segir – það sem þú segir er það sem þú færð',
    '22': 'Lífeðlisfræði / Klæðnaður fyrir árangur',
    '23': 'Skýrar mótáætlanir',
    '24': 'Vekja innri kraft þinn: Ofurkraftsferlar',
    '25': 'Útvarpað á Alpha-theta heilabylgju',
    '26': 'Hættu að segja sorgarsögu þína',
    '27': 'Sýndu þakklæti / þakklæti',
    '28': 'Skiptu út misheppnuðum venjum fyrir árangursvenjur (hraðunarferlar)',
    '29': 'Búðu til Mastermind',
    '30': 'Horfðu á Successful People/Apprentice',
    '31': 'Hlusta á/lesa árangurssögur',
    '32': 'Gefðu það sem þú vilt fyrst',
    '33': 'Gerðu það núna hugarfar',
    '34': 'Hugsaðu vel um líkamann þinn',
    '35': 'Finndu gullið í mótlæti',
    '36': 'Hreinsaðu Samskaras úr Field',
    '37': 'Taktu 100% ábyrgð',
    '38': 'Aðdráttarsviðsframleiðendur',
    '39': 'Gakktu í klúbb sem tengir þig við orkugjafa',
    '40': 'Lifðu lífinu af ásettu ráði – vertu í nútíðinni',
    '1a': 'Hvern hlustar þú á?',
    '1b': 'Kennsluhæfnisvísitala',
    '1c': 'Þjálfunarjafnvægisvogur',
    '1d': 'Ómeðvituð hæfni',
    '19a': 'Lestu bækur',
    '19b': 'Hlusta á hljóðupptökur',
    '19c': 'Sækja viðburði (mánaðarlega)',
    '19d': 'Gefa og þiggja viðurkenningu / stækkaða gullna reglu',
    '19e': 'Byggðu upp tengsl við fólk með svipaðar skoðanir',
    '23a': 'Peningaferlar',
    '23b': 'Tengslaferli',
    '23c': 'Leiðtogaferlar',
    '23d': 'Samskiptaferlar',
    '23e': 'Heilbrigðisferlar',
    '23f': 'Andleg meðvitundarferli',
    '23g': 'Draumaferlar',
    '23h': 'Skipulags- og áhersluferlar'
  }
};

export default is;

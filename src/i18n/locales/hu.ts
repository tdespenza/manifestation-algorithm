/**
 * Auto-converted locale module for hu.
 */
import type { Messages } from './en';

const hu: Messages = {
  nav: {
    questionnaire: 'Kérdőív',
    history: 'Történelem',
    settings: 'Beállítások elemre'
  },
  app: {
    name: 'Megnyilvánulási algoritmus',
    unexpectedError: 'Váratlan hiba történt.'
  },
  home: {
    subtitle: 'Értékelje élete minden területét – fedezze fel az igazodási pontszámot'
  },
  dashboard: {
    title: 'Megnyilvánulási algoritmus követési története',
    subtitle: 'Kövesse nyomon előrehaladását az idő múlásával',
    loading: 'Előzmények betöltése…',
    noData: 'Erre az időszakra nincs adat',
    progressTrend: 'Haladási trend',
    progressToGoal: 'Haladás a cél felé',
    ofGoal: 'A cél {pct}%-a',
    goalReached: '🎯 A cél elérve!',
    categoryBreakdown: 'Kategória bontás',
    noSessionsRange: 'Ebben a tartományban nincsenek munkamenetek',
    tryWiderRange: 'Próbálkozzon szélesebb körrel, vagy válasszon másik időszakot.',
    noSessionsYet: 'Még nincsenek ülések',
    completeFirst: 'Töltse ki az első értékelést, hogy megtekinthesse fejlődését és trendjeit.',
    startFirst: 'Indítsa el az első értékelést',
    export: {
      date: 'Dátum',
      time: 'Idő',
      totalScore: 'Összpontszám',
      duration: 'Időtartam (perc)',
      notes: 'Megjegyzések'
    }
  },
  stats: {
    averageScore: 'Átlagos pontszám',
    medianScore: 'Medián pontszám',
    highestScore: 'Legmagasabb pontszám',
    totalSessions: 'Összes munkamenet'
  },
  network: {
    rankings: 'Hálózati rangsorok',
    searchingPeers: 'Társak keresése...',
    searching: 'Keresés...',
    online: 'Online',
    peers: '{count} társaik',
    results: '{count} eredmények',
    avgShort: 'Átl',
    p90Short: 'P90',
    averageScoreTitle: 'Átlagos pontszám',
    percentile90Title: '90. Percentilis',
    globalAverage: 'Globális átlag',
    percentile90: '90. Percentilis',
    manifestations: 'Megnyilvánulások',
    activePeers: 'Aktív társak',
    categoryRankings: 'Kategória Rangsorok'
  },
  focusAreas: {
    title: 'Fókuszterületek',
    subtitle:
      'Az Ön 3 legalacsonyabb pontszámot elérő kategóriája – ezek fejlesztése hozza a legnagyobb nyereséget.',
    empty:
      'Végezzen további munkameneteket, hogy személyre szabott fókuszterület-ajánlatokat tekintsen meg.'
  },
  sessions: {
    recent: 'Legutóbbi munkamenetek',
    deselectAll: 'Törölje az Összes kijelölését',
    selectAll: 'Válassza az Összes lehetőséget',
    deleteCount: '{count} törlése',
    cancel: 'Mégse',
    select: 'Válassza ki',
    deleting: 'Törlés…'
  },
  settings: {
    title: 'Alkalmazásbeállítások',
    close: 'Zárja be a beállításokat',
    dataManagement: 'Adatkezelés',
    saveLastSession: 'Utolsó munkamenet mentése',
    saveLastSessionDesc: 'Töltse ki előre a legutóbbi befejezett munkamenet válaszait.',
    resetProgress: 'Állítsa vissza a folyamatot',
    resetProgressDesc: 'Törölje az összes mentett választ, és kezdje újra.',
    goals: 'Gólok',
    targetScore: 'Célpontszám',
    targetScoreDesc:
      'Állítson be egy célpontszámot (1000–10 000), hogy az irányítópulton nyomon kövesse az előrehaladását.',
    set: 'Állítsa be',
    clearGoal: 'Világos',
    currentTarget: 'Jelenlegi cél:',
    on: 'Be',
    off: 'Ki',
    version: 'Megnyilvánulási algoritmus {version}',
    clearAllAnswers: 'Minden válasz törlése',
    clearConfirmTitle: 'Minden válasz törlése',
    clearConfirmMessage:
      'Ezzel véglegesen törli az összes jelenlegi válaszát, és nem vonható vissza.',
    clearConfirmLabel: 'Világos',
    keepAnswers: 'Tartsa meg a válaszokat',
    language: 'Nyelv',
    languageDesc: 'Válassza ki az alkalmazás megjelenítési nyelvét.',
    languageCount: '{count} nyelvek állnak rendelkezésre',
    goalErrorRange: 'Kérjük, adjon meg egy 1000 és 10 000 közötti pontszámot.'
  },
  questionnaire: {
    saving: 'Mentés...',
    saved: 'Mentve',
    progressText: '{pct}% kész ({answered}/{total})',
    progressAria: 'Az értékelés befejezésének folyamata',
    maxScore: 'Max.: {score}',
    answerToScore: 'Válasz a pontozáshoz',
    currentScore: 'Jelenlegi pontszám',
    scrollAll: 'Görgesse az összeset',
    stepByStep: 'Lépésről lépésre',
    questionOf: '{total} {current} kérdése',
    previous: '← Előző',
    next: 'Következő →',
    completeAssessment: 'Teljes értékelés',
    startFresh: 'Újra akarod kezdeni?',
    resetAllAnswers: 'Állítsa vissza az összes választ',
    resetTitle: 'Visszaállítja az összes választ?',
    resetMessage: 'Ez minden választ töröl, és a nulláról indul. Ezt nem lehet visszavonni.',
    resetLabel: 'Reset',
    scoreQuality: {
      notStarted: 'Nem indult el',
      manifesting: 'Megnyilvánuló ❆',
      aligned: 'Igazítva',
      building: 'Épület',
      startingOut: 'Kezdve'
    },
    submitHint: {
      zero: '{total} kérdések közül 0 válaszolt – a megválaszolatlan kérdések alapértelmezés szerint minimális',
      partial:
        '{remaining} kérdés maradt – a megválaszolatlan kérdések alapértelmezés szerint minimális | {remaining} kérdések maradtak – a megválaszolatlan kérdések alapértelmezés szerint minimális',
      complete: 'Minden kérdés megválaszolva – készen áll a beküldésre!'
    },
    submitTitle: {
      zero: 'Az értékelés befejezéséhez válaszoljon néhány kérdésre',
      partial: '{remaining} kérdés maradt | {remaining} kérdés maradt',
      complete: 'Nyújtsa be kitöltött értékelését'
    },
    submitError: 'Nem sikerült menteni a munkamenetet: {error}',
    dotTitle: 'kérdés {index}',
    dotAria: 'Ugrás a {index} kérdésre',
    keyboardHint: 'Tipp: A ← → gombbal navigálhat · 1–9 / 0 az értékeléshez'
  },
  onboarding: {
    step0Title: 'Üdvözöljük a megnyilvánulási algoritmusban',
    step0Body1:
      'Ez az eszköz segít mérni, hogy gondolkodásmódja, szokásai és napi cselekedetei mennyire összhangban vannak a céljaival. Válaszoljon minden kérdésre őszintén, hogy megkapja aktuális pontszámát.',
    step0Body2:
      'Rendszeres időközönként töltse ki a kérdőívet, hogy nyomon kövesse növekedését az idő múlásával, és megtudja, mely területek igényelnek a legtöbb figyelmet.',
    step1Title: 'Hogyan működik a pontozás',
    step1Body:
      'Minden kérdés meghatározott számú pontot ér. Értékelje magát 1-től 10-ig terjedő skálán minden kérdésnél. A 10-es értékelés azt jelenti, hogy teljes mértékben megtestesíti ezt az elvet; Az 1 azt jelenti, hogy még nem kezdted el.',
    step1TargetHint: '🎯 Cél: {target} | Maximum: {maximum}',
    excellent: 'Kiváló',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Erős összhang – csak így tovább',
    good: 'Jó',
    goodRange: '4001 – 7000',
    goodNote: 'Szilárd alap – hely a növekedéshez',
    needsWork: 'Munka kell',
    needsWorkRange: '0 – 4000',
    needsWorkNote: 'Először az alapokra koncentráljon',
    step2Title: 'Adatai privátak maradnak',
    step2Body1:
      'Minden válaszát és pontszámelőzményét helyileg az eszközén tárolja egy titkosított SQLite adatbázis segítségével. Az Ön kifejezett engedélye nélkül semmi sem kerül elküldésre egyetlen szerverre sem.',
    step2Body2:
      'Az opcionális peer-to-peer megosztási funkció lehetővé teszi a többi felhasználó anonimizált összesített pontszámainak megtekintését. Csak egy kriptográfiailag aláírt összefoglalót oszt meg – soha nem az Ön egyéni válaszait.',
    readyText: 'Kész? Nézzük meg az alappontszámot.',
    skipIntro: 'Intro kihagyása',
    next: 'Következő',
    getStarted: 'Kezdje el'
  },
  sharing: {
    title: 'Névtelen hálózati megosztás',
    privacyFirst: '🔒 Az adatvédelem mindenekelőtt',
    description:
      'Opcionálisan adhatja hozzá eredményeit névtelenül a globális hálózathoz. Soha nem osztanak meg nevet, e-mail-címet, IP-címet vagy eszközazonosítót.',
    enabled: 'Megosztás engedélyezve – a hálózathoz való hozzájárulás',
    disabled: 'Megosztás letiltva (alapértelmezett)',
    activeBadge: '✓ Az anonimizált pontszámait megosztjuk társaikkal',
    enableNote: 'Engedélyezze a százalékos rangjának megtekintéséhez a globális hálózathoz képest.'
  },
  category: {
    back: '‹ Vissza',
    history: 'Történelem',
    date: 'Dátum',
    score: 'Pontszám',
    loading: 'Betöltés...',
    notEnoughData: 'Nincs elég adat',
    noData: 'Nem található adat a következőhöz: „{category}”.',
    goToDashboard: 'Lépjen az Irányítópultra'
  },
  chartActions: {
    viewFullscreen: 'Teljes képernyő megtekintése',
    exitFullscreen: 'Kilépés a teljes képernyőről',
    copyChart: 'Diagram másolása',
    exportChart: 'Exportálási diagram',
    exportDefault: '⬇ Exportálás',
    exportExcel: '📊 Excel exportálása',
    exportCsv: '📄 CSV exportálása',
    exportPdf: '📑 PDF exportálása',
    exportHtml: '🌐 HTML exportálása',
    copied: 'A diagram a vágólapra másolva',
    copyFailed: 'A másolás nem sikerült – a vágólap nem érhető el',
    saveCancelled: 'Mentés törölve'
  },
  resume: {
    continueLastSession: 'Folytatja a legutóbbi munkamenetet?',
    welcomeBack: 'Üdvözöljük Vissza!',
    historicalBody:
      'A legutóbbi befejezett munkamenet válaszai előre betöltve. Szeretné megtartani ezeket az értékeket kiindulópontként, vagy egy teljesen üres kérdőívvel kezdi?',
    activeBody:
      'Egy munkamenet van folyamatban. Szeretné ott folytatni, ahol abbahagyta, vagy új értékelést kezdene?',
    clearWarning: '⚠️ Ezzel törli az összes aktuális választ. Biztos vagy benne?',
    yesStartFresh: 'Igen, kezdje újra',
    cancel: 'Mégse',
    keepLastValues: 'Tartsa meg az utolsó értékeket',
    resumeSession: 'Munkamenet folytatása',
    startFresh: 'Indítsa el frissen'
  },
  questionItem: {
    pointsSuffix: 'pontok',
    low: 'Alacsony',
    high: 'Magas',
    rateAria: 'Értékelés {question}'
  },
  dateRange: {
    rangeLabel: 'Tartomány:',
    startDate: 'Kezdés dátuma',
    endDate: 'Befejezés dátuma',
    presets: {
      '7d': '7 nap',
      '30d': '30 nap',
      '90d': '90 nap',
      '1y': '1 év',
      all: 'Minden idők',
      custom: 'Egyedi'
    }
  },
  update: {
    availableTitle: 'A v{version} elérhető!',
    releaseNotesFallback: 'Látogassa meg a kiadási oldalt a legújabb verzió letöltéséhez.',
    getUpdate: 'Frissítés kérése',
    dismiss: 'Elvetés'
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

export default hu;

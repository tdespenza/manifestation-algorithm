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
    '1': 'Mester az alapokat',
    '2': 'Aktiváld és világítsd meg a szavakat',
    '3': 'Találj fájdalom és kontraszt energiát',
    '4': 'Határozd meg, mit akarsz',
    '5': 'Írd le, mit akarsz',
    '6': 'Ne oszd meg az álmodat másokkal',
    '7': 'Égető vágy a célod iránt',
    '8': 'A cél biztosan a Sweet Spotban van',
    '9': 'Döntsön',
    '10': 'Láss/Érezd jól magad a célod birtoklásában',
    '11': 'Felszabadítás az eredményhez',
    '12': 'Engedd, hogy a HOGYAN megjelenjen',
    '13': 'Ismerd meg a különbséget az Álom és a Fő Aim között',
    '14': 'Légy fókuszált / Céltudatosság',
    '15': 'Napi TEENDŐK listája a prioritások',
    '16': 'A lista előrehaladása / Ismerd meg a pontszámot',
    '17': 'Használd a siker lendületciklusát',
    '18': 'Álom építése - Álomkönyv és Víziótábla',
    '19': 'Dugja be a rendszerbe',
    '20': 'Személyes mesteri tudomány kurzus',
    '21': 'Figyeld a szavakat, amiket mondasz – amit mondasz, azt kapod',
    '22': 'Fiziológia / Öltözködj a sikerhez',
    '23': 'Világos ellenszándékok',
    '24': 'Ébresszük fel a belső erődet: Szupererő-folyamatok',
    '25': 'Sugárzás az Alpha-theta agyhullámon',
    '26': 'Ne meséld el a bánatod történetét',
    '27': 'Mutasd meg a hálát / hálásságot',
    '28': 'Cseréld ki a kudarcot siker szokásaival (gyorsító folyamatok)',
    '29': 'Készíts egy Mastermindet',
    '30': 'Nézd meg a sikeres emberek/tanítvány című filmet',
    '31': 'Hallgass/Olvass sikertörténeteket',
    '32': 'Először add oda, amit akarsz.',
    '33': 'Tedd meg most: mentalitás',
    '34': 'Vigyázz a testedre',
    '35': 'Találd meg az aranyat a nehézségekben',
    '36': 'Tisztítsa a szamkarákat a mezőről',
    '37': 'Vállald 100%-os felelősséget',
    '38': 'Vonzómező generátorok',
    '39': 'Csatlakozz egy olyan klubhoz, amely egy energiaforráshoz köt',
    '40': 'Éld tudatos szándékkal az életet – legyél a jelen',
    '1a': 'Kit hallgatsz?',
    '1b': 'Taníthatósági index',
    '1c': 'Edzési Mérleg',
    '1d': 'Tudattalan kompetencia',
    '19a': 'Olvass könyveket',
    '19b': 'Hangosítás',
    '19c': 'Részt vegyél eseményeken (havonta',
    '19d': 'Adj és kapj elismerést / kibővített aranyszabályt',
    '19e': 'Építs kapcsolatokat hasonló gondolkodású emberekkel',
    '23a': 'Pénzügyek',
    '23b': 'Kapcsolati folyamatok',
    '23c': 'Vezetői folyamatok',
    '23d': 'Kommunikációs folyamatok',
    '23e': 'Egészségügyi folyamatok',
    '23f': 'Spirituális tudatossági folyamatok',
    '23g': 'Álomfolyamatok',
    '23h': 'Szervezés és fókusz folyamatok'
  }
};

export default hu;

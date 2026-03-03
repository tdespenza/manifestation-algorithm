/**
 * Auto-converted locale module for sk.
 */
import type { Messages } from './en';

const sk: Messages = {
  nav: {
    questionnaire: 'Dotazník',
    history: 'História',
    settings: 'Nastavenia'
  },
  app: {
    name: 'Manifestačný algoritmus',
    unexpectedError: 'Vyskytla sa neočakávaná chyba.'
  },
  home: {
    subtitle: 'Ohodnoťte každú oblasť svojho života – objavte svoje skóre zarovnania'
  },
  dashboard: {
    title: 'História sledovania algoritmu prejavu',
    subtitle: 'Sledujte svoj pokrok v priebehu času',
    loading: 'Načítava sa vaša história…',
    noData: 'Žiadne údaje za toto obdobie',
    progressTrend: 'Progress Trend',
    progressToGoal: 'Postup do cieľa',
    ofGoal: '{pct}% cieľa',
    goalReached: '🎯 Cieľ dosiahnutý!',
    categoryBreakdown: 'Rozdelenie podľa kategórií',
    noSessionsRange: 'V tomto rozsahu nie sú žiadne relácie',
    tryWiderRange: 'Vyskúšajte širší rozsah alebo vyberte iné obdobie.',
    noSessionsYet: 'Zatiaľ žiadne relácie',
    completeFirst: 'Dokončite svoje prvé hodnotenie, aby ste tu videli svoj pokrok a trendy.',
    startFirst: 'Začnite prvé hodnotenie',
    export: {
      date: 'Dátum',
      time: 'Čas',
      totalScore: 'Celkové skóre',
      duration: 'Trvanie (min)',
      notes: 'Poznámky'
    }
  },
  stats: {
    averageScore: 'Priemerné skóre',
    medianScore: 'Stredné skóre',
    highestScore: 'Najvyššie skóre',
    totalSessions: 'Celkový počet relácií'
  },
  network: {
    rankings: 'Rebríček siete',
    searchingPeers: 'Hľadajú sa rovesníci...',
    searching: 'Hľadá sa...',
    online: 'Online',
    peers: '{count} rovesníci',
    results: '{count} výsledky',
    avgShort: 'Priem',
    p90Short: 'P90',
    averageScoreTitle: 'Priemerné skóre',
    percentile90Title: '90. percentil',
    globalAverage: 'Globálny priemer',
    percentile90: '90. percentil',
    manifestations: 'Prejavy',
    activePeers: 'Aktívni rovesníci',
    categoryRankings: 'Rebríček kategórií'
  },
  focusAreas: {
    title: 'Oblasti zaostrenia',
    subtitle: 'Vaše 3 kategórie s najnižším skóre – ich zlepšenie prináša najväčšie zisky.',
    empty: 'Absolvujte viac relácií, aby ste videli prispôsobené odporúčania oblasti zamerania.'
  },
  sessions: {
    recent: 'Nedávne relácie',
    deselectAll: 'Zrušte výber všetkých',
    selectAll: 'Vyberte možnosť Všetky',
    deleteCount: 'Odstrániť {count}',
    cancel: 'Zrušiť',
    select: 'Vyberte',
    deleting: 'Odstraňuje sa…'
  },
  settings: {
    title: 'Nastavenia aplikácie',
    close: 'Zatvorte nastavenia',
    dataManagement: 'Správa údajov',
    saveLastSession: 'Uložiť poslednú reláciu',
    saveLastSessionDesc: 'Predvyplňte odpovede z vašej poslednej dokončenej relácie.',
    resetProgress: 'Resetovať priebeh',
    resetProgressDesc: 'Vymažte všetky uložené odpovede a začnite odznova.',
    goals: 'Ciele',
    targetScore: 'Cieľové skóre',
    targetScoreDesc:
      'Nastavte skóre za cieľ (1 000 – 10 000), aby ste mohli sledovať svoj pokrok na informačnom paneli.',
    set: 'Set',
    clearGoal: 'Jasné',
    currentTarget: 'Aktuálny cieľ:',
    on: 'Zapnuté',
    off: 'Vypnuté',
    version: 'Algoritmus prejavu {version}',
    clearAllAnswers: 'Vymazať všetky odpovede',
    clearConfirmTitle: 'Vymazať všetky odpovede',
    clearConfirmMessage:
      'Týmto natrvalo odstránite všetky vaše aktuálne odpovede a nebude to možné vrátiť späť.',
    clearConfirmLabel: 'Jasné',
    keepAnswers: 'Ponechajte si odpovede',
    language: 'Jazyk',
    languageDesc: 'Vyberte jazyk zobrazenia pre aplikáciu.',
    languageCount: 'K dispozícii sú {count} jazyky',
    goalErrorRange: 'Zadajte skóre medzi 1 000 a 10 000.'
  },
  questionnaire: {
    saving: 'Ukladá sa...',
    saved: 'Uložené',
    progressText: '{pct}% dokončené ({answered}/{total})',
    progressAria: 'Priebeh dokončenia hodnotenia',
    maxScore: 'Max: {score}',
    answerToScore: 'Odpoveď na skóre',
    currentScore: 'Aktuálne skóre',
    scrollAll: 'Rolovať všetko',
    stepByStep: 'Krok za krokom',
    questionOf: 'Otázka {current} z {total}',
    previous: '← Predchádzajúce',
    next: 'Ďalej →',
    completeAssessment: 'Kompletné hodnotenie',
    startFresh: 'Chcete začať odznova?',
    resetAllAnswers: 'Obnoviť všetky odpovede',
    resetTitle: 'Obnoviť všetky odpovede?',
    resetMessage: 'Tým sa vymaže každá odpoveď a začne sa od nuly. Toto sa nedá vrátiť späť.',
    resetLabel: 'Resetovať',
    scoreQuality: {
      notStarted: 'Nespustené',
      manifesting: 'Prejavuje sa ❆',
      aligned: 'Zarovnané',
      building: 'Budovanie',
      startingOut: 'Začíname'
    },
    submitHint: {
      zero: '0 z {total} zodpovedaných otázok — nezodpovedaných otázok je predvolene minimum',
      partial:
        '{remaining} zostávajúca otázka – nezodpovedané otázky predvolene na minimum | Zostáva {remaining} otázok – nezodpovedané otázky sú predvolene minimálne',
      complete: 'Všetky otázky sú zodpovedané – pripravené na odoslanie!'
    },
    submitTitle: {
      zero: 'Na dokončenie hodnotenia odpovedzte na niekoľko otázok',
      partial: '{remaining} zostávajúca otázka | Zostáva {remaining} otázok',
      complete: 'Odošlite vyplnené hodnotenie'
    },
    submitError: 'Nepodarilo sa uložiť reláciu: {error}',
    dotTitle: 'Otázka {index}',
    dotAria: 'Prejsť na otázku {index}',
    keyboardHint: 'Tip: Na navigáciu použite ← → · 1–9 / 0 na hodnotenie'
  },
  onboarding: {
    step0Title: 'Vitajte v Manifestation Algorithm',
    step0Body1:
      'Tento nástroj vám pomáha merať, do akej miery sú vaše myslenie, zvyky a každodenné činnosti v súlade s dosahovaním vašich cieľov. Úprimne odpovedzte na každú otázku, aby ste získali svoje aktuálne skóre.',
    step0Body2:
      'Vyplňte dotazník v pravidelných intervaloch, aby ste mohli sledovať svoj rast v priebehu času a zistiť, ktoré oblasti si vyžadujú najväčšiu pozornosť.',
    step1Title: 'Ako funguje bodovanie',
    step1Body:
      'Každá otázka má stanovený počet bodov. Ohodnoťte sa na stupnici od 1 do 10 pre každú otázku. Hodnotenie 10 znamená, že plne stelesňujete tento princíp; 1 znamená, že ste nezačali.',
    step1TargetHint: '🎯 Cieľ: {target} | Maximum: {maximum}',
    excellent: 'Výborne',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Silné zarovnanie – pokračujte',
    good: 'Dobre',
    goodRange: '4 001 – 7 000',
    goodNote: 'Pevný základ – priestor na rast',
    needsWork: 'Potrebuje prácu',
    needsWorkRange: '0 – 4 000',
    needsWorkNote: 'Najprv sa zamerajte na základy',
    step2Title: 'Vaše údaje zostanú súkromné',
    step2Body1:
      'Všetky vaše odpovede a história skóre sú uložené lokálne vo vašom zariadení pomocou šifrovanej databázy SQLite. Bez vášho výslovného súhlasu sa nič neposiela na žiadny server.',
    step2Body2:
      'Voliteľná funkcia zdieľania peer-to-peer vám umožňuje zobraziť anonymizované súhrnné skóre od iných používateľov. Zdieľa iba kryptograficky podpísaný súhrn – nikdy nie vaše individuálne odpovede.',
    readyText: 'pripravený? Poďme získať vaše základné skóre.',
    skipIntro: 'Preskočiť úvod',
    next: 'Ďalej',
    getStarted: 'Začíname'
  },
  sharing: {
    title: 'Anonymné zdieľanie siete',
    privacyFirst: '🔒 Ochrana osobných údajov na prvom mieste',
    description:
      'Voliteľne môžete anonymne prispieť svojimi výsledkami do globálnej siete. Nikdy sa nezdieľa žiadne meno, e-mail, adresa IP ani ID zariadenia.',
    enabled: 'Zdieľanie povolené — prispievanie do siete',
    disabled: 'Zdieľanie je zakázané (predvolené)',
    activeBadge: '✓ Vaše anonymizované skóre sa zdieľa s kolegami',
    enableNote: 'Povoľte zobrazenie percentilového hodnotenia v porovnaní s globálnou sieťou.'
  },
  category: {
    back: '‹ Späť',
    history: 'História',
    date: 'Dátum',
    score: 'skóre',
    loading: 'Načítava sa...',
    notEnoughData: 'Nedostatok údajov',
    noData: 'Nenašli sa žiadne údaje pre „{category}“.',
    goToDashboard: 'Prejdite na informačný panel'
  },
  chartActions: {
    viewFullscreen: 'Zobraziť celú obrazovku',
    exitFullscreen: 'Ukončiť celú obrazovku',
    copyChart: 'Kopírovať graf',
    exportChart: 'Exportovať graf',
    exportDefault: '⬇ Exportovať',
    exportExcel: '📊 Exportujte Excel',
    exportCsv: '📄 Exportujte CSV',
    exportPdf: '📑 Exportujte PDF',
    exportHtml: '🌐 Exportujte HTML',
    copied: 'Graf bol skopírovaný do schránky',
    copyFailed: 'Kopírovanie zlyhalo – schránka nie je k dispozícii',
    saveCancelled: 'Ukladanie bolo zrušené'
  },
  resume: {
    continueLastSession: 'Pokračovať z poslednej relácie?',
    welcomeBack: 'Vitajte späť!',
    historicalBody:
      'Vaše odpovede z vašej poslednej dokončenej relácie boli vopred načítané. Chceli by ste ponechať tieto hodnoty ako východiskový bod alebo začať s úplne prázdnym dotazníkom?',
    activeBody:
      'Máte práve prebiehajúcu reláciu. Chceli by ste pokračovať tam, kde ste skončili, alebo začať s novým hodnotením?',
    clearWarning: '⚠️ Týmto sa vymažú všetky aktuálne odpovede. si si istý?',
    yesStartFresh: 'Áno, začať odznova',
    cancel: 'Zrušiť',
    keepLastValues: 'Udržujte posledné hodnoty',
    resumeSession: 'Obnoviť reláciu',
    startFresh: 'Začnite odznova'
  },
  questionItem: {
    pointsSuffix: 'bodov',
    low: 'Nízka',
    high: 'Vysoká',
    rateAria: 'Hodnotiť {question}'
  },
  dateRange: {
    rangeLabel: 'Rozsah:',
    startDate: 'Dátum začiatku',
    endDate: 'Dátum ukončenia',
    presets: {
      '7d': '7 dní',
      '30d': '30 dní',
      '90d': '90 dní',
      '1y': '1 rok',
      all: 'Všetky časy',
      custom: 'Vlastné'
    }
  },
  update: {
    availableTitle: 'v{version} je k dispozícii!',
    releaseNotesFallback: 'Navštívte stránku vydania a stiahnite si najnovšiu verziu.',
    getUpdate: 'Získať aktualizáciu',
    dismiss: 'Odmietnuť'
  },
  questions: {
    '1': 'Zvládni základy',
    '2': 'Aktivovať a osvietiť slová',
    '3': 'Nájdite bolesť a stiahnite energiu',
    '4': 'Definuj, čo chceš',
    '5': 'Zapíš si, čo chceš',
    '6': 'Nezdieľajte svoj sen s inými',
    '7': 'Získaj horúcu túžbu po svojom cieli',
    '8': 'Cieľ musí byť v Sweet Spot',
    '9': 'Rozhodnite sa',
    '10': 'Vidieť/cítiť sa dobre, keď držíte svoj cieľ',
    '11': 'Uvoľnite pripútanosť k výsledku',
    '12': 'Nechaj AKO sa prejaviť samo',
    '13': 'Poznať rozdiel medzi Dream a Chief Aim',
    '14': 'Buď sústredený / Jednotvárnosť v zmysle cieľa',
    '15': 'Denný zoznam priorít TO DO',
    '16': 'Postup v rebríčku / Poznaj skóre',
    '17': 'Cyklus úspechu využitia hybnosti',
    '18': 'Budujte sen - Kniha snov a vizuálna nástenka',
    '19': 'Pripojenie do systému',
    '20': 'Kurz vedy osobného majstrovstva',
    '21': 'Dávaj si pozor na slová, ktoré hovoríš – čo povieš, to dostaneš',
    '22': 'Fyziológia / Obliekajte sa na úspech',
    '23': 'Jasné protiúmysly',
    '24': 'Prebuďte svoju vnútornú silu: Procesy superschopností',
    '25': 'Vysielané na Alpha-theta mozgových vlnách',
    '26': 'Prestaň rozprávať svoj príbeh smútku',
    '27': 'Prejavte ocenenie / vďačnosť',
    '28': 'Nahradiť návyky zlyhania návykmi úspechu (urýchľovacie procesy)',
    '29': 'Vytvorte Mastermind',
    '30': 'Pozrite si Úspešných ľudí/Učňa',
    '31': 'Počúvajte/čítajte úspešné príbehy',
    '32': 'Najprv sa vzdaj, čo chceš',
    '33': 'Mentalita urob to teraz',
    '34': 'Starajte sa o svoje telo',
    '35': 'Nájdite zlato v nepriazni osudu',
    '36': 'Čisté samskary z terénu',
    '37': 'Prevezmite 100% zodpovednosť',
    '38': 'Generátory atraktorového poľa',
    '39': 'Pridaj sa do Klubu, ktorý ťa spojí so zdrojom energie',
    '40': 'Žite život s vedomým zámerom – buďte v prítomnosti',
    '1a': 'Koho počúvaš?',
    '1b': 'Index učiteľnosti',
    '1c': 'Škála tréningovej rovnováhy',
    '1d': 'Nevedomá kompetencia',
    '19a': 'Čítajte knihy',
    '19b': 'Počúvajte audiozáznamy',
    '19c': 'Zúčastňujte sa podujatí (mesačne)',
    '19d': 'Dávať a prijímať uznanie / rozšírené Zlaté pravidlo',
    '19e': 'Budujte vzťahy s podobne zmýšľajúcimi ľuďmi',
    '23a': 'Finančné procesy',
    '23b': 'Vzťahové procesy',
    '23c': 'Procesy vedenia',
    '23d': 'Komunikačné procesy',
    '23e': 'Zdravotné procesy',
    '23f': 'Procesy duchovného uvedomenia',
    '23g': 'Procesy snov',
    '23h': 'Procesy organizácie a zamerania'
  }
};

export default sk;

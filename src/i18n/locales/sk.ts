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

export default sk;

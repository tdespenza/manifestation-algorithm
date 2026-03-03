/**
 * Auto-converted locale module for cs.
 */
import type { Messages } from './en';

const cs: Messages = {
  nav: {
    questionnaire: 'Dotazník',
    history: 'Historie',
    settings: 'Nastavení'
  },
  app: {
    name: 'Manifestační algoritmus',
    unexpectedError: 'Došlo k neočekávané chybě.'
  },
  home: {
    subtitle: 'Ohodnoťte každou oblast svého života – objevte své skóre zarovnání'
  },
  dashboard: {
    title: 'Historie sledování algoritmu manifestace',
    subtitle: 'Sledujte svůj pokrok v průběhu času',
    loading: 'Načítání historie…',
    noData: 'Žádné údaje pro toto období',
    progressTrend: 'Trend pokroku',
    progressToGoal: 'Postup k cíli',
    ofGoal: '{pct}% cíle',
    goalReached: '🎯 Cíl splněn!',
    categoryBreakdown: 'Rozdělení podle kategorií',
    noSessionsRange: 'V tomto rozsahu nejsou žádné relace',
    tryWiderRange: 'Zkuste širší rozsah nebo vyberte jiné období.',
    noSessionsYet: 'Zatím žádné relace',
    completeFirst: 'Dokončete své první hodnocení, abyste zde viděli svůj pokrok a trendy.',
    startFirst: 'Začněte s prvním hodnocením',
    export: {
      date: 'Datum',
      time: 'Čas',
      totalScore: 'Celkové skóre',
      duration: 'Délka (min)',
      notes: 'Poznámky'
    }
  },
  stats: {
    averageScore: 'Průměrné skóre',
    medianScore: 'Střední skóre',
    highestScore: 'Nejvyšší skóre',
    totalSessions: 'Celkový počet relací'
  },
  network: {
    rankings: 'Síťové hodnocení',
    searchingPeers: 'Hledání vrstevníků...',
    searching: 'Hledání...',
    online: 'Online',
    peers: '{count} vrstevníci',
    results: '{count} výsledky',
    avgShort: 'Prům',
    p90Short: 'P90',
    averageScoreTitle: 'Průměrné skóre',
    percentile90Title: '90. percentil',
    globalAverage: 'Globální průměr',
    percentile90: '90. percentil',
    manifestations: 'Projevy',
    activePeers: 'Aktivní vrstevníci',
    categoryRankings: 'Pořadí kategorií'
  },
  focusAreas: {
    title: 'Oblasti zaměření',
    subtitle:
      'Vaše 3 kategorie s nejnižším skóre – zlepšení těchto kategorií přináší největší zisky.',
    empty: 'Dokončete další sezení, abyste viděli personalizovaná doporučení oblastí zaměření.'
  },
  sessions: {
    recent: 'Nedávné relace',
    deselectAll: 'Zrušte výběr všech',
    selectAll: 'Vyberte Vše',
    deleteCount: 'Smazat {count}',
    cancel: 'Zrušit',
    select: 'Vyberte',
    deleting: 'Mazání…'
  },
  settings: {
    title: 'Nastavení aplikace',
    close: 'Zavřete nastavení',
    dataManagement: 'Správa dat',
    saveLastSession: 'Uložit poslední relaci',
    saveLastSessionDesc: 'Předvyplňte odpovědi z vaší poslední dokončené relace.',
    resetProgress: 'Resetovat průběh',
    resetProgressDesc: 'Smažte všechny uložené odpovědi a začněte znovu.',
    goals: 'Cíle',
    targetScore: 'Cílové skóre',
    targetScoreDesc:
      'Nastavte skóre za cíl (1 000–10 000), abyste mohli sledovat svůj pokrok na řídicím panelu.',
    set: 'Set',
    clearGoal: 'Jasný',
    currentTarget: 'Aktuální cíl:',
    on: 'Zapnuto',
    off: 'Vypnuto',
    version: 'Algoritmus manifestace {version}',
    clearAllAnswers: 'Vymazat všechny odpovědi',
    clearConfirmTitle: 'Vymazat všechny odpovědi',
    clearConfirmMessage:
      'Touto akcí trvale smažete všechny své aktuální odpovědi a nelze ji vrátit zpět.',
    clearConfirmLabel: 'Jasný',
    keepAnswers: 'Uchovávejte odpovědi',
    language: 'Jazyk',
    languageDesc: 'Vyberte jazyk zobrazení aplikace.',
    languageCount: 'K dispozici jsou {count} jazyky',
    goalErrorRange: 'Zadejte skóre mezi 1 000 a 10 000.'
  },
  questionnaire: {
    saving: 'Ukládání...',
    saved: 'Uloženo',
    progressText: '{pct}% dokončeno ({answered}/{total})',
    progressAria: 'Průběh dokončení hodnocení',
    maxScore: 'Max: {score}',
    answerToScore: 'Odpovězte ke skóre',
    currentScore: 'Aktuální skóre',
    scrollAll: 'Posunout vše',
    stepByStep: 'Krok za krokem',
    questionOf: 'Otázka {current} z {total}',
    previous: '← Předchozí',
    next: 'Další →',
    completeAssessment: 'Kompletní hodnocení',
    startFresh: 'Chcete začít znovu?',
    resetAllAnswers: 'Resetovat všechny odpovědi',
    resetTitle: 'Resetovat všechny odpovědi?',
    resetMessage: 'Tím vymažete každou odpověď a začnete od nuly. Toto nelze vrátit zpět.',
    resetLabel: 'Resetovat',
    scoreQuality: {
      notStarted: 'Nezahájeno',
      manifesting: 'Projevující se ❆',
      aligned: 'Zarovnané',
      building: 'Budování',
      startingOut: 'Začínáme'
    },
    submitHint: {
      zero: '0 z {total} otázek zodpovězeno – nezodpovězené otázky jsou ve výchozím nastavení minimální',
      partial:
        '{remaining} zbývající otázka — nezodpovězené otázky výchozí minimální | Zbývající otázky: {remaining} – nezodpovězené otázky jsou ve výchozím nastavení minimální',
      complete: 'Všechny otázky zodpovězeny – připraveno k odeslání!'
    },
    submitTitle: {
      zero: 'K dokončení hodnocení odpovězte na několik otázek',
      partial: '{remaining} zbývající otázka | Zbývá {remaining} otázek',
      complete: 'Odešlete své dokončené hodnocení'
    },
    submitError: 'Nepodařilo se uložit relaci: {error}',
    dotTitle: 'Otázka {index}',
    dotAria: 'Přejít na otázku {index}',
    keyboardHint: 'Tip: Použijte ← → pro navigaci · 1–9 / 0 pro hodnocení'
  },
  onboarding: {
    step0Title: 'Vítejte v Manifestation Algorithm',
    step0Body1:
      'Tento nástroj vám pomůže změřit, jak jsou vaše myšlení, zvyky a každodenní činy v souladu s dosahováním vašich cílů. Odpovězte poctivě na každou otázku, abyste získali své aktuální skóre.',
    step0Body2:
      'Vyplňujte dotazník v pravidelných intervalech, abyste sledovali svůj růst v průběhu času a zjistili, které oblasti vyžadují největší pozornost.',
    step1Title: 'Jak funguje bodování',
    step1Body:
      'Každá otázka má stanovený počet bodů. Ohodnoťte se u každé otázky na stupnici 1–10. Hodnocení 10 znamená, že tento princip plně ztělesňujete; 1 znamená, že jste nezačali.',
    step1TargetHint: '🎯 Cíl: {target} | Maximum: {maximum}',
    excellent: 'Výborně',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Silné sladění – pokračujte',
    good: 'Dobře',
    goodRange: '4 001 – 7 000',
    goodNote: 'Pevný základ – prostor pro růst',
    needsWork: 'Potřebuje práci',
    needsWorkRange: '0 – 4 000',
    needsWorkNote: 'Nejprve se zaměřte na základy',
    step2Title: 'Vaše data zůstanou soukromá',
    step2Body1:
      'Všechny vaše odpovědi a historie skóre jsou uloženy lokálně ve vašem zařízení pomocí šifrované databáze SQLite. Bez vašeho výslovného svolení není nic odesíláno na žádný server.',
    step2Body2:
      'Volitelná funkce sdílení peer-to-peer vám umožní zobrazit anonymizovaná souhrnná skóre od ostatních uživatelů. Sdílí pouze kryptograficky podepsaný souhrn – nikdy vaše jednotlivé odpovědi.',
    readyText: 'Připraveni? Pojďme získat vaše základní skóre.',
    skipIntro: 'Přeskočit úvod',
    next: 'Další',
    getStarted: 'Začněte'
  },
  sharing: {
    title: 'Anonymní sdílení v síti',
    privacyFirst: '🔒 Ochrana osobních údajů - na prvním místě',
    description:
      'Volitelně přispívejte svými výsledky anonymně do celosvětové sítě. Nikdy není sdíleno žádné jméno, e-mail, IP adresa ani ID zařízení.',
    enabled: 'Sdílení povoleno – přispívání do sítě',
    disabled: 'Sdílení zakázáno (výchozí)',
    activeBadge: '✓ Vaše anonymizovaná skóre jsou sdílena s kolegy',
    enableNote: 'Povolte, abyste viděli své procentuální hodnocení v porovnání s globální sítí.'
  },
  category: {
    back: '‹ Zpět',
    history: 'Historie',
    date: 'Datum',
    score: 'skóre',
    loading: 'Načítání...',
    notEnoughData: 'Nedostatek dat',
    noData: 'Pro „{category}“ nebyla nalezena žádná data.',
    goToDashboard: 'Přejděte na Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Zobrazit celou obrazovku',
    exitFullscreen: 'Ukončete celou obrazovku',
    copyChart: 'Kopírovat graf',
    exportChart: 'Exportovat graf',
    exportDefault: '⬇ Export',
    exportExcel: '📊 Exportujte Excel',
    exportCsv: '📄 Export CSV',
    exportPdf: '📑 Exportujte PDF',
    exportHtml: '🌐 Exportujte HTML',
    copied: 'Graf zkopírován do schránky',
    copyFailed: 'Kopírování se nezdařilo – schránka není k dispozici',
    saveCancelled: 'Uložit zrušeno'
  },
  resume: {
    continueLastSession: 'Pokračovat z poslední relace?',
    welcomeBack: 'Vítejte zpět!',
    historicalBody:
      'Vaše odpovědi z vaší poslední dokončené relace byly předem načteny. Chcete si tyto hodnoty ponechat jako výchozí bod, nebo začít se zcela prázdným dotazníkem?',
    activeBody:
      'Máte probíhající relaci. Chcete pokračovat tam, kde jste skončili, nebo začít s novým hodnocením?',
    clearWarning: '⚠️ Tímto vymažete všechny aktuální odpovědi. jsi si jistý?',
    yesStartFresh: 'Ano, Start Fresh',
    cancel: 'Zrušit',
    keepLastValues: 'Udržujte poslední hodnoty',
    resumeSession: 'Obnovit relaci',
    startFresh: 'Začněte znovu'
  },
  questionItem: {
    pointsSuffix: 'bodů',
    low: 'Nízká',
    high: 'Vysoká',
    rateAria: 'Hodnotit {question}'
  },
  dateRange: {
    rangeLabel: 'Rozsah:',
    startDate: 'Datum zahájení',
    endDate: 'Datum ukončení',
    presets: {
      '7d': '7 dní',
      '30d': '30 dní',
      '90d': '90 dní',
      '1y': '1 rok',
      all: 'Celou dobu',
      custom: 'Vlastní'
    }
  },
  update: {
    availableTitle: 'v{version} je k dispozici!',
    releaseNotesFallback: 'Navštivte stránku vydání a stáhněte si nejnovější verzi.',
    getUpdate: 'Získat aktualizaci',
    dismiss: 'Odmítnout'
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

export default cs;

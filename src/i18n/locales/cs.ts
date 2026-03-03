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
    '1': 'Zvládněte základy',
    '2': 'Aktivujte a osvětlete slova',
    '3': 'Najděte Pain & Contract Energy',
    '4': 'Definujte, co chcete',
    '5': 'Napište, co chcete',
    '6': 'Nedělej si sen s ostatními',
    '7': 'Získejte spalující touhu po svém cíli',
    '8': 'Cíl musí být ve Sweet Spotu',
    '9': 'Udělejte rozhodnutí',
    '10': 'Vidět/cítit se dobře při držení svého cíle',
    '11': 'Uvolněte připoutanost k výsledku',
    '12': 'Nechte JAK se prezentovat',
    '13': 'Poznejte rozdíl mezi Dream a Chief Aim',
    '14': 'Zaměřte se / Jednotný účel',
    '15': 'Denní TO DO seznam priorit',
    '16': 'Graf pokroku / Poznejte skóre',
    '17': 'Použijte Momentum Cycle of Success',
    '18': 'Dream Build - Kniha snů & Vision Board',
    '19': 'Zapojte do systému',
    '20': 'Kurz Věda osobního mistrovství',
    '21': 'Sledujte slova, která mluvíte – to, co říkáte, to dostanete',
    '22': 'Fyziologie / Šaty pro úspěch',
    '23': 'Jasné protizáměry',
    '24': 'Probuďte svou vnitřní sílu: procesy supersíly',
    '25': 'Vysílání na mozkových vlnách Alpha-theta',
    '26': 'Přestaňte vyprávět svůj příběh o utrpení',
    '27': 'Ukažte uznání / vděčnost',
    '28': 'Nahradit neúspěchové návyky návyky úspěchu (procesy akcelerátoru)',
    '29': 'Vytvořte Mastermind',
    '30': 'Podívejte se na Úspěšní lidé/učeň',
    '31': 'Poslouchejte / čtěte příběhy úspěšných',
    '32': 'Dejte pryč to, co chcete jako první',
    '33': 'Udělej To hned Mentalita',
    '34': 'Pečujte o své tělo',
    '35': 'Najděte zlato v nepřízni osudu',
    '36': 'Odstraňte Samskaras z pole',
    '37': 'Převezměte 100% zodpovědnost',
    '38': 'Generátory pole atraktorů',
    '39': 'Připojte se ke klubu, který vás připojí ke zdroji energie',
    '40': 'Žijte život s uváženým záměrem – buďte v přítomném čase',
    '1a': 'koho posloucháš?',
    '1b': 'Index učenlivosti',
    '1c': 'Škála tréninkové rovnováhy',
    '1d': 'Nevědomá kompetence',
    '19a': 'Čtěte knihy',
    '19b': 'Poslouchejte audio',
    '19c': 'Účast na akcích (měsíčně)',
    '19d': 'Dávejte a přijímejte uznání / rozšířené zlaté pravidlo',
    '19e': 'Rozvíjejte vztahy s podobně smýšlejícími lidmi',
    '23a': 'Peněžní procesy',
    '23b': 'Vztahové procesy',
    '23c': 'Procesy vedení',
    '23d': 'Komunikační procesy',
    '23e': 'Zdravotní procesy',
    '23f': 'Procesy duchovního uvědomění',
    '23g': 'Procesy snů',
    '23h': 'Organizace a procesy zaměření'
  }
};

export default cs;

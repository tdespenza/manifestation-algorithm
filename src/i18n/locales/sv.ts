/**
 * Auto-converted locale module for sv.
 */
import type { Messages } from './en';

const sv: Messages = {
  nav: {
    questionnaire: 'Frågeformulär',
    history: 'Historia',
    settings: 'Inställningar'
  },
  app: {
    name: 'Manifestationsalgoritm',
    unexpectedError: 'Ett oväntat fel inträffade.'
  },
  home: {
    subtitle: 'Betygsätt varje område i ditt liv – upptäck din anpassningspoäng'
  },
  dashboard: {
    title: 'Manifestationsalgoritm spårningshistorik',
    subtitle: 'Spåra dina framsteg över tiden',
    loading: 'Laddar din historik...',
    noData: 'Inga uppgifter för denna period',
    progressTrend: 'Framstegstrend',
    progressToGoal: 'Framsteg mot mål',
    ofGoal: '{pct} % av målet',
    goalReached: '🎯 Målet uppnått!',
    categoryBreakdown: 'Kategorifördelning',
    noSessionsRange: 'Inga sessioner i det här intervallet',
    tryWiderRange: 'Prova ett bredare sortiment eller välj en annan period.',
    noSessionsYet: 'Inga sessioner än',
    completeFirst: 'Gör din första bedömning för att se dina framsteg och trender här.',
    startFirst: 'Starta första bedömningen',
    export: {
      date: 'Datum',
      time: 'Tid',
      totalScore: 'Totalt resultat',
      duration: 'Varaktighet (min)',
      notes: 'Anteckningar'
    }
  },
  stats: {
    averageScore: 'Genomsnittlig poäng',
    medianScore: 'Medianpoäng',
    highestScore: 'Högsta poäng',
    totalSessions: 'Totalt antal sessioner'
  },
  network: {
    rankings: 'Nätverksranking',
    searchingPeers: 'Söker efter kamrater...',
    searching: 'Söker...',
    online: 'Online',
    peers: '{count} jämnåriga',
    results: '{count} resultat',
    avgShort: 'Genomsnittlig',
    p90Short: 'P90',
    averageScoreTitle: 'Genomsnittlig poäng',
    percentile90Title: '90:e percentilen',
    globalAverage: 'Globalt genomsnitt',
    percentile90: '90:e percentilen',
    manifestations: 'Manifestationer',
    activePeers: 'Aktiva kamrater',
    categoryRankings: 'Kategori Ranking'
  },
  focusAreas: {
    title: 'Fokusområden',
    subtitle: 'Dina tre kategorier med lägst poäng – att förbättra dessa ger de största vinsterna.',
    empty: 'Genomför fler sessioner för att se personliga rekommendationer för fokusområden.'
  },
  sessions: {
    recent: 'Senaste sessioner',
    deselectAll: 'Avmarkera alla',
    selectAll: 'Välj Alla',
    deleteCount: 'Ta bort {count}',
    cancel: 'Avbryt',
    select: 'Välj',
    deleting: 'Tar bort...'
  },
  settings: {
    title: 'Appinställningar',
    close: 'Stäng inställningarna',
    dataManagement: 'Datahantering',
    saveLastSession: 'Spara senaste session',
    saveLastSessionDesc: 'Fyll i svaren från din senast avslutade session.',
    resetProgress: 'Återställ förlopp',
    resetProgressDesc: 'Radera alla sparade svar och börja om.',
    goals: 'Mål',
    targetScore: 'Målpoäng',
    targetScoreDesc:
      'Sätt en målpoäng (1 000–10 000) för att spåra dina framsteg på instrumentpanelen.',
    set: 'Ställ in',
    clearGoal: 'Rensa',
    currentTarget: 'Nuvarande mål:',
    on: 'På',
    off: 'Av',
    version: 'Manifestationsalgoritm {version}',
    clearAllAnswers: 'Rensa alla svar',
    clearConfirmTitle: 'Rensa alla svar',
    clearConfirmMessage:
      'Detta kommer att radera alla dina nuvarande svar permanent och kan inte ångras.',
    clearConfirmLabel: 'Rensa',
    keepAnswers: 'Behåll svar',
    language: 'Språk',
    languageDesc: 'Välj visningsspråk för applikationen.',
    languageCount: '{count} tillgängliga språk',
    goalErrorRange: 'Vänligen ange en poäng mellan 1 000 och 10 000.'
  },
  questionnaire: {
    saving: 'Sparar...',
    saved: 'Sparad',
    progressText: '{pct}% klar ({answered}/{total})',
    progressAria: 'Bedömningens slutförande framsteg',
    maxScore: 'Max: {score}',
    answerToScore: 'Svar på poäng',
    currentScore: 'Aktuell poäng',
    scrollAll: 'Bläddra alla',
    stepByStep: 'Steg för steg',
    questionOf: 'Fråga {current} av {total}',
    previous: '← Föregående',
    next: 'Nästa →',
    completeAssessment: 'Fullständig bedömning',
    startFresh: 'Vill du börja om på nytt?',
    resetAllAnswers: 'Återställ alla svar',
    resetTitle: 'Återställa alla svar?',
    resetMessage:
      'Detta kommer att rensa alla svar och börja om från början. Detta kan inte ångras.',
    resetLabel: 'Återställ',
    scoreQuality: {
      notStarted: 'Inte startat',
      manifesting: 'Manifesterande ❆',
      aligned: 'Justerad',
      building: 'Byggnad',
      startingOut: 'Börjar ut'
    },
    submitHint: {
      zero: '0 av {total} frågor besvarade — obesvarade frågor som standard till minimum',
      partial:
        '{remaining} fråga kvar — obesvarade frågor standard till minimum | {remaining} frågor kvar — obesvarade frågor som standard är minimum',
      complete: 'Alla frågor besvarade - redo att skickas!'
    },
    submitTitle: {
      zero: 'Svara på några frågor för att slutföra din bedömning',
      partial: '{remaining} fråga kvar | {remaining} frågor kvar',
      complete: 'Skicka in din genomförda bedömning'
    },
    submitError: 'Det gick inte att spara sessionen: {error}',
    dotTitle: 'Fråga {index}',
    dotAria: 'Gå till fråga {index}',
    keyboardHint: 'Tips: Använd ← → för att navigera · 1–9 / 0 för att betygsätta'
  },
  onboarding: {
    step0Title: 'Välkommen till Manifestationsalgoritmen',
    step0Body1:
      'Det här verktyget hjälper dig att mäta hur anpassade ditt tänkesätt, vanor och dagliga handlingar är för att uppnå dina mål. Svara ärligt på varje fråga för att få din nuvarande poäng.',
    step0Body2:
      'Fyll i frågeformuläret med jämna mellanrum för att följa din tillväxt över tid och se vilka områden som behöver mest uppmärksamhet.',
    step1Title: 'Hur poängsättning fungerar',
    step1Body:
      'Varje fråga är värd ett visst antal poäng. Betygsätt dig själv på en skala från 1–10 för varje fråga. Ett betyg på 10 betyder att du fullt ut förkroppsligar den principen; 1 betyder att du inte har börjat.',
    step1TargetHint: '🎯 Mål: {target} | Max: {maximum}',
    excellent: 'Utmärkt',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Stark anpassning – fortsätt',
    good: 'Bra',
    goodRange: '4 001 – 7 000',
    goodNote: 'Solid grund – utrymme att växa',
    needsWork: 'Behöver arbete',
    needsWorkRange: '0 – 4 000',
    needsWorkNote: 'Fokusera på grunderna först',
    step2Title: 'Din data förblir privat',
    step2Body1:
      'Alla dina svar och poänghistorik lagras lokalt på din enhet med hjälp av en krypterad SQLite-databas. Ingenting skickas till någon server utan ditt uttryckliga tillstånd.',
    step2Body2:
      'Den valfria peer-to-peer-delningsfunktionen låter dig se anonymiserade sammanlagda poäng från andra användare. Den delar bara en kryptografiskt signerad sammanfattning - aldrig dina individuella svar.',
    readyText: 'Redo? Låt oss få din baslinjepoäng.',
    skipIntro: 'Hoppa över introt',
    next: 'Nästa',
    getStarted: 'Kom igång'
  },
  sharing: {
    title: 'Anonym nätverksdelning',
    privacyFirst: '🔒 Sekretess-först',
    description:
      'Eventuellt bidra med dina resultat anonymt till det globala nätverket. Inget namn, e-post, IP-adress eller enhets-ID delas någonsin.',
    enabled: 'Delning aktiverad – bidrar till nätverket',
    disabled: 'Delning inaktiverad (standard)',
    activeBadge: '✓ Dina anonymiserade poäng delas med kamrater',
    enableNote: 'Aktivera för att se din percentilrankning jämfört med det globala nätverket.'
  },
  category: {
    back: '‹ Tillbaka',
    history: 'Historia',
    date: 'Datum',
    score: 'Betyg',
    loading: 'Laddar...',
    notEnoughData: 'Inte tillräckligt med data',
    noData: 'Ingen data hittades för "{category}".',
    goToDashboard: 'Gå till Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Visa helskärm',
    exitFullscreen: 'Avsluta helskärm',
    copyChart: 'Kopiera diagram',
    exportChart: 'Exportera diagram',
    exportDefault: '⬇ Exportera',
    exportExcel: '📊 Exportera Excel',
    exportCsv: '📄 Exportera CSV',
    exportPdf: '📑 Exportera PDF',
    exportHtml: '🌐 Exportera HTML',
    copied: 'Diagrammet har kopierats till urklipp',
    copyFailed: 'Kopieringen misslyckades — Urklipp är inte tillgängligt',
    saveCancelled: 'Spara avbröts'
  },
  resume: {
    continueLastSession: 'Fortsätta från senaste sessionen?',
    welcomeBack: 'Välkommen tillbaka!',
    historicalBody:
      'Dina svar från din senaste avslutade session har laddats i förväg. Skulle du vilja behålla dessa värderingar som utgångspunkt, eller börja med ett helt tomt frågeformulär?',
    activeBody:
      'Du har en session på gång. Vill du fortsätta där du slutade eller påbörja en ny bedömning?',
    clearWarning: '⚠️ Detta rensar alla aktuella svar. Är du säker?',
    yesStartFresh: 'Ja, börja på nytt',
    cancel: 'Avbryt',
    keepLastValues: 'Behåll senaste värden',
    resumeSession: 'Återuppta session',
    startFresh: 'Börja på nytt'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Låg',
    high: 'Hög',
    rateAria: 'Betygsätt {question}'
  },
  dateRange: {
    rangeLabel: 'Räckvidd:',
    startDate: 'Startdatum',
    endDate: 'Slutdatum',
    presets: {
      '7d': '7 dagar',
      '30d': '30 dagar',
      '90d': '90 dagar',
      '1y': '1 år',
      all: 'Hela tiden',
      custom: 'Anpassad'
    }
  },
  update: {
    availableTitle: 'v{version} är tillgänglig!',
    releaseNotesFallback: 'Besök releasesidan för att ladda ner den senaste versionen.',
    getUpdate: 'Få uppdatering',
    dismiss: 'Avvisa'
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

export default sv;

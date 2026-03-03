/**
 * Auto-converted locale module for da.
 */
import type { Messages } from './en';

const da: Messages = {
  nav: {
    questionnaire: 'Spørgeskema',
    history: 'Historie',
    settings: 'Indstillinger'
  },
  app: {
    name: 'Manifestationsalgoritme',
    unexpectedError: 'Der opstod en uventet fejl.'
  },
  home: {
    subtitle: 'Bedøm hvert område af dit liv - opdag din tilpasningsscore'
  },
  dashboard: {
    title: 'Manifestationsalgoritme Sporingshistorik',
    subtitle: 'Følg dine fremskridt over tid',
    loading: 'Indlæser din historik...',
    noData: 'Ingen data for denne periode',
    progressTrend: 'Fremskridtstendens',
    progressToGoal: 'Fremskridt til mål',
    ofGoal: '{pct}% af målet',
    goalReached: '🎯 Målet er nået!',
    categoryBreakdown: 'Kategoriopdeling',
    noSessionsRange: 'Ingen sessioner i dette interval',
    tryWiderRange: 'Prøv et bredere udvalg, eller vælg en anden periode.',
    noSessionsYet: 'Ingen sessioner endnu',
    completeFirst: 'Gennemfør din første vurdering for at se dine fremskridt og tendenser her.',
    startFirst: 'Start første vurdering',
    export: {
      date: 'Dato',
      time: 'Tid',
      totalScore: 'Samlet score',
      duration: 'Varighed (min)',
      notes: 'Noter'
    }
  },
  stats: {
    averageScore: 'Gennemsnitlig score',
    medianScore: 'Median score',
    highestScore: 'Højeste score',
    totalSessions: 'Samlede sessioner'
  },
  network: {
    rankings: 'Netværksrangeringer',
    searchingPeers: 'Søger efter jævnaldrende...',
    searching: 'Søger...',
    online: 'Online',
    peers: '{count} jævnaldrende',
    results: '{count} resultater',
    avgShort: 'Gns',
    p90Short: 'P90',
    averageScoreTitle: 'Gennemsnitlig score',
    percentile90Title: '90. Percentil',
    globalAverage: 'Globalt gennemsnit',
    percentile90: '90. Percentil',
    manifestations: 'Manifestationer',
    activePeers: 'Aktive jævnaldrende',
    categoryRankings: 'Kategori rangeringer'
  },
  focusAreas: {
    title: 'Fokusområder',
    subtitle:
      'Dine 3 kategorier med lavest score – forbedring af disse giver de største gevinster.',
    empty: 'Gennemfør flere sessioner for at se personlige anbefalinger til fokusområder.'
  },
  sessions: {
    recent: 'Seneste sessioner',
    deselectAll: 'Fravælg Alle',
    selectAll: 'Vælg alle',
    deleteCount: 'Slet {count}',
    cancel: 'Annuller',
    select: 'Vælg',
    deleting: 'Sletter...'
  },
  settings: {
    title: 'App-indstillinger',
    close: 'Luk indstillinger',
    dataManagement: 'Data Management',
    saveLastSession: 'Gem sidste session',
    saveLastSessionDesc: 'Forudfyld svar fra din seneste afsluttede session.',
    resetProgress: 'Nulstil fremskridt',
    resetProgressDesc: 'Slet alle gemte svar og start på en frisk.',
    goals: 'Mål',
    targetScore: 'Målscore',
    targetScoreDesc:
      'Indstil en målscore (1.000–10.000) for at spore dine fremskridt på dashboardet.',
    set: 'Sæt',
    clearGoal: 'Ryd',
    currentTarget: 'Nuværende mål:',
    on: 'På',
    off: 'Fra',
    version: 'Manifestationsalgoritme {version}',
    clearAllAnswers: 'Ryd alle svar',
    clearConfirmTitle: 'Ryd alle svar',
    clearConfirmMessage:
      'Dette vil permanent slette alle dine nuværende svar og kan ikke fortrydes.',
    clearConfirmLabel: 'Ryd',
    keepAnswers: 'Behold svar',
    language: 'Sprog',
    languageDesc: 'Vælg visningssproget for applikationen.',
    languageCount: '{count} tilgængelige sprog',
    goalErrorRange: 'Indtast venligst en score mellem 1.000 og 10.000.'
  },
  questionnaire: {
    saving: 'Gemmer...',
    saved: 'Gemt',
    progressText: '{pct}% fuldført ({answered}/{total})',
    progressAria: 'Fremskridt med færdiggørelse af vurdering',
    maxScore: 'Maks.: {score}',
    answerToScore: 'Svar for at score',
    currentScore: 'Nuværende resultat',
    scrollAll: 'Rul alle',
    stepByStep: 'Trin for Trin',
    questionOf: 'Spørgsmål {current} af {total}',
    previous: '← Forrige',
    next: 'Næste →',
    completeAssessment: 'Fuldstændig vurdering',
    startFresh: 'Vil du starte på en frisk?',
    resetAllAnswers: 'Nulstil alle svar',
    resetTitle: 'Vil du nulstille alle svar?',
    resetMessage: 'Dette vil rydde hvert svar og starte fra bunden. Dette kan ikke fortrydes.',
    resetLabel: 'Nulstil',
    scoreQuality: {
      notStarted: 'Ikke startet',
      manifesting: 'Manifesterende ❆',
      aligned: 'Justeret',
      building: 'Bygning',
      startingOut: 'Starter ud'
    },
    submitHint: {
      zero: '0 af {total} besvarede spørgsmål — ubesvarede spørgsmål er som standard minimum',
      partial:
        '{remaining} spørgsmål tilbage — ubesvarede spørgsmål standard til minimum | {remaining} tilbageværende spørgsmål — ubesvarede spørgsmål er som standard minimum',
      complete: 'Alle spørgsmål besvaret - klar til at sende!'
    },
    submitTitle: {
      zero: 'Besvar nogle spørgsmål for at fuldføre din vurdering',
      partial: '{remaining} spørgsmål tilbage | {remaining} spørgsmål tilbage',
      complete: 'Indsend din udfyldte vurdering'
    },
    submitError: 'Kunne ikke gemme session: {error}',
    dotTitle: 'Spørgsmål {index}',
    dotAria: 'Gå til spørgsmål {index}',
    keyboardHint: 'Tip: Brug ← → til at navigere · 1–9 / 0 for at bedømme'
  },
  onboarding: {
    step0Title: 'Velkommen til manifestationsalgoritmen',
    step0Body1:
      'Dette værktøj hjælper dig med at måle, hvor afstemt din tankegang, vaner og daglige handlinger er med at nå dine mål. Besvar hvert spørgsmål ærligt for at få din nuværende score.',
    step0Body2:
      'Udfyld spørgeskemaet med jævne mellemrum for at spore din vækst over tid og se, hvilke områder der kræver mest opmærksomhed.',
    step1Title: 'Sådan fungerer scoring',
    step1Body:
      'Hvert spørgsmål er værd et bestemt antal point. Bedøm dig selv på en skala fra 1-10 for hvert spørgsmål. En vurdering på 10 betyder, at du fuldt ud inkorporerer dette princip; 1 betyder, at du ikke er startet.',
    step1TargetHint: '🎯 Mål: {target} | Maksimum: {maximum}',
    excellent: 'Fremragende',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Stærk justering - fortsæt',
    good: 'Godt',
    goodRange: '4.001 – 7.000',
    goodNote: 'Solidt fundament - plads til at vokse',
    needsWork: 'Trænger til arbejde',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Fokuser på grundlæggende først',
    step2Title: 'Dine data forbliver private',
    step2Body1:
      'Alle dine svar og scorehistorik gemmes lokalt på din enhed ved hjælp af en krypteret SQLite-database. Intet sendes til nogen server uden din udtrykkelige tilladelse.',
    step2Body2:
      'Den valgfri peer-to-peer-delingsfunktion giver dig mulighed for at se anonymiserede samlede scores fra andre brugere. Den deler kun et kryptografisk signeret resumé - aldrig dine individuelle svar.',
    readyText: 'Parat? Lad os få din basisscore.',
    skipIntro: 'Spring introen over',
    next: 'Næste',
    getStarted: 'Kom i gang'
  },
  sharing: {
    title: 'Anonym netværksdeling',
    privacyFirst: '🔒 Privatliv-først',
    description:
      'Bidrag eventuelt dine resultater anonymt til det globale netværk. Intet navn, e-mail, IP-adresse eller enheds-id bliver nogensinde delt.',
    enabled: 'Deling aktiveret – bidrager til netværket',
    disabled: 'Deling er deaktiveret (standard)',
    activeBadge: '✓ Dine anonymiserede resultater bliver delt med jævnaldrende',
    enableNote: 'Aktiver for at se din percentilrangering sammenlignet med det globale netværk.'
  },
  category: {
    back: '‹ Tilbage',
    history: 'Historie',
    date: 'Dato',
    score: 'Score',
    loading: 'Indlæser...',
    notEnoughData: 'Ikke nok data',
    noData: 'Ingen data fundet for "{category}".',
    goToDashboard: 'Gå til Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Se fuld skærm',
    exitFullscreen: 'Afslut fuld skærm',
    copyChart: 'Kopier diagram',
    exportChart: 'Eksporter diagram',
    exportDefault: '⬇ Eksporter',
    exportExcel: '📊 Eksporter Excel',
    exportCsv: '📄 Eksporter CSV',
    exportPdf: '📑 Eksporter PDF',
    exportHtml: '🌐 Eksporter HTML',
    copied: 'Diagram kopieret til udklipsholder',
    copyFailed: 'Kopiering mislykkedes — udklipsholder ikke tilgængelig',
    saveCancelled: 'Gem annulleret'
  },
  resume: {
    continueLastSession: 'Vil du fortsætte fra sidste session?',
    welcomeBack: 'Velkommen tilbage!',
    historicalBody:
      'Dine svar fra din sidste afsluttede session er blevet forudindlæst. Vil du gerne beholde disse værdier som udgangspunkt, eller begynde med et helt blankt spørgeskema?',
    activeBody:
      'Du har en session i gang. Kunne du tænke dig at genoptage, hvor du slap, eller starte en ny vurdering?',
    clearWarning: '⚠️ Dette vil rydde alle aktuelle svar. Er du sikker?',
    yesStartFresh: 'Ja, start på en frisk',
    cancel: 'Annuller',
    keepLastValues: 'Hold sidste værdier',
    resumeSession: 'Genoptag session',
    startFresh: 'Start frisk'
  },
  questionItem: {
    pointsSuffix: 'pkt',
    low: 'Lav',
    high: 'Høj',
    rateAria: 'Bedøm {question}'
  },
  dateRange: {
    rangeLabel: 'Rækkevidde:',
    startDate: 'Startdato',
    endDate: 'Slutdato',
    presets: {
      '7d': '7 dage',
      '30d': '30 dage',
      '90d': '90 dage',
      '1y': '1 år',
      all: 'Alle Tider',
      custom: 'Brugerdefineret'
    }
  },
  update: {
    availableTitle: 'v{version} er tilgængelig!',
    releaseNotesFallback: 'Besøg udgivelsessiden for at downloade den seneste version.',
    getUpdate: 'Få opdatering',
    dismiss: 'Afvis'
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

export default da;

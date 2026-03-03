/**
 * Auto-converted locale module for no.
 */
import type { Messages } from './en';

const no: Messages = {
  nav: {
    questionnaire: 'Spørreskjema',
    history: 'Historie',
    settings: 'Innstillinger'
  },
  app: {
    name: 'Manifestasjonsalgoritme',
    unexpectedError: 'Det oppstod en uventet feil.'
  },
  home: {
    subtitle: 'Vurder hvert område av livet ditt – oppdag justeringspoengsummen din'
  },
  dashboard: {
    title: 'Manifestasjonsalgoritmesporingshistorikk',
    subtitle: 'Følg fremgangen din over tid',
    loading: 'Laster inn loggen din …',
    noData: 'Ingen data for denne perioden',
    progressTrend: 'Fremdriftstrend',
    progressToGoal: 'Fremgang til mål',
    ofGoal: '{pct} % av målet',
    goalReached: '🎯 Målet nådd!',
    categoryBreakdown: 'Kategorioppdeling',
    noSessionsRange: 'Ingen økter i dette området',
    tryWiderRange: 'Prøv et bredere utvalg eller velg en annen periode.',
    noSessionsYet: 'Ingen økter ennå',
    completeFirst: 'Fullfør din første vurdering for å se fremgangen og trendene dine her.',
    startFirst: 'Start første vurdering',
    export: {
      date: 'Dato',
      time: 'Tid',
      totalScore: 'Totalscore',
      duration: 'Varighet (min)',
      notes: 'Notater'
    }
  },
  stats: {
    averageScore: 'Gjennomsnittlig poengsum',
    medianScore: 'Median poengsum',
    highestScore: 'Høyeste poengsum',
    totalSessions: 'Totalt antall økter'
  },
  network: {
    rankings: 'Nettverksrangeringer',
    searchingPeers: 'Søker etter jevnaldrende...',
    searching: 'Søker...',
    online: 'Online',
    peers: '{count} jevnaldrende',
    results: '{count} resultater',
    avgShort: 'Gj.sn',
    p90Short: 'P90',
    averageScoreTitle: 'Gjennomsnittlig poengsum',
    percentile90Title: '90. persentil',
    globalAverage: 'Globalt gjennomsnitt',
    percentile90: '90. persentil',
    manifestations: 'Manifestasjoner',
    activePeers: 'Aktive jevnaldrende',
    categoryRankings: 'Kategorirangeringer'
  },
  focusAreas: {
    title: 'Fokusområder',
    subtitle:
      'De tre kategoriene med lavest poengsum – forbedring av disse gir de største gevinstene.',
    empty: 'Gjennomfør flere økter for å se personlig tilpassede fokusområdeanbefalinger.'
  },
  sessions: {
    recent: 'Nylige økter',
    deselectAll: 'Fjern merket for Alle',
    selectAll: 'Velg alle',
    deleteCount: 'Slett {count}',
    cancel: 'Avbryt',
    select: 'Velg',
    deleting: 'Sletter …'
  },
  settings: {
    title: 'Appinnstillinger',
    close: 'Lukk innstillingene',
    dataManagement: 'Databehandling',
    saveLastSession: 'Lagre siste økt',
    saveLastSessionDesc: 'Forhåndsutfyll svar fra den siste økten du har fullført.',
    resetProgress: 'Tilbakestill fremdrift',
    resetProgressDesc: 'Slett alle lagrede svar og start på nytt.',
    goals: 'Mål',
    targetScore: 'Målscore',
    targetScoreDesc: 'Sett en målscore (1 000–10 000) for å spore fremgangen din på dashbordet.',
    set: 'Sett',
    clearGoal: 'Klart',
    currentTarget: 'Nåværende mål:',
    on: 'På',
    off: 'Av',
    version: 'Manifestasjonsalgoritme {version}',
    clearAllAnswers: 'Fjern alle svar',
    clearConfirmTitle: 'Fjern alle svar',
    clearConfirmMessage: 'Dette vil slette alle dine nåværende svar permanent og kan ikke angres.',
    clearConfirmLabel: 'Klart',
    keepAnswers: 'Behold svar',
    language: 'Språk',
    languageDesc: 'Velg visningsspråket for applikasjonen.',
    languageCount: '{count} språk tilgjengelig',
    goalErrorRange: 'Vennligst skriv inn en poengsum mellom 1 000 og 10 000.'
  },
  questionnaire: {
    saving: 'Lagrer...',
    saved: 'Lagret',
    progressText: '{pct}% fullført ({answered}/{total})',
    progressAria: 'Vurderingsfremdrift',
    maxScore: 'Maks: {score}',
    answerToScore: 'Svar for å score',
    currentScore: 'Gjeldende resultat',
    scrollAll: 'Rull alle',
    stepByStep: 'Trinn for trinn',
    questionOf: 'Spørsmål {current} av {total}',
    previous: '← Forrige',
    next: 'Neste →',
    completeAssessment: 'Fullstendig vurdering',
    startFresh: 'Vil du starte på nytt?',
    resetAllAnswers: 'Tilbakestill alle svar',
    resetTitle: 'Tilbakestille alle svar?',
    resetMessage: 'Dette vil fjerne hvert svar og starte fra bunnen av. Dette kan ikke angres.',
    resetLabel: 'Tilbakestill',
    scoreQuality: {
      notStarted: 'Ikke startet',
      manifesting: 'Manifesterende ❆',
      aligned: 'Justert',
      building: 'Bygning',
      startingOut: 'Starter ut'
    },
    submitHint: {
      zero: '0 av {total} spørsmål besvart — ubesvarte spørsmål er standard til minimum',
      partial:
        '{remaining} spørsmål gjenstår — ubesvarte spørsmål standard til minimum | {remaining} gjenværende spørsmål — ubesvarte spørsmål er standard til minimum',
      complete: 'Alle spørsmål besvart - klar til å sende inn!'
    },
    submitTitle: {
      zero: 'Svar på noen spørsmål for å fullføre vurderingen',
      partial: '{remaining} gjenstår spørsmål | {remaining} gjenstår spørsmål',
      complete: 'Send inn din fullførte vurdering'
    },
    submitError: 'Kunne ikke lagre økten: {error}',
    dotTitle: 'Spørsmål {index}',
    dotAria: 'Gå til spørsmål {index}',
    keyboardHint: 'Tips: Bruk ← → for å navigere · 1–9 / 0 for å rangere'
  },
  onboarding: {
    step0Title: 'Velkommen til manifestasjonsalgoritmen',
    step0Body1:
      'Dette verktøyet hjelper deg med å måle hvordan tankesett, vaner og daglige handlinger er i samsvar med å nå målene dine. Svar ærlig på hvert spørsmål for å få din nåværende poengsum.',
    step0Body2:
      'Fyll ut spørreskjemaet med jevne mellomrom for å spore veksten din over tid og se hvilke områder som trenger mest oppmerksomhet.',
    step1Title: 'Hvordan score fungerer',
    step1Body:
      'Hvert spørsmål er verdt et bestemt antall poeng. Vurder deg selv på en skala fra 1–10 for hvert spørsmål. En vurdering på 10 betyr at du fullt ut legemliggjør dette prinsippet; 1 betyr at du ikke har startet.',
    step1TargetHint: '🎯 Mål: {target} | Maksimum: {maximum}',
    excellent: 'Utmerket',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Sterk justering - fortsett',
    good: 'Bra',
    goodRange: '4 001 – 7 000',
    goodNote: 'Solid fundament – plass til å vokse',
    needsWork: 'Trenger arbeid',
    needsWorkRange: '0 – 4000',
    needsWorkNote: 'Fokuser på grunnleggende først',
    step2Title: 'Dine data forblir private',
    step2Body1:
      'Alle svarene og poenghistorikken dine lagres lokalt på enheten din ved hjelp av en kryptert SQLite-database. Ingenting sendes til noen server uten din eksplisitte tillatelse.',
    step2Body2:
      'Den valgfrie peer-to-peer-delingsfunksjonen lar deg se anonymiserte samlede poengsummer fra andre brukere. Den deler bare et kryptografisk signert sammendrag - aldri dine individuelle svar.',
    readyText: 'Ferdig? La oss få din grunnlinjepoengsum.',
    skipIntro: 'Hopp over introen',
    next: 'Neste',
    getStarted: 'Kom i gang'
  },
  sharing: {
    title: 'Anonym nettverksdeling',
    privacyFirst: '🔒 Personvern-først',
    description:
      'Bidra eventuelt med resultatene dine anonymt til det globale nettverket. Ingen navn, e-post, IP-adresse eller enhets-ID blir noen gang delt.',
    enabled: 'Deling aktivert – bidrar til nettverket',
    disabled: 'Deling er deaktivert (standard)',
    activeBadge: '✓ Dine anonymiserte poengsum blir delt med jevnaldrende',
    enableNote: 'Aktiver for å se prosentilrangeringen din sammenlignet med det globale nettverket.'
  },
  category: {
    back: '‹ Tilbake',
    history: 'Historie',
    date: 'Dato',
    score: 'Score',
    loading: 'Laster inn...',
    notEnoughData: 'Ikke nok data',
    noData: 'Ingen data funnet for "{category}".',
    goToDashboard: 'Gå til Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Se fullskjerm',
    exitFullscreen: 'Avslutt fullskjerm',
    copyChart: 'Kopier diagram',
    exportChart: 'Eksporter diagram',
    exportDefault: '⬇ Eksporter',
    exportExcel: '📊 Eksporter Excel',
    exportCsv: '📄 Eksporter CSV',
    exportPdf: '📑 Eksporter PDF',
    exportHtml: '🌐 Eksporter HTML',
    copied: 'Diagrammet er kopiert til utklippstavlen',
    copyFailed: 'Kopiering mislyktes – utklippstavlen er ikke tilgjengelig',
    saveCancelled: 'Lagring avbrutt'
  },
  resume: {
    continueLastSession: 'Vil du fortsette fra forrige økt?',
    welcomeBack: 'Velkommen tilbake!',
    historicalBody:
      'Svarene dine fra den siste fullførte økten er forhåndslastet. Vil du beholde disse verdiene som utgangspunkt, eller begynne med et helt blankt spørreskjema?',
    activeBody:
      'Du har en økt på gang. Vil du fortsette der du slapp, eller starte en ny vurdering?',
    clearWarning: '⚠️ Dette sletter alle gjeldende svar. Er du sikker?',
    yesStartFresh: 'Ja, start på nytt',
    cancel: 'Avbryt',
    keepLastValues: 'Hold siste verdier',
    resumeSession: 'Gjenoppta økten',
    startFresh: 'Start på nytt'
  },
  questionItem: {
    pointsSuffix: 'pkt',
    low: 'Lavt',
    high: 'Høy',
    rateAria: 'Vurder {question}'
  },
  dateRange: {
    rangeLabel: 'Område:',
    startDate: 'Startdato',
    endDate: 'Sluttdato',
    presets: {
      '7d': '7 dager',
      '30d': '30 dager',
      '90d': '90 dager',
      '1y': '1 år',
      all: 'Hele tiden',
      custom: 'Egendefinert'
    }
  },
  update: {
    availableTitle: 'v{version} er tilgjengelig!',
    releaseNotesFallback: 'Besøk utgivelsessiden for å laste ned den nyeste versjonen.',
    getUpdate: 'Få oppdatering',
    dismiss: 'Avvis'
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

export default no;

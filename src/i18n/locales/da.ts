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
    '1': 'Mestre det grundlæggende',
    '2': 'Aktiver og belys ord',
    '3': 'Find smerte og kontraher energi',
    '4': 'Definer, hvad du ønsker',
    '5': 'Skriv ned, hvad du vil',
    '6': 'Del ikke din drøm med andre',
    '7': 'Få et brændende ønske om dit mål',
    '8': 'Målet skal være i Sweet Spot',
    '9': 'Træf en beslutning',
    '10': 'Se/Føl dig godt i besiddelse af dit mål',
    '11': 'Slip vedhæftet fil til resultatet',
    '12': 'Tillad HVORDAN at præsentere sig selv',
    '13': 'Kend forskellen mellem Dream & Chief Aim',
    '14': 'Vær fokuseret / målrettethed',
    '15': 'Daglig TO DO liste over prioriteter',
    '16': 'Diagram Fremskridt / Kend resultatet',
    '17': 'Brug Momentum Cycle of Success',
    '18': 'Drømmebyg - Drømmebog og visionsboard',
    '19': 'Tilslut systemet',
    '20': 'Videnskab om personlig mestring',
    '21': 'Pas på de ord, du taler – det, du siger, er, hvad du får',
    '22': 'Fysiologi / Klæd dig til succes',
    '23': 'Klare modintentioner',
    '24': 'Væk din indre kraft: superkraftprocesser',
    '25': 'Udsendes på Alpha-theta brainwave',
    '26': 'Stop med at fortælle din historie om ve',
    '27': 'Vis påskønnelse/taknemmelighed',
    '28': 'Erstat fiaskovaner med succesvaner (acceleratorprocesser)',
    '29': 'Skab en Mastermind',
    '30': 'Se succesrige mennesker/lærling',
    '31': 'Lyt til/læs succeshistorier',
    '32': 'Giv det væk, du vil have først',
    '33': 'Gør det nu-mentalitet',
    '34': 'Pas på din krop',
    '35': 'Find guldet i modgang',
    '36': 'Fjern Samskaras fra Field',
    '37': 'Tag 100 % ansvar',
    '38': 'Attraktor feltgeneratorer',
    '39': 'Tilmeld dig en klub, der forbinder dig med en strømkilde',
    '40': 'Lev livet med bevidst hensigt - vær i nutiden',
    '1a': 'Hvem lytter du til?',
    '1b': 'Lærbarhedsindeks',
    '1c': 'Træningsbalanceskala',
    '1d': 'Ubevidst kompetence',
    '19a': 'Læs bøger',
    '19b': 'Lyt til lyd',
    '19c': 'Deltag i arrangementer (månedligt)',
    '19d': 'Giv og modtag anerkendelse / udvidet gyldne regel',
    '19e': 'Udvikle relationer med ligesindede',
    '23a': 'Pengeprocesser',
    '23b': 'Relationsprocesser',
    '23c': 'Ledelsesprocesser',
    '23d': 'Kommunikationsprocesser',
    '23e': 'Sundhedsprocesser',
    '23f': 'Åndelige bevidsthedsprocesser',
    '23g': 'Drømmeprocesser',
    '23h': 'Organisation & fokusprocesser'
  }
};

export default da;

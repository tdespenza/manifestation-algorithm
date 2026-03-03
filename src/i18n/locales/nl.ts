/**
 * Auto-converted locale module for nl.
 */
import type { Messages } from './en';

const nl: Messages = {
  nav: {
    questionnaire: 'Vragenlijst',
    history: 'Geschiedenis',
    settings: 'Instellingen'
  },
  app: {
    name: 'Manifestatie-algoritme',
    unexpectedError: 'Er is een onverwachte fout opgetreden.'
  },
  home: {
    subtitle: 'Beoordeel elk gebied van uw leven - ontdek uw afstemmingsscore'
  },
  dashboard: {
    title: 'Manifestatie-algoritme Volggeschiedenis',
    subtitle: 'Volg uw voortgang in de loop van de tijd',
    loading: 'Je geschiedenis laden…',
    noData: 'Geen gegevens voor deze periode',
    progressTrend: 'Vooruitgangstrend',
    progressToGoal: 'Vooruitgang naar doel',
    ofGoal: '{pct}% van doel',
    goalReached: '🎯Doel bereikt!',
    categoryBreakdown: 'Categorie-uitsplitsing',
    noSessionsRange: 'Geen sessies in dit bereik',
    tryWiderRange: 'Probeer een ruimer assortiment of kies een andere periode.',
    noSessionsYet: 'Nog geen sessies',
    completeFirst: 'Voltooi uw eerste beoordeling om hier uw voortgang en trends te zien.',
    startFirst: 'Start eerste beoordeling',
    export: {
      date: 'Datum',
      time: 'Tijd',
      totalScore: 'Totaalscore',
      duration: 'Duur (min)',
      notes: 'Opmerkingen'
    }
  },
  stats: {
    averageScore: 'Gemiddelde score',
    medianScore: 'Mediane score',
    highestScore: 'Hoogste score',
    totalSessions: 'Totaal aantal sessies'
  },
  network: {
    rankings: 'Netwerkranglijsten',
    searchingPeers: "Op zoek naar collega's...",
    searching: 'Zoeken...',
    online: 'Online',
    peers: "{count} collega's",
    results: '{count} resultaten',
    avgShort: 'Gem',
    p90Short: 'P90',
    averageScoreTitle: 'Gemiddelde score',
    percentile90Title: '90e percentiel',
    globalAverage: 'Mondiaal gemiddelde',
    percentile90: '90e percentiel',
    manifestations: 'Manifestaties',
    activePeers: "Actieve collega's",
    categoryRankings: 'Categorieranglijsten'
  },
  focusAreas: {
    title: 'Aandachtsgebieden',
    subtitle:
      'Uw drie laagst scorende categorieën: het verbeteren hiervan zorgt voor de grootste winst.',
    empty: 'Voltooi meer sessies om gepersonaliseerde aanbevelingen voor aandachtsgebieden te zien.'
  },
  sessions: {
    recent: 'Recente sessies',
    deselectAll: 'Deselecteer Alles',
    selectAll: 'Selecteer Alles',
    deleteCount: 'Verwijder {count}',
    cancel: 'Annuleer',
    select: 'Selecteer',
    deleting: 'Verwijderen…'
  },
  settings: {
    title: 'App-instellingen',
    close: 'Instellingen sluiten',
    dataManagement: 'Gegevensbeheer',
    saveLastSession: 'Bewaar laatste sessie',
    saveLastSessionDesc: 'Vul de antwoorden van uw meest recent voltooide sessie vooraf in.',
    resetProgress: 'Voortgang resetten',
    resetProgressDesc: 'Verwijder alle opgeslagen antwoorden en begin opnieuw.',
    goals: 'Doelen',
    targetScore: 'Doelscore',
    targetScoreDesc:
      'Stel een doelscore in (1.000–10.000) om uw voortgang op het dashboard bij te houden.',
    set: 'Instellen',
    clearGoal: 'Duidelijk',
    currentTarget: 'Huidig doel:',
    on: 'Aan',
    off: 'Uit',
    version: 'Manifestatie-algoritme {version}',
    clearAllAnswers: 'Wis alle antwoorden',
    clearConfirmTitle: 'Wis alle antwoorden',
    clearConfirmMessage:
      'Hiermee worden al uw huidige antwoorden definitief verwijderd. Dit kan niet ongedaan worden gemaakt.',
    clearConfirmLabel: 'Duidelijk',
    keepAnswers: 'Bewaar antwoorden',
    language: 'Taal',
    languageDesc: 'Kies de weergavetaal voor de toepassing.',
    languageCount: '{count} talen beschikbaar',
    goalErrorRange: 'Geef een score tussen 1.000 en 10.000 op.'
  },
  questionnaire: {
    saving: 'Opslaan...',
    saved: 'Opgeslagen',
    progressText: '{pct}% voltooid ({answered}/{total})',
    progressAria: 'Voortgang voltooiing beoordeling',
    maxScore: 'Maximaal: {score}',
    answerToScore: 'Antwoord om te scoren',
    currentScore: 'Huidige score',
    scrollAll: 'Blader door Alles',
    stepByStep: 'Stap voor stap',
    questionOf: 'Vraag {current} van {total}',
    previous: '← Vorige',
    next: 'Volgende →',
    completeAssessment: 'Volledige beoordeling',
    startFresh: 'Wil je opnieuw beginnen?',
    resetAllAnswers: 'Reset alle antwoorden',
    resetTitle: 'Alle antwoorden resetten?',
    resetMessage:
      'Hiermee wordt elk antwoord gewist en begint u helemaal opnieuw. Dit kan niet ongedaan worden gemaakt.',
    resetLabel: 'Opnieuw instellen',
    scoreQuality: {
      notStarted: 'Niet gestart',
      manifesting: 'Manifesteren ❆',
      aligned: 'Uitgelijnd',
      building: 'Gebouw',
      startingOut: 'Beginnen'
    },
    submitHint: {
      zero: '0 van {total} vragen beantwoord — onbeantwoorde vragen staan standaard op het minimum',
      partial:
        '{remaining} resterende vraag — onbeantwoorde vragen zijn standaard ingesteld op minimum | {remaining} resterende vragen: onbeantwoorde vragen staan standaard op het minimum',
      complete: 'Alle vragen beantwoord - klaar om in te dienen!'
    },
    submitTitle: {
      zero: 'Beantwoord enkele vragen om uw beoordeling te voltooien',
      partial: '{remaining} resterende vraag | {remaining} resterende vragen',
      complete: 'Dien uw ingevulde beoordeling in'
    },
    submitError: 'Kan sessie niet opslaan: {error}',
    dotTitle: 'Vraag {index}',
    dotAria: 'Ga naar vraag {index}',
    keyboardHint: 'Tip: Gebruik ← → om te navigeren · 1–9 / 0 om te beoordelen'
  },
  onboarding: {
    step0Title: 'Welkom bij het Manifestatie-algoritme',
    step0Body1:
      'Met deze tool kunt u meten in hoeverre uw mentaliteit, gewoonten en dagelijkse handelingen afgestemd zijn op het bereiken van uw doelen. Beantwoord elke vraag eerlijk om uw huidige score te krijgen.',
    step0Body2:
      'Vul de vragenlijst regelmatig in om uw groei in de loop van de tijd bij te houden en te zien welke gebieden de meeste aandacht nodig hebben.',
    step1Title: 'Hoe scoren werkt',
    step1Body:
      'Elke vraag is een bepaald aantal punten waard. Beoordeel uzelf op een schaal van 1 tot 10 voor elke vraag. Een beoordeling van 10 betekent dat u dit principe volledig belichaamt; 1 betekent dat je nog niet bent begonnen.',
    step1TargetHint: '🎯 Doel: {target} | Maximaal: {maximum}',
    excellent: 'Uitstekend',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Sterke afstemming – blijf doorgaan',
    good: 'Goed',
    goodRange: '4.001 – 7.000',
    goodNote: 'Solide fundament – ruimte om te groeien',
    needsWork: 'Heeft werk nodig',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Concentreer u eerst op de fundamentele zaken',
    step2Title: 'Uw gegevens blijven privé',
    step2Body1:
      'Al uw antwoorden en scoregeschiedenis worden lokaal op uw apparaat opgeslagen met behulp van een gecodeerde SQLite-database. Er wordt niets naar welke server dan ook verzonden zonder uw uitdrukkelijke toestemming.',
    step2Body2:
      'Met de optionele functie voor peer-to-peer delen kunt u geanonimiseerde totaalscores van andere gebruikers bekijken. Het deelt alleen een cryptografisch ondertekende samenvatting – nooit uw individuele antwoorden.',
    readyText: 'Klaar? Laten we uw basisscore berekenen.',
    skipIntro: 'Intro overslaan',
    next: 'Volgende',
    getStarted: 'Aan de slag'
  },
  sharing: {
    title: 'Anoniem netwerk delen',
    privacyFirst: '🔒 Privacy eerst',
    description:
      'Draag optioneel uw resultaten anoniem bij aan het wereldwijde netwerk. Er wordt nooit een naam, e-mailadres, IP-adres of apparaat-ID gedeeld.',
    enabled: 'Delen ingeschakeld — bijdragen aan netwerk',
    disabled: 'Delen uitgeschakeld (standaard)',
    activeBadge: "✓ Uw geanonimiseerde scores worden gedeeld met collega's",
    enableNote:
      'Schakel dit in om uw percentielrangschikking te zien in vergelijking met het wereldwijde netwerk.'
  },
  category: {
    back: '‹ Terug',
    history: 'Geschiedenis',
    date: 'Datum',
    score: 'Scoren',
    loading: 'Laden...',
    notEnoughData: 'Niet genoeg gegevens',
    noData: 'Geen gegevens gevonden voor “{category}”.',
    goToDashboard: 'Ga naar Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Bekijk volledig scherm',
    exitFullscreen: 'Sluit het volledige scherm af',
    copyChart: 'Kopieer grafiek',
    exportChart: 'Grafiek exporteren',
    exportDefault: '⬇ Exporteren',
    exportExcel: '📊 Excel exporteren',
    exportCsv: '📄 CSV exporteren',
    exportPdf: '📑 PDF exporteren',
    exportHtml: '🌐 HTML exporteren',
    copied: 'Diagram gekopieerd naar klembord',
    copyFailed: 'Kopiëren mislukt: klembord niet beschikbaar',
    saveCancelled: 'Opslaan geannuleerd'
  },
  resume: {
    continueLastSession: 'Doorgaan vanaf de laatste sessie?',
    welcomeBack: 'Welkom terug!',
    historicalBody:
      'Uw antwoorden van uw laatste voltooide sessie zijn vooraf geladen. Wilt u deze waarden als uitgangspunt behouden, of beginnen met een volledig blanco vragenlijst?',
    activeBody:
      'Er is een sessie bezig. Wilt u verdergaan waar u was gebleven of een nieuw assessment starten?',
    clearWarning: '⚠️ Hiermee worden alle huidige antwoorden gewist. Weet je het zeker?',
    yesStartFresh: 'Ja, begin opnieuw',
    cancel: 'Annuleer',
    keepLastValues: 'Bewaar laatste waarden',
    resumeSession: 'Sessie hervatten',
    startFresh: 'Begin fris'
  },
  questionItem: {
    pointsSuffix: 'punten',
    low: 'Laag',
    high: 'Hoog',
    rateAria: 'Beoordeel {question}'
  },
  dateRange: {
    rangeLabel: 'Bereik:',
    startDate: 'Startdatum',
    endDate: 'Einddatum',
    presets: {
      '7d': '7 dagen',
      '30d': '30 dagen',
      '90d': '90 dagen',
      '1y': '1 jaar',
      all: 'Altijd',
      custom: 'Aangepast'
    }
  },
  update: {
    availableTitle: 'v{version} is beschikbaar!',
    releaseNotesFallback: 'Bezoek de releasepagina om de nieuwste versie te downloaden.',
    getUpdate: 'Ontvang updates',
    dismiss: 'Negeren'
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

export default nl;

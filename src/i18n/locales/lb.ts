/**
 * Auto-converted locale module for lb.
 */
import type { Messages } from './en';

const lb: Messages = {
  nav: {
    questionnaire: 'Questionnaire',
    history: 'Geschicht',
    settings: 'Astellungen'
  },
  app: {
    name: 'Manifestatioun Algorithmus',
    unexpectedError: 'En onerwaarte Feeler ass geschitt.'
  },
  home: {
    subtitle: 'Bewäert all Beräich vun Ärem Liewen - entdeckt Är Ausrichtung Score'
  },
  dashboard: {
    title: 'Manifestatioun Algorithmus Tracking Geschicht',
    subtitle: 'Verfollegt Är Fortschrëtter iwwer Zäit',
    loading: 'Luet Är Geschicht ...',
    noData: 'Keng Daten fir dës Period',
    progressTrend: 'Fortschrëtt Trend',
    progressToGoal: 'Fortschrëtter zum Zil',
    ofGoal: '{pct}% vum Zil',
    goalReached: '🎯 Zil erreecht!',
    categoryBreakdown: 'Kategorie Ënnerdeelung',
    noSessionsRange: 'Keng Sessiounen an dësem Beräich',
    tryWiderRange: 'Probéiert eng méi breet Palette oder wielt eng aner Period.',
    noSessionsYet: 'Nach keng Sessiounen',
    completeFirst: 'Fëllt Är éischt Bewäertung aus fir Är Fortschrëtter an Trends hei ze gesinn.',
    startFirst: 'Start Éischt Bewäertung',
    export: {
      date: 'Datum',
      time: 'Zäit',
      totalScore: 'Total Score',
      duration: 'Dauer (min)',
      notes: 'Notizen'
    }
  },
  stats: {
    averageScore: 'Duerchschnëtt Score',
    medianScore: 'Median Score',
    highestScore: 'héchste Score',
    totalSessions: 'Ganzen Sessiounen'
  },
  network: {
    rankings: 'Reseau Rankings',
    searchingPeers: 'Sich no Kollegen ...',
    searching: 'Sichen ...',
    online: 'Online',
    peers: '{count} peers',
    results: '{count} Resultater',
    avgShort: 'Avg',
    p90Short: 'p90',
    averageScoreTitle: 'Duerchschnëtt Score',
    percentile90Title: '90e Prozent',
    globalAverage: 'Global Moyenne',
    percentile90: '90e Prozent',
    manifestations: 'Manifestatiounen',
    activePeers: 'Aktiv Kollegen',
    categoryRankings: 'Kategorie Rankings'
  },
  focusAreas: {
    title: 'Focus Beräicher',
    subtitle:
      "Är 3 Kategorien mat niddregsten Punktzuel - d'Verbesserung vun dësen féiert de gréisste Gewënn.",
    empty: 'Komplett méi Sessiounen fir personaliséiert Fokusberäich Empfehlungen ze gesinn.'
  },
  sessions: {
    recent: 'Rezent Sessiounen',
    deselectAll: 'Deselect All',
    selectAll: 'Wielt All',
    deleteCount: 'Läschen {count}',
    cancel: 'Ofbriechen',
    select: 'Wielt',
    deleting: 'Läscht…'
  },
  settings: {
    title: 'App Astellunge',
    close: 'Zoumaachen Astellungen',
    dataManagement: 'Data Management',
    saveLastSession: 'Spuert lescht Sessioun',
    saveLastSessionDesc: 'Pre-fill Äntwerten vun Ärer leschter ofgeschlosser Sessioun.',
    resetProgress: 'De Fortschrëtt zrécksetzen',
    resetProgressDesc: 'Läschen all gespäichert Äntwerten a fänkt frësch un.',
    goals: 'Ziler',
    targetScore: 'Zil Score',
    targetScoreDesc:
      'Setzt e Goal Score (1,000–10,000) fir Är Fortschrëtter um Dashboard ze verfolgen.',
    set: 'Setzt',
    clearGoal: 'Kloer',
    currentTarget: 'Aktuell Zil:',
    on: 'Op',
    off: 'Off',
    version: 'Manifestatioun Algorithmus {version}',
    clearAllAnswers: 'Kloer All Äntwerten',
    clearConfirmTitle: 'Kloer All Äntwerten',
    clearConfirmMessage:
      'Dëst wäert all Är aktuell Äntwerten permanent läschen a kënnen net réckgängeg gemaach ginn.',
    clearConfirmLabel: 'Kloer',
    keepAnswers: 'Halen Äntwerten',
    language: 'Sprooch',
    languageDesc: "Wielt d'Displaysprooch fir d'Applikatioun.",
    languageCount: '{count} Sprooche verfügbar',
    goalErrorRange: 'Gitt w.e.g. e Score tëscht 1.000 an 10.000 un.'
  },
  questionnaire: {
    saving: 'Spuert ...',
    saved: 'Gespäichert',
    progressText: '{pct}% komplett ({answered}/{total})',
    progressAria: 'Bewäertung Ofschloss Fortschrëtter',
    maxScore: 'Max: {score}',
    answerToScore: 'Äntwert op Score',
    currentScore: 'Aktuelle Score',
    scrollAll: 'Scroll All',
    stepByStep: 'Schrëtt fir Schrëtt',
    questionOf: 'Fro {current} vum {total}',
    previous: '← Virdrun',
    next: 'Nächst →',
    completeAssessment: 'Komplett Bewäertung',
    startFresh: 'Wëllt Dir frësch ufänken?',
    resetAllAnswers: 'Reset all Äntwerten',
    resetTitle: 'All Äntwerten zrécksetzen?',
    resetMessage:
      'Dëst wäert all Äntwert läschen a vun Null unzefänken. Dëst kann net réckgängeg gemaach ginn.',
    resetLabel: 'Zerécksetzen',
    scoreQuality: {
      notStarted: 'Net ugefaangen',
      manifesting: 'Manifestéieren ❆',
      aligned: 'Ausgeriicht',
      building: 'Gebai',
      startingOut: 'Erausgoen'
    },
    submitHint: {
      zero: '0 vun {total} Froen beäntwert - onbeäntwert Froen Standard op Minimum',
      partial:
        '{remaining} Froen bleiwen - onbeäntwert Froen Standard op Minimum | {remaining} Froen bleiwen - onbeäntwert Froen Standard op Minimum',
      complete: 'All Froen beäntwert - prett fir ofzeginn!'
    },
    submitTitle: {
      zero: 'Beäntwert e puer Froen fir Är Bewäertung ofzeschléissen',
      partial: '{remaining} Fro bleiwen | {remaining} Froen bleiwen',
      complete: 'Gitt Är ofgeschloss Bewäertung of'
    },
    submitError: 'Konnt net späicheren Sessioun: {error}',
    dotTitle: 'Fro {index}',
    dotAria: "Gitt op d'Fro {index}",
    keyboardHint: 'Tipp: Benotzt ← → fir ze navigéieren · 1–9 / 0 fir ze bewäerten'
  },
  onboarding: {
    step0Title: 'Wëllkomm op der Manifestatioun Algorithmus',
    step0Body1:
      "Dëst Tool hëlleft Iech ze moossen wéi ausgeriicht Är Gedanken, Gewunnechten, an alldeeglech Handlungen sinn fir Är Ziler z'erreechen. Beäntwert all Fro éierlech fir Ären aktuelle Score ze kréien.",
    step0Body2:
      'Fëllt de Questionnaire a reegelméissegen Ofstänn aus fir Äre Wuesstum iwwer Zäit ze verfolgen a kuckt wéi eng Gebidder déi meeschte Opmierksamkeet brauchen.',
    step1Title: 'Wéi Scoring Wierker',
    step1Body:
      'All Fro ass eng bestëmmte Zuel vu Punkte wäert. Bewäert Iech selwer op enger Skala vun 1-10 fir all Fro. Eng Bewäertung vun 10 heescht datt Dir dëse Prinzip voll verkierpert; 1 heescht datt Dir net ugefaang hutt.',
    step1TargetHint: '🎯 Zil: {target} | Maximum: {maximum}',
    excellent: 'exzellent',
    excellentRange: '7.001 - 10.000',
    excellentNote: 'Staark Ausrichtung - fuert weider',
    good: 'Gutt',
    goodRange: '4.001 - 7.000',
    goodNote: 'Solid Fundament - Raum fir ze wuessen',
    needsWork: 'Braucht Aarbecht',
    needsWorkRange: '0 - 4.000',
    needsWorkNote: "Focus op d'Grondlage fir d'éischt",
    step2Title: 'Är Donnéeën bleiwen privat',
    step2Body1:
      'All Är Äntwerten a Partiturgeschicht ginn lokal op Ärem Apparat mat enger verschlësselter SQLite Datebank gespäichert. Näischt gëtt un all Server geschéckt ouni Är explizit Erlaabnis.',
    step2Body2:
      'Déi optional Peer-to-Peer Sharing Feature léisst Iech anonymiséiert aggregéiert Partituren vun anere Benotzer gesinn. Et deelt nëmmen e kryptographesch ënnerschriwwene Resumé - ni Är individuell Äntwerten.',
    readyText: 'Prett? Loosst eis Är Basisscore kréien.',
    skipIntro: 'Iwwersprangen Intro',
    next: 'Nächst',
    getStarted: 'Fänkt un'
  },
  sharing: {
    title: 'Anonym Network Sharing',
    privacyFirst: '🔒 Privatsphär - Éischt',
    description:
      'Optional bäidroen Är Resultater anonym zum globalen Netzwierk. Keen Numm, E-Mail, IP Adress oder Apparat ID gëtt jee gedeelt.',
    enabled: 'Deelen aktivéiert - bäidroe fir Netzwierk',
    disabled: 'Deelen behënnert (Standard)',
    activeBadge: '✓ Är anonymiséiert Partituren gi mat Kollegen gedeelt',
    enableNote: 'Aktivéiert Äre Prozentsazrang am Verglach zum globalen Netzwierk ze gesinn.'
  },
  category: {
    back: '‹ Zréck',
    history: 'Geschicht',
    date: 'Datum',
    score: 'Score',
    loading: 'Lueden...',
    notEnoughData: 'Net genuch Daten',
    noData: 'Keng Daten fonnt fir "{category}".',
    goToDashboard: 'Gitt op Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Gesinn Vollbildmodus',
    exitFullscreen: 'Voll Écran Sortie',
    copyChart: 'Copy Chart',
    exportChart: 'Export Chart',
    exportDefault: '⬇ Export',
    exportExcel: '📊 Export Excel',
    exportCsv: '📄 Export CSV',
    exportPdf: '📑 Export PDF',
    exportHtml: '🌐 Export HTML',
    copied: 'Chart kopéiert op Clipboard',
    copyFailed: 'Kopie gescheitert - Clipboard net verfügbar',
    saveCancelled: 'Späicheren annuléiert'
  },
  resume: {
    continueLastSession: 'Weider aus der leschter Sessioun?',
    welcomeBack: 'Wëllkomm zréck!',
    historicalBody:
      'Är Äntwerten vun Ärer leschter ofgeschlosser Sessioun goufen virgelueden. Wëllt Dir dës Wäerter als Ausgangspunkt behalen, oder mat engem komplett eidele Questionnaire ufänken?',
    activeBody:
      'Dir hutt eng Sessioun amgaang. Wëllt Dir weidergoen wou Dir opgehalen hutt, oder eng nei Bewäertung starten?',
    clearWarning: '⚠️ Dëst wäert all aktuell Äntwerten läschen. Bass du secher?',
    yesStartFresh: 'Jo, Start Frësch',
    cancel: 'Ofbriechen',
    keepLastValues: 'Halen Last Wäerter',
    resumeSession: 'Resume Sessioun',
    startFresh: 'Start Frësch'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Niddereg',
    high: 'Héich',
    rateAria: 'Bewäert {question}'
  },
  dateRange: {
    rangeLabel: 'Range:',
    startDate: 'Start Datum',
    endDate: 'Enn Datum',
    presets: {
      '7d': '7 Deeg',
      '30d': '30 Deeg',
      '90d': '90 Deeg',
      '1y': '1 Joer',
      all: 'All Zäit',
      custom: 'Benotzerdefinéiert'
    }
  },
  update: {
    availableTitle: 'v{version} ass verfügbar!',
    releaseNotesFallback: "Besicht d'Verëffentlechungssäit fir déi lescht Versioun erofzelueden.",
    getUpdate: 'Kréien Update',
    dismiss: 'Entlooss'
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

export default lb;

/**
 * Auto-converted locale module for oc.
 */
import type { Messages } from './en';

const oc: Messages = {
  nav: {
    questionnaire: 'Questionari',
    history: 'Istòria',
    settings: 'Paramètres'
  },
  app: {
    name: 'Algoritme de manifestacion',
    unexpectedError: "Una error inesperada s'es producha."
  },
  home: {
    subtitle: "Valoratz cada airal de vòstra vida — descobrissètz vòstre puntuacion d'alinhament"
  },
  dashboard: {
    title: "Istoric de seguiment de l'algoritme de manifestacion",
    subtitle: 'Seguissètz vòstre progrès dins lo temps',
    loading: 'En cargament de vòstre istoric...',
    noData: 'Pas de donadas per aqueste periòde',
    progressTrend: 'Tendéncia de progrès',
    progressToGoal: "Progrès cap a l'objectiu",
    ofGoal: '{pct}% de meta',
    goalReached: '🎯 Objectiu Atengut!',
    categoryBreakdown: 'Desglossament de categorias',
    noSessionsRange: 'Cap de sesilha dins aqueste interval',
    tryWiderRange: 'Ensajatz un interval mai larg o seleccionatz un periòde diferent.',
    noSessionsYet: 'Pas de sesilha encara',
    completeFirst:
      'Completatz ​​vòstra primièra avaloracion per veire vòstres progrèsses e tendéncias aicí.',
    startFirst: 'Començar la primièra avaloracion',
    export: {
      date: 'Data',
      time: 'Temps',
      totalScore: 'Puntuacion totala',
      duration: 'Durada (min)',
      notes: 'Nòtas'
    }
  },
  stats: {
    averageScore: 'Nota mejana',
    medianScore: 'Puntuacion mediana',
    highestScore: 'Escòre mai naut',
    totalSessions: 'Total de sesilhas'
  },
  network: {
    rankings: 'Classaments de ret',
    searchingPeers: 'En cèrca de companhs...',
    searching: 'Cercar...',
    online: 'En linha',
    peers: '{count} parelhs',
    results: '{count} resultats',
    avgShort: 'Mejana',
    p90Short: 'P90',
    averageScoreTitle: 'Nota mejana',
    percentile90Title: '90en percentil',
    globalAverage: 'Mejana globala',
    percentile90: '90en percentil',
    manifestations: 'Manifestacions',
    activePeers: 'Los parelhs actius',
    categoryRankings: 'Classaments de categoria'
  },
  focusAreas: {
    title: "Airals d'enfocament",
    subtitle:
      'Vòstras 3 categorias de puntuacion mai bassa — melhorar aquelas mena los ganhs mai grands.',
    empty:
      "Completatz ​​mai de sesilhas per veire de recomandacions personalizadas d'airal de focus."
  },
  sessions: {
    recent: 'Sesilhas recentas',
    deselectAll: 'Desseleccionar tot',
    selectAll: 'Seleccionar tot',
    deleteCount: 'Suprimir {count}',
    cancel: 'Anullar',
    select: 'Causir',
    deleting: 'Suprimir...'
  },
  settings: {
    title: "Paramètres de l'aplicacion",
    close: 'Barrar los paramètres',
    dataManagement: 'Gestion de donadas',
    saveLastSession: 'Enregistrar la darrièra sesilha',
    saveLastSessionDesc: 'Preemplenatz las responsas de vòstra sesilha completada mai recenta.',
    resetProgress: 'Reïnicializar lo progrès',
    resetProgressDesc: 'Suprimir totas las responsas enregistradas e començar de nòu.',
    goals: 'Objectius',
    targetScore: 'Puntuacion cibla',
    targetScoreDesc:
      "Definissètz un punt d'objectiu (1 000–10 000) per seguir vòstre progrès sul tablèu de bòrd.",
    set: 'Ensems',
    clearGoal: 'Clar',
    currentTarget: 'Objectiu actual:',
    on: 'Sus',
    off: 'Desactivat',
    version: 'Algoritme de Manifestacion {version}',
    clearAllAnswers: 'Escafar totas las responsas',
    clearConfirmTitle: 'Escafar totas las responsas',
    clearConfirmMessage:
      'Aquò suprimirà definitivament totas vòstras responsas actualas e pòt pas èsser anullat.',
    clearConfirmLabel: 'Clar',
    keepAnswers: 'Gardar las responsas',
    language: 'Lenga',
    languageDesc: "Causissètz la lenga d'afichatge per l'aplicacion.",
    languageCount: '{count} lengas disponiblas',
    goalErrorRange: 'Mercés de picar una nòta entre 1 000 e 10 000.'
  },
  questionnaire: {
    saving: 'En estauviant...',
    saved: 'Enregistrat',
    progressText: '{pct}% complet ({answered}/{total})',
    progressAria: "Progrès de l'acabament de l'avaloracion",
    maxScore: 'Max: {score}',
    answerToScore: 'Responsa a la nòta',
    currentScore: 'Escòre actual',
    scrollAll: 'Desfilar tot',
    stepByStep: 'Pas a Pas',
    questionOf: 'Pregunta {current} de {total}',
    previous: '← Anterior',
    next: 'Seguent →',
    completeAssessment: 'Avaloracion completa',
    startFresh: 'Volètz començar de nòu?',
    resetAllAnswers: 'Reïnicializar totas las responsas',
    resetTitle: 'Reïnicializar totas las responsas?',
    resetMessage: 'Aquò escafarà cada responsa e començarà de zèro. Aquò pòt pas èsser desfach.',
    resetLabel: 'Reïnicializar',
    scoreQuality: {
      notStarted: 'Pas començat',
      manifesting: 'Manifèstant ❆',
      aligned: 'Alinhat',
      building: 'Immòble',
      startingOut: 'Començant'
    },
    submitHint: {
      zero: '0 de las questions {total} respondudas — las questions sens responsa son per defaut al minimum',
      partial:
        '{remaining} question restant — las questions sens responsa son al minimum per defaut | {remaining} questions que demòran — las questions sens responsa son per defaut al minimum',
      complete: 'Totas las questions respondudas — prèstas a sometre!'
    },
    submitTitle: {
      zero: 'Respondètz a qualques questions per completar vòstra avaloracion',
      partial: '{remaining} question que demòra | {remaining} preguntas que restan',
      complete: 'Enviatz vòstra avaloracion completada'
    },
    submitError: "Fracàs al moment de l'enregistrament de la sesilha : {error}",
    dotTitle: 'Question {index}',
    dotAria: 'Anatz a la question {index}',
    keyboardHint: 'Conselh: Utilizatz ← → per navegar · 1–9 / 0 per classar'
  },
  onboarding: {
    step0Title: "Benvenguda a l'Algoritme de Manifestacion",
    step0Body1:
      "Aquesta aisina vos ajuda a mesurar l'alinhament de vòstra mentalitat, abituds e accions quotidianas amb l'atencion de vòstres objectius. Respondètz a cada question onèstament per obténer vòstra nòta actuala.",
    step0Body2:
      "Completatz ​​lo questionari a d'intervals regulars per seguir vòstra creissença dins lo temps e veire quinas zònas an de besonh mai d'atencion.",
    step1Title: 'Cossí fonciona la puntuacion',
    step1Body:
      "Cada question val un nombre de punts. Notatz-vos sus una escala de 1 a 10 per cada question. Una nòta de 10 significa qu'incarnatz plenament aquel principi; 1 vòl dire qu'avètz pas començat.",
    step1TargetHint: '🎯 Objectiu: {target} | Maximum: {maximum}',
    excellent: 'Excellent',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Alinhament fòrt — contunhar',
    good: 'Bon',
    goodRange: '4.001 – 7.000',
    goodNote: 'Fondacion solida — plaça per créisser',
    needsWork: 'A besonh de trabalh',
    needsWorkRange: '0 – 4,000',
    needsWorkNote: "Concentratz-vos suls fondamentals d'en primièr",
    step2Title: 'Vòstras donadas demòran privadas',
    step2Body1:
      'Totas vòstras responsas e vòstre istoric de nòtas son enregistrats localament sus vòstre periferic en utilizant una basa de donadas SQLite chifrada. Res es pas mandat a cap de servidor sens vòstra autorizacion explicita.',
    step2Body2:
      "La foncionalitat de partatge entre parelhs opcionala vos permet de veire de puntuacions agregadas anonimizadas d'autres utilizaires. Parteja pas qu'un resumit signat criptograficament — jamai vòstras responsas individualas.",
    readyText: 'Prèst? Prenèm vòstra nòta de basa.',
    skipIntro: "Sautar l'introduccion",
    next: 'Venent',
    getStarted: 'Començatz'
  },
  sharing: {
    title: 'Partatge de ret anonim',
    privacyFirst: '🔒 La vida privada-Primièr',
    description:
      "Contribuissètz opcionalament vòstres resultats anonimament a la ret globala. Cap de nom, de corrièl, d'adreça IP o d'identificant de periferic es pas jamai partejat.",
    enabled: 'Partatge activat — contribuissent a la ret',
    disabled: 'Partatge desactivat (per defaut)',
    activeBadge: '✓ Vòstres resultats anonimizats son partejats amb de companhs',
    enableNote: 'Activar per veire vòstre reng de percentil comparat a la ret globala.'
  },
  category: {
    back: '< Arrièr',
    history: 'Istòria',
    date: 'Data',
    score: 'Marcar',
    loading: 'En cargament...',
    notEnoughData: 'Pas pro de donadas',
    noData: 'Cap de donada trobada per “{category}”.',
    goToDashboard: 'Anar al tablèu de bòrd'
  },
  chartActions: {
    viewFullscreen: "Afichar l'ecran complet",
    exitFullscreen: "Sortir a l'ecran complet",
    copyChart: 'Copiar lo tablèu',
    exportChart: "Tablèu d'exportacion",
    exportDefault: '⬇ Exportar',
    exportExcel: '📊 Exportar Excel',
    exportCsv: '📄 Exportar CSV',
    exportPdf: '📑 Exportar PDF',
    exportHtml: '🌐 Exportar HTML',
    copied: 'Tablèu copiat dins lo quichapapièrs',
    copyFailed: 'La còpia a fracassat — lo quichapapièrs pas disponible',
    saveCancelled: 'Enregistrar anullat'
  },
  resume: {
    continueLastSession: 'Contunhar dempuèi la darrièra sesilha?',
    welcomeBack: 'Benvenguda de retorn!',
    historicalBody:
      'Vòstras responsas de vòstra darrièra sesilha completada son estadas precargadas. Volètz gardar aquelas valors coma punt de partença, o començar amb un questionari completament blanc?',
    activeBody:
      'Avètz una sesilha en cors. Volètz reprene ont avètz quitat, o començar una nòva avaloracion?',
    clearWarning: "⚠️ Aquò escafarà totas las responsas actualas. N'ètz segur?",
    yesStartFresh: 'Òc, Començatz de nòu',
    cancel: 'Anullar',
    keepLastValues: 'Gardar las darrièras valors',
    resumeSession: 'Reprene la sesilha',
    startFresh: 'Començatz de nòu'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Bas',
    high: 'Naut',
    rateAria: 'Valorar {question}'
  },
  dateRange: {
    rangeLabel: 'Gamma:',
    startDate: 'Data de començament',
    endDate: 'Data de fin',
    presets: {
      '7d': '7 jorns',
      '30d': '30 jorns',
      '90d': '90 Jorns',
      '1y': '1 an',
      all: 'Tot lo temps',
      custom: 'Costuma'
    }
  },
  update: {
    availableTitle: 'v{version} es disponible!',
    releaseNotesFallback: 'Visitatz la pagina de sortida per telecargar la darrièra version.',
    getUpdate: 'Obténer la mesa a jorn',
    dismiss: 'Fòragetar'
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

export default oc;

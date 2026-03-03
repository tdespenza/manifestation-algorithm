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
    '1': 'Dominar los fundamentals',
    '2': 'Activar e Iluminar Mots',
    '3': 'Trobatz Dolor & Energhia de Contracte',
    '4': 'Definissètz çò que volètz',
    '5': 'Escriu çò que vòls',
    '6': 'Parteja pas vòstre sòmi amb los autres',
    '7': 'Ten un ardent desir pel teu objectiu',
    '8': 'Lo objectiu deu èsser dins lo Ponch Dous',
    '9': 'Prendre una decisions',
    '10': 'Vesètz/Sensètz-vos plan amb la possessió del vòstre objècte',
    '11': "Laisse anar l'atache al resultat",
    '12': 'Permètz al COMA se presentar',
    '13': 'Saber la diferéncia entre Sogni e Objectiu Principal',
    '14': 'Estar concentrat / Unic objectiu',
    '15': 'Lista de prioridades quotidiana',
    '16': 'Progres de las Taulas / Sabr la puntuacion',
    '17': 'Utiliza lo cicle de succès del momentum',
    '18': 'Somiar Construire - Libri de Sonh e Taula de Visions',
    '19': 'Engatjar dins lo sistèma',
    '20': 'Curs de Sciéncia de la Maestria Personala',
    '21': 'Vejatz las paraulas que disètz - çò que disètz es çò que recebrètz',
    '22': "Fisiologia / Vestir per l'encòp",
    '23': 'Intentions clarament contràrias',
    '24': 'Despertatz vòstra poténcia intèrna: Procèsses de superpoder',
    '25': "Difusión sus l'ondas cerebrals Alpha-theta",
    '26': 'Arresta de contar ta istòria de malastre',
    '27': 'Demostrar apreciacion / gratitud',
    '28': "Substituïtz los abituds d'error per los abituds d'afogat (Procèsses d'acceleracion)",
    '29': 'Crea un Mastermind',
    '30': 'Vesètz las Personas Exitosas/Aprendís',
    '31': "Sausir/Legir d'Istòrias d'Escais",
    '32': 'Dona primièr çò que vòls',
    '33': 'Mentalitat Fai-llo Ara',
    '34': 'Tòca te de ton còrs',
    '35': "Cercatz l'or dins l'adversitat",
    '36': 'Desfá las Samskaras del camp',
    '37': 'Pren çò 100% de responsabilitat',
    '38': 'Generadors de camps atractors',
    '39': 'Joinatz un club que vos connecta amb una sorga de poténcia',
    '40': 'Viu la vida amb intencion deliberada - siás dins lo temps present',
    '1a': 'A quin escotas?',
    '1b': "Indice de capacitad d'ensenhament",
    '1c': "Escala d'equilibri d'entraïnament",
    '1d': 'Competéncia inconscient',
    '19a': 'Legís libres',
    '19b': "Sòrve a l'audiò",
    '19c': "Assistir a d'eveniments (mensual)",
    '19d': "Donar e recebre Reconeissença / Règle d'aur espandida",
    '19e': 'Desvolopatz de relacions amb de personas que pensan coma vos',
    '23a': 'Proceses monetaris',
    '23b': 'Proceses de relacion',
    '23c': 'Procèsses de conducha',
    '23d': 'Proceses de comunicacion',
    '23e': 'Procèsses de santat',
    '23f': 'Procèsses de consciencia espirituala',
    '23g': 'Proceses de somnis',
    '23h': 'Organizacion e procèsses de concentracion'
  }
};

export default oc;

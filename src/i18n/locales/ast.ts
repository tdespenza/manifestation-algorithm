/**
 * Auto-converted locale module for ast.
 */
import type { Messages } from './en';

const ast: Messages = {
  nav: {
    questionnaire: 'Cuestionario',
    history: 'Historia',
    settings: 'Configuración'
  },
  app: {
    name: 'Algoritmo de manifestación',
    unexpectedError: 'Se produjo un error inesperado.'
  },
  home: {
    subtitle: 'Califica cada área de tu vida: descubre tu puntuación de alineación'
  },
  dashboard: {
    title: 'Historial de seguimiento del algoritmo de manifestación',
    subtitle: 'Sigue tu progreso a lo largo del tiempo',
    loading: 'Cargando tu historial…',
    noData: 'No hay datos para este periodo',
    progressTrend: 'Tendencia de progreso',
    progressToGoal: 'Progreso hacia la meta',
    ofGoal: '{pct}% del objetivo',
    goalReached: '🎯 ¡Objetivo alcanzado!',
    categoryBreakdown: 'Desglose de categorías',
    noSessionsRange: 'No hay sesiones en este rango',
    tryWiderRange: 'Pruebe con una gama más amplia o seleccione un período diferente.',
    noSessionsYet: 'Aún no hay sesiones',
    completeFirst: 'Complete su primera evaluación para ver su progreso y tendencias aquí.',
    startFirst: 'Iniciar la primera evaluación',
    export: {
      date: 'Fecha',
      time: 'tiempo',
      totalScore: 'Puntuación total',
      duration: 'Duración (min)',
      notes: 'Notas'
    }
  },
  stats: {
    averageScore: 'Puntuación promedio',
    medianScore: 'Puntuación media',
    highestScore: 'Puntuación más alta',
    totalSessions: 'Sesiones totales'
  },
  network: {
    rankings: 'Clasificaciones de red',
    searchingPeers: 'Buscando compañeros...',
    searching: 'Buscando...',
    online: 'En línea',
    peers: '{count} compañeros',
    results: '{count} resultados',
    avgShort: 'promedio',
    p90Short: 'P90',
    averageScoreTitle: 'Puntuación promedio',
    percentile90Title: 'percentil 90',
    globalAverage: 'Promedio mundial',
    percentile90: 'percentil 90',
    manifestations: 'Manifestaciones',
    activePeers: 'Compañeros activos',
    categoryRankings: 'Clasificaciones de categorías'
  },
  focusAreas: {
    title: 'Áreas de enfoque',
    subtitle:
      'Sus 3 categorías con la puntuación más baja: mejorarlas genera las mayores ganancias.',
    empty: 'Complete más sesiones para ver recomendaciones personalizadas de áreas de enfoque.'
  },
  sessions: {
    recent: 'Sesiones recientes',
    deselectAll: 'Deseleccionar todo',
    selectAll: 'Seleccionar todo',
    deleteCount: 'Eliminar {count}',
    cancel: 'Cancelar',
    select: 'Seleccionar',
    deleting: 'Eliminando…'
  },
  settings: {
    title: 'Configuración de la aplicación',
    close: 'Cerrar configuración',
    dataManagement: 'Gestión de datos',
    saveLastSession: 'Guardar la última sesión',
    saveLastSessionDesc:
      'Complete previamente las respuestas de su sesión completada más reciente.',
    resetProgress: 'Restablecer progreso',
    resetProgressDesc: 'Elimine todas las respuestas guardadas y comience de nuevo.',
    goals: 'Metas',
    targetScore: 'Puntuación objetivo',
    targetScoreDesc:
      'Establezca una puntuación objetivo (1000 a 10 000) para realizar un seguimiento de su progreso en el panel.',
    set: 'conjunto',
    clearGoal: 'Borrar',
    currentTarget: 'Objetivo actual:',
    on: 'encendido',
    off: 'Apagado',
    version: 'Algoritmo de manifestación {version}',
    clearAllAnswers: 'Borrar todas las respuestas',
    clearConfirmTitle: 'Borrar todas las respuestas',
    clearConfirmMessage:
      'Esto eliminará permanentemente todas sus respuestas actuales y no se puede deshacer.',
    clearConfirmLabel: 'Borrar',
    keepAnswers: 'Mantener respuestas',
    language: 'Idioma',
    languageDesc: 'Elija el idioma de visualización de la aplicación.',
    languageCount: '{count} idiomas disponibles',
    goalErrorRange: 'Introduzca una puntuación entre 1.000 y 10.000.'
  },
  questionnaire: {
    saving: 'Guardando...',
    saved: 'Guardado',
    progressText: '{pct}% completo ({answered}/{total})',
    progressAria: 'Progreso de finalización de la evaluación',
    maxScore: 'Máximo: {score}',
    answerToScore: 'Responder a la puntuación',
    currentScore: 'Puntuación actual',
    scrollAll: 'Desplazarse por todo',
    stepByStep: 'Paso a paso',
    questionOf: 'Pregunta {current} de {total}',
    previous: '← Anterior',
    next: 'Siguiente →',
    completeAssessment: 'Evaluación completa',
    startFresh: '¿Quieres empezar de nuevo?',
    resetAllAnswers: 'Restablecer todas las respuestas',
    resetTitle: '¿Restablecer todas las respuestas?',
    resetMessage:
      'Esto borrará todas las respuestas y comenzará desde cero. Esto no se puede deshacer.',
    resetLabel: 'Reiniciar',
    scoreQuality: {
      notStarted: 'No iniciado',
      manifesting: 'Manifestando ❆',
      aligned: 'Alineado',
      building: 'edificio',
      startingOut: 'Empezando'
    },
    submitHint: {
      zero: '0 de {total} preguntas respondidas; las preguntas sin respuesta están predeterminadas al mínimo',
      partial:
        '{remaining} pregunta restante: las preguntas sin respuesta están predeterminadas al mínimo | {remaining} preguntas restantes: las preguntas sin respuesta están predeterminadas al mínimo',
      complete: 'Todas las preguntas respondidas: ¡listo para enviar!'
    },
    submitTitle: {
      zero: 'Responde algunas preguntas para completar tu evaluación',
      partial: '{remaining} pregunta restante | {remaining} preguntas restantes',
      complete: 'Envíe su evaluación completa'
    },
    submitError: 'No se pudo guardar la sesión: {error}',
    dotTitle: 'Pregunta {index}',
    dotAria: 'Ir a la pregunta {index}',
    keyboardHint: 'Consejo: Utilice ← → para navegar · 1–9 / 0 para calificar'
  },
  onboarding: {
    step0Title: 'Bienvenido al algoritmo de manifestación',
    step0Body1:
      'Esta herramienta le ayuda a medir qué tan alineados están su mentalidad, sus hábitos y sus acciones diarias con el logro de sus objetivos. Responda cada pregunta honestamente para obtener su puntuación actual.',
    step0Body2:
      'Complete el cuestionario a intervalos regulares para realizar un seguimiento de su crecimiento a lo largo del tiempo y ver qué áreas necesitan más atención.',
    step1Title: 'Cómo funciona la puntuación',
    step1Body:
      'Cada pregunta vale una cantidad determinada de puntos. Califícate en una escala del 1 al 10 para cada pregunta. Una calificación de 10 significa que usted encarna plenamente ese principio; 1 significa que no has empezado.',
    step1TargetHint: '🎯 Objetivo: {target} | Máximo: {maximum}',
    excellent: 'Excelente',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Fuerte alineación: sigue adelante',
    good: 'bueno',
    goodRange: '4.001 – 7.000',
    goodNote: 'Base sólida: espacio para crecer',
    needsWork: 'Necesita trabajo',
    needsWorkRange: '0-4000',
    needsWorkNote: 'Centrarse primero en los fundamentos',
    step2Title: 'Tus datos permanecen privados',
    step2Body1:
      'Todas sus respuestas y su historial de puntuaciones se almacenan localmente en su dispositivo mediante una base de datos SQLite cifrada. No se envía nada a ningún servidor sin su permiso explícito.',
    step2Body2:
      'La función opcional de intercambio entre pares le permite ver puntuaciones agregadas anónimas de otros usuarios. Solo comparte un resumen firmado criptográficamente, nunca sus respuestas individuales.',
    readyText: '¿Listo? Obtengamos su puntuación inicial.',
    skipIntro: 'Saltar introducción',
    next: 'Siguiente',
    getStarted: 'Empezar'
  },
  sharing: {
    title: 'Compartir red anónima',
    privacyFirst: '🔒 Privacidad primero',
    description:
      'Opcionalmente, contribuya con sus resultados de forma anónima a la red global. Nunca se comparte ningún nombre, correo electrónico, dirección IP o ID del dispositivo.',
    enabled: 'Compartir habilitado: contribuir a la red',
    disabled: 'Compartir deshabilitado (predeterminado)',
    activeBadge: '✓ Sus puntuaciones anónimas se comparten con sus compañeros',
    enableNote: 'Habilite para ver su rango percentil en comparación con la red global.'
  },
  category: {
    back: '‹ Volver',
    history: 'Historia',
    date: 'Fecha',
    score: 'Puntuación',
    loading: 'Cargando...',
    notEnoughData: 'No hay suficientes datos',
    noData: 'No se encontraron datos para “{category}”.',
    goToDashboard: 'Ir al panel'
  },
  chartActions: {
    viewFullscreen: 'Ver pantalla completa',
    exitFullscreen: 'Salir de pantalla completa',
    copyChart: 'Copiar gráfico',
    exportChart: 'Exportar gráfico',
    exportDefault: '⬇ Exportar',
    exportExcel: '📊 Exportar Excel',
    exportCsv: '📄 Exportar CSV',
    exportPdf: '📑 Exportar PDF',
    exportHtml: '🌐 Exportar HTML',
    copied: 'Gráfico copiado al portapapeles',
    copyFailed: 'Error al copiar: portapapeles no disponible',
    saveCancelled: 'Guardar cancelado'
  },
  resume: {
    continueLastSession: '¿Continuar desde la última sesión?',
    welcomeBack: '¡Bienvenido de nuevo!',
    historicalBody:
      'Sus respuestas de su última sesión completada han sido precargadas. ¿Le gustaría mantener esos valores como punto de partida o comenzar con un cuestionario completamente en blanco?',
    activeBody:
      'Tienes una sesión en curso. ¿Le gustaría continuar donde lo dejó o comenzar una nueva evaluación?',
    clearWarning: '⚠️ Esto borrará todas las respuestas actuales. ¿Está seguro?',
    yesStartFresh: 'Sí, empieza de nuevo',
    cancel: 'Cancelar',
    keepLastValues: 'Mantener los últimos valores',
    resumeSession: 'Reanudar sesión',
    startFresh: 'Empezar de nuevo'
  },
  questionItem: {
    pointsSuffix: 'puntos',
    low: 'Bajo',
    high: 'Alto',
    rateAria: 'Califica {question}'
  },
  dateRange: {
    rangeLabel: 'Rango:',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de finalización',
    presets: {
      '7d': '7 dias',
      '30d': '30 dias',
      '90d': '90 días',
      '1y': '1 año',
      all: 'Todo el tiempo',
      custom: 'personalizado'
    }
  },
  update: {
    availableTitle: 'v{version} está disponible!',
    releaseNotesFallback: 'Visite la página de lanzamiento para descargar la última versión.',
    getUpdate: 'Obtener actualización',
    dismiss: 'Descartar'
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

export default ast;

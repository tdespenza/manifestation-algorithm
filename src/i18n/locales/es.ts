/**
 * Spanish (es) locale messages — Español.
 */
import type { Messages } from './en';

const es: Messages = {
  nav: {
    questionnaire: 'Cuestionario',
    history: 'Historial',
    settings: 'Ajustes'
  },

  app: {
    name: 'Algoritmo de Manifestación',
    unexpectedError: 'Ocurrió un error inesperado.'
  },

  home: {
    subtitle: 'Evalúa cada área de tu vida — descubre tu puntuación de alineación'
  },

  dashboard: {
    title: 'Historial del Algoritmo de Manifestación',
    subtitle: 'Sigue tu progreso a lo largo del tiempo',
    loading: 'Cargando tu historial\u2026',
    noData: 'Sin datos para este período',
    progressTrend: 'Tendencia de Progreso',
    progressToGoal: 'Progreso hacia el Objetivo',
    ofGoal: '{pct}% del objetivo',
    goalReached: '\uD83C\uDFAF ¡Objetivo Alcanzado!',
    categoryBreakdown: 'Desglose por Categoría',
    noSessionsRange: 'Sin sesiones en este rango',
    tryWiderRange: 'Prueba un rango más amplio o selecciona un período diferente.',
    noSessionsYet: 'Aún no hay sesiones',
    completeFirst: 'Completa tu primera evaluación para ver tu progreso y tendencias aquí.',
    startFirst: 'Comenzar Primera Evaluación',
    export: {
      date: 'Fecha',
      time: 'Hora',
      totalScore: 'Puntuación Total',
      duration: 'Duración (min)',
      notes: 'Notas'
    }
  },

  stats: {
    averageScore: 'Puntuación Promedio',
    medianScore: 'Puntuación Mediana',
    highestScore: 'Puntuación Más Alta',
    totalSessions: 'Total de Sesiones'
  },

  network: {
    rankings: 'Rankings de la Red',
    searchingPeers: 'Buscando pares...',
    searching: 'Buscando...',
    online: 'En línea',
    peers: '{count} pares',
    results: '{count} resultados',
    avgShort: 'Prom',
    p90Short: 'P90',
    averageScoreTitle: 'Puntuación Promedio',
    percentile90Title: 'Percentil 90',
    globalAverage: 'Promedio Global',
    percentile90: 'Percentil 90',
    manifestations: 'Manifestaciones',
    activePeers: 'Pares Activos',
    categoryRankings: 'Rankings por Categoría'
  },

  focusAreas: {
    title: 'Áreas de Enfoque',
    subtitle: 'Tus 3 categorías con menor puntuación — mejorarlas genera las mayores ganancias.',
    empty: 'Completa más sesiones para ver recomendaciones de áreas de enfoque personalizadas.'
  },

  sessions: {
    recent: 'Sesiones Recientes',
    deselectAll: 'Deseleccionar Todo',
    selectAll: 'Seleccionar Todo',
    deleteCount: 'Eliminar {count}',
    cancel: 'Cancelar',
    select: 'Seleccionar',
    deleting: 'Eliminando\u2026'
  },

  settings: {
    title: 'Ajustes de la App',
    close: 'Cerrar ajustes',
    dataManagement: 'Gestión de Datos',
    saveLastSession: 'Guardar Última Sesión',
    saveLastSessionDesc:
      'Rellenar automáticamente las respuestas de tu sesión más reciente completada.',
    resetProgress: 'Restablecer Progreso',
    resetProgressDesc: 'Eliminar todas las respuestas guardadas y empezar de nuevo.',
    goals: 'Objetivos',
    targetScore: 'Puntuación Objetivo',
    targetScoreDesc:
      'Establece una puntuación objetivo (1.000\u201310.000) para seguir tu progreso en el panel.',
    set: 'Establecer',
    clearGoal: 'Borrar',
    currentTarget: 'Objetivo actual:',
    on: 'Activado',
    off: 'Desactivado',
    version: 'Algoritmo de Manifestación {version}',
    clearAllAnswers: 'Borrar Todas las Respuestas',
    clearConfirmTitle: 'Borrar Todas las Respuestas',
    clearConfirmMessage:
      'Esto eliminará permanentemente todas tus respuestas actuales y no se puede deshacer.',
    clearConfirmLabel: 'Borrar',
    keepAnswers: 'Mantener Respuestas',
    language: 'Idioma',
    languageDesc: 'Elige el idioma de visualización de la aplicación.',
    languageCount: '{count} idiomas disponibles',
    goalErrorRange: 'Introduce una puntuación entre 1.000 y 10.000.'
  },

  questionnaire: {
    saving: 'Guardando...',
    saved: 'Guardado',
    progressText: '{pct}% completado ({answered}/{total})',
    progressAria: 'Progreso de finalización de la evaluación',
    maxScore: 'Máx: {score}',
    answerToScore: 'Responde para puntuar',
    currentScore: 'Puntuación Actual',
    scrollAll: 'Ver Todo',
    stepByStep: 'Paso a Paso',
    questionOf: 'Pregunta {current} de {total}',
    previous: '\u2190 Anterior',
    next: 'Siguiente \u2192',
    completeAssessment: 'Completar Evaluación',
    startFresh: '¿Quieres empezar de nuevo?',
    resetAllAnswers: 'Restablecer todas las respuestas',
    resetTitle: '¿Restablecer Todas las Respuestas?',
    resetMessage: 'Esto borrará todas las respuestas y empezará desde cero. No se puede deshacer.',
    resetLabel: 'Restablecer',
    scoreQuality: {
      notStarted: 'No Iniciado',
      manifesting: 'Manifestando \u2746',
      aligned: 'Alineado',
      building: 'Construyendo',
      startingOut: 'Comenzando'
    },
    submitHint: {
      zero: '0 de {total} preguntas respondidas \u2014 las no respondidas toman valor m\u00ednimo',
      partial:
        '{remaining} pregunta pendiente \u2014 respuestas en blanco toman valor m\u00ednimo | {remaining} preguntas pendientes \u2014 respuestas en blanco toman valor m\u00ednimo',
      complete: '\u00a1Todas las preguntas respondidas \u2014 listo para enviar!'
    },
    submitTitle: {
      zero: 'Responde algunas preguntas para completar tu evaluaci\u00f3n',
      partial: '{remaining} pregunta pendiente | {remaining} preguntas pendientes',
      complete: 'Enviar tu evaluaci\u00f3n completa'
    },
    submitError: 'Error al guardar la sesi\u00f3n: {error}',
    dotTitle: 'Pregunta {index}',
    dotAria: 'Ir a la pregunta {index}',
    keyboardHint: 'Consejo: usa ← → para navegar · 1–9 / 0 para puntuar'
  },

  onboarding: {
    step0Title: 'Bienvenido al Algoritmo de Manifestación',
    step0Body1:
      'Esta herramienta te ayuda a medir qué tan alineada está tu mentalidad, hábitos y acciones diarias con el logro de tus metas. Responde cada pregunta honestamente para obtener tu puntuación actual.',
    step0Body2:
      'Completa el cuestionario a intervalos regulares para seguir tu crecimiento a lo largo del tiempo y ver qué áreas necesitan más atención.',
    step1Title: 'Cómo Funciona la Puntuación',
    step1Body:
      'Cada pregunta vale un número determinado de puntos. Evalúate en una escala del\u00a01\u201310 para cada pregunta. Una calificación de 10 significa que encarnas plenamente ese principio; 1 significa que no has comenzado.',
    step1TargetHint: '🎯 Objetivo: {target} | Máximo: {maximum}',
    excellent: 'Excelente',
    excellentRange: '7.001 \u2013 10.000',
    excellentNote: 'Gran alineación \u2014 continúa así',
    good: 'Bien',
    goodRange: '4.001 \u2013 7.000',
    goodNote: 'Base sólida \u2014 hay espacio para crecer',
    needsWork: 'Necesita Trabajo',
    needsWorkRange: '0 \u2013 4.000',
    needsWorkNote: 'Primero enfócate en los fundamentos',
    step2Title: 'Tus Datos Permanecen Privados',
    step2Body1:
      'Todas tus respuestas e historial de puntuaciones se almacenan localmente en tu dispositivo mediante una base de datos SQLite encriptada. Nada se envía a ningún servidor sin tu permiso explícito.',
    step2Body2:
      'La función opcional de intercambio entre pares te permite ver puntuaciones agregadas anónimas de otros usuarios. Solo comparte un resumen firmado criptográficamente, nunca tus respuestas individuales.',
    readyText: '¿Listo? Obtén tu puntuación base.',
    skipIntro: 'Omitir introducción',
    next: 'Siguiente',
    getStarted: 'Empezar'
  },

  sharing: {
    title: 'Compartir en Red Anónima',
    privacyFirst: '\uD83D\uDD12 Privacidad Primero',
    description:
      'Opcionalmente contribuye tus resultados de forma anónima a la red global. Nunca se comparte tu nombre, correo, dirección IP o ID de dispositivo.',
    enabled: 'Compartición activa \u2014 contribuyendo a la red',
    disabled: 'Compartición desactivada (predeterminado)',
    activeBadge: '\u2713 Tus puntuaciones anónimas se están compartiendo con pares',
    enableNote: 'Activa para ver tu percentil comparado con la red global.'
  },

  category: {
    back: '\u2039 Atrás',
    history: 'Historial',
    date: 'Fecha',
    score: 'Puntuación',
    loading: 'Cargando...',
    notEnoughData: 'No hay suficientes datos',
    noData: 'No se encontraron datos para \u201c{category}\u201d.',
    goToDashboard: 'Ir al Panel'
  },

  chartActions: {
    viewFullscreen: 'Ver en pantalla completa',
    exitFullscreen: 'Salir de pantalla completa',
    copyChart: 'Copiar gráfico',
    exportChart: 'Exportar gráfico',
    exportDefault: '⬇ Exportar',
    exportExcel: '📊 Exportar Excel',
    exportCsv: '📄 Exportar CSV',
    exportPdf: '📑 Exportar PDF',
    exportHtml: '🌐 Exportar HTML',
    copied: 'Gráfico copiado al portapapeles',
    copyFailed: 'Error al copiar — portapapeles no disponible',
    saveCancelled: 'Guardado cancelado'
  },

  resume: {
    continueLastSession: '¿Continuar desde la última sesión?',
    welcomeBack: '¡Bienvenido de nuevo!',
    historicalBody:
      'Tus respuestas de tu última sesión completada han sido precargadas. ¿Quieres mantener esos valores como punto de partida o comenzar con un cuestionario completamente en blanco?',
    activeBody:
      'Tienes una sesión en progreso. ¿Quieres continuar donde lo dejaste o empezar una evaluación nueva?',
    clearWarning: '⚠️ Esto borrará todas las respuestas actuales. ¿Estás seguro?',
    yesStartFresh: 'Sí, empezar de cero',
    cancel: 'Cancelar',
    keepLastValues: 'Mantener últimos valores',
    resumeSession: 'Reanudar sesión',
    startFresh: 'Empezar de cero'
  },

  questionItem: {
    pointsSuffix: 'pts',
    low: 'Bajo',
    high: 'Alto',
    rateAria: 'Calificar {question}'
  },

  questions: {
    '1': 'Domina lo básico',
    '1a': '¿A quién escuchas?',
    '1b': 'Índice de enseñabilidad',
    '1c': 'Escala de equilibrio de entrenamiento',
    '1d': 'Competencia inconsciente',
    '2': 'Activa e ilumina tus palabras',
    '3': 'Encuentra el dolor y contrae la energía',
    '4': 'Define lo que quieres',
    '5': 'Escribe lo que quieres',
    '6': 'No compartas tu sueño con los demás',
    '7': 'Desarrolla un deseo ardiente por tu objetivo',
    '8': 'La meta debe estar en tu zona ideal',
    '9': 'Toma una decisión',
    '10': 'Visualiza y siente que ya posees tu objetivo',
    '11': 'Suelta el apego al resultado',
    '12': 'Permite que el CÓMO se revele',
    '13': 'Diferencia entre sueño y objetivo principal',
    '14': 'Mantente enfocado / propósito único',
    '15': 'Lista diaria de prioridades (TO DO)',
    '16': 'Mide tu progreso / conoce tu puntaje',
    '17': 'Usa el ciclo de impulso del éxito',
    '18': 'Construye tu sueño: libro de sueños y tablero de visión',
    '19': 'Conéctate al sistema',
    '19a': 'Leer libros',
    '19b': 'Escuchar audios',
    '19c': 'Asistir a eventos (mensuales)',
    '19d': 'Dar y recibir reconocimiento / regla de oro ampliada',
    '19e': 'Desarrollar relaciones con personas afines',
    '20': 'Curso de Ciencia del Dominio Personal',
    '21': 'Cuida tus palabras: lo que dices, obtienes',
    '22': 'Fisiología / vístete para el éxito',
    '23': 'Aclara intenciones contrarias',
    '23a': 'Procesos de dinero',
    '23b': 'Procesos de relaciones',
    '23c': 'Procesos de liderazgo',
    '23d': 'Procesos de comunicación',
    '23e': 'Procesos de salud',
    '23f': 'Procesos de conciencia espiritual',
    '23g': 'Procesos de sueños',
    '23h': 'Procesos de organización y enfoque',
    '24': 'Despierta tu poder interior: procesos de superpoder',
    '25': 'Emite en la onda cerebral alfa-theta',
    '26': 'Deja de contar tu historia de desgracia',
    '27': 'Muestra aprecio / gratitud',
    '28': 'Reemplaza hábitos de fracaso por hábitos de éxito (procesos aceleradores)',
    '29': 'Crea un mastermind',
    '30': 'Observa personas exitosas / aprende como aprendiz',
    '31': 'Escucha o lee historias de éxito',
    '32': 'Entrega primero aquello que deseas recibir',
    '33': 'Mentalidad de “hazlo ahora”',
    '34': 'Cuida tu cuerpo',
    '35': 'Encuentra el oro en la adversidad',
    '36': 'Limpia samskaras del campo',
    '37': 'Asume responsabilidad al 100%',
    '38': 'Generadores de campo de atracción',
    '39': 'Únete a un club que te conecte con una fuente de poder',
    '40': 'Vive con intención deliberada: permanece en el presente'
  },

  dateRange: {
    rangeLabel: 'Rango:',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de fin',
    presets: {
      '7d': '7 Días',
      '30d': '30 Días',
      '90d': '90 Días',
      '1y': '1 Año',
      all: 'Todo el tiempo',
      custom: 'Personalizado'
    }
  },

  update: {
    availableTitle: '¡v{version} está disponible!',
    releaseNotesFallback: 'Visita la página de versiones para descargar la última versión.',
    getUpdate: 'Actualizar',
    dismiss: 'Descartar'
  }
};

export default es;

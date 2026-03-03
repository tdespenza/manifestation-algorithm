/**
 * Auto-converted locale module for gl.
 */
import type { Messages } from './en';

const gl: Messages = {
  nav: {
    questionnaire: 'Cuestionario',
    history: 'Historia',
    settings: 'Configuración'
  },
  app: {
    name: 'Algoritmo de manifestación',
    unexpectedError: 'Produciuse un erro inesperado.'
  },
  home: {
    subtitle: 'Valora cada área da túa vida: descubre a túa puntuación de aliñamento'
  },
  dashboard: {
    title: 'Historial de seguimento do algoritmo de manifestación',
    subtitle: 'Fai un seguimento do teu progreso ao longo do tempo',
    loading: 'Cargando o teu historial...',
    noData: 'Non hai datos para este período',
    progressTrend: 'Tendencia de progreso',
    progressToGoal: 'Avance ata a meta',
    ofGoal: '{pct}% do obxectivo',
    goalReached: '🎯 Obxectivo alcanzado!',
    categoryBreakdown: 'Desglose de categorías',
    noSessionsRange: 'Non hai sesións neste intervalo',
    tryWiderRange: 'Proba un intervalo máis amplo ou selecciona un período diferente.',
    noSessionsYet: 'Aínda non hai sesións',
    completeFirst: 'Completa a túa primeira avaliación para ver o teu progreso e tendencias aquí.',
    startFirst: 'Comeza a primeira avaliación',
    export: {
      date: 'Data',
      time: 'Tempo',
      totalScore: 'Puntuación total',
      duration: 'Duración (min)',
      notes: 'Notas'
    }
  },
  stats: {
    averageScore: 'Puntuación media',
    medianScore: 'Puntuación media',
    highestScore: 'Puntuación máis alta',
    totalSessions: 'Total de sesións'
  },
  network: {
    rankings: 'Clasificación da rede',
    searchingPeers: 'Buscando compañeiros...',
    searching: 'Buscando...',
    online: 'En liña',
    peers: '{count} compañeiros',
    results: '{count} resultados',
    avgShort: 'Prom',
    p90Short: 'P90',
    averageScoreTitle: 'Puntuación media',
    percentile90Title: 'Percentil 90',
    globalAverage: 'Media global',
    percentile90: 'Percentil 90',
    manifestations: 'Manifestacións',
    activePeers: 'Iguais Activos',
    categoryRankings: 'Clasificación por categorías'
  },
  focusAreas: {
    title: 'Áreas de enfoque',
    subtitle:
      'As túas 3 categorías coa puntuación máis baixa: mellorar estas, obtén as maiores ganancias.',
    empty: 'Completa máis sesións para ver recomendacións de áreas de enfoque personalizadas.'
  },
  sessions: {
    recent: 'Sesións recentes',
    deselectAll: 'Deseleccione Todo',
    selectAll: 'Seleccione Todo',
    deleteCount: 'Eliminar {count}',
    cancel: 'Cancelar',
    select: 'Seleccione',
    deleting: 'Eliminando…'
  },
  settings: {
    title: 'Configuración da aplicación',
    close: 'Pecha a configuración',
    dataManagement: 'Xestión de datos',
    saveLastSession: 'Gardar a última sesión',
    saveLastSessionDesc: 'Enche previamente as respostas da túa sesión completada máis recente.',
    resetProgress: 'Restablecer o progreso',
    resetProgressDesc: 'Elimina todas as respostas gardadas e comeza de novo.',
    goals: 'Goles',
    targetScore: 'Puntuación obxectivo',
    targetScoreDesc:
      'Establece unha puntuación de obxectivos (1.000-10.000) para seguir o teu progreso no panel.',
    set: 'Establecer',
    clearGoal: 'Limpar',
    currentTarget: 'Obxectivo actual:',
    on: 'Activado',
    off: 'Desactivado',
    version: 'Algoritmo de manifestación {version}',
    clearAllAnswers: 'Borrar todas as respostas',
    clearConfirmTitle: 'Borrar todas as respostas',
    clearConfirmMessage:
      'Isto eliminará permanentemente todas as túas respostas actuais e non se pode desfacer.',
    clearConfirmLabel: 'Limpar',
    keepAnswers: 'Manteña as respostas',
    language: 'Linguaxe',
    languageDesc: 'Escolla o idioma de visualización da aplicación.',
    languageCount: '{count} idiomas dispoñibles',
    goalErrorRange: 'Introduza unha puntuación entre 1.000 e 10.000.'
  },
  questionnaire: {
    saving: 'Gardando...',
    saved: 'Gardado',
    progressText: '{pct} % completado ({answered}/{total})',
    progressAria: 'Progreso de finalización da avaliación',
    maxScore: 'Máximo: {score}',
    answerToScore: 'Resposta para puntuar',
    currentScore: 'Puntuación actual',
    scrollAll: 'Desprácese todo',
    stepByStep: 'Paso a Paso',
    questionOf: 'Pregunta {current} de {total}',
    previous: '← Anterior',
    next: 'Seguinte →',
    completeAssessment: 'Avaliación completa',
    startFresh: 'Queres comezar de novo?',
    resetAllAnswers: 'Restablecer todas as respostas',
    resetTitle: 'Restablecer todas as respostas?',
    resetMessage: 'Isto borrará todas as respostas e comezará de cero. Isto non se pode desfacer.',
    resetLabel: 'Restablecer',
    scoreQuality: {
      notStarted: 'Non comezou',
      manifesting: 'Manifestación ❆',
      aligned: 'Aliñado',
      building: 'Edificio',
      startingOut: 'Comezando'
    },
    submitHint: {
      zero: '0 das preguntas de {total} respondidas: as preguntas sen resposta son mínimas predeterminadas',
      partial:
        '{remaining} pregunta restante — as preguntas sen resposta predeterminadas son mínimas | {remaining} preguntas restantes: as preguntas sen resposta predeterminadas son mínimas',
      complete: 'Todas as preguntas respondidas, listas para enviar!'
    },
    submitTitle: {
      zero: 'Responde algunhas preguntas para completar a túa avaliación',
      partial: '{remaining} pregunta restante | {remaining} preguntas restantes',
      complete: 'Envía a túa avaliación completa'
    },
    submitError: 'Produciuse un erro ao gardar a sesión: {error}',
    dotTitle: 'Pregunta {index}',
    dotAria: 'Ir á pregunta {index}',
    keyboardHint: 'Consello: use ← → para navegar · 1–9 / 0 para valorar'
  },
  onboarding: {
    step0Title: 'Benvido ao Algoritmo de Manifestación',
    step0Body1:
      'Esta ferramenta axúdache a medir o aliñamento da túa mentalidade, hábitos e accións diarias co logro dos teus obxectivos. Responde a cada pregunta con honestidade para obter a túa puntuación actual.',
    step0Body2:
      'Completa o cuestionario a intervalos regulares para seguir o teu crecemento ao longo do tempo e ver cales son as áreas que necesitan máis atención.',
    step1Title: 'Como funciona a puntuación',
    step1Body:
      'Cada pregunta vale un número determinado de puntos. Califícate nunha escala de 1 a 10 para cada pregunta. Unha puntuación de 10 significa que encarna totalmente ese principio; 1 significa que non comezaches.',
    step1TargetHint: '🎯 Obxectivo: {target} | Máximo: {maximum}',
    excellent: 'Excelente',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Aliñación forte: continúa',
    good: 'Ben',
    goodRange: '4.001 – 7.000',
    goodNote: 'Base sólida - espazo para crecer',
    needsWork: 'Necesita Traballo',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Concéntrase primeiro nos fundamentos',
    step2Title: 'Os teus datos permanecen privados',
    step2Body1:
      'Todas as túas respostas e o historial de puntuacións almacénanse localmente no teu dispositivo mediante unha base de datos SQLite cifrada. Non se envía nada a ningún servidor sen o teu permiso explícito.',
    step2Body2:
      'A función opcional de compartición entre pares permíteche ver puntuacións agregadas anónimas doutros usuarios. Só comparte un resumo asinado criptográficamente; nunca as túas respostas individuais.',
    readyText: 'Listo? Imos obter a súa puntuación de referencia.',
    skipIntro: 'Saltar a introdución',
    next: 'A continuación',
    getStarted: 'Comeza'
  },
  sharing: {
    title: 'Compartir redes anónimas',
    privacyFirst: '🔒 Privacidade-Primeiro',
    description:
      'Opcionalmente, aporta os teus resultados de forma anónima á rede global. Nunca se comparte ningún nome, correo electrónico, enderezo IP ou ID do dispositivo.',
    enabled: 'Compartir activado: contribuír á rede',
    disabled: 'Uso compartido desactivado (predeterminado)',
    activeBadge: '✓ As túas puntuacións anónimas estanse compartindo cos teus compañeiros',
    enableNote: 'Habilita para ver o teu rango percentil en comparación coa rede global.'
  },
  category: {
    back: '‹ Atrás',
    history: 'Historia',
    date: 'Data',
    score: 'Puntuación',
    loading: 'Cargando...',
    notEnoughData: 'Non hai datos suficientes',
    noData: 'Non se atoparon datos para “{category}”.',
    goToDashboard: 'Vaia ao panel de control'
  },
  chartActions: {
    viewFullscreen: 'Ver pantalla completa',
    exitFullscreen: 'Saír da pantalla completa',
    copyChart: 'Copiar Gráfico',
    exportChart: 'Gráfico de exportación',
    exportDefault: '⬇ Exportar',
    exportExcel: '📊 Exportar Excel',
    exportCsv: '📄 Exportar CSV',
    exportPdf: '📑 Exportar PDF',
    exportHtml: '🌐 Exportar HTML',
    copied: 'Copiouse o gráfico no portapapeis',
    copyFailed: 'Produciuse un erro ao copiar: o portapapeis non está dispoñible',
    saveCancelled: 'Gardar cancelado'
  },
  resume: {
    continueLastSession: 'Queres continuar desde a última sesión?',
    welcomeBack: 'Benvido de novo!',
    historicalBody:
      'As túas respostas da túa última sesión completada xa foron cargadas previamente. Gustaríache manter eses valores como punto de partida ou comezar cun cuestionario completamente en branco?',
    activeBody:
      'Tes unha sesión en curso. Gustaríache retomar onde o deixaches ou comezar unha nova avaliación?',
    clearWarning: '⚠️ Isto borrará todas as respostas actuais. Estás seguro?',
    yesStartFresh: 'Si, comeza de novo',
    cancel: 'Cancelar',
    keepLastValues: 'Manter os últimos valores',
    resumeSession: 'Reanudar sesión',
    startFresh: 'Comeza de novo'
  },
  questionItem: {
    pointsSuffix: 'ptos',
    low: 'Baixo',
    high: 'Alto',
    rateAria: 'Valora {question}'
  },
  dateRange: {
    rangeLabel: 'Rango:',
    startDate: 'Data de inicio',
    endDate: 'Data de finalización',
    presets: {
      '7d': '7 días',
      '30d': '30 días',
      '90d': '90 días',
      '1y': '1 ano',
      all: 'Todo o Tempo',
      custom: 'Personalizado'
    }
  },
  update: {
    availableTitle: 'v{version} está dispoñible!',
    releaseNotesFallback: 'Visita a páxina do lanzamento para descargar a última versión.',
    getUpdate: 'Obter actualización',
    dismiss: 'Descartar'
  },
  questions: {
    '1': 'Domina os fundamentos',
    '2': 'Activa e ilumina palabras',
    '3': 'Atopa a dor e contrae enerxía',
    '4': 'Define o que queres',
    '5': 'Escribe o que queiras',
    '6': 'Non compartas o teu soño con outros',
    '7': 'Ten un desexo ardente polo teu obxectivo',
    '8': 'O obxectivo debe estar no Punto Dulce',
    '9': 'Toma unha decisión',
    '10': 'Sentirse ben ao posuír o teu obxectivo',
    '11': 'Liberar o apego ao resultado',
    '12': 'Permite que o COMO se manifeste',
    '13': 'Coñece a diferenza entre Soño e Obxectivo Principal',
    '14': 'Estar enfocado / Unidade de propósito',
    '15': 'Lista diaria de tarefas de prioridades',
    '16': 'Progreso da lista / Coñece a puntuación',
    '17': 'Usa o Ciclo de Éxito do Momentum',
    '18': 'Constrúe Soños - Libro dos Soños e Panel de Visión',
    '19': 'Enchufar no sistema',
    '20': 'Curso de Ciencia do Domínio Persoal',
    '21': 'Coida as palabras que falas: o que dis é o que obtés',
    '22': 'Fisioloxía / Viste para o éxito',
    '23': 'Intencións claras de contrarresto',
    '24': 'Desperta o teu Poder Interior: Procesos de Superpoder',
    '25': 'Transmitido na frecuencia de ondas cerebrais alfa-teta',
    '26': 'Deixa de contar a túa historia de desgraza',
    '27': 'Mostrar Apreciación / Gratitude',
    '28': 'Substitúe os hábitos de fracaso polos hábitos de éxito (Procesos aceleradores)',
    '29': 'Crear un Mastermind',
    '30': 'Ver persoas exitosas/aprendiz',
    '31': 'Escoita/Le Historias de Éxito',
    '32': 'Dá primeiro o que queres',
    '33': 'Mentalidade de Facer Isto Agora',
    '34': 'Coida o teu corpo',
    '35': 'Atopa o ouro na adversidade',
    '36': 'Limpar os Samskaras do Campo',
    '37': 'Asume o 100% da responsabilidade',
    '38': 'Xeradores de Campo de Atracción',
    '39': 'Únete a un clube que che conecte cunha fonte de enerxía',
    '40': 'Vive a vida con intención deliberada: está no tempo presente',
    '1a': 'A quen escoitas?',
    '1b': 'Índice de ensinabilidade',
    '1c': 'Balanza de adestramento',
    '1d': 'Competencia inconsciente',
    '19a': 'Ler libros',
    '19b': 'Escoitar audios',
    '19c': 'Asistir a eventos (mensualmente)',
    '19d': 'Dar e recibir recoñecemento / Regra de Ouro ampliada',
    '19e': 'Desenvolver relacións con persoas que pensan coma ti',
    '23a': 'Procesos de diñeiro',
    '23b': 'Procesos de relación',
    '23c': 'Procesos de liderado',
    '23d': 'Procesos de comunicación',
    '23e': 'Procesos de saúde',
    '23f': 'Procesos de Consciencia Espiritual',
    '23g': 'Procesos de soño',
    '23h': 'Organización e Procesos de Enfoque'
  }
};

export default gl;

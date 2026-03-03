/**
 * Auto-converted locale module for ca.
 */
import type { Messages } from './en';

const ca: Messages = {
  nav: {
    questionnaire: 'Qüestionari',
    history: 'Història',
    settings: 'Configuració'
  },
  app: {
    name: 'Algoritme de manifestació',
    unexpectedError: "S'ha produït un error inesperat."
  },
  home: {
    subtitle: "Valora cada àrea de la teva vida: descobreix la teva puntuació d'alineació"
  },
  dashboard: {
    title: "Historial de seguiment de l'algoritme de manifestació",
    subtitle: 'Feu un seguiment del vostre progrés al llarg del temps',
    loading: "S'està carregant el teu historial...",
    noData: 'No hi ha dades per a aquest període',
    progressTrend: 'Tendència de progrés',
    progressToGoal: "Progrés cap a l'objectiu",
    ofGoal: "{pct}% de l'objectiu",
    goalReached: '🎯 Objectiu assolit!',
    categoryBreakdown: 'Desglossament per categoria',
    noSessionsRange: 'No hi ha sessions en aquest rang',
    tryWiderRange: 'Proveu un interval més ampli o seleccioneu un període diferent.',
    noSessionsYet: 'Encara no hi ha sessions',
    completeFirst:
      'Completeu la vostra primera avaluació per veure el vostre progrés i tendències aquí.',
    startFirst: 'Iniciar la primera avaluació',
    export: {
      date: 'Data',
      time: 'Temps',
      totalScore: 'Puntuació total',
      duration: 'Durada (min)',
      notes: 'Notes'
    }
  },
  stats: {
    averageScore: 'Puntuació mitjana',
    medianScore: 'Puntuació mitjana',
    highestScore: 'Puntuació més alta',
    totalSessions: 'Total de sessions'
  },
  network: {
    rankings: 'Classificació de la xarxa',
    searchingPeers: 'Buscant companys...',
    searching: "S'està buscant...",
    online: 'En línia',
    peers: '{count} companys',
    results: '{count} resultats',
    avgShort: 'Mitjana',
    p90Short: 'P90',
    averageScoreTitle: 'Puntuació mitjana',
    percentile90Title: '90è percentil',
    globalAverage: 'Mitjana global',
    percentile90: '90è percentil',
    manifestations: 'Manifestacions',
    activePeers: 'Iguals actius',
    categoryRankings: 'Classificacions per categories'
  },
  focusAreas: {
    title: "Àrees d'enfocament",
    subtitle:
      "Les teves 3 categories amb la puntuació més baixa: la millora d'aquestes genera els guanys més importants.",
    empty: "Completa més sessions per veure recomanacions d'àrea d'enfocament personalitzades."
  },
  sessions: {
    recent: 'Sessions recents',
    deselectAll: 'Desseleccioneu-ho tot',
    selectAll: 'Seleccioneu Tot',
    deleteCount: 'Suprimeix {count}',
    cancel: 'Cancel·la',
    select: 'Seleccioneu',
    deleting: "S'està suprimint…"
  },
  settings: {
    title: "Configuració de l'aplicació",
    close: 'Tanca la configuració',
    dataManagement: 'Gestió de dades',
    saveLastSession: "Guarda l'última sessió",
    saveLastSessionDesc:
      'Empleneu prèviament les respostes de la vostra sessió completada més recent.',
    resetProgress: 'Restableix el progrés',
    resetProgressDesc: 'Suprimeix totes les respostes desades i comença de nou.',
    goals: 'Gols',
    targetScore: 'Puntuació objectiu',
    targetScoreDesc:
      "Establiu una puntuació d'objectius (1.000-10.000) per fer un seguiment del vostre progrés al tauler.",
    set: 'Set',
    clearGoal: 'Clar',
    currentTarget: 'Objectiu actual:',
    on: 'Encès',
    off: 'Apagat',
    version: 'Algoritme de manifestació {version}',
    clearAllAnswers: 'Esborra totes les respostes',
    clearConfirmTitle: 'Esborra totes les respostes',
    clearConfirmMessage:
      'Això suprimirà permanentment totes les teves respostes actuals i no es podrà desfer.',
    clearConfirmLabel: 'Clar',
    keepAnswers: 'Mantenir les respostes',
    language: 'Llengua',
    languageDesc: "Trieu l'idioma de visualització de l'aplicació.",
    languageCount: '{count} idiomes disponibles',
    goalErrorRange: 'Introduïu una puntuació entre 1.000 i 10.000.'
  },
  questionnaire: {
    saving: "S'està desant...",
    saved: 'Desat',
    progressText: '{pct}% completa ({answered}/{total})',
    progressAria: "Progrés de finalització de l'avaluació",
    maxScore: 'Màxim: {score}',
    answerToScore: 'Resposta per puntuar',
    currentScore: 'Puntuació actual',
    scrollAll: 'Desplaça-ho tot',
    stepByStep: 'Pas a pas',
    questionOf: 'Pregunta {current} de {total}',
    previous: '← Anterior',
    next: 'Següent →',
    completeAssessment: 'Avaluació completa',
    startFresh: 'Vols començar de nou?',
    resetAllAnswers: 'Restableix totes les respostes',
    resetTitle: 'Restablir totes les respostes?',
    resetMessage: 'Això esborrarà totes les respostes i començarà de zero. Això no es pot desfer.',
    resetLabel: 'Restableix',
    scoreQuality: {
      notStarted: 'No començat',
      manifesting: 'Manifestant ❆',
      aligned: 'Alineat',
      building: 'Edifici',
      startingOut: 'Començant'
    },
    submitHint: {
      zero: "S'han contestat 0 de {total} preguntes: preguntes sense resposta, de manera predeterminada, com a mínim",
      partial:
        '{remaining} pregunta restant: preguntes sense resposta per defecte al mínim | Queden preguntes de {remaining}: les preguntes sense resposta són mínimes per defecte',
      complete: "S'han contestat totes les preguntes, llest per enviar!"
    },
    submitTitle: {
      zero: 'Respon algunes preguntes per completar la teva avaluació',
      partial: '{remaining} pregunta restant | Queden preguntes de {remaining}',
      complete: 'Envieu la vostra avaluació completada'
    },
    submitError: "No s'ha pogut desar la sessió: {error}",
    dotTitle: 'Pregunta {index}',
    dotAria: 'Vés a la pregunta {index}',
    keyboardHint: 'Consell: utilitzeu ← → per navegar · 1–9/0 per puntuar'
  },
  onboarding: {
    step0Title: "Benvingut a l'algoritme de manifestació",
    step0Body1:
      "Aquesta eina us ajuda a mesurar com estan alineats la vostra mentalitat, hàbits i accions diàries amb l'assoliment dels vostres objectius. Respon cada pregunta amb honestedat per obtenir la teva puntuació actual.",
    step0Body2:
      'Ompliu el qüestionari a intervals regulars per fer un seguiment del vostre creixement al llarg del temps i veure quines àrees necessiten més atenció.',
    step1Title: 'Com funciona la puntuació',
    step1Body:
      "Cada pregunta val un nombre determinat de punts. Valoreu-vos en una escala d'1 a 10 per a cada pregunta. Una qualificació de 10 significa que encarnes completament aquest principi; 1 vol dir que no has començat.",
    step1TargetHint: '🎯 Objectiu: {target} | Màxim: {maximum}',
    excellent: 'Excel·lent',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Alineació forta: segueix endavant',
    good: 'Bé',
    goodRange: '4.001 – 7.000',
    goodNote: 'Base sòlida: espai per créixer',
    needsWork: 'Necessita Treball',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: "Centra't primer en els fonaments",
    step2Title: 'Les teves dades es mantenen privades',
    step2Body1:
      "Totes les vostres respostes i l'historial de puntuacions s'emmagatzemen localment al vostre dispositiu mitjançant una base de dades SQLite xifrada. No s'envia res a cap servidor sense el vostre permís explícit.",
    step2Body2:
      "La funció opcional d'intercanvi d'igual a igual us permet veure puntuacions agregades anònimes d'altres usuaris. Només comparteix un resum signat criptogràficament, mai les vostres respostes individuals.",
    readyText: 'Preparat? Obtenim la teva puntuació bàsica.',
    skipIntro: 'Omet la introducció',
    next: 'A continuació',
    getStarted: 'Comença'
  },
  sharing: {
    title: 'Compartició de xarxa anònima',
    privacyFirst: '🔒 Privadesa-Primer',
    description:
      'Opcionalment, aporteu els vostres resultats de manera anònima a la xarxa global. No es comparteix mai cap nom, correu electrònic, adreça IP o identificador del dispositiu.',
    enabled: 'Compartició activada: contribució a la xarxa',
    disabled: 'Compartició desactivada (per defecte)',
    activeBadge: '✓ Les teves puntuacions anònimes es comparteixen amb els companys',
    enableNote:
      'Activa per veure la teva classificació percentil en comparació amb la xarxa global.'
  },
  category: {
    back: '‹ Tornar',
    history: 'Història',
    date: 'Data',
    score: 'Puntuació',
    loading: 'Carregant...',
    notEnoughData: 'No hi ha prou dades',
    noData: 'No s\'han trobat dades per a "{category}".',
    goToDashboard: 'Aneu a Tauler de control'
  },
  chartActions: {
    viewFullscreen: 'Veure pantalla completa',
    exitFullscreen: 'Sortir de la pantalla completa',
    copyChart: 'Copia el gràfic',
    exportChart: 'Exportar gràfic',
    exportDefault: '⬇ Exporta',
    exportExcel: '📊 Exporta Excel',
    exportCsv: '📄 Exporta CSV',
    exportPdf: '📑 Exporta PDF',
    exportHtml: '🌐 Exporta HTML',
    copied: "S'ha copiat el gràfic al porta-retalls",
    copyFailed: 'Ha fallat la còpia: el porta-retalls no està disponible',
    saveCancelled: 'Desa cancel·lada'
  },
  resume: {
    continueLastSession: 'Voleu continuar des de la darrera sessió?',
    welcomeBack: 'Benvingut de nou!',
    historicalBody:
      "Les teves respostes de la darrera sessió completada s'han carregat prèviament. T'agradaria mantenir aquests valors com a punt de partida o començar amb un qüestionari completament en blanc?",
    activeBody:
      'Tens una sessió en curs. Voleu reprendre on ho vau deixar o començar una nova avaluació?',
    clearWarning: "⚠️ Això esborrarà totes les respostes actuals. N'estàs segur?",
    yesStartFresh: 'Sí, comença de nou',
    cancel: 'Cancel·la',
    keepLastValues: 'Mantenir els darrers valors',
    resumeSession: 'Reprendre sessió',
    startFresh: 'Comença de nou'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Baixa',
    high: 'Alt',
    rateAria: 'Valora {question}'
  },
  dateRange: {
    rangeLabel: 'Interval:',
    startDate: "Data d'inici",
    endDate: 'Data de finalització',
    presets: {
      '7d': '7 dies',
      '30d': '30 dies',
      '90d': '90 dies',
      '1y': '1 any',
      all: 'Tot el temps',
      custom: 'Personalitzat'
    }
  },
  update: {
    availableTitle: 'v{version} està disponible!',
    releaseNotesFallback: 'Visiteu la pàgina de llançament per descarregar la darrera versió.',
    getUpdate: 'Obteniu actualització',
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

export default ca;

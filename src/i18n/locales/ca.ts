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
    '1': 'Domina els fonaments bàsics',
    '2': 'Activa i il·lumina les paraules',
    '3': "Troba l'energia del dolor i contracta",
    '4': 'Defineix el que vols',
    '5': 'Escriu el que vulguis',
    '6': 'No comparteixis el teu somni amb els altres',
    '7': 'Obteniu un desig ardent pel vostre objectiu',
    '8': "L'objectiu ha d'estar al punt dolç",
    '9': 'Prendre una decisió',
    '10': 'Veure/sentir-se bé en possessió del teu objectiu',
    '11': 'Allibera el fitxer adjunt al resultat',
    '12': 'Permet que el COM es presenti',
    '13': 'Coneix la diferència entre Dream i Chief Aim',
    '14': 'Estar centrat / Unicitat de propòsit',
    '15': 'Llista diària de prioritats per fer',
    '16': 'Gràfic de progrés / Coneix la puntuació',
    '17': 'Utilitzeu el Momentum Cycle of Success',
    '18': 'Somni Construir - Llibre dels Somnis i Tauler de Visions',
    '19': 'Connecteu-vos al sistema',
    '20': 'Curs de Ciència del Domini Personal',
    '21': 'Observa les paraules que dius: el que dius és el que obtens',
    '22': "Fisiologia / Vesteix per a l'èxit",
    '23': 'Contra intencions clares',
    '24': 'Desperta el teu poder interior: processos de superpotència',
    '25': 'Emès a Alpha-theta brainwave',
    '26': "Deixa d'explicar la teva història d'ai",
    '27': 'Mostra apreciació / gratitud',
    '28': "Substitueix hàbits de fracàs per hàbits d'èxit (processos acceleradors)",
    '29': 'Crea una ment',
    '30': "Veure Persones d'èxit/aprenent",
    '31': "Escoltar/llegir històries d'èxit",
    '32': 'Primer regala el que vulguis',
    '33': 'Fes-ho ara mentalitat',
    '34': 'Cuida el teu cos',
    '35': "Troba l'or a l'adversitat",
    '36': 'Elimina Samskaras de Field',
    '37': 'Assumir el 100% de la responsabilitat',
    '38': "Generadors de camp d'atractor",
    '39': "Uneix-te a un club que et connecta a una font d'alimentació",
    '40': 'Viu la vida amb una intenció deliberada: sigues en el temps present',
    '1a': 'A qui escoltes?',
    '1b': "Índex d'ensenyament",
    '1c': "Balanç d'entrenament",
    '1d': 'Competència inconscient',
    '19a': 'Llegir llibres',
    '19b': 'Escolta els àudios',
    '19c': 'Assisteix a esdeveniments (mensuals)',
    '19d': "Donar i rebre Reconeixement / Regla d'Or ampliada",
    '19e': 'Desenvolupar relacions amb persones afins',
    '23a': 'Processos de diners',
    '23b': 'Processos de relació',
    '23c': 'Processos de lideratge',
    '23d': 'Processos de comunicació',
    '23e': 'Processos de salut',
    '23f': 'Processos de consciència espiritual',
    '23g': 'Processos dels somnis',
    '23h': "Organització i processos d'enfocament"
  }
};

export default ca;

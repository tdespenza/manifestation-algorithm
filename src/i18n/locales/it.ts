/**
 * Auto-converted locale module for it.
 */
import type { Messages } from './en';

const it: Messages = {
  nav: {
    questionnaire: 'Questionario',
    history: 'Storia',
    settings: 'Impostazioni'
  },
  app: {
    name: 'Algoritmo di manifestazione',
    unexpectedError: 'Si è verificato un errore imprevisto.'
  },
  home: {
    subtitle: 'Valuta ogni area della tua vita: scopri il tuo punteggio di allineamento'
  },
  dashboard: {
    title: 'Algoritmo di manifestazione che traccia la cronologia',
    subtitle: 'Tieni traccia dei tuoi progressi nel tempo',
    loading: 'Caricamento della cronologia…',
    noData: 'Nessun dato per questo periodo',
    progressTrend: 'Tendenza al progresso',
    progressToGoal: "Progresso verso l'obiettivo",
    ofGoal: "{pct}% dell'obiettivo",
    goalReached: '🎯 Obiettivo raggiunto!',
    categoryBreakdown: 'Ripartizione per categorie',
    noSessionsRange: 'Nessuna sessione in questo intervallo',
    tryWiderRange: 'Prova una gamma più ampia o seleziona un periodo diverso.',
    noSessionsYet: 'Nessuna sessione ancora',
    completeFirst:
      'Completa la tua prima valutazione per vedere i tuoi progressi e le tendenze qui.',
    startFirst: 'Inizia la prima valutazione',
    export: {
      date: 'Data',
      time: 'Tempo',
      totalScore: 'Punteggio totale',
      duration: 'Durata (min)',
      notes: 'Note'
    }
  },
  stats: {
    averageScore: 'Punteggio medio',
    medianScore: 'Punteggio mediano',
    highestScore: 'Punteggio più alto',
    totalSessions: 'Sessioni totali'
  },
  network: {
    rankings: 'Classifiche di rete',
    searchingPeers: 'Alla ricerca di colleghi...',
    searching: 'Ricerca...',
    online: 'In linea',
    peers: '{count} colleghi',
    results: '{count} risultati',
    avgShort: 'Media',
    p90Short: 'P90',
    averageScoreTitle: 'Punteggio medio',
    percentile90Title: '90esimo percentile',
    globalAverage: 'Media globale',
    percentile90: '90esimo percentile',
    manifestations: 'Manifestazioni',
    activePeers: 'Coetanei attivi',
    categoryRankings: 'Classifiche di categoria'
  },
  focusAreas: {
    title: 'Aree di interesse',
    subtitle:
      'Le tue 3 categorie con il punteggio più basso: il miglioramento di queste porta ai maggiori guadagni.',
    empty: 'Completa più sessioni per visualizzare consigli personalizzati sulle aree di interesse.'
  },
  sessions: {
    recent: 'Sessioni recenti',
    deselectAll: 'Deseleziona tutto',
    selectAll: 'Seleziona tutto',
    deleteCount: 'Elimina {count}',
    cancel: 'Annulla',
    select: 'Seleziona',
    deleting: 'Eliminazione…'
  },
  settings: {
    title: "Impostazioni dell'app",
    close: 'Chiudi le impostazioni',
    dataManagement: 'Gestione dei dati',
    saveLastSession: "Salva l'ultima sessione",
    saveLastSessionDesc: 'Precompila le risposte della sessione completata più recente.',
    resetProgress: 'Reimposta progresso',
    resetProgressDesc: 'Elimina tutte le risposte salvate e ricomincia da capo.',
    goals: 'Obiettivi',
    targetScore: 'Punteggio obiettivo',
    targetScoreDesc:
      'Imposta un punteggio obiettivo (1.000–10.000) per monitorare i tuoi progressi sulla dashboard.',
    set: 'Impostato',
    clearGoal: 'Chiaro',
    currentTarget: 'Obiettivo attuale:',
    on: 'Su',
    off: 'Spento',
    version: 'Algoritmo di manifestazione {version}',
    clearAllAnswers: 'Cancella tutte le risposte',
    clearConfirmTitle: 'Cancella tutte le risposte',
    clearConfirmMessage:
      'Questa operazione eliminerà definitivamente tutte le tue risposte attuali e non potrà essere annullata.',
    clearConfirmLabel: 'Chiaro',
    keepAnswers: 'Conserva le risposte',
    language: 'Lingua',
    languageDesc: "Scegli la lingua di visualizzazione per l'applicazione.",
    languageCount: '{count} lingue disponibili',
    goalErrorRange: 'Inserisci un punteggio compreso tra 1.000 e 10.000.'
  },
  questionnaire: {
    saving: 'Salvataggio...',
    saved: 'Salvato',
    progressText: '{pct}% completato ({answered}/{total})',
    progressAria: 'Avanzamento del completamento della valutazione',
    maxScore: 'Massimo: {score}',
    answerToScore: 'Rispondi al punteggio',
    currentScore: 'Punteggio attuale',
    scrollAll: 'Scorri tutto',
    stepByStep: 'Passo dopo passo',
    questionOf: 'Domanda {current} di {total}',
    previous: '← Precedente',
    next: 'Avanti →',
    completeAssessment: 'Valutazione completa',
    startFresh: 'Vuoi ricominciare da capo?',
    resetAllAnswers: 'Reimposta tutte le risposte',
    resetTitle: 'Reimpostare tutte le risposte?',
    resetMessage:
      'Questo cancellerà ogni risposta e ricomincerà da zero. Questa operazione non può essere annullata.',
    resetLabel: 'Ripristina',
    scoreQuality: {
      notStarted: 'Non iniziato',
      manifesting: 'Manifestare ❆',
      aligned: 'Allineato',
      building: 'Edificio',
      startingOut: 'Iniziare'
    },
    submitHint: {
      zero: '0 domande su {total} con risposta: le domande senza risposta sono impostate al minimo per impostazione predefinita',
      partial:
        '{remaining} domanda rimanente: le domande senza risposta sono impostate al minimo predefinito | {remaining} domande rimanenti: le domande senza risposta sono impostate al minimo per impostazione predefinita',
      complete: 'Tutte le domande hanno risposto: pronte per essere inviate!'
    },
    submitTitle: {
      zero: 'Rispondi ad alcune domande per completare la tua valutazione',
      partial: '{remaining} domanda rimanente | {remaining} domande rimanenti',
      complete: 'Invia la tua valutazione completata'
    },
    submitError: 'Impossibile salvare la sessione: {error}',
    dotTitle: 'Domanda {index}',
    dotAria: 'Vai alla domanda {index}',
    keyboardHint: 'Suggerimento: utilizzare ← → per navigare · 1–9 / 0 per valutare'
  },
  onboarding: {
    step0Title: "Benvenuti nell'algoritmo di manifestazione",
    step0Body1:
      'Questo strumento ti aiuta a misurare quanto la tua mentalità, le tue abitudini e le tue azioni quotidiane siano allineate con il raggiungimento dei tuoi obiettivi. Rispondi onestamente a ciascuna domanda per ottenere il tuo punteggio attuale.',
    step0Body2:
      'Completa il questionario a intervalli regolari per monitorare la tua crescita nel tempo e vedere quali aree richiedono maggiore attenzione.',
    step1Title: 'Come funziona il punteggio',
    step1Body:
      'Ogni domanda vale un determinato numero di punti. Valuta te stesso su una scala da 1 a 10 per ogni domanda. Una valutazione di 10 significa che incarni pienamente questo principio; 1 significa che non hai iniziato.',
    step1TargetHint: '🎯 Obiettivo: {target} | Massimo: {maximum}',
    excellent: 'Eccellente',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Forte allineamento: continua ad andare avanti',
    good: 'Bene',
    goodRange: '4.001 – 7.000',
    goodNote: 'Fondamenta solide: spazio per crescere',
    needsWork: 'Ha bisogno di lavoro',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Concentratevi prima sui fondamentali',
    step2Title: 'I tuoi dati rimangono privati',
    step2Body1:
      'Tutte le tue risposte e la cronologia dei punteggi vengono archiviate localmente sul tuo dispositivo utilizzando un database SQLite crittografato. Niente viene inviato a nessun server senza il tuo esplicito permesso.',
    step2Body2:
      'La funzione opzionale di condivisione peer-to-peer ti consente di vedere i punteggi aggregati anonimizzati di altri utenti. Condivide solo un riepilogo firmato crittograficamente, mai le tue risposte individuali.',
    readyText: 'Pronto? Prendiamo il tuo punteggio di base.',
    skipIntro: "Salta l'introduzione",
    next: 'Avanti',
    getStarted: 'Inizia'
  },
  sharing: {
    title: 'Condivisione di rete anonima',
    privacyFirst: '🔒 La privacy prima di tutto',
    description:
      'Facoltativamente, contribuisci i tuoi risultati in modo anonimo alla rete globale. Nessun nome, email, indirizzo IP o ID dispositivo viene mai condiviso.',
    enabled: 'Condivisione abilitata: contributo alla rete',
    disabled: 'Condivisione disabilitata (impostazione predefinita)',
    activeBadge: '✓ I tuoi punteggi anonimizzati vengono condivisi con i colleghi',
    enableNote: 'Abilita la visualizzazione del tuo ranking percentile rispetto alla rete globale.'
  },
  category: {
    back: '‹ Indietro',
    history: 'Storia',
    date: 'Data',
    score: 'Punteggio',
    loading: 'Caricamento...',
    notEnoughData: 'Dati insufficienti',
    noData: 'Nessun dato trovato per "{category}".',
    goToDashboard: 'Vai alla dashboard'
  },
  chartActions: {
    viewFullscreen: 'Visualizza a schermo intero',
    exitFullscreen: 'Esci dallo schermo intero',
    copyChart: 'Copia grafico',
    exportChart: "Grafico dell'esportazione",
    exportDefault: '⬇ Esporta',
    exportExcel: '📊 Esporta Excel',
    exportCsv: '📄 Esporta CSV',
    exportPdf: '📑 Esporta PDF',
    exportHtml: '🌐 Esporta HTML',
    copied: 'Grafico copiato negli appunti',
    copyFailed: 'Copia non riuscita: appunti non disponibili',
    saveCancelled: 'Salvataggio annullato'
  },
  resume: {
    continueLastSession: "Continuare dall'ultima sessione?",
    welcomeBack: 'Bentornato!',
    historicalBody:
      "Le risposte dell'ultima sessione completata sono state precaricate. Vorresti mantenere questi valori come punto di partenza o iniziare con un questionario completamente vuoto?",
    activeBody:
      'Hai una sessione in corso. Desideri riprendere da dove avevi interrotto o iniziare una nuova valutazione?',
    clearWarning: '⚠️ Questo cancellerà tutte le risposte attuali. Sei sicuro?',
    yesStartFresh: 'Sì, ricomincia da capo',
    cancel: 'Annulla',
    keepLastValues: 'Mantieni gli ultimi valori',
    resumeSession: 'Riprendi la sessione',
    startFresh: 'Ricominciare da capo'
  },
  questionItem: {
    pointsSuffix: 'punti',
    low: 'Basso',
    high: 'Alto',
    rateAria: 'Valuta {question}'
  },
  dateRange: {
    rangeLabel: 'Gamma:',
    startDate: 'Data di inizio',
    endDate: 'Data di fine',
    presets: {
      '7d': '7 giorni',
      '30d': '30 giorni',
      '90d': '90 giorni',
      '1y': '1 anno',
      all: 'Tutto il tempo',
      custom: 'Personalizzato'
    }
  },
  update: {
    availableTitle: 'v{version} è disponibile!',
    releaseNotesFallback: 'Visita la pagina di rilascio per scaricare la versione più recente.',
    getUpdate: 'Ottieni aggiornamento',
    dismiss: 'Ignora'
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

export default it;

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
    '1': 'Padroneggia le basi',
    '2': 'Attiva e illumina le parole',
    '3': 'Trova il dolore e contrae energia',
    '4': 'Definisci cosa vuoi',
    '5': 'Scrivi cosa vuoi',
    '6': 'Non condividere il tuo sogno con gli altri',
    '7': 'Sviluppa un desiderio ardente per il tuo obiettivo',
    '8': "L'obiettivo deve essere nel punto ideale",
    '9': 'Prendi una decisione',
    '10': 'Guarda/Sentirti bene in possesso del tuo obiettivo',
    '11': "Libera l'attaccamento al risultato",
    '12': 'Lascia che il COME si manifesti',
    '13': 'Conosci la differenza tra Sogno e Obiettivo Principale',
    '14': 'Sii Concentrato / Unicità di Scopo',
    '15': 'Elenco giornaliero delle priorità',
    '16': 'Progressi in classifica / Conosci il punteggio',
    '17': 'Usa il ciclo di slancio del successo',
    '18': 'Costruisci il sogno - Libro dei sogni e Vision Board',
    '19': 'Collegati al sistema',
    '20': 'Corso di Scienza della Maestria Personale',
    '21': 'Fai attenzione alle parole che dici - quello che dici è ciò che ottieni',
    '22': 'Fisiologia / Vestirsi per il successo',
    '23': 'Chiare controintenzioni',
    '24': 'Risveglia il tuo potere interiore: processi di superpotere',
    '25': 'Trasmissione su onde cerebrali alfa-theta',
    '26': 'Smettila di raccontare la tua storia di dolore',
    '27': 'Mostra apprezzamento / gratitudine',
    '28': 'Sostituire le abitudini di fallimento con abitudini di successo (processi acceleratori)',
    '29': 'Crea un Genio',
    '30': 'Guarda Persone di successo/Apprendista',
    '31': 'Ascolta/Leggi storie di successo',
    '32': 'Dai prima quello che vuoi',
    '33': 'Mentalità del farlo ora',
    '34': 'Prenditi cura del tuo corpo',
    '35': "Trova l'oro nelle avversità",
    '36': 'Liberare i Samskara dal campo',
    '37': 'Assumiti il 100% di responsabilità',
    '38': 'Generatori di campo attrattore',
    '39': 'Unisciti a un Club che ti collega a una fonte di energia',
    '40': 'Vivi la vita con intenti deliberati - sii nel presente',
    '1a': 'A chi ascolti?',
    '1b': 'Indice di apprendimento',
    '1c': "Bilanciamento dell'addestramento",
    '1d': 'Competenza inconscia',
    '19a': 'Leggi libri',
    '19b': 'Ascolta gli audio',
    '19c': 'Partecipa agli eventi (mensilmente)',
    '19d': "Dare e ricevere riconoscimenti / Regola d'Oro ampliata",
    '19e': 'Sviluppa relazioni con persone che la pensano allo stesso modo',
    '23a': 'Processi monetari',
    '23b': 'Processi relazionali',
    '23c': 'Processi di Leadership',
    '23d': 'Processi di comunicazione',
    '23e': 'Processi sanitari',
    '23f': 'Processi di Consapevolezza Spirituale',
    '23g': 'Processi onirici',
    '23h': 'Organizzazione e Processi di Focus'
  }
};

export default it;

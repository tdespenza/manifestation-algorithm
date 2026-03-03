/**
 * Auto-converted locale module for co.
 */
import type { Messages } from './en';

const co: Messages = {
  nav: {
    questionnaire: 'Questionnaire',
    history: 'Storia',
    settings: 'Settings'
  },
  app: {
    name: 'Algoritmu di manifestazione',
    unexpectedError: 'Un errore imprevisu hè accadutu.'
  },
  home: {
    subtitle: 'Valuta ogni area di a vostra vita - scopre u vostru puntu di allinamentu'
  },
  dashboard: {
    title: "Storia di tracciamentu di l'algoritmu di manifestazione",
    subtitle: 'Segui u vostru prugressu cù u tempu',
    loading: 'Carica a vostra storia...',
    noData: 'Nisuna dati per questu periodu',
    progressTrend: 'Tendenza di u prugressu',
    progressToGoal: 'Avanzate à u scopu',
    ofGoal: '{pct}% di u scopu',
    goalReached: '🎯 Obiettivu rializatu !',
    categoryBreakdown: 'Category Breakdown',
    noSessionsRange: 'Nisuna sessione in questa gamma',
    tryWiderRange: 'Pruvate una gamma più larga o selezziunate un periodu diversu.',
    noSessionsYet: 'Nisuna sessione ancora',
    completeFirst:
      'Cumplete a vostra prima valutazione per vede u vostru prugressu è e tendenze quì.',
    startFirst: 'Cumincià a Prima Valutazione',
    export: {
      date: 'Data',
      time: 'U tempu',
      totalScore: 'Puntu tutale',
      duration: 'Durata (min)',
      notes: 'Notes'
    }
  },
  stats: {
    averageScore: 'Puntu mediu',
    medianScore: 'Puntu mediu',
    highestScore: 'Puntu più altu',
    totalSessions: 'Sessioni totali'
  },
  network: {
    rankings: 'Classifica di a rete',
    searchingPeers: 'A ricerca di i pari...',
    searching: 'Ricerca...',
    online: 'In linea',
    peers: '{count} pari',
    results: '{count} risultati',
    avgShort: 'Avg',
    p90Short: 'P90',
    averageScoreTitle: 'Puntu mediu',
    percentile90Title: '90e percentile',
    globalAverage: 'Media Globale',
    percentile90: '90e percentile',
    manifestations: 'Manifestazioni',
    activePeers: 'Pari attivi',
    categoryRankings: 'Classifica di categuria'
  },
  focusAreas: {
    title: 'Zone Focus',
    subtitle:
      'E vostre 3 categurie cù u puntu più bassu - a migliurà di queste conduce i più grandi guadagni.',
    empty: "Completa più sessioni per vede cunsiglii persunalizati di l'area di focus."
  },
  sessions: {
    recent: 'Sessioni recenti',
    deselectAll: 'Deselezziunà tuttu',
    selectAll: 'Selezziunà tuttu',
    deleteCount: 'Elimina {count}',
    cancel: 'Cancella',
    select: 'Selezziunà',
    deleting: 'Cancellazione…'
  },
  settings: {
    title: 'Settings App',
    close: 'Chiudi i paràmetri',
    dataManagement: 'Gestione di dati',
    saveLastSession: "Salvà l'ultima sessione",
    saveLastSessionDesc: 'Pre-riempite e risposte da a vostra sessione cumpleta più recente.',
    resetProgress: 'Resettate u prugressu',
    resetProgressDesc: 'Sguassate tutte e risposte salvate è cuminciate da novu.',
    goals: 'Obiettivi',
    targetScore: 'Puntu di destinazione',
    targetScoreDesc:
      'Stabilite un puntu di scopu (1,000-10,000) per seguità u vostru prugressu nantu à u dashboard.',
    set: 'Set',
    clearGoal: 'Chjara',
    currentTarget: 'Obiettivu attuale:',
    on: 'On',
    off: 'Off',
    version: 'Algoritmu di manifestazione {version}',
    clearAllAnswers: 'Cancella tutte e risposte',
    clearConfirmTitle: 'Cancella tutte e risposte',
    clearConfirmMessage:
      'Questu eliminerà permanentemente tutte e vostre risposte attuali è ùn pò micca esse annullatu.',
    clearConfirmLabel: 'Chjara',
    keepAnswers: 'Mantene e Risposte',
    language: 'Lingua',
    languageDesc: "Sceglite a lingua di visualizazione per l'applicazione.",
    languageCount: '{count} lingue dispunibuli',
    goalErrorRange: 'Per piacè inserite un puntuatu trà 1,000 è 10,000.'
  },
  questionnaire: {
    saving: 'Salvà...',
    saved: 'Salvatu',
    progressText: '{pct}% cumpletu ({answered}/{total})',
    progressAria: 'Prugressu di cumpiimentu di a valutazione',
    maxScore: 'Max: {score}',
    answerToScore: 'Rispondi à puntuà',
    currentScore: 'Score attuale',
    scrollAll: 'Scroll All',
    stepByStep: 'Passu à Passu',
    questionOf: 'Quistione {current} di {total}',
    previous: '← Previous',
    next: 'Next →',
    completeAssessment: 'Valutazione cumpleta',
    startFresh: 'Vulete principià novu?',
    resetAllAnswers: 'Resetta tutte e risposte',
    resetTitle: 'Resetta tutte e risposte?',
    resetMessage:
      'Questu hà da sguassà ogni risposta è cumincià da zero. Questu ùn pò micca esse annullatu.',
    resetLabel: 'Resettate',
    scoreQuality: {
      notStarted: 'Ùn hè micca cuminciatu',
      manifesting: 'Manifestendu ❆',
      aligned: 'Allineatu',
      building: 'Edificiu',
      startingOut: 'Partendu'
    },
    submitHint: {
      zero: '0 di {total} dumande risposte - dumande senza risposta predeterminate à u minimu',
      partial:
        '{remaining} question restante - dumande senza risposta predeterminatu à u minimu | {remaining} dumande restanti - dumande senza risposta predeterminatu à u minimu',
      complete: 'Tutte e dumande risposti - pronte à mandà!'
    },
    submitTitle: {
      zero: 'Rispondi à alcune dumande per compie a vostra valutazione',
      partial: '{remaining} quistione restante | {remaining} dumande restante',
      complete: 'Mandate a vostra valutazione cumpleta'
    },
    submitError: 'Impossible di salvà a sessione: {error}',
    dotTitle: 'Quistione {index}',
    dotAria: 'Andà à a quistione {index}',
    keyboardHint: 'Cunsigliu: Aduprate ← → per navigà · 1–9 / 0 per valutà'
  },
  onboarding: {
    step0Title: "Benvenuti à l'Algoritmu di Manifestazione",
    step0Body1:
      'Questu strumentu vi aiuta à misurà quantu allineati a vostra mente, abitudini è azioni di ogni ghjornu sò cun u rializazione di i vostri scopi. Rispondi à ogni dumanda onestamente per ottene u vostru puntu attuale.',
    step0Body2:
      'Cumplete u questionnaire à intervalli regulari per seguità a vostra crescita in u tempu è vede quali spazii necessitanu più attenzione.',
    step1Title: 'Cumu Funziona u Scoring',
    step1Body:
      'Ogni dumanda vale un numeru di punti. Valuta sè stessu nantu à una scala da 1 à 10 per ogni dumanda. Una valutazione di 10 significa chì incarnate pienamente stu principiu; 1 significa chì ùn avete micca principiatu.',
    step1TargetHint: '🎯 Target: {target} | Massimu: {maximum}',
    excellent: 'Eccellente',
    excellentRange: '7 001 - 10 000',
    excellentNote: 'Allineamentu forte - cuntinuà',
    good: 'Bonu',
    goodRange: '4.001 - 7.000',
    goodNote: 'Fundamentu solidu - spaziu per cultivà',
    needsWork: 'Hè bisognu di travagliu',
    needsWorkRange: '0 - 4 000',
    needsWorkNote: 'Focus nantu à i fundamenti prima',
    step2Title: 'I vostri Dati Restanu Privati',
    step2Body1:
      'Tutte e vostre risposte è a storia di u puntuazione sò almacenate in u locu in u vostru dispositivu utilizendu una basa di dati SQLite criptata. Nunda hè mandatu à qualsiasi servitore senza u vostru permessu esplicitu.',
    step2Body2:
      'A funzione opzionale di spartera peer-to-peer vi permette di vede i punteggi aggregati anonimati da altri utilizatori. Cumparte solu un riassuntu firmatu criptograficamente - mai e vostre risposte individuali.',
    readyText: 'Pronti ? Facemu u vostru puntu di basa.',
    skipIntro: "Salta l'intro",
    next: 'Dopu',
    getStarted: 'Cuminciate'
  },
  sharing: {
    title: 'Condivisione di rete anonima',
    privacyFirst: '🔒 Privacy-Prima',
    description:
      'Opzionalmente, cuntribuisce i vostri risultati anonimamente à a reta glubale. Nisun nome, email, indirizzu IP, o ID di u dispositivu ùn hè mai spartutu.',
    enabled: 'A spartera attivata - cuntribuisce à a rete',
    disabled: 'A spartera disattivata (predefinitu)',
    activeBadge: '✓ I vostri punteggi anonimi sò spartuti cù i pari',
    enableNote: 'Permette à vede u vostru rangu percentile cumparatu cù a reta glubale.'
  },
  category: {
    back: '‹ Torna',
    history: 'Storia',
    date: 'Data',
    score: 'Score',
    loading: 'Caricamentu...',
    notEnoughData: 'Dati micca abbastanza',
    noData: 'Nisuna datu truvata per "{category}".',
    goToDashboard: 'Andà à Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Vede a pantalla completa',
    exitFullscreen: 'Esci da u screnu pienu',
    copyChart: 'Copia Chart',
    exportChart: 'Esporta carta',
    exportDefault: '⬇ Esporta',
    exportExcel: '📊 Esporta Excel',
    exportCsv: '📄 Esporta CSV',
    exportPdf: '📑 Esporta PDF',
    exportHtml: '🌐 Esporta HTML',
    copied: 'Graficu copiatu in u clipboard',
    copyFailed: 'Copy failed - clipboard ùn hè micca dispunibule',
    saveCancelled: 'Salvà annullatu'
  },
  resume: {
    continueLastSession: "Cuntinuà da l'ultima sessione ?",
    welcomeBack: 'Benvenuta di ritornu!',
    historicalBody:
      "E vostre risposte da a vostra ultima sessione cumpleta sò state precaricate. Vulete mantene quelli valori cum'è un puntu di partenza, o principià cù un questionnaire completamente in biancu?",
    activeBody:
      'Avete una sessione in corso. Vulete ripiglià induve avete lasciatu, o principià una nova valutazione?',
    clearWarning: '⚠️ Questu hà da sguassà tutte e risposte attuali. Sì sicuru?',
    yesStartFresh: 'Iè, principià novu',
    cancel: 'Cancella',
    keepLastValues: "Mantene l'ultimi valori",
    resumeSession: 'Riprendi a sessione',
    startFresh: 'Accuminciate frescu'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Bassu',
    high: 'Altu',
    rateAria: 'Rate {question}'
  },
  dateRange: {
    rangeLabel: 'Gamma:',
    startDate: 'Data di principiu',
    endDate: 'Data di fine',
    presets: {
      '7d': '7 ghjorni',
      '30d': '30 ghjorni',
      '90d': '90 ghjorni',
      '1y': '1 annu',
      all: 'All Time',
      custom: 'Custom'
    }
  },
  update: {
    availableTitle: 'v{version} hè dispunibule!',
    releaseNotesFallback: "Visita a pagina di liberazione per scaricà l'ultima versione.",
    getUpdate: 'Get Update',
    dismiss: 'Licenziate'
  },
  questions: {
    '1': 'Maestru i Basics',
    '2': 'Attivate & Illuminate Parolle',
    '3': 'Truvate Pain & Contract Energy',
    '4': 'Definite ciò chì vulete',
    '5': 'Scrivite ciò chì vulete',
    '6': "Ùn sparte u to sonniu cù l'altri",
    '7': 'Ottene un desideriu ardente per u vostru scopu',
    '8': 'U scopu deve esse in Sweet Spot',
    '9': 'Fate una decisione',
    '10': 'Vede / Sentite bè in pussessu di u vostru scopu',
    '11': "Libera l'attache à u risultatu",
    '12': 'Permette à u COME si prisenta',
    '13': 'Sapete a diffarenza trà Dream & Chief Aim',
    '14': 'Siate Focus / Unicità di scopu',
    '15': 'Quotidiana da fà a lista di priorità',
    '16': 'Prugressu di u Graficu / Sapete u Score',
    '17': 'Aduprate Momentum Cycle of Success',
    '18': 'Sogna Custruisce - Libru di Sogni è Tavula di Visione',
    '19': 'Cunnette in u Sistema',
    '20': 'Corso di Scienza di Maestria Personale',
    '21': 'Fighjate e parolle chì dite - ciò chì dite hè ciò chì avete',
    '22': 'Fisiologia / Vestite per successu',
    '23': "Claire l'intenzione di contru",
    '24': 'Svegliate u vostru Power Inner: Processi di Superpower',
    '25': "Trasmissione nantu à l'onda cerebrale Alpha-theta",
    '26': 'Smetti di cuntà a vostra storia di guai',
    '27': 'Mostra Apprezzazione / Gratitudine',
    '28': "Sustituisce l'abitudini di fallimentu cù l'abitudini di successu (processi acceleratori)",
    '29': 'Crea un Mastermind',
    '30': 'Fighjate Persone di successu / Apprentice',
    '31': 'Ascolta / Leghjite Storie di Successu',
    '32': 'Dà ciò chì vulete prima',
    '33': 'Fate avà Mentalità',
    '34': 'Pigliate a cura di u vostru corpu',
    '35': "Truvate l'oru in l'adversità",
    '36': 'Elimina Samskaras da u campu',
    '37': 'Pigliate 100% Rispunsabilità',
    '38': 'Generatori di campu Attractor',
    '39': 'Unisciti à un Club chì vi cunnetta à una Fonte di energia',
    '40': 'Vive a vita cun intenzione deliberata - esse in u tempu presente',
    '1a': 'Quale stai à sente ?',
    '1b': "Indice d'aptitude à l'enseignement",
    '1c': 'Scala di bilanciu di furmazione',
    '1d': 'Cumpetenza inconsciente',
    '19a': 'Leghjite i libri',
    '19b': "Ascolta l'Audio",
    '19c': "Assiste à l'avvenimenti (mensile)",
    '19d': "Dà è riceve Ricunniscenza / Regola d'Oro ampliata",
    '19e': 'Sviluppà relazioni cù e persone chì pensanu',
    '23a': 'Prucessi di soldi',
    '23b': 'Processi di relazione',
    '23c': 'Prucessi di Leadership',
    '23d': 'Prucessi di cumunicazione',
    '23e': 'Prucessi di salute',
    '23f': 'Processi di Cuscenza Spirituale',
    '23g': 'Prucessi di sognu',
    '23h': "Prucessi d'urganizazione è Focus"
  }
};

export default co;

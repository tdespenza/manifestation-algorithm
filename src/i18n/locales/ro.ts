/**
 * Auto-converted locale module for ro.
 */
import type { Messages } from './en';

const ro: Messages = {
  nav: {
    questionnaire: 'Chestionar',
    history: 'istorie',
    settings: 'Setări'
  },
  app: {
    name: 'Algoritmul de manifestare',
    unexpectedError: 'A apărut o eroare neașteptată.'
  },
  home: {
    subtitle: 'Evaluează fiecare domeniu al vieții tale — descoperi-ți scorul de aliniere'
  },
  dashboard: {
    title: 'Istoricul de urmărire al algoritmului de manifestare',
    subtitle: 'Urmăriți-vă progresul în timp',
    loading: 'Se încarcă istoricul...',
    noData: 'Nu există date pentru această perioadă',
    progressTrend: 'Tendință de progres',
    progressToGoal: 'Progres spre obiectiv',
    ofGoal: '{pct}% din obiectiv',
    goalReached: '🎯 Obiectiv atins!',
    categoryBreakdown: 'Defalcarea categoriei',
    noSessionsRange: 'Nu există sesiuni în acest interval',
    tryWiderRange: 'Încercați o gamă mai largă sau selectați o altă perioadă.',
    noSessionsYet: 'Nicio sesiune încă',
    completeFirst: 'Finalizați prima evaluare pentru a vedea progresul și tendințele dvs. aici.',
    startFirst: 'Începeți prima evaluare',
    export: {
      date: 'Data',
      time: 'timpul',
      totalScore: 'Scorul total',
      duration: 'Durata (min)',
      notes: 'Note'
    }
  },
  stats: {
    averageScore: 'Scor mediu',
    medianScore: 'Scorul mediu',
    highestScore: 'Cel mai mare scor',
    totalSessions: 'Total sesiuni'
  },
  network: {
    rankings: 'Clasamentul rețelei',
    searchingPeers: 'În căutarea colegilor...',
    searching: 'Se caută...',
    online: 'Online',
    peers: '{count} colegi',
    results: '{count} rezultate',
    avgShort: 'Mediu',
    p90Short: 'P90',
    averageScoreTitle: 'Scor mediu',
    percentile90Title: 'Percentila 90',
    globalAverage: 'Media globală',
    percentile90: 'Percentila 90',
    manifestations: 'Manifestări',
    activePeers: 'Semeni activi',
    categoryRankings: 'Clasamentul categoriei'
  },
  focusAreas: {
    title: 'Zone de focalizare',
    subtitle:
      'Cele 3 categorii ale tale cu cele mai mici scoruri — îmbunătățirea acestora generează cele mai mari câștiguri.',
    empty:
      'Finalizați mai multe sesiuni pentru a vedea recomandări personalizate pentru zonele de focalizare.'
  },
  sessions: {
    recent: 'Sesiuni recente',
    deselectAll: 'Deselectați Toate',
    selectAll: 'Selectați Toate',
    deleteCount: 'Șterge {count}',
    cancel: 'Anulează',
    select: 'Selectați',
    deleting: 'Se șterge…'
  },
  settings: {
    title: 'Setările aplicației',
    close: 'Închideți setările',
    dataManagement: 'Managementul datelor',
    saveLastSession: 'Salvați ultima sesiune',
    saveLastSessionDesc:
      'Completați în prealabil răspunsurile din cea mai recentă sesiune finalizată.',
    resetProgress: 'Resetați progresul',
    resetProgressDesc: 'Ștergeți toate răspunsurile salvate și începeți din nou.',
    goals: 'Goluri',
    targetScore: 'Scorul țintă',
    targetScoreDesc:
      'Setați un scor pentru gol (1.000–10.000) pentru a vă urmări progresul pe tabloul de bord.',
    set: 'Setați',
    clearGoal: 'Clar',
    currentTarget: 'Ținta curentă:',
    on: 'Pornit',
    off: 'Oprit',
    version: 'Algoritmul de manifestare {version}',
    clearAllAnswers: 'Ștergeți toate răspunsurile',
    clearConfirmTitle: 'Ștergeți toate răspunsurile',
    clearConfirmMessage:
      'Aceasta va șterge definitiv toate răspunsurile dvs. curente și nu poate fi anulată.',
    clearConfirmLabel: 'Clar',
    keepAnswers: 'Păstrați răspunsurile',
    language: 'Limba',
    languageDesc: 'Alegeți limba de afișare pentru aplicație.',
    languageCount: '{count} limbi disponibile',
    goalErrorRange: 'Vă rugăm să introduceți un scor între 1.000 și 10.000.'
  },
  questionnaire: {
    saving: 'Se salvează...',
    saved: 'Salvat',
    progressText: '{pct}% finalizat ({answered}/{total})',
    progressAria: 'Progresul finalizării evaluării',
    maxScore: 'Max: {score}',
    answerToScore: 'Răspuns pentru a puncta',
    currentScore: 'Scorul curent',
    scrollAll: 'Derulați pe toate',
    stepByStep: 'Pas cu Pas',
    questionOf: 'Întrebare {current} de la {total}',
    previous: '← Anterior',
    next: 'Următorul →',
    completeAssessment: 'Evaluare completă',
    startFresh: 'Vrei să începi din nou?',
    resetAllAnswers: 'Resetați toate răspunsurile',
    resetTitle: 'Resetați toate răspunsurile?',
    resetMessage:
      'Acest lucru va șterge fiecare răspuns și va începe de la zero. Acest lucru nu poate fi anulat.',
    resetLabel: 'Resetați',
    scoreQuality: {
      notStarted: 'Nu a început',
      manifesting: 'Manifestând ❆',
      aligned: 'Aliniat',
      building: 'Clădire',
      startingOut: 'Începând'
    },
    submitHint: {
      zero: 'S-a răspuns la 0 dintre {total} întrebări — întrebările fără răspuns sunt implicite la minim',
      partial:
        '{remaining} întrebare rămasă — întrebările fără răspuns sunt implicite la minim | {remaining} întrebări rămase — întrebările fără răspuns sunt implicite la minim',
      complete: 'S-a răspuns la toate întrebările — gata de trimis!'
    },
    submitTitle: {
      zero: 'Răspunde la câteva întrebări pentru a-ți finaliza evaluarea',
      partial: '{remaining} întrebare rămasă | {remaining} întrebări rămase',
      complete: 'Trimiteți evaluarea dvs. finalizată'
    },
    submitError: 'Sesiunea nu a fost salvată: {error}',
    dotTitle: 'Întrebare {index}',
    dotAria: 'Accesați întrebarea {index}',
    keyboardHint: 'Sfat: Folosiți ← → pentru a naviga · 1–9 / 0 pentru a evalua'
  },
  onboarding: {
    step0Title: 'Bun venit la algoritmul de manifestare',
    step0Body1:
      'Acest instrument vă ajută să măsurați cât de aliniate sunt mentalitatea, obiceiurile și acțiunile zilnice cu atingerea obiectivelor. Răspundeți sincer la fiecare întrebare pentru a obține scorul actual.',
    step0Body2:
      'Completați chestionarul la intervale regulate pentru a vă urmări creșterea în timp și pentru a vedea care domenii necesită cea mai mare atenție.',
    step1Title: 'Cum funcționează scoring',
    step1Body:
      'Fiecare întrebare valorează un număr stabilit de puncte. Evaluează-te pe o scară de la 1 la 10 pentru fiecare întrebare. O evaluare de 10 înseamnă că întruchipați pe deplin acest principiu; 1 înseamnă că nu ai început.',
    step1TargetHint: '🎯 Țintă: {target} | Maxim: {maximum}',
    excellent: 'Excelent',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Aliniere puternică - continuă',
    good: 'Bun',
    goodRange: '4.001 – 7.000',
    goodNote: 'Fundație solidă - spațiu de creștere',
    needsWork: 'Are nevoie de muncă',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Concentrați-vă mai întâi pe elementele fundamentale',
    step2Title: 'Datele dvs. rămân private',
    step2Body1:
      'Toate răspunsurile și istoricul scorurilor dvs. sunt stocate local pe dispozitivul dvs. folosind o bază de date criptată SQLite. Nimic nu este trimis la niciun server fără permisiunea dumneavoastră explicită.',
    step2Body2:
      'Funcția opțională de partajare peer-to-peer vă permite să vedeți scorurile agregate anonimizate de la alți utilizatori. Partajează doar un rezumat semnat criptografic - niciodată răspunsurile dvs. individuale.',
    readyText: 'Gata? Să obținem scorul de bază.',
    skipIntro: 'Omite introducerea',
    next: 'În continuare',
    getStarted: 'Începeți'
  },
  sharing: {
    title: 'Partajare anonimă în rețea',
    privacyFirst: '🔒 Confidențialitate-în primul rând',
    description:
      'Opțional, contribuiți cu rezultatele dvs. anonim la rețeaua globală. Nu se partajează niciodată nume, e-mail, adresă IP sau ID dispozitiv.',
    enabled: 'Partajare activată — contribuție la rețea',
    disabled: 'Partajare dezactivată (implicit)',
    activeBadge: '✓ Scorurile tale anonimizate sunt partajate colegilor',
    enableNote: 'Activați pentru a vedea clasarea dvs. percentilă în comparație cu rețeaua globală.'
  },
  category: {
    back: '‹ Înapoi',
    history: 'istorie',
    date: 'Data',
    score: 'Scor',
    loading: 'Se încarcă...',
    notEnoughData: 'Nu sunt suficiente date',
    noData: 'Nu s-au găsit date pentru „{category}”.',
    goToDashboard: 'Accesați tabloul de bord'
  },
  chartActions: {
    viewFullscreen: 'Vizualizați pe tot ecranul',
    exitFullscreen: 'Ieșiți din ecranul complet',
    copyChart: 'Copiați diagrama',
    exportChart: 'Export diagramă',
    exportDefault: '⬇ Export',
    exportExcel: '📊 Exportați Excel',
    exportCsv: '📄 Exportați CSV',
    exportPdf: '📑 Export PDF',
    exportHtml: '🌐 Export HTML',
    copied: 'Diagrama a fost copiată în clipboard',
    copyFailed: 'Copierea eșuată — clipboard nu este disponibil',
    saveCancelled: 'Salvare anulată'
  },
  resume: {
    continueLastSession: 'Continuați din ultima sesiune?',
    welcomeBack: 'Bine ai revenit!',
    historicalBody:
      'Răspunsurile dvs. din ultima sesiune finalizată au fost preîncărcate. Doriți să păstrați aceste valori ca punct de plecare sau să începeți cu un chestionar complet gol?',
    activeBody:
      'Ai o sesiune în curs. Doriți să reluați de unde ați rămas sau să începeți o nouă evaluare?',
    clearWarning: '⚠️ Acest lucru va șterge toate răspunsurile curente. esti sigur?',
    yesStartFresh: 'Da, începe proaspăt',
    cancel: 'Anulează',
    keepLastValues: 'Păstrați ultimele valori',
    resumeSession: 'Reluați sesiunea',
    startFresh: 'Începe proaspăt'
  },
  questionItem: {
    pointsSuffix: 'pct',
    low: 'Scăzut',
    high: 'Înalt',
    rateAria: 'Evaluează {question}'
  },
  dateRange: {
    rangeLabel: 'Interval:',
    startDate: 'Data de începere',
    endDate: 'Data de încheiere',
    presets: {
      '7d': '7 zile',
      '30d': '30 de zile',
      '90d': '90 de zile',
      '1y': '1 an',
      all: 'Tot timpul',
      custom: 'Personalizat'
    }
  },
  update: {
    availableTitle: 'v{version} este disponibil!',
    releaseNotesFallback: 'Vizitați pagina de lansare pentru a descărca cea mai recentă versiune.',
    getUpdate: 'Obțineți actualizare',
    dismiss: 'Respingeți'
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

export default ro;

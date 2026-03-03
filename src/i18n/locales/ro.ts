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
    '1': 'Stăpânește Elementele de Bază',
    '2': 'Activează și iluminează cuvintele',
    '3': 'Găsește durerea și contractează energia',
    '4': 'Definește ce vrei',
    '5': 'Notează ce vrei',
    '6': 'Nu îți împărtăși visul cu alții',
    '7': 'Dezvoltă o dorință arzătoare pentru scopul tău',
    '8': 'Ținta trebuie să fie în Sweet Spot',
    '9': 'Ia o decizie',
    '10': 'Vezi/Simțe-te bine în posesia scopului tău',
    '11': 'Eliberează atașamentul față de rezultat',
    '12': 'Permite HOW-ului să se manifeste',
    '13': 'Cunoaște diferența dintre Dream și Chief Target',
    '14': 'Fii concentrat / Unicitatea scopului',
    '15': 'Lista zilnică de priorități',
    '16': 'Progres în grafice / Cunoaște scorul',
    '17': 'Folosește Ciclul de Impuls al Succesului',
    '18': 'Dream Build - Cartea de Vise & Panoul de Viziuni',
    '19': 'Conectează-te la sistem',
    '20': 'Cursul de Știință a Maestriei Personale',
    '21': 'Ai grijă la cuvintele pe care le rostești – ceea ce spui, primești',
    '22': 'Fiziologie / Îmbrăcăminte pentru succes',
    '23': 'Intenții contrare clare',
    '24': 'Trezește-ți puterea interioară: Procesele superputerilor',
    '25': 'Transmis pe undele cerebrale alfa-theta',
    '26': 'Nu mai spune povestea ta de suferință',
    '27': 'Arată apreciere / recunoștință',
    '28': 'Înlocuiește obiceiurile de eșec cu obiceiuri de succes (procese acceleratoare)',
    '29': 'Creează un Mastermind',
    '30': 'Urmărește Successful People/Apprentice',
    '31': 'Ascultă/Citește povești de succes',
    '32': 'Dă mai întâi ce vrei',
    '33': 'Mentalitatea "fă-o acum"',
    '34': 'Ai grijă de corpul tău',
    '35': 'Găsește aurul în adversitate',
    '36': 'Curățați Samskara de pe câmp',
    '37': 'Asumă-ți 100% responsabilitatea',
    '38': 'Generatoare de câmp de atracție',
    '39': 'Alătură-te unui club care te conectează la o sursă de energie',
    '40': 'Trăiește viața cu intenție deliberată - fii în prezent',
    '1a': 'Pe cine asculți?',
    '1b': 'Indicele de învățare',
    '1c': 'Scară de Echilibru a Antrenamentului',
    '1d': 'Competență inconștientă',
    '19a': 'Citește cărți',
    '19b': 'Ascultă audio-uri',
    '19c': 'Participă la evenimente (lunar)',
    '19d': 'Oferă și primește recunoaștere / Regula de Aur extinsă',
    '19e': 'Dezvoltă relații cu persoane cu aceleași gânduri',
    '23a': 'Procese monetare',
    '23b': 'Procese de relație',
    '23c': 'Procese de conducere',
    '23d': 'Procese de comunicare',
    '23e': 'Procese de sănătate',
    '23f': 'Procesele de Conștientizare Spirituală',
    '23g': 'Procese de vis',
    '23h': 'Procese de Organizare și Focus'
  }
};

export default ro;

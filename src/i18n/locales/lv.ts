/**
 * Auto-converted locale module for lv.
 */
import type { Messages } from './en';

const lv: Messages = {
  nav: {
    questionnaire: 'Anketa',
    history: 'Vēsture',
    settings: 'Iestatījumi'
  },
  app: {
    name: 'Manifestācijas algoritms',
    unexpectedError: 'Radās neparedzēta kļūda.'
  },
  home: {
    subtitle: 'Novērtējiet katru savas dzīves jomu — atklājiet savu izlīdzināšanas rezultātu'
  },
  dashboard: {
    title: 'Manifestācijas algoritma izsekošanas vēsture',
    subtitle: 'Sekojiet savam progresam laika gaitā',
    loading: 'Notiek vēstures ielāde…',
    noData: 'Nav datu par šo periodu',
    progressTrend: 'Progresa tendence',
    progressToGoal: 'Virzība uz mērķi',
    ofGoal: '{pct}% no mērķa',
    goalReached: '🎯 Mērķis sasniegts!',
    categoryBreakdown: 'Sadalījums kategorijās',
    noSessionsRange: 'Šajā diapazonā nav sesiju',
    tryWiderRange: 'Izmēģiniet plašāku diapazonu vai atlasiet citu periodu.',
    noSessionsYet: 'Vēl nav sesiju',
    completeFirst:
      'Pabeidziet savu pirmo novērtējumu, lai šeit redzētu savu progresu un tendences.',
    startFirst: 'Sāciet pirmo novērtēšanu',
    export: {
      date: 'Datums',
      time: 'Laiks',
      totalScore: 'Kopējais rezultāts',
      duration: 'Ilgums (min)',
      notes: 'Piezīmes'
    }
  },
  stats: {
    averageScore: 'Vidējais rādītājs',
    medianScore: 'Vidējais rādītājs',
    highestScore: 'Augstākais rezultāts',
    totalSessions: 'Kopējais sesiju skaits'
  },
  network: {
    rankings: 'Tīkla klasifikācija',
    searchingPeers: 'Meklē līdziniekus...',
    searching: 'Notiek meklēšana...',
    online: 'Tiešsaistē',
    peers: '{count} vienaudžiem',
    results: '{count} rezultāti',
    avgShort: 'Vid',
    p90Short: 'P90',
    averageScoreTitle: 'Vidējais rādītājs',
    percentile90Title: '90. procentile',
    globalAverage: 'Globālais vidējais',
    percentile90: '90. procentile',
    manifestations: 'Manifestācijas',
    activePeers: 'Aktīvie vienaudži',
    categoryRankings: 'Kategoriju klasifikācija'
  },
  focusAreas: {
    title: 'Fokusa apgabali',
    subtitle: 'Jūsu 3 zemāko punktu kategorijas — to uzlabošana nodrošina vislielākos ieguvumus.',
    empty: 'Pabeidziet vairāk sesiju, lai redzētu personalizētus fokusa apgabala ieteikumus.'
  },
  sessions: {
    recent: 'Pēdējās sesijas',
    deselectAll: 'Noņemiet visu atlasi',
    selectAll: 'Atlasiet visu',
    deleteCount: 'Dzēst {count}',
    cancel: 'Atcelt',
    select: 'Izvēlieties',
    deleting: 'Notiek dzēšana…'
  },
  settings: {
    title: 'Lietotņu iestatījumi',
    close: 'Aizveriet iestatījumus',
    dataManagement: 'Datu pārvaldība',
    saveLastSession: 'Saglabāt pēdējo sesiju',
    saveLastSessionDesc: 'Iepriekš aizpildiet atbildes no pēdējās pabeigtās sesijas.',
    resetProgress: 'Atiestatīt progresu',
    resetProgressDesc: 'Izdzēsiet visas saglabātās atbildes un sāciet no jauna.',
    goals: 'Mērķi',
    targetScore: 'Mērķa rādītājs',
    targetScoreDesc:
      'Iestatiet vārtu rezultātu (1000–10 000), lai informācijas panelī izsekotu savam progresam.',
    set: 'Iestatīt',
    clearGoal: 'Skaidrs',
    currentTarget: 'Pašreizējais mērķis:',
    on: 'Ieslēgts',
    off: 'Izslēgts',
    version: 'Manifestācijas algoritms {version}',
    clearAllAnswers: 'Notīrīt visas atbildes',
    clearConfirmTitle: 'Notīrīt visas atbildes',
    clearConfirmMessage:
      'Tādējādi visas jūsu pašreizējās atbildes tiks neatgriezeniski dzēstas, un darbību nevarēs atsaukt.',
    clearConfirmLabel: 'Skaidrs',
    keepAnswers: 'Saglabājiet atbildes',
    language: 'Valoda',
    languageDesc: 'Izvēlieties lietojumprogrammas displeja valodu.',
    languageCount: '{count} ir pieejamas valodas',
    goalErrorRange: 'Lūdzu, ievadiet punktu skaitu no 1000 līdz 10 000.'
  },
  questionnaire: {
    saving: 'Notiek saglabāšana...',
    saved: 'Saglabāts',
    progressText: '{pct}% pabeigts ({answered}/{total})',
    progressAria: 'Novērtējuma pabeigšanas progress',
    maxScore: 'Maks.: {score}',
    answerToScore: 'Atbilde uz punktu',
    currentScore: 'Pašreizējais rezultāts',
    scrollAll: 'Ritiniet visu',
    stepByStep: 'Soli pa solim',
    questionOf: '{total} jautājums {current}',
    previous: '← Iepriekšējais',
    next: 'Nākamais →',
    completeAssessment: 'Pilnīgs novērtējums',
    startFresh: 'Vai vēlaties sākt no jauna?',
    resetAllAnswers: 'Atiestatīt visas atbildes',
    resetTitle: 'Vai atiestatīt visas atbildes?',
    resetMessage:
      'Tādējādi tiks notīrīta katra atbilde un sākta no nulles. Šo darbību nevar atsaukt.',
    resetLabel: 'Atiestatīt',
    scoreQuality: {
      notStarted: 'Nav Sākts',
      manifesting: 'Izpaužas ❆',
      aligned: 'Izlīdzināts',
      building: 'Ēka',
      startingOut: 'Starting Out'
    },
    submitHint: {
      zero: 'Atbildēti 0 no {total} jautājumiem — neatbildētie jautājumi pēc noklusējuma ir minimāli',
      partial:
        '{remaining} paliek jautājums — neatbildētie jautājumi pēc noklusējuma ir minimālais | Atlikuši {remaining} jautājumi — neatbildētie jautājumi pēc noklusējuma ir minimāli',
      complete: 'Uz visiem jautājumiem atbildēts — gatavs iesniegšanai!'
    },
    submitTitle: {
      zero: 'Lai pabeigtu novērtējumu, atbildiet uz dažiem jautājumiem',
      partial: '{remaining} paliek jautājums | Atlikuši {remaining} jautājumi',
      complete: 'Iesniedziet savu pabeigto novērtējumu'
    },
    submitError: 'Neizdevās saglabāt sesiju: {error}',
    dotTitle: 'Jautājums {index}',
    dotAria: 'Pāriet uz jautājumu {index}',
    keyboardHint: 'Padoms: izmantojiet ← →, lai pārvietotos · 1–9 / 0, lai novērtētu'
  },
  onboarding: {
    step0Title: 'Laipni lūdzam Manifestācijas algoritmā',
    step0Body1:
      'Šis rīks palīdz izmērīt, cik jūsu domāšanas veids, ieradumi un ikdienas darbības ir saskaņotas ar jūsu mērķu sasniegšanu. Godīgi atbildiet uz katru jautājumu, lai iegūtu pašreizējo rezultātu.',
    step0Body2:
      'Regulāri aizpildiet anketu, lai izsekotu savai izaugsmei laika gaitā un redzētu, kurām jomām jāpievērš vislielākā uzmanība.',
    step1Title: 'Kā darbojas punktu skaitīšana',
    step1Body:
      'Katrs jautājums ir noteikta punktu skaita vērts. Novērtējiet sevi skalā no 1 līdz 10 katram jautājumam. Vērtējums 10 nozīmē, ka jūs pilnībā iemiesojat šo principu; 1 nozīmē, ka neesat sācis.',
    step1TargetHint: '🎯 Mērķis: {target} | Maksimums: {maximum}',
    excellent: 'Lieliski',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Spēcīga saskaņošana — turpiniet',
    good: 'Labi',
    goodRange: '4001 – 7000',
    goodNote: 'Stingrs pamats — vieta augšanai',
    needsWork: 'Nepieciešams Darbs',
    needsWorkRange: '0–4000',
    needsWorkNote: 'Vispirms koncentrējieties uz pamatiem',
    step2Title: 'Jūsu dati paliek privāti',
    step2Body1:
      'Visas jūsu atbildes un rezultātu vēsture tiek lokāli saglabāta jūsu ierīcē, izmantojot šifrētu SQLite datu bāzi. Nekas netiek nosūtīts nevienam serverim bez jūsu skaidras atļaujas.',
    step2Body2:
      'Izvēles vienādranga koplietošanas funkcija ļauj skatīt anonimizētus citu lietotāju apkopotos rezultātus. Tajā tiek kopīgots tikai kriptogrāfiski parakstīts kopsavilkums — nekad netiek sniegtas jūsu individuālās atbildes.',
    readyText: 'Vai esat gatavs? Iegūsim jūsu bāzes punktu skaitu.',
    skipIntro: 'Izlaist ievadu',
    next: 'Tālāk',
    getStarted: 'Sāciet darbu'
  },
  sharing: {
    title: 'Anonīmā tīkla koplietošana',
    privacyFirst: '🔒 Privātums - pirmkārt',
    description:
      'Pēc izvēles sniedziet savus rezultātus anonīmi globālajā tīklā. Vārds, e-pasts, IP adrese vai ierīces ID nekad netiek kopīgoti.',
    enabled: 'Kopīgošana ir iespējota — tiek sniegts ieguldījums tīklā',
    disabled: 'Kopīgošana ir atspējota (noklusējums)',
    activeBadge: '✓ Jūsu anonimizētie rezultāti tiek kopīgoti ar vienaudžiem',
    enableNote: 'Iespējojiet, lai redzētu savu procentiles rangu salīdzinājumā ar globālo tīklu.'
  },
  category: {
    back: '‹ Atpakaļ',
    history: 'Vēsture',
    date: 'Datums',
    score: 'Rezultāts',
    loading: 'Notiek ielāde...',
    notEnoughData: 'Nav pietiekami daudz datu',
    noData: 'Nav atrasti dati par “{category}”.',
    goToDashboard: 'Dodieties uz informācijas paneli'
  },
  chartActions: {
    viewFullscreen: 'Skatīt pilnekrāna režīmu',
    exitFullscreen: 'Iziet pilnekrāna režīmā',
    copyChart: 'Kopēt diagrammu',
    exportChart: 'Eksporta diagramma',
    exportDefault: '⬇ Eksportēt',
    exportExcel: '📊 Eksportējiet Excel',
    exportCsv: '📄 Eksportēt CSV',
    exportPdf: '📑 Eksportēt PDF',
    exportHtml: '🌐 Eksportējiet HTML',
    copied: 'Diagramma ir kopēta starpliktuvē',
    copyFailed: 'Kopēšana neizdevās — starpliktuve nav pieejama',
    saveCancelled: 'Saglabāšana atcelta'
  },
  resume: {
    continueLastSession: 'Vai turpināt no iepriekšējās sesijas?',
    welcomeBack: 'Laipni lūdzam atpakaļ!',
    historicalBody:
      'Jūsu atbildes no pēdējās pabeigtās sesijas ir iepriekš ielādētas. Vai vēlaties paturēt šīs vērtības kā sākumpunktu vai sākt ar pilnīgi tukšu anketu?',
    activeBody:
      'Jums notiek sesija. Vai vēlaties atsākt no vietas, kur pārtraucāt, vai sākt jaunu novērtējumu?',
    clearWarning: '⚠️ Tādējādi tiks notīrītas visas pašreizējās atbildes. Vai esat pārliecināts?',
    yesStartFresh: 'Jā, sāciet no jauna',
    cancel: 'Atcelt',
    keepLastValues: 'Saglabājiet pēdējās vērtības',
    resumeSession: 'Atsākt sesiju',
    startFresh: 'Sāciet no jauna'
  },
  questionItem: {
    pointsSuffix: 'punkti',
    low: 'Zems',
    high: 'Augsts',
    rateAria: 'Novērtēt {question}'
  },
  dateRange: {
    rangeLabel: 'Diapazons:',
    startDate: 'Sākuma datums',
    endDate: 'Beigu datums',
    presets: {
      '7d': '7 dienas',
      '30d': '30 dienas',
      '90d': '90 dienas',
      '1y': '1 gads',
      all: 'Visu laiku',
      custom: 'Pielāgots'
    }
  },
  update: {
    availableTitle: 'v{version} ir pieejams!',
    releaseNotesFallback: 'Apmeklējiet izlaiduma lapu, lai lejupielādētu jaunāko versiju.',
    getUpdate: 'Saņemiet atjauninājumu',
    dismiss: 'Atlaist'
  },
  questions: {
    '1': 'Apgūstiet pamatus',
    '2': 'Aktivizēt un izgaismot vārdus',
    '3': 'Atrodiet sāpes un līgumu enerģiju',
    '4': 'Definējiet vajadzīgo saturu',
    '5': 'Pierakstiet, ko vēlaties',
    '6': 'Nesaki savus sapņus citiem',
    '7': 'Iegūstiet dedzīgu vēlmi sasniegt savu mērķi',
    '8': 'Vārtiem jābūt saldajā vietā',
    '9': 'Pieņemiet lēmumu',
    '10': 'Redziet/jūtieties labi, sasniedzot savus mērķus',
    '11': 'Atbrīvojiet pieķeršanos rezultātam',
    '12': 'Ļaut HOW sevi prezentēt',
    '13': 'Ziniet atšķirību starp sapni un galveno mērķi',
    '14': 'Esiet koncentrēts / mērķa vienotība',
    '15': 'Ikdienas TO DO prioritāšu saraksts',
    '16': 'Diagrammas progress / Zināt rezultātu',
    '17': 'Izmantojiet Momentum panākumu ciklu',
    '18': 'Sapņu būvēšana - sapņu grāmata un vīzijas dēlis',
    '19': 'Pievienot sistēmai',
    '20': 'Personīgās meistarības zinātnes kurss',
    '21': 'Vērojiet vārdus, ko runājat - tas, ko jūs sakāt, ir tas, ko jūs saņemat',
    '22': 'Fizioloģija / Kleita panākumiem',
    '23': 'Skaidri pretnodomi',
    '24': 'Pamodiniet savu iekšējo spēku: superspēku procesi',
    '25': 'Pārraide Alpha-theta smadzeņu viļņos',
    '26': 'Pārtrauciet stāstīt savu bēdu stāstu',
    '27': 'Izrādiet atzinību / pateicību',
    '28': 'Aizstāt neveiksmes ieradumus ar veiksmes ieradumiem (paātrinātāja procesi)',
    '29': 'Izveidojiet Mastermind',
    '30': 'Skatīties veiksmīgus cilvēkus / mācekļus',
    '31': 'Veiksmes stāstu klausīšanās/lasīšana',
    '32': 'Vispirms atdodiet to, ko vēlaties',
    '33': 'Dariet to tagad mentalitāte',
    '34': 'Rūpējieties par savu ķermeni',
    '35': 'Atrodiet zeltu nelaimē',
    '36': 'Notīriet Samskaras no lauka',
    '37': 'Uzņemieties 100% atbildību',
    '38': 'Atraktora lauka ģeneratori',
    '39': 'Pievienojieties klubam, kas savieno jūs ar enerģijas avotu',
    '40': 'Dzīvojiet dzīvi ar apzinātu nodomu - esiet tagadnē',
    '1a': 'Ko jūs klausāties?',
    '1b': 'Mācīšanas indekss',
    '1c': 'Treniņu līdzsvara skala',
    '1d': 'Neapzināta kompetence',
    '19a': 'Lasīt grāmatas',
    '19b': 'Audio klausīšanās',
    '19c': 'Apmeklējiet pasākumus (katru mēnesi)',
    '19d': 'Dodiet un saņemiet atzinību / paplašinātu zelta likumu',
    '19e': 'Veidojiet attiecības ar līdzīgi domājošiem cilvēkiem',
    '23a': 'Naudas procesi',
    '23b': 'Attiecību procesi',
    '23c': 'Vadības procesi',
    '23d': 'Komunikācijas procesi',
    '23e': 'Veselības procesi',
    '23f': 'Garīgās izpratnes procesi',
    '23g': 'Sapņu procesi',
    '23h': 'Organizācijas un fokusa procesi'
  }
};

export default lv;

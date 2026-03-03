/**
 * Auto-converted locale module for hr.
 */
import type { Messages } from './en';

const hr: Messages = {
  nav: {
    questionnaire: 'Upitnik',
    history: 'Povijest',
    settings: 'postavke'
  },
  app: {
    name: 'Algoritam manifestacije',
    unexpectedError: 'Došlo je do neočekivane pogreške.'
  },
  home: {
    subtitle: 'Ocijenite svako područje svog života — otkrijte svoj rezultat usklađenosti'
  },
  dashboard: {
    title: 'Povijest praćenja algoritma manifestacije',
    subtitle: 'Pratite svoj napredak tijekom vremena',
    loading: 'Učitavanje vaše povijesti...',
    noData: 'Nema podataka za ovo razdoblje',
    progressTrend: 'Trend napretka',
    progressToGoal: 'Napredak do cilja',
    ofGoal: '{pct}% cilja',
    goalReached: '🎯 Cilj postignut!',
    categoryBreakdown: 'Raščlamba kategorije',
    noSessionsRange: 'Nema sesija u ovom rasponu',
    tryWiderRange: 'Isprobajte širi raspon ili odaberite drugo razdoblje.',
    noSessionsYet: 'Još nema sesija',
    completeFirst:
      'Dovršite svoju prvu procjenu kako biste ovdje vidjeli svoj napredak i trendove.',
    startFirst: 'Započnite prvu procjenu',
    export: {
      date: 'Datum',
      time: 'Vrijeme',
      totalScore: 'Ukupni rezultat',
      duration: 'trajanje (min)',
      notes: 'Bilješke'
    }
  },
  stats: {
    averageScore: 'Prosječna ocjena',
    medianScore: 'Srednji rezultat',
    highestScore: 'Najviši rezultat',
    totalSessions: 'Ukupni broj sesija'
  },
  network: {
    rankings: 'Mrežno rangiranje',
    searchingPeers: 'Traženje vršnjaka...',
    searching: 'Pretraživanje...',
    online: 'Online',
    peers: '{count} vršnjaci',
    results: '{count} rezultati',
    avgShort: 'Prosj',
    p90Short: 'P90',
    averageScoreTitle: 'Prosječna ocjena',
    percentile90Title: '90. percentil',
    globalAverage: 'Globalni prosjek',
    percentile90: '90. percentil',
    manifestations: 'Manifestacije',
    activePeers: 'Aktivni vršnjaci',
    categoryRankings: 'Poredak po kategorijama'
  },
  focusAreas: {
    title: 'Područja fokusa',
    subtitle: 'Vaše 3 kategorije s najnižom ocjenom — poboljšanje ovih donosi najveće dobitke.',
    empty: 'Dovršite više sesija da biste vidjeli personalizirane preporuke područja fokusa.'
  },
  sessions: {
    recent: 'Nedavne sesije',
    deselectAll: 'Poništi odabir svih',
    selectAll: 'Odaberite sve',
    deleteCount: 'Izbriši {count}',
    cancel: 'Odustani',
    select: 'Odaberite',
    deleting: 'Brisanje...'
  },
  settings: {
    title: 'Postavke aplikacije',
    close: 'Zatvori postavke',
    dataManagement: 'Upravljanje podacima',
    saveLastSession: 'Spremi posljednju sesiju',
    saveLastSessionDesc: 'Unaprijed ispunite odgovore iz svoje posljednje završene sesije.',
    resetProgress: 'Poništi napredak',
    resetProgressDesc: 'Izbrišite sve spremljene odgovore i počnite ispočetka.',
    goals: 'Ciljevi',
    targetScore: 'Ciljani rezultat',
    targetScoreDesc:
      'Postavite rezultat cilja (1.000–10.000) da biste pratili svoj napredak na nadzornoj ploči.',
    set: 'set',
    clearGoal: 'čisto',
    currentTarget: 'Trenutačni cilj:',
    on: 'Uključeno',
    off: 'Isključeno',
    version: 'Algoritam manifestacije {version}',
    clearAllAnswers: 'Izbriši sve odgovore',
    clearConfirmTitle: 'Izbriši sve odgovore',
    clearConfirmMessage:
      'Ovo će trajno izbrisati sve vaše trenutne odgovore i ne može se poništiti.',
    clearConfirmLabel: 'čisto',
    keepAnswers: 'Zadrži odgovore',
    language: 'Jezik',
    languageDesc: 'Odaberite jezik prikaza za aplikaciju.',
    languageCount: '{count} dostupni jezici',
    goalErrorRange: 'Unesite rezultat između 1.000 i 10.000.'
  },
  questionnaire: {
    saving: 'Spremanje...',
    saved: 'Spremljeno',
    progressText: '{pct}% dovršeno ({answered}/{total})',
    progressAria: 'Napredak završetka ocjenjivanja',
    maxScore: 'Maks.: {score}',
    answerToScore: 'Odgovor na pogodak',
    currentScore: 'Trenutni rezultat',
    scrollAll: 'Pomakni sve',
    stepByStep: 'Korak po korak',
    questionOf: 'Pitanje {current} od {total}',
    previous: '← Prethodna',
    next: 'Dalje →',
    completeAssessment: 'Potpuna procjena',
    startFresh: 'Želite li početi iznova?',
    resetAllAnswers: 'Resetiraj sve odgovore',
    resetTitle: 'Poništiti sve odgovore?',
    resetMessage: 'Ovo će izbrisati svaki odgovor i početi ispočetka. Ovo se ne može poništiti.',
    resetLabel: 'Resetiraj',
    scoreQuality: {
      notStarted: 'Nije započeto',
      manifesting: 'Manifestacija ❆',
      aligned: 'Usklađeno',
      building: 'zgrada',
      startingOut: 'Početak'
    },
    submitHint: {
      zero: 'Odgovoreno na 0 od {total} pitanja — neodgovorena pitanja postavljena su na minimum',
      partial:
        '{remaining} preostalo pitanje — neodgovorena pitanja zadana su na minimum | {remaining} preostala pitanja — neodgovorena pitanja prema zadanoj postavci postavljena su na minimum',
      complete: 'Odgovori na sva pitanja — spremni za slanje!'
    },
    submitTitle: {
      zero: 'Odgovorite na neka pitanja kako biste dovršili svoju procjenu',
      partial: '{remaining} preostalo pitanje | Preostalo {remaining} pitanja',
      complete: 'Predajte svoju dovršenu procjenu'
    },
    submitError: 'Neuspjelo spremanje sesije: {error}',
    dotTitle: 'Pitanje {index}',
    dotAria: 'Idi na pitanje {index}',
    keyboardHint: 'Savjet: Koristite ← → za navigaciju · 1–9 / 0 za ocjenjivanje'
  },
  onboarding: {
    step0Title: 'Dobro došli u algoritam manifestacije',
    step0Body1:
      'Ovaj vam alat pomaže izmjeriti koliko su vaš način razmišljanja, navike i dnevne radnje usklađeni s postizanjem vaših ciljeva. Iskreno odgovorite na svako pitanje kako biste dobili svoj trenutni rezultat.',
    step0Body2:
      'Ispunite upitnik u redovitim intervalima kako biste pratili svoj rast tijekom vremena i vidjeli kojim područjima je potrebno najviše pažnje.',
    step1Title: 'Kako funkcionira bodovanje',
    step1Body:
      'Svako pitanje vrijedi određeni broj bodova. Ocijenite se na ljestvici 1–10 za svako pitanje. Ocjena 10 znači da u potpunosti utjelovljujete to načelo; 1 znači da niste počeli.',
    step1TargetHint: '🎯 Cilj: {target} | Maksimalno: {maximum}',
    excellent: 'Izvrsno',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Snažna usklađenost — nastavite',
    good: 'dobro',
    goodRange: '4.001 – 7.000',
    goodNote: 'Čvrsti temelji — prostor za rast',
    needsWork: 'Potreban rad',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Prvo se usredotočite na osnove',
    step2Title: 'Vaši podaci ostaju privatni',
    step2Body1:
      'Svi vaši odgovori i povijest rezultata pohranjuju se lokalno na vašem uređaju pomoću šifrirane baze podataka SQLite. Ništa se ne šalje bilo kojem poslužitelju bez vašeg izričitog dopuštenja.',
    step2Body2:
      'Opcijska značajka peer-to-peer dijeljenja omogućuje vam da vidite anonimizirane ukupne rezultate drugih korisnika. Dijeli samo kriptografski potpisan sažetak - nikad vaše pojedinačne odgovore.',
    readyText: 'Spreman? Idemo dobiti vaš osnovni rezultat.',
    skipIntro: 'Preskoči uvod',
    next: 'Dalje',
    getStarted: 'Započnite'
  },
  sharing: {
    title: 'Anonimno dijeljenje mreže',
    privacyFirst: '🔒 Privatnost na prvom mjestu',
    description:
      'Po želji anonimno doprinesite svoje rezultate globalnoj mreži. Ne dijeli se ime, e-pošta, IP adresa ili ID uređaja.',
    enabled: 'Dijeljenje omogućeno — doprinos mreži',
    disabled: 'Dijeljenje onemogućeno (zadano)',
    activeBadge: '✓ Vaši anonimizirani rezultati dijele se s kolegama',
    enableNote: 'Omogućite da vidite svoj postotni rang u usporedbi s globalnom mrežom.'
  },
  category: {
    back: '‹ Natrag',
    history: 'Povijest',
    date: 'Datum',
    score: 'rezultat',
    loading: 'Učitavanje...',
    notEnoughData: 'Nema dovoljno podataka',
    noData: 'Nisu pronađeni podaci za “{category}”.',
    goToDashboard: 'Idite na nadzornu ploču'
  },
  chartActions: {
    viewFullscreen: 'Prikaz preko cijelog zaslona',
    exitFullscreen: 'Izađi iz cijelog zaslona',
    copyChart: 'Kopiraj grafikon',
    exportChart: 'Izvoz grafikona',
    exportDefault: '⬇ Izvoz',
    exportExcel: '📊 Izvezite Excel',
    exportCsv: '📄 Izvezi CSV',
    exportPdf: '📑 Izvezi PDF',
    exportHtml: '🌐 Izvoz HTML-a',
    copied: 'Grafikon je kopiran u međuspremnik',
    copyFailed: 'Kopiranje nije uspjelo — međuspremnik nije dostupan',
    saveCancelled: 'Spremanje otkazano'
  },
  resume: {
    continueLastSession: 'Nastaviti od zadnje sesije?',
    welcomeBack: 'Dobrodošao nazad!',
    historicalBody:
      'Vaši odgovori iz vaše zadnje dovršene sesije su unaprijed učitani. Želite li zadržati te vrijednosti kao početnu točku ili započeti s potpuno praznim upitnikom?',
    activeBody:
      'Imate sesiju u tijeku. Želite li nastaviti tamo gdje ste stali ili započeti novu procjenu?',
    clearWarning: '⚠️ Ovo će izbrisati sve trenutne odgovore. Jeste li sigurni?',
    yesStartFresh: 'Da, počni ispočetka',
    cancel: 'Odustani',
    keepLastValues: 'Zadržite posljednje vrijednosti',
    resumeSession: 'Nastavi sesiju',
    startFresh: 'Počnite ispočetka'
  },
  questionItem: {
    pointsSuffix: 'bodova',
    low: 'Niska',
    high: 'visoko',
    rateAria: 'Ocijenite {question}'
  },
  dateRange: {
    rangeLabel: 'Raspon:',
    startDate: 'Datum početka',
    endDate: 'Datum završetka',
    presets: {
      '7d': '7 dana',
      '30d': '30 dana',
      '90d': '90 dana',
      '1y': '1 godina',
      all: 'Sva vremena',
      custom: 'Custom'
    }
  },
  update: {
    availableTitle: 'v{version} je dostupan!',
    releaseNotesFallback: 'Posjetite stranicu izdanja za preuzimanje najnovije verzije.',
    getUpdate: 'Preuzmite ažuriranje',
    dismiss: 'Odbaciti'
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

export default hr;

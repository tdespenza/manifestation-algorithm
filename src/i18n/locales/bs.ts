/**
 * Auto-converted locale module for bs.
 */
import type { Messages } from './en';

const bs: Messages = {
  nav: {
    questionnaire: 'Upitnik',
    history: 'Istorija',
    settings: 'Postavke'
  },
  app: {
    name: 'Algoritam manifestacije',
    unexpectedError: 'Došlo je do neočekivane greške.'
  },
  home: {
    subtitle: 'Ocijenite svako područje svog života - otkrijte svoj rezultat usklađenosti'
  },
  dashboard: {
    title: 'Istorija praćenja algoritma manifestacije',
    subtitle: 'Pratite svoj napredak tokom vremena',
    loading: 'Učitavanje vaše historije…',
    noData: 'Nema podataka za ovaj period',
    progressTrend: 'Trend napretka',
    progressToGoal: 'Napredak do cilja',
    ofGoal: '{pct}% cilja',
    goalReached: '🎯 Cilj postignut!',
    categoryBreakdown: 'Category Breakdown',
    noSessionsRange: 'Nema sesija u ovom rasponu',
    tryWiderRange: 'Pokušajte sa širim rasponom ili odaberite drugi period.',
    noSessionsYet: 'Još nema sesija',
    completeFirst: 'Završite svoju prvu procjenu da vidite svoj napredak i trendove ovdje.',
    startFirst: 'Započnite prvu procjenu',
    export: {
      date: 'Datum',
      time: 'Vrijeme',
      totalScore: 'Total Score',
      duration: 'Trajanje (min)',
      notes: 'Bilješke'
    }
  },
  stats: {
    averageScore: 'Prosječna ocjena',
    medianScore: 'Median Score',
    highestScore: 'Najviša ocjena',
    totalSessions: 'Total Sessions'
  },
  network: {
    rankings: 'Network Rankings',
    searchingPeers: 'Traženje vršnjaka...',
    searching: 'Pretraživanje...',
    online: 'Online',
    peers: '{count} vršnjaci',
    results: '{count} rezultati',
    avgShort: 'Avg',
    p90Short: 'P90',
    averageScoreTitle: 'Prosječna ocjena',
    percentile90Title: '90th Percentile',
    globalAverage: 'Globalni prosjek',
    percentile90: '90th Percentile',
    manifestations: 'Manifestacije',
    activePeers: 'Active Peers',
    categoryRankings: 'Kategorija Rankings'
  },
  focusAreas: {
    title: 'Fokusna područja',
    subtitle: 'Vaše 3 kategorije s najnižim bodom — poboljšanje ovih donosi najveće dobitke.',
    empty: 'Završite više sesija da vidite personalizirane preporuke područja fokusa.'
  },
  sessions: {
    recent: 'Nedavne sesije',
    deselectAll: 'Poništite odabir svih',
    selectAll: 'Odaberite Sve',
    deleteCount: 'Izbriši {count}',
    cancel: 'Otkaži',
    select: 'Odaberite',
    deleting: 'Brisanje…'
  },
  settings: {
    title: 'Postavke aplikacije',
    close: 'Zatvorite postavke',
    dataManagement: 'Upravljanje podacima',
    saveLastSession: 'Sačuvaj posljednju sesiju',
    saveLastSessionDesc: 'Unaprijed popunite odgovore iz svoje posljednje završene sesije.',
    resetProgress: 'Resetujte napredak',
    resetProgressDesc: 'Izbrišite sve sačuvane odgovore i počnite ispočetka.',
    goals: 'Golovi',
    targetScore: 'Target Score',
    targetScoreDesc:
      'Postavite rezultat (1.000–10.000) da pratite svoj napredak na kontrolnoj tabli.',
    set: 'Set',
    clearGoal: 'Jasno',
    currentTarget: 'Trenutni cilj:',
    on: 'On',
    off: 'Isključeno',
    version: 'Algoritam manifestacije {version}',
    clearAllAnswers: 'Obriši sve odgovore',
    clearConfirmTitle: 'Obriši sve odgovore',
    clearConfirmMessage:
      'Ovo će trajno izbrisati sve vaše trenutne odgovore i ne može se poništiti.',
    clearConfirmLabel: 'Jasno',
    keepAnswers: 'Zadrži odgovore',
    language: 'Jezik',
    languageDesc: 'Odaberite jezik prikaza za aplikaciju.',
    languageCount: '{count} dostupni jezici',
    goalErrorRange: 'Unesite rezultat između 1.000 i 10.000.'
  },
  questionnaire: {
    saving: 'Spremanje...',
    saved: 'Sačuvano',
    progressText: '{pct}% završeno ({answered}/{total})',
    progressAria: 'Napredak završetka procjene',
    maxScore: 'Maks: {score}',
    answerToScore: 'Odgovorite na rezultat',
    currentScore: 'Trenutni rezultat',
    scrollAll: 'Listajte sve',
    stepByStep: 'Korak po korak',
    questionOf: 'Pitanje {current} od {total}',
    previous: '← Prethodno',
    next: 'Dalje →',
    completeAssessment: 'Kompletna procjena',
    startFresh: 'Želite da počnete iznova?',
    resetAllAnswers: 'Poništi sve odgovore',
    resetTitle: 'Poništiti sve odgovore?',
    resetMessage: 'Ovo će obrisati svaki odgovor i početi od nule. Ovo se ne može poništiti.',
    resetLabel: 'Reset',
    scoreQuality: {
      notStarted: 'Nije započeto',
      manifesting: 'Manifestiranje ❆',
      aligned: 'Aligned',
      building: 'Zgrada',
      startingOut: 'Starting Out'
    },
    submitHint: {
      zero: 'Odgovoreno je 0 od {total} pitanja — neodgovorena pitanja su podrazumevana na minimum',
      partial:
        '{remaining} preostalo pitanje — neodgovorena pitanja zadano na minimum | {remaining} preostala pitanja — neodgovorena pitanja su podrazumevana na minimum',
      complete: 'Odgovori na sva pitanja — spremni za slanje!'
    },
    submitTitle: {
      zero: 'Odgovorite na neka pitanja kako biste dovršili svoju procjenu',
      partial: '{remaining} preostalo pitanje | {remaining} preostala pitanja',
      complete: 'Pošaljite svoju završenu procjenu'
    },
    submitError: 'Pohranjivanje sesije nije uspjelo: {error}',
    dotTitle: 'Pitanje {index}',
    dotAria: 'Idi na pitanje {index}',
    keyboardHint: 'Savjet: Koristite ← → za navigaciju · 1–9 / 0 da biste ocijenili'
  },
  onboarding: {
    step0Title: 'Dobrodošli u algoritam manifestacije',
    step0Body1:
      'Ovaj alat vam pomaže da izmjerite koliko su vaš način razmišljanja, navike i svakodnevne radnje usklađeni s postizanjem vaših ciljeva. Odgovorite iskreno na svako pitanje da biste dobili trenutni rezultat.',
    step0Body2:
      'Popunite upitnik u redovnim intervalima kako biste pratili svoj rast tokom vremena i vidjeli kojim područjima treba najviše pažnje.',
    step1Title: 'Kako funkcionira bodovanje',
    step1Body:
      'Svako pitanje vrijedi određeni broj bodova. Ocijenite se na skali od 1–10 za svako pitanje. Ocjena 10 znači da u potpunosti utjelovljujete taj princip; 1 znači da niste počeli.',
    step1TargetHint: '🎯 Cilj: {target} | Maksimalno: {maximum}',
    excellent: 'Odlično',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Snažno poravnanje — nastavite',
    good: 'Dobro',
    goodRange: '4.001 – 7.000',
    goodNote: 'Čvrsta osnova – prostor za rast',
    needsWork: 'Needs Work',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Prvo se fokusirajte na osnove',
    step2Title: 'Vaši podaci ostaju privatni',
    step2Body1:
      'Svi vaši odgovori i historija rezultata pohranjuju se lokalno na vašem uređaju pomoću šifrirane SQLite baze podataka. Ništa se ne šalje ni na jedan server bez vašeg izričitog dopuštenja.',
    step2Body2:
      'Opciona funkcija peer-to-peer dijeljenja omogućava vam da vidite anonimizirane zbirne rezultate drugih korisnika. Dijeli samo kriptografski potpisan sažetak - nikada vaše pojedinačne odgovore.',
    readyText: 'Spreman? Hajde da dobijemo vaš osnovni rezultat.',
    skipIntro: 'Preskoči uvod',
    next: 'Sledeći',
    getStarted: 'Započnite'
  },
  sharing: {
    title: 'Anonimno dijeljenje mreže',
    privacyFirst: '🔒 Privatnost na prvom mjestu',
    description:
      'Po želji, anonimno priložite svoje rezultate globalnoj mreži. Ime, e-pošta, IP adresa ili ID uređaja se nikada ne dijele.',
    enabled: 'Dijeljenje je omogućeno — doprinosite mreži',
    disabled: 'Dijeljenje je onemogućeno (zadano)',
    activeBadge: '✓ Vaši anonimni rezultati se dijele s kolegama',
    enableNote: 'Omogućite da vidite svoj percentilni rang u poređenju sa globalnom mrežom.'
  },
  category: {
    back: '‹ Nazad',
    history: 'Istorija',
    date: 'Datum',
    score: 'Rezultat',
    loading: 'Učitavanje...',
    notEnoughData: 'Nema dovoljno podataka',
    noData: 'Nisu pronađeni podaci za “{category}”.',
    goToDashboard: 'Idite na kontrolnu tablu'
  },
  chartActions: {
    viewFullscreen: 'Prikaži cijeli ekran',
    exitFullscreen: 'Izađite preko celog ekrana',
    copyChart: 'Kopiraj grafikon',
    exportChart: 'Izvoz grafikona',
    exportDefault: '⬇ Izvoz',
    exportExcel: '📊 Izvezi Excel',
    exportCsv: '📄 Izvezi CSV',
    exportPdf: '📑 Izvezi PDF',
    exportHtml: '🌐 Izvezi HTML',
    copied: 'Grafikon je kopiran u međuspremnik',
    copyFailed: 'Kopiranje nije uspjelo — međuspremnik nije dostupan',
    saveCancelled: 'Čuvanje je otkazano'
  },
  resume: {
    continueLastSession: 'Nastaviti s posljednje sesije?',
    welcomeBack: 'Dobrodošli nazad!',
    historicalBody:
      'Vaši odgovori iz vaše posljednje završene sesije su unaprijed učitani. Da li biste željeli zadržati te vrijednosti kao polaznu tačku ili započeti s potpuno praznim upitnikom?',
    activeBody:
      'Imate sesiju u toku. Želite li nastaviti tamo gdje ste stali ili započeti novu procjenu?',
    clearWarning: '⚠️ Ovo će izbrisati sve trenutne odgovore. Jeste li sigurni?',
    yesStartFresh: 'Da, počni iznova',
    cancel: 'Otkaži',
    keepLastValues: 'Zadrži posljednje vrijednosti',
    resumeSession: 'Nastavi sesiju',
    startFresh: 'Start Fresh'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Nisko',
    high: 'Visoko',
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
      all: 'All Time',
      custom: 'Custom'
    }
  },
  update: {
    availableTitle: 'v{version} je dostupan!',
    releaseNotesFallback: 'Posjetite stranicu izdanja da preuzmete najnoviju verziju.',
    getUpdate: 'Nabavite ažuriranje',
    dismiss: 'Odbaci'
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

export default bs;

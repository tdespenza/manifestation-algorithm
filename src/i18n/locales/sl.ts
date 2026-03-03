/**
 * Auto-converted locale module for sl.
 */
import type { Messages } from './en';

const sl: Messages = {
  nav: {
    questionnaire: 'vprašalnik',
    history: 'Zgodovina',
    settings: 'nastavitve'
  },
  app: {
    name: 'Algoritem manifestacije',
    unexpectedError: 'Prišlo je do nepričakovane napake.'
  },
  home: {
    subtitle: 'Ocenite vsako področje svojega življenja - odkrijte svoj rezultat usklajenosti'
  },
  dashboard: {
    title: 'Zgodovina sledenja algoritmu manifestacije',
    subtitle: 'Sledite svojemu napredku skozi čas',
    loading: 'Nalaganje vaše zgodovine …',
    noData: 'Za to obdobje ni podatkov',
    progressTrend: 'Trend napredka',
    progressToGoal: 'Napredek do cilja',
    ofGoal: '{pct}% cilja',
    goalReached: '🎯 Cilj dosežen!',
    categoryBreakdown: 'Razčlenitev po kategorijah',
    noSessionsRange: 'V tem obsegu ni sej',
    tryWiderRange: 'Poskusite s širšim razponom ali izberite drugo obdobje.',
    noSessionsYet: 'Ni še nobenih sej',
    completeFirst: 'Dokončajte svojo prvo oceno, da si ogledate svoj napredek in trende tukaj.',
    startFirst: 'Začni prvo ocenjevanje',
    export: {
      date: 'Datum',
      time: 'Čas',
      totalScore: 'Skupni rezultat',
      duration: 'Trajanje (min)',
      notes: 'Opombe'
    }
  },
  stats: {
    averageScore: 'Povprečna ocena',
    medianScore: 'Srednji rezultat',
    highestScore: 'Najvišji rezultat',
    totalSessions: 'Skupno število sej'
  },
  network: {
    rankings: 'Omrežne lestvice',
    searchingPeers: 'Iskanje vrstnikov ...',
    searching: 'Iskanje ...',
    online: 'Na spletu',
    peers: '{count} vrstniki',
    results: '{count} rezultati',
    avgShort: 'Povpr',
    p90Short: 'P90',
    averageScoreTitle: 'Povprečna ocena',
    percentile90Title: '90. percentil',
    globalAverage: 'Globalno povprečje',
    percentile90: '90. percentil',
    manifestations: 'Manifestacije',
    activePeers: 'Aktivni vrstniki',
    categoryRankings: 'Uvrstitve po kategorijah'
  },
  focusAreas: {
    title: 'Področja fokusa',
    subtitle: 'Vaše 3 kategorije z najnižjimi točkami – izboljšanje teh prinaša največje dobičke.',
    empty: 'Dokončajte več sej, da si ogledate prilagojena priporočila za področja fokusa.'
  },
  sessions: {
    recent: 'Nedavne seje',
    deselectAll: 'Prekliči izbiro vseh',
    selectAll: 'Izberite Vse',
    deleteCount: 'Izbriši {count}',
    cancel: 'Prekliči',
    select: 'Izberite',
    deleting: 'Brisanje …'
  },
  settings: {
    title: 'Nastavitve aplikacije',
    close: 'Zapri nastavitve',
    dataManagement: 'Upravljanje podatkov',
    saveLastSession: 'Shrani zadnjo sejo',
    saveLastSessionDesc: 'Vnaprej izpolnite odgovore iz vaše zadnje zaključene seje.',
    resetProgress: 'Ponastavi napredek',
    resetProgressDesc: 'Izbrišite vse shranjene odgovore in začnite znova.',
    goals: 'Cilji',
    targetScore: 'Ciljni rezultat',
    targetScoreDesc:
      'Nastavite rezultat cilja (1.000–10.000), da spremljate svoj napredek na nadzorni plošči.',
    set: 'Set',
    clearGoal: 'jasno',
    currentTarget: 'Trenutni cilj:',
    on: 'Vklopljeno',
    off: 'Izključeno',
    version: 'Algoritem manifestacije {version}',
    clearAllAnswers: 'Počisti vse odgovore',
    clearConfirmTitle: 'Počisti vse odgovore',
    clearConfirmMessage:
      'S tem boste trajno izbrisali vse svoje trenutne odgovore in tega ni mogoče razveljaviti.',
    clearConfirmLabel: 'jasno',
    keepAnswers: 'Obdrži odgovore',
    language: 'Jezik',
    languageDesc: 'Izberite jezik prikaza za aplikacijo.',
    languageCount: '{count} na voljo jeziki',
    goalErrorRange: 'Vnesite rezultat med 1.000 in 10.000.'
  },
  questionnaire: {
    saving: 'Shranjevanje ...',
    saved: 'Shranjeno',
    progressText: '{pct}% dokončano ({answered}/{total})',
    progressAria: 'Napredek pri dokončanju ocenjevanja',
    maxScore: 'Največ: {score}',
    answerToScore: 'Odgovor na gol',
    currentScore: 'Trenutni rezultat',
    scrollAll: 'Pomakni vse',
    stepByStep: 'Korak za korakom',
    questionOf: 'Vprašanje {current} od {total}',
    previous: '← Prejšnja',
    next: 'Naprej →',
    completeAssessment: 'Popolna ocena',
    startFresh: 'Želite začeti na novo?',
    resetAllAnswers: 'Ponastavi vse odgovore',
    resetTitle: 'Ponastaviti vse odgovore?',
    resetMessage:
      'S tem boste počistili vse odgovore in začeli iz nič. Tega ni mogoče razveljaviti.',
    resetLabel: 'Ponastavi',
    scoreQuality: {
      notStarted: 'Ni začeto',
      manifesting: 'Manifestacija ❆',
      aligned: 'Poravnano',
      building: 'Stavba',
      startingOut: 'Začetek'
    },
    submitHint: {
      zero: 'Odgovorjeno na 0 od {total} vprašanj — neodgovorjena vprašanja so privzeto nastavljena na minimum',
      partial:
        'Preostalo vprašanje {remaining} — neodgovorjena vprašanja so privzeto nastavljena na minimum | Preostala vprašanja {remaining} — neodgovorjena vprašanja so privzeto nastavljena na minimum',
      complete: 'Odgovori na vsa vprašanja — pripravljeni za oddajo!'
    },
    submitTitle: {
      zero: 'Odgovorite na nekaj vprašanj, da dokončate oceno',
      partial: '{remaining} preostalo vprašanje | {remaining} preostalih vprašanj',
      complete: 'Oddajte izpolnjeno oceno'
    },
    submitError: 'Seje ni bilo mogoče shraniti: {error}',
    dotTitle: 'Vprašanje {index}',
    dotAria: 'Pojdi na vprašanje {index}',
    keyboardHint: 'Nasvet: Uporabite ← → za navigacijo · 1–9 / 0 za ocenjevanje'
  },
  onboarding: {
    step0Title: 'Dobrodošli v algoritmu manifestacije',
    step0Body1:
      'To orodje vam pomaga izmeriti, kako so vaša miselnost, navade in vsakodnevna dejanja usklajeni z doseganjem vaših ciljev. Iskreno odgovorite na vsako vprašanje, da dobite svoj trenutni rezultat.',
    step0Body2:
      'Redno izpolnjujte vprašalnik, da spremljate svojo rast skozi čas in vidite, katera področja potrebujejo največ pozornosti.',
    step1Title: 'Kako deluje točkovanje',
    step1Body:
      'Vsako vprašanje je vredno določenega števila točk. Ocenite se na lestvici 1–10 za vsako vprašanje. Ocena 10 pomeni, da v celoti utelešate to načelo; 1 pomeni, da še niste začeli.',
    step1TargetHint: '🎯 Cilj: {target} | Največ: {maximum}',
    excellent: 'Odlično',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Močna usklajenost – nadaljujte',
    good: 'Dobro',
    goodRange: '4.001 – 7.000',
    goodNote: 'Trdna podlaga — prostor za rast',
    needsWork: 'Potrebuje delo',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Najprej se osredotočite na osnove',
    step2Title: 'Vaši podatki ostanejo zasebni',
    step2Body1:
      'Vsi vaši odgovori in zgodovina rezultatov so shranjeni lokalno v vaši napravi z uporabo šifrirane zbirke podatkov SQLite. Nič se ne pošlje nobenemu strežniku brez vašega izrecnega dovoljenja.',
    step2Body2:
      'Izbirna funkcija deljenja enakovrednih vam omogoča ogled anonimiziranih skupnih rezultatov drugih uporabnikov. Deli le kriptografsko podpisan povzetek – nikoli vaših individualnih odgovorov.',
    readyText: 'pripravljena Dobimo vaš osnovni rezultat.',
    skipIntro: 'Preskoči uvod',
    next: 'Naprej',
    getStarted: 'Začnite'
  },
  sharing: {
    title: 'Anonimna skupna raba omrežja',
    privacyFirst: '🔒 Zasebnost na prvem mestu',
    description:
      'Po želji anonimno prispevajte svoje rezultate v globalno omrežje. Nobeno ime, e-pošta, naslov IP ali ID naprave se nikoli ne delijo.',
    enabled: 'Skupna raba omogočena — prispevanje k omrežju',
    disabled: 'Skupna raba onemogočena (privzeto)',
    activeBadge: '✓ Vaši anonimizirani rezultati so v skupni rabi z vrstniki',
    enableNote: 'Omogočite, da si ogledate svoj percentilni rang v primerjavi z globalnim omrežjem.'
  },
  category: {
    back: '‹ Nazaj',
    history: 'Zgodovina',
    date: 'Datum',
    score: 'rezultat',
    loading: 'Nalaganje...',
    notEnoughData: 'Ni dovolj podatkov',
    noData: 'Ni podatkov za »{category}«.',
    goToDashboard: 'Pojdite na nadzorno ploščo'
  },
  chartActions: {
    viewFullscreen: 'Oglejte si celoten zaslon',
    exitFullscreen: 'Izhod iz celotnega zaslona',
    copyChart: 'Kopiraj grafikon',
    exportChart: 'Izvozni grafikon',
    exportDefault: '⬇ Izvozi',
    exportExcel: '📊 Izvozi Excel',
    exportCsv: '📄 Izvoz CSV',
    exportPdf: '📑 Izvozi PDF',
    exportHtml: '🌐 Izvozi HTML',
    copied: 'Grafikon je kopiran v odložišče',
    copyFailed: 'Kopiranje ni uspelo — odložišče ni na voljo',
    saveCancelled: 'Shranjevanje preklicano'
  },
  resume: {
    continueLastSession: 'Nadaljevati od zadnje seje?',
    welcomeBack: 'Dobrodošli nazaj!',
    historicalBody:
      'Vaši odgovori iz vaše zadnje zaključene seje so bili vnaprej naloženi. Ali želite obdržati te vrednosti kot izhodišče ali začeti s popolnoma praznim vprašalnikom?',
    activeBody:
      'Imate sejo v teku. Ali želite nadaljevati tam, kjer ste končali, ali začeti novo ocenjevanje?',
    clearWarning: '⚠️ S tem boste izbrisali vse trenutne odgovore. Ste prepričani?',
    yesStartFresh: 'Da, začni na novo',
    cancel: 'Prekliči',
    keepLastValues: 'Ohranite zadnje vrednosti',
    resumeSession: 'Nadaljuj sejo',
    startFresh: 'Začnite na novo'
  },
  questionItem: {
    pointsSuffix: 'točke',
    low: 'Nizka',
    high: 'visoko',
    rateAria: 'Oceni {question}'
  },
  dateRange: {
    rangeLabel: 'Razpon:',
    startDate: 'Začetni datum',
    endDate: 'Končni datum',
    presets: {
      '7d': '7 dni',
      '30d': '30 dni',
      '90d': '90 dni',
      '1y': '1 leto',
      all: 'Ves čas',
      custom: 'Po meri'
    }
  },
  update: {
    availableTitle: 'v{version} je na voljo!',
    releaseNotesFallback: 'Za prenos najnovejše različice obiščite stran za izdajo.',
    getUpdate: 'Pridobite posodobitev',
    dismiss: 'Odpusti'
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

export default sl;

/**
 * Auto-converted locale module for sw.
 */
import type { Messages } from './en';

const sw: Messages = {
  nav: {
    questionnaire: 'Hojaji',
    history: 'Historia',
    settings: 'Mipangilio'
  },
  app: {
    name: 'Algorithm ya udhihirisho',
    unexpectedError: 'Hitilafu isiyotarajiwa imetokea.'
  },
  home: {
    subtitle: 'Kadiria kila eneo la maisha yako - gundua alama yako ya upatanishi'
  },
  dashboard: {
    title: 'Historia ya Ufuatiliaji wa Algorithm ya Udhihirisho',
    subtitle: 'Fuatilia maendeleo yako kwa wakati',
    loading: 'Inapakia historia yako...',
    noData: 'Hakuna data ya kipindi hiki',
    progressTrend: 'Mwenendo wa Maendeleo',
    progressToGoal: 'Maendeleo hadi Lengo',
    ofGoal: '{pct}% ya lengo',
    goalReached: '🎯 Lengo Limefikiwa!',
    categoryBreakdown: 'Uchanganuzi wa Kitengo',
    noSessionsRange: 'Hakuna vipindi katika safu hii',
    tryWiderRange: 'Jaribu masafa mapana zaidi au chagua kipindi tofauti.',
    noSessionsYet: 'Bado hakuna vipindi',
    completeFirst: 'Kamilisha tathmini yako ya kwanza ili kuona maendeleo yako na mitindo hapa.',
    startFirst: 'Anza Tathmini ya Kwanza',
    export: {
      date: 'Tarehe',
      time: 'Muda',
      totalScore: 'Jumla ya Alama',
      duration: 'Muda (dakika)',
      notes: 'Vidokezo'
    }
  },
  stats: {
    averageScore: 'Alama ya Wastani',
    medianScore: 'Alama ya wastani',
    highestScore: 'Alama ya Juu',
    totalSessions: 'Jumla ya Vikao'
  },
  network: {
    rankings: 'Nafasi za Mtandao',
    searchingPeers: 'Inatafuta marafiki...',
    searching: 'Inatafuta...',
    online: 'Mtandaoni',
    peers: '{count} wenzao',
    results: '{count} matokeo',
    avgShort: 'Wastani',
    p90Short: 'P90',
    averageScoreTitle: 'Alama ya Wastani',
    percentile90Title: 'Asilimia 90',
    globalAverage: 'Wastani wa Kimataifa',
    percentile90: 'Asilimia 90',
    manifestations: 'Maonyesho',
    activePeers: 'Wenzake Watendaji',
    categoryRankings: 'Nafasi za Kategoria'
  },
  focusAreas: {
    title: 'Maeneo Makini',
    subtitle:
      'Kategoria zako 3 zilizo na alama za chini zaidi - kuboresha hizi huleta faida kubwa zaidi.',
    empty: 'Kamilisha vipindi zaidi ili kuona mapendekezo ya eneo maalum la kulenga.'
  },
  sessions: {
    recent: 'Vikao vya Hivi Karibuni',
    deselectAll: 'Usichague Zote',
    selectAll: 'Chagua Zote',
    deleteCount: 'Futa {count}',
    cancel: 'Ghairi',
    select: 'Chagua',
    deleting: 'Inafuta...'
  },
  settings: {
    title: 'Mipangilio ya Programu',
    close: 'Funga mipangilio',
    dataManagement: 'Usimamizi wa Data',
    saveLastSession: 'Hifadhi Kipindi Cha Mwisho',
    saveLastSessionDesc: 'Jaza mapema majibu kutoka kwa kipindi chako kilichokamilika hivi majuzi.',
    resetProgress: 'Weka Upya Maendeleo',
    resetProgressDesc: 'Futa majibu yote uliyohifadhi na uanze upya.',
    goals: 'Malengo',
    targetScore: 'Alama Lengwa',
    targetScoreDesc:
      'Weka alama ya lengo (1,000–10,000) ili kufuatilia maendeleo yako kwenye dashibodi.',
    set: 'Weka',
    clearGoal: 'Wazi',
    currentTarget: 'Lengo la sasa:',
    on: 'Washa',
    off: 'Imezimwa',
    version: 'Kanuni ya Udhihirisho {version}',
    clearAllAnswers: 'Futa Majibu Yote',
    clearConfirmTitle: 'Futa Majibu Yote',
    clearConfirmMessage: 'Hii itafuta kabisa majibu yako yote ya sasa na haiwezi kutenduliwa.',
    clearConfirmLabel: 'Wazi',
    keepAnswers: 'Weka Majibu',
    language: 'Lugha',
    languageDesc: 'Chagua lugha ya kuonyesha kwa programu.',
    languageCount: '{count} lugha zinapatikana',
    goalErrorRange: 'Tafadhali weka alama kati ya 1,000 na 10,000.'
  },
  questionnaire: {
    saving: 'Inahifadhi...',
    saved: 'Imehifadhiwa',
    progressText: '{pct}% imekamilika ({answered}/{total})',
    progressAria: 'Maendeleo ya kukamilika kwa tathmini',
    maxScore: 'Upeo: {score}',
    answerToScore: 'Jibu kwa alama',
    currentScore: 'Alama ya Sasa',
    scrollAll: 'Tembeza Zote',
    stepByStep: 'Hatua kwa Hatua',
    questionOf: 'Swali {current} la {total}',
    previous: '← Iliyotangulia',
    next: 'Inayofuata →',
    completeAssessment: 'Tathmini Kamili',
    startFresh: 'Unataka kuanza upya?',
    resetAllAnswers: 'Weka upya majibu yote',
    resetTitle: 'Ungependa kubadilisha Majibu Yote?',
    resetMessage: 'Hii itafuta kila jibu na kuanza kutoka mwanzo. Hili haliwezi kutenduliwa.',
    resetLabel: 'Weka upya',
    scoreQuality: {
      notStarted: 'Haijaanza',
      manifesting: 'Kudhihirisha ❆',
      aligned: 'Imepangiliwa',
      building: 'Jengo',
      startingOut: 'Kuanzia nje'
    },
    submitHint: {
      zero: '0 kati ya maswali ya {total} yamejibiwa — maswali ambayo hayajajibiwa chaguomsingi yawe ya chini kabisa',
      partial:
        '{remaining} swali limesalia - maswali ambayo hayajajibiwa chaguomsingi hadi kiwango cha chini | {remaining} maswali yamesalia — maswali ambayo hayajajibiwa chaguomsingi yawe ya chini kabisa',
      complete: 'Maswali yote yamejibiwa - tayari kuwasilisha!'
    },
    submitTitle: {
      zero: 'Jibu baadhi ya maswali ili kukamilisha tathmini yako',
      partial: '{remaining} swali limesalia | {remaining} maswali yamesalia',
      complete: 'Peana tathmini yako iliyokamilika'
    },
    submitError: 'Imeshindwa kuhifadhi kipindi: {error}',
    dotTitle: 'Swali {index}',
    dotAria: 'Nenda kwa swali {index}',
    keyboardHint: 'Kidokezo: Tumia ← → kusogeza · 1–9 / 0 kukadiria'
  },
  onboarding: {
    step0Title: 'Karibu kwenye Kanuni ya Udhihirisho',
    step0Body1:
      'Zana hii hukusaidia kupima jinsi mawazo, mazoea na matendo yako ya kila siku yanavyolingana na kufikia malengo yako. Jibu kila swali kwa uaminifu ili kupata alama yako ya sasa.',
    step0Body2:
      'Jaza dodoso kwa vipindi vya kawaida ili kufuatilia ukuaji wako baada ya muda na uone ni maeneo gani yanahitaji kuangaliwa zaidi.',
    step1Title: 'Jinsi Bao Hufanya Kazi',
    step1Body:
      'Kila swali lina thamani ya idadi fulani ya pointi. Jitathmini kwa kipimo cha 1–10 kwa kila swali. Ukadiriaji wa 10 unamaanisha kuwa unajumuisha kanuni hiyo kikamilifu; 1 inamaanisha kuwa hujaanza.',
    step1TargetHint: '🎯 Lengo: {target} | Kiwango cha juu zaidi: {maximum}',
    excellent: 'Bora kabisa',
    excellentRange: '7,001 - 10,000',
    excellentNote: 'Mpangilio mkali - endelea',
    good: 'Nzuri',
    goodRange: '4,001 - 7,000',
    goodNote: 'Msingi imara - chumba cha kukua',
    needsWork: 'Inahitaji Kazi',
    needsWorkRange: '0 - 4,000',
    needsWorkNote: 'Zingatia mambo ya msingi kwanza',
    step2Title: 'Data Yako Inabaki Faragha',
    step2Body1:
      'Majibu yako yote na historia ya alama huhifadhiwa ndani ya kifaa chako kwa kutumia hifadhidata iliyosimbwa kwa njia fiche ya SQLite. Hakuna kitu kinachotumwa kwa seva yoyote bila idhini yako wazi.',
    step2Body2:
      'Kipengele cha hiari cha kushiriki kati ya wenzao hukuwezesha kuona alama za jumla zisizojulikana kutoka kwa watumiaji wengine. Inashiriki tu muhtasari uliotiwa saini kwa njia fiche - kamwe sio majibu yako binafsi.',
    readyText: 'Tayari? Hebu tupate alama yako ya msingi.',
    skipIntro: 'Ruka utangulizi',
    next: 'Inayofuata',
    getStarted: 'Anza'
  },
  sharing: {
    title: 'Kushiriki Mtandao Bila Kujulikana',
    privacyFirst: '🔒 Faragha-Kwanza',
    description:
      'Changia matokeo yako bila kukutambulisha kwenye mtandao wa kimataifa. Hakuna jina, barua pepe, anwani ya IP au kitambulisho cha kifaa kinachoshirikiwa.',
    enabled: 'Kushiriki kumewezeshwa - kuchangia kwenye mtandao',
    disabled: 'Kushiriki kumezimwa (chaguo-msingi)',
    activeBadge: '✓ Alama zako ambazo hazikutajwa zinashirikiwa na wenzako',
    enableNote: 'Wezesha kuona kiwango chako cha asilimia ikilinganishwa na mtandao wa kimataifa.'
  },
  category: {
    back: '‹ Nyuma',
    history: 'Historia',
    date: 'Tarehe',
    score: 'Alama',
    loading: 'Inapakia...',
    notEnoughData: 'Hakuna data ya kutosha',
    noData: 'Hakuna data iliyopatikana ya "@PH_0@@".',
    goToDashboard: 'Nenda kwenye Dashibodi'
  },
  chartActions: {
    viewFullscreen: 'Tazama skrini nzima',
    exitFullscreen: 'Ondoka kwenye skrini nzima',
    copyChart: 'Nakili Chati',
    exportChart: 'Hamisha chati',
    exportDefault: '⬇ Hamisha',
    exportExcel: '📊 Hamisha Excel',
    exportCsv: '📄 Hamisha CSV',
    exportPdf: '📑 Hamisha PDF',
    exportHtml: '🌐 Hamisha HTML',
    copied: 'Chati imenakiliwa kwenye ubao wa kunakili',
    copyFailed: 'Imeshindwa kunakili — ubao wa kunakili haupatikani',
    saveCancelled: 'Hifadhi imeghairiwa'
  },
  resume: {
    continueLastSession: 'Ungependa kuendelea kutoka Kipindi Kilichopita?',
    welcomeBack: 'Karibu tena!',
    historicalBody:
      'Majibu yako kutoka kwa kipindi chako cha mwisho kilichokamilika yamepakiwa mapema. Je, ungependa kuweka thamani hizo kama mahali pa kuanzia, au anza na dodoso tupu kabisa?',
    activeBody:
      'Una kikao kinachoendelea. Je, ungependa kuendelea pale ulipoishia, au kuanza tathmini mpya?',
    clearWarning: '⚠️ Hii itafuta majibu yote ya sasa. Je, una uhakika?',
    yesStartFresh: 'Ndio, Anza upya',
    cancel: 'Ghairi',
    keepLastValues: 'Weka Maadili ya Mwisho',
    resumeSession: 'Rejesha Kipindi',
    startFresh: 'Anza upya'
  },
  questionItem: {
    pointsSuffix: 'pointi',
    low: 'Chini',
    high: 'Juu',
    rateAria: 'Kadiria {question}'
  },
  dateRange: {
    rangeLabel: 'Masafa:',
    startDate: 'Tarehe ya kuanza',
    endDate: 'Tarehe ya mwisho',
    presets: {
      '7d': 'Siku 7',
      '30d': 'Siku 30',
      '90d': 'Siku 90',
      '1y': '1 Mwaka',
      all: 'Wakati Wote',
      custom: 'Desturi'
    }
  },
  update: {
    availableTitle: 'v{version} inapatikana!',
    releaseNotesFallback: 'Tembelea ukurasa wa toleo ili kupakua toleo jipya zaidi.',
    getUpdate: 'Pata Sasisho',
    dismiss: 'Ondoa'
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

export default sw;

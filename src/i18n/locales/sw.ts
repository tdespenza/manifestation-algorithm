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
    '1': 'Jifunze Misingi',
    '2': 'Washa na Angazia Maneno',
    '3': 'Pata Maumivu na Nishati ya Mkataba',
    '4': 'Bainisha unachotaka',
    '5': 'Andika unachotaka',
    '6': 'Usishiriki ndoto yako na wengine',
    '7': 'Pata hamu kubwa kwa lengo lako',
    '8': 'Lengo lazima liwe katika Sweet Spot',
    '9': 'Fanya uamuzi',
    '10': 'Tazama/Jisikie vizuri katika kumiliki lengo lako',
    '11': 'Toa kiambatisho kwa matokeo',
    '12': 'Ruhusu JINSI ya kujionyesha',
    '13': 'Jua tofauti kati ya Ndoto na Lengo Kuu',
    '14': 'Kuwa na umakini / Umoja wa kusudi',
    '15': 'Orodha ya kila siku ya TO Do ya Vipaumbele',
    '16': 'Maendeleo ya Chati / Jua Alama',
    '17': 'Tumia Mzunguko wa Mafanikio ya Momentum',
    '18': 'Jengo la Ndoto - Kitabu cha Ndoto na Bodi ya Maono',
    '19': 'Chomeka kwenye Mfumo',
    '20': 'Kozi ya Sayansi ya Ustadi wa Kibinafsi',
    '21': 'Tazama maneno unayosema - unachosema ndicho unachopata',
    '22': 'Fiziolojia / Mavazi ya mafanikio',
    '23': 'Wazi nia ya kupinga',
    '24': 'Amsha Nguvu yako ya Ndani: Michakato ya Nguvu Kuu',
    '25': 'Tangaza kwenye wimbi la ubongo la Alpha-theta',
    '26': 'Acha kusimulia hadithi yako ya ole',
    '27': 'Onyesha Shukrani / Shukrani',
    '28': 'Badilisha Tabia za Kushindwa w / Tabia za Mafanikio (Michakato ya Accelerator)',
    '29': 'Unda Mastermind',
    '30': 'Tazama Watu / Mwanafunzi Waliofanikiwa',
    '31': 'Sikiliza/Soma Hadithi za Mafanikio',
    '32': 'Toa unachotaka kwanza',
    '33': 'Fanya Sasa Mawazo',
    '34': 'Tunza mwili wako',
    '35': 'Pata Dhahabu katika Shida',
    '36': 'Futa Samskaras kutoka Shambani',
    '37': 'Chukua jukumu la 100%',
    '38': 'Jenereta za Uwanja wa Kivutio',
    '39': 'Jiunge na Klabu inayokuunganisha na Chanzo cha Nguvu',
    '40': 'Ishi maisha kwa nia ya makusudi - kuwa katika wakati wa sasa',
    '1a': 'Unamsikiliza nani?',
    '1b': 'Kielezo cha Kufundisha',
    '1c': 'Kiwango cha Mizani ya Mafunzo',
    '1d': 'Uwezo wa kupoteza fahamu',
    '19a': 'Soma vitabu',
    '19b': 'Sikiliza sauti',
    '19c': 'Hudhuria Matukio (kila mwezi)',
    '19d': 'Toa na upokee Utambuzi / Kanuni ya Dhahabu iliyopanuliwa',
    '19e': 'Kuendeleza uhusiano na watu wenye nia moja',
    '23a': 'Michakato ya Pesa',
    '23b': 'Michakato ya Uhusiano',
    '23c': 'Michakato ya Uongozi',
    '23d': 'Michakato ya mawasiliano',
    '23e': 'Michakato ya Afya',
    '23f': 'Michakato ya Ufahamu wa Kiroho',
    '23g': 'Michakato ya ndoto',
    '23h': 'Michakato ya Shirika na Kuzingatia'
  }
};

export default sw;

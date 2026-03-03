/**
 * Auto-converted locale module for uz.
 */
import type { Messages } from './en';

const uz: Messages = {
  nav: {
    questionnaire: 'Anketa',
    history: 'Tarix',
    settings: 'Sozlamalar'
  },
  app: {
    name: 'Namoyish algoritmi',
    unexpectedError: 'Kutilmagan xatolik yuz berdi.'
  },
  home: {
    subtitle: "Hayotingizning har bir sohasini baholang - o'zingizning moslashish balingizni toping"
  },
  dashboard: {
    title: "Ko'rinish algoritmini kuzatish tarixi",
    subtitle: "Vaqt o'tishi bilan taraqqiyotingizni kuzatib boring",
    loading: 'Tarixingiz yuklanmoqda…',
    noData: 'Bu davr uchun maʼlumot yoʻq',
    progressTrend: 'Rivojlanish tendentsiyasi',
    progressToGoal: "Maqsad sari o'tish",
    ofGoal: 'Maqsadning {pct}%',
    goalReached: '🎯 Maqsadga erishildi!',
    categoryBreakdown: "Kategoriyalar bo'yicha",
    noSessionsRange: 'Bu oraliqda seanslar yoʻq',
    tryWiderRange: "Kengroq diapazonni sinab ko'ring yoki boshqa davrni tanlang.",
    noSessionsYet: "Hali seanslar yo'q",
    completeFirst:
      'Taraqqiyotingiz va tendentsiyalaringizni shu yerda koʻrish uchun birinchi baholashingizni yakunlang.',
    startFirst: 'Birinchi baholashni boshlang',
    export: {
      date: 'Sana',
      time: 'Vaqt',
      totalScore: 'Umumiy ball',
      duration: 'Davomiyligi (daq)',
      notes: 'Eslatmalar'
    }
  },
  stats: {
    averageScore: "O'rtacha ball",
    medianScore: 'Oʻrtacha ball',
    highestScore: 'Eng yuqori ball',
    totalSessions: 'Jami sessiyalar'
  },
  network: {
    rankings: 'Tarmoq reytinglari',
    searchingPeers: 'Tengdoshlar qidirilmoqda...',
    searching: 'Qidirilmoqda...',
    online: 'Onlayn',
    peers: '{count} tengdoshlari',
    results: '{count} natijalar',
    avgShort: 'Oʻrtacha',
    p90Short: 'P90',
    averageScoreTitle: "O'rtacha ball",
    percentile90Title: '90 foiz',
    globalAverage: "Global o'rtacha",
    percentile90: '90 foiz',
    manifestations: "Ko'rinishlar",
    activePeers: 'Faol tengdoshlar',
    categoryRankings: 'Kategoriyalar reytingi'
  },
  focusAreas: {
    title: 'Fokusli hududlar',
    subtitle:
      'Sizning eng past ball olgan 3 ta toifangiz — bularni yaxshilash eng katta daromad keltiradi.',
    empty:
      'Fokus maydoniga moslashtirilgan tavsiyalarni koʻrish uchun koʻproq seanslarni yakunlang.'
  },
  sessions: {
    recent: 'Oxirgi sessiyalar',
    deselectAll: 'Barchasini bekor qilish',
    selectAll: 'Hammasini tanlang',
    deleteCount: 'Oʻchirish {count}',
    cancel: 'Bekor qilish',
    select: 'Tanlang',
    deleting: 'Oʻchirilmoqda…'
  },
  settings: {
    title: 'Ilova sozlamalari',
    close: 'Sozlamalarni yoping',
    dataManagement: "Ma'lumotlarni boshqarish",
    saveLastSession: 'Oxirgi seansni saqlang',
    saveLastSessionDesc: 'Oxirgi yakunlangan sessiyangizdagi javoblarni oldindan toʻldiring.',
    resetProgress: 'Jarayonni tiklash',
    resetProgressDesc: "Barcha saqlangan javoblarni o'chirib tashlang va yangidan boshlang.",
    goals: 'Maqsadlar',
    targetScore: 'Maqsadli ball',
    targetScoreDesc:
      'Boshqarish panelida muvaffaqiyatingizni kuzatish uchun maqsadli ballni (1000–10000) belgilang.',
    set: 'Oʻrnatish',
    clearGoal: 'Toza',
    currentTarget: 'Joriy maqsad:',
    on: 'Yoniq',
    off: 'Oʻchirilgan',
    version: 'Namoyish algoritmi {version}',
    clearAllAnswers: 'Barcha javoblarni tozalash',
    clearConfirmTitle: 'Barcha javoblarni tozalash',
    clearConfirmMessage:
      'Bu sizning barcha joriy javoblaringizni butunlay o‘chirib tashlaydi va buni ortga qaytarib bo‘lmaydi.',
    clearConfirmLabel: 'Toza',
    keepAnswers: 'Javoblarni saqlang',
    language: 'Til',
    languageDesc: 'Ilova uchun ekran tilini tanlang.',
    languageCount: '{count} tillari mavjud',
    goalErrorRange: 'Iltimos, 1000 dan 10 000 gacha ball kiriting.'
  },
  questionnaire: {
    saving: 'Saqlanmoqda...',
    saved: 'Saqlangan',
    progressText: '{pct}% bajarildi ({answered}/{total})',
    progressAria: 'Baholash jarayonini yakunlash',
    maxScore: 'Maksimal: {score}',
    answerToScore: 'Gol uchun javob',
    currentScore: 'Joriy ball',
    scrollAll: 'Hammasini aylantiring',
    stepByStep: 'Bosqichma-bosqich',
    questionOf: 'Savol {current}, {total}',
    previous: '← Oldingi',
    next: 'Keyingi →',
    completeAssessment: "To'liq baholash",
    startFresh: 'Yangi boshlamoqchimisiz?',
    resetAllAnswers: 'Barcha javoblarni tiklang',
    resetTitle: 'Barcha javoblar qayta tiklansinmi?',
    resetMessage:
      'Bu har bir javobni tozalaydi va noldan boshlanadi. Buni ortga qaytarib bo‘lmaydi.',
    resetLabel: 'Qayta tiklash',
    scoreQuality: {
      notStarted: 'Boshlanmagan',
      manifesting: "Ko'rinish ❆",
      aligned: 'Tegishli',
      building: 'Bino',
      startingOut: 'Boshlanish'
    },
    submitHint: {
      zero: '{total} savollardan 0 tasiga javob berildi — javobsiz savollar asl qiymati minimal',
      partial:
        "{remaining} savol qoldi — javobsiz savollar sukut bo'yicha minimal | {remaining} savollar qolgan — javobsiz savollar asl qiymati minimal",
      complete: 'Barcha savollarga javob berildi - topshirishga tayyor!'
    },
    submitTitle: {
      zero: "Baholashni yakunlash uchun ba'zi savollarga javob bering",
      partial: '{remaining} savol qoldi | {remaining} savollar qoldi',
      complete: 'Tugallangan baholashingizni yuboring'
    },
    submitError: 'Seansni saqlab bo‘lmadi: {error}',
    dotTitle: 'Savol {index}',
    dotAria: "{index} savoliga o'ting",
    keyboardHint: 'Maslahat: Baholash uchun ← → dan foydalaning · 1–9 / 0'
  },
  onboarding: {
    step0Title: 'Manifestatsiya algoritmiga xush kelibsiz',
    step0Body1:
      "Ushbu vosita sizning fikrlash tarzingiz, odatlaringiz va kundalik harakatlaringiz maqsadlaringizga erishish bilan qanchalik mos kelishini o'lchashga yordam beradi. Joriy ballingizni olish uchun har bir savolga halol javob bering.",
    step0Body2:
      "Vaqt o'tishi bilan o'sishingizni kuzatib borish va qaysi sohalarga ko'proq e'tibor berish kerakligini bilish uchun anketani muntazam ravishda to'ldiring.",
    step1Title: 'Skorlash qanday ishlaydi',
    step1Body:
      "Har bir savol ma'lum miqdordagi ballga arziydi. Har bir savol uchun oʻzingizni 1–10 ball boʻyicha baholang. 10 ball bu tamoyilni to'liq o'zida mujassam etganingizni anglatadi; 1 siz boshlamaganingizni anglatadi.",
    step1TargetHint: '🎯 Maqsad: {target} | Maksimal: {maximum}',
    excellent: 'Ajoyib',
    excellentRange: '7 001 - 10 000',
    excellentNote: 'Kuchli moslashish - davom eting',
    good: 'Yaxshi',
    goodRange: '4 001 - 7 000',
    goodNote: "Qattiq poydevor - o'sish uchun xona",
    needsWork: 'Ishga muhtoj',
    needsWorkRange: '0 – 4000',
    needsWorkNote: "Avval asoslarga e'tibor qarating",
    step2Title: 'Maʼlumotlaringiz maxfiy qoladi',
    step2Body1:
      'Barcha javoblaringiz va ballar tarixi shifrlangan SQLite maʼlumotlar bazasi yordamida qurilmangizda mahalliy sifatida saqlanadi. Sizning aniq ruxsatingizsiz hech qanday serverga hech narsa yuborilmaydi.',
    step2Body2:
      "Ixtiyoriy “tengdoshga” almashish funksiyasi sizga boshqa foydalanuvchilarning anonim umumiy ballarini ko‘rish imkonini beradi. U faqat kriptografik imzolangan xulosani baham ko'radi - hech qachon sizning shaxsiy javoblaringiz bo'lmaydi.",
    readyText: "Tayyormisiz? Keling, boshlang'ich ballingizni olamiz.",
    skipIntro: 'Kirishni oʻtkazib yuborish',
    next: 'Keyingi',
    getStarted: 'Boshlash'
  },
  sharing: {
    title: 'Anonim tarmoq almashish',
    privacyFirst: '🔒 Maxfiylik - birinchi navbatda',
    description:
      "Natijalaringizni ixtiyoriy ravishda global tarmoqqa anonim tarzda kiriting. Hech qanday nom, elektron pochta, IP manzil yoki qurilma identifikatori hech qachon baham ko'rilmaydi.",
    enabled: 'Ulashish yoqilgan — tarmoqqa hissa qoʻshish',
    disabled: 'Ulashish o‘chirilgan (standart)',
    activeBadge: '✓ Sizning anonim ballaringiz tengdoshlaringizga ulashilmoqda',
    enableNote: "Global tarmoq bilan solishtirganda foizli darajangizni ko'rishni yoqing."
  },
  category: {
    back: '‹ Orqaga',
    history: 'Tarix',
    date: 'Sana',
    score: 'Gol',
    loading: 'Yuklanmoqda...',
    notEnoughData: 'Maʼlumotlar yetarli emas',
    noData: '“{category}” uchun maʼlumotlar topilmadi.',
    goToDashboard: 'Boshqaruv paneliga o‘ting'
  },
  chartActions: {
    viewFullscreen: 'Toʻliq ekranni koʻrish',
    exitFullscreen: 'Toʻliq ekrandan chiqish',
    copyChart: "Diagrammadan nusxa ko'chirish",
    exportChart: 'Eksport diagrammasi',
    exportDefault: '⬇ Eksport',
    exportExcel: '📊 Excelni eksport qilish',
    exportCsv: '📄 CSV ni eksport qilish',
    exportPdf: '📑 PDF-ni eksport qilish',
    exportHtml: '🌐 HTMLni eksport qilish',
    copied: 'Diagramma vaqtinchalik xotiraga nusxalandi',
    copyFailed: 'Nusxalash amalga oshmadi — vaqtinchalik xotira mavjud emas',
    saveCancelled: 'Saqlash bekor qilindi'
  },
  resume: {
    continueLastSession: 'Oxirgi sessiyadan davom ettirilsinmi?',
    welcomeBack: 'Qaytib kelganingizdan xursandmiz!',
    historicalBody:
      "Oxirgi tugallangan sessiyadagi javoblaringiz oldindan yuklangan. Ushbu qadriyatlarni boshlang'ich nuqtasi sifatida saqlashni xohlaysizmi yoki butunlay bo'sh so'rovnoma bilan boshlashni xohlaysizmi?",
    activeBody:
      'Sizda seans davom etmoqda. To‘xtagan joydan davom etishni yoki yangi baholashni boshlashni xohlaysizmi?',
    clearWarning: '⚠️ Bu barcha joriy javoblarni oʻchirib tashlaydi. Ishonchingiz komilmi?',
    yesStartFresh: 'Ha, yangi boshlang',
    cancel: 'Bekor qilish',
    keepLastValues: 'Oxirgi qiymatlarni saqlang',
    resumeSession: 'Seansni davom ettirish',
    startFresh: 'Yangi boshlang'
  },
  questionItem: {
    pointsSuffix: 'ball',
    low: 'Past',
    high: 'Yuqori',
    rateAria: 'Baholash {question}'
  },
  dateRange: {
    rangeLabel: 'Diapazon:',
    startDate: 'Boshlanish sanasi',
    endDate: 'Tugash sanasi',
    presets: {
      '7d': '7 kun',
      '30d': '30 kun',
      '90d': '90 kun',
      '1y': '1 yil',
      all: 'Hamma vaqt',
      custom: 'Maxsus'
    }
  },
  update: {
    availableTitle: 'v{version} mavjud!',
    releaseNotesFallback:
      "Eng so'nggi versiyani yuklab olish uchun nashr sahifasiga tashrif buyuring.",
    getUpdate: 'Yangilash',
    dismiss: 'Rad etish'
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

export default uz;

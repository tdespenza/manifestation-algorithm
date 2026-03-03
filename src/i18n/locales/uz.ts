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
    '1': "Asoslarni o'zlashtiring",
    '2': "So'zlarni Faollashtirish va Yorqinlashtirish",
    '3': "Og'riqni toping va energiyani qisqartiring",
    '4': 'Nimani xohlashingizni aniqlang',
    '5': "Nimani xohlashingizni yozib qo'ying",
    '6': "Orzularingni boshqalar bilan bo'lishma",
    '7': 'Maqsading uchun olovli ishtiyoqga ega bo‘l',
    '8': "Maqsad Shirin Nuqtada bo'lishi kerak",
    '9': 'Qaror qabul qil',
    '10': 'Maqsadingga ega bo‘lganingda yaxshi ko‘rish/his qilish',
    '11': 'Natijaga bo‘lgan bog‘lanishni qo‘yib yuborish',
    '12': 'Qanday bo‘lishini o‘zini ko‘rsatishga ruxsat bering',
    '13': 'Orzu va Asosiy Maqsad orasidagi farqni bil',
    '14': 'Diqqatni jamlash / Maqsadga sodiqlik',
    '15': 'Kundalik vazifalar ro‘yxati bo‘yicha ustuvorliklar',
    '16': 'Diagramma Taraqqiyoti / Ballarni Bilish',
    '17': 'Muvaffaqiyatning Harakat Siklidan Foydalaning',
    '18': 'Orzu Qurish - Orzu Kitobi va Ko‘rish Taxtasi',
    '19': 'Tizimga ulang',
    '20': 'Shaxsiy Ustalik Ilmi Kursi',
    '21': 'Gapirayotgan so‘zlaringga e’tibor ber - aytganing shuni olasan',
    '22': 'Fiziologiya / Muvaffaqiyat uchun kiyinish',
    '23': 'Kounter Maqsadlarini Tozalash',
    '24': "Ichki Kuchingizni uyg'oting: Superquvvat Jarayonlari",
    '25': "Alpha-teta miya to'lqinida efirga uzatish",
    '26': "O'z achchiq-hikoyangizni aytishni to'xtating",
    '27': 'Minnatdorchilik / Tashakkur bildirish',
    '28': 'Muvaffaqiyatsizlik odatlarini muvaffaqiyat odatlari bilan almashtirish (Tezlashtiruvchi jarayonlar)',
    '29': 'Mastermind yarating',
    '30': 'Muvaffaqiyatli odamlarni/kichik shogirdni tomosha qiling',
    '31': "Muvaffaqiyat Hikoyalarini Tinglang/O'qing",
    '32': 'Birinchidan, nima bermoqchi ekanligingizni bering',
    '33': 'Hozir Qilish Mentaliteti',
    '34': "Taningizga g'amxo'rlik qiling",
    '35': 'Qiyinchilikda oltinni top',
    '36': 'Maydonni samskaralardan tozalash',
    '37': "100% Mas'uliyatni oling",
    '38': 'Tortish Maydoni Generatorlari',
    '39': "Sizni Quvvat Manbasiga ulaydigan klubga qo'shiling",
    '40': "Hayotni ongli niyat bilan yashang - hozirgi paytda bo'ling",
    '1a': 'Kimni tinglaysiz?',
    '1b': 'O‘rgatilish indeksi',
    '1c': 'Mashq Tarozisi',
    '1d': 'Nozik ong osti malakasi',
    '19a': 'Kitob o‘qing',
    '19b': 'Audionarni tinglang',
    '19c': 'Tadbirlarda ishtirok etish (oylik)',
    '19d': 'E’tirof berish va qabul qilish / kengaytirilgan Oltin Qoidasi',
    '19e': "O'xshash fikrli odamlar bilan munosabatlar rivojlantiring",
    '23a': 'Pul jarayonlari',
    '23b': 'Munosabat jarayonlari',
    '23c': 'Rahbarlik jarayonlari',
    '23d': 'Aloqa jarayonlari',
    '23e': "Sog'liq jarayonlari",
    '23f': 'Ruhiy Anglash Jarayonlari',
    '23g': 'Tush jarayonlari',
    '23h': 'Tashkilot va Diqqat Jarayonlari'
  }
};

export default uz;

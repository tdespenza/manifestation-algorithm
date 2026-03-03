/**
 * Auto-converted locale module for fa.
 */
import type { Messages } from './en';

const fa: Messages = {
  nav: {
    questionnaire: 'پرسشنامه',
    history: 'تاریخچه',
    settings: 'تنظیمات'
  },
  app: {
    name: 'الگوریتم تجلی',
    unexpectedError: 'یک خطای غیرمنتظره رخ داد.'
  },
  home: {
    subtitle: 'به هر بخش از زندگی خود امتیاز دهید - امتیاز هم ترازی خود را کشف کنید'
  },
  dashboard: {
    title: 'تاریخچه ردیابی الگوریتم تجلی',
    subtitle: 'پیشرفت خود را در طول زمان پیگیری کنید',
    loading: 'در حال بارگیری سابقه شما…',
    noData: 'هیچ داده ای برای این دوره وجود ندارد',
    progressTrend: 'روند پیشرفت',
    progressToGoal: 'پیشرفت به سمت هدف',
    ofGoal: '{pct}% هدف',
    goalReached: '🎯 هدف رسید!',
    categoryBreakdown: 'تفکیک دسته',
    noSessionsRange: 'هیچ جلسه ای در این محدوده وجود ندارد',
    tryWiderRange: 'محدوده وسیع تری را امتحان کنید یا دوره متفاوتی را انتخاب کنید.',
    noSessionsYet: 'هنوز جلسه ای وجود ندارد',
    completeFirst: 'اولین ارزیابی خود را برای مشاهده پیشرفت و روند خود در اینجا تکمیل کنید.',
    startFirst: 'شروع اولین ارزیابی',
    export: {
      date: 'تاریخ',
      time: 'زمان',
      totalScore: 'امتیاز کل',
      duration: 'مدت زمان (دقیقه)',
      notes: 'یادداشت ها'
    }
  },
  stats: {
    averageScore: 'میانگین امتیاز',
    medianScore: 'میانگین امتیاز',
    highestScore: 'بالاترین امتیاز',
    totalSessions: 'مجموع جلسات'
  },
  network: {
    rankings: 'رتبه بندی شبکه',
    searchingPeers: 'جستجوی همتایان...',
    searching: 'در حال جستجو...',
    online: 'آنلاین',
    peers: '{count} همتایان',
    results: 'نتایج {count}',
    avgShort: 'میانگین',
    p90Short: 'P90',
    averageScoreTitle: 'میانگین امتیاز',
    percentile90Title: 'صدک 90',
    globalAverage: 'میانگین جهانی',
    percentile90: 'صدک 90',
    manifestations: 'تجلیات',
    activePeers: 'همتایان فعال',
    categoryRankings: 'رتبه بندی دسته ها'
  },
  focusAreas: {
    title: 'مناطق تمرکز',
    subtitle: '3 دسته با کمترین امتیاز شما - بهبود این دسته ها بیشترین سود را به همراه دارد.',
    empty: 'برای مشاهده توصیه‌های ناحیه تمرکز شخصی‌شده، جلسات بیشتری را تکمیل کنید.'
  },
  sessions: {
    recent: 'جلسات اخیر',
    deselectAll: 'همه را لغو انتخاب کنید',
    selectAll: 'همه را انتخاب کنید',
    deleteCount: 'حذف {count}',
    cancel: 'لغو کنید',
    select: 'انتخاب کنید',
    deleting: 'در حال حذف…'
  },
  settings: {
    title: 'تنظیمات برنامه',
    close: 'تنظیمات را ببندید',
    dataManagement: 'مدیریت داده ها',
    saveLastSession: 'ذخیره آخرین جلسه',
    saveLastSessionDesc: 'پاسخ‌ها را از آخرین جلسه تکمیل‌شده‌تان از قبل پر کنید.',
    resetProgress: 'بازنشانی پیشرفت',
    resetProgressDesc: 'همه پاسخ های ذخیره شده را حذف کنید و تازه شروع کنید.',
    goals: 'اهداف',
    targetScore: 'امتیاز هدف',
    targetScoreDesc: 'برای پیگیری پیشرفت خود در داشبورد، یک امتیاز هدف (1000–10000) تعیین کنید.',
    set: 'تنظیم کنید',
    clearGoal: 'پاک کردن',
    currentTarget: 'هدف فعلی:',
    on: 'روشن',
    off: 'خاموش',
    version: 'الگوریتم تجلی {version}',
    clearAllAnswers: 'پاک کردن همه پاسخ ها',
    clearConfirmTitle: 'پاک کردن همه پاسخ ها',
    clearConfirmMessage:
      'با این کار تمام پاسخ های فعلی شما برای همیشه حذف می شود و قابل بازگشت نیست.',
    clearConfirmLabel: 'پاک کردن',
    keepAnswers: 'پاسخ ها را نگه دارید',
    language: 'زبان',
    languageDesc: 'زبان نمایش برنامه را انتخاب کنید.',
    languageCount: '{count} زبان‌های موجود است',
    goalErrorRange: 'لطفا امتیازی بین 1000 تا 10000 وارد کنید.'
  },
  questionnaire: {
    saving: 'در حال ذخیره...',
    saved: 'ذخیره شد',
    progressText: '{pct}% کامل شد (@PH_1@@/{total})',
    progressAria: 'پیشرفت تکمیل ارزیابی',
    maxScore: 'حداکثر: {score}',
    answerToScore: 'پاسخ به گل',
    currentScore: 'امتیاز فعلی',
    scrollAll: 'همه را اسکرول کنید',
    stepByStep: 'گام به گام',
    questionOf: 'سوال {current} از {total}',
    previous: '← قبلی',
    next: 'بعدی →',
    completeAssessment: 'ارزیابی کامل',
    startFresh: 'می خواهید تازه شروع کنید؟',
    resetAllAnswers: 'همه پاسخ ها را بازنشانی کنید',
    resetTitle: 'همه پاسخ ها بازنشانی شود؟',
    resetMessage: 'این همه پاسخ ها را پاک می کند و از ابتدا شروع می شود. این قابل واگرد نیست.',
    resetLabel: 'بازنشانی کنید',
    scoreQuality: {
      notStarted: 'شروع نشده است',
      manifesting: 'تجلی ❆',
      aligned: 'تراز شد',
      building: 'ساختمان',
      startingOut: 'شروع کردن'
    },
    submitHint: {
      zero: '0 از {total} سوالات پاسخ داده شد — سوالات بی پاسخ به طور پیش فرض به حداقل رسیده است',
      partial:
        '{remaining} سوال باقی مانده — سوالات بی پاسخ پیش فرض به حداقل | سوالات {remaining} باقی مانده است - سوالات بی پاسخ به طور پیش فرض به حداقل رسیده است',
      complete: 'همه سوالات پاسخ داده شد - آماده ارسال!'
    },
    submitTitle: {
      zero: 'برای تکمیل ارزیابی خود به چند سوال پاسخ دهید',
      partial: '{remaining} سوال باقی مانده | {remaining} سوالات باقی مانده است',
      complete: 'ارزیابی تکمیل شده خود را ارسال کنید'
    },
    submitError: 'جلسه ذخیره نشد: {error}',
    dotTitle: 'سوال {index}',
    dotAria: 'به سوال {index} بروید',
    keyboardHint: 'نکته: از ← → برای پیمایش · 1–9 / 0 برای امتیاز دهی استفاده کنید'
  },
  onboarding: {
    step0Title: 'به الگوریتم Manifestation خوش آمدید',
    step0Body1:
      'این ابزار به شما کمک می کند تا میزان هماهنگی ذهنیت، عادات و اقدامات روزانه خود را با دستیابی به اهداف خود اندازه گیری کنید. به هر سوال صادقانه پاسخ دهید تا امتیاز فعلی خود را بدست آورید.',
    step0Body2:
      'پرسشنامه را در فواصل زمانی معین تکمیل کنید تا رشد خود را در طول زمان پیگیری کنید و ببینید کدام حوزه ها به بیشترین توجه نیاز دارند.',
    step1Title: 'چگونه امتیاز دهی کار می کند',
    step1Body:
      'هر سوال ارزش مجموعه ای از امتیازات را دارد. برای هر سؤال با مقیاس 1-10 به خود امتیاز دهید. رتبه دهی به این معنی است که شما به طور کامل آن اصل را تجسم می دهید. 1 به این معنی است که شما شروع نکرده اید.',
    step1TargetHint: '🎯 هدف: {target} | حداکثر: {maximum}',
    excellent: 'عالی',
    excellentRange: '7001 – 10000',
    excellentNote: 'هم ترازی قوی - ادامه دهید',
    good: 'خوب',
    goodRange: '4001 – 7000',
    goodNote: 'پایه محکم - فضایی برای رشد',
    needsWork: 'نیاز به کار دارد',
    needsWorkRange: '0 - 4000',
    needsWorkNote: 'ابتدا روی اصول تمرکز کنید',
    step2Title: 'داده های شما خصوصی می ماند',
    step2Body1:
      'تمام پاسخ ها و تاریخچه امتیازات شما با استفاده از پایگاه داده رمزگذاری شده SQLite به صورت محلی در دستگاه شما ذخیره می شود. هیچ چیزی به هیچ سروری بدون اجازه صریح شما ارسال نمی شود.',
    step2Body2:
      'ویژگی اختیاری اشتراک‌گذاری همتا به همتا به شما امکان می‌دهد امتیازات مجموع ناشناس دیگر کاربران را مشاهده کنید. این فقط یک خلاصه امضا شده رمزنگاری شده را به اشتراک می گذارد - هرگز به صورت فردی پاسخ نمی دهد.',
    readyText: 'آماده است؟ بیایید امتیاز پایه شما را بدست آوریم.',
    skipIntro: 'رد شدن از مقدمه',
    next: 'بعدی',
    getStarted: 'شروع کنید'
  },
  sharing: {
    title: 'اشتراک گذاری شبکه ناشناس',
    privacyFirst: '🔒 حریم خصوصی-اول',
    description:
      'به صورت اختیاری نتایج خود را به صورت ناشناس به شبکه جهانی ارائه دهید. هیچ نام، ایمیل، آدرس IP یا شناسه دستگاه هرگز به اشتراک گذاشته نشده است.',
    enabled: 'اشتراک‌گذاری فعال شد - مشارکت در شبکه',
    disabled: 'اشتراک‌گذاری غیرفعال است (پیش‌فرض)',
    activeBadge: '✓ امتیازات ناشناس شما با همتایان به اشتراک گذاشته می شود',
    enableNote: 'برای مشاهده رتبه صدک خود در مقایسه با شبکه جهانی فعال کنید.'
  },
  category: {
    back: '‹ برگشت',
    history: 'تاریخچه',
    date: 'تاریخ',
    score: 'امتیاز',
    loading: 'در حال بارگیری...',
    notEnoughData: 'داده کافی نیست',
    noData: 'هیچ داده ای برای "{category}" یافت نشد.',
    goToDashboard: 'به داشبورد بروید'
  },
  chartActions: {
    viewFullscreen: 'مشاهده تمام صفحه',
    exitFullscreen: 'خروج از تمام صفحه',
    copyChart: 'نمودار کپی',
    exportChart: 'نمودار صادرات',
    exportDefault: '⬇ صادرات',
    exportExcel: '📊 صادرات اکسل',
    exportCsv: '📄 صادرات CSV',
    exportPdf: '📑 صادرات PDF',
    exportHtml: '🌐 صادرات HTML',
    copied: 'نمودار در کلیپ بورد کپی شد',
    copyFailed: 'کپی انجام نشد - کلیپ بورد در دسترس نیست',
    saveCancelled: 'ذخیره لغو شد'
  },
  resume: {
    continueLastSession: 'از آخرین جلسه ادامه می دهید؟',
    welcomeBack: 'برگشت خوش آمدید!',
    historicalBody:
      'پاسخ های شما از آخرین جلسه تکمیل شده شما از قبل بارگذاری شده است. آیا می خواهید آن مقادیر را به عنوان نقطه شروع حفظ کنید یا با یک پرسشنامه کاملاً خالی شروع کنید؟',
    activeBody:
      'شما یک جلسه در حال انجام دارید. آیا می‌خواهید از همان جایی که کار را ترک کردید، از سر بگیرید یا ارزیابی جدیدی را شروع کنید؟',
    clearWarning: '⚠️ این کار همه پاسخ های فعلی را پاک می کند. مطمئنی؟',
    yesStartFresh: 'بله، تازه شروع کنید',
    cancel: 'لغو کنید',
    keepLastValues: 'آخرین ارزش ها را حفظ کنید',
    resumeSession: 'از سرگیری جلسه',
    startFresh: 'تازه شروع کن'
  },
  questionItem: {
    pointsSuffix: 'امتیاز',
    low: 'کم',
    high: 'بالا',
    rateAria: 'رتبه {question}'
  },
  dateRange: {
    rangeLabel: 'محدوده:',
    startDate: 'تاریخ شروع',
    endDate: 'تاریخ پایان',
    presets: {
      '7d': '7 روز',
      '30d': '30 روز',
      '90d': '90 روز',
      '1y': '1 سال',
      all: 'همه زمان ها',
      custom: 'سفارشی'
    }
  },
  update: {
    availableTitle: 'v{version} در دسترس است!',
    releaseNotesFallback: 'برای دانلود آخرین نسخه به صفحه انتشار مراجعه کنید.',
    getUpdate: 'به روز رسانی را دریافت کنید',
    dismiss: 'رد کردن'
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

export default fa;

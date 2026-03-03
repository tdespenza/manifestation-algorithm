/**
 * Auto-converted locale module for uk.
 */
import type { Messages } from './en';

const uk: Messages = {
  nav: {
    questionnaire: 'Анкета',
    history: 'історія',
    settings: 'Налаштування'
  },
  app: {
    name: 'Алгоритм прояву',
    unexpectedError: 'Сталася неочікувана помилка.'
  },
  home: {
    subtitle: 'Оцініть кожну сферу свого життя — дізнайтеся свій бал узгодженості'
  },
  dashboard: {
    title: 'Історія відстеження алгоритму прояву',
    subtitle: 'Відстежуйте свій прогрес з часом',
    loading: 'Завантаження історії…',
    noData: 'Немає даних за цей період',
    progressTrend: 'Тенденція прогресу',
    progressToGoal: 'Прогрес до мети',
    ofGoal: '{pct}% від цілі',
    goalReached: '🎯 Мети досягнуто!',
    categoryBreakdown: 'Розподіл категорій',
    noSessionsRange: 'Немає сеансів у цьому діапазоні',
    tryWiderRange: 'Спробуйте ширший діапазон або виберіть інший період.',
    noSessionsYet: 'Сесій ще немає',
    completeFirst: 'Пройдіть своє перше оцінювання, щоб побачити свій прогрес і тенденції тут.',
    startFirst: 'Розпочати перше оцінювання',
    export: {
      date: 'Дата',
      time: 'час',
      totalScore: 'Загальний бал',
      duration: 'Тривалість (хв)',
      notes: 'Примітки'
    }
  },
  stats: {
    averageScore: 'Середній бал',
    medianScore: 'Середній бал',
    highestScore: 'Найвищий бал',
    totalSessions: 'Загальна кількість сеансів'
  },
  network: {
    rankings: 'Рейтинг мережі',
    searchingPeers: 'Пошук однолітків...',
    searching: 'Пошук...',
    online: 'Онлайн',
    peers: '{count} колеги',
    results: '{count} результати',
    avgShort: 'Середнє',
    p90Short: 'P90',
    averageScoreTitle: 'Середній бал',
    percentile90Title: '90-й процентиль',
    globalAverage: 'Глобальне середнє',
    percentile90: '90-й процентиль',
    manifestations: 'прояви',
    activePeers: 'Активні однолітки',
    categoryRankings: 'Рейтинг категорій'
  },
  focusAreas: {
    title: 'Зони фокусування',
    subtitle: 'Ваші 3 категорії з найнижчими балами — покращення цих дає найбільші прибутки.',
    empty:
      'Пройдіть більше сеансів, щоб переглянути персоналізовані рекомендації щодо зон фокусування.'
  },
  sessions: {
    recent: 'Останні сесії',
    deselectAll: 'Зняти вибір із усіх',
    selectAll: 'Виберіть усі',
    deleteCount: 'Видалити {count}',
    cancel: 'Скасувати',
    select: 'Виберіть',
    deleting: 'Видалення…'
  },
  settings: {
    title: 'Налаштування програми',
    close: 'Закрити налаштування',
    dataManagement: 'Управління даними',
    saveLastSession: 'Зберегти останній сеанс',
    saveLastSessionDesc: 'Попередньо заповніть відповіді з останнього завершеного сеансу.',
    resetProgress: 'Скинути прогрес',
    resetProgressDesc: 'Видаліть усі збережені відповіді та почніть заново.',
    goals: 'Цілі',
    targetScore: 'Цільовий результат',
    targetScoreDesc:
      'Встановіть гол (1 000–10 000), щоб відстежувати свій прогрес на інформаційній панелі.',
    set: 'встановити',
    clearGoal: 'ясно',
    currentTarget: 'Поточна мета:',
    on: 'Увімкнено',
    off: 'Вимкнено',
    version: 'Алгоритм прояву {version}',
    clearAllAnswers: 'Очистити всі відповіді',
    clearConfirmTitle: 'Очистити всі відповіді',
    clearConfirmMessage:
      'Це назавжди видалить усі ваші поточні відповіді, і цю дію неможливо скасувати.',
    clearConfirmLabel: 'ясно',
    keepAnswers: 'Зберігайте відповіді',
    language: 'Мова',
    languageDesc: 'Виберіть мову відображення програми.',
    languageCount: '{count} доступні мови',
    goalErrorRange: 'Будь ласка, введіть оцінку від 1000 до 10 000.'
  },
  questionnaire: {
    saving: 'Збереження...',
    saved: 'Збережено',
    progressText: '{pct}% виконано ({answered}/{total})',
    progressAria: 'Прогрес завершення оцінювання',
    maxScore: 'Макс.: {score}',
    answerToScore: 'Відповідь на гол',
    currentScore: 'Поточний рахунок',
    scrollAll: 'Прокрутити все',
    stepByStep: 'Крок за кроком',
    questionOf: 'Питання {current} з {total}',
    previous: '← Попередній',
    next: 'Далі →',
    completeAssessment: 'Повна оцінка',
    startFresh: 'Хочете почати заново?',
    resetAllAnswers: 'Скинути всі відповіді',
    resetTitle: 'Скинути всі відповіді?',
    resetMessage: 'Це очистить кожну відповідь і почне все з нуля. Це неможливо скасувати.',
    resetLabel: 'Скинути',
    scoreQuality: {
      notStarted: 'Не розпочато',
      manifesting: 'Прояв ❆',
      aligned: 'Вирівняні',
      building: 'будівля',
      startingOut: 'Починаючи'
    },
    submitHint: {
      zero: '0 з {total} запитань відповіли — кількість запитань без відповіді за замовчуванням мінімальна',
      partial:
        'Залишилося запитання {remaining} — запитань без відповіді за замовчуванням встановлено мінімум | Залишилося {remaining} запитань — за замовчуванням кількість запитань без відповіді мінімальна',
      complete: 'Відповіли на всі запитання — готові до подачі!'
    },
    submitTitle: {
      zero: 'Щоб завершити оцінювання, дайте відповіді на кілька запитань',
      partial: '{remaining} залишилося запитання | Залишилося {remaining} запитань',
      complete: 'Надішліть завершену оцінку'
    },
    submitError: 'Не вдалося зберегти сеанс: {error}',
    dotTitle: 'Питання {index}',
    dotAria: 'Перейти до запитання {index}',
    keyboardHint: 'Порада: використовуйте ← → для навігації · 1–9 / 0 для оцінки'
  },
  onboarding: {
    step0Title: 'Ласкаво просимо до Алгоритму прояву',
    step0Body1:
      'Цей інструмент допоможе вам визначити, наскільки ваше мислення, звички та щоденні дії відповідають досягненню ваших цілей. Відповідайте чесно на кожне запитання, щоб отримати поточний бал.',
    step0Body2:
      'Заповнюйте анкету через регулярні проміжки часу, щоб відстежувати свій розвиток з часом і бачити, які сфери потребують найбільшої уваги.',
    step1Title: 'Як працює підрахунок балів',
    step1Body:
      'Кожне запитання оцінюється певною кількістю балів. Оцініть себе за шкалою 1–10 для кожного запитання. Рейтинг 10 означає, що ви повністю втілюєте цей принцип; 1 означає, що ви ще не почали.',
    step1TargetHint: '🎯 Ціль: {target} | Максимум: {maximum}',
    excellent: 'Чудово',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Міцне вирівнювання — продовжуйте',
    good: 'добре',
    goodRange: '4001 – 7000',
    goodNote: 'Міцна основа — куди рости',
    needsWork: 'Потрібна робота',
    needsWorkRange: '0 – 4000',
    needsWorkNote: 'Спершу зосередьтеся на основах',
    step2Title: 'Ваші дані залишаються конфіденційними',
    step2Body1:
      'Усі ваші відповіді та історія балів зберігаються локально на вашому пристрої за допомогою зашифрованої бази даних SQLite. Нічого не надсилається на будь-який сервер без вашого явного дозволу.',
    step2Body2:
      'Додаткова функція однорангового обміну дає змогу переглядати анонімні сукупні оцінки інших користувачів. Він ділиться лише криптографічно підписаним резюме — ніколи не вашими індивідуальними відповідями.',
    readyText: 'готовий Давайте отримаємо ваш базовий бал.',
    skipIntro: 'Пропустити вступ',
    next: 'Далі',
    getStarted: 'Почніть роботу'
  },
  sharing: {
    title: 'Анонімний спільний доступ до мережі',
    privacyFirst: '🔒 Конфіденційність перш за все',
    description:
      'За бажанням анонімно надсилайте свої результати до глобальної мережі. Жодне ім’я, електронна адреса, IP-адреса чи ідентифікатор пристрою ніколи не надаються.',
    enabled: 'Спільний доступ увімкнено — додавання до мережі',
    disabled: 'Спільний доступ вимкнено (за умовчанням)',
    activeBadge: '✓ Ваші анонімні бали надаються колегам',
    enableNote: 'Увімкніть, щоб побачити свій процентиль у порівнянні з глобальною мережею.'
  },
  category: {
    back: '‹ Назад',
    history: 'історія',
    date: 'Дата',
    score: 'Оцінка',
    loading: 'Завантаження...',
    notEnoughData: 'Недостатньо даних',
    noData: 'Немає даних для “{category}”.',
    goToDashboard: 'Перейдіть на інформаційну панель'
  },
  chartActions: {
    viewFullscreen: 'Переглянути на весь екран',
    exitFullscreen: 'Вийти з повноекранного режиму',
    copyChart: 'Копіювати діаграму',
    exportChart: 'Діаграма експорту',
    exportDefault: '⬇ Експорт',
    exportExcel: '📊 Експорт Excel',
    exportCsv: '📄 Експорт CSV',
    exportPdf: '📑 Експорт PDF',
    exportHtml: '🌐 Експорт HTML',
    copied: 'Діаграму скопійовано в буфер обміну',
    copyFailed: 'Не вдалося копіювати — буфер обміну недоступний',
    saveCancelled: 'Збереження скасовано'
  },
  resume: {
    continueLastSession: 'Продовжити з останнього сеансу?',
    welcomeBack: 'Ласкаво просимо назад!',
    historicalBody:
      'Ваші відповіді з останнього завершеного сеансу попередньо завантажено. Хочете зберегти ці значення як відправну точку чи почати з абсолютно порожньої анкети?',
    activeBody:
      'У вас триває сесія. Хочете продовжити з того місця, де зупинилися, чи почати нове оцінювання?',
    clearWarning: '⚠️ Це видалить усі поточні відповіді. Ви впевнені?',
    yesStartFresh: 'Так, почати заново',
    cancel: 'Скасувати',
    keepLastValues: 'Зберігайте останні цінності',
    resumeSession: 'Відновити сеанс',
    startFresh: 'Почати заново'
  },
  questionItem: {
    pointsSuffix: 'очки',
    low: 'Низький',
    high: 'Високий',
    rateAria: 'Оцінити {question}'
  },
  dateRange: {
    rangeLabel: 'діапазон:',
    startDate: 'Дата початку',
    endDate: 'Кінцева дата',
    presets: {
      '7d': '7 днів',
      '30d': '30 днів',
      '90d': '90 днів',
      '1y': '1 рік',
      all: 'Весь час',
      custom: 'Custom'
    }
  },
  update: {
    availableTitle: 'v{version} доступний!',
    releaseNotesFallback: 'Відвідайте сторінку випуску, щоб завантажити останню версію.',
    getUpdate: 'Отримати оновлення',
    dismiss: 'Відхилити'
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

export default uk;

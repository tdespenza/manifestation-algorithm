/**
 * Auto-converted locale module for ru.
 */
import type { Messages } from './en';

const ru: Messages = {
  nav: {
    questionnaire: 'Анкета',
    history: 'История',
    settings: 'Настройки'
  },
  app: {
    name: 'Алгоритм проявления',
    unexpectedError: 'Произошла непредвиденная ошибка.'
  },
  home: {
    subtitle: 'Оцените каждую сферу своей жизни — узнайте свой показатель мировоззрения'
  },
  dashboard: {
    title: 'История отслеживания алгоритма проявления',
    subtitle: 'Отслеживайте свой прогресс с течением времени',
    loading: 'Загрузка истории…',
    noData: 'Нет данных за этот период',
    progressTrend: 'Тенденция прогресса',
    progressToGoal: 'Прогресс к цели',
    ofGoal: '{pct}% от цели',
    goalReached: '🎯 Цель достигнута!',
    categoryBreakdown: 'Разбивка по категориям',
    noSessionsRange: 'Нет сеансов в этом диапазоне',
    tryWiderRange: 'Попробуйте более широкий диапазон или выберите другой период.',
    noSessionsYet: 'Сеансов пока нет',
    completeFirst: 'Пройдите первое тестирование, чтобы увидеть свой прогресс и тенденции здесь.',
    startFirst: 'Начать первую оценку',
    export: {
      date: 'Дата',
      time: 'Время',
      totalScore: 'Общий балл',
      duration: 'Продолжительность (мин)',
      notes: 'Примечания'
    }
  },
  stats: {
    averageScore: 'Средний балл',
    medianScore: 'Средний балл',
    highestScore: 'Наивысший балл',
    totalSessions: 'Всего сеансов'
  },
  network: {
    rankings: 'Сетевые рейтинги',
    searchingPeers: 'Ищу сверстников...',
    searching: 'Поиск...',
    online: 'Онлайн',
    peers: '{count} коллеги',
    results: '{count} результаты',
    avgShort: 'Среднее',
    p90Short: 'Р90',
    averageScoreTitle: 'Средний балл',
    percentile90Title: '90-й процентиль',
    globalAverage: 'Глобальный средний показатель',
    percentile90: '90-й процентиль',
    manifestations: 'Проявления',
    activePeers: 'Активные коллеги',
    categoryRankings: 'Рейтинг категорий'
  },
  focusAreas: {
    title: 'Направления деятельности',
    subtitle:
      'Ваши 3 категории с наименьшим количеством баллов — улучшение их приведет к наибольшему успеху.',
    empty:
      'Завершите больше сеансов, чтобы увидеть персональные рекомендации по основным направлениям.'
  },
  sessions: {
    recent: 'Недавние сессии',
    deselectAll: 'Отменить выбор всех',
    selectAll: 'Выбрать все',
    deleteCount: 'Удалить {count}',
    cancel: 'Отмена',
    select: 'Выбрать',
    deleting: 'Удаление…'
  },
  settings: {
    title: 'Настройки приложения',
    close: 'Закрыть настройки',
    dataManagement: 'Управление данными',
    saveLastSession: 'Сохранить последний сеанс',
    saveLastSessionDesc:
      'Предварительно заполните ответы из вашего последнего завершенного сеанса.',
    resetProgress: 'Сбросить прогресс',
    resetProgressDesc: 'Удалите все сохраненные ответы и начните заново.',
    goals: 'Цели',
    targetScore: 'Целевой балл',
    targetScoreDesc:
      'Установите целевой балл (1 000–10 000), чтобы отслеживать свой прогресс на информационной панели.',
    set: 'Установить',
    clearGoal: 'Очистить',
    currentTarget: 'Текущая цель:',
    on: 'Вкл.',
    off: 'Выкл.',
    version: 'Алгоритм проявления {version}',
    clearAllAnswers: 'Очистить все ответы',
    clearConfirmTitle: 'Очистить все ответы',
    clearConfirmMessage:
      'Это приведет к безвозвратному удалению всех ваших текущих ответов, и это действие нельзя будет отменить.',
    clearConfirmLabel: 'Очистить',
    keepAnswers: 'Сохраняйте ответы',
    language: 'Язык',
    languageDesc: 'Выберите язык интерфейса приложения.',
    languageCount: 'Доступны {count} языки',
    goalErrorRange: 'Пожалуйста, введите оценку от 1000 до 10000.'
  },
  questionnaire: {
    saving: 'Сохранение...',
    saved: 'Сохранено',
    progressText: '{pct}% выполнено ({answered}/{total})',
    progressAria: 'Ход завершения оценки',
    maxScore: 'Макс: {score}',
    answerToScore: 'Ответ на оценку',
    currentScore: 'Текущий счет',
    scrollAll: 'Прокрутить все',
    stepByStep: 'Шаг за шагом',
    questionOf: 'Вопрос {current} от {total}',
    previous: '← Предыдущий',
    next: 'Далее →',
    completeAssessment: 'Полная оценка',
    startFresh: 'Хотите начать все сначала?',
    resetAllAnswers: 'Сбросить все ответы',
    resetTitle: 'Сбросить все ответы?',
    resetMessage: 'Это очистит все ответы и начнет с нуля. Это невозможно отменить.',
    resetLabel: 'Сброс',
    scoreQuality: {
      notStarted: 'Не запущено',
      manifesting: 'Проявление ❆',
      aligned: 'Выровнено',
      building: 'Здание',
      startingOut: 'Начало'
    },
    submitHint: {
      zero: 'На 0 из вопросов {total} отвечено — количество оставшихся без ответа вопросов по умолчанию минимальное',
      partial:
        '{remaining} осталось вопросов — количество вопросов без ответов по умолчанию минимальное | Осталось {remaining} вопросов — количество вопросов без ответов по умолчанию сведено к минимуму',
      complete: 'Ответы на все вопросы — готов к отправке!'
    },
    submitTitle: {
      zero: 'Ответьте на несколько вопросов, чтобы завершить оценку',
      partial: '{remaining} остался вопрос | {remaining} остались вопросы',
      complete: 'Отправьте заполненную оценку'
    },
    submitError: 'Не удалось сохранить сеанс: {error}.',
    dotTitle: 'Вопрос {index}',
    dotAria: 'Перейти к вопросу {index}',
    keyboardHint: 'Совет: используйте ← → для навигации · 1–9 / 0 для оценки.'
  },
  onboarding: {
    step0Title: 'Добро пожаловать в Алгоритм Манифестации',
    step0Body1:
      'Этот инструмент поможет вам оценить, насколько ваше мышление, привычки и ежедневные действия соответствуют достижению ваших целей. Честно ответьте на каждый вопрос, чтобы получить текущий результат.',
    step0Body2:
      'Заполняйте анкету через регулярные промежутки времени, чтобы отслеживать свой рост с течением времени и видеть, какие области требуют наибольшего внимания.',
    step1Title: 'Как работает подсчет очков',
    step1Body:
      'Каждый вопрос приносит определенное количество баллов. Оцените себя по шкале от 1 до 10 за каждый вопрос. Оценка 10 означает, что вы полностью воплощаете этот принцип; 1 означает, что вы еще не начали.',
    step1TargetHint: '🎯 Цель: {target} | Максимум: {maximum}',
    excellent: 'Отлично',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Сильная согласованность — продолжайте идти',
    good: 'Хорошо',
    goodRange: '4001 – 7000',
    goodNote: 'Прочный фундамент — есть куда расти',
    needsWork: 'Нужна работа',
    needsWorkRange: '0–4000',
    needsWorkNote: 'Сначала сосредоточьтесь на основах',
    step2Title: 'Ваши данные остаются конфиденциальными',
    step2Body1:
      'Все ваши ответы и история оценок хранятся локально на вашем устройстве с использованием зашифрованной базы данных SQLite. Ничто не отправляется на какой-либо сервер без вашего явного разрешения.',
    step2Body2:
      'Дополнительная функция однорангового обмена позволяет вам видеть анонимные совокупные оценки других пользователей. Он предоставляет только краткое описание с криптографической подписью, а не ваши индивидуальные ответы.',
    readyText: 'Готовый? Давайте получим ваш базовый балл.',
    skipIntro: 'Пропустить вступление',
    next: 'Далее',
    getStarted: 'Начать'
  },
  sharing: {
    title: 'Анонимный доступ к сети',
    privacyFirst: '🔒 Конфиденциальность прежде всего',
    description:
      'При желании анонимно разместите свои результаты в глобальной сети. Никакое имя, адрес электронной почты, IP-адрес или идентификатор устройства никогда не передаются.',
    enabled: 'Совместное использование включено — вклад в сеть',
    disabled: 'Общий доступ отключен (по умолчанию)',
    activeBadge: '✓ Ваши анонимные оценки передаются коллегам',
    enableNote:
      'Включите, чтобы увидеть свой процентильный рейтинг по сравнению с глобальной сетью.'
  },
  category: {
    back: '‹ Назад',
    history: 'История',
    date: 'Дата',
    score: 'Оценка',
    loading: 'Загрузка...',
    notEnoughData: 'Недостаточно данных',
    noData: 'Данные для «{category}» не найдены.',
    goToDashboard: 'Перейти на панель управления'
  },
  chartActions: {
    viewFullscreen: 'Посмотреть в полноэкранном режиме',
    exitFullscreen: 'Выйти из полноэкранного режима',
    copyChart: 'Копировать диаграмму',
    exportChart: 'Экспорт диаграммы',
    exportDefault: '⬇ Экспорт',
    exportExcel: '📊 Экспорт Excel',
    exportCsv: '📄 Экспорт CSV',
    exportPdf: '📑 Экспорт PDF',
    exportHtml: '🌐 Экспорт HTML',
    copied: 'Диаграмма скопирована в буфер обмена',
    copyFailed: 'Не удалось скопировать — буфер обмена недоступен',
    saveCancelled: 'Сохранение отменено'
  },
  resume: {
    continueLastSession: 'Продолжить с последнего сеанса?',
    welcomeBack: 'Добро пожаловать!',
    historicalBody:
      'Ваши ответы из вашего последнего завершенного сеанса были предварительно загружены. Хотели бы вы оставить эти значения в качестве отправной точки или начать с совершенно пустой анкеты?',
    activeBody:
      'У вас идет сеанс. Хотите продолжить с того места, где остановились, или начать новую оценку?',
    clearWarning: '⚠️ Это очистит все текущие ответы. Вы уверены?',
    yesStartFresh: 'Да, начни заново',
    cancel: 'Отмена',
    keepLastValues: 'Сохраняйте последние значения',
    resumeSession: 'Возобновить сеанс',
    startFresh: 'Начать заново'
  },
  questionItem: {
    pointsSuffix: 'баллы',
    low: 'Низкий',
    high: 'Высокий',
    rateAria: 'Оцените {question}'
  },
  dateRange: {
    rangeLabel: 'Диапазон:',
    startDate: 'Дата начала',
    endDate: 'Дата окончания',
    presets: {
      '7d': '7 дней',
      '30d': '30 дней',
      '90d': '90 дней',
      '1y': '1 год',
      all: 'Все время',
      custom: 'Пользовательский'
    }
  },
  update: {
    availableTitle: 'v{version} доступен!',
    releaseNotesFallback: 'Посетите страницу выпуска, чтобы загрузить последнюю версию.',
    getUpdate: 'Получить обновление',
    dismiss: 'Уволить'
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

export default ru;

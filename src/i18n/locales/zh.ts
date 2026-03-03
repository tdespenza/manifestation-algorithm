/**
 * Auto-converted locale module for zh.
 */
import type { Messages } from './en';

const zh: Messages = {
  nav: {
    questionnaire: '问卷调查',
    history: '历史',
    settings: '设置'
  },
  app: {
    name: '表现算法',
    unexpectedError: '发生意外错误。'
  },
  home: {
    subtitle: '评估你生活的每个领域——发现你的一致性分数'
  },
  dashboard: {
    title: '表现算法跟踪历史',
    subtitle: '跟踪一段时间内的进展',
    loading: '正在加载您的历史记录...',
    noData: '此期间没有数据',
    progressTrend: '进展趋势',
    progressToGoal: '目标进展',
    ofGoal: '目标的{pct}%',
    goalReached: '🎯目标达成！',
    categoryBreakdown: '类别细分',
    noSessionsRange: '此范围内没有会话',
    tryWiderRange: '尝试更大的范围或选择不同的时间段。',
    noSessionsYet: '还没有会议',
    completeFirst: '在这里完成您的第一次评估以查看您的进展和趋势。',
    startFirst: '开始第一次评估',
    export: {
      date: '日期',
      time: '时间',
      totalScore: '总分',
      duration: '持续时间（分钟）',
      notes: '注释'
    }
  },
  stats: {
    averageScore: '平均分',
    medianScore: '中位数分数',
    highestScore: '最高分',
    totalSessions: '总会话数'
  },
  network: {
    rankings: '网络排名',
    searchingPeers: '寻找同行...',
    searching: '正在寻找...',
    online: '在线',
    peers: '{count} 同行',
    results: '{count} 结果',
    avgShort: '平均',
    p90Short: 'P90',
    averageScoreTitle: '平均分',
    percentile90Title: '第 90 个百分位',
    globalAverage: '全球平均水平',
    percentile90: '第 90 个百分位',
    manifestations: '表现形式',
    activePeers: '活跃的同行',
    categoryRankings: '类别排名'
  },
  focusAreas: {
    title: '重点领域',
    subtitle: '得分最低的 3 个类别 — 改进这些类别可带来最大的收益。',
    empty: '完成更多课程以查看个性化重点领域建议。'
  },
  sessions: {
    recent: '最近的会议',
    deselectAll: '取消全选',
    selectAll: '选择全部',
    deleteCount: '删除{count}',
    cancel: '取消',
    select: '选择',
    deleting: '正在删除...'
  },
  settings: {
    title: '应用程序设置',
    close: '关闭设置',
    dataManagement: '数据管理',
    saveLastSession: '保存上次会话',
    saveLastSessionDesc: '预先填写您最近完成的会话中的答案。',
    resetProgress: '重置进度',
    resetProgressDesc: '删除所有已保存的答案并重新开始。',
    goals: '目标',
    targetScore: '目标分数',
    targetScoreDesc: '设置目标分数 (1,000–10,000) 以在仪表板上跟踪您的进度。',
    set: '套装',
    clearGoal: '清除',
    currentTarget: '当前目标：',
    on: '开',
    off: '关闭',
    version: '表现算法{version}',
    clearAllAnswers: '清除所有答案',
    clearConfirmTitle: '清除所有答案',
    clearConfirmMessage: '这将永久删除您当前的所有答案并且无法撤消。',
    clearConfirmLabel: '清除',
    keepAnswers: '保留答案',
    language: '语言',
    languageDesc: '选择应用程序的显示语言。',
    languageCount: '{count} 可用语言',
    goalErrorRange: '请输入 1,000 到 10,000 之间的分数。'
  },
  questionnaire: {
    saving: '正在保存...',
    saved: '已保存',
    progressText: '{pct}% 已完成 ({answered}/{total})',
    progressAria: '评估完成进度',
    maxScore: '最大值：{score}',
    answerToScore: '回答得分',
    currentScore: '当前分数',
    scrollAll: '滚动全部',
    stepByStep: '一步一步',
    questionOf: '{total} 的问题{current}',
    previous: '← 上一页',
    next: '下一页 →',
    completeAssessment: '完整评估',
    startFresh: '想重新开始吗？',
    resetAllAnswers: '重置所有答案',
    resetTitle: '重置所有答案？',
    resetMessage: '这将清除所有答案并从头开始。此操作无法撤消。',
    resetLabel: '重置',
    scoreQuality: {
      notStarted: '未开始',
      manifesting: '表现❆',
      aligned: '对齐',
      building: '建筑',
      startingOut: '开始'
    },
    submitHint: {
      zero: '已回答 0 个 {total} 问题 — 未回答的问题默认为最低数量',
      partial:
        '{remaining} 剩余问题 — 未回答的问题默认为最少 | {remaining} 剩余问题 — 未回答的问题默认为最少',
      complete: '所有问题均得到解答 - 准备提交！'
    },
    submitTitle: {
      zero: '回答一些问题以完成您的评估',
      partial: '{remaining} 剩余问题 | {remaining} 剩余问题',
      complete: '提交您完成的评估'
    },
    submitError: '无法保存会话：{error}',
    dotTitle: '问题{index}',
    dotAria: '转到问题{index}',
    keyboardHint: '提示：使用 ← → 进行导航 · 1–9 / 0 进行评分'
  },
  onboarding: {
    step0Title: '欢迎使用表现算法',
    step0Body1:
      '该工具可帮助您衡量您的心态、习惯和日常行动与实现目标的一致性。诚实地回答每个问题以获得您当前的分数。',
    step0Body2: '定期完成调查问卷，以跟踪您随着时间的推移的成长，并了解哪些领域最需要关注。',
    step1Title: '评分如何运作',
    step1Body:
      '每个问题都有一定的分数。对于每个问题，请按照 1 到 10 的等级对自己进行评分。 10 分意味着您充分体现了这一原则； 1表示你还没有开始。',
    step1TargetHint: '🎯 目标：{target} |最大值：{maximum}',
    excellent: '优秀',
    excellentRange: '7,001 – 10,000',
    excellentNote: '强一致性——继续前进',
    good: '好',
    goodRange: '4,001 – 7,000',
    goodNote: '基础扎实——成长空间',
    needsWork: '需要工作',
    needsWorkRange: '0 – 4,000',
    needsWorkNote: '首先关注基础知识',
    step2Title: '您的数据保持私密',
    step2Body1:
      '您的所有答案和分数历史记录都使用加密的 SQLite 数据库本地存储在您的设备上。未经您的明确许可，不会将任何内容发送到任何服务器。',
    step2Body2:
      '可选的点对点共享功能可让您查看其他用户的匿名总分。它仅共享经过加密签名的摘要，而不共享您的个人答案。',
    readyText: '准备好？让我们得到你的基线分数。',
    skipIntro: '跳过简介',
    next: '下一步',
    getStarted: '开始使用'
  },
  sharing: {
    title: '匿名网络共享',
    privacyFirst: '🔒 隐私第一',
    description:
      '您可以选择将您的结果匿名贡献给全球网络。姓名、电子邮件、IP 地址或设备 ID 不会被共享。',
    enabled: '启用共享——为网络做出贡献',
    disabled: '禁用共享（默认）',
    activeBadge: '✓ 您的匿名分数正在与同行分享',
    enableNote: '能够查看您与全球网络相比的百分位排名。'
  },
  category: {
    back: '← 返回',
    history: '历史',
    date: '日期',
    score: '分数',
    loading: '正在加载...',
    notEnoughData: '数据不足',
    noData: '找不到“{category}”的数据。',
    goToDashboard: '转到仪表板'
  },
  chartActions: {
    viewFullscreen: '全屏查看',
    exitFullscreen: '退出全屏',
    copyChart: '复制图表',
    exportChart: '导出图表',
    exportDefault: '⬇ 出口',
    exportExcel: '📊 导出Excel',
    exportCsv: '📄 导出 CSV',
    exportPdf: '📑 导出 PDF',
    exportHtml: '🌐 导出 HTML',
    copied: '图表已复制到剪贴板',
    copyFailed: '复制失败 — 剪贴板不可用',
    saveCancelled: '保存已取消'
  },
  resume: {
    continueLastSession: '继续上一届会议吗？',
    welcomeBack: '欢迎回来！',
    historicalBody:
      '您上次完成的会话的答案已预先加载。您想保留这些价值观作为起点，还是从完全空白的调查问卷开始？',
    activeBody: '您正在进行一个会话。您想从上次中断的地方继续，还是开始新的评估？',
    clearWarning: '⚠️这将清除所有当前答案。你确定吗？',
    yesStartFresh: '是的，重新开始',
    cancel: '取消',
    keepLastValues: '保留最后的值',
    resumeSession: '恢复会话',
    startFresh: '重新开始'
  },
  questionItem: {
    pointsSuffix: '分',
    low: '低',
    high: '高',
    rateAria: '评价{question}'
  },
  dateRange: {
    rangeLabel: '范围：',
    startDate: '开始日期',
    endDate: '结束日期',
    presets: {
      '7d': '7天',
      '30d': '30天',
      '90d': '90 天',
      '1y': '1年',
      all: '所有时间',
      custom: '定制'
    }
  },
  update: {
    availableTitle: 'v{version} 可用！',
    releaseNotesFallback: '访问发布页面下载最新版本。',
    getUpdate: '获取更新',
    dismiss: '解雇'
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

export default zh;

/**
 * Auto-converted locale module for vi.
 */
import type { Messages } from './en';

const vi: Messages = {
  nav: {
    questionnaire: 'Bảng câu hỏi',
    history: 'Lịch sử',
    settings: 'Cài đặt'
  },
  app: {
    name: 'Thuật toán biểu hiện',
    unexpectedError: 'Đã xảy ra lỗi không mong muốn.'
  },
  home: {
    subtitle: 'Đánh giá từng lĩnh vực trong cuộc sống của bạn - khám phá điểm phù hợp của bạn'
  },
  dashboard: {
    title: 'Lịch sử theo dõi thuật toán biểu hiện',
    subtitle: 'Theo dõi tiến trình của bạn theo thời gian',
    loading: 'Đang tải lịch sử của bạn…',
    noData: 'Không có dữ liệu cho giai đoạn này',
    progressTrend: 'Xu hướng tiến bộ',
    progressToGoal: 'Tiến tới mục tiêu',
    ofGoal: '{pct}% mục tiêu',
    goalReached: '🎯 Đã đạt được mục tiêu!',
    categoryBreakdown: 'Phân tích danh mục',
    noSessionsRange: 'Không có phiên nào trong phạm vi này',
    tryWiderRange: 'Hãy thử phạm vi rộng hơn hoặc chọn một khoảng thời gian khác.',
    noSessionsYet: 'Chưa có phiên nào',
    completeFirst:
      'Hoàn thành đánh giá đầu tiên của bạn để xem tiến độ và xu hướng của bạn tại đây.',
    startFirst: 'Bắt đầu đánh giá đầu tiên',
    export: {
      date: 'Ngày',
      time: 'thời gian',
      totalScore: 'Tổng số điểm',
      duration: 'Thời lượng (phút)',
      notes: 'Ghi chú'
    }
  },
  stats: {
    averageScore: 'Điểm trung bình',
    medianScore: 'Điểm trung bình',
    highestScore: 'Điểm cao nhất',
    totalSessions: 'Tổng số phiên'
  },
  network: {
    rankings: 'Xếp hạng mạng',
    searchingPeers: 'Đang tìm kiếm đồng đội...',
    searching: 'Đang tìm kiếm...',
    online: 'trực tuyến',
    peers: '{count} đồng nghiệp',
    results: '{count} kết quả',
    avgShort: 'Trung bình',
    p90Short: 'P90',
    averageScoreTitle: 'Điểm trung bình',
    percentile90Title: 'Phần trăm thứ 90',
    globalAverage: 'Trung bình toàn cầu',
    percentile90: 'Phần trăm thứ 90',
    manifestations: 'Biểu hiện',
    activePeers: 'Đồng nghiệp đang hoạt động',
    categoryRankings: 'Xếp hạng danh mục'
  },
  focusAreas: {
    title: 'Lĩnh vực trọng tâm',
    subtitle:
      '3 hạng mục có điểm thấp nhất của bạn — việc cải thiện những hạng mục này sẽ mang lại lợi ích lớn nhất.',
    empty: 'Hoàn thành nhiều phiên hơn để xem các đề xuất về lĩnh vực trọng tâm được cá nhân hóa.'
  },
  sessions: {
    recent: 'Phiên gần đây',
    deselectAll: 'Bỏ chọn tất cả',
    selectAll: 'Chọn tất cả',
    deleteCount: 'Xóa {count}',
    cancel: 'Hủy bỏ',
    select: 'chọn',
    deleting: 'Đang xóa…'
  },
  settings: {
    title: 'Cài đặt ứng dụng',
    close: 'Đóng cài đặt',
    dataManagement: 'Quản lý dữ liệu',
    saveLastSession: 'Lưu phiên cuối cùng',
    saveLastSessionDesc: 'Điền trước câu trả lời từ phiên hoàn thành gần đây nhất của bạn.',
    resetProgress: 'Đặt lại tiến độ',
    resetProgressDesc: 'Xóa tất cả các câu trả lời đã lưu và bắt đầu lại.',
    goals: 'Bàn thắng',
    targetScore: 'Điểm mục tiêu',
    targetScoreDesc:
      'Đặt điểm mục tiêu (1.000–10.000) để theo dõi tiến trình của bạn trên trang tổng quan.',
    set: 'Đặt',
    clearGoal: 'Xóa',
    currentTarget: 'Mục tiêu hiện tại:',
    on: 'Bật',
    off: 'Tắt',
    version: 'Thuật toán biểu hiện {version}',
    clearAllAnswers: 'Xóa tất cả câu trả lời',
    clearConfirmTitle: 'Xóa tất cả câu trả lời',
    clearConfirmMessage:
      'Thao tác này sẽ xóa vĩnh viễn tất cả các câu trả lời hiện tại của bạn và không thể hoàn tác được.',
    clearConfirmLabel: 'Xóa',
    keepAnswers: 'Giữ câu trả lời',
    language: 'Ngôn ngữ',
    languageDesc: 'Chọn ngôn ngữ hiển thị cho ứng dụng.',
    languageCount: '{count} ngôn ngữ có sẵn',
    goalErrorRange: 'Vui lòng nhập số điểm từ 1.000 đến 10.000.'
  },
  questionnaire: {
    saving: 'Đang lưu...',
    saved: 'Đã lưu',
    progressText: '{pct}% hoàn thành ({answered}/{total})',
    progressAria: 'Tiến độ hoàn thành đánh giá',
    maxScore: 'Tối đa: {score}',
    answerToScore: 'Trả lời để ghi điểm',
    currentScore: 'Điểm hiện tại',
    scrollAll: 'Cuộn tất cả',
    stepByStep: 'Từng bước một',
    questionOf: 'Câu hỏi {current} của {total}',
    previous: '← Trước đó',
    next: 'Tiếp theo →',
    completeAssessment: 'Đánh giá hoàn chỉnh',
    startFresh: 'Bạn muốn bắt đầu mới?',
    resetAllAnswers: 'Đặt lại tất cả câu trả lời',
    resetTitle: 'Đặt lại tất cả câu trả lời?',
    resetMessage:
      'Điều này sẽ xóa mọi câu trả lời và bắt đầu lại từ đầu. Điều này không thể hoàn tác được.',
    resetLabel: 'Đặt lại',
    scoreQuality: {
      notStarted: 'Chưa bắt đầu',
      manifesting: 'Biểu Hiện ❆',
      aligned: 'Căn chỉnh',
      building: 'tòa nhà',
      startingOut: 'Bắt đầu'
    },
    submitHint: {
      zero: '0 trong số {total} câu hỏi đã được trả lời — các câu hỏi chưa được trả lời được mặc định ở mức tối thiểu',
      partial:
        '{remaining} câu hỏi còn lại — các câu hỏi chưa được trả lời được mặc định ở mức tối thiểu | {remaining} câu hỏi còn lại — mặc định các câu hỏi chưa được trả lời ở mức tối thiểu',
      complete: 'Tất cả các câu hỏi đã được trả lời - sẵn sàng gửi!'
    },
    submitTitle: {
      zero: 'Trả lời một số câu hỏi để hoàn thành đánh giá của bạn',
      partial: '{remaining} câu hỏi còn lại | {remaining} câu hỏi còn lại',
      complete: 'Gửi bản đánh giá đã hoàn thành của bạn'
    },
    submitError: 'Không lưu được phiên: {error}',
    dotTitle: 'Câu hỏi {index}',
    dotAria: 'Đi tới câu hỏi {index}',
    keyboardHint: 'Mẹo: Sử dụng ← → để điều hướng · 1–9 / 0 để xếp hạng'
  },
  onboarding: {
    step0Title: 'Chào mừng đến với Thuật toán biểu hiện',
    step0Body1:
      'Công cụ này giúp bạn đo lường mức độ phù hợp giữa suy nghĩ, thói quen và hành động hàng ngày của bạn với việc đạt được mục tiêu. Trả lời từng câu hỏi một cách trung thực để có được số điểm hiện tại của bạn.',
    step0Body2:
      'Hoàn thành bảng câu hỏi đều đặn để theo dõi sự phát triển của bạn theo thời gian và xem lĩnh vực nào cần được chú ý nhất.',
    step1Title: 'Cách tính điểm hoạt động',
    step1Body:
      'Mỗi câu hỏi có giá trị bằng một số điểm nhất định. Hãy tự đánh giá bản thân theo thang điểm từ 1–10 cho mọi câu hỏi. Xếp hạng 10 có nghĩa là bạn thể hiện đầy đủ nguyên tắc đó; 1 có nghĩa là bạn chưa bắt đầu.',
    step1TargetHint: '🎯 Mục tiêu: {target} | Tối đa: {maximum}',
    excellent: 'Tuyệt vời',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Liên kết chặt chẽ - tiếp tục',
    good: 'Tốt',
    goodRange: '4.001 – 7.000',
    goodNote: 'Nền tảng vững chắc - có cơ hội phát triển',
    needsWork: 'Cần việc làm',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Tập trung vào những điều cơ bản trước tiên',
    step2Title: 'Dữ liệu của bạn được giữ kín',
    step2Body1:
      'Tất cả câu trả lời và lịch sử điểm số của bạn được lưu trữ cục bộ trên thiết bị của bạn bằng cơ sở dữ liệu SQLite được mã hóa. Không có gì được gửi đến bất kỳ máy chủ nào mà không có sự cho phép rõ ràng của bạn.',
    step2Body2:
      'Tính năng chia sẻ ngang hàng tùy chọn cho phép bạn xem điểm tổng hợp ẩn danh từ những người dùng khác. Nó chỉ chia sẻ một bản tóm tắt được ký bằng mật mã — không bao giờ chia sẻ câu trả lời của riêng bạn.',
    readyText: 'Sẵn sàng? Hãy lấy điểm cơ bản của bạn.',
    skipIntro: 'Bỏ qua phần giới thiệu',
    next: 'Tiếp theo',
    getStarted: 'Bắt đầu'
  },
  sharing: {
    title: 'Chia sẻ mạng ẩn danh',
    privacyFirst: '🔒 Quyền riêng tư là trên hết',
    description:
      'Tùy chọn đóng góp kết quả của bạn một cách ẩn danh vào mạng lưới toàn cầu. Không có tên, email, địa chỉ IP hoặc ID thiết bị nào được chia sẻ.',
    enabled: 'Đã bật chia sẻ - đóng góp vào mạng',
    disabled: 'Chia sẻ bị tắt (mặc định)',
    activeBadge: '✓ Điểm ẩn danh của bạn đang được chia sẻ với các đồng nghiệp',
    enableNote: 'Cho phép xem thứ hạng phần trăm của bạn so với mạng toàn cầu.'
  },
  category: {
    back: '‹ Quay lại',
    history: 'Lịch sử',
    date: 'Ngày',
    score: 'Điểm',
    loading: 'Đang tải...',
    notEnoughData: 'Không đủ dữ liệu',
    noData: 'Không tìm thấy dữ liệu nào cho “{category}”.',
    goToDashboard: 'Đi tới Trang tổng quan'
  },
  chartActions: {
    viewFullscreen: 'Xem toàn màn hình',
    exitFullscreen: 'Thoát toàn màn hình',
    copyChart: 'Sao chép biểu đồ',
    exportChart: 'Xuất biểu đồ',
    exportDefault: '⬇ Xuất khẩu',
    exportExcel: '📊 Xuất Excel',
    exportCsv: '📄 Xuất CSV',
    exportPdf: '📑 Xuất PDF',
    exportHtml: '🌐 Xuất HTML',
    copied: 'Đã sao chép biểu đồ vào bảng nhớ tạm',
    copyFailed: 'Sao chép không thành công - không có clipboard',
    saveCancelled: 'Đã hủy lưu'
  },
  resume: {
    continueLastSession: 'Tiếp tục từ Phiên trước?',
    welcomeBack: 'Chào mừng trở lại!',
    historicalBody:
      'Câu trả lời của bạn từ phiên hoàn thành gần đây nhất đã được tải sẵn. Bạn muốn giữ lại những giá trị đó làm điểm bắt đầu hay bắt đầu bằng một bảng câu hỏi hoàn toàn trống?',
    activeBody:
      'Bạn có một phiên đang diễn ra. Bạn muốn tiếp tục từ nơi bạn đã dừng lại hay bắt đầu một đánh giá mới?',
    clearWarning: '⚠️ Thao tác này sẽ xóa tất cả các câu trả lời hiện tại. Bạn có chắc không?',
    yesStartFresh: 'Có, hãy bắt đầu mới',
    cancel: 'Hủy bỏ',
    keepLastValues: 'Giữ giá trị cuối cùng',
    resumeSession: 'Tiếp tục phiên',
    startFresh: 'Bắt đầu mới'
  },
  questionItem: {
    pointsSuffix: 'điểm',
    low: 'Thấp',
    high: 'Cao',
    rateAria: 'Đánh giá {question}'
  },
  dateRange: {
    rangeLabel: 'Phạm vi:',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    presets: {
      '7d': '7 ngày',
      '30d': '30 ngày',
      '90d': '90 ngày',
      '1y': '1 năm',
      all: 'mọi lúc',
      custom: 'tùy chỉnh'
    }
  },
  update: {
    availableTitle: 'v{version} có sẵn!',
    releaseNotesFallback: 'Truy cập trang phát hành để tải xuống phiên bản mới nhất.',
    getUpdate: 'Nhận cập nhật',
    dismiss: 'Loại bỏ'
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

export default vi;

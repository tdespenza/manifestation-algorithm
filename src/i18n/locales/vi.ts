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
    '1': 'Nắm vững kiến thức cơ bản',
    '2': 'Kích hoạt và chiếu sáng các từ',
    '3': 'Tìm Đau & Năng lượng Hợp đồng',
    '4': 'Xác định những gì bạn muốn',
    '5': 'Viết ra những gì bạn muốn',
    '6': 'Đừng chia sẻ giấc mơ của bạn với người khác',
    '7': 'Có được khát vọng cháy bỏng cho mục tiêu của bạn',
    '8': 'Mục tiêu phải ở Sweet Spot',
    '9': 'Đưa ra quyết định',
    '10': 'Xem/Cảm thấy hài lòng khi sở hữu mục tiêu của bạn',
    '11': 'Giải phóng sự gắn bó với kết quả',
    '12': 'Cho phép CÁCH tự trình bày',
    '13': 'Biết sự khác biệt giữa Dream & Chief Aim',
    '14': 'Tập trung / Mục đích duy nhất',
    '15': 'Danh sách các ưu tiên VIỆC CẦN làm hàng ngày',
    '16': 'Tiến trình biểu đồ / Biết điểm số',
    '17': 'Sử dụng chu kỳ động lượng thành công',
    '18': 'Xây dựng ước mơ - Dream Book & Vision Board',
    '19': 'Cắm vào hệ thống',
    '20': 'Khóa học Khoa học về Làm chủ Cá nhân',
    '21': 'Quan sát những từ bạn nói - những gì bạn nói là những gì bạn nhận được',
    '22': 'Sinh lý học / Trang phục để thành công',
    '23': 'Rõ ràng ý định phản đối',
    '24': 'Đánh thức sức mạnh bên trong của bạn: Quá trình siêu năng lực',
    '25': 'Phát sóng trên sóng não Alpha-theta',
    '26': 'Ngừng kể câu chuyện khốn khổ của bạn',
    '27': 'Thể hiện sự đánh giá cao / lòng biết ơn',
    '28': 'Thay thế thói quen thất bại với thói quen thành công (Quy trình gia tốc)',
    '29': 'Tạo một Mastermind',
    '30': 'Xem những người thành công/người học việc',
    '31': 'Nghe/Đọc câu chuyện thành công',
    '32': 'Cho đi những gì bạn muốn trước',
    '33': 'Làm ngay bây giờ Tâm lý',
    '34': 'Chăm sóc cơ thể của bạn',
    '35': 'Tìm vàng trong nghịch cảnh',
    '36': 'Xóa Samskara khỏi Sân',
    '37': 'Chịu trách nhiệm 100%',
    '38': 'Máy phát điện trường thu hút',
    '39': 'Tham gia Câu lạc bộ kết nối bạn với Nguồn điện',
    '40': 'Sống cuộc sống với ý định có chủ ý - ở trong thời điểm hiện tại',
    '1a': 'Bạn lắng nghe ai?',
    '1b': 'Chỉ số khả năng dạy',
    '1c': 'Cân tập luyện',
    '1d': 'Năng lực vô thức',
    '19a': 'Đọc sách',
    '19b': 'Nghe âm thanh',
    '19c': 'Tham dự sự kiện (hàng tháng)',
    '19d': 'Cho và nhận Công nhận / Quy tắc vàng mở rộng',
    '19e': 'Phát triển mối quan hệ với những người cùng chí hướng',
    '23a': 'Quy trình tiền tệ',
    '23b': 'Quy trình quan hệ',
    '23c': 'Quy trình lãnh đạo',
    '23d': 'Quy trình giao tiếp',
    '23e': 'Quy trình y tế',
    '23f': 'Quá trình nhận thức tâm linh',
    '23g': 'Quy trình giấc mơ',
    '23h': 'Quy trình tổ chức và tập trung'
  }
};

export default vi;

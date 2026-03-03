/**
 * Auto-converted locale module for ko.
 */
import type { Messages } from './en';

const ko: Messages = {
  nav: {
    questionnaire: '설문지',
    history: '역사',
    settings: '설정'
  },
  app: {
    name: '발현 알고리즘',
    unexpectedError: '예상치 못한 오류가 발생했습니다.'
  },
  home: {
    subtitle: '삶의 각 영역을 평가하고 정렬 점수를 알아보세요.'
  },
  dashboard: {
    title: '발현 알고리즘 추적 기록',
    subtitle: '시간 경과에 따른 진행 상황을 추적하세요',
    loading: '기록 로드 중…',
    noData: '이 기간에 대한 데이터가 없습니다.',
    progressTrend: '진행 추세',
    progressToGoal: '목표를 향한 진행',
    ofGoal: '목표의 {pct}%',
    goalReached: '🎯 목표 달성!',
    categoryBreakdown: '카테고리 분류',
    noSessionsRange: '이 범위에는 세션이 없습니다.',
    tryWiderRange: '더 넓은 범위를 시도하거나 다른 기간을 선택하세요.',
    noSessionsYet: '아직 세션이 없습니다.',
    completeFirst: '여기에서 진행 상황과 추세를 확인하려면 첫 번째 평가를 완료하세요.',
    startFirst: '첫 번째 평가 시작',
    export: {
      date: '날짜',
      time: '시간',
      totalScore: '총점',
      duration: '기간(분)',
      notes: '메모'
    }
  },
  stats: {
    averageScore: '평균 점수',
    medianScore: '중앙값 점수',
    highestScore: '최고 점수',
    totalSessions: '총 세션'
  },
  network: {
    rankings: '네트워크 순위',
    searchingPeers: '동료를 찾는 중...',
    searching: '검색 중...',
    online: '온라인',
    peers: '{count} 동료',
    results: '{count} 결과',
    avgShort: '평균',
    p90Short: 'P90',
    averageScoreTitle: '평균 점수',
    percentile90Title: '90번째 백분위수',
    globalAverage: '글로벌 평균',
    percentile90: '90번째 백분위수',
    manifestations: '발현',
    activePeers: '활성 피어',
    categoryRankings: '카테고리 순위'
  },
  focusAreas: {
    title: '중점 분야',
    subtitle: '가장 낮은 점수를 받은 3개 카테고리 - 이를 개선하면 가장 큰 이득을 얻을 수 있습니다.',
    empty: '더 많은 세션을 완료하여 맞춤형 중점 영역 권장 사항을 확인하세요.'
  },
  sessions: {
    recent: '최근 세션',
    deselectAll: '모두 선택 해제',
    selectAll: '모두 선택',
    deleteCount: '{count} 삭제',
    cancel: '취소',
    select: '선택',
    deleting: '삭제 중…'
  },
  settings: {
    title: '앱 설정',
    close: '설정 닫기',
    dataManagement: '데이터 관리',
    saveLastSession: '마지막 세션 저장',
    saveLastSessionDesc: '가장 최근에 완료된 세션의 답변을 미리 입력하세요.',
    resetProgress: '진행 상황 재설정',
    resetProgressDesc: '저장된 답변을 모두 삭제하고 새로 시작하세요.',
    goals: '목표',
    targetScore: '목표점수',
    targetScoreDesc: '대시보드에서 진행 상황을 추적하려면 목표 점수(1,000~10,000)를 설정하세요.',
    set: '세트',
    clearGoal: '지우기',
    currentTarget: '현재 목표:',
    on: '켜기',
    off: '끄기',
    version: '발현 알고리즘 {version}',
    clearAllAnswers: '모든 답변 지우기',
    clearConfirmTitle: '모든 답변 지우기',
    clearConfirmMessage: '현재 답변이 모두 영구적으로 삭제되며 취소할 수 없습니다.',
    clearConfirmLabel: '지우기',
    keepAnswers: '답변 유지',
    language: '언어',
    languageDesc: '애플리케이션의 표시 언어를 선택합니다.',
    languageCount: '{count} 언어 사용 가능',
    goalErrorRange: '1,000~10,000 사이의 점수를 입력하세요.'
  },
  questionnaire: {
    saving: '저장 중...',
    saved: '저장됨',
    progressText: '{pct}% 완료({answered}/{total})',
    progressAria: '평가 완료 진행 상황',
    maxScore: '최대: {score}',
    answerToScore: '점수에 대한 답변',
    currentScore: '현재 점수',
    scrollAll: '모두 스크롤',
    stepByStep: '단계별',
    questionOf: '{total}의 질문 {current}',
    previous: '← 이전',
    next: '다음 →',
    completeAssessment: '완전한 평가',
    startFresh: '새롭게 시작하고 싶나요?',
    resetAllAnswers: '모든 답변 재설정',
    resetTitle: '모든 답변을 재설정하시겠습니까?',
    resetMessage:
      '이렇게 하면 모든 답변이 지워지고 처음부터 시작됩니다. 이 작업은 취소할 수 없습니다.',
    resetLabel: '재설정',
    scoreQuality: {
      notStarted: '시작되지 않음',
      manifesting: '발현 ❆',
      aligned: '정렬됨',
      building: '건물',
      startingOut: '시작하다'
    },
    submitHint: {
      zero: '{total} 질문 중 0개 답변됨 — 답변되지 않은 질문은 기본적으로 최소값으로 설정됩니다.',
      partial:
        '{remaining} 질문 남음 — 답변되지 않은 질문은 기본적으로 최소값 | {remaining} 질문 남음 — 답변되지 않은 질문은 기본적으로 최소로 설정됩니다.',
      complete: '모든 질문에 대한 답변이 완료되었습니다. 제출할 준비가 되었습니다!'
    },
    submitTitle: {
      zero: '평가를 완료하려면 몇 가지 질문에 답하세요.',
      partial: '{remaining} 남은 질문 | {remaining} 질문 남음',
      complete: '완료된 평가 제출'
    },
    submitError: '세션을 저장하지 못했습니다: {error}',
    dotTitle: '질문 {index}',
    dotAria: '질문 {index}으로 이동',
    keyboardHint: '팁: 탐색하려면 ← →를 사용하세요. · 평가하려면 1–9 / 0을 사용하세요.'
  },
  onboarding: {
    step0Title: '구현 알고리즘에 오신 것을 환영합니다.',
    step0Body1:
      '이 도구는 귀하의 사고방식, 습관, 일상 행동이 목표 달성에 얼마나 부합하는지 측정하는 데 도움이 됩니다. 현재 점수를 얻으려면 각 질문에 솔직하게 대답하세요.',
    step0Body2:
      '정기적으로 설문지를 작성하여 시간 경과에 따른 성장을 추적하고 가장 주의가 필요한 영역을 확인하세요.',
    step1Title: '채점 방식',
    step1Body:
      '각 질문은 정해진 점수만큼 가치가 있습니다. 모든 질문에 대해 1~10점 척도로 자신을 평가하세요. 10점은 해당 원칙을 완전히 구현했다는 의미입니다. 1은 시작하지 않았음을 의미합니다.',
    step1TargetHint: '🎯 대상 : {target} | 최대: {maximum}',
    excellent: '우수',
    excellentRange: '7,001 – 10,000',
    excellentNote: '강력한 정렬 — 계속 진행',
    good: '좋음',
    goodRange: '4,001 – 7,000',
    goodNote: '탄탄한 기반 - 성장의 여지',
    needsWork: '일이 필요하다',
    needsWorkRange: '0 – 4,000',
    needsWorkNote: '기본에 먼저 집중하라',
    step2Title: '귀하의 데이터는 비공개로 유지됩니다',
    step2Body1:
      '모든 답변과 점수 기록은 암호화된 SQLite 데이터베이스를 사용하여 장치에 로컬로 저장됩니다. 귀하의 명시적인 허가 없이는 아무 것도 서버로 전송되지 않습니다.',
    step2Body2:
      '선택적 P2P 공유 기능을 사용하면 다른 사용자의 익명 집계 점수를 볼 수 있습니다. 암호화로 서명된 요약만 공유하며 귀하의 개별 답변은 공유하지 않습니다.',
    readyText: '준비가 된? 기본 점수를 구해 봅시다.',
    skipIntro: '소개 건너뛰기',
    next: '다음',
    getStarted: '시작하기'
  },
  sharing: {
    title: '익명 네트워크 공유',
    privacyFirst: '🔒 개인정보 보호 우선',
    description:
      '선택적으로 결과를 익명으로 글로벌 네트워크에 제공할 수 있습니다. 이름, 이메일, IP 주소 또는 장치 ID는 공유되지 않습니다.',
    enabled: '공유 활성화 — 네트워크에 기여',
    disabled: '공유 비활성화됨(기본값)',
    activeBadge: '✓ 익명화된 점수가 동료들과 공유됩니다.',
    enableNote: '글로벌 네트워크와 비교하여 백분위 순위를 확인할 수 있습니다.'
  },
  category: {
    back: 'XX 뒤로',
    history: '역사',
    date: '날짜',
    score: '점수',
    loading: '로드 중...',
    notEnoughData: '데이터가 충분하지 않습니다.',
    noData: "'{category}'에 대한 데이터를 찾을 수 없습니다.",
    goToDashboard: '대시보드로 이동'
  },
  chartActions: {
    viewFullscreen: '전체 화면 보기',
    exitFullscreen: '전체 화면 종료',
    copyChart: '차트 복사',
    exportChart: '차트 내보내기',
    exportDefault: '⬇ 내보내기',
    exportExcel: '📊 엑셀 내보내기',
    exportCsv: '📄 CSV 내보내기',
    exportPdf: '📑 PDF 내보내기',
    exportHtml: '🌐 HTML 내보내기',
    copied: '차트가 클립보드에 복사되었습니다.',
    copyFailed: '복사 실패 - 클립보드를 사용할 수 없음',
    saveCancelled: '저장이 취소되었습니다.'
  },
  resume: {
    continueLastSession: '마지막 세션에서 계속하시겠습니까?',
    welcomeBack: '돌아온 것을 환영합니다!',
    historicalBody:
      '마지막으로 완료된 세션의 답변이 미리 로드되어 있습니다. 해당 값을 출발점으로 유지하시겠습니까, 아니면 완전히 빈 설문지부터 시작하시겠습니까?',
    activeBody:
      '진행 중인 세션이 있습니다. 중단한 부분부터 다시 시작하시겠습니까, 아니면 새로운 평가를 시작하시겠습니까?',
    clearWarning: '⚠️ 현재 답변이 모두 삭제됩니다. 확실합니까?',
    yesStartFresh: '응, 새로 시작하자',
    cancel: '취소',
    keepLastValues: '마지막 값 유지',
    resumeSession: '세션 재개',
    startFresh: '새로 시작하다'
  },
  questionItem: {
    pointsSuffix: '포인트',
    low: '낮음',
    high: '높음',
    rateAria: '평가 {question}'
  },
  dateRange: {
    rangeLabel: '범위:',
    startDate: '시작일',
    endDate: '종료일',
    presets: {
      '7d': '7일',
      '30d': '30일',
      '90d': '90일',
      '1y': '1년',
      all: '모든 시간',
      custom: '맞춤'
    }
  },
  update: {
    availableTitle: 'v{version} 사용 가능합니다!',
    releaseNotesFallback: '최신 버전을 다운로드하려면 릴리스 페이지를 방문하세요.',
    getUpdate: '업데이트 받기',
    dismiss: '닫기'
  },
  questions: {
    '1': '기본기를 마스터하세요',
    '2': '단어 활성화 및 조명',
    '3': '고통과 수축 에너지 찾기',
    '4': '원하는 것을 정의하세요',
    '5': '원하는 것을 적어보세요',
    '6': '다른 사람과 꿈을 공유하지 마세요',
    '7': '목표에 대한 불타는 열망을 가지세요',
    '8': '골은 반드시 적정 지점이어야 합니다',
    '9': '결정을 내리세요',
    '10': '목표를 달성하고 있다는 느낌을 받으세요',
    '11': '결과에 대한 집착을 놓아줘',
    '12': '어떻게 해야 할지 스스로 드러나게 하세요',
    '13': '드림과 치프 에임의 차이를 알아두세요',
    '14': '집중하세요 / 목적의 단일함',
    '15': '일일 할 일 우선순위 목록',
    '16': '차트 진행 / 노우 더 스코어',
    '17': '성공의 모멘텀 사이클을 사용하세요',
    '18': '드림 빌드 - 드림 북 및 비전 보드',
    '19': '시스템에 연결하기',
    '20': '개인 숙련 과학 과정',
    '21': '말하는 말을 조심하세요 - 말하는 것이 전부입니다',
    '22': '성공을 위한 생리학 / 복장',
    '23': '명확한 반대 의도',
    '24': '내면의 힘을 깨우세요: 초능력 과정',
    '25': '알파쎄타 뇌파에 방송됨',
    '26': '네 고통 이야기 그만해',
    '27': '감사 / 감사를 표현하세요',
    '28': '실패 습관을 성공 습관으로 대체하세요 (가속기 과정)',
    '29': '마스터마인드 생성',
    '30': '성공한 사람들/견습생 영상 보기',
    '31': '성공 사례를 듣거나 읽기',
    '32': '먼저 원하는 걸 나눠줘',
    '33': '지금 당장 하라(Do It It Mindality)',
    '34': '몸을 잘 돌보세요',
    '35': '역경 속에서 금을 찾아라',
    '36': '필드에서 정체를 명확히 다룬다',
    '37': '100% 책임을 져라.',
    '38': '어트랙터 필드 생성기',
    '39': '동력원과 연결된 동아리에 가입하세요',
    '40': '의도적으로 인생을 살아 - 현재에 집중하세요',
    '1a': '누구의 말을 듣나요?',
    '1b': '강의 가능성 지수',
    '1c': '훈련 균형 척도',
    '1d': '무의식적 능력',
    '19a': '책 읽기',
    '19b': '오디오 듣기',
    '19c': '행사 참석 (월간)',
    '19d': '인정을 주고 받다 / 확장된 황금률',
    '19e': '비슷한 생각을 가진 사람들과 관계를 발전시키세요',
    '23a': '화폐 과정',
    '23b': '관계 과정',
    '23c': '리더십 프로세스',
    '23d': '커뮤니케이션 프로세스',
    '23e': '건강 과정',
    '23f': '영적 인식 과정',
    '23g': '드림 프로세스',
    '23h': '조직 및 집중 프로세스'
  }
};

export default ko;

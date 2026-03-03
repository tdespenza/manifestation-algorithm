/**
 * Auto-converted locale module for he.
 */
import type { Messages } from './en';

const he: Messages = {
  nav: {
    questionnaire: 'שאלון',
    history: 'היסטוריה',
    settings: 'הגדרות'
  },
  app: {
    name: 'אלגוריתם גילוי',
    unexpectedError: 'אירעה שגיאה בלתי צפויה.'
  },
  home: {
    subtitle: 'דרג כל תחום בחייך - גלה את ציון היישור שלך'
  },
  dashboard: {
    title: 'היסטוריית מעקב אלגוריתם גילוי',
    subtitle: 'עקוב אחר ההתקדמות שלך לאורך זמן',
    loading: 'טוען את ההיסטוריה שלך...',
    noData: 'אין נתונים לתקופה זו',
    progressTrend: 'מגמת התקדמות',
    progressToGoal: 'התקדמות למטרה',
    ofGoal: '{pct}% מהיעד',
    goalReached: '🎯 המטרה הושגה!',
    categoryBreakdown: 'פירוט קטגוריות',
    noSessionsRange: 'אין הפעלות בטווח הזה',
    tryWiderRange: 'נסה מגוון רחב יותר או בחר תקופה אחרת.',
    noSessionsYet: 'עדיין אין הפעלות',
    completeFirst: 'השלם את ההערכה הראשונה שלך כדי לראות את ההתקדמות והמגמות שלך כאן.',
    startFirst: 'התחל הערכה ראשונה',
    export: {
      date: 'תאריך',
      time: 'זמן',
      totalScore: 'ציון כולל',
      duration: 'משך זמן (דקות)',
      notes: 'הערות'
    }
  },
  stats: {
    averageScore: 'ציון ממוצע',
    medianScore: 'ציון חציוני',
    highestScore: 'הציון הגבוה ביותר',
    totalSessions: 'סך כל הפעלות'
  },
  network: {
    rankings: 'דירוגי רשת',
    searchingPeers: 'מחפש עמיתים...',
    searching: 'מחפש...',
    online: 'באינטרנט',
    peers: '{count} עמיתים',
    results: 'תוצאות {count}',
    avgShort: 'ממוצע',
    p90Short: 'P90',
    averageScoreTitle: 'ציון ממוצע',
    percentile90Title: 'אחוז 90',
    globalAverage: 'ממוצע גלובלי',
    percentile90: 'אחוז 90',
    manifestations: 'גילויים',
    activePeers: 'עמיתים פעילים',
    categoryRankings: 'דירוגי קטגוריות'
  },
  focusAreas: {
    title: 'אזורי מיקוד',
    subtitle: '3 הקטגוריות עם הניקוד הנמוך ביותר שלך - שיפור אלה מניב את הרווחים הגדולים ביותר.',
    empty: 'השלם מפגשים נוספים כדי לראות המלצות מותאמות אישית על אזורי מיקוד.'
  },
  sessions: {
    recent: 'הפעלות אחרונות',
    deselectAll: 'בטל את הבחירה בהכל',
    selectAll: 'בחר הכל',
    deleteCount: 'מחק {count}',
    cancel: 'בטל',
    select: 'בחר',
    deleting: 'מוחק...'
  },
  settings: {
    title: 'הגדרות אפליקציה',
    close: 'סגור הגדרות',
    dataManagement: 'ניהול נתונים',
    saveLastSession: 'שמור את הפגישה האחרונה',
    saveLastSessionDesc: 'מלא מראש את התשובות מהמפגש האחרון שהשלמת.',
    resetProgress: 'אפס התקדמות',
    resetProgressDesc: 'מחק את כל התשובות השמורות והתחיל מחדש.',
    goals: 'מטרות',
    targetScore: 'ציון יעד',
    targetScoreDesc: 'הגדר ציון יעד (1,000–10,000) כדי לעקוב אחר ההתקדמות שלך בלוח המחוונים.',
    set: 'סט',
    clearGoal: 'ברור',
    currentTarget: 'יעד נוכחי:',
    on: 'פועל',
    off: 'כבוי',
    version: 'אלגוריתם ביטוי {version}',
    clearAllAnswers: 'נקה את כל התשובות',
    clearConfirmTitle: 'נקה את כל התשובות',
    clearConfirmMessage: 'פעולה זו תמחק לצמיתות את כל התשובות הנוכחיות שלך ולא ניתן לבטל אותה.',
    clearConfirmLabel: 'ברור',
    keepAnswers: 'שמור תשובות',
    language: 'שפה',
    languageDesc: 'בחר את שפת התצוגה עבור היישום.',
    languageCount: 'זמינות שפות {count}',
    goalErrorRange: 'נא להזין ציון בין 1,000 ל-10,000.'
  },
  questionnaire: {
    saving: 'שומר...',
    saved: 'נשמר',
    progressText: '{pct}% הושלם ({answered}/{total})',
    progressAria: 'התקדמות השלמת הערכה',
    maxScore: 'מקסימום: {score}',
    answerToScore: 'תשובה לציון',
    currentScore: 'ציון נוכחי',
    scrollAll: 'גלול הכל',
    stepByStep: 'צעד אחר צעד',
    questionOf: 'שאלה {current} של {total}',
    previous: '← הקודם',
    next: 'הבא →',
    completeAssessment: 'הערכה מלאה',
    startFresh: 'רוצה להתחיל מחדש?',
    resetAllAnswers: 'אפס את כל התשובות',
    resetTitle: 'לאפס את כל התשובות?',
    resetMessage: 'זה ימחק כל תשובה ויתחיל מאפס. לא ניתן לבטל זאת.',
    resetLabel: 'אפס',
    scoreQuality: {
      notStarted: 'לא התחיל',
      manifesting: 'מפגין ❆',
      aligned: 'מיושר',
      building: 'בניין',
      startingOut: 'מתחילים'
    },
    submitHint: {
      zero: '0 מתוך {total} שאלות נענו — שאלות ללא מענה ברירת המחדל למינימום',
      partial:
        '{remaining} נותרה שאלה — שאלות ללא מענה ברירת המחדל למינימום | {remaining} נותרו שאלות — שאלות ללא מענה ברירת המחדל למינימום',
      complete: 'כל השאלות נענו - מוכן להגשה!'
    },
    submitTitle: {
      zero: 'ענה על כמה שאלות כדי להשלים את ההערכה שלך',
      partial: '{remaining} נותרה שאלה | {remaining} נותרו שאלות',
      complete: 'שלח את ההערכה המלאה שלך'
    },
    submitError: 'שמירת ההפעלה נכשלה: {error}',
    dotTitle: 'שאלה {index}',
    dotAria: 'עבור לשאלה {index}',
    keyboardHint: 'טיפ: השתמש ב-← → כדי לנווט · 1–9 / 0 כדי לדרג'
  },
  onboarding: {
    step0Title: 'ברוכים הבאים לאלגוריתם הגילוי',
    step0Body1:
      'כלי זה עוזר לך למדוד את מידת התאמת הלך הרוח, ההרגלים והפעולות היומיומיות שלך עם השגת היעדים שלך. ענה על כל שאלה בכנות כדי לקבל את הציון הנוכחי שלך.',
    step0Body2:
      'מלא את השאלון במרווחי זמן קבועים כדי לעקוב אחר הצמיחה שלך לאורך זמן ולראות אילו אזורים זקוקים להכי הרבה תשומת לב.',
    step1Title: 'איך עובד הניקוד',
    step1Body:
      'כל שאלה שווה מספר מוגדר של נקודות. דרג את עצמך בסולם של 1-10 לכל שאלה. דירוג של 10 אומר שאתה מגלם את העיקרון הזה במלואו; 1 אומר שלא התחלת.',
    step1TargetHint: '🎯 יעד: {target} | מקסימום: {maximum}',
    excellent: 'מצוין',
    excellentRange: '7,001 - 10,000',
    excellentNote: 'יישור חזק - המשך כך',
    good: 'טוב',
    goodRange: '4,001 - 7,000',
    goodNote: 'בסיס מוצק - מקום לגדול',
    needsWork: 'צריך עבודה',
    needsWorkRange: '0 - 4,000',
    needsWorkNote: 'התמקד קודם כל ביסודות',
    step2Title: 'הנתונים שלך נשארים פרטיים',
    step2Body1:
      'כל התשובות והיסטוריית הציונים שלך מאוחסנים באופן מקומי במכשיר שלך באמצעות מסד נתונים מוצפן של SQLite. שום דבר לא נשלח לשום שרת ללא רשותך המפורשת.',
    step2Body2:
      'תכונת שיתוף עמית לעמית האופציונלית מאפשרת לך לראות ציונים מצטברים אנונימיים ממשתמשים אחרים. הוא חולק רק סיכום חתום קריפטוגרפית - אף פעם לא התשובות האישיות שלך.',
    readyText: 'מוּכָן? בואו לקבל את הציון הבסיסי שלכם.',
    skipIntro: 'דלג על הקדמה',
    next: 'הבא',
    getStarted: 'התחל'
  },
  sharing: {
    title: 'שיתוף רשת אנונימי',
    privacyFirst: '🔒 פרטיות-קודם כל',
    description:
      'אפשר לתרום את התוצאות שלך באופן אנונימי לרשת הגלובלית. אף שם, אימייל, כתובת IP או מזהה מכשיר לא משותפים.',
    enabled: 'שיתוף מופעל - תורם לרשת',
    disabled: 'השיתוף מושבת (ברירת מחדל)',
    activeBadge: '✓ הציונים האנונימיים שלך משותפים עם עמיתים',
    enableNote: 'אפשר לראות את דירוג האחוזון שלך בהשוואה לרשת הגלובלית.'
  },
  category: {
    back: '‹ חזרה',
    history: 'היסטוריה',
    date: 'תאריך',
    score: 'ציון',
    loading: 'טוען...',
    notEnoughData: 'אין מספיק נתונים',
    noData: 'לא נמצאו נתונים עבור "{category}".',
    goToDashboard: 'עבור אל לוח המחוונים'
  },
  chartActions: {
    viewFullscreen: 'צפה במסך מלא',
    exitFullscreen: 'צא ממסך מלא',
    copyChart: 'העתק תרשים',
    exportChart: 'ייצוא תרשים',
    exportDefault: '⬇ ייצוא',
    exportExcel: '📊 ייצוא אקסל',
    exportCsv: '📄 ייצוא CSV',
    exportPdf: '📑 ייצוא PDF',
    exportHtml: '🌐 ייצוא HTML',
    copied: 'התרשים הועתק ללוח',
    copyFailed: 'ההעתקה נכשלה - הלוח לא זמין',
    saveCancelled: 'השמירה בוטלה'
  },
  resume: {
    continueLastSession: 'להמשיך מהמפגש האחרון?',
    welcomeBack: 'ברוך הבא בחזרה!',
    historicalBody:
      'התשובות שלך מהמפגש האחרון שהושלם הוטענו מראש. האם תרצה לשמור על ערכים אלה כנקודת התחלה, או להתחיל בשאלון ריק לחלוטין?',
    activeBody: 'יש לך מפגש בעיצומו. האם תרצה להמשיך מאיפה שהפסקת, או להתחיל הערכה חדשה?',
    clearWarning: '⚠️ פעולה זו תנקה את כל התשובות הנוכחיות. אתה בטוח?',
    yesStartFresh: 'כן, התחל טרי',
    cancel: 'בטל',
    keepLastValues: 'שמור על ערכים אחרונים',
    resumeSession: 'המשך סשן',
    startFresh: 'התחל טרי'
  },
  questionItem: {
    pointsSuffix: 'נקודות',
    low: 'נמוך',
    high: 'גבוה',
    rateAria: 'דרג {question}'
  },
  dateRange: {
    rangeLabel: 'טווח:',
    startDate: 'תאריך התחלה',
    endDate: 'תאריך סיום',
    presets: {
      '7d': '7 ימים',
      '30d': '30 ימים',
      '90d': '90 ימים',
      '1y': '1 שנה',
      all: 'כל הזמן',
      custom: 'מותאם אישית'
    }
  },
  update: {
    availableTitle: 'v{version} זמין!',
    releaseNotesFallback: 'בקר בדף ההפצה כדי להוריד את הגרסה העדכנית ביותר.',
    getUpdate: 'קבל עדכון',
    dismiss: 'לבטל'
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

export default he;

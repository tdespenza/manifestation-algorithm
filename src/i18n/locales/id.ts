/**
 * Auto-converted locale module for id.
 */
import type { Messages } from './en';

const id: Messages = {
  nav: {
    questionnaire: 'Kuesioner',
    history: 'Sejarah',
    settings: 'Pengaturan'
  },
  app: {
    name: 'Algoritma Manifestasi',
    unexpectedError: 'Terjadi kesalahan yang tidak terduga.'
  },
  home: {
    subtitle: 'Nilai setiap bidang kehidupan Anda — temukan skor keselarasan Anda'
  },
  dashboard: {
    title: 'Riwayat Pelacakan Algoritma Manifestasi',
    subtitle: 'Lacak kemajuan Anda dari waktu ke waktu',
    loading: 'Memuat riwayat Anda…',
    noData: 'Tidak ada data untuk periode ini',
    progressTrend: 'Tren Kemajuan',
    progressToGoal: 'Kemajuan menuju Tujuan',
    ofGoal: '{pct}% dari sasaran',
    goalReached: '🎯 Sasaran Tercapai!',
    categoryBreakdown: 'Perincian Kategori',
    noSessionsRange: 'Tidak ada sesi dalam rentang ini',
    tryWiderRange: 'Coba rentang yang lebih luas atau pilih periode yang berbeda.',
    noSessionsYet: 'Belum ada sesi',
    completeFirst:
      'Selesaikan penilaian pertama Anda untuk melihat kemajuan dan tren Anda di sini.',
    startFirst: 'Mulai Penilaian Pertama',
    export: {
      date: 'Tanggal',
      time: 'Waktu',
      totalScore: 'Skor Total',
      duration: 'Durasi (menit)',
      notes: 'Catatan'
    }
  },
  stats: {
    averageScore: 'Skor Rata-Rata',
    medianScore: 'Skor Median',
    highestScore: 'Skor Tertinggi',
    totalSessions: 'Jumlah Sesi'
  },
  network: {
    rankings: 'Peringkat Jaringan',
    searchingPeers: 'Mencari rekan...',
    searching: 'Mencari...',
    online: 'Daring',
    peers: '{count} rekan-rekan',
    results: '{count} hasil',
    avgShort: 'Rata-rata',
    p90Short: 'Hlm.90',
    averageScoreTitle: 'Skor Rata-Rata',
    percentile90Title: 'Persentil ke-90',
    globalAverage: 'Rata-rata Global',
    percentile90: 'Persentil ke-90',
    manifestations: 'Manifestasi',
    activePeers: 'Rekan Aktif',
    categoryRankings: 'Peringkat Kategori'
  },
  focusAreas: {
    title: 'Area Fokus',
    subtitle:
      '3 kategori dengan skor terendah — meningkatkan kategori ini akan menghasilkan keuntungan terbesar.',
    empty: 'Selesaikan lebih banyak sesi untuk melihat rekomendasi area fokus yang dipersonalisasi.'
  },
  sessions: {
    recent: 'Sesi Terbaru',
    deselectAll: 'Batalkan pilihan Semua',
    selectAll: 'Pilih Semua',
    deleteCount: 'Hapus {count}',
    cancel: 'Batalkan',
    select: 'Pilih',
    deleting: 'Menghapus…'
  },
  settings: {
    title: 'Pengaturan Aplikasi',
    close: 'Tutup pengaturan',
    dataManagement: 'Manajemen Data',
    saveLastSession: 'Simpan Sesi Terakhir',
    saveLastSessionDesc: 'Isi terlebih dahulu jawaban dari sesi terakhir yang Anda selesaikan.',
    resetProgress: 'Atur Ulang Kemajuan',
    resetProgressDesc: 'Hapus semua jawaban yang disimpan dan mulai dari awal.',
    goals: 'Tujuan',
    targetScore: 'Skor Sasaran',
    targetScoreDesc: 'Tetapkan skor sasaran (1.000–10.000) untuk melacak kemajuan Anda di dasbor.',
    set: 'Tetapkan',
    clearGoal: 'Jelas',
    currentTarget: 'Target saat ini:',
    on: 'Aktif',
    off: 'Mati',
    version: 'Algoritma Manifestasi {version}',
    clearAllAnswers: 'Hapus Semua Jawaban',
    clearConfirmTitle: 'Hapus Semua Jawaban',
    clearConfirmMessage:
      'Tindakan ini akan menghapus secara permanen semua jawaban Anda saat ini dan tidak dapat dibatalkan.',
    clearConfirmLabel: 'Jelas',
    keepAnswers: 'Simpan Jawaban',
    language: 'Bahasa',
    languageDesc: 'Pilih bahasa tampilan untuk aplikasi.',
    languageCount: '{count} bahasa tersedia',
    goalErrorRange: 'Silakan masukkan skor antara 1.000 dan 10.000.'
  },
  questionnaire: {
    saving: 'Menyimpan...',
    saved: 'Disimpan',
    progressText: '{pct}% selesai ({answered}/{total})',
    progressAria: 'Kemajuan penyelesaian penilaian',
    maxScore: 'Maks: {score}',
    answerToScore: 'Jawaban untuk mencetak gol',
    currentScore: 'Skor Saat Ini',
    scrollAll: 'Gulir Semua',
    stepByStep: 'Langkah demi Langkah',
    questionOf: 'Pertanyaan {current} dari {total}',
    previous: '← Sebelumnya',
    next: 'Selanjutnya →',
    completeAssessment: 'Penilaian Lengkap',
    startFresh: 'Ingin memulai dari awal?',
    resetAllAnswers: 'Atur ulang semua jawaban',
    resetTitle: 'Atur Ulang Semua Jawaban?',
    resetMessage:
      'Ini akan menghapus setiap jawaban dan memulai dari awal. Hal ini tidak dapat dibatalkan.',
    resetLabel: 'Setel ulang',
    scoreQuality: {
      notStarted: 'Belum Dimulai',
      manifesting: 'Mewujudkan ❆',
      aligned: 'Selaras',
      building: 'Bangunan',
      startingOut: 'Memulai'
    },
    submitHint: {
      zero: '0 dari {total} pertanyaan terjawab — pertanyaan yang belum terjawab defaultnya adalah minimum',
      partial:
        '{remaining} sisa pertanyaan — pertanyaan yang belum terjawab default ke minimum | {remaining} sisa pertanyaan — pertanyaan yang belum terjawab defaultnya adalah minimum',
      complete: 'Semua pertanyaan terjawab — siap dikirimkan!'
    },
    submitTitle: {
      zero: 'Jawab beberapa pertanyaan untuk menyelesaikan penilaian Anda',
      partial: '{remaining} sisa pertanyaan | {remaining} pertanyaan tersisa',
      complete: 'Kirimkan penilaian Anda yang telah selesai'
    },
    submitError: 'Gagal menyimpan sesi: {error}',
    dotTitle: 'Pertanyaan {index}',
    dotAria: 'Buka pertanyaan {index}',
    keyboardHint: 'Tip: Gunakan ← → untuk menavigasi · 1–9 / 0 untuk memberi peringkat'
  },
  onboarding: {
    step0Title: 'Selamat datang di Algoritma Manifestasi',
    step0Body1:
      'Alat ini membantu Anda mengukur seberapa selaras pola pikir, kebiasaan, dan tindakan sehari-hari Anda dengan pencapaian tujuan Anda. Jawablah setiap pertanyaan dengan jujur ​​untuk mendapatkan skor Anda saat ini.',
    step0Body2:
      'Lengkapi kuesioner secara berkala untuk melacak pertumbuhan Anda dari waktu ke waktu dan melihat area mana yang paling membutuhkan perhatian.',
    step1Title: 'Cara Kerja Penilaian',
    step1Body:
      'Setiap pertanyaan bernilai sejumlah poin tertentu. Nilai diri Anda pada skala 1–10 untuk setiap pertanyaan. Peringkat 10 berarti Anda sepenuhnya mewujudkan prinsip tersebut; 1 berarti Anda belum memulai.',
    step1TargetHint: '🎯 Sasaran: {target} | Maksimum: {maximum}',
    excellent: 'Luar biasa',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Keselarasan yang kuat — teruskan',
    good: 'Bagus',
    goodRange: '4.001 – 7.000',
    goodNote: 'Fondasi yang kokoh — ruang untuk berkembang',
    needsWork: 'Butuh Pekerjaan',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Fokus pada fundamental terlebih dahulu',
    step2Title: 'Data Anda Tetap Pribadi',
    step2Body1:
      'Semua jawaban dan riwayat skor Anda disimpan secara lokal di perangkat Anda menggunakan database SQLite terenkripsi. Tidak ada yang dikirim ke server mana pun tanpa izin tertulis Anda.',
    step2Body2:
      'Fitur berbagi peer-to-peer opsional memungkinkan Anda melihat skor agregat anonim dari pengguna lain. Itu hanya membagikan ringkasan yang ditandatangani secara kriptografis — tidak pernah memberikan jawaban individual Anda.',
    readyText: 'Siap? Mari kita dapatkan skor dasar Anda.',
    skipIntro: 'Lewati intro',
    next: 'Selanjutnya',
    getStarted: 'Memulai'
  },
  sharing: {
    title: 'Berbagi Jaringan Anonim',
    privacyFirst: '🔒 Privasi-Utamakan',
    description:
      'Secara opsional, kontribusikan hasil Anda secara anonim ke jaringan global. Tidak ada nama, email, alamat IP, atau ID perangkat yang pernah dibagikan.',
    enabled: 'Berbagi diaktifkan — berkontribusi ke jaringan',
    disabled: 'Berbagi dinonaktifkan (default)',
    activeBadge: '✓ Skor anonim Anda dibagikan kepada rekan-rekan',
    enableNote:
      'Aktifkan untuk melihat peringkat persentil Anda dibandingkan dengan jaringan global.'
  },
  category: {
    back: '‹ Kembali',
    history: 'Sejarah',
    date: 'Tanggal',
    score: 'Skor',
    loading: 'Memuat...',
    notEnoughData: 'Datanya tidak cukup',
    noData: 'Tidak ada data yang ditemukan untuk “{category}”.',
    goToDashboard: 'Buka Dasbor'
  },
  chartActions: {
    viewFullscreen: 'Lihat layar penuh',
    exitFullscreen: 'Keluar dari layar penuh',
    copyChart: 'Salin Bagan',
    exportChart: 'Ekspor bagan',
    exportDefault: '⬇ Ekspor',
    exportExcel: '📊 Ekspor Excel',
    exportCsv: '📄 Ekspor CSV',
    exportPdf: '📑 Ekspor PDF',
    exportHtml: '🌐 Ekspor HTML',
    copied: 'Bagan disalin ke papan klip',
    copyFailed: 'Penyalinan gagal — papan klip tidak tersedia',
    saveCancelled: 'Simpan dibatalkan'
  },
  resume: {
    continueLastSession: 'Lanjutan dari Sesi Terakhir?',
    welcomeBack: 'Selamat Datang kembali!',
    historicalBody:
      'Jawaban Anda dari sesi terakhir yang Anda selesaikan telah dimuat sebelumnya. Apakah Anda ingin mempertahankan nilai-nilai tersebut sebagai titik awal, atau memulai dengan kuesioner kosong?',
    activeBody:
      'Anda memiliki sesi yang sedang berlangsung. Apakah Anda ingin melanjutkan dari bagian terakhir yang Anda tinggalkan, atau memulai penilaian baru?',
    clearWarning: '⚠️ Ini akan menghapus semua jawaban saat ini. Apa kamu yakin?',
    yesStartFresh: 'Ya, Mulailah dari Awal',
    cancel: 'Batalkan',
    keepLastValues: 'Pertahankan Nilai Terakhir',
    resumeSession: 'Lanjutkan Sesi',
    startFresh: 'Mulai Baru'
  },
  questionItem: {
    pointsSuffix: 'poin',
    low: 'Rendah',
    high: 'Tinggi',
    rateAria: 'Nilai {question}'
  },
  dateRange: {
    rangeLabel: 'Rentang:',
    startDate: 'Tanggal mulai',
    endDate: 'Tanggal akhir',
    presets: {
      '7d': '7 hari',
      '30d': '30 Hari',
      '90d': '90 Hari',
      '1y': '1 Tahun',
      all: 'Sepanjang Waktu',
      custom: 'Adat'
    }
  },
  update: {
    availableTitle: 'v{version} tersedia!',
    releaseNotesFallback: 'Kunjungi halaman rilis untuk mengunduh versi terbaru.',
    getUpdate: 'Dapatkan Pembaruan',
    dismiss: 'Singkirkan'
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

export default id;

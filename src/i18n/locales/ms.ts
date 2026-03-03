/**
 * Auto-converted locale module for ms.
 */
import type { Messages } from './en';

const ms: Messages = {
  nav: {
    questionnaire: 'soal selidik',
    history: 'Sejarah',
    settings: 'tetapan'
  },
  app: {
    name: 'Algoritma Manifestasi',
    unexpectedError: 'Ralat yang tidak dijangka berlaku.'
  },
  home: {
    subtitle: 'Nilaikan setiap bidang kehidupan anda — temui skor penjajaran anda'
  },
  dashboard: {
    title: 'Sejarah Penjejakan Algoritma Manifestasi',
    subtitle: 'Jejaki kemajuan anda dari semasa ke semasa',
    loading: 'Memuatkan sejarah anda…',
    noData: 'Tiada data untuk tempoh ini',
    progressTrend: 'Aliran Kemajuan',
    progressToGoal: 'Kemajuan ke Matlamat',
    ofGoal: '{pct}% daripada matlamat',
    goalReached: '🎯 Matlamat tercapai!',
    categoryBreakdown: 'Pecahan Kategori',
    noSessionsRange: 'Tiada sesi dalam julat ini',
    tryWiderRange: 'Cuba julat yang lebih luas atau pilih tempoh yang berbeza.',
    noSessionsYet: 'Tiada sesi lagi',
    completeFirst:
      'Lengkapkan penilaian pertama anda untuk melihat kemajuan dan arah aliran anda di sini.',
    startFirst: 'Mulakan Penilaian Pertama',
    export: {
      date: 'tarikh',
      time: 'Masa',
      totalScore: 'Jumlah Markah',
      duration: 'Tempoh (min)',
      notes: 'Nota'
    }
  },
  stats: {
    averageScore: 'Skor Purata',
    medianScore: 'Skor Median',
    highestScore: 'Markah Tertinggi',
    totalSessions: 'Jumlah Sesi'
  },
  network: {
    rankings: 'Kedudukan Rangkaian',
    searchingPeers: 'Mencari rakan sebaya...',
    searching: 'Mencari...',
    online: 'dalam talian',
    peers: '{count} rakan sebaya',
    results: '{count} keputusan',
    avgShort: 'Purata',
    p90Short: 'P90',
    averageScoreTitle: 'Skor Purata',
    percentile90Title: 'Persentil ke-90',
    globalAverage: 'Purata Global',
    percentile90: 'Persentil ke-90',
    manifestations: 'Manifestasi',
    activePeers: 'Rakan Sebaya Aktif',
    categoryRankings: 'Kedudukan Kategori'
  },
  focusAreas: {
    title: 'Kawasan Tumpuan',
    subtitle: '3 kategori skor terendah anda — menambah baik ini mendorong keuntungan terbesar.',
    empty: 'Lengkapkan lebih banyak sesi untuk melihat cadangan kawasan fokus yang diperibadikan.'
  },
  sessions: {
    recent: 'Sesi Terkini',
    deselectAll: 'Nyahpilih Semua',
    selectAll: 'Pilih Semua',
    deleteCount: 'Padam {count}',
    cancel: 'Batal',
    select: 'Pilih',
    deleting: 'Memadamkan…'
  },
  settings: {
    title: 'Tetapan Apl',
    close: 'Tutup tetapan',
    dataManagement: 'Pengurusan Data',
    saveLastSession: 'Simpan Sesi Terakhir',
    saveLastSessionDesc: 'Praisi jawapan daripada sesi terbaharu anda yang telah selesai.',
    resetProgress: 'Tetapkan Semula Kemajuan',
    resetProgressDesc: 'Padamkan semua jawapan yang disimpan dan mulakan dengan baharu.',
    goals: 'Matlamat',
    targetScore: 'Skor Sasaran',
    targetScoreDesc:
      'Tetapkan skor matlamat (1,000–10,000) untuk menjejak kemajuan anda pada papan pemuka.',
    set: 'Tetapkan',
    clearGoal: 'Jelas',
    currentTarget: 'Sasaran semasa:',
    on: 'hidup',
    off: 'Mati',
    version: 'Algoritma Manifestasi {version}',
    clearAllAnswers: 'Kosongkan Semua Jawapan',
    clearConfirmTitle: 'Kosongkan Semua Jawapan',
    clearConfirmMessage:
      'Ini akan memadamkan semua jawapan semasa anda secara kekal dan tidak boleh dibuat asal.',
    clearConfirmLabel: 'Jelas',
    keepAnswers: 'Simpan Jawapan',
    language: 'Bahasa',
    languageDesc: 'Pilih bahasa paparan untuk aplikasi.',
    languageCount: '{count} bahasa tersedia',
    goalErrorRange: 'Sila masukkan markah antara 1,000 dan 10,000.'
  },
  questionnaire: {
    saving: 'Menyimpan...',
    saved: 'Disimpan',
    progressText: '{pct}% selesai ({answered}/{total})',
    progressAria: 'Kemajuan penyelesaian penilaian',
    maxScore: 'Maks: {score}',
    answerToScore: 'Jawapan untuk markah',
    currentScore: 'Skor Semasa',
    scrollAll: 'Tatal Semua',
    stepByStep: 'Langkah demi Langkah',
    questionOf: 'Soalan {current} daripada {total}',
    previous: '← Sebelumnya',
    next: 'Seterusnya →',
    completeAssessment: 'Penilaian Lengkap',
    startFresh: 'Mahu mula segar?',
    resetAllAnswers: 'Tetapkan semula semua jawapan',
    resetTitle: 'Tetapkan Semula Semua Jawapan?',
    resetMessage:
      'Ini akan mengosongkan setiap jawapan dan bermula dari awal. Ini tidak boleh dibuat asal.',
    resetLabel: 'Tetapkan semula',
    scoreQuality: {
      notStarted: 'Tidak Dimulakan',
      manifesting: 'Menzahirkan ❆',
      aligned: 'Sejajar',
      building: 'Bangunan',
      startingOut: 'Bermula'
    },
    submitHint: {
      zero: '0 daripada {total} soalan dijawab — soalan tidak dijawab lalai kepada minimum',
      partial:
        '{remaining} baki soalan — soalan tidak dijawab lalai kepada minimum | {remaining} soalan yang tinggal — soalan yang tidak dijawab lalai kepada minimum',
      complete: 'Semua soalan dijawab — sedia untuk diserahkan!'
    },
    submitTitle: {
      zero: 'Jawab beberapa soalan untuk melengkapkan penilaian anda',
      partial: '{remaining} baki soalan | {remaining} soalan yang tinggal',
      complete: 'Hantar penilaian anda yang lengkap'
    },
    submitError: 'Gagal menyimpan sesi: {error}',
    dotTitle: 'Soalan {index}',
    dotAria: 'Pergi ke soalan {index}',
    keyboardHint: 'Petua: Gunakan ← → untuk menavigasi · 1–9 / 0 untuk menilai'
  },
  onboarding: {
    step0Title: 'Selamat datang ke Algoritma Manifestasi',
    step0Body1:
      'Alat ini membantu anda mengukur keselarasan minda, tabiat dan tindakan harian anda dengan mencapai matlamat anda. Jawab setiap soalan dengan jujur ​​untuk mendapatkan markah semasa anda.',
    step0Body2:
      'Lengkapkan soal selidik pada selang masa yang tetap untuk menjejaki pertumbuhan anda dari semasa ke semasa dan melihat kawasan mana yang paling memerlukan perhatian.',
    step1Title: 'Cara Pemarkahan Berfungsi',
    step1Body:
      'Setiap soalan bernilai bilangan mata yang ditetapkan. Nilaikan diri anda pada skala 1–10 untuk setiap soalan. Penarafan 10 bermakna anda merangkumi sepenuhnya prinsip itu; 1 bermakna anda belum bermula.',
    step1TargetHint: '🎯 Sasaran: {target} | Maksimum: {maximum}',
    excellent: 'Cemerlang',
    excellentRange: '7,001 – 10,000',
    excellentNote: 'Penjajaran yang kukuh — teruskan',
    good: 'bagus',
    goodRange: '4,001 – 7,000',
    goodNote: 'Asas yang kukuh — ruang untuk berkembang',
    needsWork: 'Memerlukan Kerja',
    needsWorkRange: '0 – 4,000',
    needsWorkNote: 'Fokus pada asas dahulu',
    step2Title: 'Data Anda Kekal Peribadi',
    step2Body1:
      'Semua jawapan dan sejarah skor anda disimpan secara setempat pada peranti anda menggunakan pangkalan data SQLite yang disulitkan. Tiada apa-apa dihantar ke mana-mana pelayan tanpa kebenaran eksplisit anda.',
    step2Body2:
      'Ciri perkongsian rakan ke rakan pilihan membolehkan anda melihat skor agregat tanpa nama daripada pengguna lain. Ia hanya berkongsi ringkasan yang ditandatangani secara kriptografi — tidak sekali-kali memberikan jawapan individu anda.',
    readyText: 'sedia? Mari dapatkan skor asas anda.',
    skipIntro: 'Langkau intro',
    next: 'Seterusnya',
    getStarted: 'Mulakan'
  },
  sharing: {
    title: 'Perkongsian Rangkaian Tanpa Nama',
    privacyFirst: '🔒 Privasi-Pertama',
    description:
      'Secara pilihan, sumbangkan hasil anda secara awanama ke rangkaian global. Tiada nama, e-mel, alamat IP atau ID peranti pernah dikongsi.',
    enabled: 'Perkongsian didayakan — menyumbang kepada rangkaian',
    disabled: 'Perkongsian dilumpuhkan (lalai)',
    activeBadge: '✓ Markah anda yang tidak dikenali sedang dikongsi dengan rakan sebaya',
    enableNote: 'Dayakan untuk melihat kedudukan persentil anda berbanding dengan rangkaian global.'
  },
  category: {
    back: '‹ Kembali',
    history: 'Sejarah',
    date: 'tarikh',
    score: 'skor',
    loading: 'Memuatkan...',
    notEnoughData: 'Tidak cukup data',
    noData: 'Tiada data ditemui untuk “{category}”.',
    goToDashboard: 'Pergi ke Papan Pemuka'
  },
  chartActions: {
    viewFullscreen: 'Lihat skrin penuh',
    exitFullscreen: 'Keluar dari skrin penuh',
    copyChart: 'Salin Carta',
    exportChart: 'Carta eksport',
    exportDefault: '⬇ Eksport',
    exportExcel: '📊 Eksport Excel',
    exportCsv: '📄 Eksport CSV',
    exportPdf: '📑 Eksport PDF',
    exportHtml: '🌐 Eksport HTML',
    copied: 'Carta disalin ke papan keratan',
    copyFailed: 'Salin gagal — papan keratan tidak tersedia',
    saveCancelled: 'Simpanan dibatalkan'
  },
  resume: {
    continueLastSession: 'Teruskan dari Sesi Terakhir?',
    welcomeBack: 'Selamat Kembali!',
    historicalBody:
      'Jawapan anda dari sesi terakhir anda yang telah selesai telah dimuatkan terlebih dahulu. Adakah anda ingin mengekalkan nilai tersebut sebagai titik permulaan, atau bermula dengan soal selidik yang kosong sepenuhnya?',
    activeBody:
      'Anda mempunyai sesi yang sedang dijalankan. Adakah anda ingin menyambung semula dari tempat anda berhenti atau memulakan penilaian baharu?',
    clearWarning: '⚠️ Ini akan mengosongkan semua jawapan semasa. Adakah anda pasti?',
    yesStartFresh: 'Ya, Mula Segar',
    cancel: 'Batal',
    keepLastValues: 'Kekalkan Nilai Terakhir',
    resumeSession: 'Sambung semula Sesi',
    startFresh: 'Mula Segar'
  },
  questionItem: {
    pointsSuffix: 'mata',
    low: 'rendah',
    high: 'tinggi',
    rateAria: 'Nilai {question}'
  },
  dateRange: {
    rangeLabel: 'Julat:',
    startDate: 'Tarikh mula',
    endDate: 'Tarikh tamat',
    presets: {
      '7d': '7 Hari',
      '30d': '30 Hari',
      '90d': '90 Hari',
      '1y': '1 Tahun',
      all: 'Sepanjang Masa',
      custom: 'Adat'
    }
  },
  update: {
    availableTitle: 'v{version} tersedia!',
    releaseNotesFallback: 'Lawati halaman keluaran untuk memuat turun versi terkini.',
    getUpdate: 'Dapatkan Kemas Kini',
    dismiss: 'Tolak'
  },
  questions: {
    '1': 'Kuasai Asas',
    '2': 'Aktifkan & Terangi Perkataan',
    '3': 'Cari Kesakitan & Kontrak Tenaga',
    '4': 'Tentukan apa yang anda mahu',
    '5': 'Tuliskan apa yang anda mahu',
    '6': 'Jangan kongsikan impian anda dengan orang lain',
    '7': 'Dapatkan keinginan yang membara untuk matlamat anda',
    '8': 'Matlamat mestilah dalam Sweet Spot',
    '9': 'Buat Keputusan',
    '10': 'Lihat/Rasa selesa dalam memiliki matlamat anda',
    '11': 'Lepaskan lampiran kepada keputusan',
    '12': 'Benarkan BAGAIMANA untuk mempersembahkan dirinya',
    '13': 'Ketahui perbezaan antara Impian & Matlamat Utama',
    '14': 'Fokus / Ketunggalan tujuan',
    '15': 'Senarai Keutamaan TO DO harian',
    '16': 'Kemajuan Carta / Ketahui Skor',
    '17': 'Gunakan Kitaran Momentum Kejayaan',
    '18': 'Dream Build - Buku Impian & Papan Visi',
    '19': 'Palamkan ke dalam Sistem',
    '20': 'Kursus Sains Penguasaan Peribadi',
    '21': 'Perhatikan perkataan yang anda ucapkan - apa yang anda katakan adalah apa yang anda dapat',
    '22': 'Fisiologi / Berpakaian untuk berjaya',
    '23': 'Niat Balas yang Jelas',
    '24': 'Bangunkan Kuasa Dalaman anda: Proses Kuasa Besar',
    '25': 'Disiarkan pada gelombang otak Alpha-theta',
    '26': 'Berhenti Menceritakan Kisah Kesengsaraan Anda',
    '27': 'Tunjukkan Penghargaan / Kesyukuran',
    '28': 'Menggantikan Tabiat Kegagalan dengan Tabiat Kejayaan (Proses Pemecut)',
    '29': 'Cipta Mastermind',
    '30': 'Tonton Orang yang Berjaya / Perantis',
    '31': 'Dengar/Baca Kisah Kejayaan',
    '32': 'Berikan apa yang anda mahu dahulu',
    '33': 'Lakukan Sekarang Mentaliti',
    '34': 'Jaga Badan Anda',
    '35': 'Cari Emas dalam Kesukaran',
    '36': 'Kosongkan Samskaras dari Field',
    '37': 'Ambil Tanggungjawab 100%',
    '38': 'Penjana Medan Penarik',
    '39': 'Sertai Kelab yang menghubungkan anda ke Sumber Kuasa',
    '40': 'Jalani kehidupan dengan niat yang disengajakan - berada pada masa kini',
    '1a': 'Siapa yang anda dengar?',
    '1b': 'Indeks Kebolehpelajaran',
    '1c': 'Skala Baki Latihan',
    '1d': 'Kecekapan tidak sedarkan diri',
    '19a': 'Baca buku',
    '19b': 'Dengar Audio',
    '19c': 'Menghadiri Acara (bulanan)',
    '19d': 'Memberi dan menerima Pengiktirafan / Peraturan Emas yang diperluaskan',
    '19e': 'Membina hubungan dengan orang yang berfikiran sama',
    '23a': 'Proses Wang',
    '23b': 'Proses Perhubungan',
    '23c': 'Proses Kepimpinan',
    '23d': 'Proses Komunikasi',
    '23e': 'Proses Kesihatan',
    '23f': 'Proses Kesedaran Rohani',
    '23g': 'Proses Impian',
    '23h': 'Proses Organisasi & Fokus'
  }
};

export default ms;

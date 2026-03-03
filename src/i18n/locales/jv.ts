/**
 * Auto-converted locale module for jv.
 */
import type { Messages } from './en';

const jv: Messages = {
  nav: {
    questionnaire: 'angket',
    history: 'Sajarah',
    settings: 'Setelan'
  },
  app: {
    name: 'Algoritma Manifestasi',
    unexpectedError: 'Ana kesalahan sing ora dikarepke.'
  },
  home: {
    subtitle: 'Rate saben area urip sampeyan - temokake skor keselarasan sampeyan'
  },
  dashboard: {
    title: 'Riwayat Pelacakan Algoritma Manifestasi',
    subtitle: 'Lacak kemajuan sampeyan liwat wektu',
    loading: 'Ngunggah riwayat sampeyan…',
    noData: 'Ora ana data kanggo periode iki',
    progressTrend: 'Tren Kemajuan',
    progressToGoal: 'Maju menyang Goal',
    ofGoal: '{pct}% saka gol',
    goalReached: '🎯 Gol Tekan!',
    categoryBreakdown: 'Pecahan Kategori',
    noSessionsRange: 'Ora ana sesi ing kisaran iki',
    tryWiderRange: 'Coba jangkoan sing luwih akeh utawa pilih wektu sing beda.',
    noSessionsYet: 'Durung sesi',
    completeFirst:
      'Rampungake penilaian pisanan sampeyan kanggo ndeleng kemajuan lan tren sampeyan ing kene.',
    startFirst: 'Miwiti Assessment First',
    export: {
      date: 'Tanggal',
      time: 'Wektu',
      totalScore: 'Total Skor',
      duration: 'Duration (min)',
      notes: 'Cathetan'
    }
  },
  stats: {
    averageScore: 'Rata-rata Skor',
    medianScore: 'Skor Median',
    highestScore: 'Skor paling dhuwur',
    totalSessions: 'Total Sesi'
  },
  network: {
    rankings: 'Ranking Jaringan',
    searchingPeers: 'Nggoleki kanca-kanca...',
    searching: 'Nggoleki...',
    online: 'Online',
    peers: '{count} kancane',
    results: '{count} asil',
    avgShort: 'Rata-rata',
    p90Short: 'P90',
    averageScoreTitle: 'Rata-rata Skor',
    percentile90Title: '90. Persentil',
    globalAverage: 'Rata-rata Global',
    percentile90: '90. Persentil',
    manifestations: 'Manifestasi',
    activePeers: 'Peer Aktif',
    categoryRankings: 'Peringkat Kategori'
  },
  focusAreas: {
    title: 'Area Fokus',
    subtitle: '3 kategori skor paling sampeyan - nambah iki bakal entuk bathi paling gedhe.',
    empty: 'Rampungake sesi liyane kanggo ndeleng rekomendasi area fokus sing dipersonalisasi.'
  },
  sessions: {
    recent: 'Sesi pungkasan',
    deselectAll: 'Busak pilih Kabeh',
    selectAll: 'Pilih Kabeh',
    deleteCount: 'Busak {count}',
    cancel: 'Batal',
    select: 'Pilih',
    deleting: 'Mbusak…'
  },
  settings: {
    title: 'Setelan App',
    close: 'Nutup setelan',
    dataManagement: 'Manajemen Data',
    saveLastSession: 'Simpen Sesi Pungkasan',
    saveLastSessionDesc: 'Pra-isi jawaban saka sesi paling anyar rampung.',
    resetProgress: 'Reset Progress',
    resetProgressDesc: 'Mbusak kabeh jawaban sing disimpen lan miwiti anyar.',
    goals: 'gol',
    targetScore: 'Skor Target',
    targetScoreDesc: 'Setel skor gol (1,000–10,000) kanggo nglacak kemajuan sampeyan ing dasbor.',
    set: 'Set',
    clearGoal: 'Cetha',
    currentTarget: 'Target saiki:',
    on: 'On',
    off: 'Mati',
    version: 'Algoritma Manifestasi {version}',
    clearAllAnswers: 'Busak Kabeh Jawaban',
    clearConfirmTitle: 'Busak Kabeh Jawaban',
    clearConfirmMessage: 'Iki bakal mbusak kabeh jawaban sampeyan saiki lan ora bisa dibatalake.',
    clearConfirmLabel: 'Cetha',
    keepAnswers: 'Tansah Jawaban',
    language: 'Basa',
    languageDesc: 'Pilih basa tampilan kanggo aplikasi.',
    languageCount: '{count} basa kasedhiya',
    goalErrorRange: 'Mangga ketik skor antarane 1.000 lan 10.000.'
  },
  questionnaire: {
    saving: 'Ngirit...',
    saved: 'Disimpen',
    progressText: '{pct}% lengkap ({answered}/{total})',
    progressAria: 'Assessment completion progression',
    maxScore: 'Maks: {score}',
    answerToScore: 'Jawaban kanggo skor',
    currentScore: 'Skor saiki',
    scrollAll: 'Gulung Kabeh',
    stepByStep: 'Step by Step',
    questionOf: 'Pitakonan {current} saka {total}',
    previous: '← Sadurunge',
    next: 'Sabanjure →',
    completeAssessment: 'Assessment Lengkap',
    startFresh: 'Pengin miwiti seger?',
    resetAllAnswers: 'Reset kabeh jawaban',
    resetTitle: 'Reset Kabeh Jawaban?',
    resetMessage: 'Iki bakal mbusak saben jawaban lan miwiti saka ngeruk. Iki ora bisa dibatalake.',
    resetLabel: 'Reset',
    scoreQuality: {
      notStarted: 'Ora Diwiwiti',
      manifesting: 'Manifestasi ❆',
      aligned: 'Sejajar',
      building: 'bangunan',
      startingOut: 'Miwiti'
    },
    submitHint: {
      zero: '0 saka {total} pitakonan dijawab — pitakonan sing durung dijawab standar kanggo minimal',
      partial:
        '{remaining} pitakonan isih — pitakonan durung dijawab standar kanggo minimal | {remaining} pitakonan isih - pitakonan sing durung dijawab standar kanggo minimal',
      complete: 'Kabeh pitakonan dijawab - siap dikirim!'
    },
    submitTitle: {
      zero: 'Jawab sawetara pitakonan kanggo ngrampungake penilaian sampeyan',
      partial: '{remaining} pitakonan isih | {remaining} pitakonan isih',
      complete: 'Kirimake penilaian sing wis rampung'
    },
    submitError: 'Gagal nyimpen sesi: {error}',
    dotTitle: 'Pitakonan {index}',
    dotAria: 'Pindhah menyang pitakonan {index}',
    keyboardHint: 'Tip: Gunakake ← → kanggo navigasi · 1–9 / 0 kanggo menehi rating'
  },
  onboarding: {
    step0Title: 'Sugeng rawuh ing Algoritma Manifestasi',
    step0Body1:
      'Alat iki mbantu sampeyan ngukur selaras karo pola pikir, kabiasaan, lan tumindak saben dina kanggo nggayuh tujuan sampeyan. Wangsulana saben pitakonan kanthi jujur ​​kanggo entuk skor sampeyan saiki.',
    step0Body2:
      'Rampungake kuesioner kanthi interval reguler kanggo nglacak wutah saka wektu lan ndeleng wilayah sing paling mbutuhake perhatian.',
    step1Title: 'Carane Nggawe Skor',
    step1Body:
      'Saben pitakonan worth nomer pesawat TCTerms. Rate dhewe kanthi skala 1–10 kanggo saben pitakonan. Rating 10 tegese sampeyan ngetrapake prinsip kasebut; 1 tegese sampeyan durung miwiti.',
    step1TargetHint: '🎯 Target: {target} | maksimal: {maximum}',
    excellent: 'Banget',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Alignment kuwat - terus maju',
    good: 'apik',
    goodRange: '4.001 – 7.000',
    goodNote: 'Solid dhasar - kamar kanggo tuwuh',
    needsWork: 'Butuh Kerja',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Fokus ing dhasar dhisik',
    step2Title: 'Data Sampeyan Tetep Pribadi',
    step2Body1:
      'Kabeh jawaban lan riwayat skor disimpen sacara lokal ing piranti nggunakake database SQLite sing dienkripsi. Ora ana sing dikirim menyang server apa wae tanpa ijin sampeyan.',
    step2Body2:
      'Fitur enggo bareng peer-to-peer opsional ngidini sampeyan ndeleng skor agregat anonim saka pangguna liyane. Iku mung nuduhake ringkesan sing ditandatangani kanthi kriptografis - ora tau jawaban individu sampeyan.',
    readyText: 'Siap? Ayo entuk skor baseline sampeyan.',
    skipIntro: 'Skip intro',
    next: 'Sabanjure',
    getStarted: 'Miwiti'
  },
  sharing: {
    title: 'Nuduhake Jaringan Anonim',
    privacyFirst: '🔒 Privasi-Kawitan',
    description:
      'Opsional nyumbang asil sampeyan kanthi anonim menyang jaringan global. Ora ana jeneng, email, alamat IP, utawa ID piranti sing tau dienggo bareng.',
    enabled: 'Nuduhake aktif - nyumbang kanggo jaringan',
    disabled: 'Nuduhake dipateni (standar)',
    activeBadge: '✓ Skor anonim sampeyan dituduhake karo kanca-kanca',
    enableNote: 'Aktifake ndeleng pangkat persentil sampeyan dibandhingake karo jaringan global.'
  },
  category: {
    back: '‹ Mbalik',
    history: 'Sajarah',
    date: 'Tanggal',
    score: 'Skor',
    loading: 'Loading...',
    notEnoughData: 'Data ora cukup',
    noData: 'Ora ditemokake data kanggo "{category}".',
    goToDashboard: 'Pindhah menyang Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Ndeleng layar wutuh',
    exitFullscreen: 'Metu saka layar wutuh',
    copyChart: 'Salinan Bagan',
    exportChart: 'Bagan ekspor',
    exportDefault: '⬇ Ekspor',
    exportExcel: '📊 Ekspor Excel',
    exportCsv: '📄 Ekspor CSV',
    exportPdf: '📑 Ekspor PDF',
    exportHtml: '🌐 Ekspor HTML',
    copied: 'Bagan disalin menyang clipboard',
    copyFailed: 'Gagal nyalin — clipboard ora kasedhiya',
    saveCancelled: 'Simpen dibatalake'
  },
  resume: {
    continueLastSession: 'Terus saka Sesi Terakhir?',
    welcomeBack: 'Sugeng rawuh!',
    historicalBody:
      'Jawaban sampeyan saka sesi pungkasan rampung wis dimuat. Apa sampeyan pengin njaga nilai kasebut minangka titik wiwitan, utawa diwiwiti kanthi kuesioner kosong?',
    activeBody:
      'Sampeyan duwe sesi ing proses. Apa sampeyan pengin nerusake ing ngendi sampeyan ninggalake, utawa miwiti evaluasi anyar?',
    clearWarning: '⚠️ Iki bakal mbusak kabeh jawaban saiki. Apa sampeyan yakin?',
    yesStartFresh: 'Ya, Mulai Seger',
    cancel: 'Batal',
    keepLastValues: 'Tansah Nilai pungkasan',
    resumeSession: 'Resume Sesi',
    startFresh: 'Mulai Seger'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'kurang',
    high: 'dhuwur',
    rateAria: 'Rate {question}'
  },
  dateRange: {
    rangeLabel: 'Range:',
    startDate: 'Tanggal wiwitan',
    endDate: 'Tanggal pungkasan',
    presets: {
      '7d': '7 dina',
      '30d': '30 dina',
      '90d': '90 dina',
      '1y': '1 Taun',
      all: 'Kabeh Wektu',
      custom: 'adat'
    }
  },
  update: {
    availableTitle: 'v{version} kasedhiya!',
    releaseNotesFallback: 'Bukak kaca rilis kanggo ngundhuh versi paling anyar.',
    getUpdate: 'Entuk Update',
    dismiss: 'Mbucal'
  },
  questions: {
    '1': 'Kuasai Dasar-dasarnya',
    '2': 'Aktifkan & Terangi Kata-kata',
    '3': 'Temukan Energi Rasa Sakit & Kontrak',
    '4': 'Tentukan apa yang Anda inginkan',
    '5': 'Tuliskan apa yang Anda inginkan',
    '6': 'Jangan berbagi impian Anda dengan orang lain',
    '7': 'Dapatkan keinginan yang membara untuk tujuan Anda',
    '8': 'Tujuan harus di Sweet Spot',
    '9': 'Buat Keputusan',
    '10': 'Lihat/Merasa nyaman dalam kepemilikan tujuan Anda',
    '11': 'Lepaskan lampiran ke hasil',
    '12': 'Izinkan BAGAIMANA untuk menampilkan dirinya sendiri',
    '13': 'Ketahui perbedaan antara Dream & Chief Aim',
    '14': 'Fokus / Tunggal tujuan',
    '15': 'Daftar Prioritas TO DO Harian',
    '16': 'Kemajuan Bagan / Ketahui Skornya',
    '17': 'Gunakan Siklus Momentum Keberhasilan',
    '18': 'Dream Build - Buku Impian & Papan Visi',
    '19': 'Colokkan ke Sistem',
    '20': 'Kursus Ilmu Penguasaan Pribadi',
    '21': 'Perhatikan kata-kata yang Anda ucapkan - apa yang Anda katakan adalah apa yang Anda dapatkan',
    '22': 'Fisiologi / Berpakaian untuk sukses',
    '23': 'Jelas Niat Balasan',
    '24': 'Bangkitkan Kekuatan Batin Anda: Proses Kekuatan Super',
    '25': 'Disiarkan pada gelombang otak Alpha-theta',
    '26': 'Berhentilah Menceritakan Kisah Kesengsaraan Anda',
    '27': 'Tunjukkan Apresiasi / Syukur',
    '28': 'Ganti Kebiasaan Kegagalan dengan Kebiasaan Sukses (Proses Akselerator)',
    '29': 'Buat Dalang',
    '30': 'Tonton Orang Sukses/Magang',
    '31': 'Dengarkan/Baca Kisah Sukses',
    '32': 'Berikan apa yang Anda inginkan terlebih dahulu',
    '33': 'Mentalitas Lakukan Sekarang',
    '34': 'Jaga Tubuh Anda',
    '35': 'Temukan Emas dalam Kesulitan',
    '36': 'Bersihkan Samskara dari Lapangan',
    '37': 'Ambil Tanggung Jawab 100%',
    '38': 'Generator Lapangan Attractor',
    '39': 'Bergabunglah dengan Klub yang menghubungkan Anda ke Sumber Daya',
    '40': 'Jalani hidup dengan niat yang disengaja - berada di masa sekarang',
    '1a': 'Siapa yang Anda dengarkan?',
    '1b': 'Indeks Kemampuan Pengajaran',
    '1c': 'Skala Keseimbangan Pelatihan',
    '1d': 'Kompetensi bawah sadar',
    '19a': 'Membaca buku',
    '19b': 'Mendengarkan Audio',
    '19c': 'Menghadiri Acara (bulanan)',
    '19d': 'Berikan dan terima Pengakuan / Aturan Emas yang diperluas',
    '19e': 'Kembangkan hubungan dengan orang-orang yang berpikiran sama',
    '23a': 'Proses Uang',
    '23b': 'Proses Hubungan',
    '23c': 'Proses Kepemimpinan',
    '23d': 'Proses Komunikasi',
    '23e': 'Proses Kesehatan',
    '23f': 'Proses Kesadaran Spiritual',
    '23g': 'Proses Mimpi',
    '23h': 'Proses Organisasi & Fokus'
  }
};

export default jv;

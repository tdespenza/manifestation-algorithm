/**
 * Auto-converted locale module for tr.
 */
import type { Messages } from './en';

const tr: Messages = {
  nav: {
    questionnaire: 'Anket',
    history: 'Tarih',
    settings: 'Ayarlar'
  },
  app: {
    name: 'Tezahür Algoritması',
    unexpectedError: 'Beklenmeyen bir hata oluştu.'
  },
  home: {
    subtitle: 'Hayatınızın her alanını derecelendirin; uyum puanınızı keşfedin'
  },
  dashboard: {
    title: 'Tezahür Algoritması Takip Geçmişi',
    subtitle: 'Zaman içindeki ilerlemenizi takip edin',
    loading: 'Geçmişiniz yükleniyor…',
    noData: 'Bu döneme ait veri yok',
    progressTrend: 'İlerleme Trendi',
    progressToGoal: 'Hedefe Doğru İlerleme',
    ofGoal: "Hedefin {pct}%'si",
    goalReached: '🎯 Hedefe Ulaşıldı!',
    categoryBreakdown: 'Kategori Dağılımı',
    noSessionsRange: 'Bu aralıkta oturum yok',
    tryWiderRange: 'Daha geniş bir aralık deneyin veya farklı bir dönem seçin.',
    noSessionsYet: 'Henüz oturum yok',
    completeFirst:
      'İlerlemenizi ve eğilimlerinizi burada görmek için ilk değerlendirmenizi tamamlayın.',
    startFirst: 'İlk Değerlendirmeyi Başlat',
    export: {
      date: 'Tarih',
      time: 'Zaman',
      totalScore: 'Toplam Puan',
      duration: 'Süre (dk)',
      notes: 'Notlar'
    }
  },
  stats: {
    averageScore: 'Ortalama Puan',
    medianScore: 'Medyan Puan',
    highestScore: 'En Yüksek Puan',
    totalSessions: 'Toplam Oturum Sayısı'
  },
  network: {
    rankings: 'Ağ Sıralamaları',
    searchingPeers: 'Arkadaş aranıyor...',
    searching: 'Aranıyor...',
    online: 'Çevrimiçi',
    peers: '{count} akranlar',
    results: '{count} sonuçlar',
    avgShort: 'Ort.',
    p90Short: 'P90',
    averageScoreTitle: 'Ortalama Puan',
    percentile90Title: '90. Yüzdelik dilim',
    globalAverage: 'Küresel Ortalama',
    percentile90: '90. Yüzdelik dilim',
    manifestations: 'Belirtiler',
    activePeers: 'Aktif Akranlar',
    categoryRankings: 'Kategori Sıralaması'
  },
  focusAreas: {
    title: 'Odak Alanları',
    subtitle:
      'En düşük puan alan 3 kategoriniz; bunların iyileştirilmesi en büyük kazanımları sağlar.',
    empty: 'Kişiselleştirilmiş odak alanı önerilerini görmek için daha fazla oturum tamamlayın.'
  },
  sessions: {
    recent: 'Son Oturumlar',
    deselectAll: 'Tümünün Seçimini Kaldır',
    selectAll: 'Tümünü Seç',
    deleteCount: "{count}'yi sil",
    cancel: 'İptal',
    select: 'Seç',
    deleting: 'Siliniyor…'
  },
  settings: {
    title: 'Uygulama Ayarları',
    close: 'Ayarları kapat',
    dataManagement: 'Veri Yönetimi',
    saveLastSession: 'Son Oturumu Kaydet',
    saveLastSessionDesc: 'En son tamamlanan oturumunuzun yanıtlarını önceden doldurun.',
    resetProgress: 'İlerlemeyi Sıfırla',
    resetProgressDesc: 'Kaydedilen tüm yanıtları silin ve yeni bir başlangıç yapın.',
    goals: 'Hedefler',
    targetScore: 'Hedef Puan',
    targetScoreDesc:
      'İlerlemenizi kontrol panelinden takip etmek için bir hedef puanı (1.000-10.000) belirleyin.',
    set: 'Ayarla',
    clearGoal: 'Temizle',
    currentTarget: 'Mevcut hedef:',
    on: 'Açık',
    off: 'Kapalı',
    version: 'Gösterim Algoritması {version}',
    clearAllAnswers: 'Tüm Yanıtları Temizle',
    clearConfirmTitle: 'Tüm Yanıtları Temizle',
    clearConfirmMessage:
      'Bu işlem, mevcut yanıtlarınızın tamamını kalıcı olarak silecektir ve bu işlem geri alınamaz.',
    clearConfirmLabel: 'Temizle',
    keepAnswers: 'Cevapları Sakla',
    language: 'Dil',
    languageDesc: 'Uygulamanın görüntüleme dilini seçin.',
    languageCount: '{count} diller mevcut',
    goalErrorRange: 'Lütfen 1.000 ile 10.000 arasında bir puan girin.'
  },
  questionnaire: {
    saving: 'Kaydediliyor...',
    saved: 'Kaydedildi',
    progressText: '{pct}% tamamlandı ({answered}/{total})',
    progressAria: 'Değerlendirme tamamlama ilerlemesi',
    maxScore: 'Maksimum: {score}',
    answerToScore: 'Skora cevap',
    currentScore: 'Mevcut Puan',
    scrollAll: 'Tümünü Kaydır',
    stepByStep: 'Adım Adım',
    questionOf: "{total}'nin {current} sorusu",
    previous: '← Önceki',
    next: 'Sonraki →',
    completeAssessment: 'Değerlendirmeyi Tamamla',
    startFresh: 'Yeni bir başlangıç mı yapmak istiyorsunuz?',
    resetAllAnswers: 'Tüm yanıtları sıfırla',
    resetTitle: 'Tüm Yanıtlar Sıfırlansın mı?',
    resetMessage: 'Bu, her cevabı temizleyecek ve sıfırdan başlayacaktır. Bu geri alınamaz.',
    resetLabel: 'Sıfırla',
    scoreQuality: {
      notStarted: 'Başlatılmadı',
      manifesting: 'Tezahür Eden ❆',
      aligned: 'Hizalanmış',
      building: 'Bina',
      startingOut: 'Başlangıç'
    },
    submitHint: {
      zero: '{total} sorudan 0 tanesi yanıtlandı — yanıtlanmayan sorular varsayılan olarak minimum düzeydedir',
      partial:
        '{remaining} kalan soru — yanıtlanmamış sorular varsayılan olarak minimum düzeydedir | {remaining} kalan sorular — yanıtlanmamış sorular varsayılan olarak minimum düzeydedir',
      complete: 'Tüm soruların yanıtları — gönderilmeye hazır!'
    },
    submitTitle: {
      zero: 'Değerlendirmenizi tamamlamak için bazı soruları yanıtlayın',
      partial: '{remaining} kalan soru | {remaining} soru kaldı',
      complete: 'Tamamlanan değerlendirmenizi gönderin'
    },
    submitError: 'Oturum kaydedilemedi: {error}',
    dotTitle: 'Soru {index}',
    dotAria: '{index} soruya git',
    keyboardHint: 'İpucu: Gezinmek için ← → tuşlarını kullanın · Derecelendirmek için 1–9 / 0'
  },
  onboarding: {
    step0Title: 'Tezahür Algoritmasına Hoş Geldiniz',
    step0Body1:
      'Bu araç, zihniyetinizin, alışkanlıklarınızın ve günlük eylemlerinizin hedeflerinize ulaşmayla ne kadar uyumlu olduğunu ölçmenize yardımcı olur. Mevcut puanınızı almak için her soruyu dürüstçe yanıtlayın.',
    step0Body2:
      'Zaman içindeki büyümenizi takip etmek ve hangi alanların en çok dikkat gerektirdiğini görmek için anketi düzenli aralıklarla doldurun.',
    step1Title: 'Puanlama Nasıl Çalışır?',
    step1Body:
      'Her soru belirli sayıda puan değerindedir. Her soru için kendinizi 1-10 arası bir ölçekte değerlendirin. 10 puan, bu prensibi tam olarak hayata geçirdiğiniz anlamına gelir; 1 henüz başlamadığınız anlamına gelir.',
    step1TargetHint: '🎯 Hedef: {target} | Maksimum: {maximum}',
    excellent: 'Mükemmel',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Güçlü uyum – devam et',
    good: 'iyi',
    goodRange: '4.001 – 7.000',
    goodNote: 'Sağlam temel — büyüme alanı',
    needsWork: 'Çalışma Gerekiyor',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Önce temellere odaklanın',
    step2Title: 'Verileriniz Gizli Kalır',
    step2Body1:
      'Tüm yanıtlarınız ve puan geçmişiniz, şifrelenmiş bir SQLite veritabanı kullanılarak cihazınızda yerel olarak depolanır. Açık izniniz olmadan hiçbir sunucuya hiçbir şey gönderilmez.',
    step2Body2:
      'İsteğe bağlı eşler arası paylaşım özelliği, diğer kullanıcıların anonimleştirilmiş toplam puanlarını görmenize olanak tanır. Yalnızca kriptografik olarak imzalanmış bir özeti paylaşır; kişisel yanıtlarınızı asla paylaşmaz.',
    readyText: 'Hazır? Temel puanınızı alalım.',
    skipIntro: 'Girişi atla',
    next: 'Sonraki',
    getStarted: 'Başlayın'
  },
  sharing: {
    title: 'Anonim Ağ Paylaşımı',
    privacyFirst: '🔒 Gizlilik Öncelikli',
    description:
      'İsteğe bağlı olarak sonuçlarınızı anonim olarak küresel ağa katkıda bulunun. Hiçbir ad, e-posta, IP adresi veya cihaz kimliği asla paylaşılmaz.',
    enabled: 'Paylaşım etkin — ağa katkıda bulunma',
    disabled: 'Paylaşım devre dışı (varsayılan)',
    activeBadge: '✓ Anonimleştirilmiş puanlarınız akranlarınızla paylaşılıyor',
    enableNote: 'Küresel ağa kıyasla yüzdelik sıralamanızı görmeyi etkinleştirin.'
  },
  category: {
    back: '‹ Geri',
    history: 'Tarih',
    date: 'Tarih',
    score: 'Puan',
    loading: 'Yükleniyor...',
    notEnoughData: 'Yeterli veri yok',
    noData: '“{category}” için veri bulunamadı.',
    goToDashboard: 'Kontrol Paneline Git'
  },
  chartActions: {
    viewFullscreen: 'Tam ekranı görüntüle',
    exitFullscreen: 'Tam ekrandan çık',
    copyChart: 'Grafiği Kopyala',
    exportChart: 'Grafiği dışa aktar',
    exportDefault: '⬇ Dışa aktar',
    exportExcel: "📊 Excel'i dışa aktar",
    exportCsv: "📄 CSV'yi dışa aktar",
    exportPdf: "📑 PDF'yi dışa aktar",
    exportHtml: "🌐 HTML'yi dışa aktar",
    copied: 'Grafik panoya kopyalandı',
    copyFailed: 'Kopyalama başarısız oldu — pano kullanılamıyor',
    saveCancelled: 'Kaydetme iptal edildi'
  },
  resume: {
    continueLastSession: 'Son Oturumdan devam edilsin mi?',
    welcomeBack: 'Tekrar hoşgeldiniz!',
    historicalBody:
      'Son tamamladığınız oturumdaki yanıtlarınız önceden yüklenmiştir. Bu değerleri bir başlangıç ​​noktası olarak mı tutmak istiyorsunuz yoksa tamamen boş bir anketle mi başlamak istiyorsunuz?',
    activeBody:
      'Devam eden bir oturumunuz var. Kaldığınız yerden devam etmek mi yoksa yeni bir değerlendirmeye mi başlamak istiyorsunuz?',
    clearWarning: '⚠️ Bu, mevcut tüm yanıtları temizleyecektir. Emin misin?',
    yesStartFresh: 'Evet, Yeni Başla',
    cancel: 'İptal',
    keepLastValues: 'Son Değerleri Koru',
    resumeSession: 'Oturumu Devam Ettir',
    startFresh: 'Yeni Başla'
  },
  questionItem: {
    pointsSuffix: 'puan',
    low: 'Düşük',
    high: 'Yüksek',
    rateAria: "{question}'yı değerlendirin"
  },
  dateRange: {
    rangeLabel: 'Aralık:',
    startDate: 'Başlangıç tarihi',
    endDate: 'Bitiş tarihi',
    presets: {
      '7d': '7 Gün',
      '30d': '30 Gün',
      '90d': '90 Gün',
      '1y': '1 Yıl',
      all: 'Tüm Zamanlar',
      custom: 'Özel'
    }
  },
  update: {
    availableTitle: 'v{version} mevcut!',
    releaseNotesFallback: 'En son sürümü indirmek için sürüm sayfasını ziyaret edin.',
    getUpdate: 'Güncellemeyi Al',
    dismiss: 'Reddet'
  },
  questions: {
    '1': 'Temelleri Ustalaşın',
    '2': 'Kelimeleri Etkinleştir ve Aydınlat',
    '3': 'Acı ve Sözleşme Enerjisi Bul',
    '4': 'Ne istediğini tanımla.',
    '5': 'İstediğini yaz',
    '6': 'Rüyanı başkalarıyla paylaşma',
    '7': 'Hedefin için yanan bir arzu duy',
    '8': "Hedef Sweet Spot'ta olmalı",
    '9': 'Bir Karar Ver',
    '10': 'Hedefine sahip olmayı gör/iyi hisset',
    '11': 'Sonuca bağlılığı serbest bırak',
    '12': 'NASıl Olanın kendini göstermesine izin verin',
    '13': 'Dream ile Chief Aim arasındaki farkı bilin',
    '14': 'Odaklanma / Amacın Tek Olması',
    '15': 'Günlük YAPılacaklar listesi',
    '16': 'Listede İlerleme / Puanı Bil',
    '17': 'Başarı Momentum Döngüsünü Kullanın',
    '18': 'Rüya İnşa - Rüya Defteri ve Vizyon Panosu',
    '19': 'Sisteme Takma',
    '20': 'Kişisel Ustalık Bilimi Kursu',
    '21': 'Söylediklerine dikkat et - ne söylersen onu alırsın',
    '22': 'Fizyoloji / Başarı için giyinmek',
    '23': 'Net Karşı Niyetler',
    '24': 'İç Gücünüzü Uyandırın: Süper Güç Süreçleri',
    '25': 'Alpha-theta beyin dalgasında yayınlanıyor',
    '26': 'Acı Hikayenizi Anlatmayı Bırakın',
    '27': 'Minnettarlık / Takdir Gösterin',
    '28': 'Başarısızlık Alışkanlıklarını Başarı Alışkanlıklarıyla Değiştirin (Hızlandırıcı Süreçler)',
    '29': 'Bir Beyin Yarat',
    '30': 'Başarılı İnsanlar/Çırak Programını İzleyin',
    '31': 'Başarı Hikayelerini Dinleyin/Okulayın',
    '32': 'Önce istediğini ver',
    '33': 'Do It Now Mentaliteti',
    '34': 'Vücuduna Dikkat Et',
    '35': 'Zorlukta Altını Bul',
    '36': 'Sahadan Samskaraları Temizleyin',
    '37': '%100 sorumluluk alın',
    '38': 'Çekim Alan Jeneratörleri',
    '39': 'Sizi bir Güç Kaynağına Bağlayan Bir Kulübe Katılın',
    '40': 'Hayatı kasıtlı bir niyetle yaşa - şimdiki zamanda ol',
    '1a': 'Kimi dinliyorsun?',
    '1b': 'Öğretilebilirlik Endeksi',
    '1c': 'Eğitim Denge Ölçeği',
    '1d': 'Bilinçdışı yetkinlik',
    '19a': 'Kitap okuyun',
    '19b': 'Sesleri Dinle',
    '19c': 'Etkinliklere Katıl (aylık)',
    '19d': 'Takdir ver ve al / genişletilmiş Altın Kural',
    '19e': 'Benzer düşünen insanlarla ilişkiler geliştirin',
    '23a': 'Para İşlemleri',
    '23b': 'İlişki Süreçleri',
    '23c': 'Liderlik Süreçleri',
    '23d': 'İletişim Süreçleri',
    '23e': 'Sağlık Süreçleri',
    '23f': 'Ruhsal Farkındalık Süreçleri',
    '23g': 'Rüya Süreçleri',
    '23h': 'Organizasyon ve Odak Süreçleri'
  }
};

export default tr;

/**
 * Auto-converted locale module for et.
 */
import type { Messages } from './en';

const et: Messages = {
  nav: {
    questionnaire: 'Küsimustik',
    history: 'Ajalugu',
    settings: 'Seaded'
  },
  app: {
    name: 'Manifestatsiooni algoritm',
    unexpectedError: 'Ilmnes ootamatu viga.'
  },
  home: {
    subtitle: 'Hinnake oma elu iga valdkonda – avastage oma joondusskoor'
  },
  dashboard: {
    title: 'Manifestatsiooni algoritmi jälgimise ajalugu',
    subtitle: 'Jälgige oma edusamme aja jooksul',
    loading: 'Teie ajaloo laadimine…',
    noData: 'Selle perioodi kohta andmed puuduvad',
    progressTrend: 'Progressi suund',
    progressToGoal: 'Edasiminek eesmärgi poole',
    ofGoal: '{pct}% eesmärgist',
    goalReached: '🎯 Eesmärk saavutatud!',
    categoryBreakdown: 'Kategooria jaotus',
    noSessionsRange: 'Selles vahemikus pole seansse',
    tryWiderRange: 'Proovige laiemat valikut või valige mõni muu periood.',
    noSessionsYet: 'Seansse veel pole',
    completeFirst: 'Täitke oma esimene hindamine, et näha siin oma edusamme ja suundumusi.',
    startFirst: 'Alustage esimest hindamist',
    export: {
      date: 'Kuupäev',
      time: 'Aeg',
      totalScore: 'Koguskoor',
      duration: 'Kestus (min)',
      notes: 'Märkmed'
    }
  },
  stats: {
    averageScore: 'Keskmine punktisumma',
    medianScore: 'Mediaanskoor',
    highestScore: 'Kõrgeim skoor',
    totalSessions: 'Seansse kokku'
  },
  network: {
    rankings: 'Võrgustiku edetabel',
    searchingPeers: 'Eakaaslaste otsimine...',
    searching: 'Otsimine...',
    online: 'Internetis',
    peers: '{count} eakaaslased',
    results: '{count} tulemused',
    avgShort: 'Keskm',
    p90Short: 'P90',
    averageScoreTitle: 'Keskmine punktisumma',
    percentile90Title: '90. protsentiil',
    globalAverage: 'Globaalne keskmine',
    percentile90: '90. protsentiil',
    manifestations: 'Manifestatsioonid',
    activePeers: 'Aktiivsed kolleegid',
    categoryRankings: 'Kategooriate paremusjärjestus'
  },
  focusAreas: {
    title: 'Fookusalad',
    subtitle: 'Teie 3 madalaima punktisummaga kategooriat – nende parandamine toob suurimat kasu.',
    empty: 'Täitke rohkem seansse, et näha isikupärastatud fookusala soovitusi.'
  },
  sessions: {
    recent: 'Viimased seansid',
    deselectAll: 'Tühistage valik Kõik',
    selectAll: 'Valige Kõik',
    deleteCount: 'Kustuta {count}',
    cancel: 'Tühista',
    select: 'Valige',
    deleting: 'Kustutamine…'
  },
  settings: {
    title: 'Rakenduse seaded',
    close: 'Sulge seaded',
    dataManagement: 'Andmehaldus',
    saveLastSession: 'Salvesta viimane seanss',
    saveLastSessionDesc: 'Eeltäitke oma viimase lõpetatud seansi vastused.',
    resetProgress: 'Lähtestage edenemine',
    resetProgressDesc: 'Kustutage kõik salvestatud vastused ja alustage uuesti.',
    goals: 'Eesmärgid',
    targetScore: 'Sihtskoor',
    targetScoreDesc:
      'Seadistage eesmärgi skoor (1000–10 000), et jälgida oma edusamme armatuurlaual.',
    set: 'Määra',
    clearGoal: 'Selge',
    currentTarget: 'Praegune sihtmärk:',
    on: 'Sees',
    off: 'Väljas',
    version: 'Manifestatsiooni algoritm {version}',
    clearAllAnswers: 'Kustuta kõik vastused',
    clearConfirmTitle: 'Kustuta kõik vastused',
    clearConfirmMessage:
      'See kustutab jäädavalt kõik teie praegused vastused ja seda ei saa tagasi võtta.',
    clearConfirmLabel: 'Selge',
    keepAnswers: 'Jäta vastused alles',
    language: 'Keel',
    languageDesc: 'Valige rakenduse kuvakeel.',
    languageCount: 'Saadaval {count} keeled',
    goalErrorRange: 'Palun sisestage skoor vahemikus 1000 kuni 10 000.'
  },
  questionnaire: {
    saving: 'Salvestamine...',
    saved: 'Salvestatud',
    progressText: '{pct}% valmis ({answered}/{total})',
    progressAria: 'Hindamise lõpuleviimise edenemine',
    maxScore: 'Max: {score}',
    answerToScore: 'Vastus skoori saamiseks',
    currentScore: 'Praegune skoor',
    scrollAll: 'Kerige kõik',
    stepByStep: 'Samm-sammult',
    questionOf: '{total} küsimus {current}',
    previous: '← Eelmine',
    next: 'Järgmine →',
    completeAssessment: 'Täielik hindamine',
    startFresh: 'Kas soovite alustada värskelt?',
    resetAllAnswers: 'Lähtestage kõik vastused',
    resetTitle: 'Kas lähtestada kõik vastused?',
    resetMessage: 'See kustutab kõik vastused ja alustab nullist. Seda ei saa tagasi võtta.',
    resetLabel: 'Lähtesta',
    scoreQuality: {
      notStarted: 'Pole alanud',
      manifesting: 'Avaldub ❆',
      aligned: 'Joondatud',
      building: 'Hoone',
      startingOut: 'Alustades'
    },
    submitHint: {
      zero: '0 {total} küsimusest vastatud – vastamata küsimused on vaikimisi minimaalsed',
      partial:
        '{remaining} küsimus on jäänud — vastamata küsimused on vaikimisi miinimumini | {remaining} küsimusi on jäänud – vastamata küsimuste arv on vaikimisi minimaalne',
      complete: 'Kõik küsimused on vastatud – esitamiseks valmis!'
    },
    submitTitle: {
      zero: 'Hindamise lõpetamiseks vastake mõnele küsimusele',
      partial: '{remaining} küsimus on jäänud | {remaining} on veel küsimusi',
      complete: 'Esitage oma täidetud hinnang'
    },
    submitError: 'Seansi salvestamine ebaõnnestus: {error}',
    dotTitle: 'Küsimus {index}',
    dotAria: 'Mine küsimuse juurde {index}',
    keyboardHint: 'Näpunäide: kasutage ← → navigeerimiseks · 1–9 / 0 hindamiseks'
  },
  onboarding: {
    step0Title: 'Tere tulemast manifesteerimisalgoritmi',
    step0Body1:
      'See tööriist aitab teil mõõta, kui kooskõlas on teie mõtteviis, harjumused ja igapäevased tegevused teie eesmärkide saavutamisega. Oma praeguse skoori saamiseks vastake igale küsimusele ausalt.',
    step0Body2:
      'Täitke küsimustik korrapäraste ajavahemike järel, et jälgida oma kasvu aja jooksul ja näha, millised valdkonnad vajavad kõige rohkem tähelepanu.',
    step1Title: 'Kuidas punktiarvestus töötab',
    step1Body:
      'Iga küsimus on väärt teatud arvu punkte. Hinda end iga küsimuse puhul skaalal 1–10. Hinne 10 tähendab, et järgite seda põhimõtet täielikult; 1 tähendab, et te pole alustanud.',
    step1TargetHint: '🎯 Sihtmärk: {target} | Maksimaalne: {maximum}',
    excellent: 'Suurepärane',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Tugev joondus – jätkake',
    good: 'Hea',
    goodRange: '4001 – 7000',
    goodNote: 'Tugev vundament – ruumi kasvamiseks',
    needsWork: 'Vajab tööd',
    needsWorkRange: '0–4000',
    needsWorkNote: 'Keskendu kõigepealt põhitõdedele',
    step2Title: 'Teie andmed jäävad privaatseks',
    step2Body1:
      'Kõik teie vastused ja skooride ajalugu salvestatakse teie seadmesse krüptitud SQLite andmebaasi abil. Ilma teie selgesõnalise loata ei saadeta ühtegi serverisse midagi.',
    step2Body2:
      'Valikuline peer-to-peer jagamise funktsioon võimaldab teil näha teiste kasutajate anonüümseks muudetud koondtulemusi. See jagab ainult krüptograafiliselt allkirjastatud kokkuvõtet – mitte kunagi teie individuaalseid vastuseid.',
    readyText: 'Valmis? Vaatame teie baasskoori.',
    skipIntro: 'Jäta sissejuhatus vahele',
    next: 'Edasi',
    getStarted: 'Alustage'
  },
  sharing: {
    title: 'Anonüümne võrgu jagamine',
    privacyFirst: '🔒 Privaatsus - esiteks',
    description:
      'Soovi korral panustage oma tulemused anonüümselt ülemaailmsesse võrku. Nime, e-posti aadressi, IP-aadressi ega seadme ID-d ei jagata kunagi.',
    enabled: 'Jagamine lubatud – võrku panustamine',
    disabled: 'Jagamine keelatud (vaikimisi)',
    activeBadge: '✓ Teie anonüümseks muudetud tulemusi jagatakse eakaaslastega',
    enableNote: 'Lubage oma protsentiili asetuse vaatamine võrreldes ülemaailmse võrguga.'
  },
  category: {
    back: '‹ Tagasi',
    history: 'Ajalugu',
    date: 'Kuupäev',
    score: 'Skoor',
    loading: 'Laadimine...',
    notEnoughData: 'Andmeid pole piisavalt',
    noData: '"{category}" jaoks andmeid ei leitud.',
    goToDashboard: 'Minge juhtpaneelile'
  },
  chartActions: {
    viewFullscreen: 'Kuva täisekraanil',
    exitFullscreen: 'Välju täisekraanilt',
    copyChart: 'Kopeeri diagramm',
    exportChart: 'Ekspordi diagramm',
    exportDefault: '⬇ Eksport',
    exportExcel: '📊 Ekspordi Excel',
    exportCsv: '📄 Ekspordi CSV',
    exportPdf: '📑 Ekspordi PDF',
    exportHtml: '🌐 Ekspordi HTML',
    copied: 'Diagramm kopeeriti lõikelauale',
    copyFailed: 'Kopeerimine ebaõnnestus – lõikelaud pole saadaval',
    saveCancelled: 'Salvestamine tühistati'
  },
  resume: {
    continueLastSession: 'Kas jätkata eelmisest seansist?',
    welcomeBack: 'Tere tulemast tagasi!',
    historicalBody:
      'Teie viimase lõpetatud seansi vastused on eellaaditud. Kas soovite jätta need väärtused lähtepunktiks või alustada täiesti tühja küsimustikuga?',
    activeBody:
      'Teil on seanss pooleli. Kas soovite jätkata sealt, kus pooleli jäite, või alustada uut hindamist?',
    clearWarning: '⚠️ See kustutab kõik praegused vastused. Oled sa kindel?',
    yesStartFresh: 'Jah, alusta värskelt',
    cancel: 'Tühista',
    keepLastValues: 'Hoidke viimased väärtused',
    resumeSession: 'Jätka seanssi',
    startFresh: 'Alusta värskelt'
  },
  questionItem: {
    pointsSuffix: 'punktid',
    low: 'Madal',
    high: 'Kõrge',
    rateAria: 'Hinda {question}'
  },
  dateRange: {
    rangeLabel: 'Vahemik:',
    startDate: 'Alguskuupäev',
    endDate: 'Lõppkuupäev',
    presets: {
      '7d': '7 päeva',
      '30d': '30 päeva',
      '90d': '90 päeva',
      '1y': '1 aasta',
      all: 'Kogu aeg',
      custom: 'Kohandatud'
    }
  },
  update: {
    availableTitle: 'v{version} on saadaval!',
    releaseNotesFallback: 'Uusima versiooni allalaadimiseks külastage väljalaskelehte.',
    getUpdate: 'Hankige värskendus',
    dismiss: 'Loobu'
  },
  questions: {
    '1': 'Õppige põhitõdesid',
    '2': 'Aktiveerige ja valgustage sõnu',
    '3': 'Otsige valu ja leppige kokku energiaga',
    '4': 'Määratlege, mida soovite',
    '5': 'Kirjutage üles, mida soovite',
    '6': 'Ära jaga oma unistust teistega',
    '7': 'Hankige põletav soov oma eesmärgi poole',
    '8': 'Eesmärk peab olema Sweet Spotis',
    '9': 'Tehke otsus',
    '10': 'Näha/tunne oma eesmärki omades hästi',
    '11': 'Vabastage manus tulemusele',
    '12': 'Laske KUIDAS end esitleda',
    '13': 'Tea, mis vahe on Dreami ja Chief Aimi vahel',
    '14': 'Olge keskendunud / eesmärgi üksindus',
    '15': 'Igapäevane TO DO prioriteetide nimekiri',
    '16': 'Diagrammi edenemine / Teadke tulemust',
    '17': 'Kasutage Momentum Cycle of Success',
    '18': 'Dream Build – unistuste raamat ja visioonitahvel',
    '19': 'Ühendage süsteemiga',
    '20': 'Isikliku meisterlikkuse teaduse kursus',
    '21': 'Jälgige sõnu, mida räägite – see on see, mida te ütlete',
    '22': 'Füsioloogia / Riietu edu saavutamiseks',
    '23': 'Selge vastukavatsused',
    '24': 'Äratage oma sisemine jõud: ülivõimsuse protsessid',
    '25': 'Ülekanne alfa-teeta ajulainel',
    '26': 'Lõpetage oma hädade loo rääkimine',
    '27': 'Näita tunnustust / tänulikkust',
    '28': 'Ebaõnnestumise harjumuste asendamine eduharjumustega (kiirendiprotsessid)',
    '29': 'Looge Mastermind',
    '30': 'Vaadake saateid Edukad inimesed/õpipoiss',
    '31': 'Kuulake/lugege edulugusid',
    '32': 'Andke kõigepealt ära see, mida soovite',
    '33': 'Tee seda kohe mentaliteet',
    '34': 'Hoolitse oma keha eest',
    '35': 'Leidke ebaõnne kuld',
    '36': 'Kustutage Samskaras põllult',
    '37': 'Võtke 100% vastutust',
    '38': 'Atraktorvälja generaatorid',
    '39': 'Liituge klubiga, mis ühendab teid toiteallikaga',
    '40': 'Ela elu tahtliku kavatsusega – ole praeguses ajas',
    '1a': 'Keda sa kuulad?',
    '1b': 'Õpetavuse indeks',
    '1c': 'Treeningu tasakaalu skaala',
    '1d': 'Teadmatu kompetents',
    '19a': 'Lugege raamatuid',
    '19b': 'Kuulake helisid',
    '19c': 'Osalege üritustel (igakuiselt)',
    '19d': 'Tunnustuse andmine ja vastuvõtmine / laiendatud kuldreegel',
    '19e': 'Arendage suhteid sarnaselt mõtlevate inimestega',
    '23a': 'Raha protsessid',
    '23b': 'Suhteprotsessid',
    '23c': 'Juhtimisprotsessid',
    '23d': 'Suhtlemisprotsessid',
    '23e': 'Terviseprotsessid',
    '23f': 'Vaimsed teadvustamise protsessid',
    '23g': 'Unistuste protsessid',
    '23h': 'Organisatsiooni- ja keskendumisprotsessid'
  }
};

export default et;

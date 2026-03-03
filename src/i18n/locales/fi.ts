/**
 * Auto-converted locale module for fi.
 */
import type { Messages } from './en';

const fi: Messages = {
  nav: {
    questionnaire: 'Kyselylomake',
    history: 'Historia',
    settings: 'Asetukset'
  },
  app: {
    name: 'Manifestaatioalgoritmi',
    unexpectedError: 'Tapahtui odottamaton virhe.'
  },
  home: {
    subtitle: 'Arvioi jokainen elämäsi alue – löydä kohdistuspisteesi'
  },
  dashboard: {
    title: 'Ilmentymisalgoritmin seurantahistoria',
    subtitle: 'Seuraa edistymistäsi ajan mittaan',
    loading: 'Ladataan historiaasi…',
    noData: 'Ei tietoja tälle ajanjaksolle',
    progressTrend: 'Edistystrendi',
    progressToGoal: 'Edistyminen tavoitteeseen',
    ofGoal: '{pct}% tavoitteesta',
    goalReached: '🎯 Tavoite saavutettu!',
    categoryBreakdown: 'Luokkien erittely',
    noSessionsRange: 'Ei istuntoja tällä alueella',
    tryWiderRange: 'Kokeile laajempaa valikoimaa tai valitse eri ajanjakso.',
    noSessionsYet: 'Ei istuntoja vielä',
    completeFirst: 'Suorita ensimmäinen arviosi nähdäksesi edistymisesi ja trendit täällä.',
    startFirst: 'Aloita ensimmäinen arviointi',
    export: {
      date: 'Päivämäärä',
      time: 'Aika',
      totalScore: 'Kokonaispisteet',
      duration: 'Kesto (min)',
      notes: 'Huomautuksia'
    }
  },
  stats: {
    averageScore: 'Keskimääräinen pistemäärä',
    medianScore: 'Mediaanipisteet',
    highestScore: 'Korkein pistemäärä',
    totalSessions: 'Istunnot yhteensä'
  },
  network: {
    rankings: 'Verkoston sijoitukset',
    searchingPeers: 'Etsitään vertaisia...',
    searching: 'Haetaan...',
    online: 'verkossa',
    peers: '{count} vertaiset',
    results: '{count} tulokset',
    avgShort: 'Keskim',
    p90Short: 'P90',
    averageScoreTitle: 'Keskimääräinen pistemäärä',
    percentile90Title: '90. prosenttipiste',
    globalAverage: 'Globaali keskiarvo',
    percentile90: '90. prosenttipiste',
    manifestations: 'Ilmestymiset',
    activePeers: 'Aktiiviset vertaiset',
    categoryRankings: 'Luokkien sijoitukset'
  },
  focusAreas: {
    title: 'Painopistealueet',
    subtitle:
      'Kolme vähiten pisteytettyä luokkaasi – näiden parantaminen tuottaa suurimmat voitot.',
    empty: 'Suorita lisää istuntoja nähdäksesi henkilökohtaisia ​​painopistealuesuosituksia.'
  },
  sessions: {
    recent: 'Viimeaikaiset istunnot',
    deselectAll: 'Poista kaikki valinta',
    selectAll: 'Valitse Kaikki',
    deleteCount: 'Poista {count}',
    cancel: 'Peruuta',
    select: 'Valitse',
    deleting: 'Poistetaan…'
  },
  settings: {
    title: 'Sovellusasetukset',
    close: 'Sulje asetukset',
    dataManagement: 'Tiedonhallinta',
    saveLastSession: 'Tallenna viimeinen istunto',
    saveLastSessionDesc: 'Esitäytä vastaukset viimeisimmästä päättyneestä istunnostasi.',
    resetProgress: 'Nollaa edistyminen',
    resetProgressDesc: 'Poista kaikki tallennetut vastaukset ja aloita alusta.',
    goals: 'Maalit',
    targetScore: 'Tavoitepisteet',
    targetScoreDesc: 'Aseta tavoitepisteet (1 000–10 000) seurataksesi edistymistäsi kojelaudassa.',
    set: 'Aseta',
    clearGoal: 'Selkeä',
    currentTarget: 'Nykyinen tavoite:',
    on: 'Päällä',
    off: 'Pois päältä',
    version: 'Ilmoitusalgoritmi {version}',
    clearAllAnswers: 'Tyhjennä kaikki vastaukset',
    clearConfirmTitle: 'Tyhjennä kaikki vastaukset',
    clearConfirmMessage:
      'Tämä poistaa pysyvästi kaikki nykyiset vastauksesi, eikä sitä voi kumota.',
    clearConfirmLabel: 'Selkeä',
    keepAnswers: 'Pidä vastaukset',
    language: 'Kieli',
    languageDesc: 'Valitse sovelluksen näyttökieli.',
    languageCount: '{count} saatavilla olevat kielet',
    goalErrorRange: 'Anna pistemäärä 1 000 ja 10 000 välillä.'
  },
  questionnaire: {
    saving: 'Tallennetaan...',
    saved: 'Tallennettu',
    progressText: '{pct}% valmis ({answered}/{total})',
    progressAria: 'Arvioinnin valmistuminen edistyy',
    maxScore: 'Max: {score}',
    answerToScore: 'Vastaa pisteeseen',
    currentScore: 'Nykyinen pistemäärä',
    scrollAll: 'Vieritä kaikki',
    stepByStep: 'Askel askeleelta',
    questionOf: 'Kysymys {current} henkilöstä {total}',
    previous: '← Edellinen',
    next: 'Seuraava →',
    completeAssessment: 'Täydellinen arviointi',
    startFresh: 'Haluatko aloittaa alusta?',
    resetAllAnswers: 'Nollaa kaikki vastaukset',
    resetTitle: 'Nollataanko kaikki vastaukset?',
    resetMessage: 'Tämä poistaa jokaisen vastauksen ja aloittaa alusta. Tätä ei voi kumota.',
    resetLabel: 'Nollaa',
    scoreQuality: {
      notStarted: 'Ei aloitettu',
      manifesting: 'Ilmenee ❆',
      aligned: 'Tasattu',
      building: 'Rakennus',
      startingOut: 'Starting Out'
    },
    submitHint: {
      zero: '0 {total} kysymyksistä vastattu – vastaamattomia kysymyksiä oletuksena on minimi',
      partial:
        '{remaining} kysymys jäljellä — vastaamattomia kysymyksiä oletuksena on minimi | {remaining} kysymyksiä jäljellä – vastaamattomia kysymyksiä on oletuksena minimi',
      complete: 'Kaikkiin kysymyksiin vastattu – valmiina lähetettäväksi!'
    },
    submitTitle: {
      zero: 'Viimeistele arviointisi vastaamalla joihinkin kysymyksiin',
      partial: '{remaining} kysymys jäljellä | {remaining} kysymyksiä jäljellä',
      complete: 'Lähetä valmis arviosi'
    },
    submitError: 'Istunnon tallentaminen epäonnistui: {error}',
    dotTitle: 'Kysymys {index}',
    dotAria: 'Siirry kysymykseen {index}',
    keyboardHint: 'Vinkki: Käytä ← → navigoidaksesi · 1–9 / 0 arvioidaksesi'
  },
  onboarding: {
    step0Title: 'Tervetuloa Manifestation Algorithmiin',
    step0Body1:
      'Tämän työkalun avulla voit mitata, kuinka linjassa ajattelutapasi, tottumuksesi ja päivittäiset toimintasi ovat tavoitteidesi saavuttamisen kanssa. Vastaa jokaiseen kysymykseen rehellisesti saadaksesi nykyisen pisteesi.',
    step0Body2:
      'Täytä kysely säännöllisin väliajoin seurataksesi kasvuasi ajan myötä ja nähdäksesi, mitkä alueet tarvitsevat eniten huomiota.',
    step1Title: 'Kuinka pisteytys toimii',
    step1Body:
      'Jokainen kysymys on tietyn määrän pisteitä arvoinen. Arvioi itsesi asteikolla 1–10 jokaisesta kysymyksestä. Arvosana 10 tarkoittaa, että toteutat tämän periaatteen täysin. 1 tarkoittaa, että et ole aloittanut.',
    step1TargetHint: '🎯 Kohde: {target} | Maksimi: {maximum}',
    excellent: 'Erinomainen',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Vahva linjaus – jatka',
    good: 'Hyvä',
    goodRange: '4 001 – 7 000',
    goodNote: 'Vankka perusta – tilaa kasvaa',
    needsWork: 'Tarvitsee työtä',
    needsWorkRange: '0-4000',
    needsWorkNote: 'Keskity ensin perusasioihin',
    step2Title: 'Tietosi pysyvät yksityisinä',
    step2Body1:
      'Kaikki vastauksesi ja tuloshistoriasi tallennetaan paikallisesti laitteellesi salatun SQLite-tietokannan avulla. Mitään ei lähetetä millekään palvelimelle ilman nimenomaista lupaasi.',
    step2Body2:
      'Valinnaisen vertaisjakamisominaisuuden avulla voit nähdä muiden käyttäjien anonymisoituja kokonaispisteitä. Se jakaa vain kryptografisesti allekirjoitetun yhteenvedon – ei koskaan yksittäisiä vastauksiasi.',
    readyText: 'Valmis? Otetaan peruspisteesi.',
    skipIntro: 'Ohita esittely',
    next: 'Seuraavaksi',
    getStarted: 'Aloita'
  },
  sharing: {
    title: 'Nimetön verkon jakaminen',
    privacyFirst: '🔒 Tietosuoja ensin',
    description:
      'Vaihtoehtoisesti voit lähettää tuloksesi nimettömästi maailmanlaajuiseen verkostoon. Nimeä, sähköpostiosoitetta, IP-osoitetta tai laitetunnusta ei koskaan jaeta.',
    enabled: 'Jakaminen käytössä — osallistuu verkkoon',
    disabled: 'Jakaminen pois käytöstä (oletus)',
    activeBadge: '✓ Anonymisoidut pisteesi jaetaan muiden kanssa',
    enableNote: 'Ota käyttöön nähdäksesi prosenttipisteesi verrattuna maailmanlaajuiseen verkkoon.'
  },
  category: {
    back: '‹ Takaisin',
    history: 'Historia',
    date: 'Päivämäärä',
    score: 'Pisteet',
    loading: 'Ladataan...',
    notEnoughData: 'Ei tarpeeksi dataa',
    noData: 'Tietoja ei löytynyt kohteelle "{category}".',
    goToDashboard: 'Siirry Dashboardiin'
  },
  chartActions: {
    viewFullscreen: 'Näytä koko näyttö',
    exitFullscreen: 'Poistu koko näytöstä',
    copyChart: 'Kopioi kaavio',
    exportChart: 'Vie kaavio',
    exportDefault: '⬇ Vie',
    exportExcel: '📊 Vie Excel',
    exportCsv: '📄 Vie CSV',
    exportPdf: '📑 Vie PDF',
    exportHtml: '🌐 Vie HTML',
    copied: 'Kaavio kopioitu leikepöydälle',
    copyFailed: 'Kopiointi epäonnistui – leikepöytä ei ole käytettävissä',
    saveCancelled: 'Tallennus peruutettu'
  },
  resume: {
    continueLastSession: 'Jatketaanko edellisestä istunnosta?',
    welcomeBack: 'Tervetuloa Takaisin!',
    historicalBody:
      'Viimeisimmän suoritetun istunnon vastauksesi on ladattu valmiiksi. Haluatko säilyttää nämä arvot lähtökohtana vai aloittaa täysin tyhjällä kyselylomakkeella?',
    activeBody:
      'Sinulla on istunto meneillään. Haluatko jatkaa siitä, mihin jäit, vai aloittaa uuden arvioinnin?',
    clearWarning: '⚠️ Tämä tyhjentää kaikki nykyiset vastaukset. Oletko varma?',
    yesStartFresh: 'Kyllä, aloita tuoreesta',
    cancel: 'Peruuta',
    keepLastValues: 'Säilytä viimeiset arvot',
    resumeSession: 'Jatka istuntoa',
    startFresh: 'Aloita tuoreesta'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Matala',
    high: 'Korkea',
    rateAria: 'Arvioi {question}'
  },
  dateRange: {
    rangeLabel: 'Alue:',
    startDate: 'Aloituspäivämäärä',
    endDate: 'Päättymispäivä',
    presets: {
      '7d': '7 päivää',
      '30d': '30 päivää',
      '90d': '90 päivää',
      '1y': '1 vuosi',
      all: 'Kaikki aika',
      custom: 'Mukautettu'
    }
  },
  update: {
    availableTitle: 'v{version} on saatavilla!',
    releaseNotesFallback: 'Vieraile julkaisusivulla ladataksesi uusin versio.',
    getUpdate: 'Hanki päivitys',
    dismiss: 'Hylkää'
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

export default fi;

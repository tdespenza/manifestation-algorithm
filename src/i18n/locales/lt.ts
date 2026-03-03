/**
 * Auto-converted locale module for lt.
 */
import type { Messages } from './en';

const lt: Messages = {
  nav: {
    questionnaire: 'Klausimynas',
    history: 'Istorija',
    settings: 'Nustatymai'
  },
  app: {
    name: 'Manifestacijos algoritmas',
    unexpectedError: 'Įvyko netikėta klaida.'
  },
  home: {
    subtitle: 'Įvertinkite kiekvieną savo gyvenimo sritį – atraskite savo suderinimo balą'
  },
  dashboard: {
    title: 'Pasireiškimo algoritmo sekimo istorija',
    subtitle: 'Stebėkite savo pažangą laikui bėgant',
    loading: 'Įkeliama istorija…',
    noData: 'Šio laikotarpio duomenų nėra',
    progressTrend: 'Pažangos tendencija',
    progressToGoal: 'Pažanga siekiant tikslo',
    ofGoal: '{pct}% tikslo',
    goalReached: '🎯 Tikslas pasiektas!',
    categoryBreakdown: 'Kategorijų suskirstymas',
    noSessionsRange: 'Šiame diapazone seansų nėra',
    tryWiderRange: 'Išbandykite platesnį diapazoną arba pasirinkite kitą laikotarpį.',
    noSessionsYet: 'Dar nėra seansų',
    completeFirst:
      'Užbaikite pirmąjį įvertinimą, kad pamatytumėte savo pažangą ir tendencijas čia.',
    startFirst: 'Pradėkite pirmąjį vertinimą',
    export: {
      date: 'Data',
      time: 'Laikas',
      totalScore: 'Bendras balas',
      duration: 'Trukmė (min.)',
      notes: 'Pastabos'
    }
  },
  stats: {
    averageScore: 'Vidutinis balas',
    medianScore: 'Vidutinis balas',
    highestScore: 'Aukščiausias balas',
    totalSessions: 'Iš viso seansų'
  },
  network: {
    rankings: 'Tinklo reitingai',
    searchingPeers: 'Ieškau bendraamžių...',
    searching: 'Ieškoma...',
    online: 'Prisijungę',
    peers: '{count} bendraamžiais',
    results: '{count} rezultatai',
    avgShort: 'Vid',
    p90Short: 'P90',
    averageScoreTitle: 'Vidutinis balas',
    percentile90Title: '90-asis procentilis',
    globalAverage: 'Pasaulinis vidurkis',
    percentile90: '90-asis procentilis',
    manifestations: 'Apraiškos',
    activePeers: 'Aktyvūs bendraamžiai',
    categoryRankings: 'Kategorijų reitingai'
  },
  focusAreas: {
    title: 'Fokusavimo sritys',
    subtitle:
      'Jūsų 3 mažiausiai balų surinktos kategorijos – patobulinus jas, gaunama didžiausia nauda.',
    empty:
      'Užbaikite daugiau seansų, kad pamatytumėte suasmenintas fokusavimo srities rekomendacijas.'
  },
  sessions: {
    recent: 'Naujausios sesijos',
    deselectAll: 'Panaikinkite visų pasirinkimą',
    selectAll: 'Pasirinkite Viskas',
    deleteCount: 'Ištrinti {count}',
    cancel: 'Atšaukti',
    select: 'Pasirinkite',
    deleting: 'Ištrinama…'
  },
  settings: {
    title: 'Programos nustatymai',
    close: 'Uždaryti nustatymus',
    dataManagement: 'Duomenų valdymas',
    saveLastSession: 'Išsaugoti paskutinę sesiją',
    saveLastSessionDesc: 'Iš anksto užpildykite atsakymus iš paskutinės baigtos sesijos.',
    resetProgress: 'Iš naujo nustatyti eigą',
    resetProgressDesc: 'Ištrinkite visus išsaugotus atsakymus ir pradėkite iš naujo.',
    goals: 'Tikslai',
    targetScore: 'Tikslinis balas',
    targetScoreDesc:
      'Nustatykite tikslo balą (1 000–10 000), kad galėtumėte stebėti savo pažangą prietaisų skydelyje.',
    set: 'Nustatyti',
    clearGoal: 'Aišku',
    currentTarget: 'Dabartinis tikslas:',
    on: 'Įjungta',
    off: 'Išjungta',
    version: 'Pasireiškimo algoritmas {version}',
    clearAllAnswers: 'Išvalyti visus atsakymus',
    clearConfirmTitle: 'Išvalyti visus atsakymus',
    clearConfirmMessage:
      'Taip visam laikui bus ištrinti visi dabartiniai atsakymai ir veiksmo anuliuoti negalima.',
    clearConfirmLabel: 'Aišku',
    keepAnswers: 'Išsaugokite atsakymus',
    language: 'Kalba',
    languageDesc: 'Pasirinkite programos rodymo kalbą.',
    languageCount: '{count} galimos kalbos',
    goalErrorRange: 'Įveskite balą nuo 1 000 iki 10 000.'
  },
  questionnaire: {
    saving: 'Išsaugoma...',
    saved: 'Išsaugota',
    progressText: '{pct}% baigta ({answered}/{total})',
    progressAria: 'Vertinimo užbaigimo eiga',
    maxScore: 'Maks.: {score}',
    answerToScore: 'Atsakymas į balą',
    currentScore: 'Dabartinis rezultatas',
    scrollAll: 'Slinkite viską',
    stepByStep: 'Žingsnis po žingsnio',
    questionOf: '{total} klausimas {current}',
    previous: '← Ankstesnis',
    next: 'Kitas →',
    completeAssessment: 'Pilnas įvertinimas',
    startFresh: 'Norite pradėti iš naujo?',
    resetAllAnswers: 'Iš naujo nustatyti visus atsakymus',
    resetTitle: 'Iš naujo nustatyti visus atsakymus?',
    resetMessage: 'Tai išvalys kiekvieną atsakymą ir pradės nuo nulio. To negalima anuliuoti.',
    resetLabel: 'Nustatyti iš naujo',
    scoreQuality: {
      notStarted: 'Nepradėtas',
      manifesting: 'Pasireiškiantis ❆',
      aligned: 'Sulyginta',
      building: 'Pastatas',
      startingOut: 'Starting Out'
    },
    submitHint: {
      zero: 'Atsakyta 0 iš {total} klausimų – neatsakyti klausimai pagal numatytuosius nustatymus yra minimalūs',
      partial:
        'Liko {remaining} klausimas – neatsakyti klausimai pagal numatytuosius nustatymus yra minimalūs | Liko {remaining} klausimų – neatsakytų klausimų pagal nutylėjimą yra minimalus',
      complete: 'Į visus klausimus atsakyta – paruošta pateikti!'
    },
    submitTitle: {
      zero: 'Atsakykite į kai kuriuos klausimus, kad užbaigtumėte vertinimą',
      partial: '{remaining} liko klausimas | {remaining} liko klausimų',
      complete: 'Pateikite savo užbaigtą įvertinimą'
    },
    submitError: 'Nepavyko išsaugoti seanso: {error}',
    dotTitle: 'Klausimas {index}',
    dotAria: 'Eiti į klausimą {index}',
    keyboardHint: 'Patarimas: naudokite ← → norėdami naršyti · 1–9 / 0, kad įvertintumėte'
  },
  onboarding: {
    step0Title: 'Sveiki atvykę į Manifestacijos algoritmą',
    step0Body1:
      'Šis įrankis padeda įvertinti, kaip jūsų mąstymas, įpročiai ir kasdieniai veiksmai yra suderinti su jūsų tikslų siekimu. Sąžiningai atsakykite į kiekvieną klausimą, kad gautumėte dabartinį rezultatą.',
    step0Body2:
      'Reguliariai užpildykite klausimyną, kad stebėtumėte savo augimą laikui bėgant ir sužinotumėte, kurioms sritims reikia skirti daugiausiai dėmesio.',
    step1Title: 'Kaip veikia taškų skaičiavimas',
    step1Body:
      'Kiekvienas klausimas vertas nustatyto taškų skaičiaus. Įvertinkite save skalėje nuo 1 iki 10 už kiekvieną klausimą. Įvertinimas 10 reiškia, kad jūs visiškai įgyvendinate šį principą; 1 reiškia, kad jūs nepradėjote.',
    step1TargetHint: '🎯 Tikslas: {target} | Maksimalus: {maximum}',
    excellent: 'Puikiai',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Stiprus derinimas – tęsk',
    good: 'Gerai',
    goodRange: '4 001 – 7 000',
    goodNote: 'Tvirtas pagrindas – vieta augti',
    needsWork: 'Reikia Darbo',
    needsWorkRange: '0 – 4000',
    needsWorkNote: 'Pirmiausia sutelkite dėmesį į pagrindus',
    step2Title: 'Jūsų duomenys lieka privatūs',
    step2Body1:
      'Visi jūsų atsakymai ir rezultatų istorija yra saugomi jūsų įrenginyje naudojant užšifruotą SQLite duomenų bazę. Niekas nesiunčiamas į jokį serverį be aiškaus jūsų leidimo.',
    step2Body2:
      'Pasirenkama lygiaverčio bendrinimo funkcija leidžia matyti anoniminius bendrus kitų vartotojų balus. Jis dalijasi tik kriptografiškai pasirašyta santrauka – niekada neteikia jūsų individualių atsakymų.',
    readyText: 'Pasiruošę? Suskaičiuokime jūsų pradinį balą.',
    skipIntro: 'Praleisti įvadą',
    next: 'Kitas',
    getStarted: 'Pradėkite'
  },
  sharing: {
    title: 'Anoniminis tinklo bendrinimas',
    privacyFirst: '🔒 Privatumas – pirmiausia',
    description:
      'Pasirinktinai pridėkite savo rezultatus anonimiškai į pasaulinį tinklą. Niekada nebendrinamas joks vardas, el. pašto adresas, IP adresas ar įrenginio ID.',
    enabled: 'Bendrinimas įjungtas – prisidedama prie tinklo',
    disabled: 'Bendrinimas išjungtas (numatytasis)',
    activeBadge: '✓ Jūsų anoniminiai rezultatai bendrinami su bendraamžiais',
    enableNote: 'Įgalinkite savo procentilio reitingą, palyginti su pasauliniu tinklu.'
  },
  category: {
    back: '‹ Atgal',
    history: 'Istorija',
    date: 'Data',
    score: 'Rezultatas',
    loading: 'Įkeliama...',
    notEnoughData: 'Nepakanka duomenų',
    noData: '„{category}“ duomenų nerasta.',
    goToDashboard: 'Eikite į prietaisų skydelį'
  },
  chartActions: {
    viewFullscreen: 'Žiūrėti per visą ekraną',
    exitFullscreen: 'Išeikite per visą ekraną',
    copyChart: 'Kopijuoti diagramą',
    exportChart: 'Eksportuoti diagramą',
    exportDefault: '⬇ Eksportuoti',
    exportExcel: '📊 Eksportuokite Excel',
    exportCsv: '📄 Eksportuoti CSV',
    exportPdf: '📑 Eksportuoti PDF',
    exportHtml: '🌐 Eksportuokite HTML',
    copied: 'Diagrama nukopijuota į mainų sritį',
    copyFailed: 'Kopijuoti nepavyko – iškarpinė nepasiekiama',
    saveCancelled: 'Išsaugojimas atšauktas'
  },
  resume: {
    continueLastSession: 'Tęsti nuo paskutinės sesijos?',
    welcomeBack: 'Sveiki sugrįžę!',
    historicalBody:
      'Jūsų atsakymai iš paskutinės užbaigtos sesijos buvo iš anksto įkelti. Ar norėtumėte išlaikyti šias vertybes kaip atskaitos tašką, ar pradėti nuo visiškai tuščios anketos?',
    activeBody: 'Vyksta sesija. Ar norėtumėte tęsti ten, kur baigėte, ar pradėti naują vertinimą?',
    clearWarning: '⚠️ Taip bus išvalyti visi dabartiniai atsakymai. Ar esi tikras?',
    yesStartFresh: 'Taip, pradėti iš naujo',
    cancel: 'Atšaukti',
    keepLastValues: 'Išsaugokite paskutines vertybes',
    resumeSession: 'Tęsti sesiją',
    startFresh: 'Pradėti iš naujo'
  },
  questionItem: {
    pointsSuffix: 'tšk',
    low: 'Žemas',
    high: 'Aukštas',
    rateAria: 'Įvertinti {question}'
  },
  dateRange: {
    rangeLabel: 'Diapazonas:',
    startDate: 'Pradžios data',
    endDate: 'Pabaigos data',
    presets: {
      '7d': '7 dienos',
      '30d': '30 dienų',
      '90d': '90 dienų',
      '1y': '1 metai',
      all: 'Visą laiką',
      custom: 'Pasirinktinis'
    }
  },
  update: {
    availableTitle: 'v{version} yra!',
    releaseNotesFallback: 'Apsilankykite leidimo puslapyje, kad atsisiųstumėte naujausią versiją.',
    getUpdate: 'Gaukite atnaujinimą',
    dismiss: 'Atsisakyti'
  },
  questions: {
    '1': 'Įvaldykite pagrindus',
    '2': 'Aktyvinti ir apšviesti žodžius',
    '3': 'Raskite skausmą ir kontraktinę energiją',
    '4': 'Apibrėžkite, ko norite',
    '5': 'Užsirašykite, ko norite',
    '6': 'Nesidalykite savo svajone su kitais',
    '7': 'Užsidegkite savo tikslo troškimu',
    '8': 'Tikslas turi būti Sweet Spot',
    '9': 'Priimkite sprendimą',
    '10': 'Pamatykite/jauskitės gerai turėdami savo tikslą',
    '11': 'Atlaisvinkite prisirišimą prie rezultato',
    '12': 'Leisti HOW pristatyti save',
    '13': 'Žinokite, kuo skiriasi "Dream" ir "Chief Aime"',
    '14': 'Būkite susikaupę / tikslo vieningumas',
    '15': 'Kasdienis TO DO prioritetų sąrašas',
    '16': 'Diagramos eiga / Žinokite rezultatą',
    '17': 'Naudokite "Momentum Cycle of Success"',
    '18': 'Svajonių kūrimas - Svajonių knyga ir vizijos lenta',
    '19': 'Prijunkite prie sistemos',
    '20': 'Asmeninio meistriškumo mokslo kursas',
    '21': 'Stebėkite žodžius, kuriuos sakote - tai, ką sakote, yra tai, ką gaunate',
    '22': 'Fiziologija / Suknelė sėkmei',
    '23': 'Aiškūs priešpriešiniai ketinimai',
    '24': 'Pažadinkite savo vidinę galią: supergalių procesai',
    '25': 'Transliacija per Alfa-teta smegenų bangą',
    '26': 'Nustokite pasakoti savo vargo istoriją',
    '27': 'Rodyti dėkingumą / dėkingumą',
    '28': 'Pakeiskite nesėkmės įpročius su sėkmės įpročiais (greitintuvo procesai)',
    '29': 'Sukurkite sumanytoją',
    '30': 'Žiūrėkite sėkmingus žmones / mokinius',
    '31': 'Sėkmės istorijų klausymas/skaitymas',
    '32': 'Pirmiausia atiduokite tai, ko norite',
    '33': 'Daryk tai dabar mentalitetas',
    '34': 'Rūpinkitės savo kūnu',
    '35': 'Raskite auksą sunkumuose',
    '36': 'Išvalyti Samskaras iš lauko',
    '37': 'Prisiimkite 100% atsakomybę',
    '38': 'Atraktoriaus lauko generatoriai',
    '39': 'Prisijunkite prie klubo, kuris prijungia jus prie maitinimo šaltinio',
    '40': 'Gyvenkite sąmoningai - būkite dabartyje',
    '1a': 'Ko klausotės?',
    '1b': 'Mokymo indeksas',
    '1c': 'Treniruočių balanso svarstyklės',
    '1d': 'Nesąmoninga kompetencija',
    '19a': 'Skaitykite knygas',
    '19b': 'Klausytis garso įrašų',
    '19c': 'Dalyvaukite renginiuose (kas mėnesį)',
    '19d': 'Duokite ir gaukite pripažinimą / išplėstinę auksinę taisyklę',
    '19e': 'Užmegzkite santykius su bendraminčiais',
    '23a': 'Pinigų procesai',
    '23b': 'Santykių procesai',
    '23c': 'Lyderystės procesai',
    '23d': 'Komunikacijos procesai',
    '23e': 'Sveikatos procesai',
    '23f': 'Dvasinio sąmoningumo procesai',
    '23g': 'Svajonių procesai',
    '23h': 'Organizavimo ir fokusavimo procesai'
  }
};

export default lt;

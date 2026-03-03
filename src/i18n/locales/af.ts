/**
 * Auto-converted locale module for af.
 */
import type { Messages } from './en';

const af: Messages = {
  nav: {
    questionnaire: 'Vraelys',
    history: 'Geskiedenis',
    settings: 'Instellings'
  },
  app: {
    name: 'Manifestasie-algoritme',
    unexpectedError: "'n Onverwagte fout het voorgekom."
  },
  home: {
    subtitle: 'Beoordeel elke area van jou lewe – ontdek jou belyningstelling'
  },
  dashboard: {
    title: 'Manifestasie-algoritme dop geskiedenis',
    subtitle: 'Volg jou vordering oor tyd',
    loading: 'Laai tans jou geskiedenis …',
    noData: 'Geen data vir hierdie tydperk nie',
    progressTrend: 'Vorderingstendens',
    progressToGoal: 'Vorder na Doelwit',
    ofGoal: '{pct}% van doelwit',
    goalReached: '🎯 Doelwit bereik!',
    categoryBreakdown: 'Kategorie-uiteensetting',
    noSessionsRange: 'Geen sessies in hierdie reeks nie',
    tryWiderRange: "Probeer 'n groter reeks of kies 'n ander tydperk.",
    noSessionsYet: 'Nog geen sessies nie',
    completeFirst: 'Voltooi jou eerste assessering om jou vordering en neigings hier te sien.',
    startFirst: 'Begin Eerste Assessering',
    export: {
      date: 'Datum',
      time: 'Tyd',
      totalScore: 'Totale telling',
      duration: 'Tydsduur (min)',
      notes: 'Notas'
    }
  },
  stats: {
    averageScore: 'Gemiddelde telling',
    medianScore: 'Mediaan telling',
    highestScore: 'Hoogste telling',
    totalSessions: 'Totale sessies'
  },
  network: {
    rankings: 'Netwerkranglys',
    searchingPeers: 'Soek tans na eweknieë …',
    searching: 'Soek tans …',
    online: 'Aanlyn',
    peers: '{count} eweknieë',
    results: '{count} resultate',
    avgShort: 'Gem',
    p90Short: 'P90',
    averageScoreTitle: 'Gemiddelde telling',
    percentile90Title: '90ste Persentiel',
    globalAverage: 'Globale gemiddelde',
    percentile90: '90ste Persentiel',
    manifestations: 'Manifestasies',
    activePeers: 'Aktiewe eweknieë',
    categoryRankings: 'Kategorie Ranglys'
  },
  focusAreas: {
    title: 'Fokusareas',
    subtitle:
      'Jou 3 kategorieë met die laagste telling – die verbetering hiervan lei tot die grootste winste.',
    empty: 'Voltooi meer sessies om gepersonaliseerde fokusarea-aanbevelings te sien.'
  },
  sessions: {
    recent: 'Onlangse sessies',
    deselectAll: 'Ontkies Alles',
    selectAll: 'Kies Alles',
    deleteCount: 'Vee {count} uit',
    cancel: 'Kanselleer',
    select: 'Kies',
    deleting: 'Vee tans uit …'
  },
  settings: {
    title: 'Programinstellings',
    close: 'Maak instellings toe',
    dataManagement: 'Databestuur',
    saveLastSession: 'Stoor laaste sessie',
    saveLastSessionDesc: 'Vul vooraf antwoorde van jou mees onlangse voltooide sessie in.',
    resetProgress: 'Stel vordering terug',
    resetProgressDesc: 'Vee alle gestoorde antwoorde uit en begin nuut.',
    goals: 'Doelwitte',
    targetScore: 'Teikentelling',
    targetScoreDesc:
      "Stel 'n doeltelling (1 000–10 000) om jou vordering op die kontroleskerm na te spoor.",
    set: 'Stel',
    clearGoal: 'Duidelik',
    currentTarget: 'Huidige teiken:',
    on: 'Aan',
    off: 'Af',
    version: 'Manifestasie-algoritme {version}',
    clearAllAnswers: 'Vee alle antwoorde uit',
    clearConfirmTitle: 'Vee alle antwoorde uit',
    clearConfirmMessage:
      'Dit sal al jou huidige antwoorde permanent uitvee en kan nie ontdoen word nie.',
    clearConfirmLabel: 'Duidelik',
    keepAnswers: 'Hou antwoorde',
    language: 'Taal',
    languageDesc: 'Kies die vertoontaal vir die toepassing.',
    languageCount: '{count} tale beskikbaar',
    goalErrorRange: "Voer asseblief 'n telling tussen 1 000 en 10 000 in."
  },
  questionnaire: {
    saving: 'Stoor tans …',
    saved: 'Gestoor',
    progressText: '{pct}% voltooi ({answered}/{total})',
    progressAria: 'Assessering voltooiing vordering',
    maxScore: 'Maksimum: {score}',
    answerToScore: 'Antwoord om te score',
    currentScore: 'Huidige telling',
    scrollAll: 'Rollees Alles',
    stepByStep: 'Stap vir Stap',
    questionOf: 'Vraag {current} van {total}',
    previous: '← Vorige',
    next: 'Volgende →',
    completeAssessment: 'Voltooi Assessering',
    startFresh: 'Wil jy nuut begin?',
    resetAllAnswers: 'Stel alle antwoorde terug',
    resetTitle: 'Stel alle antwoorde terug?',
    resetMessage:
      'Dit sal elke antwoord uitvee en van voor af begin. Dit kan nie ongedaan gemaak word nie.',
    resetLabel: 'Stel terug',
    scoreQuality: {
      notStarted: 'Nie begin nie',
      manifesting: 'Manifesteer ❆',
      aligned: 'Belyn',
      building: 'Gebou',
      startingOut: 'Begin uit'
    },
    submitHint: {
      zero: '0 van {total} vrae beantwoord — onbeantwoorde vrae verstek tot minimum',
      partial:
        '{remaining} vraag oor — onbeantwoorde vrae verstek op minimum | {remaining} vrae oor — onbeantwoorde vrae verstek tot minimum',
      complete: 'Alle vrae beantwoord - gereed om in te dien!'
    },
    submitTitle: {
      zero: "Beantwoord 'n paar vrae om jou assessering te voltooi",
      partial: '{remaining} vraag oor | {remaining} vrae oor',
      complete: 'Dien jou voltooide assessering in'
    },
    submitError: 'Kon nie sessie stoor nie: {error}',
    dotTitle: 'Vraag {index}',
    dotAria: 'Gaan na vraag {index}',
    keyboardHint: 'Wenk: Gebruik ← → om te navigeer · 1–9 / 0 om te gradeer'
  },
  onboarding: {
    step0Title: 'Welkom by die Manifestasie-algoritme',
    step0Body1:
      'Hierdie hulpmiddel help jou om te meet hoe in ooreenstemming jou ingesteldheid, gewoontes en daaglikse aksies is met die bereiking van jou doelwitte. Beantwoord elke vraag eerlik om jou huidige telling te kry.',
    step0Body2:
      'Voltooi die vraelys met gereelde tussenposes om jou groei oor tyd na te spoor en te sien watter areas die meeste aandag benodig.',
    step1Title: 'Hoe telling werk',
    step1Body:
      "Elke vraag is 'n vasgestelde aantal punte werd. Gradeer jouself op 'n skaal van 1–10 vir elke vraag. 'n Gradering van 10 beteken dat jy daardie beginsel ten volle beliggaam; 1 beteken dat jy nie begin het nie.",
    step1TargetHint: '🎯 Teiken: {target} | Maksimum: {maximum}',
    excellent: 'Uitstekend',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Sterk belyning — hou aan',
    good: 'Goed',
    goodRange: '4 001 – 7 000',
    goodNote: 'Soliede fondament - ruimte om te groei',
    needsWork: 'Benodig werk',
    needsWorkRange: '0 – 4 000',
    needsWorkNote: 'Fokus eers op grondbeginsels',
    step2Title: 'Jou data bly privaat',
    step2Body1:
      "Al jou antwoorde en tellinggeskiedenis word plaaslik op jou toestel gestoor met behulp van 'n geënkripteerde SQLite-databasis. Niks word na enige bediener gestuur sonder jou uitdruklike toestemming nie.",
    step2Body2:
      "Die opsionele eweknie-deelfunksie laat jou anonieme totale tellings van ander gebruikers sien. Dit deel slegs 'n kriptografies ondertekende opsomming - nooit jou individuele antwoorde nie.",
    readyText: 'Klaar? Kom ons kry jou basislyntelling.',
    skipIntro: 'Slaan intro oor',
    next: 'Volgende',
    getStarted: 'Begin'
  },
  sharing: {
    title: 'Anonieme netwerkdeling',
    privacyFirst: '🔒 Privaatheid-eerste',
    description:
      'Dra opsioneel jou resultate anoniem by tot die globale netwerk. Geen naam, e-pos, IP-adres of toestel-ID word ooit gedeel nie.',
    enabled: 'Deling geaktiveer — dra by tot netwerk',
    disabled: 'Deling gedeaktiveer (verstek)',
    activeBadge: '✓ Jou anonieme tellings word met eweknieë gedeel',
    enableNote: 'Aktiveer om jou persentielranglys in vergelyking met die globale netwerk te sien.'
  },
  category: {
    back: '‹ Terug',
    history: 'Geskiedenis',
    date: 'Datum',
    score: 'Telling',
    loading: 'Laai tans...',
    notEnoughData: 'Nie genoeg data nie',
    noData: 'Geen data gevind vir "{category}" nie.',
    goToDashboard: 'Gaan na Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Bekyk volle skerm',
    exitFullscreen: 'Verlaat volskerm',
    copyChart: 'Kopieer grafiek',
    exportChart: 'Uitvoer grafiek',
    exportDefault: '⬇ Uitvoer',
    exportExcel: '📊 Voer Excel uit',
    exportCsv: '📄 Voer CSV uit',
    exportPdf: '📑 Voer PDF uit',
    exportHtml: '🌐 Voer HTML uit',
    copied: 'Grafiek na knipbord gekopieer',
    copyFailed: 'Kopieer het misluk – knipbord nie beskikbaar nie',
    saveCancelled: 'Stoor is gekanselleer'
  },
  resume: {
    continueLastSession: 'Gaan voort vanaf laaste sessie?',
    welcomeBack: 'Welkom Terug!',
    historicalBody:
      "Jou antwoorde van jou laaste voltooide sessie is vooraf gelaai. Wil jy daardie waardes as 'n beginpunt behou, of met 'n heeltemal leë vraelys begin?",
    activeBody:
      "Jy het 'n sessie aan die gang. Wil jy voortgaan waar jy opgehou het, of 'n nuwe assessering begin?",
    clearWarning: '⚠️ Dit sal alle huidige antwoorde uitvee. Is jy seker?',
    yesStartFresh: 'Ja, Begin Vars',
    cancel: 'Kanselleer',
    keepLastValues: 'Hou Laaste Waardes',
    resumeSession: 'Hervat sessie',
    startFresh: 'Begin vars'
  },
  questionItem: {
    pointsSuffix: 'pts',
    low: 'Laag',
    high: 'Hoog',
    rateAria: 'Gradeer {question}'
  },
  dateRange: {
    rangeLabel: 'Reeks:',
    startDate: 'Begin datum',
    endDate: 'Einddatum',
    presets: {
      '7d': '7 Dae',
      '30d': '30 Dae',
      '90d': '90 dae',
      '1y': '1 Jaar',
      all: 'Alle tye',
      custom: 'Pasgemaak'
    }
  },
  update: {
    availableTitle: 'v{version} is beskikbaar!',
    releaseNotesFallback: 'Besoek die vrystellingbladsy om die nuutste weergawe af te laai.',
    getUpdate: 'Kry Update',
    dismiss: 'Verwerp'
  },
  questions: {
    '1': 'Bemeester die basiese beginsels',
    '2': 'Aktiveer en verlig woorde',
    '3': 'Vind Pyn & Kontrakteer Energie',
    '4': 'Definieer wat jy wil hê',
    '5': 'Skryf neer wat jy wil hê',
    '6': 'Moet jou droom nie met ander deel nie',
    '7': "Kry 'n brandende begeerte vir jou doelwit",
    '8': 'Doel moet in Sweet Spot wees',
    '9': "Neem 'n besluit",
    '10': 'Sien/voel goed in besit van jou doelwit',
    '11': 'Los gehegtheid aan die uitkoms',
    '12': 'Laat die HOE toe om homself voor te stel',
    '13': 'Ken die verskil tussen Droom en Hoofdoel',
    '14': 'Wees gefokus / doelgerigtheid',
    '15': 'Daaglikse DOEN lys van prioriteite',
    '16': 'Grafiek vordering / Ken die telling',
    '17': 'Gebruik Momentum-siklus van sukses',
    '18': 'Droombou - Droomboek en Visiebord',
    '19': 'Prop in System',
    '20': 'Wetenskap van Persoonlike Bemeestering Kursus',
    '21': 'Kyk na die woorde wat jy spreek – wat jy sê is wat jy kry',
    '22': 'Fisiologie / Trek aan vir sukses',
    '23': 'Duidelike teenbedoelings',
    '24': 'Ontwaak jou innerlike krag: superkragprosesse',
    '25': 'Uitgesaai op Alpha-theta breingolf',
    '26': 'Hou op om jou storie van wee te vertel',
    '27': 'Toon waardering / dankbaarheid',
    '28': 'Vervang mislukkingsgewoontes met suksesgewoontes (versnellerprosesse)',
    '29': "Skep 'n meesterbrein",
    '30': 'Kyk na suksesvolle mense/leerling',
    '31': 'Luister na/lees suksesverhale',
    '32': 'Gee eers weg wat jy wil hê',
    '33': 'Doen Dit Nou Mentaliteit',
    '34': 'Sorg vir jou liggaam',
    '35': 'Vind die goud in teëspoed',
    '36': 'Vee Samskaras uit Veld',
    '37': 'Neem 100% verantwoordelikheid',
    '38': 'Aantrekkerveldgenerators',
    '39': "Sluit aan by 'n klub wat jou met 'n kragbron verbind",
    '40': 'Leef die lewe met doelbewuste bedoeling - wees in die huidige tyd',
    '1a': 'Na wie luister jy?',
    '1b': 'Onderrigbaarheidsindeks',
    '1c': 'Opleidingsbalansskaal',
    '1d': 'Onbewustelike bevoegdheid',
    '19a': 'Lees boeke',
    '19b': "Luister na oudio's",
    '19c': 'Woon geleenthede by (maandeliks)',
    '19d': 'Gee en ontvang erkenning / uitgebreide goue reël',
    '19e': 'Ontwikkel verhoudings met eendersdenkende mense',
    '23a': 'Geldprosesse',
    '23b': 'Verhoudingsprosesse',
    '23c': 'Leierskapprosesse',
    '23d': 'Kommunikasieprosesse',
    '23e': 'Gesondheidsprosesse',
    '23f': 'Geestelike bewusmakingsprosesse',
    '23g': 'Droomprosesse',
    '23h': 'Organisasie & Fokusprosesse'
  }
};

export default af;

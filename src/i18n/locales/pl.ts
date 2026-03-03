/**
 * Auto-converted locale module for pl.
 */
import type { Messages } from './en';

const pl: Messages = {
  nav: {
    questionnaire: 'Kwestionariusz',
    history: 'Historia',
    settings: 'Ustawienia'
  },
  app: {
    name: 'Algorytm manifestacji',
    unexpectedError: 'Wystąpił nieoczekiwany błąd.'
  },
  home: {
    subtitle: 'Oceń każdy obszar swojego życia – odkryj swój wynik dopasowania'
  },
  dashboard: {
    title: 'Historia śledzenia algorytmu manifestacji',
    subtitle: 'Śledź swoje postępy w czasie',
    loading: 'Ładowanie Twojej historii…',
    noData: 'Brak danych za ten okres',
    progressTrend: 'Trend postępu',
    progressToGoal: 'Postęp do celu',
    ofGoal: '{pct}% celu',
    goalReached: '🎯 Cel osiągnięty!',
    categoryBreakdown: 'Podział kategorii',
    noSessionsRange: 'Brak sesji w tym zakresie',
    tryWiderRange: 'Wypróbuj szerszy zakres lub wybierz inny okres.',
    noSessionsYet: 'Nie ma jeszcze sesji',
    completeFirst: 'Ukończ pierwszą ocenę, aby zobaczyć tutaj swoje postępy i trendy.',
    startFirst: 'Rozpocznij pierwszą ocenę',
    export: {
      date: 'Data',
      time: 'Czas',
      totalScore: 'Wynik całkowity',
      duration: 'Czas trwania (min)',
      notes: 'Notatki'
    }
  },
  stats: {
    averageScore: 'Średni wynik',
    medianScore: 'Średni wynik',
    highestScore: 'Najwyższy wynik',
    totalSessions: 'Łączna liczba sesji'
  },
  network: {
    rankings: 'Rankingi sieci',
    searchingPeers: 'Szukanie rówieśników...',
    searching: 'Wyszukiwanie...',
    online: 'W Internecie',
    peers: '{count} rówieśnicy',
    results: 'Wyniki {count}',
    avgShort: 'Śr',
    p90Short: 'P90',
    averageScoreTitle: 'Średni wynik',
    percentile90Title: '90. percentyl',
    globalAverage: 'Średnia globalna',
    percentile90: '90. percentyl',
    manifestations: 'Manifestacje',
    activePeers: 'Aktywni rówieśnicy',
    categoryRankings: 'Rankingi kategorii'
  },
  focusAreas: {
    title: 'Obszary ostrości',
    subtitle:
      'Twoje 3 kategorie o najniższych wynikach — ulepszanie ich zapewnia największe korzyści.',
    empty:
      'Ukończ więcej sesji, aby zobaczyć spersonalizowane rekomendacje dotyczące obszarów zainteresowania.'
  },
  sessions: {
    recent: 'Ostatnie sesje',
    deselectAll: 'Odznacz wszystko',
    selectAll: 'Wybierz wszystko',
    deleteCount: 'Usuń {count}',
    cancel: 'Anuluj',
    select: 'Wybierz',
    deleting: 'Usuwanie…'
  },
  settings: {
    title: 'Ustawienia aplikacji',
    close: 'Zamknij ustawienia',
    dataManagement: 'Zarządzanie danymi',
    saveLastSession: 'Zapisz ostatnią sesję',
    saveLastSessionDesc: 'Wstępnie wypełnij odpowiedzi z ostatniej zakończonej sesji.',
    resetProgress: 'Zresetuj postęp',
    resetProgressDesc: 'Usuń wszystkie zapisane odpowiedzi i zacznij od nowa.',
    goals: 'Cele',
    targetScore: 'Wynik docelowy',
    targetScoreDesc:
      'Ustaw wynik celu (1 000–10 000), aby śledzić swoje postępy na pulpicie nawigacyjnym.',
    set: 'Zestaw',
    clearGoal: 'Jasne',
    currentTarget: 'Aktualny cel:',
    on: 'Włączone',
    off: 'Wyłączone',
    version: 'Algorytm manifestacji {version}',
    clearAllAnswers: 'Wyczyść wszystkie odpowiedzi',
    clearConfirmTitle: 'Wyczyść wszystkie odpowiedzi',
    clearConfirmMessage:
      'Spowoduje to trwałe usunięcie wszystkich Twoich bieżących odpowiedzi i nie będzie można tego cofnąć.',
    clearConfirmLabel: 'Jasne',
    keepAnswers: 'Zachowaj odpowiedzi',
    language: 'Język',
    languageDesc: 'Wybierz język wyświetlania aplikacji.',
    languageCount: '{count} dostępne języki',
    goalErrorRange: 'Wprowadź wynik w przedziale od 1000 do 10 000.'
  },
  questionnaire: {
    saving: 'Zapisywanie...',
    saved: 'Zapisano',
    progressText: '{pct}% ukończono ({answered}/{total})',
    progressAria: 'Postęp w ukończeniu oceny',
    maxScore: 'Maks.: {score}',
    answerToScore: 'Odpowiedź na wynik',
    currentScore: 'Aktualny wynik',
    scrollAll: 'Przewiń wszystko',
    stepByStep: 'Krok po kroku',
    questionOf: 'Pytanie {current} do {total}',
    previous: '← Poprzedni',
    next: 'Dalej →',
    completeAssessment: 'Pełna ocena',
    startFresh: 'Chcesz zacząć od nowa?',
    resetAllAnswers: 'Zresetuj wszystkie odpowiedzi',
    resetTitle: 'Zresetować wszystkie odpowiedzi?',
    resetMessage:
      'Spowoduje to wyczyszczenie każdej odpowiedzi i rozpoczęcie od zera. Tego nie można cofnąć.',
    resetLabel: 'Zresetuj',
    scoreQuality: {
      notStarted: 'Nie rozpoczęte',
      manifesting: 'Manifestowanie ❆',
      aligned: 'Wyrównane',
      building: 'Budynek',
      startingOut: 'Zaczynam'
    },
    submitHint: {
      zero: 'Odpowiedziano na 0 z pytań {total} — liczba pytań bez odpowiedzi jest domyślnie minimalna',
      partial:
        '{remaining} pytanie pozostało — domyślnie liczba pytań bez odpowiedzi wynosi minimum | {remaining} pozostałe pytania — domyślnie liczba pytań bez odpowiedzi wynosi minimum',
      complete: 'Odpowiedzi na wszystkie pytania — gotowe do przesłania!'
    },
    submitTitle: {
      zero: 'Odpowiedz na kilka pytań, aby zakończyć ocenę',
      partial: '{remaining} pozostało pytanie | {remaining} pozostały pytania',
      complete: 'Prześlij wypełnioną ocenę'
    },
    submitError: 'Nie udało się zapisać sesji: {error}',
    dotTitle: 'Pytanie {index}',
    dotAria: 'Przejdź do pytania {index}',
    keyboardHint: 'Wskazówka: użyj ← → do nawigacji · 1–9 / 0, aby ocenić'
  },
  onboarding: {
    step0Title: 'Witamy w Algorytmie Manifestacji',
    step0Body1:
      'To narzędzie pomaga zmierzyć, w jakim stopniu Twój sposób myślenia, nawyki i codzienne działania są dostosowane do osiągnięcia Twoich celów. Odpowiedz szczerze na każde pytanie, aby uzyskać aktualny wynik.',
    step0Body2:
      'Wypełniaj kwestionariusz w regularnych odstępach czasu, aby śledzić swój rozwój w czasie i zobaczyć, które obszary wymagają najwięcej uwagi.',
    step1Title: 'Jak działa punktacja',
    step1Body:
      'Każde pytanie jest warte określoną liczbę punktów. Oceń siebie w skali od 1 do 10 przy każdym pytaniu. Ocena 10 oznacza, że ​​w pełni ucieleśniasz tę zasadę; 1 oznacza, że ​​jeszcze nie zacząłeś.',
    step1TargetHint: '🎯 Cel: {target} | Maksymalnie: {maximum}',
    excellent: 'Znakomicie',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Mocne dopasowanie – kontynuuj',
    good: 'Dobrze',
    goodRange: '4001 – 7000',
    goodNote: 'Solidny fundament — przestrzeń do rozwoju',
    needsWork: 'Potrzebuje pracy',
    needsWorkRange: '0 – 4000',
    needsWorkNote: 'Najpierw skup się na podstawach',
    step2Title: 'Twoje dane pozostają prywatne',
    step2Body1:
      'Wszystkie Twoje odpowiedzi i historia wyników są przechowywane lokalnie na Twoim urządzeniu przy użyciu zaszyfrowanej bazy danych SQLite. Nic nie jest wysyłane na żaden serwer bez Twojej wyraźnej zgody.',
    step2Body2:
      'Opcjonalna funkcja udostępniania peer-to-peer pozwala zobaczyć anonimowe zbiorcze wyniki innych użytkowników. Udostępnia jedynie kryptograficznie podpisane podsumowanie — nigdy indywidualne odpowiedzi.',
    readyText: 'Gotowy? Obliczmy Twój wynik bazowy.',
    skipIntro: 'Pomiń wprowadzenie',
    next: 'Następny',
    getStarted: 'Rozpocznij'
  },
  sharing: {
    title: 'Anonimowe udostępnianie sieci',
    privacyFirst: '🔒 Prywatność przede wszystkim',
    description:
      'Opcjonalnie możesz udostępnić swoje wyniki anonimowo w sieci globalnej. Nigdy nie udostępnia się żadnego imienia i nazwiska, adresu e-mail, adresu IP ani identyfikatora urządzenia.',
    enabled: 'Udostępnianie włączone — współtworzenie sieci',
    disabled: 'Udostępnianie wyłączone (domyślnie)',
    activeBadge: '✓ Twoje zanonimizowane wyniki są udostępniane rówieśnikom',
    enableNote: 'Włącz, aby zobaczyć swoją pozycję percentylową w porównaniu z siecią globalną.'
  },
  category: {
    back: '‹ Powrót',
    history: 'Historia',
    date: 'Data',
    score: 'Wynik',
    loading: 'Ładowanie...',
    notEnoughData: 'Za mało danych',
    noData: 'Nie znaleziono danych dla „{category}”.',
    goToDashboard: 'Przejdź do Panelu'
  },
  chartActions: {
    viewFullscreen: 'Wyświetl na pełnym ekranie',
    exitFullscreen: 'Wyjdź z pełnego ekranu',
    copyChart: 'Kopiuj wykres',
    exportChart: 'Eksportuj wykres',
    exportDefault: '⬇ Eksportuj',
    exportExcel: '📊 Eksportuj Excela',
    exportCsv: '📄 Eksportuj plik CSV',
    exportPdf: '📑 Eksportuj PDF',
    exportHtml: '🌐 Eksportuj HTML',
    copied: 'Wykres skopiowany do schowka',
    copyFailed: 'Kopiowanie nie powiodło się — schowek jest niedostępny',
    saveCancelled: 'Zapis anulowany'
  },
  resume: {
    continueLastSession: 'Kontynuować od ostatniej sesji?',
    welcomeBack: 'Witamy z powrotem!',
    historicalBody:
      'Twoje odpowiedzi z ostatniej zakończonej sesji zostały wstępnie załadowane. Czy chcesz zachować te wartości jako punkt wyjścia, czy zacząć od całkowicie pustego kwestionariusza?',
    activeBody:
      'Masz sesję w toku. Czy chcesz wznowić od miejsca, w którym przerwałeś, czy rozpocząć nową ocenę?',
    clearWarning: '⚠️ Spowoduje to usunięcie wszystkich bieżących odpowiedzi. Czy jesteś pewien?',
    yesStartFresh: 'Tak, zacznij od nowa',
    cancel: 'Anuluj',
    keepLastValues: 'Zachowaj ostatnie wartości',
    resumeSession: 'Wznów sesję',
    startFresh: 'Zacznij od nowa'
  },
  questionItem: {
    pointsSuffix: 'pkt',
    low: 'Niski',
    high: 'Wysoka',
    rateAria: 'Oceń {question}'
  },
  dateRange: {
    rangeLabel: 'Zasięg:',
    startDate: 'Data rozpoczęcia',
    endDate: 'Data końcowa',
    presets: {
      '7d': '7 dni',
      '30d': '30 dni',
      '90d': '90 dni',
      '1y': '1 rok',
      all: 'Cały czas',
      custom: 'Niestandardowe'
    }
  },
  update: {
    availableTitle: 'v{version} jest dostępny!',
    releaseNotesFallback: 'Odwiedź stronę wydania, aby pobrać najnowszą wersję.',
    getUpdate: 'Pobierz aktualizację',
    dismiss: 'Odrzuć'
  },
  questions: {
    '1': 'Opanuj podstawy',
    '2': 'Aktywuj i oświetlaj słowa',
    '3': 'Znajdź Ból i Skurcz Energię',
    '4': 'Określ, czego chcesz',
    '5': 'Zapisuj, czego chcesz',
    '6': 'Nie dziel się swoim marzeniem z innymi',
    '7': 'Zrób palące pragnienie osiągnięcia swojego celu',
    '8': 'Cel musi być w Sweet Spot',
    '9': 'Podejmij decyzję',
    '10': 'Widz/Czuj się dobrze, mając swój cel',
    '11': 'Uwolnij przywiązanie do wyniku',
    '12': 'Pozwól, by JAK się ujawniło',
    '13': 'Poznaj różnicę między Dream a Chief Aim',
    '14': 'Bądź skupiony / Jednoczość celu',
    '15': 'Codzienna lista priorytetów zadań do zrobienia',
    '16': 'Postępy na listach / Poznaj wynik',
    '17': 'Wykorzystaj cykl sukcesu Momentum',
    '18': 'Dream Build - Dream Book i tablica wizji',
    '19': 'Podłączenie do systemu',
    '20': 'Kurs Nauki Osobistego Mistrzostwa',
    '21': 'Uważaj, co mówisz – co mówisz, to dostajesz',
    '22': 'Fizjologia / Ubierz się na sukces',
    '23': 'Jasne przeciwne intencje',
    '24': 'Obudź swoją Wewnętrzną Moc: Procesy supermocy',
    '25': 'Emisja na falach mózgowych Alpha-theta',
    '26': 'Przestań opowiadać swoją historię nieszczęścia',
    '27': 'Okazuj wdzięczność / wdzięczność',
    '28': 'Zastąpienie nawyków niepowodzeń nawykami sukcesu (procesy akceleracyjne)',
    '29': 'Stwórz Mastermind',
    '30': 'Obejrzyj Odnoszących sukcesy ludzi/Praktykant',
    '31': 'Posłuchaj/Przeczytaj historie sukcesu',
    '32': 'Oddaj najpierw to, czego chcesz.',
    '33': 'Mentalność "zrób to teraz"',
    '34': 'Dbaj o swoje ciało',
    '35': 'Znajdź złoto w przeciwnościach',
    '36': 'Czyste Samskary z Field',
    '37': 'Weź na siebie 100% odpowiedzialności',
    '38': 'Generatory pola atraktora',
    '39': 'Dołącz do Klubu, który łączy cię ze Źródłem Mocy',
    '40': 'Żyj z przemyślanym zamiarem – bądź w teraźniejszości',
    '1a': 'Kogo słuchasz?',
    '1b': 'Wskaźnik Nauczania',
    '1c': 'Waga równowagi treningowej',
    '1d': 'Nieświadoma kompetencja',
    '19a': 'Czytaj książki',
    '19b': 'Słuchaj nagrań audio',
    '19c': 'Udział w wydarzeniach (miesięcznie)',
    '19d': 'Dawanie i przyjmowanie wyróżnień / rozszerzona Złota Zasada',
    '19e': 'Buduj relacje z osobami o podobnych poglądach',
    '23a': 'Procesy pieniężne',
    '23b': 'Procesy relacji',
    '23c': 'Procesy przywódcze',
    '23d': 'Procesy komunikacyjne',
    '23e': 'Procesy zdrowotne',
    '23f': 'Procesy świadomości duchowej',
    '23g': 'Procesy snu',
    '23h': 'Procesy organizacji i skupienia'
  }
};

export default pl;

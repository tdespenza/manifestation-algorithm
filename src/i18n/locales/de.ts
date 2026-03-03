/**
 * Auto-converted locale module for de.
 */
import type { Messages } from './en';

const de: Messages = {
  nav: {
    questionnaire: 'Fragebogen',
    history: 'Geschichte',
    settings: 'Einstellungen'
  },
  app: {
    name: 'Manifestationsalgorithmus',
    unexpectedError: 'Es ist ein unerwarteter Fehler aufgetreten.'
  },
  home: {
    subtitle: 'Bewerten Sie jeden Bereich Ihres Lebens – entdecken Sie Ihren Ausrichtungswert'
  },
  dashboard: {
    title: 'Verlauf der Verfolgung des Manifestationsalgorithmus',
    subtitle: 'Verfolgen Sie Ihren Fortschritt im Laufe der Zeit',
    loading: 'Ihr Verlauf wird geladen…',
    noData: 'Keine Daten für diesen Zeitraum',
    progressTrend: 'Fortschrittstrend',
    progressToGoal: 'Fortschritt zum Ziel',
    ofGoal: '{pct} % des Ziels',
    goalReached: '🎯 Ziel erreicht!',
    categoryBreakdown: 'Aufschlüsselung nach Kategorien',
    noSessionsRange: 'Keine Sitzungen in diesem Bereich',
    tryWiderRange:
      'Versuchen Sie es mit einem größeren Bereich oder wählen Sie einen anderen Zeitraum aus.',
    noSessionsYet: 'Noch keine Sitzungen',
    completeFirst:
      'Füllen Sie hier Ihre erste Bewertung aus, um Ihre Fortschritte und Trends zu sehen.',
    startFirst: 'Beginnen Sie mit der ersten Bewertung',
    export: {
      date: 'Datum',
      time: 'Zeit',
      totalScore: 'Gesamtpunktzahl',
      duration: 'Dauer (Min.)',
      notes: 'Notizen'
    }
  },
  stats: {
    averageScore: 'Durchschnittliche Punktzahl',
    medianScore: 'Medianwert',
    highestScore: 'Höchste Punktzahl',
    totalSessions: 'Gesamtzahl der Sitzungen'
  },
  network: {
    rankings: 'Netzwerk-Rankings',
    searchingPeers: 'Auf der Suche nach Gleichgesinnten...',
    searching: 'Suche...',
    online: 'Online',
    peers: '{count} Kollegen',
    results: '{count} Ergebnisse',
    avgShort: 'Durchschn',
    p90Short: 'P90',
    averageScoreTitle: 'Durchschnittliche Punktzahl',
    percentile90Title: '90. Perzentil',
    globalAverage: 'Globaler Durchschnitt',
    percentile90: '90. Perzentil',
    manifestations: 'Manifestationen',
    activePeers: 'Aktive Kollegen',
    categoryRankings: 'Kategorie-Rankings'
  },
  focusAreas: {
    title: 'Schwerpunktbereiche',
    subtitle:
      'Ihre drei Kategorien mit der niedrigsten Punktzahl – eine Verbesserung dieser Kategorien führt zu den größten Gewinnen.',
    empty:
      'Absolvieren Sie weitere Sitzungen, um personalisierte Empfehlungen für Schwerpunktbereiche zu erhalten.'
  },
  sessions: {
    recent: 'Aktuelle Sitzungen',
    deselectAll: 'Alle abwählen',
    selectAll: 'Wählen Sie „Alle“ aus',
    deleteCount: '{count} löschen',
    cancel: 'Abbrechen',
    select: 'Auswählen',
    deleting: 'Löschen…'
  },
  settings: {
    title: 'App-Einstellungen',
    close: 'Einstellungen schließen',
    dataManagement: 'Datenmanagement',
    saveLastSession: 'Letzte Sitzung speichern',
    saveLastSessionDesc:
      'Füllen Sie die Antworten aus Ihrer zuletzt abgeschlossenen Sitzung vorab aus.',
    resetProgress: 'Fortschritt zurücksetzen',
    resetProgressDesc: 'Löschen Sie alle gespeicherten Antworten und beginnen Sie neu.',
    goals: 'Ziele',
    targetScore: 'Zielpunktzahl',
    targetScoreDesc:
      'Legen Sie einen Zielwert (1.000–10.000) fest, um Ihren Fortschritt auf dem Dashboard zu verfolgen.',
    set: 'Set',
    clearGoal: 'Klar',
    currentTarget: 'Aktuelles Ziel:',
    on: 'Auf',
    off: 'Aus',
    version: 'Manifestationsalgorithmus {version}',
    clearAllAnswers: 'Alle Antworten löschen',
    clearConfirmTitle: 'Alle Antworten löschen',
    clearConfirmMessage:
      'Dadurch werden alle Ihre aktuellen Antworten dauerhaft gelöscht und können nicht rückgängig gemacht werden.',
    clearConfirmLabel: 'Klar',
    keepAnswers: 'Antworten behalten',
    language: 'Sprache',
    languageDesc: 'Wählen Sie die Anzeigesprache für die Anwendung.',
    languageCount: '{count} Sprachen verfügbar',
    goalErrorRange: 'Bitte geben Sie eine Punktzahl zwischen 1.000 und 10.000 ein.'
  },
  questionnaire: {
    saving: 'Sparen...',
    saved: 'Gespeichert',
    progressText: '{pct}% abgeschlossen ({answered}/{total})',
    progressAria: 'Fortschritt beim Abschluss der Bewertung',
    maxScore: 'Max: {score}',
    answerToScore: 'Antworten Sie, um zu punkten',
    currentScore: 'Aktueller Punktestand',
    scrollAll: 'Alles scrollen',
    stepByStep: 'Schritt für Schritt',
    questionOf: 'Frage {current} von {total}',
    previous: '← Zurück',
    next: 'Weiter →',
    completeAssessment: 'Vollständige Bewertung',
    startFresh: 'Möchten Sie neu anfangen?',
    resetAllAnswers: 'Alle Antworten zurücksetzen',
    resetTitle: 'Alle Antworten zurücksetzen?',
    resetMessage:
      'Dadurch wird jede Antwort gelöscht und Sie können von vorne beginnen. Dies kann nicht rückgängig gemacht werden.',
    resetLabel: 'Zurücksetzen',
    scoreQuality: {
      notStarted: 'Nicht gestartet',
      manifesting: 'Manifestieren ❆',
      aligned: 'Ausgerichtet',
      building: 'Gebäude',
      startingOut: 'Der Anfang'
    },
    submitHint: {
      zero: '0 von {total} Fragen beantwortet – unbeantwortete Fragen standardmäßig auf Minimum',
      partial:
        '{remaining} verbleibende Frage – unbeantwortete Fragen sind standardmäßig auf das Minimum | beschränkt {remaining} verbleibende Fragen – unbeantwortete Fragen werden standardmäßig auf das Minimum reduziert',
      complete: 'Alle Fragen beantwortet – bereit zum Einreichen!'
    },
    submitTitle: {
      zero: 'Beantworten Sie einige Fragen, um Ihre Bewertung abzuschließen',
      partial: '{remaining} verbleibende Frage | Es verbleiben noch {remaining} Fragen',
      complete: 'Reichen Sie Ihre vollständige Beurteilung ein'
    },
    submitError: 'Sitzung konnte nicht gespeichert werden: {error}',
    dotTitle: 'Frage {index}',
    dotAria: 'Gehe zu Frage {index}',
    keyboardHint: 'Tipp: Verwenden Sie ← → zum Navigieren · 1–9 / 0 zum Bewerten'
  },
  onboarding: {
    step0Title: 'Willkommen beim Manifestationsalgorithmus',
    step0Body1:
      'Mit diesem Tool können Sie messen, wie gut Ihre Denkweise, Gewohnheiten und täglichen Handlungen auf das Erreichen Ihrer Ziele ausgerichtet sind. Beantworten Sie jede Frage ehrlich, um Ihre aktuelle Punktzahl zu erhalten.',
    step0Body2:
      'Füllen Sie den Fragebogen in regelmäßigen Abständen aus, um Ihr Wachstum im Laufe der Zeit zu verfolgen und herauszufinden, welche Bereiche die meiste Aufmerksamkeit benötigen.',
    step1Title: 'So funktioniert das Scoring',
    step1Body:
      'Jede Frage ist eine festgelegte Punktzahl wert. Bewerten Sie sich selbst für jede Frage auf einer Skala von 1–10. Eine Bewertung von 10 bedeutet, dass Sie dieses Prinzip voll und ganz verkörpern; 1 bedeutet, dass Sie noch nicht begonnen haben.',
    step1TargetHint: '🎯 Ziel: {target} | Maximal: {maximum}',
    excellent: 'Ausgezeichnet',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Starke Ausrichtung – weitermachen',
    good: 'Gut',
    goodRange: '4.001 – 7.000',
    goodNote: 'Solides Fundament – Raum zum Wachsen',
    needsWork: 'Braucht Arbeit',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Konzentrieren Sie sich zunächst auf die Grundlagen',
    step2Title: 'Ihre Daten bleiben privat',
    step2Body1:
      'Alle Ihre Antworten und der Punkteverlauf werden mithilfe einer verschlüsselten SQLite-Datenbank lokal auf Ihrem Gerät gespeichert. Ohne Ihre ausdrückliche Zustimmung wird nichts an einen Server gesendet.',
    step2Body2:
      'Mit der optionalen Peer-to-Peer-Sharing-Funktion können Sie anonymisierte aggregierte Ergebnisse anderer Benutzer anzeigen. Es wird nur eine kryptografisch signierte Zusammenfassung geteilt – niemals Ihre individuellen Antworten.',
    readyText: 'Bereit? Lassen Sie uns Ihren Basiswert ermitteln.',
    skipIntro: 'Einführung überspringen',
    next: 'Als nächstes',
    getStarted: 'Legen Sie los'
  },
  sharing: {
    title: 'Anonyme Netzwerkfreigabe',
    privacyFirst: '🔒 Datenschutz geht vor',
    description:
      'Tragen Sie Ihre Ergebnisse optional anonym in das globale Netzwerk ein. Es werden niemals Name, E-Mail-Adresse, IP-Adresse oder Geräte-ID weitergegeben.',
    enabled: 'Teilen aktiviert – Beitrag zum Netzwerk',
    disabled: 'Teilen deaktiviert (Standard)',
    activeBadge: '✓ Ihre anonymisierten Ergebnisse werden mit Kollegen geteilt',
    enableNote:
      'Aktivieren Sie diese Option, um Ihren prozentualen Rang im Vergleich zum globalen Netzwerk anzuzeigen.'
  },
  category: {
    back: '‹ Zurück',
    history: 'Geschichte',
    date: 'Datum',
    score: 'Punktzahl',
    loading: 'Laden...',
    notEnoughData: 'Nicht genügend Daten',
    noData: 'Für „{category}“ wurden keine Daten gefunden.',
    goToDashboard: 'Gehen Sie zum Dashboard'
  },
  chartActions: {
    viewFullscreen: 'Vollbild anzeigen',
    exitFullscreen: 'Verlassen Sie den Vollbildmodus',
    copyChart: 'Diagramm kopieren',
    exportChart: 'Diagramm exportieren',
    exportDefault: '⬇ Exportieren',
    exportExcel: '📊 Excel exportieren',
    exportCsv: '📄 CSV exportieren',
    exportPdf: '📑 PDF exportieren',
    exportHtml: '🌐 HTML exportieren',
    copied: 'Diagramm in die Zwischenablage kopiert',
    copyFailed: 'Kopieren fehlgeschlagen – Zwischenablage nicht verfügbar',
    saveCancelled: 'Speichern abgebrochen'
  },
  resume: {
    continueLastSession: 'Mit letzter Sitzung fortfahren?',
    welcomeBack: 'Willkommen zurück!',
    historicalBody:
      'Ihre Antworten aus Ihrer letzten abgeschlossenen Sitzung wurden vorab geladen. Möchten Sie diese Werte als Ausgangspunkt behalten oder mit einem völlig leeren Fragebogen beginnen?',
    activeBody:
      'Sie haben eine laufende Sitzung. Möchten Sie dort weitermachen, wo Sie aufgehört haben, oder eine neue Beurteilung beginnen?',
    clearWarning: '⚠️ Dadurch werden alle aktuellen Antworten gelöscht. Bist du sicher?',
    yesStartFresh: 'Ja, starten Sie neu',
    cancel: 'Abbrechen',
    keepLastValues: 'Letzte Werte beibehalten',
    resumeSession: 'Sitzung fortsetzen',
    startFresh: 'Fangen Sie neu an'
  },
  questionItem: {
    pointsSuffix: 'Punkte',
    low: 'Niedrig',
    high: 'Hoch',
    rateAria: 'Bewerten Sie {question}'
  },
  questions: {
    '1': 'Die Grundlagen meistern',
    '2': 'Worte aktivieren und erhellen',
    '3': 'Schmerz finden und Energie bündeln',
    '4': 'Definiere, was du willst',
    '5': 'Schreibe auf, was du willst',
    '6': 'Teile deinen Traum nicht mit anderen',
    '7': 'Entwickle brennenden Wunsch für dein Ziel',
    '8': 'Ziel muss im Sweet Spot liegen',
    '9': 'Triff eine Entscheidung',
    '10': 'Sieh/Fühle dich im Besitz deines Ziels',
    '11': 'Löse die Bindung an das Ergebnis',
    '12': 'Lass das WIE sich zeigen',
    '13': 'Unterschied zwischen Traum und Hauptziel kennen',
    '14': 'Fokussiert sein / Zielklarheit',
    '15': 'Tägliche Prioritätenliste',
    '16': 'Fortschritt messen / Punktestand kennen',
    '17': 'Erfolgs-Momentum-Zyklus nutzen',
    '18': 'Traumaufbau – Traumbuch & Vision Board',
    '19': 'Ins System einklinken',
    '20': 'Kurs: Wissenschaft der persönlichen Meisterschaft',
    '21': 'Achte auf deine Worte – was du sagst, bekommst du',
    '22': 'Physiologie / Dress for Success',
    '23': 'Gegenintentionen klären',
    '24': 'Erwecke deine innere Kraft: Superkraft-Prozesse',
    '25': 'Auf Alpha-Theta-Gehirnwelle senden',
    '26': 'Hör auf, deine Leidensgeschichte zu erzählen',
    '27': 'Wertschätzung / Dankbarkeit zeigen',
    '28': 'Misserfolgsgewohnheiten durch Erfolgsgewohnheiten ersetzen (Beschleunigerprozesse)',
    '29': 'Ein Mastermind aufbauen',
    '30': 'Erfolgreiche Menschen beobachten / in die Lehre gehen',
    '31': 'Erfolgsgeschichten hören/lesen',
    '32': 'Gib zuerst, was du bekommen möchtest',
    '33': 'Do-it-now-Mentalität',
    '34': 'Kümmere dich um deinen Körper',
    '35': 'Finde das Gold in Widrigkeiten',
    '36': 'Samskaras aus dem Feld klären',
    '37': '100% Verantwortung übernehmen',
    '38': 'Attraktorfeld-Generatoren',
    '39': 'Tritt einem Club bei, der dich mit einer Kraftquelle verbindet',
    '40': 'Lebe mit bewusster Absicht – sei im Hier und Jetzt',
    '1a': 'Auf wen hörst du?',
    '1b': 'Lehrbarkeitsindex',
    '1c': 'Trainings-Balance-Skala',
    '1d': 'Unbewusste Kompetenz',
    '19a': 'Bücher lesen',
    '19b': 'Audios hören',
    '19c': 'Events besuchen (monatlich)',
    '19d': 'Anerkennung geben und erhalten / erweiterte Goldene Regel',
    '19e': 'Beziehungen mit Gleichgesinnten aufbauen',
    '23a': 'Geldprozesse',
    '23b': 'Beziehungsprozesse',
    '23c': 'Führungsprozesse',
    '23d': 'Kommunikationsprozesse',
    '23e': 'Gesundheitsprozesse',
    '23f': 'Prozesse spiritueller Bewusstheit',
    '23g': 'Traumprozesse',
    '23h': 'Organisations- & Fokusprozesse'
  },
  dateRange: {
    rangeLabel: 'Reichweite:',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    presets: {
      '7d': '7 Tage',
      '30d': '30 Tage',
      '90d': '90 Tage',
      '1y': '1 Jahr',
      all: 'Alle Zeit',
      custom: 'Benutzerdefiniert'
    }
  },
  update: {
    availableTitle: 'v{version} ist verfügbar!',
    releaseNotesFallback: 'Besuchen Sie die Release-Seite, um die neueste Version herunterzuladen.',
    getUpdate: 'Holen Sie sich das Update',
    dismiss: 'Entlassen'
  }
};

export default de;

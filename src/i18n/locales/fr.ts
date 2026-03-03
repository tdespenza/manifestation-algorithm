/**
 * Auto-converted locale module for fr.
 */
import type { Messages } from './en';

const fr: Messages = {
  nav: {
    questionnaire: 'Questionnaire',
    history: 'Histoire',
    settings: 'Paramètres'
  },
  app: {
    name: 'Algorithme de manifestation',
    unexpectedError: "Une erreur inattendue s'est produite."
  },
  home: {
    subtitle: "Évaluez chaque domaine de votre vie - découvrez votre score d'alignement"
  },
  dashboard: {
    title: 'Historique de suivi de l’algorithme de manifestation',
    subtitle: 'Suivez vos progrès au fil du temps',
    loading: 'Chargement de votre historique…',
    noData: 'Aucune donnée pour cette période',
    progressTrend: 'Tendance de progrès',
    progressToGoal: "Progrès vers l'objectif",
    ofGoal: "{pct} % de l'objectif",
    goalReached: '🎯 Objectif atteint !',
    categoryBreakdown: 'Répartition des catégories',
    noSessionsRange: 'Aucune session dans cette plage',
    tryWiderRange: 'Essayez une plage plus large ou sélectionnez une période différente.',
    noSessionsYet: "Aucune séance pour l'instant",
    completeFirst:
      'Effectuez votre première évaluation pour voir vos progrès et vos tendances ici.',
    startFirst: 'Commencer la première évaluation',
    export: {
      date: 'Date',
      time: 'Temps',
      totalScore: 'Note totale',
      duration: 'Durée (min)',
      notes: 'Remarques'
    }
  },
  stats: {
    averageScore: 'Note moyenne',
    medianScore: 'Score médian',
    highestScore: 'Score le plus élevé',
    totalSessions: 'Nombre total de séances'
  },
  network: {
    rankings: 'Classements des réseaux',
    searchingPeers: 'À la recherche de pairs...',
    searching: 'Recherche...',
    online: 'En ligne',
    peers: '{count} pairs',
    results: '{count} résultats',
    avgShort: 'Moy.',
    p90Short: 'P90',
    averageScoreTitle: 'Note moyenne',
    percentile90Title: '90e centile',
    globalAverage: 'Moyenne mondiale',
    percentile90: '90e centile',
    manifestations: 'Manifestations',
    activePeers: 'Pairs actifs',
    categoryRankings: 'Classement des catégories'
  },
  focusAreas: {
    title: "Domaines d'intervention",
    subtitle:
      'Vos 3 catégories les moins bien notées – leur amélioration entraîne les gains les plus importants.',
    empty:
      'Effectuez plus de sessions pour voir des recommandations personnalisées sur les domaines d’intervention.'
  },
  sessions: {
    recent: 'Séances récentes',
    deselectAll: 'Désélectionner tout',
    selectAll: 'Sélectionner tout',
    deleteCount: 'Supprimer {count}',
    cancel: 'Annuler',
    select: 'Sélectionnez',
    deleting: 'Suppression…'
  },
  settings: {
    title: "Paramètres de l'application",
    close: 'Fermer les paramètres',
    dataManagement: 'Gestion des données',
    saveLastSession: 'Enregistrer la dernière session',
    saveLastSessionDesc: 'Pré-remplissez les réponses de votre session terminée la plus récente.',
    resetProgress: 'Réinitialiser la progression',
    resetProgressDesc: 'Supprimez toutes les réponses enregistrées et recommencez.',
    goals: 'Objectifs',
    targetScore: 'Score cible',
    targetScoreDesc:
      'Fixez un objectif (1 000 à 10 000) pour suivre vos progrès sur le tableau de bord.',
    set: 'Ensemble',
    clearGoal: 'Effacer',
    currentTarget: 'Cible actuelle :',
    on: 'Sur',
    off: 'Désactivé',
    version: 'Algorithme de manifestation {version}',
    clearAllAnswers: 'Effacer toutes les réponses',
    clearConfirmTitle: 'Effacer toutes les réponses',
    clearConfirmMessage:
      'Cela supprimera définitivement toutes vos réponses actuelles et ne pourra pas être annulé.',
    clearConfirmLabel: 'Effacer',
    keepAnswers: 'Conserver les réponses',
    language: 'Langue',
    languageDesc: "Choisissez la langue d'affichage de l'application.",
    languageCount: '{count} langues disponibles',
    goalErrorRange: 'Veuillez saisir un score compris entre 1 000 et 10 000.'
  },
  questionnaire: {
    saving: 'Sauvegarde...',
    saved: 'Enregistré',
    progressText: '{pct}% terminé ({answered}/{total})',
    progressAria: 'Progression de l’évaluation',
    maxScore: 'Maximum : {score}',
    answerToScore: 'Réponse pour marquer',
    currentScore: 'Score actuel',
    scrollAll: 'Faire défiler tout',
    stepByStep: 'Pas à pas',
    questionOf: 'Question {current} de {total}',
    previous: '← Précédent',
    next: 'Suivant →',
    completeAssessment: 'Évaluation complète',
    startFresh: 'Vous voulez repartir à zéro ?',
    resetAllAnswers: 'Réinitialiser toutes les réponses',
    resetTitle: 'Réinitialiser toutes les réponses ?',
    resetMessage:
      'Cela effacera chaque réponse et repartira de zéro. Cela ne peut pas être annulé.',
    resetLabel: 'Réinitialiser',
    scoreQuality: {
      notStarted: 'Non démarré',
      manifesting: 'Manifestation ❆',
      aligned: 'Aligné',
      building: 'Bâtiment',
      startingOut: 'Commencer'
    },
    submitHint: {
      zero: '0 réponse sur {total} questions – questions sans réponse par défaut au minimum',
      partial:
        '{remaining} question restante — les questions sans réponse sont par défaut au minimum | {remaining} questions restantes : les questions sans réponse sont par défaut au minimum',
      complete: 'Réponses à toutes les questions — prêtes à être soumises !'
    },
    submitTitle: {
      zero: 'Répondez à quelques questions pour compléter votre évaluation',
      partial: '{remaining} question restante | {remaining} questions restantes',
      complete: 'Soumettez votre évaluation complétée'
    },
    submitError: "Échec de l'enregistrement de la session : {error}",
    dotTitle: 'Question {index}',
    dotAria: 'Aller à la question {index}',
    keyboardHint: 'Astuce : utilisez ← → pour naviguer · 1–9 / 0 pour évaluer'
  },
  onboarding: {
    step0Title: "Bienvenue dans l'algorithme de manifestation",
    step0Body1:
      "Cet outil vous aide à mesurer dans quelle mesure votre état d'esprit, vos habitudes et vos actions quotidiennes sont alignées sur la réalisation de vos objectifs. Répondez honnêtement à chaque question pour obtenir votre score actuel.",
    step0Body2:
      "Remplissez le questionnaire à intervalles réguliers pour suivre votre croissance au fil du temps et voir quels domaines nécessitent le plus d'attention.",
    step1Title: 'Comment fonctionne la notation',
    step1Body:
      'Chaque question vaut un certain nombre de points. Évaluez-vous sur une échelle de 1 à 10 pour chaque question. Une note de 10 signifie que vous incarnez pleinement ce principe ; 1 signifie que vous n’avez pas commencé.',
    step1TargetHint: '🎯 Cible : {target} | Maximum : {maximum}',
    excellent: 'Excellent',
    excellentRange: '7 001 – 10 000',
    excellentNote: 'Alignement fort – continuez',
    good: 'Bon',
    goodRange: '4 001 – 7 000',
    goodNote: 'Base solide – possibilité de croissance',
    needsWork: 'A besoin de travail',
    needsWorkRange: '0 – 4 000',
    needsWorkNote: 'Concentrez-vous d’abord sur les fondamentaux',
    step2Title: 'Vos données restent privées',
    step2Body1:
      "Toutes vos réponses et votre historique de scores sont stockés localement sur votre appareil à l'aide d'une base de données SQLite cryptée. Rien n'est envoyé à un serveur sans votre autorisation explicite.",
    step2Body2:
      'La fonctionnalité facultative de partage peer-to-peer vous permet de voir les scores globaux anonymisés des autres utilisateurs. Il ne partage qu’un résumé signé cryptographiquement – ​​jamais vos réponses individuelles.',
    readyText: 'Prêt? Obtenons votre score de base.',
    skipIntro: "Passer l'introduction",
    next: 'Suivant',
    getStarted: 'Commencer'
  },
  sharing: {
    title: 'Partage de réseau anonyme',
    privacyFirst: "🔒 La confidentialité d'abord",
    description:
      "En option, contribuez vos résultats de manière anonyme au réseau mondial. Aucun nom, e-mail, adresse IP ou identifiant d'appareil n'est jamais partagé.",
    enabled: 'Partage activé – contribution au réseau',
    disabled: 'Partage désactivé (par défaut)',
    activeBadge: '✓ Vos scores anonymisés sont partagés avec vos pairs',
    enableNote: 'Permet de voir votre classement centile par rapport au réseau mondial.'
  },
  category: {
    back: '‹ Retour',
    history: 'Histoire',
    date: 'Date',
    score: 'Score',
    loading: 'Chargement...',
    notEnoughData: 'Pas assez de données',
    noData: 'Aucune donnée trouvée pour « {category} ».',
    goToDashboard: 'Aller au tableau de bord'
  },
  chartActions: {
    viewFullscreen: 'Afficher en plein écran',
    exitFullscreen: 'Quitter le plein écran',
    copyChart: 'Copier le graphique',
    exportChart: 'Exporter le graphique',
    exportDefault: '⬇ Exporter',
    exportExcel: '📊 Exporter Excel',
    exportCsv: '📄 Exporter CSV',
    exportPdf: '📑 Exporter un PDF',
    exportHtml: '🌐 Exporter du HTML',
    copied: 'Graphique copié dans le presse-papiers',
    copyFailed: "Échec de la copie : le presse-papiers n'est pas disponible",
    saveCancelled: 'Sauvegarde annulée'
  },
  resume: {
    continueLastSession: 'Continuer depuis la dernière session ?',
    welcomeBack: 'Content de te revoir!',
    historicalBody:
      'Vos réponses de votre dernière session terminée ont été préchargées. Souhaitez-vous conserver ces valeurs comme point de départ, ou commencer avec un questionnaire totalement vierge ?',
    activeBody:
      'Vous avez une séance en cours. Souhaitez-vous reprendre là où vous vous étiez arrêté ou commencer une nouvelle évaluation ?',
    clearWarning: '⚠️ Cela effacera toutes les réponses actuelles. Es-tu sûr?',
    yesStartFresh: 'Oui, recommencez à zéro',
    cancel: 'Annuler',
    keepLastValues: 'Conserver les dernières valeurs',
    resumeSession: 'Reprendre la session',
    startFresh: 'Repartir à neuf'
  },
  questionItem: {
    pointsSuffix: 'points',
    low: 'Faible',
    high: 'Élevé',
    rateAria: 'Notez {question}'
  },
  questions: {
    '1': 'Maîtriser les bases',
    '2': 'Activer et illuminer les mots',
    '3': 'Identifier la douleur et concentrer l’énergie',
    '4': 'Définir ce que tu veux',
    '5': 'Écrire ce que tu veux',
    '6': 'Ne partage pas ton rêve avec les autres',
    '7': 'Développer un désir brûlant pour ton objectif',
    '8': 'L’objectif doit être dans la zone idéale',
    '9': 'Prendre une décision',
    '10': 'Voir/ressentir que ton objectif est déjà atteint',
    '11': 'Relâcher l’attachement au résultat',
    '12': 'Laisser le COMMENT se révéler',
    '13': 'Connaître la différence entre rêve et objectif principal',
    '14': 'Rester concentré / unicité d’objectif',
    '15': 'Liste quotidienne des priorités',
    '16': 'Suivre les progrès / connaître son score',
    '17': 'Utiliser le cycle d’élan du succès',
    '18': 'Construire le rêve – livre de rêves & tableau de vision',
    '19': 'Se connecter au système',
    '20': 'Cours : Science de la maîtrise personnelle',
    '21': 'Surveiller ses paroles – ce que tu dis, tu l’obtiens',
    '22': 'Physiologie / s’habiller pour réussir',
    '23': 'Clarifier les contre-intentions',
    '24': 'Éveille ton pouvoir intérieur : processus de superpouvoir',
    '25': 'Émettre sur l’onde cérébrale alpha-thêta',
    '26': 'Arrête de raconter ton histoire de malheur',
    '27': 'Montrer de l’appréciation / de la gratitude',
    '28': 'Remplacer les habitudes d’échec par des habitudes de réussite (processus accélérateurs)',
    '29': 'Créer un mastermind',
    '30': 'Observer les personnes qui réussissent / apprendre auprès d’elles',
    '31': 'Écouter/lire des histoires de réussite',
    '32': 'Donner d’abord ce que tu veux recevoir',
    '33': 'Mentalité “fais-le maintenant”',
    '34': 'Prendre soin de son corps',
    '35': 'Trouver l’or dans l’adversité',
    '36': 'Nettoyer les samskaras du champ',
    '37': 'Assumer 100 % de responsabilité',
    '38': 'Générateurs de champ d’attraction',
    '39': 'Rejoindre un club qui te connecte à une source de puissance',
    '40': 'Vivre avec une intention délibérée – être dans le moment présent',
    '1a': 'Qui écoutes-tu ?',
    '1b': 'Indice d’aptitude à apprendre',
    '1c': 'Échelle d’équilibre de l’entraînement',
    '1d': 'Compétence inconsciente',
    '19a': 'Lire des livres',
    '19b': 'Écouter des audios',
    '19c': 'Participer à des événements (mensuels)',
    '19d': 'Donner et recevoir de la reconnaissance / règle d’or élargie',
    '19e': 'Développer des relations avec des personnes partageant les mêmes idées',
    '23a': 'Processus liés à l’argent',
    '23b': 'Processus relationnels',
    '23c': 'Processus de leadership',
    '23d': 'Processus de communication',
    '23e': 'Processus de santé',
    '23f': 'Processus de conscience spirituelle',
    '23g': 'Processus de rêve',
    '23h': 'Processus d’organisation et de concentration'
  },
  dateRange: {
    rangeLabel: 'Gamme :',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    presets: {
      '7d': '7 jours',
      '30d': '30 jours',
      '90d': '90 jours',
      '1y': '1 an',
      all: 'Tout le temps',
      custom: 'Personnalisé'
    }
  },
  update: {
    availableTitle: 'v{version} est disponible !',
    releaseNotesFallback: 'Visitez la page de version pour télécharger la dernière version.',
    getUpdate: 'Obtenir la mise à jour',
    dismiss: 'Rejeter'
  }
};

export default fr;

/**
 * Auto-converted locale module for pt.
 */
import type { Messages } from './en';

const pt: Messages = {
  nav: {
    questionnaire: 'Questionário',
    history: 'História',
    settings: 'Configurações'
  },
  app: {
    name: 'Algoritmo de Manifestação',
    unexpectedError: 'Ocorreu um erro inesperado.'
  },
  home: {
    subtitle: 'Avalie cada área da sua vida – descubra sua pontuação de alinhamento'
  },
  dashboard: {
    title: 'Histórico de rastreamento do algoritmo de manifestação',
    subtitle: 'Acompanhe seu progresso ao longo do tempo',
    loading: 'Carregando seu histórico…',
    noData: 'Não há dados para este período',
    progressTrend: 'Tendência de Progresso',
    progressToGoal: 'Progresso para meta',
    ofGoal: '{pct}% da meta',
    goalReached: '🎯Meta alcançada!',
    categoryBreakdown: 'Divisão de categorias',
    noSessionsRange: 'Nenhuma sessão neste intervalo',
    tryWiderRange: 'Experimente uma gama mais ampla ou selecione um período diferente.',
    noSessionsYet: 'Ainda não há sessões',
    completeFirst: 'Conclua sua primeira avaliação para ver seu progresso e tendências aqui.',
    startFirst: 'Iniciar a primeira avaliação',
    export: {
      date: 'Data',
      time: 'Hora',
      totalScore: 'Pontuação Total',
      duration: 'Duração (min)',
      notes: 'Notas'
    }
  },
  stats: {
    averageScore: 'Pontuação Média',
    medianScore: 'Pontuação Mediana',
    highestScore: 'Pontuação mais alta',
    totalSessions: 'Total de sessões'
  },
  network: {
    rankings: 'Classificações de rede',
    searchingPeers: 'Procurando colegas...',
    searching: 'Procurando...',
    online: 'On-line',
    peers: '{count} colegas',
    results: '{count} resultados',
    avgShort: 'Média',
    p90Short: 'P90',
    averageScoreTitle: 'Pontuação Média',
    percentile90Title: '90º percentil',
    globalAverage: 'Média Global',
    percentile90: '90º percentil',
    manifestations: 'Manifestações',
    activePeers: 'Pares ativos',
    categoryRankings: 'Classificações de categoria'
  },
  focusAreas: {
    title: 'Áreas de foco',
    subtitle: 'Suas três categorias de pontuação mais baixa – melhorá-las gera os maiores ganhos.',
    empty: 'Conclua mais sessões para ver recomendações personalizadas de áreas de foco.'
  },
  sessions: {
    recent: 'Sessões recentes',
    deselectAll: 'Desmarcar tudo',
    selectAll: 'Selecionar tudo',
    deleteCount: 'Excluir {count}',
    cancel: 'Cancelar',
    select: 'Selecione',
    deleting: 'Excluindo…'
  },
  settings: {
    title: 'Configurações do aplicativo',
    close: 'Fechar configurações',
    dataManagement: 'Gerenciamento de dados',
    saveLastSession: 'Salvar última sessão',
    saveLastSessionDesc: 'Preencha previamente as respostas da sua sessão concluída mais recente.',
    resetProgress: 'Redefinir progresso',
    resetProgressDesc: 'Exclua todas as respostas salvas e comece do zero.',
    goals: 'Metas',
    targetScore: 'Pontuação alvo',
    targetScoreDesc:
      'Defina uma meta de pontuação (1.000–10.000) para acompanhar seu progresso no painel.',
    set: 'Definir',
    clearGoal: 'Limpar',
    currentTarget: 'Meta atual:',
    on: 'Ligado',
    off: 'Desligado',
    version: 'Algoritmo de manifestação {version}',
    clearAllAnswers: 'Limpar todas as respostas',
    clearConfirmTitle: 'Limpar todas as respostas',
    clearConfirmMessage:
      'Esta ação excluirá permanentemente todas as suas respostas atuais e não poderá ser desfeita.',
    clearConfirmLabel: 'Limpar',
    keepAnswers: 'Mantenha as respostas',
    language: 'Idioma',
    languageDesc: 'Escolha o idioma de exibição do aplicativo.',
    languageCount: '{count} idiomas disponíveis',
    goalErrorRange: 'Insira uma pontuação entre 1.000 e 10.000.'
  },
  questionnaire: {
    saving: 'Salvando...',
    saved: 'Salvo',
    progressText: '{pct}% concluído ({answered}/{total})',
    progressAria: 'Progresso da conclusão da avaliação',
    maxScore: 'Máx.: {score}',
    answerToScore: 'Resposta para pontuar',
    currentScore: 'Pontuação atual',
    scrollAll: 'Rolar tudo',
    stepByStep: 'Passo a passo',
    questionOf: 'Pergunta {current} de {total}',
    previous: '← Anterior',
    next: 'Próximo →',
    completeAssessment: 'Avaliação Completa',
    startFresh: 'Quer começar do zero?',
    resetAllAnswers: 'Redefinir todas as respostas',
    resetTitle: 'Redefinir todas as respostas?',
    resetMessage: 'Isso limpará todas as respostas e começará do zero. Isto não pode ser desfeito.',
    resetLabel: 'Redefinir',
    scoreQuality: {
      notStarted: 'Não iniciado',
      manifesting: 'Manifestando ❆',
      aligned: 'Alinhado',
      building: 'Edifício',
      startingOut: 'Começando'
    },
    submitHint: {
      zero: '0 de {total} perguntas respondidas — o padrão de perguntas não respondidas é o mínimo',
      partial:
        '{remaining} pergunta restante — o padrão de perguntas não respondidas é o mínimo | {remaining} perguntas restantes — o padrão de perguntas não respondidas é o mínimo',
      complete: 'Todas as perguntas respondidas – pronto para enviar!'
    },
    submitTitle: {
      zero: 'Responda algumas perguntas para completar sua avaliação',
      partial: '{remaining} pergunta restante | {remaining} perguntas restantes',
      complete: 'Envie sua avaliação completa'
    },
    submitError: 'Falha ao salvar sessão: {error}',
    dotTitle: 'Pergunta {index}',
    dotAria: 'Vá para a pergunta {index}',
    keyboardHint: 'Dica: Use ← → para navegar · 1–9 / 0 para avaliar'
  },
  onboarding: {
    step0Title: 'Bem-vindo ao Algoritmo de Manifestação',
    step0Body1:
      'Esta ferramenta ajuda você a medir o quão alinhados sua mentalidade, hábitos e ações diárias estão com o alcance de seus objetivos. Responda cada pergunta honestamente para obter sua pontuação atual.',
    step0Body2:
      'Preencha o questionário em intervalos regulares para acompanhar seu crescimento ao longo do tempo e ver quais áreas precisam de mais atenção.',
    step1Title: 'Como funciona a pontuação',
    step1Body:
      'Cada questão vale um determinado número de pontos. Avalie-se em uma escala de 1 a 10 para cada pergunta. Uma classificação de 10 significa que você incorpora totalmente esse princípio; 1 significa que você ainda não começou.',
    step1TargetHint: '🎯 Alvo: {target} | Máximo: {maximum}',
    excellent: 'Excelente',
    excellentRange: '7.001 – 10.000',
    excellentNote: 'Alinhamento forte – continue',
    good: 'Bom',
    goodRange: '4.001 – 7.000',
    goodNote: 'Base sólida – espaço para crescer',
    needsWork: 'Precisa de trabalho',
    needsWorkRange: '0 – 4.000',
    needsWorkNote: 'Concentre-se primeiro nos fundamentos',
    step2Title: 'Seus dados permanecem privados',
    step2Body1:
      'Todas as suas respostas e histórico de pontuação são armazenados localmente no seu dispositivo usando um banco de dados SQLite criptografado. Nada é enviado para nenhum servidor sem a sua permissão explícita.',
    step2Body2:
      'O recurso opcional de compartilhamento ponto a ponto permite que você veja pontuações agregadas anônimas de outros usuários. Ele compartilha apenas um resumo assinado criptograficamente – nunca suas respostas individuais.',
    readyText: 'Preparar? Vamos obter sua pontuação básica.',
    skipIntro: 'Pular introdução',
    next: 'Próximo',
    getStarted: 'Comece'
  },
  sharing: {
    title: 'Compartilhamento de rede anônimo',
    privacyFirst: '🔒 Privacidade em primeiro lugar',
    description:
      'Opcionalmente, contribua anonimamente com seus resultados para a rede global. Nenhum nome, e-mail, endereço IP ou ID do dispositivo é compartilhado.',
    enabled: 'Compartilhamento habilitado – contribuindo para a rede',
    disabled: 'Compartilhamento desativado (padrão)',
    activeBadge: '✓ Suas pontuações anônimas estão sendo compartilhadas com colegas',
    enableNote: 'Ative para ver sua classificação percentual em comparação com a rede global.'
  },
  category: {
    back: '‹ Voltar',
    history: 'História',
    date: 'Data',
    score: 'Pontuação',
    loading: 'Carregando...',
    notEnoughData: 'Dados insuficientes',
    noData: 'Nenhum dado encontrado para “{category}”.',
    goToDashboard: 'Vá para o painel'
  },
  chartActions: {
    viewFullscreen: 'Ver tela inteira',
    exitFullscreen: 'Sair da tela inteira',
    copyChart: 'Copiar gráfico',
    exportChart: 'Gráfico de exportação',
    exportDefault: '⬇ Exportar',
    exportExcel: '📊 Exportar Excel',
    exportCsv: '📄 Exportar CSV',
    exportPdf: '📑 Exportar PDF',
    exportHtml: '🌐 Exportar HTML',
    copied: 'Gráfico copiado para a área de transferência',
    copyFailed: 'Falha na cópia – área de transferência não disponível',
    saveCancelled: 'Salvar cancelado'
  },
  resume: {
    continueLastSession: 'Continuar da última sessão?',
    welcomeBack: 'Bem vindo de volta!',
    historicalBody:
      'Suas respostas da última sessão concluída foram pré-carregadas. Gostaria de manter esses valores como ponto de partida ou começar com um questionário completamente em branco?',
    activeBody:
      'Você tem uma sessão em andamento. Gostaria de retomar de onde parou ou iniciar uma nova avaliação?',
    clearWarning: '⚠️ Isso limpará todas as respostas atuais. Tem certeza?',
    yesStartFresh: 'Sim, comece do zero',
    cancel: 'Cancelar',
    keepLastValues: 'Mantenha os últimos valores',
    resumeSession: 'Retomar sessão',
    startFresh: 'Comece do zero'
  },
  questionItem: {
    pointsSuffix: 'pontos',
    low: 'Baixo',
    high: 'Alto',
    rateAria: 'Avalie {question}'
  },
  dateRange: {
    rangeLabel: 'Alcance:',
    startDate: 'Data de início',
    endDate: 'Data de término',
    presets: {
      '7d': '7 dias',
      '30d': '30 dias',
      '90d': '90 dias',
      '1y': '1 ano',
      all: 'Todos os tempos',
      custom: 'Personalizado'
    }
  },
  update: {
    availableTitle: 'v{version} está disponível!',
    releaseNotesFallback: 'Visite a página de lançamento para baixar a versão mais recente.',
    getUpdate: 'Obter atualização',
    dismiss: 'Dispensar'
  },
  questions: {
    '1': 'Domine o Básico',
    '2': 'Ativar e Iluminar Palavras',
    '3': 'Encontre Dor e Contraia Energia',
    '4': 'Defina o que você quer',
    '5': 'Escreva o que você quer',
    '6': 'Não compartilhe seu sonho com os outros',
    '7': 'Crie um desejo ardente pelo seu objetivo',
    '8': 'O objetivo deve estar no Sweet Spot',
    '9': 'Tome uma Decisão',
    '10': 'Veja/Sinta-se bem em posse do seu objetivo',
    '11': 'Libere o apego ao resultado',
    '12': 'Deixe o COMO se apresentar',
    '13': 'Saiba a diferença entre Sonho e Objetivo Principal',
    '14': 'Seja Focado / Unicidade de propósito',
    '15': 'Lista diária de prioridades',
    '16': 'Progresso nas Tabelas / Conheça a Pontuação',
    '17': 'Use o Ciclo de Impulso do Sucesso',
    '18': 'Dream Build - Livro dos Sonhos & Quadro de Visão',
    '19': 'Conecte-se ao Sistema',
    '20': 'Curso de Ciência da Maestria Pessoal',
    '21': 'Cuidado com as palavras que você fala – o que você diz é o que você recebe',
    '22': 'Fisiologia / Vista-se para o sucesso',
    '23': 'Contrárias Claras',
    '24': 'Desperte seu Poder Interior: Processos de Superpoderes',
    '25': 'Transmissão em ondas cerebrais alfa-theta',
    '26': 'Pare de Contar Sua História de Tristeza',
    '27': 'Demonstre Apreço / Gratidão',
    '28': 'Substitua Hábitos de Fracasso por Hábitos de Sucesso (Processos Aceleradores)',
    '29': 'Crie um Mestre da Mente',
    '30': 'Assista Pessoas Bem-Sucedidas/Aprendizes',
    '31': 'Ouça/Leia Histórias de Sucesso',
    '32': 'Dê o que você quer primeiro',
    '33': 'Mentalidade de Fazer Agora',
    '34': 'Cuide do Seu Corpo',
    '35': 'Encontre o Ouro na Adversidade',
    '36': 'Limpar Samskaras do Campo',
    '37': 'Assuma 100% de Responsabilidade',
    '38': 'Geradores de campo atrator',
    '39': 'Participe de um clube que conecte você a uma fonte de energia',
    '40': 'Viva a vida com intenção deliberada - esteja no tempo presente',
    '1a': 'Quem você escuta?',
    '1b': 'Índice de Aprendibilidade',
    '1c': 'Balança de Equilíbrio de Treinamento',
    '1d': 'Competência inconsciente',
    '19a': 'Leia livros',
    '19b': 'Ouça Áudios',
    '19c': 'Participe de Eventos (mensalmente)',
    '19d': 'Dar e receber Reconhecimento / Regra de Ouro expandida',
    '19e': 'Desenvolva relacionamentos com pessoas que pensam como eu',
    '23a': 'Processos Monetários',
    '23b': 'Processos de Relacionamento',
    '23c': 'Processos de Liderança',
    '23d': 'Processos de Comunicação',
    '23e': 'Processos de Saúde',
    '23f': 'Processos de Consciência Espiritual',
    '23g': 'Processos de Sonho',
    '23h': 'Processos de Organização e Foco'
  }
};

export default pt;

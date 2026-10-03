// input: Static portuguese translation dictionary aligned with official Undertale localizations
// output: Full Portuguese Translations object implementation
// pos: src/i18n/pt.ts (更新规则：文件变更需同步本注释与所属目录 README)

import type { Translations } from './types';
import { ASSESSMENT_COPY } from '../data/assessmentContent';
import type { SoulCode, SoulDefinition } from '../data/souls';
import type { QuestionItem } from '../data/questions';
import { getQuestions } from '../data/questions';

export const PT_SOULS: Record<SoulCode, SoulDefinition> = {
  DET: {
    code: 'DET',
    name: 'DETERMINAÇÃO',
    label: 'VERMELHA',
    hex: '#ff0000',
    confuse: 'PER',
    tag: "O que ainda faz esse objetivo valer a pena e que evidência faria você mudá-lo?",
    description: "Escolher um objetivo importante para você e decidir como voltar a se comprometer depois de um revés. Mudar de rumo após uma reflexão também combina com esse tema.",
  },
  BRV: {
    code: 'BRV',
    name: 'BRAVURA',
    label: 'LARANJA',
    hex: '#fca600',
    confuse: 'DET',
    tag: "Que ação segura você pode tomar sem fingir que o medo desapareceu?",
    description: "Expressar-se ou agir apesar do medo ou da pressão social quando isso é razoavelmente seguro. A pontuação não premia o perigo nem exige extroversão.",
  },
  JUS: {
    code: 'JUS',
    name: 'JUSTIÇA',
    label: 'AMARELA',
    hex: '#ffff00',
    confuse: 'INT',
    tag: "Você aceitaria o mesmo critério se ele fosse aplicado a você ou a alguém de quem não gosta?",
    description: "Aplicar critérios justos a pessoas diferentes, considerando direitos, oportunidades e resultados compartilhados. A justiça pode exigir entender necessidades diferentes.",
  },
  KND: {
    code: 'KND',
    name: 'BONDADE',
    label: 'VERDE',
    hex: '#00c000',
    confuse: 'PAT',
    tag: "Que ajuda atende à necessidade real dessa pessoa e o que você pode oferecer de forma razoável?",
    description: "Cuidar, ouvir e oferecer ajuda útil dentro de limites razoáveis. Ser gentil não exige decidir por outra pessoa nem ignorar suas próprias necessidades.",
  },
  PAT: {
    code: 'PAT',
    name: 'PACIÊNCIA',
    label: 'CIANO',
    hex: '#42fcff',
    confuse: 'KND',
    tag: "Quando seria razoável perguntar de novo e o que você pode fazer enquanto espera?",
    description: "Como você reage à espera, à frustração leve e à irritação. Inclui pausar e se acalmar; não exige tolerar danos ou atrasos indefinidos.",
  },
  INT: {
    code: 'INT',
    name: 'INTEGRIDADE',
    label: 'AZUL',
    hex: '#003cff',
    confuse: 'JUS',
    tag: "Qual é a próxima frase honesta e que compromisso você realmente pode cumprir?",
    description: "Honestidade, confidencialidade e cumprimento de compromissos, inclusive admitir erros. Uma pontuação não define o valor moral de alguém nem torna suas crenças corretas.",
  },
  PER: {
    code: 'PER',
    name: 'PERSEVERANÇA',
    label: 'ROXA',
    hex: '#d535d5',
    confuse: 'DET',
    tag: "Que pequeno passo você pode repetir e como vai saber se está funcionando?",
    description: "Manter um esforço útil durante a execução, lidar com distrações e tentar terminar o trabalho. Uma rotina produtiva também permite descanso e mudanças com base no aprendizado.",
  },
};

export const PT_QUESTIONS: QuestionItem[] = getQuestions('pt');

export const ptTranslations: Translations = {
  locale: 'pt',
  localeName: 'Português',
  pageTitle: "Soul Virtues Extractor - Teste das Almas Undertale Grátis",
  pageDescription: "Descubra seu traço de alma de Undertale com o teste gratuito de 66 perguntas do Soul Virtues Extractor: Determinação, Bravura, Justiça, Bondade e muito mais.",
  heroBadge: "Teste Grátis de 66 Perguntas",
  heroTitle: "SOUL VIRTUES",
  heroTitleHighlight: "EXTRACTOR",
  heroSubtitle: 'Faça o teste gratuito de 66 perguntas <strong class="text-white">Soul Virtues Test (Teste das Almas de Undertale)</strong> para descobrir seu perfil em Determinação, Bravura, Justiça, Bondade, Paciência, Integridade e Perseverança.',
  heroNote: "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites.",
  nav: {
    startTest: "Iniciar Teste",
    sevenVirtues: "7 Virtudes",
    howItWorks: "Como Funciona",
    faq: "Perguntas Frequentes",
    about: "Sobre",
    takeQuiz: "Fazer Teste",
  },
  footer: {
    title: "SOUL VIRTUES EXTRACTOR",
    desc: "Uma avaliação analítica gratuita e completa de 66 perguntas explorando as sete virtudes da alma humana inspiradas no universo de Undertale. Todos os cálculos são feitos 100% no seu navegador.",
    contact: "Contato:",
    exploreTitle: "Explorar",
    testLink: "Teste das Almas",
    traitsLink: "7 Traços de Alma",
    scoringLink: "Lógica de Pontuação",
    faqLink: "Perguntas Frequentes (FAQ)",
    legalTitle: "Legal e Sobre",
    aboutLink: "Sobre Nós",
    privacyLink: "Política de Privacidade",
    termsLink: "Termos de Serviço",
    contactLink: "Contato",
    feedbackLink: "Feedback",
    copyright: "© 2026 Soul Virtues Extractor (soulvirtues.org). Todos os direitos reservados.",
    disclaimer: "Aviso legal: Esta é uma ferramenta analítica independente feita por fãs. Undertale é uma marca registrada de Toby Fox. Este site não é oficialmente afiliado nem endossado por Toby Fox ou criadores originais.",
  },
  what: {
    title: "O que é o Soul Virtues Extractor?",
    p1: "Soul Virtues Extractor é um teste de fãs independente, gratuito e voltado à reflexão. Suas 66 afirmações exploram sete temas cotidianos com uma apresentação inspirada em Undertale. Não é um teste oficial nem uma avaliação clínica.",
    p2: "50 é o ponto médio neutro desta escala de respostas. Uma pontuação maior indica que suas respostas combinam com mais afirmações do tema. Não é um percentil populacional nem uma nota moral. Respostas todas neutras não têm tema principal. Empates são apresentados como empates; resultados com até 3 pontos de diferença aparecem juntos como ajuda de leitura, não como conclusão estatística.",
    p3: "O banco atual adapta 56 afirmações de domínio público do IPIP e acrescenta 10 de Determinação escritas de forma independente. Selecionamos material de um conjunto maior, não de um teste fixo de 56 perguntas. Os sete grupos e a redação são decisões deste site.",
    p4: "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites.",
  },
  why: {
    title: "Por que fazer o Soul Virtues Extractor?",
    intro: "Soul Virtues Extractor é um teste de fãs independente, gratuito e voltado à reflexão. Suas 66 afirmações exploram sete temas cotidianos com uma apresentação inspirada em Undertale. Não é um teste oficial nem uma avaliação clínica.",
    points: [
  {
    "title": "Sete pontuações em um resultado completo",
    "desc": "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites."
  },
  {
    "title": "Fontes de perguntas verificáveis",
    "desc": "O banco atual adapta 56 afirmações de domínio público do IPIP e acrescenta 10 de Determinação escritas de forma independente. Selecionamos material de um conjunto maior, não de um teste fixo de 56 perguntas. Os sete grupos e a redação são decisões deste site."
  },
  {
    "title": "Leia suas respostas no contexto",
    "desc": "50 é o ponto médio neutro desta escala de respostas. Uma pontuação maior indica que suas respostas combinam com mais afirmações do tema. Não é um percentil populacional nem uma nota moral. Respostas todas neutras não têm tema principal. Empates são apresentados como empates; resultados com até 3 pontos de diferença aparecem juntos como ajuda de leitura, não como conclusão estatística."
  },
  {
    "title": "Progresso local sem conta",
    "desc": "As respostas são calculadas e salvas neste navegador com um ID estável e a versão do banco. Você pode continuar o mesmo progresso em qualquer um dos cinco idiomas neste navegador, mas ele não é transferido entre dispositivos. Respostas antigas não são aplicadas a perguntas novas. O som é salvo separadamente."
  }
],
  },
  traits: {
    title: "As 7 Almas de Undertale e os Traços que Elas Representam",
    subtitle: "Estas são as sete almas de Undertale: cada uma tem sua própria cor e um traço que a define. Aqui estão todas juntas, com o significado de cada uma, antes de descobrir qual domina em você.",
  },
  colors: {
    title: "Qual é a cor da sua alma em Undertale?",
    desc: "O resultado mostra sete pontuações independentes. Uma pontuação claramente principal pode aparecer como uma cor; respostas neutras ou empatadas não são forçadas a um único tipo.",
    note: "*Nota: No fandom de Undertale, a Alma Vermelha é comumente associada à Determinação, embora o jogo original não declare expressamente seu traço oficial.",
    items: [
      { title: "ALMA VERMELHA · Determinação*", desc: "Escolher um objetivo importante para você e decidir como voltar a se comprometer depois de um revés. Mudar de rumo após uma reflexão também combina com esse tema." },
      { title: "ALMA LARANJA · Bravura", desc: "Expressar-se ou agir apesar do medo ou da pressão social quando isso é razoavelmente seguro. A pontuação não premia o perigo nem exige extroversão." },
      { title: "ALMA AMARELA · Justiça", desc: "Aplicar critérios justos a pessoas diferentes, considerando direitos, oportunidades e resultados compartilhados. A justiça pode exigir entender necessidades diferentes." },
      { title: "ALMA VERDE · Bondade", desc: "Cuidar, ouvir e oferecer ajuda útil dentro de limites razoáveis. Ser gentil não exige decidir por outra pessoa nem ignorar suas próprias necessidades." },
      { title: "ALMA CIANO · Paciência", desc: "Como você reage à espera, à frustração leve e à irritação. Inclui pausar e se acalmar; não exige tolerar danos ou atrasos indefinidos." },
      { title: "ALMA AZUL · Integridade", desc: "Honestidade, confidencialidade e cumprimento de compromissos, inclusive admitir erros. Uma pontuação não define o valor moral de alguém nem torna suas crenças corretas." },
      { title: "ALMA ROXA · Perseverança", desc: "Manter um esforço útil durante a execução, lidar com distrações e tentar terminar o trabalho. Uma rotina produtiva também permite descanso e mudanças com base no aprendizado.", colSpan2: true },
    ],
  },
  scoring: {
    title: "Como funciona o algoritmo de pontuação",
    intro: "Como cada pontuação é calculada",
    cards: [
  {
    "title": "Cinco opções e perguntas inversas",
    "desc": "Escolha entre cinco respostas: de discordo totalmente (1) a concordo totalmente (5). Para uma afirmação inversa, usamos 6 menos a resposta. Cada afirmação pertence a um único tema."
  },
  {
    "title": "Uma média para cada tema",
    "desc": "Calculamos a média das respostas ajustadas do tema e aplicamos 100 × (média − 1) ÷ 4."
  },
  {
    "title": "Uma escala transparente de 0 a 100",
    "desc": "Os sete resultados são independentes. Não precisam somar 100 e quantidades diferentes de perguntas não mudam o máximo."
  }
],
    note: "Escolha entre cinco respostas: de discordo totalmente (1) a concordo totalmente (5). Para uma afirmação inversa, usamos 6 menos a resposta. Cada afirmação pertence a um único tema. Calculamos a média das respostas ajustadas do tema e aplicamos 100 × (média − 1) ÷ 4. Os sete resultados são independentes. Não precisam somar 100 e quantidades diferentes de perguntas não mudam o máximo.",
  },
  features: {
    title: "Destaques e Funcionalidades",
    subtitle: "66 perguntas, 7 pontuações de virtudes e um card compartilhável instantâneo.",
    items: [
      { num: "66", title: "66 Perguntas", desc: "Questões situacionais sobre escolhas e tendências nas 7 virtudes." },
      { num: "7", title: "7 Pontuações de Alma", desc: "Veja sua porcentagem em cada uma das virtudes do universo Undertale." },
      { num: "PNG", title: "Card Compartilhável", desc: "Baixe seu resultado em imagem PNG com estilo retrô de pixel art." },
      { num: "NO", title: "Sem Cadastro", desc: "Faça todo o teste gratuitamente sem precisar criar conta." },
    ],
  },
  faq: {
    title: "Perguntas Frequentes (FAQ)",
    subtitle: "Tudo o que você precisa saber sobre o Soul Virtues Extractor, os traços de alma e a pontuação.",
    items: ASSESSMENT_COPY.pt.faqItems,
  },
  quizUI: {
    resultReading: {
      "cardScaleNote": "50% = NEUTRO · PONTUAÇÕES INDEPENDENTES",
      "summaryBadge": "RESUMO DO PERFIL",
      "noPreferenceTitle": "SEM PREFERÊNCIA CLARA",
      "noPreferenceBody": "Estas respostas não mostram nenhum traço acima do ponto médio neutro. Reveja suas respostas em vez de tratar a primeira barra como uma personalidade dominante.",
      "incompleteTitle": "CONCLUA O TESTE",
      "incompleteBody": "Há respostas ausentes ou inválidas. Complete as 66 afirmações antes de interpretar o perfil.",
      "tieTitle": "TRAÇOS PRINCIPAIS EMPATADOS",
      "tieBody": "Vários traços têm a maior pontuação exibida. A ordem não define um vencedor.",
      "closeBody": "As duas maiores pontuações estão a até 3 pontos de distância. Mostramos ambas para ajudar a leitura, não como um teste de significância estatística.",
      "scoreScaleNote": "São pontuações independentes de 0 a 100 para suas respostas, não percentis populacionais nem notas morais. Não precisam somar 100.",
      "evidenceTitle": "COMO SUAS RESPOSTAS AFETARAM A PONTUAÇÃO",
      "evidenceRaised": "Elevou este traço",
      "evidenceLowered": "Reduziu este traço",
      "feedbackLink": "ENVIAR UMA SUGESTÃO",
      "allSoulsLink": "EXPLORAR OS SETE TRAÇOS"
    },
    title: "UNDERTALE SOUL EXTRACTOR",
    settingsBtn: "CONFIGURAÇÕES",
    audioSettingsTitle: "CONFIGURAÇÕES DE ÁUDIO",
    musicBgmLabel: "MÚSICA (BGM):",
    soundSfxLabel: "EFEITOS (SFX):",
    muteBtn: "MUDO",
    soundEngineNote: "Áudio de pixels · Ajustes salvos",
    introScenes: ["ESTAMOS CONECTADOS?","UMA ALMA NO VAZIO...","VAMOS EXPLORAR SUAS RESPOSTAS."],
    introContinueHint: "pressione Z ou clique para continuar",
    skipBtn: "PULAR",
    startTitle: "SOUL VIRTUES EXTRACTOR",
    startDesc: "Sete virtudes da alma humana. Sete cores. 66 afirmações projetadas para revelar sua ressonância em Determinação, Bravura, Justiça, Bondade, Paciência, Integridade e Perseverança.",
    startProceedBtn: "* COMEÇAR (66 PERGUNTAS)",
    startResumeBtn: "* CONTINUAR",
    startFeatures: [
      "✓ 100% Gratuito e Sem Cadastro",
      "✓ Cálculo Local no Navegador",
      "✓ Diálogos e Efeitos Sonoros de Undertale",
    ],
    hudResetBtn: "REINICIAR",
    resetConfirm: "Reiniciar todas as 66 perguntas?",
    dialogueHint: "Clique ou pressione Z/Enter para pular digitação",
    extremeLeft: "Discordo totalmente",
    extremeRight: "Concordo totalmente",
    tapAnswerHint: "Toque em uma resposta para continuar",
    likertLabels: ["Discordo totalmente","Discordo","Neutro","Concordo","Concordo totalmente"],
    backBtn: "VOLTAR",
    confirmBtn: "CONFIRMAR",
    skipNeutralBtn: "PULAR (NEUTRO)",
    resultComplete: "EXTRAÇÃO CONCLUÍDA",
    primaryVirtue: "VIRTUDE PRINCIPAL DA ALMA",
    secondaryVirtue: "VIRTUDE SECUNDÁRIA / TRAÇO SOMBRA",
    breakdownTitle: "DETALHAMENTO DAS 7 VIRTUDES",
    shareResultBtn: "COMPARTILHAR RESULTADO",
    shareResultChannels: "X · INSTAGRAM · MESSAGES · MORE",
    shareHint: "Abra o menu de compartilhamento do celular e escolha qualquer aplicativo disponível.",
    shareCardMeta: "66 PERGUNTAS · 7 TRAÇOS",
    shareCardQuestion: "QUAL É A SUA ALMA?",
    shareCardCta: "FAÇA O TESTE",
    downloadCardBtn: "BAIXAR PNG",
    saveCardHint: "Pressione e segure a imagem para salvar no seu dispositivo.",
    copyLinkBtn: "COPIAR LINK",
    linkCopiedNotice: "Link copiado!",
    reviewAnswersBtn: "REVISAR RESPOSTAS",
    browseSoulsBtn: "GALERIA DAS 7 ALMAS",
    retakeBtn: "REFAZER TESTE",
    reviewTitle: "REVISÃO DE RESPOSTAS (66 PERGUNTAS)",
    reviewBackBtn: "VOLTAR AOS RESULTADOS",
    soulsGalleryTitle: "AS SETE ALMAS HUMANAS",
    soulsBackBtn: "VOLVER AOS RESULTADOS",
    soulSelectHint: "Clique em uma alma para ver detalhes de seus traços",
    feedbackVote: {
      title: "O que devemos construir a seguir? (Vote com 1 clique)",
      subtitle: "Você extraiu as virtudes da sua alma. Ajude-nos a moldar o próximo capítulo deste mundo:",
      optFusion: "Interpretação de traços combinados — Como minhas duas virtudes principais se unem",
      optCards: "Cartões de alma personalizáveis — Mais estilos em pixel art para salvar e compartilhar",
      optRealLife: "Análise aprofundada na vida real — Forças, fraquezas e lore da minha alma",
      optDeltarune: "Teste de almas de Deltarune — Novos traços e mecânicas de Deltarune",
      optEnough: "O teste atual já está perfeito assim",
      optOther: "Ou tem outra ideia? Escreva diretamente para nós:",
      otherPlaceholder: "Digite sua sugestão aqui...",
      submitBtn: "Enviar voto",
      thankYouTitle: "A voz da sua ALMA agora está gravada em nosso destino.",
      thankYouMessage: "Você não é apenas um visitante — você está construindo este mundo conosco. Cada escolha molda o próximo capítulo. Obrigado por caminhar ao nosso lado; sua centelha guiará o que está por vir.",
    },
  },
  souls: PT_SOULS,
  questions: PT_QUESTIONS,
};

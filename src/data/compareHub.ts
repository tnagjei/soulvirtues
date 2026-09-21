// input: Five locale copy blocks for the /compare/ hub page
// output: Localized hub copy (meta tags, headings, intro, section labels, CTA)
// pos: src/data/compareHub.ts (更新规则：文案变化需同步本注释与 src/data/README.md)

import type { Locale } from '../i18n';

export interface CompareHubCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string[];
  listTitle: string;
  listSub: string;
  readMore: string;
  howTitle: string;
  howSteps: string[];
  ctaText: string;
  ctaLink: string;
  breadcrumbHome: string;
}

export const COMPARE_HUB_COPY: Record<Locale, CompareHubCopy> = {
  en: {
    metaTitle: 'Undertale Soul Trait Comparisons: All 6 Pairs',
    metaDescription: 'Browse all six Undertale soul trait comparisons in one place: quick answers, game evidence, and real-life examples for each pair.',
    h1: 'Undertale Soul Trait Comparisons',
    lede: [
      'Some soul traits look almost identical in play: Bravery and Determination both push you into hard situations, while Kindness and Patience both look gentle from the outside. Each comparison guide on this page separates one such pair and answers a single question: what actually makes these two traits different?',
      'Every guide gives a quick one-line answer first, then a trait matrix, game evidence labeled separately from site interpretation, everyday scenarios, and a short test prompt. Pick the pair that matches your question and start there.',
    ],
    listTitle: 'The Six Comparisons',
    listSub: 'Each card links to the full guide with game evidence and interpretation labels.',
    readMore: 'Read the comparison',
    howTitle: 'How to Use These Guides',
    howSteps: [
      'Skim the quick answer on each card to find the pair closest to your question.',
      'In the full guide, check which claims come from the game and which are the site interpretation.',
      'If you are still unsure which trait drives you, take the 66-question test at the end of any guide.',
    ],
    ctaText: 'Not sure which pattern drives you?',
    ctaLink: 'Take the 66-question test.',
    breadcrumbHome: 'Home',
  },
  ja: {
    metaTitle: 'Undertale ソウル特質の比較まとめ（全6組）',
    metaDescription: 'Undertaleのソウル特質6組の比較をまとめたページ。ゆうきとケツイなど、混同しやすい特質の違いをひとこと回答とゲーム内根拠で解説します。',
    h1: 'Undertale ソウル特質の比較',
    lede: [
      'ゆうきとケツイのように、行動は似ていても働く場面が違う特質ペアがあります。このページでは全6組の比較ガイドをまとめ、それぞれ「本質的な違いは何か」というひとつの問いに答えます。',
      '各ガイドは最初にひとことで答え、次に特質マトリクス、ゲーム内根拠とサイト独自の解釈の区別、日常の場面別の例、最後にテストへの導線を示します。気になる組み合わせから読んでください。',
    ],
    listTitle: '6つの比較ガイド',
    listSub: '各カードから、ゲーム内根拠つきの完全ガイドへ移動できます。',
    readMore: '比較を読む',
    howTitle: '比較ガイドの使い方',
    howSteps: [
      '各カードのひとこと回答を見て、疑問に近いペアを探します。',
      '完全ガイドでは、ゲーム内根拠とサイト独自の解釈を区別して確認できます。',
      'どちらの特質か迷うときは、ガイド末尾の66問テストを受けてみてください。',
    ],
    ctaText: '自分を動かす特質が分からないときは、',
    ctaLink: '66問のテストで7特質を比べられます。',
    breadcrumbHome: 'ホーム',
  },
  es: {
    metaTitle: 'Comparaciones de rasgos del alma de Undertale (6 pares)',
    metaDescription: 'Las seis comparaciones de rasgos del alma de Undertale en un solo lugar: respuesta rápida, evidencia del juego y ejemplos reales para cada par.',
    h1: 'Comparaciones de rasgos del alma',
    lede: [
      'Algunos rasgos parecen casi idénticos en el juego: Valentía y Determinación te empujan a situaciones difíciles, mientras que Bondad y Paciencia parecen suaves desde fuera. Cada guía de esta página separa uno de esos pares y responde a una sola pregunta: ¿qué diferencia de verdad a estos dos rasgos?',
      'Cada guía abre con una respuesta rápida de una línea, sigue con una matriz de rasgos, evidencia del juego separada de la interpretación del sitio, escenarios cotidianos y un recordatorio del test. Elige el par que coincida con tu pregunta y empieza ahí.',
    ],
    listTitle: 'Las seis comparaciones',
    listSub: 'Cada tarjeta enlaza a la guía completa con evidencia del juego y etiquetas de interpretación.',
    readMore: 'Leer la comparación',
    howTitle: 'Cómo usar estas guías',
    howSteps: [
      'Mira la respuesta rápida de cada tarjeta para encontrar el par más cercano a tu pregunta.',
      'En la guía completa, comprueba qué afirmaciones vienen del juego y cuáles son interpretación del sitio.',
      'Si aún no sabes qué rasgo te impulsa, haz el test de 66 preguntas al final de cualquier guía.',
    ],
    ctaText: '¿No sabes qué patrón te impulsa?',
    ctaLink: 'El test de 66 preguntas compara los siete rasgos.',
    breadcrumbHome: 'Inicio',
  },
  pt: {
    metaTitle: 'Comparações de traços da alma de Undertale (6 pares)',
    metaDescription: 'As seis comparações de traços da alma de Undertale num só lugar: resposta rápida, evidências do jogo e exemplos reais para cada par.',
    h1: 'Comparações de traços da alma',
    lede: [
      'Alguns traços parecem quase iguais no jogo: Bravura e Determinação empurram você para situações difíceis, enquanto Gentileza e Paciência parecem suaves de fora. Cada guia desta página separa um desses pares e responde a uma única pergunta: o que realmente diferencia esses dois traços?',
      'Cada guia abre com uma resposta rápida de uma linha, segue com uma matriz de traços, evidências do jogo separadas da interpretação do site, cenários do dia a dia e um lembrete do teste. Escolha o par que combina com a sua pergunta e comece por ali.',
    ],
    listTitle: 'As seis comparações',
    listSub: 'Cada card leva ao guia completo com evidências do jogo e etiquetas de interpretação.',
    readMore: 'Ler a comparação',
    howTitle: 'Como usar estes guias',
    howSteps: [
      'Veja a resposta rápida de cada card para achar o par mais próximo da sua dúvida.',
      'No guia completo, confira quais afirmações vêm do jogo e quais são interpretação do site.',
      'Se ainda não souber qual traço move você, faça o teste de 66 perguntas no fim de qualquer guia.',
    ],
    ctaText: 'Não sabe qual padrão move você?',
    ctaLink: 'O teste de 66 perguntas compara os sete traços.',
    breadcrumbHome: 'Início',
  },
  ru: {
    metaTitle: 'Сравнения черт души Undertale: все 6 пар',
    metaDescription: 'Все шесть сравнений черт души Undertale в одном месте: краткий ответ, игровые факты и примеры из жизни для каждой пары.',
    h1: 'Сравнения черт души',
    lede: [
      'Некоторые черты в игре почти неотличимы: Храбрость и Решимость ведут вас в трудные ситуации, а Доброта и Терпение со стороны выглядят одинаково мягко. Каждый гид на этой странице разделяет одну такую пару и отвечает на один вопрос: чем эти две черты действительно различаются?',
      'Каждый гид начинается с краткого ответа в одну строку, затем идут матрица черт, игровые факты отдельно от интерпретации сайта, бытовые сценарии и напоминание о тесте. Выберите пару, которая ближе к вашему вопросу, и начните с неё.',
    ],
    listTitle: 'Шесть сравнений',
    listSub: 'Каждая карточка ведёт к полному гиду с игровыми фактами и метками интерпретации.',
    readMore: 'Читать сравнение',
    howTitle: 'Как пользоваться гидами',
    howSteps: [
      'Посмотрите краткий ответ на каждой карточке и найдите пару, ближе всего к вашему вопросу.',
      'В полном гиде проверьте, что взято из игры, а что является интерпретацией сайта.',
      'Если всё ещё неясно, какая черта движет вами, пройдите тест из 66 вопросов в конце любого гида.',
    ],
    ctaText: 'Не знаете, какая черта движет вами?',
    ctaLink: 'Тест из 66 вопросов сравнит все семь черт.',
    breadcrumbHome: 'Главная',
  },
};

// input: None (evidence-bounded color meanings and site reflection definitions for the 35 localized soul detail pages)
// output: SOUL_MEANING dictionary keyed by locale, plus SoulsMeaningCopy type
// pos: src/data/soulMeaning.ts（更新规则：文件变更需同步本注释与所属目录 README）
//
// 设计说明：
// - h1ColorPhrase 是 H1 的前半句模板，{color} 由 soulDetail.colorName 替换；后半句沿用既有的大写灵魂名，
//   与首页 hero 的「主文案 + 高亮 span」写法保持一致。
// - sectionHeading 直接对应用户搜索「alma <color> undertale」时想要的答案，放在首屏之后、
//   游戏机制之前，作为意图匹配与摘要抽取的首要区块。
// - bySlug 的段落只回答「这个灵魂代表什么」，不复述装备/战斗机制，避免与页面既有小节重复。

import type { Locale } from '../i18n/types';

export interface SoulsMeaningCopy {
  h1ColorPhrase: string;
  sectionHeading: string;
  bySlug: Record<string, string>;
}

export const SOUL_MEANING: Record<Locale, SoulsMeaningCopy> = {
  en: {
    h1ColorPhrase: 'The {color} Undertale SOUL',
    sectionHeading: 'What Does the {color} Soul Mean in Undertale?',
    bySlug: {
      determination:
        "The red SOUL is commonly associated with Determination by fans. Undertale connects Determination with human SOUL persistence and SAVE, but does not explicitly name it as the red trait. Our quiz uses that community interpretation for a reflection theme: choosing a goal and reconsidering how to pursue it after a setback.",
      bravery:
        "Snowdin's Ball Game links orange with Bravery. For this site's reflection exercises, Bravery means considering an action despite fear while respecting real risks. The color does not establish how a person will behave or describe the orange human's life.",
      justice:
        "Snowdin's Ball Game links yellow with Justice. Our quiz uses Justice as a theme for considering fair standards, different needs and possible repairs. A result is not proof that someone is morally right, and the game does not supply the yellow human's moral history.",
      kindness:
        "Snowdin's Ball Game links green with Kindness. Our reflection theme is listening and offering useful help within reasonable limits. It does not require endless sacrifice or establish that people with a green result notice more than others; the green human's personality is not confirmed.",
      patience:
        "Snowdin's Ball Game links light blue with Patience. Here the theme concerns responding to waiting and minor frustration, with a clear point for following up or acting. It does not mean accepting harm, guarantee better decisions or establish the light-blue human's temperament.",
      integrity:
        "Snowdin's Ball Game links blue with Integrity. Our quiz focuses on honesty, confidentiality and commitments, including correcting mistakes. This is a reflection theme rather than a judgment of moral worth, and it does not establish the blue human's beliefs or personality.",
      perseverance:
        "Snowdin's Ball Game links purple with Perseverance. Our quiz uses the name for continuing useful effort during a task, checking feedback and making room for rest. It does not mean repeating an ineffective method forever or establish the purple human's habits.",
    },
  },

  es: {
    h1ColorPhrase: 'Alma {color} de Undertale',
    sectionHeading: '¿Qué significa el Alma {color} en Undertale?',
    bySlug: {
      determination:
        "Los fans suelen asociar el Alma Roja con la Determinación. Undertale vincula la Determinación con la persistencia de las Almas humanas y el GUARDADO, pero no la nombra explícitamente como rasgo rojo. Nuestro test usa esa interpretación de la comunidad para reflexionar sobre elegir una meta y reconsiderar cómo perseguirla tras un revés.",
      bravery:
        "El Juego de Pelota de Snowdin asocia el naranja con la Valentía. En los ejercicios de este sitio, significa considerar una acción a pesar del miedo y respetar los riesgos reales. El color no determina cómo se comportará alguien ni describe la vida del humano naranja.",
      justice:
        "El Juego de Pelota de Snowdin asocia el amarillo con la Justicia. Nuestro test la usa para reflexionar sobre criterios justos, distintas necesidades y posibles reparaciones. Un resultado no demuestra que alguien tenga razón moral ni establece la historia moral del humano amarillo.",
      kindness:
        "El Juego de Pelota de Snowdin asocia el verde con la Amabilidad. Aquí el tema es escuchar y ofrecer ayuda útil dentro de límites razonables. No exige sacrificios sin fin ni demuestra que quienes obtienen verde perciban más que otros; la personalidad del humano verde no está confirmada.",
      patience:
        "El Juego de Pelota de Snowdin asocia el celeste con la Paciencia. Aquí se trata de responder a la espera y a pequeñas frustraciones, con un momento definido para preguntar o actuar. No significa aceptar daño ni garantiza mejores decisiones; tampoco establece el temperamento del humano celeste.",
      integrity:
        "El Juego de Pelota de Snowdin asocia el azul con la Integridad. Nuestro test se centra en la honestidad, la confidencialidad y los compromisos, incluida la corrección de errores. Es un tema de reflexión, no un juicio de valor moral ni una descripción de las creencias del humano azul.",
      perseverance:
        "El Juego de Pelota de Snowdin asocia el morado con la Perseverancia. Nuestro test usa el nombre para continuar un esfuerzo útil, revisar la respuesta obtenida y reservar descanso. No significa repetir para siempre un método ineficaz ni establece los hábitos del humano morado.",
    },
  },

  pt: {
    h1ColorPhrase: 'Alma {color} de Undertale',
    sectionHeading: 'O que significa a Alma {color} em Undertale?',
    bySlug: {
      determination:
        "Os fãs costumam associar a Alma Vermelha à Determinação. Undertale liga a Determinação à persistência das Almas humanas e ao SAVE, mas não a nomeia explicitamente como traço vermelho. Nosso teste usa essa interpretação da comunidade para refletir sobre escolher uma meta e reconsiderar como buscá-la após um revés.",
      bravery:
        "O Jogo da Bola de Snowdin associa o laranja à Bravura. Nos exercícios deste site, o tema é considerar uma ação apesar do medo, respeitando riscos reais. A cor não determina como alguém vai agir nem descreve a vida do humano laranja.",
      justice:
        "O Jogo da Bola de Snowdin associa o amarelo à Justiça. Nosso teste usa o tema para considerar critérios justos, necessidades diferentes e possíveis reparações. Um resultado não prova que alguém tem razão moral nem estabelece a história moral do humano amarelo.",
      kindness:
        "O Jogo da Bola de Snowdin associa o verde à Bondade. Aqui o tema é ouvir e oferecer ajuda útil dentro de limites razoáveis. Não exige sacrifício sem fim nem prova que quem recebe verde percebe mais que os outros; a personalidade do humano verde não está confirmada.",
      patience:
        "O Jogo da Bola de Snowdin associa o ciano à Paciência. Aqui o tema é lidar com espera e pequenas frustrações, definindo quando retomar o contato ou agir. Não significa aceitar dano nem garante decisões melhores; tampouco estabelece o temperamento do humano ciano.",
      integrity:
        "O Jogo da Bola de Snowdin associa o azul à Integridade. Nosso teste se concentra em honestidade, confidencialidade e compromissos, incluindo corrigir erros. É um tema de reflexão, não um julgamento de valor moral nem uma descrição das crenças do humano azul.",
      perseverance:
        "O Jogo da Bola de Snowdin associa o roxo à Perseverança. Nosso teste usa o nome para continuar um esforço útil, avaliar o retorno obtido e reservar descanso. Não significa repetir para sempre um método ineficaz nem estabelece os hábitos do humano roxo.",
    },
  },

  ja: {
    h1ColorPhrase: 'Undertale の{color}のタマシイ',
    sectionHeading: 'Undertale の{color}のタマシイに込められた意味',
    bySlug: {
      determination:
        "赤いタマシイを「ケツイ」と結びつけるのは、ファンの間で広く使われる解釈です。ゲームはケツイを人間のタマシイの持続やSAVEと関連づけていますが、赤の特質とは明言していません。本サイトではこの解釈を使い、目標を選び、つまずいた後に取り組み方を見直すテーマとして扱います。",
      bravery:
        "スノーフルのボールゲームでは、オレンジ色が Bravery に結びつきます。本サイトでは「ゆうき」と呼び、現実の危険を考慮しながら、恐れがあっても行動を検討するテーマにしています。色だけで行動やオレンジ色の人間の生き方が分かるわけではありません。",
      justice:
        "スノーフルのボールゲームでは、黄色が Justice に結びつきます。本サイトでは「せいぎ」と呼び、公平な基準、異なる必要、修正の方法を考えるテーマにしています。結果は道徳的な正しさの証明ではなく、黄色の人間の道徳的な経歴も示しません。",
      kindness:
        "スノーフルのボールゲームでは、緑色が Kindness に結びつきます。本サイトの「やさしさ」は、無理のない限度で話を聞き、役立つ助けを考えるテーマです。際限のない犠牲を求めるものではなく、緑の結果の人が他者よりよく気づくと証明するものでもありません。",
      patience:
        "スノーフルのボールゲームでは、水色が Patience に結びつきます。本サイトの「にんたい」は、待ち時間や小さないらだちへの対応と、確認や行動に移す時点を考えるテーマです。害を受け入れることではなく、判断が優れるという保証や、水色の人間の性格の説明でもありません。",
      integrity:
        "スノーフルのボールゲームでは、青色が Integrity に結びつきます。本サイトでは「せいじつ」と呼び、正直さ、秘密の保持、約束と間違いの訂正を扱います。人の道徳的な価値を決めたり、青色の人間の信念や性格を示したりするものではありません。",
      perseverance:
        "スノーフルのボールゲームでは、紫色が Perseverance に結びつきます。本サイトでは「こんき」と呼び、有用な努力の継続、結果の確認、休息を考えるテーマにしています。役に立たない方法を続けることではなく、紫色の人間の習慣を示すものでもありません。",
    },
  },

  ru: {
    h1ColorPhrase: '{color} душа Undertale',
    sectionHeading: 'Что означает {color} душа в Undertale?',
    bySlug: {
      determination:
        "Фанаты часто связывают Красную Душу с Решимостью. Undertale связывает Решимость с сохранением человеческих Душ и SAVE, но прямо не называет её красной чертой. Наш тест использует это толкование сообщества как тему для размышления: выбрать цель и пересмотреть способ её достижения после неудачи.",
      bravery:
        "Игра с мячом в Сноудине связывает оранжевый цвет с Храбростью. В упражнениях сайта это тема действия вопреки страху с учётом реальных рисков. Цвет не определяет, как человек будет вести себя, и не описывает жизнь оранжевого человека.",
      justice:
        "Игра с мячом в Сноудине связывает жёлтый цвет со Справедливостью. Наш тест предлагает рассмотреть справедливые критерии, разные потребности и возможные исправления. Результат не доказывает моральную правоту и не устанавливает моральную историю жёлтого человека.",
      kindness:
        "Игра с мячом в Сноудине связывает зелёный цвет с Добротой. Здесь тема — слушать и предлагать полезную помощь в разумных пределах. Она не требует бесконечных жертв и не доказывает, что люди с зелёным результатом замечают больше других; характер зелёного человека не подтверждён.",
      patience:
        "Игра с мячом в Сноудине связывает голубой цвет с Терпением. Здесь речь о реакции на ожидание и мелкие неприятности, с определённым моментом для уточнения или действия. Это не означает принимать вред, не гарантирует лучших решений и не устанавливает темперамент голубого человека.",
      integrity:
        "Игра с мячом в Сноудине связывает синий цвет с Порядочностью. Наш тест сосредоточен на честности, конфиденциальности и обязательствах, включая исправление ошибок. Это тема для размышления, а не оценка моральной ценности или описание убеждений синего человека.",
      perseverance:
        "Игра с мячом в Сноудине связывает фиолетовый цвет с Настойчивостью. Наш тест использует название для продолжения полезных усилий, проверки обратной связи и отдыха. Это не означает бесконечное повторение неработающего метода и не устанавливает привычки фиолетового человека.",
    },
  },
};

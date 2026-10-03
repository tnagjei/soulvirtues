// input: Public-domain IPIP items, independent adaptations, and five-language statement text
// output: Versioned 66-item question bank, official source ledger, and localized quiz questions
// pos: src/data/questions.ts (更新规则：题目变更需同步方法页、题库版本、所属目录 README 与评分回归)

import type { Locale } from '../i18n/types';
import type { SoulCode } from './souls';

export { BANK_VERSION } from './quizSession';
export const IPIP_PERMISSION_URL = 'https://ipip.ori.org/newPermission.htm';

export interface QuestionItem {
  id: string;
  q: string;
  trait: SoulCode;
  reverse: boolean;
  labels: string[];
  likert: boolean;
}

export interface QuestionRecord {
  id: string;
  trait: SoulCode;
  reverse: boolean;
  sourceId: string | null;
  sourceAliases: string | null;
  sourceOriginalEN: string | null;
  reviewZh: string;
  adaptationNote: string;
  text: Record<Locale, string>;
}

// IPIP materials are public domain for commercial/non-commercial use.
// Grouping, adaptations, score presentation and Determination prompts belong to this site's design;
// borrowing source material does not validate this as a seven-factor psychological inventory.
export const QUESTION_BANK: QuestionRecord[] = [
  {
    "id": "V2-BRV-01",
    "trait": "BRV",
    "reverse": false,
    "sourceId": "W365",
    "sourceAliases": "W365",
    "sourceOriginalEN": "Am able to do what I should do, even when I feel scared.",
    "reviewZh": "即使感到害怕，我通常仍能做自己认为应该做的事。",
    "adaptationNote": "",
    "text": {
      "en": "Even when I feel scared, I can usually do what I believe I should do.",
      "ja": "怖いと感じても、するべきだと思うことはたいていできる。",
      "es": "Incluso cuando siento miedo, normalmente puedo hacer lo que creo que debo hacer.",
      "pt": "Mesmo quando sinto medo, geralmente consigo fazer o que acredito que devo fazer.",
      "ru": "Даже когда мне страшно, обычно я могу сделать то, что считаю нужным."
    }
  },
  {
    "id": "V2-BRV-02",
    "trait": "BRV",
    "reverse": false,
    "sourceId": "H1197",
    "sourceAliases": "H1197",
    "sourceOriginalEN": "Am able to stand up for myself.",
    "reviewZh": "当自己的合理界限被忽略时，我通常能为自己发声。",
    "adaptationNote": "",
    "text": {
      "en": "When my reasonable boundaries are ignored, I can usually speak up for myself.",
      "ja": "無理のない自分の境界を無視されたとき、たいていは自分のために声を上げられる。",
      "es": "Cuando no respetan mis límites razonables, normalmente puedo defenderlos.",
      "pt": "Quando meus limites razoáveis são ignorados, geralmente consigo me posicionar.",
      "ru": "Когда мои разумные личные границы игнорируют, обычно я могу за себя постоять."
    }
  },
  {
    "id": "V2-BRV-03",
    "trait": "BRV",
    "reverse": true,
    "sourceId": "S10",
    "sourceAliases": "S10",
    "sourceOriginalEN": "Often refrain from doing something because of my fear of being embarrassed.",
    "reviewZh": "害怕表现不好而尴尬时，我常常不愿尝试。",
    "adaptationNote": "",
    "text": {
      "en": "I often avoid trying something because I am afraid of embarrassing myself.",
      "ja": "恥をかくのが怖くて、何かに挑戦するのを避けることが多い。",
      "es": "A menudo evito intentar algo por miedo a hacer el ridículo.",
      "pt": "Muitas vezes evito tentar algo por medo de passar vergonha.",
      "ru": "Я часто не пробую что-то сделать, потому что боюсь опозориться."
    }
  },
  {
    "id": "V2-BRV-04",
    "trait": "BRV",
    "reverse": true,
    "sourceId": "V47",
    "sourceAliases": "V47",
    "sourceOriginalEN": "Avoid dealing with awkward situation.",
    "reviewZh": "遇到必须处理的尴尬局面时，我通常会回避。",
    "adaptationNote": "",
    "text": {
      "en": "I usually avoid dealing with awkward situations that need attention.",
      "ja": "対応が必要な気まずい状況でも、たいていは避けてしまう。",
      "es": "Normalmente evito afrontar situaciones incómodas que necesitan atención.",
      "pt": "Geralmente evito lidar com situações desconfortáveis que precisam ser resolvidas.",
      "ru": "Обычно я избегаю неловких ситуаций, с которыми нужно разобраться."
    }
  },
  {
    "id": "V2-BRV-05",
    "trait": "BRV",
    "reverse": true,
    "sourceId": "X206",
    "sourceAliases": "X206",
    "sourceOriginalEN": "Can't stand confrontations.",
    "reviewZh": "即使分歧需要解决，我也很难面对当面的冲突。",
    "adaptationNote": "",
    "text": {
      "en": "Even when a disagreement needs resolving, I find face-to-face conflict hard to handle.",
      "ja": "意見の違いを解決する必要があっても、面と向かって対立するのは苦手だ。",
      "es": "Aunque un desacuerdo necesite resolverse, me cuesta afrontar el conflicto cara a cara.",
      "pt": "Mesmo quando uma divergência precisa ser resolvida, tenho dificuldade para enfrentar um conflito pessoalmente.",
      "ru": "Даже когда разногласие нужно разрешить, мне трудно обсуждать конфликт лицом к лицу."
    }
  },
  {
    "id": "V2-BRV-06",
    "trait": "BRV",
    "reverse": true,
    "sourceId": "V53",
    "sourceAliases": "V53",
    "sourceOriginalEN": "Do not stand up for my beliefs.",
    "reviewZh": "涉及自己认同的原则时，我常常不敢表明立场。",
    "adaptationNote": "",
    "text": {
      "en": "I often stay silent instead of standing up for what I believe.",
      "ja": "自分の信念を擁護するより、黙ってしまうことが多い。",
      "es": "A menudo me quedo en silencio en vez de defender lo que creo.",
      "pt": "Muitas vezes fico em silêncio em vez de defender aquilo em que acredito.",
      "ru": "Я часто молчу вместо того, чтобы отстаивать свои убеждения."
    }
  },
  {
    "id": "V2-BRV-07",
    "trait": "BRV",
    "reverse": false,
    "sourceId": "V82",
    "sourceAliases": "V82",
    "sourceOriginalEN": "Don't hesitate to express an unpopular opinion.",
    "reviewZh": "即使意见不受欢迎，我通常也愿意表达出来。",
    "adaptationNote": "",
    "text": {
      "en": "I am usually willing to express an opinion even when it is unpopular.",
      "ja": "あまり支持されない意見でも、たいていは伝える気がある。",
      "es": "Normalmente estoy dispuesto a expresar una opinión aunque sea impopular.",
      "pt": "Geralmente estou disposto a expressar uma opinião, mesmo que seja impopular.",
      "ru": "Обычно я готов высказать мнение, даже если оно непопулярно."
    }
  },
  {
    "id": "V2-BRV-08",
    "trait": "BRV",
    "reverse": false,
    "sourceId": "W362",
    "sourceAliases": "W362*",
    "sourceOriginalEN": "Can think of one or more times in my life where I was very brave.",
    "reviewZh": "我能想起自己在害怕时仍面对困难的一次经历。",
    "adaptationNote": "A general memory of being brave was made more specific to facing difficulty while afraid.",
    "text": {
      "en": "I can recall a time when I faced something difficult despite feeling scared.",
      "ja": "怖さを感じながらも困難に向き合った経験を思い出せる。",
      "es": "Puedo recordar una ocasión en que afronté algo difícil a pesar de sentir miedo.",
      "pt": "Consigo lembrar de uma ocasião em que enfrentei algo difícil apesar de sentir medo.",
      "ru": "Я могу вспомнить случай, когда взялся за что-то трудное, несмотря на страх."
    }
  },
  {
    "id": "V2-BRV-09",
    "trait": "BRV",
    "reverse": false,
    "sourceId": "V228",
    "sourceAliases": "V228",
    "sourceOriginalEN": "Can face my fears.",
    "reviewZh": "遇到让我害怕的事情时，我愿意在安全范围内面对它。",
    "adaptationNote": "",
    "text": {
      "en": "I am willing to face things that scare me when it is reasonably safe to do so.",
      "ja": "無理のない安全が保てるなら、怖いと感じることにも向き合う気がある。",
      "es": "Estoy dispuesto a afrontar lo que me asusta cuando hacerlo es razonablemente seguro.",
      "pt": "Estou disposto a enfrentar o que me assusta quando é razoavelmente seguro fazer isso.",
      "ru": "Я готов встретиться с тем, что меня пугает, если это достаточно безопасно."
    }
  },
  {
    "id": "V2-JUS-01",
    "trait": "JUS",
    "reverse": false,
    "sourceId": "V120",
    "sourceAliases": "V120",
    "sourceOriginalEN": "Believe that everyone's rights are equally important.",
    "reviewZh": "即使不喜欢某个人，我也认为他的基本权利同样重要。",
    "adaptationNote": "",
    "text": {
      "en": "Even when I dislike someone, I believe their basic rights matter as much as anyone else's.",
      "ja": "苦手な相手であっても、その人の基本的な権利は他の人と同じように大切だと思う。",
      "es": "Aunque alguien me caiga mal, creo que sus derechos básicos importan tanto como los de los demás.",
      "pt": "Mesmo quando não gosto de alguém, acredito que seus direitos básicos importam tanto quanto os de qualquer pessoa.",
      "ru": "Даже если мне кто-то не нравится, я считаю его основные права столь же важными, как права остальных."
    }
  },
  {
    "id": "V2-JUS-02",
    "trait": "JUS",
    "reverse": false,
    "sourceId": "W78",
    "sourceAliases": "W78",
    "sourceOriginalEN": "Try to act fairly in all situations.",
    "reviewZh": "在日常决定中，我通常会尽量使用公平的标准。",
    "adaptationNote": "",
    "text": {
      "en": "I usually try to use fair standards in everyday decisions.",
      "ja": "日常の判断では、たいてい公平な基準を使うようにしている。",
      "es": "Normalmente intento usar criterios justos en las decisiones cotidianas.",
      "pt": "Geralmente tento usar critérios justos nas decisões do dia a dia.",
      "ru": "В повседневных решениях я обычно стараюсь применять справедливые критерии."
    }
  },
  {
    "id": "V2-JUS-03",
    "trait": "JUS",
    "reverse": false,
    "sourceId": "W81",
    "sourceAliases": "W81",
    "sourceOriginalEN": "Think that everyone should get a fair share.",
    "reviewZh": "分配共同成果时，我认为每个人都应得到公平的份额。",
    "adaptationNote": "",
    "text": {
      "en": "When sharing the results of a joint effort, I believe everyone should receive a fair share.",
      "ja": "共同で取り組んだ成果を分けるとき、誰もが公平な取り分を得るべきだと思う。",
      "es": "Al repartir los resultados de un esfuerzo conjunto, creo que todos deben recibir una parte justa.",
      "pt": "Ao dividir os resultados de um esforço conjunto, acredito que todos devem receber uma parte justa.",
      "ru": "При распределении результатов общего труда я считаю, что каждый должен получить справедливую долю."
    }
  },
  {
    "id": "V2-JUS-04",
    "trait": "JUS",
    "reverse": false,
    "sourceId": "H186",
    "sourceAliases": "H186, V94",
    "sourceOriginalEN": "Treat all people equally.",
    "reviewZh": "面对熟人和陌生人时，我通常会给予同等的基本尊重。",
    "adaptationNote": "",
    "text": {
      "en": "I usually give friends and strangers the same basic respect.",
      "ja": "友人にも知らない人にも、たいてい同じように基本的な敬意を払う。",
      "es": "Normalmente trato a amigos y desconocidos con el mismo respeto básico.",
      "pt": "Geralmente trato amigos e desconhecidos com o mesmo respeito básico.",
      "ru": "Обычно я отношусь к друзьям и незнакомцам с одинаковым базовым уважением."
    }
  },
  {
    "id": "V2-JUS-05",
    "trait": "JUS",
    "reverse": false,
    "sourceId": "V188",
    "sourceAliases": "V188",
    "sourceOriginalEN": "Give everyone a chance.",
    "reviewZh": "评价别人是否能做好一件事前，我通常愿意先给他机会。",
    "adaptationNote": "",
    "text": {
      "en": "Before judging whether someone can do a task well, I am usually willing to give them a chance.",
      "ja": "ある仕事ができるか判断する前に、たいていはその人に試す機会を与える気がある。",
      "es": "Antes de juzgar si alguien puede hacer bien una tarea, normalmente estoy dispuesto a darle una oportunidad.",
      "pt": "Antes de julgar se alguém pode fazer bem uma tarefa, geralmente estou disposto a dar uma chance.",
      "ru": "Прежде чем судить, хорошо ли человек справится с задачей, обычно я готов дать ему шанс."
    }
  },
  {
    "id": "V2-JUS-06",
    "trait": "JUS",
    "reverse": true,
    "sourceId": "V279",
    "sourceAliases": "V279",
    "sourceOriginalEN": "Take unfair advantage of others.",
    "reviewZh": "有机会时，我有时会以不公平的方式利用别人。",
    "adaptationNote": "",
    "text": {
      "en": "When I get the chance, I sometimes take unfair advantage of others.",
      "ja": "機会があると、他人を不公平な形で利用してしまうことがある。",
      "es": "Cuando tengo la oportunidad, a veces me aprovecho injustamente de los demás.",
      "pt": "Quando tenho a oportunidade, às vezes me aproveito dos outros de forma injusta.",
      "ru": "Когда есть возможность, я иногда несправедливо использую других в своих интересах."
    }
  },
  {
    "id": "V2-JUS-07",
    "trait": "JUS",
    "reverse": false,
    "sourceId": "A55",
    "sourceAliases": "A55",
    "sourceOriginalEN": "Believe that cheating is wrong because it is unfair to others.",
    "reviewZh": "我反对作弊，主要因为它会让其他人受到不公平的对待。",
    "adaptationNote": "",
    "text": {
      "en": "I oppose cheating mainly because it treats other people unfairly.",
      "ja": "不正に反対する主な理由は、他の人にとって不公平だからだ。",
      "es": "Me opongo a hacer trampas principalmente porque es injusto para los demás.",
      "pt": "Sou contra trapacear principalmente porque isso é injusto com os outros.",
      "ru": "Я выступаю против обмана прежде всего потому, что это несправедливо по отношению к другим."
    }
  },
  {
    "id": "V2-JUS-08",
    "trait": "JUS",
    "reverse": true,
    "sourceId": "V307",
    "sourceAliases": "V307",
    "sourceOriginalEN": "Believe that everyone should have a say.",
    "reviewZh": "团队作决定时，我觉得有些受影响的人不必有发言机会。",
    "adaptationNote": "The public-domain positive statement was adapted into a negative statement; this site reverses its response when scoring.",
    "text": {
      "en": "When a team makes a decision, I think some people affected by it do not need a say.",
      "ja": "チームが判断するとき、その判断の影響を受ける人の中にも発言の機会が不要な人がいると思う。",
      "es": "Cuando un equipo toma una decisión, creo que algunas personas afectadas no necesitan tener voz.",
      "pt": "Quando uma equipe toma uma decisão, acho que algumas pessoas afetadas não precisam ter voz.",
      "ru": "Когда команда принимает решение, я считаю, что некоторым затронутым людям не обязательно давать слово."
    }
  },
  {
    "id": "V2-JUS-09",
    "trait": "JUS",
    "reverse": true,
    "sourceId": "P398",
    "sourceAliases": "P398",
    "sourceOriginalEN": "Try to get rid of my prejudices.",
    "reviewZh": "形成对某个人的偏见后，我通常不太愿意重新审视。",
    "adaptationNote": "The public-domain positive statement was adapted into a negative statement; this site reverses its response when scoring.",
    "text": {
      "en": "Once I form a prejudice about someone, I am usually reluctant to reconsider it.",
      "ja": "誰かに偏見を持つと、たいていはそれを見直す気になれない。",
      "es": "Una vez que me formo un prejuicio sobre alguien, normalmente me cuesta reconsiderarlo.",
      "pt": "Depois de formar um preconceito sobre alguém, geralmente reluto em reconsiderá-lo.",
      "ru": "Сформировав предубеждение о человеке, обычно я неохотно его пересматриваю."
    }
  },
  {
    "id": "V2-KND-01",
    "trait": "KND",
    "reverse": false,
    "sourceId": "H1100",
    "sourceAliases": "H1100, X31",
    "sourceOriginalEN": "Am concerned about others.",
    "reviewZh": "身边的人遇到麻烦时，我通常会关心他们的处境。",
    "adaptationNote": "",
    "text": {
      "en": "When people around me face difficulties, I usually care about what they are going through.",
      "ja": "周りの人が困っているとき、たいていはその人の状況を気にかける。",
      "es": "Cuando las personas de mi entorno tienen dificultades, normalmente me importa lo que están viviendo.",
      "pt": "Quando pessoas próximas enfrentam dificuldades, geralmente me importo com o que estão passando.",
      "ru": "Когда у окружающих возникают трудности, обычно мне небезразлично, через что они проходят."
    }
  },
  {
    "id": "V2-KND-02",
    "trait": "KND",
    "reverse": false,
    "sourceId": "M14",
    "sourceAliases": "M14",
    "sourceOriginalEN": "Like to help others.",
    "reviewZh": "遇到能够帮上忙的情况时，我通常愿意帮助别人。",
    "adaptationNote": "",
    "text": {
      "en": "When I can be useful, I am usually willing to help others.",
      "ja": "自分が役に立てるとき、たいていは他人を助ける気がある。",
      "es": "Cuando puedo ser útil, normalmente estoy dispuesto a ayudar a los demás.",
      "pt": "Quando posso ser útil, geralmente estou disposto a ajudar os outros.",
      "ru": "Когда я могу быть полезен, обычно я готов помочь другим."
    }
  },
  {
    "id": "V2-KND-03",
    "trait": "KND",
    "reverse": false,
    "sourceId": "V95",
    "sourceAliases": "V95",
    "sourceOriginalEN": "Am a good listener.",
    "reviewZh": "别人向我倾诉时，我通常能认真听。",
    "adaptationNote": "",
    "text": {
      "en": "When someone confides in me, I can usually listen carefully.",
      "ja": "誰かが悩みを話してくれたとき、たいていは注意深く聞ける。",
      "es": "Cuando alguien se sincera conmigo, normalmente puedo escuchar con atención.",
      "pt": "Quando alguém desabafa comigo, geralmente consigo ouvir com atenção.",
      "ru": "Когда кто-то делится со мной переживаниями, обычно я могу внимательно выслушать."
    }
  },
  {
    "id": "V2-KND-04",
    "trait": "KND",
    "reverse": false,
    "sourceId": "Q117",
    "sourceAliases": "Q117",
    "sourceOriginalEN": "Am eager to soothe hurt feelings.",
    "reviewZh": "有人因一件事感到受伤时，我通常想安慰他。",
    "adaptationNote": "",
    "text": {
      "en": "When someone's feelings have been hurt, I usually want to comfort them.",
      "ja": "誰かが傷ついているとき、たいていは慰めたいと思う。",
      "es": "Cuando alguien se siente herido, normalmente quiero consolarlo.",
      "pt": "Quando alguém está magoado, geralmente quero confortá-lo.",
      "ru": "Когда чьи-то чувства задеты, обычно я хочу утешить этого человека."
    }
  },
  {
    "id": "V2-KND-05",
    "trait": "KND",
    "reverse": true,
    "sourceId": "V195",
    "sourceAliases": "V195",
    "sourceOriginalEN": "Am only kind to others if they have been kind to me.",
    "reviewZh": "我通常只对那些先对我好的人友善。",
    "adaptationNote": "",
    "text": {
      "en": "I am usually kind only to people who have been kind to me first.",
      "ja": "たいていは、先に自分に親切にしてくれた人にだけ親切にする。",
      "es": "Normalmente solo soy amable con quienes han sido amables conmigo primero.",
      "pt": "Geralmente só sou gentil com quem foi gentil comigo primeiro.",
      "ru": "Обычно я добр только к тем, кто сначала проявил доброту ко мне."
    }
  },
  {
    "id": "V2-KND-06",
    "trait": "KND",
    "reverse": true,
    "sourceId": "V6",
    "sourceAliases": "V6",
    "sourceOriginalEN": "Get impatient when others talk to me about their problems.",
    "reviewZh": "别人谈到自己的问题时，我很容易不耐烦。",
    "adaptationNote": "",
    "text": {
      "en": "I easily become impatient when others talk to me about their problems.",
      "ja": "他人が自分の問題を話すと、すぐにいらいらしてしまう。",
      "es": "Me impaciento fácilmente cuando los demás me hablan de sus problemas.",
      "pt": "Fico impaciente com facilidade quando os outros me falam de seus problemas.",
      "ru": "Я легко теряю терпение, когда другие рассказывают мне о своих проблемах."
    }
  },
  {
    "id": "V2-KND-07",
    "trait": "KND",
    "reverse": false,
    "sourceId": "D52",
    "sourceAliases": "D52",
    "sourceOriginalEN": "Am willing to make personal sacrifices in order to help people I care about.",
    "reviewZh": "为了帮助在意的人，我愿意付出自己能够承担的小成本。",
    "adaptationNote": "Personal sacrifice was narrowed to a small, manageable cost rather than unlimited self-sacrifice.",
    "text": {
      "en": "To help someone I care about, I am willing to accept a small cost I can manage.",
      "ja": "大切な人を助けるためなら、無理のない小さな負担を引き受ける気がある。",
      "es": "Para ayudar a alguien que me importa, estoy dispuesto a asumir un pequeño coste que pueda afrontar.",
      "pt": "Para ajudar alguém com quem me importo, estou disposto a assumir um pequeno custo que consiga suportar.",
      "ru": "Чтобы помочь близкому человеку, я готов понести небольшие посильные затраты."
    }
  },
  {
    "id": "V2-KND-08",
    "trait": "KND",
    "reverse": false,
    "sourceId": "V303",
    "sourceAliases": "V303",
    "sourceOriginalEN": "Love to let others share the spotlight.",
    "reviewZh": "别人获得关注或认可时，我通常愿意让他们享受这一刻。",
    "adaptationNote": "",
    "text": {
      "en": "When others receive attention or recognition, I am usually happy to let them enjoy it.",
      "ja": "他の人が注目や評価を受けるとき、たいていはその人にその場を楽しんでもらいたいと思う。",
      "es": "Cuando otros reciben atención o reconocimiento, normalmente me alegra dejar que lo disfruten.",
      "pt": "Quando outros recebem atenção ou reconhecimento, geralmente fico feliz em deixá-los aproveitar.",
      "ru": "Когда другие получают внимание или признание, обычно я рад дать им насладиться этим."
    }
  },
  {
    "id": "V2-KND-09",
    "trait": "KND",
    "reverse": true,
    "sourceId": "X203",
    "sourceAliases": "X203",
    "sourceOriginalEN": "Am indifferent to the feelings of others.",
    "reviewZh": "别人的感受通常不会引起我的关心。",
    "adaptationNote": "",
    "text": {
      "en": "Other people's feelings usually do not concern me much.",
      "ja": "他人の気持ちは、たいていあまり気にならない。",
      "es": "Normalmente no me importan mucho los sentimientos de los demás.",
      "pt": "Geralmente não me importo muito com os sentimentos dos outros.",
      "ru": "Обычно чувства других людей меня мало волнуют."
    }
  },
  {
    "id": "V2-KND-10",
    "trait": "KND",
    "reverse": true,
    "sourceId": "X227",
    "sourceAliases": "X227",
    "sourceOriginalEN": "Am not interested in other people's problems.",
    "reviewZh": "对其他人的困难，我通常没有多少兴趣。",
    "adaptationNote": "",
    "text": {
      "en": "I usually have little interest in other people's difficulties.",
      "ja": "他人の困りごとには、たいていあまり関心がない。",
      "es": "Normalmente tengo poco interés en las dificultades de los demás.",
      "pt": "Geralmente tenho pouco interesse nas dificuldades dos outros.",
      "ru": "Обычно трудности других людей меня мало интересуют."
    }
  },
  {
    "id": "V2-PAT-01",
    "trait": "PAT",
    "reverse": false,
    "sourceId": "D63",
    "sourceAliases": "D63",
    "sourceOriginalEN": "Am usually a patient person.",
    "reviewZh": "在日常等待和相处中，我通常是有耐心的人。",
    "adaptationNote": "This site groups waiting and frustration responses under its own Patience definition.",
    "text": {
      "en": "In everyday waiting and interactions, I am usually a patient person.",
      "ja": "日常の待ち時間や人とのやり取りでは、たいてい辛抱強くいられる。",
      "es": "En las esperas y las relaciones cotidianas, normalmente soy paciente.",
      "pt": "Nas esperas e nas interações do dia a dia, geralmente sou paciente.",
      "ru": "В повседневном ожидании и общении обычно я терпелив."
    }
  },
  {
    "id": "V2-PAT-02",
    "trait": "PAT",
    "reverse": false,
    "sourceId": "Q59",
    "sourceAliases": "Q59",
    "sourceOriginalEN": "Am patient with people who annoy me.",
    "reviewZh": "面对让我觉得烦的人时，我通常仍能保持耐心。",
    "adaptationNote": "This site groups waiting and frustration responses under its own Patience definition.",
    "text": {
      "en": "I can usually remain patient with people who annoy me.",
      "ja": "自分をいらだたせる相手にも、たいていは辛抱強く接することができる。",
      "es": "Normalmente puedo mantener la paciencia con quienes me irritan.",
      "pt": "Geralmente consigo manter a paciência com pessoas que me irritam.",
      "ru": "Обычно я могу сохранять терпение с людьми, которые меня раздражают."
    }
  },
  {
    "id": "V2-PAT-03",
    "trait": "PAT",
    "reverse": false,
    "sourceId": "D68",
    "sourceAliases": "D68",
    "sourceOriginalEN": "Find that it takes a lot to make me feel angry at someone.",
    "reviewZh": "通常需要相当多的刺激，我才会真正对别人生气。",
    "adaptationNote": "This site groups waiting and frustration responses under its own Patience definition.",
    "text": {
      "en": "It usually takes quite a lot to make me truly angry at someone.",
      "ja": "誰かに本当に腹を立てるには、たいていかなりのことが必要だ。",
      "es": "Normalmente hace falta bastante para que me enfade de verdad con alguien.",
      "pt": "Geralmente é preciso bastante para eu ficar realmente bravo com alguém.",
      "ru": "Обычно нужно довольно многое, чтобы я по-настоящему разозлился на человека."
    }
  },
  {
    "id": "V2-PAT-04",
    "trait": "PAT",
    "reverse": true,
    "sourceId": "H757",
    "sourceAliases": "H757",
    "sourceOriginalEN": "Can't stand waiting.",
    "reviewZh": "需要等待时，我通常很难忍受。",
    "adaptationNote": "This site groups waiting and frustration responses under its own Patience definition.",
    "text": {
      "en": "I usually find waiting hard to tolerate.",
      "ja": "待つことは、たいてい我慢しにくい。",
      "es": "Normalmente me cuesta tolerar las esperas.",
      "pt": "Geralmente tenho dificuldade para tolerar a espera.",
      "ru": "Обычно мне трудно переносить ожидание."
    }
  },
  {
    "id": "V2-PAT-05",
    "trait": "PAT",
    "reverse": true,
    "sourceId": "D49",
    "sourceAliases": "D49",
    "sourceOriginalEN": "Find it very annoying to have to wait a few minutes for a phone connection.",
    "reviewZh": "因为连接或回应问题等上几分钟，会让我非常烦躁。",
    "adaptationNote": "This site groups waiting and frustration responses under its own Patience definition.",
    "text": {
      "en": "Waiting a few minutes for a connection or reply can make me very irritated.",
      "ja": "接続や返事を数分待つだけで、とてもいらいらすることがある。",
      "es": "Esperar unos minutos por una conexión o una respuesta puede irritarme mucho.",
      "pt": "Esperar alguns minutos por uma conexão ou resposta pode me irritar muito.",
      "ru": "Ожидание соединения или ответа в течение нескольких минут может сильно меня раздражать."
    }
  },
  {
    "id": "V2-PAT-06",
    "trait": "PAT",
    "reverse": true,
    "sourceId": "H755",
    "sourceAliases": "H755",
    "sourceOriginalEN": "Lose my temper.",
    "reviewZh": "受挫时，我有时会失去对脾气的控制。",
    "adaptationNote": "This site groups waiting and frustration responses under its own Patience definition.",
    "text": {
      "en": "When things go wrong, I sometimes lose my temper.",
      "ja": "物事がうまくいかないと、ときどきかっとなってしまう。",
      "es": "Cuando las cosas van mal, a veces pierdo los estribos.",
      "pt": "Quando as coisas dão errado, às vezes perco a calma.",
      "ru": "Когда что-то идёт не так, я иногда выхожу из себя."
    }
  },
  {
    "id": "V2-PAT-07",
    "trait": "PAT",
    "reverse": false,
    "sourceId": "X59",
    "sourceAliases": "X59",
    "sourceOriginalEN": "Am not easily frustrated.",
    "reviewZh": "遇到小小的不顺时，我通常不会很快感到挫败。",
    "adaptationNote": "This site groups waiting and frustration responses under its own Patience definition.",
    "text": {
      "en": "Small setbacks usually do not frustrate me quickly.",
      "ja": "少しうまくいかないことがあっても、たいていすぐにいらいらしない。",
      "es": "Los pequeños contratiempos normalmente no me frustran enseguida.",
      "pt": "Pequenos contratempos geralmente não me frustram de imediato.",
      "ru": "Небольшие неудачи обычно не вызывают у меня быстрое раздражение."
    }
  },
  {
    "id": "V2-PAT-08",
    "trait": "PAT",
    "reverse": false,
    "sourceId": "W316",
    "sourceAliases": "W316*",
    "sourceOriginalEN": "Am able to calm myself down quite quickly when upset.",
    "reviewZh": "心情受到影响后，我通常能比较快让自己平静下来。",
    "adaptationNote": "This site groups waiting and frustration responses under its own Patience definition.",
    "text": {
      "en": "After getting upset, I can usually calm myself down fairly quickly.",
      "ja": "気持ちが乱れた後でも、たいていは比較的早く自分を落ち着かせられる。",
      "es": "Después de alterarme, normalmente puedo calmarme bastante rápido.",
      "pt": "Depois de ficar abalado, geralmente consigo me acalmar relativamente rápido.",
      "ru": "Расстроившись, обычно я могу довольно быстро успокоиться."
    }
  },
  {
    "id": "V2-PAT-09",
    "trait": "PAT",
    "reverse": true,
    "sourceId": "H758",
    "sourceAliases": "H758",
    "sourceOriginalEN": "Act out my frustrations on others.",
    "reviewZh": "事情不顺时，我有时会把烦躁发泄到别人身上。",
    "adaptationNote": "This site groups waiting and frustration responses under its own Patience definition.",
    "text": {
      "en": "When things go badly, I sometimes take my frustration out on others.",
      "ja": "物事がうまくいかないと、ときどき他人にいらだちをぶつけてしまう。",
      "es": "Cuando las cosas van mal, a veces descargo mi frustración en los demás.",
      "pt": "Quando as coisas vão mal, às vezes desconto minha frustração nos outros.",
      "ru": "Когда дела идут плохо, я иногда срываю раздражение на других."
    }
  },
  {
    "id": "V2-INT-01",
    "trait": "INT",
    "reverse": false,
    "sourceId": "H149",
    "sourceAliases": "H149, X33, V14",
    "sourceOriginalEN": "Keep my promises.",
    "reviewZh": "答应别人的事情，我通常会守住承诺。",
    "adaptationNote": "",
    "text": {
      "en": "I usually keep the promises I make to other people.",
      "ja": "他人にした約束は、たいてい守る。",
      "es": "Normalmente cumplo las promesas que hago a los demás.",
      "pt": "Geralmente cumpro as promessas que faço aos outros.",
      "ru": "Обычно я выполняю обещания, данные другим."
    }
  },
  {
    "id": "V2-INT-02",
    "trait": "INT",
    "reverse": true,
    "sourceId": "E37",
    "sourceAliases": "E37",
    "sourceOriginalEN": "Can never keep a secret.",
    "reviewZh": "别人托付给我的私密信息，我有时很难保密。",
    "adaptationNote": "The original absolute wording was softened into a tendency, while keeping the negative direction.",
    "text": {
      "en": "I sometimes struggle to keep private information entrusted to me confidential.",
      "ja": "託された個人の秘密を守るのが、ときどき難しいと感じる。",
      "es": "A veces me cuesta mantener en secreto la información privada que me confían.",
      "pt": "Às vezes tenho dificuldade para manter em segredo informações privadas que me confiam.",
      "ru": "Мне иногда трудно не разглашать доверенную мне личную информацию."
    }
  },
  {
    "id": "V2-INT-03",
    "trait": "INT",
    "reverse": false,
    "sourceId": "V86",
    "sourceAliases": "V86",
    "sourceOriginalEN": "Believe that honesty is the basis for trust.",
    "reviewZh": "我认为信任主要建立在诚实之上。",
    "adaptationNote": "",
    "text": {
      "en": "I believe trust is mainly built on honesty.",
      "ja": "信頼は主に正直さによって築かれると思う。",
      "es": "Creo que la confianza se construye principalmente sobre la honestidad.",
      "pt": "Acredito que a confiança se constrói principalmente com honestidade.",
      "ru": "Я считаю, что доверие строится прежде всего на честности."
    }
  },
  {
    "id": "V2-INT-04",
    "trait": "INT",
    "reverse": false,
    "sourceId": "H178",
    "sourceAliases": "H178",
    "sourceOriginalEN": "Act according to my conscience.",
    "reviewZh": "作决定时，我通常会按照自己的良知行事。",
    "adaptationNote": "",
    "text": {
      "en": "When making decisions, I usually act according to my conscience.",
      "ja": "判断するとき、たいていは自分の良心に従って行動する。",
      "es": "Al tomar decisiones, normalmente actúo según mi conciencia.",
      "pt": "Ao tomar decisões, geralmente ajo de acordo com minha consciência.",
      "ru": "Принимая решения, обычно я поступаю по совести."
    }
  },
  {
    "id": "V2-INT-05",
    "trait": "INT",
    "reverse": false,
    "sourceId": "V266",
    "sourceAliases": "V266",
    "sourceOriginalEN": "Am quick to admit making a mistake.",
    "reviewZh": "发现自己犯错时，我通常会及时承认。",
    "adaptationNote": "",
    "text": {
      "en": "When I notice I have made a mistake, I usually admit it promptly.",
      "ja": "自分の間違いに気づいたら、たいていはすぐに認める。",
      "es": "Cuando me doy cuenta de un error, normalmente lo admito pronto.",
      "pt": "Quando percebo que cometi um erro, geralmente admito logo.",
      "ru": "Заметив свою ошибку, обычно я быстро её признаю."
    }
  },
  {
    "id": "V2-INT-06",
    "trait": "INT",
    "reverse": true,
    "sourceId": "V143",
    "sourceAliases": "V143",
    "sourceOriginalEN": "Lie to get myself out of trouble.",
    "reviewZh": "为了摆脱麻烦，我有时会说谎。",
    "adaptationNote": "",
    "text": {
      "en": "I sometimes lie to get myself out of trouble.",
      "ja": "面倒から逃れるために、ときどきうそをつく。",
      "es": "A veces miento para salir de un problema.",
      "pt": "Às vezes minto para sair de uma situação difícil.",
      "ru": "Я иногда лгу, чтобы избежать неприятностей."
    }
  },
  {
    "id": "V2-INT-07",
    "trait": "INT",
    "reverse": true,
    "sourceId": "H1331",
    "sourceAliases": "H1331",
    "sourceOriginalEN": "Hide my real intentions.",
    "reviewZh": "向别人提出请求时，我有时会隐藏自己的真实目的。",
    "adaptationNote": "",
    "text": {
      "en": "When asking something of others, I sometimes hide my real intentions.",
      "ja": "他人に何かを頼むとき、ときどき本当の目的を隠す。",
      "es": "Al pedir algo a los demás, a veces oculto mis verdaderas intenciones.",
      "pt": "Ao pedir algo aos outros, às vezes escondo minhas verdadeiras intenções.",
      "ru": "Когда я о чём-то прошу других, иногда я скрываю свои истинные намерения."
    }
  },
  {
    "id": "V2-INT-08",
    "trait": "INT",
    "reverse": true,
    "sourceId": "H748",
    "sourceAliases": "H748",
    "sourceOriginalEN": "Tell tall stories about myself.",
    "reviewZh": "描述自己的经历时，我有时会夸大事实。",
    "adaptationNote": "",
    "text": {
      "en": "When describing my experiences, I sometimes exaggerate the facts.",
      "ja": "自分の経験を話すとき、ときどき事実を大げさに伝える。",
      "es": "Al contar mis experiencias, a veces exagero los hechos.",
      "pt": "Ao contar minhas experiências, às vezes exagero os fatos.",
      "ru": "Рассказывая о своём опыте, я иногда преувеличиваю факты."
    }
  },
  {
    "id": "V2-INT-09",
    "trait": "INT",
    "reverse": false,
    "sourceId": "W315",
    "sourceAliases": "W315",
    "sourceOriginalEN": "Keep promises that I make to myself.",
    "reviewZh": "即使承诺只对自己作出，我通常也会认真对待。",
    "adaptationNote": "",
    "text": {
      "en": "I usually take promises to myself seriously, even if no one else knows about them.",
      "ja": "他の人が知らなくても、自分にした約束はたいてい真剣に受け止める。",
      "es": "Normalmente tomo en serio las promesas que me hago, aunque nadie más las conozca.",
      "pt": "Geralmente levo a sério as promessas que faço a mim mesmo, mesmo que ninguém mais saiba delas.",
      "ru": "Обычно я серьёзно отношусь к обещаниям самому себе, даже если другие о них не знают."
    }
  },
  {
    "id": "V2-PER-01",
    "trait": "PER",
    "reverse": false,
    "sourceId": "H254",
    "sourceAliases": "H254",
    "sourceOriginalEN": "Finish what I start.",
    "reviewZh": "开始一项事情后，我通常会把它完成。",
    "adaptationNote": "",
    "text": {
      "en": "Once I start something, I usually finish it.",
      "ja": "何かを始めたら、たいていは最後までやり遂げる。",
      "es": "Cuando empiezo algo, normalmente lo termino.",
      "pt": "Quando começo algo, geralmente termino.",
      "ru": "Начав что-то, обычно я довожу это до конца."
    }
  },
  {
    "id": "V2-PER-02",
    "trait": "PER",
    "reverse": false,
    "sourceId": "X146",
    "sourceAliases": "X146",
    "sourceOriginalEN": "Follow through on my commitments.",
    "reviewZh": "对已经承担的任务，我通常会持续跟进。",
    "adaptationNote": "",
    "text": {
      "en": "I usually follow through on tasks I have committed to.",
      "ja": "引き受けた仕事には、たいてい最後まで取り組む。",
      "es": "Normalmente doy continuidad a las tareas que me he comprometido a hacer.",
      "pt": "Geralmente dou continuidade às tarefas que me comprometi a fazer.",
      "ru": "Обычно я последовательно выполняю задачи, за которые взялся."
    }
  },
  {
    "id": "V2-PER-03",
    "trait": "PER",
    "reverse": false,
    "sourceId": "X263",
    "sourceAliases": "X263",
    "sourceOriginalEN": "Make plans and stick to them.",
    "reviewZh": "制定行动计划后，我通常能按计划执行。",
    "adaptationNote": "",
    "text": {
      "en": "After making an action plan, I can usually stick to it.",
      "ja": "行動の計画を立てたら、たいていはそれに沿って進められる。",
      "es": "Después de hacer un plan de acción, normalmente puedo seguirlo.",
      "pt": "Depois de fazer um plano de ação, geralmente consigo segui-lo.",
      "ru": "Составив план действий, обычно я могу его придерживаться."
    }
  },
  {
    "id": "V2-PER-04",
    "trait": "PER",
    "reverse": false,
    "sourceId": "W155",
    "sourceAliases": "W155",
    "sourceOriginalEN": "Am able to work hard to solve problems even when it takes a long time.",
    "reviewZh": "即使解决问题需要很长时间，我通常也能继续努力。",
    "adaptationNote": "",
    "text": {
      "en": "Even when solving a problem takes a long time, I can usually keep working on it.",
      "ja": "問題の解決に長い時間がかかっても、たいていは取り組み続けられる。",
      "es": "Aunque resolver un problema lleve mucho tiempo, normalmente puedo seguir trabajando en él.",
      "pt": "Mesmo quando resolver um problema leva muito tempo, geralmente consigo continuar trabalhando nele.",
      "ru": "Даже если решение проблемы занимает много времени, обычно я могу продолжать над ней работать."
    }
  },
  {
    "id": "V2-PER-05",
    "trait": "PER",
    "reverse": false,
    "sourceId": "H268",
    "sourceAliases": "H268",
    "sourceOriginalEN": "Am not easily distracted.",
    "reviewZh": "执行任务时，我通常不容易被无关的事分散注意。",
    "adaptationNote": "",
    "text": {
      "en": "Unrelated things usually do not easily distract me from a task.",
      "ja": "関係のないことに、作業から注意をそらされることはたいてい少ない。",
      "es": "Las cosas ajenas a una tarea normalmente no me distraen con facilidad.",
      "pt": "Coisas sem relação com uma tarefa geralmente não me distraem com facilidade.",
      "ru": "Посторонние вещи обычно не так легко отвлекают меня от задачи."
    }
  },
  {
    "id": "V2-PER-06",
    "trait": "PER",
    "reverse": true,
    "sourceId": "H647",
    "sourceAliases": "H647",
    "sourceOriginalEN": "Am easily discouraged.",
    "reviewZh": "任务比预期困难时，我常常很快泄气。",
    "adaptationNote": "",
    "text": {
      "en": "I often lose heart quickly when a task is harder than expected.",
      "ja": "仕事が予想より難しいと、すぐに気持ちがくじけることが多い。",
      "es": "A menudo me desanimo pronto cuando una tarea es más difícil de lo esperado.",
      "pt": "Muitas vezes desanimo rapidamente quando uma tarefa é mais difícil do que eu esperava.",
      "ru": "Я часто быстро падаю духом, когда задача оказывается труднее, чем ожидалось."
    }
  },
  {
    "id": "V2-PER-07",
    "trait": "PER",
    "reverse": true,
    "sourceId": "H838",
    "sourceAliases": "H838",
    "sourceOriginalEN": "Don't bother to make an effort.",
    "reviewZh": "面对需要投入精力的工作时，我有时懒得努力。",
    "adaptationNote": "",
    "text": {
      "en": "When work needs effort, I sometimes do not bother to make that effort.",
      "ja": "努力が必要な仕事でも、ときどき努力するのが面倒になる。",
      "es": "Cuando un trabajo requiere esfuerzo, a veces no me molesto en hacerlo.",
      "pt": "Quando um trabalho exige esforço, às vezes não me dou ao trabalho de fazê-lo.",
      "ru": "Когда работа требует усилий, я иногда не утруждаю себя ими."
    }
  },
  {
    "id": "V2-PER-08",
    "trait": "PER",
    "reverse": true,
    "sourceId": "X167",
    "sourceAliases": "X167",
    "sourceOriginalEN": "Put little time and effort into my work.",
    "reviewZh": "对应该做的工作，我有时只投入很少的时间和精力。",
    "adaptationNote": "",
    "text": {
      "en": "I sometimes put very little time and effort into work I should do.",
      "ja": "するべき仕事に、ほとんど時間や労力をかけないことがある。",
      "es": "A veces dedico muy poco tiempo y esfuerzo al trabajo que debería hacer.",
      "pt": "Às vezes dedico muito pouco tempo e esforço ao trabalho que deveria fazer.",
      "ru": "Я иногда вкладываю очень мало времени и сил в работу, которую должен выполнить."
    }
  },
  {
    "id": "V2-PER-09",
    "trait": "PER",
    "reverse": false,
    "sourceId": "H368",
    "sourceAliases": "H368",
    "sourceOriginalEN": "Don't let others discourage me.",
    "reviewZh": "别人怀疑我能否完成任务时，我通常仍能继续努力。",
    "adaptationNote": "",
    "text": {
      "en": "I can usually keep working on a task even when other people doubt I can finish it.",
      "ja": "他の人にできるか疑われても、たいていは仕事に取り組み続けられる。",
      "es": "Normalmente puedo seguir trabajando en una tarea aunque otros duden de que pueda terminarla.",
      "pt": "Geralmente consigo continuar trabalhando em uma tarefa, mesmo quando outros duvidam que eu possa terminá-la.",
      "ru": "Обычно я могу продолжать работу над задачей, даже если другие сомневаются, что я её завершу."
    }
  },
  {
    "id": "V2-PER-10",
    "trait": "PER",
    "reverse": false,
    "sourceId": "V126",
    "sourceAliases": "V126",
    "sourceOriginalEN": "Finish things despite obstacles in the way.",
    "reviewZh": "执行过程中出现障碍时，我通常仍会争取完成它。",
    "adaptationNote": "",
    "text": {
      "en": "When obstacles appear during a task, I usually still try to finish it.",
      "ja": "作業の途中で障害が現れても、たいていは完成を目指す。",
      "es": "Cuando aparecen obstáculos en una tarea, normalmente sigo intentando terminarla.",
      "pt": "Quando surgem obstáculos em uma tarefa, geralmente continuo tentando terminá-la.",
      "ru": "Когда при выполнении задачи возникают препятствия, обычно я всё равно стараюсь её закончить."
    }
  },
  {
    "id": "V2-DET-01",
    "trait": "DET",
    "reverse": false,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "重要计划受挫后，我会重新判断接下来想追求的目标。",
    "adaptationNote": "",
    "text": {
      "en": "After an important plan suffers a setback, I reconsider the goal I want to pursue next.",
      "ja": "大切な計画がつまずいた後、次に目指したい目標を考え直す。",
      "es": "Después de un revés en un plan importante, reconsidero qué objetivo quiero perseguir a continuación.",
      "pt": "Depois de um revés em um plano importante, reconsidero qual objetivo quero buscar a seguir.",
      "ru": "После неудачи в важном плане я заново обдумываю, какой цели хочу добиваться дальше."
    }
  },
  {
    "id": "V2-DET-02",
    "trait": "DET",
    "reverse": true,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "第一次明显失败后，我通常不再认真考虑原来的目标。",
    "adaptationNote": "",
    "text": {
      "en": "After the first clear failure, I usually stop seriously considering my original goal.",
      "ja": "最初のはっきりした失敗の後、元の目標を真剣に考えなくなることが多い。",
      "es": "Tras el primer fracaso claro, normalmente dejo de considerar en serio mi objetivo original.",
      "pt": "Depois do primeiro fracasso claro, geralmente deixo de considerar seriamente meu objetivo original.",
      "ru": "После первой явной неудачи обычно я перестаю всерьёз рассматривать свою первоначальную цель."
    }
  },
  {
    "id": "V2-DET-03",
    "trait": "DET",
    "reverse": false,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "没有人催促时，我仍知道自己为什么想完成某个重要目标。",
    "adaptationNote": "",
    "text": {
      "en": "Even when no one pushes me, I know why an important goal matters to me.",
      "ja": "誰かに促されなくても、大切な目標がなぜ自分にとって重要なのか分かる。",
      "es": "Aunque nadie me impulse, sé por qué un objetivo importante tiene valor para mí.",
      "pt": "Mesmo quando ninguém me incentiva, sei por que um objetivo importante tem valor para mim.",
      "ru": "Даже если никто меня не подталкивает, я понимаю, почему важная цель имеет для меня значение."
    }
  },
  {
    "id": "V2-DET-04",
    "trait": "DET",
    "reverse": true,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "一时看不到结果时，我常常换掉原本很在意的目标。",
    "adaptationNote": "",
    "text": {
      "en": "When results do not appear quickly, I often replace goals I previously cared about.",
      "ja": "すぐに結果が出ないと、それまで大切にしていた目標を変えてしまうことが多い。",
      "es": "Cuando los resultados no llegan pronto, a menudo cambio objetivos que antes me importaban.",
      "pt": "Quando os resultados não aparecem logo, muitas vezes troco objetivos que antes eram importantes para mim.",
      "ru": "Когда результаты не появляются быстро, я часто меняю цели, которые раньше были мне важны."
    }
  },
  {
    "id": "V2-DET-05",
    "trait": "DET",
    "reverse": false,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "原来的路线行不通时，我愿意尝试通往同一目标的另一条路。",
    "adaptationNote": "",
    "text": {
      "en": "When my original route fails, I am willing to choose another route toward the same goal.",
      "ja": "最初の方法がうまくいかないとき、同じ目標に向かう別の方法を選ぶ気がある。",
      "es": "Cuando falla mi camino inicial, estoy dispuesto a elegir otro hacia el mismo objetivo.",
      "pt": "Quando meu caminho inicial falha, estou disposto a escolher outro rumo ao mesmo objetivo.",
      "ru": "Когда первоначальный путь не работает, я готов выбрать другой путь к той же цели."
    }
  },
  {
    "id": "V2-DET-06",
    "trait": "DET",
    "reverse": true,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "我的重要目标，多数是别人替我选择的。",
    "adaptationNote": "",
    "text": {
      "en": "My important goals are mostly things other people have chosen for me.",
      "ja": "自分の大切な目標は、主に他の人が自分のために選んだものだ。",
      "es": "Mis objetivos importantes son, en su mayoría, cosas que otros han elegido por mí.",
      "pt": "Meus objetivos importantes são, em sua maioria, coisas que outras pessoas escolheram por mim.",
      "ru": "Мои важные цели — в основном то, что другие выбрали за меня."
    }
  },
  {
    "id": "V2-DET-07",
    "trait": "DET",
    "reverse": false,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "受挫后，我能够选出一个仍然有助于目标的下一步。",
    "adaptationNote": "",
    "text": {
      "en": "After a setback, I can choose one next step that still serves my goal.",
      "ja": "つまずいた後でも、目標につながる次の一歩を一つ選べる。",
      "es": "Después de un revés, puedo elegir un siguiente paso que siga sirviendo a mi objetivo.",
      "pt": "Depois de um revés, consigo escolher um próximo passo que ainda contribua para meu objetivo.",
      "ru": "После неудачи я могу выбрать следующий шаг, который всё ещё служит моей цели."
    }
  },
  {
    "id": "V2-DET-08",
    "trait": "DET",
    "reverse": true,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "有多个选项时，我常只盼着结果变好，却不决定要追求哪个。",
    "adaptationNote": "",
    "text": {
      "en": "When several options compete, I keep wishing for a better outcome without deciding which to pursue.",
      "ja": "いくつかの選択肢があると、どれを目指すか決めずに、もっと良い結果を望み続けてしまう。",
      "es": "Cuando compiten varias opciones, sigo deseando un resultado mejor sin decidir cuál perseguir.",
      "pt": "Quando várias opções competem, continuo desejando um resultado melhor sem decidir qual buscar.",
      "ru": "Когда приходится выбирать из нескольких вариантов, я продолжаю желать лучшего результата, не решая, к чему стремиться."
    }
  },
  {
    "id": "V2-DET-09",
    "trait": "DET",
    "reverse": false,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "目标不再符合我在意的事情时，我能有意识地选择新的方向。",
    "adaptationNote": "",
    "text": {
      "en": "When a goal no longer fits what matters to me, I can deliberately choose a new direction.",
      "ja": "目標が自分の大切にすることに合わなくなったら、意識して新しい方向を選べる。",
      "es": "Cuando un objetivo deja de encajar con lo que me importa, puedo elegir conscientemente un nuevo rumbo.",
      "pt": "Quando um objetivo deixa de combinar com o que importa para mim, consigo escolher conscientemente um novo rumo.",
      "ru": "Когда цель перестаёт соответствовать тому, что мне важно, я могу осознанно выбрать новое направление."
    }
  },
  {
    "id": "V2-DET-10",
    "trait": "DET",
    "reverse": true,
    "sourceId": null,
    "sourceAliases": null,
    "sourceOriginalEN": null,
    "reviewZh": "受挫后，我常把接下来的方向交给环境，而不自己决定。",
    "adaptationNote": "",
    "text": {
      "en": "After a setback, I often leave the next direction to circumstances instead of deciding it myself.",
      "ja": "つまずいた後、次の方向を自分で決めず、状況任せにしてしまうことが多い。",
      "es": "Después de un revés, a menudo dejo el rumbo siguiente a las circunstancias en vez de decidirlo yo.",
      "pt": "Depois de um revés, muitas vezes deixo o próximo rumo nas mãos das circunstâncias em vez de decidir por mim.",
      "ru": "После неудачи я часто отдаю дальнейшее направление на волю обстоятельств вместо того, чтобы решить самому."
    }
  }
];

export const LIKERT_LABELS: Record<Locale, string[]> = {
  "en": [
    "Strongly disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly agree"
  ],
  "ja": [
    "まったくそう思わない",
    "そう思わない",
    "どちらでもない",
    "そう思う",
    "強くそう思う"
  ],
  "es": [
    "Totalmente en desacuerdo",
    "En desacuerdo",
    "Neutral",
    "De acuerdo",
    "Totalmente de acuerdo"
  ],
  "pt": [
    "Discordo totalmente",
    "Discordo",
    "Neutro",
    "Concordo",
    "Concordo totalmente"
  ],
  "ru": [
    "Совершенно не согласен",
    "Не согласен",
    "Нейтрально",
    "Согласен",
    "Полностью согласен"
  ]
};

export function getQuestions(locale: Locale): QuestionItem[] {
  return QUESTION_BANK.map(item => ({
    id: item.id, q: item.text[locale], trait: item.trait, reverse: item.reverse,
    labels: LIKERT_LABELS[locale], likert: true,
  }));
}

export const QUESTIONS = getQuestions('en');

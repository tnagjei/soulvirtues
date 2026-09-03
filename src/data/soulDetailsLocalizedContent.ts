// input: Reviewed multilingual item and personality copy for 28 localized soul detail pages
// output: Localized items and personalityAnalysis fields keyed by locale and soul slug
// pos: src/data/soulDetailsLocalizedContent.ts（更新规则：文件变更需同步本注释与所属目录 README）

import type { SoulDetail } from './soulDetails';

type LocalizedSoulContent = Pick<SoulDetail, 'items' | 'personalityAnalysis'>;

export const LOCALIZED_SOUL_CONTENT: Record<'es' | 'ja' | 'pt' | 'ru', Record<string, LocalizedSoulContent>> = {
  "es": {
    "determination": {
      "items": [
        {
          "name": "Palo / Cuchillo Real",
          "type": "Arma",
          "location": "Ruinas / Nuevo Hogar (casa de Asgore)",
          "stats": "ATK +0 (Palo) / ATK +99 (Cuchillo Real)",
          "lore": "Una sencilla rama de árbol que puede distraer a los perros guardianes; más adelante contrasta con la hoja letal encontrada en la casa de Asgore."
        },
        {
          "name": "Venda / El Medallón",
          "type": "Armadura",
          "location": "Ruinas / Nuevo Hogar (casa de Asgore)",
          "stats": "DEF +0 (Venda) / DEF +99 (El Medallón)",
          "lore": "Una venda de primeros auxilios usada que recupera 10 HP al emplearla; más adelante es sustituida por el medallón dorado con la inscripción «Best Friends Forever» («Mejores amigos para siempre»)."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Persistir sin descanso y negarse a aceptar finales no deseados.",
        "strengths": [
          "Determinación inquebrantable",
          "Resistencia a la desesperación",
          "Capacidad para cambiar la realidad",
          "Impulso orientado a la acción"
        ],
        "weaknesses": [
          "Terquedad que roza la obsesión",
          "Dificultad para aceptar la pérdida",
          "Riesgo de perder de vista todo salvo el objetivo"
        ],
        "realWorldTraits": "Las personas con una Determinación fuerte no necesitan confiar en que todo saldrá bien para actuar. Avanzan ante la dificultad porque algo dentro de ellas se niega a rendirse."
      }
    },
    "bravery": {
      "items": [
        {
          "name": "Guante Resistente",
          "type": "Arma",
          "location": "Caja Dimensional de Snowdin / tienda de Snowdin",
          "stats": "ATK +5",
          "lore": "Un guante de cuero gastado cuyo sistema de golpes premia las pulsaciones agresivas y rítmicas durante el ataque."
        },
        {
          "name": "Bandana Varonil",
          "type": "Armadura",
          "location": "Tienda de Snowdin",
          "stats": "DEF +7",
          "lore": "Una bandana resistente con dibujos que transmite confianza y valentía en el territorio nevado."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Afrontar el miedo de frente y tomar la iniciativa de inmediato.",
        "strengths": [
          "Iniciativa valiente",
          "Sinceridad en la confrontación",
          "Disposición a asumir riesgos",
          "Liderazgo inspirador"
        ],
        "weaknesses": [
          "Impaciencia ante la cautela",
          "Decisiones temerarias",
          "Dificultad para detenerse y reflexionar"
        ],
        "realWorldTraits": "Las personas valientes prefieren cometer errores dolorosos antes que vivir con el arrepentimiento de no haber actuado. Suelen ser las primeras en alzar la voz en situaciones tensas."
      }
    },
    "justice": {
      "items": [
        {
          "name": "Pistola Vacía",
          "type": "Arma",
          "location": "Tienda de Bratty y Catty en Hotland",
          "stats": "ATK +12",
          "lore": "Un revólver antiguo sin munición que depende de acertar con precisión cuatro círculos de puntería en expansión."
        },
        {
          "name": "Sombrero de Vaquero",
          "type": "Armadura",
          "location": "Tienda de Bratty y Catty en Hotland",
          "stats": "DEF +12, ATK +5",
          "lore": "Un sombrero resistente de ala ancha que impone respeto y aporta ventajas tanto ofensivas como defensivas."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Defender la equidad, la verdad y la responsabilidad moral.",
        "strengths": [
          "Sentido inquebrantable de la equidad",
          "Defensa de quienes están en desventaja",
          "Juicio crítico agudo",
          "Claridad moral"
        ],
        "weaknesses": [
          "Pensamiento rígido en blanco y negro",
          "Dificultad para perdonar las faltas",
          "Riesgo de adoptar una actitud moralista"
        ],
        "realWorldTraits": "Las personas guiadas por la Justicia no pueden ignorar un trato injusto. Aceptan la tensión social con tal de que las mismas reglas se apliquen a todos."
      }
    },
    "kindness": {
      "items": [
        {
          "name": "Sartén Quemada",
          "type": "Arma",
          "location": "Sala de respiraderos de vapor de Hotland",
          "stats": "ATK +10 (los objetos consumibles curan 4 HP adicionales)",
          "lore": "Una pesada sartén de hierro fundido que aumenta el poder curativo de todos los objetos de recuperación consumidos en combate."
        },
        {
          "name": "Delantal Manchado",
          "type": "Armadura",
          "location": "Zona de cintas transportadoras del piso 2 de Hotland",
          "stats": "DEF +11 (cura 1 HP cada dos turnos)",
          "lore": "Un práctico delantal de cocina que regenera lentamente la salud durante los enfrentamientos prolongados."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Proteger a los demás del sufrimiento y fomentar la empatía mutua.",
        "strengths": [
          "Empatía profunda",
          "Generosidad sin esperar nada a cambio",
          "Capacidad para rebajar conflictos",
          "Capacidad de sanación emocional"
        ],
        "weaknesses": [
          "Tendencia al sacrificio excesivo",
          "Descuido de los límites personales",
          "Dificultad para negarse ante el aprovechamiento ajeno"
        ],
        "realWorldTraits": "Las personas amables reciben la hostilidad del entorno y responden con calidez. Detectan con facilidad quién está siendo excluido y dan el primer paso para acogerlo."
      }
    },
    "patience": {
      "items": [
        {
          "name": "Cuchillo de Juguete",
          "type": "Arma",
          "location": "Grieta oculta de las Ruinas",
          "stats": "ATK +3",
          "lore": "Una hoja de plástico inofensiva que refleja moderación y ausencia de intención maliciosa."
        },
        {
          "name": "Lazo Descolorido",
          "type": "Armadura",
          "location": "Sala del interruptor oculto de las Ruinas",
          "stats": "DEF +3",
          "lore": "Un delicado lazo para el cabello que hace que quien lo lleva parezca adorable y reduce ligeramente la agresividad de los enemigos."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Observar con claridad, esperar el momento adecuado y mantener los pies en la tierra.",
        "strengths": [
          "Equilibrio emocional",
          "Buen sentido del momento estratégico",
          "Resistencia al pánico impulsivo",
          "Alta tolerancia a la incertidumbre"
        ],
        "weaknesses": [
          "Vacilación que hace perder oportunidades",
          "Aparente pasividad",
          "Represión de reacciones urgentes"
        ],
        "realWorldTraits": "Las personas pacientes no entran en pánico cuando una respuesta tarda en llegar. Entienden que actuar antes de tiempo puede causar más daño que esperar."
      }
    },
    "integrity": {
      "items": [
        {
          "name": "Zapatillas de Ballet",
          "type": "Arma",
          "location": "Sendero de arbustos de Waterfall",
          "stats": "ATK +7 (incluye 3 barras de precisión)",
          "lore": "Unas zapatillas de satén con puntas rígidas que ejecutan combinaciones de tres golpes cuando se usan con buen ritmo."
        },
        {
          "name": "Viejo Tutú",
          "type": "Armadura",
          "location": "Cámara secreta de la cascada en Waterfall",
          "stats": "DEF +10",
          "lore": "Un tutú de escenario polvoriento y de varias capas que ofrece una defensa firme mediante la postura y la disciplina."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Vivir de acuerdo con la ética personal y conservar la autenticidad.",
        "strengths": [
          "Honestidad sin concesiones",
          "Gran autodisciplina",
          "Expresión personal genuina",
          "Lealtad al código personal"
        ],
        "weaknesses": [
          "Autocrítica severa",
          "Intolerancia ante las zonas morales grises",
          "Inflexibilidad en dilemas prácticos"
        ],
        "realWorldTraits": "Las personas íntegras hacen lo correcto incluso cuando nadie las observa. Sienten un fuerte malestar cuando se les pide fingir o engañar."
      }
    },
    "perseverance": {
      "items": [
        {
          "name": "Libreta Rota",
          "type": "Arma",
          "location": "Tienda de Gerson en Waterfall",
          "stats": "ATK +2 (aumenta en 6 los fotogramas de invulnerabilidad INV)",
          "lore": "Una libreta llena de apuntes legibles que prolonga la invulnerabilidad posterior a recibir un golpe."
        },
        {
          "name": "Gafas Borrosas",
          "type": "Armadura",
          "location": "Tienda de Gerson en Waterfall",
          "stats": "DEF +5 (aumenta en 9 los fotogramas de invulnerabilidad INV)",
          "lore": "Unas gafas gruesas que ayudan a anticipar el peligro y recuperar antes la compostura tras recibir daño."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Alcanzar el dominio mediante el estudio metódico, el hábito y la tenacidad.",
        "strengths": [
          "Disciplina para el estudio",
          "Resolución analítica de problemas",
          "Resistencia a largo plazo",
          "Preparación que fortalece la resiliencia"
        ],
        "weaknesses": [
          "Tendencia al agotamiento y al exceso de trabajo",
          "Analizar en exceso situaciones sencillas",
          "Resistencia a actuar sin datos"
        ],
        "realWorldTraits": "Las personas perseverantes no dependen de breves ráfagas de motivación. Se apoyan en sistemas diarios, apuntes y rutinas constantes para terminar trabajos difíciles."
      }
    }
  },
  "ja": {
    "determination": {
      "items": [
        {
          "name": "ぼう / ほんもののナイフ",
          "type": "武器",
          "location": "いせき / ニューホーム（アズゴアの家）",
          "stats": "ATK +0（ぼう）/ ATK +99（ほんもののナイフ）",
          "lore": "犬の衛兵の気をそらすこともできる、ごく普通の木の枝です。後にアズゴアの家で見つかる致命的な刃物と対照をなしています。"
        },
        {
          "name": "ほうたい / ロケット",
          "type": "防具",
          "location": "いせき / ニューホーム（アズゴアの家）",
          "stats": "DEF +0（ほうたい）/ DEF +99（ロケット）",
          "lore": "使うと10 HPを回復する、使い古された応急手当用の包帯です。後に「Best Friends Forever（ずっと親友）」と刻まれた金色のロケットへ置き換わります。"
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "望まない結末を受け入れず、粘り強く進み続けること。",
        "strengths": [
          "揺るがない意志",
          "絶望に屈しない強さ",
          "現実を変える力",
          "行動へ向かう推進力"
        ],
        "weaknesses": [
          "執着に近い頑固さ",
          "喪失を受け入れにくいこと",
          "目的以外が見えなくなる危険"
        ],
        "realWorldTraits": "ケツイが強い人は、うまくいく保証や楽観がなくても行動できます。諦めることを拒む内なる意志で困難を押し切ります。"
      }
    },
    "bravery": {
      "items": [
        {
          "name": "じょうぶなてぶくろ",
          "type": "武器",
          "location": "スノーフルの次元ボックス / スノーフルのショップ",
          "stats": "ATK +5",
          "lore": "使い込まれた革の手袋です。攻撃時にリズムよくボタンを押すほど、積極的な連打が報われます。"
        },
        {
          "name": "おとこらしきバンダナ",
          "type": "防具",
          "location": "スノーフルのショップ",
          "stats": "DEF +7",
          "lore": "寒い土地でも恐れず進む自信を与える、丈夫な模様入りのバンダナです。"
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "恐怖と正面から向き合い、すぐに一歩を踏み出すこと。",
        "strengths": [
          "恐れずに始める力",
          "対立場面での率直さ",
          "リスクを取る覚悟",
          "人を鼓舞するリーダーシップ"
        ],
        "weaknesses": [
          "慎重さへの苛立ち",
          "無謀な判断",
          "立ち止まって振り返ることの苦手さ"
        ],
        "realWorldTraits": "ゆうきの強い人は、何もしなかった後悔より、行動して痛い失敗をするほうを選びます。緊張した場でも最初に声を上げます。"
      }
    },
    "justice": {
      "items": [
        {
          "name": "からのピストル",
          "type": "武器",
          "location": "ホットランドのブラッティ＆キャッティの店",
          "stats": "ATK +12",
          "lore": "弾薬の入っていない古いリボルバーです。広がる4つの照準円を正確なタイミングで合わせて攻撃します。"
        },
        {
          "name": "テンガロンハット",
          "type": "防具",
          "location": "ホットランドのブラッティ＆キャッティの店",
          "stats": "DEF +12, ATK +5",
          "lore": "威厳のある丈夫なつば広帽子で、攻撃と防御の両方を高めます。"
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "公平さ、真実、道徳的責任を守ること。",
        "strengths": [
          "揺るがない公平感",
          "弱い立場の人を守る力",
          "鋭い批判的判断",
          "道徳的な明晰さ"
        ],
        "weaknesses": [
          "善悪を白黒で決めすぎること",
          "過ちを許しにくいこと",
          "独善的になる危険"
        ],
        "realWorldTraits": "せいぎの強い人は、不公平な扱いを見過ごせません。全員に同じルールが適用されるよう、対立や緊張を引き受けます。"
      }
    },
    "kindness": {
      "items": [
        {
          "name": "こげたフライパン",
          "type": "武器",
          "location": "ホットランドの蒸気噴出口の部屋",
          "stats": "ATK +10（回復アイテムの回復量が4 HP増加）",
          "lore": "戦闘中に食べるすべての回復アイテムの効果を高める、重い鋳鉄製のフライパンです。"
        },
        {
          "name": "よごれたエプロン",
          "type": "防具",
          "location": "ホットランド2階のベルトコンベアエリア",
          "stats": "DEF +11（2ターンごとに1 HP回復）",
          "lore": "長期戦のあいだ、少しずつ体力を回復する実用的な調理用エプロンです。"
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "他者を苦しみから守り、互いの共感を育てること。",
        "strengths": [
          "深い共感力",
          "見返りを求めない寛大さ",
          "対立を和らげる力",
          "心を癒やす力"
        ],
        "weaknesses": [
          "過度な自己犠牲",
          "自分の境界線を軽視すること",
          "利用されても断れないこと"
        ],
        "realWorldTraits": "やさしさの強い人は、周囲の冷たさに温かさを返します。仲間外れになっている人に気づき、自ら迎え入れようとします。"
      }
    },
    "patience": {
      "items": [
        {
          "name": "おもちゃのナイフ",
          "type": "武器",
          "location": "いせきの隠し通路",
          "stats": "ATK +3",
          "lore": "害のないプラスチック製の刃です。持ち主の穏やかな自制心と、悪意のなさを表しています。"
        },
        {
          "name": "いろあせたリボン",
          "type": "防具",
          "location": "いせきの隠しスイッチの部屋",
          "stats": "DEF +3",
          "lore": "身につけると愛らしく見え、敵の攻撃性をわずかに和らげる繊細な髪飾りです。"
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "状況を正確に観察し、好機を待ち、冷静さを保つこと。",
        "strengths": [
          "感情の安定",
          "戦略的なタイミング感覚",
          "衝動的なパニックに屈しない強さ",
          "不確実さへの高い耐性"
        ],
        "weaknesses": [
          "ためらいによる好機の喪失",
          "消極的に見られること",
          "急いで反応すべき時まで感情を抑えること"
        ],
        "realWorldTraits": "にんたいの強い人は、答えがすぐに出なくても慌てません。早すぎる行動は、待つことより大きな損害を招く場合があると理解しています。"
      }
    },
    "integrity": {
      "items": [
        {
          "name": "バレエシューズ",
          "type": "武器",
          "location": "ウォーターフェルの茂みの小道",
          "stats": "ATK +7（3本のタイミングバー）",
          "lore": "硬いつま先を持つサテン製のダンスシューズです。リズムよく入力すると3連続攻撃になります。"
        },
        {
          "name": "ふるびたチュチュ",
          "type": "防具",
          "location": "ウォーターフェルの隠し滝の部屋",
          "stats": "DEF +10",
          "lore": "何層にも重なった埃まみれの舞台衣装です。優雅な姿勢と鍛錬を思わせる堅実な防御力を持ちます。"
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "自らの倫理に沿って生き、本当の自分を保つこと。",
        "strengths": [
          "妥協しない正直さ",
          "高い自己規律",
          "偽りのない自己表現",
          "自分の規範への忠実さ"
        ],
        "weaknesses": [
          "厳しすぎる自己批判",
          "道徳的な曖昧さへの不寛容",
          "現実的な判断が必要な場面での融通の利かなさ"
        ],
        "realWorldTraits": "せいじつの強い人は、誰も見ていなくても正しい行いを選びます。演技や欺きを求められると、強い不快感を覚えます。"
      }
    },
    "perseverance": {
      "items": [
        {
          "name": "やぶれたノート",
          "type": "武器",
          "location": "ウォーターフェルのガーソンの店",
          "stats": "ATK +2（INV無敵時間を6フレーム延長）",
          "lore": "読みやすい学習記録が詰まったノートです。攻撃を受けた後の無敵時間を延ばします。"
        },
        {
          "name": "くもったメガネ",
          "type": "防具",
          "location": "ウォーターフェルのガーソンの店",
          "stats": "DEF +5（INV無敵時間を9フレーム延長）",
          "lore": "危険を予測し、ダメージを受けた後も早く平静を取り戻す助けになる厚い眼鏡です。"
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "地道な学習、習慣、粘り強さによって熟達すること。",
        "strengths": [
          "学習への規律",
          "分析的な問題解決力",
          "長期的な持久力",
          "準備によって育つ回復力"
        ],
        "weaknesses": [
          "燃え尽きや働きすぎ",
          "単純な状況まで考えすぎること",
          "データがないと行動しにくいこと"
        ],
        "realWorldTraits": "こんきの強い人は、一時的なやる気に頼りません。日々の仕組み、記録、変わらない習慣によって難しい仕事をやり遂げます。"
      }
    }
  },
  "pt": {
    "determination": {
      "items": [
        {
          "name": "Graveto / Faca Real",
          "type": "Arma",
          "location": "Ruínas / Novo Lar (casa de Asgore)",
          "stats": "ATK +0 (Graveto) / ATK +99 (Faca Real)",
          "lore": "Um simples galho de árvore que pode distrair os cães de guarda; mais tarde contrasta com a lâmina fatal encontrada na casa de Asgore."
        },
        {
          "name": "Bandagem / O Medalhão",
          "type": "Armadura",
          "location": "Ruínas / Novo Lar (casa de Asgore)",
          "stats": "DEF +0 (Bandagem) / DEF +99 (O Medalhão)",
          "lore": "Uma bandagem de primeiros socorros usada que recupera 10 HP quando utilizada; mais tarde é substituída pelo medalhão dourado com a inscrição “Best Friends Forever” (“Melhores amigos para sempre”)."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Persistir sem descanso e recusar finais indesejados.",
        "strengths": [
          "Determinação inabalável",
          "Resistência ao desespero",
          "Capacidade de mudar a realidade",
          "Impulso para agir"
        ],
        "weaknesses": [
          "Teimosia próxima da obsessão",
          "Dificuldade para aceitar perdas",
          "Risco de enxergar apenas o objetivo"
        ],
        "realWorldTraits": "Pessoas com forte Determinação não precisam acreditar que tudo dará certo para agir. Elas avançam porque algo dentro delas se recusa a desistir."
      }
    },
    "bravery": {
      "items": [
        {
          "name": "Luva Forte",
          "type": "Arma",
          "location": "Caixa Dimensional de Snowdin / loja de Snowdin",
          "stats": "ATK +5",
          "lore": "Uma luva de couro gasta cujo sistema de golpes recompensa comandos agressivos e ritmados durante o ataque."
        },
        {
          "name": "Bandana Varonil",
          "type": "Armadura",
          "location": "Loja de Snowdin",
          "stats": "DEF +7",
          "lore": "Uma bandana resistente e estampada que transmite confiança destemida no território gelado."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Enfrentar o medo de frente e tomar a iniciativa imediatamente.",
        "strengths": [
          "Iniciativa corajosa",
          "Sinceridade no confronto",
          "Disposição para assumir riscos",
          "Liderança inspiradora"
        ],
        "weaknesses": [
          "Impaciência com a cautela",
          "Decisões imprudentes",
          "Dificuldade para parar e refletir"
        ],
        "realWorldTraits": "Pessoas corajosas preferem cometer erros dolorosos a viver com o arrependimento da inação. Elas costumam ser as primeiras a falar em situações tensas."
      }
    },
    "justice": {
      "items": [
        {
          "name": "Arma Vazia",
          "type": "Arma",
          "location": "Loja de Bratty e Catty em Hotland",
          "stats": "ATK +12",
          "lore": "Um revólver antigo sem munição que depende do acionamento preciso de quatro círculos de mira em expansão."
        },
        {
          "name": "Chapéu de Cowboy",
          "type": "Armadura",
          "location": "Loja de Bratty e Catty em Hotland",
          "stats": "DEF +12, ATK +5",
          "lore": "Um chapéu resistente de aba larga que impõe respeito e oferece vantagens ofensivas e defensivas."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Defender a equidade, a verdade e a responsabilidade moral.",
        "strengths": [
          "Senso inabalável de justiça",
          "Defesa de quem está em desvantagem",
          "Julgamento crítico aguçado",
          "Clareza moral"
        ],
        "weaknesses": [
          "Pensamento rígido em preto e branco",
          "Dificuldade para perdoar transgressões",
          "Risco de julgamento moralista"
        ],
        "realWorldTraits": "Pessoas guiadas pela Justiça não conseguem ignorar um tratamento injusto. Elas aceitam a tensão social para garantir que as mesmas regras se apliquem a todos."
      }
    },
    "kindness": {
      "items": [
        {
          "name": "Frigideira Queimada",
          "type": "Arma",
          "location": "Sala das saídas de vapor de Hotland",
          "stats": "ATK +10 (itens consumíveis recuperam 4 HP adicionais)",
          "lore": "Uma frigideira pesada de ferro fundido que aumenta o poder de recuperação de todos os itens consumidos em combate."
        },
        {
          "name": "Avental Manchado",
          "type": "Armadura",
          "location": "Área das esteiras do piso 2 de Hotland",
          "stats": "DEF +11 (recupera 1 HP a cada dois turnos)",
          "lore": "Um avental de cozinha prático que regenera lentamente a vida durante confrontos prolongados."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Proteger os outros do sofrimento e promover empatia mútua.",
        "strengths": [
          "Empatia profunda",
          "Generosidade sem esperar retorno",
          "Capacidade de reduzir conflitos",
          "Capacidade de cura emocional"
        ],
        "weaknesses": [
          "Tendência ao autossacrifício excessivo",
          "Negligência dos próprios limites",
          "Dificuldade para recusar quem se aproveita"
        ],
        "realWorldTraits": "Pessoas bondosas recebem a hostilidade do ambiente e respondem com acolhimento. Elas percebem quem está sendo excluído e tomam a iniciativa de incluir essa pessoa."
      }
    },
    "patience": {
      "items": [
        {
          "name": "Faca de Brinquedo",
          "type": "Arma",
          "location": "Fenda escondida nas Ruínas",
          "stats": "ATK +3",
          "lore": "Uma lâmina de plástico inofensiva que representa autocontrole gentil e ausência de intenção maliciosa."
        },
        {
          "name": "Fita Desbotada",
          "type": "Armadura",
          "location": "Sala do interruptor escondido nas Ruínas",
          "stats": "DEF +3",
          "lore": "Uma delicada fita de cabelo que deixa quem a usa adorável e reduz levemente a agressividade dos inimigos."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Observar com clareza, esperar o momento certo e manter os pés no chão.",
        "strengths": [
          "Equilíbrio emocional",
          "Bom senso de tempo estratégico",
          "Resistência ao pânico impulsivo",
          "Alta tolerância à incerteza"
        ],
        "weaknesses": [
          "Hesitação que faz perder oportunidades",
          "Passividade aparente",
          "Repressão de reações urgentes"
        ],
        "realWorldTraits": "Pessoas pacientes não entram em pânico quando uma resposta demora. Elas entendem que agir cedo demais pode causar mais dano do que esperar."
      }
    },
    "integrity": {
      "items": [
        {
          "name": "Sapatilhas de Balé",
          "type": "Arma",
          "location": "Caminho dos arbustos em Waterfall",
          "stats": "ATK +7 (inclui 3 barras de precisão)",
          "lore": "Sapatilhas de cetim com pontas rígidas que produzem combinações de três golpes quando usadas no ritmo correto."
        },
        {
          "name": "Velho Tutu",
          "type": "Armadura",
          "location": "Câmara secreta da cachoeira em Waterfall",
          "stats": "DEF +10",
          "lore": "Um tutu de palco empoeirado e com várias camadas que oferece defesa firme por meio de postura e disciplina."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Viver de acordo com a ética pessoal e preservar a autenticidade.",
        "strengths": [
          "Honestidade sem concessões",
          "Grande autodisciplina",
          "Expressão pessoal genuína",
          "Lealdade ao código pessoal"
        ],
        "weaknesses": [
          "Autocrítica severa",
          "Intolerância a zonas morais cinzentas",
          "Inflexibilidade em dilemas práticos"
        ],
        "realWorldTraits": "Pessoas íntegras fazem o que é certo mesmo quando ninguém está olhando. Elas sentem forte desconforto quando são pressionadas a fingir ou enganar."
      }
    },
    "perseverance": {
      "items": [
        {
          "name": "Caderno Rasgado",
          "type": "Arma",
          "location": "Loja de Gerson em Waterfall",
          "stats": "ATK +2 (aumenta em 6 os quadros de invulnerabilidade INV)",
          "lore": "Um caderno repleto de anotações legíveis que prolonga a invulnerabilidade após receber um golpe."
        },
        {
          "name": "Óculos Embaçados",
          "type": "Armadura",
          "location": "Loja de Gerson em Waterfall",
          "stats": "DEF +5 (aumenta em 9 os quadros de invulnerabilidade INV)",
          "lore": "Óculos grossos que ajudam a antecipar o perigo e recuperar a compostura mais rapidamente após sofrer dano."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Alcançar domínio por meio de estudo metódico, hábito e persistência.",
        "strengths": [
          "Disciplina para estudar",
          "Resolução analítica de problemas",
          "Resistência de longo prazo",
          "Resiliência construída pela preparação"
        ],
        "weaknesses": [
          "Tendência ao esgotamento e ao excesso de trabalho",
          "Analisar demais situações simples",
          "Resistência a agir sem dados"
        ],
        "realWorldTraits": "Pessoas perseverantes não dependem de surtos passageiros de motivação. Elas usam sistemas diários, anotações e rotinas consistentes para concluir trabalhos difíceis."
      }
    }
  },
  "ru": {
    "determination": {
      "items": [
        {
          "name": "Палка / Настоящий нож",
          "type": "Оружие",
          "location": "Руины / Новый Дом (дом Азгора)",
          "stats": "ATK +0 (Палка) / ATK +99 (Настоящий нож)",
          "lore": "Обычная древесная ветка, которой можно отвлечь собак-стражей. Позже ей противопоставляется смертоносный клинок, найденный в доме Азгора."
        },
        {
          "name": "Бинт / Медальон",
          "type": "Броня",
          "location": "Руины / Новый Дом (дом Азгора)",
          "stats": "DEF +0 (Бинт) / DEF +99 (Медальон)",
          "lore": "Старый бинт первой помощи, восстанавливающий 10 HP при использовании. Позже его сменяет золотой медальон с надписью «Best Friends Forever» («Лучшие друзья навсегда»)."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Неустанно двигаться вперёд и не принимать нежелательные концовки.",
        "strengths": [
          "Несокрушимая воля",
          "Стойкость перед отчаянием",
          "Способность менять реальность",
          "Нацеленность на действие"
        ],
        "weaknesses": [
          "Упрямство на грани одержимости",
          "Трудность принятия утраты",
          "Риск перестать замечать всё, кроме цели"
        ],
        "realWorldTraits": "Людям с сильной Решимостью не нужна уверенность в благополучном исходе, чтобы действовать. Они преодолевают препятствия благодаря внутреннему отказу сдаваться."
      }
    },
    "bravery": {
      "items": [
        {
          "name": "Крепкая перчатка",
          "type": "Оружие",
          "location": "Пространственный ящик Сноудина / магазин Сноудина",
          "stats": "ATK +5",
          "lore": "Потёртая кожаная перчатка, чья механика удара вознаграждает агрессивные и ритмичные нажатия во время атаки."
        },
        {
          "name": "Мужественная бандана",
          "type": "Броня",
          "location": "Магазин Сноудина",
          "stats": "DEF +7",
          "lore": "Прочная узорчатая бандана, придающая бесстрашие и уверенность в заснеженной местности."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Встречать страх лицом к лицу и немедленно проявлять инициативу.",
        "strengths": [
          "Смелая инициатива",
          "Прямота в противостоянии",
          "Готовность рисковать",
          "Вдохновляющее лидерство"
        ],
        "weaknesses": [
          "Нетерпимость к осторожности",
          "Безрассудные решения",
          "Трудность остановиться и всё обдумать"
        ],
        "realWorldTraits": "Храбрые люди скорее переживут болезненную ошибку, чем будут сожалеть о бездействии. В напряжённой ситуации они обычно говорят первыми."
      }
    },
    "justice": {
      "items": [
        {
          "name": "Пустой пистолет",
          "type": "Оружие",
          "location": "Магазин Брэтти и Кэтти в Хотленде",
          "stats": "ATK +12",
          "lore": "Старинный револьвер без патронов, требующий точно совместить четыре расширяющихся прицельных круга."
        },
        {
          "name": "Ковбойская шляпа",
          "type": "Броня",
          "location": "Магазин Брэтти и Кэтти в Хотленде",
          "stats": "DEF +12, ATK +5",
          "lore": "Прочная широкополая шляпа, внушающая уважение и усиливающая как атаку, так и защиту."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Защищать равенство, правду и моральную ответственность.",
        "strengths": [
          "Непоколебимое чувство справедливости",
          "Защита слабых",
          "Острый критический взгляд",
          "Нравственная ясность"
        ],
        "weaknesses": [
          "Жёсткое чёрно-белое мышление",
          "Трудность прощать проступки",
          "Риск самодовольного осуждения"
        ],
        "realWorldTraits": "Люди Справедливости не могут игнорировать несправедливое обращение. Они готовы выдержать социальное напряжение, чтобы правила одинаково применялись ко всем."
      }
    },
    "kindness": {
      "items": [
        {
          "name": "Подгоревшая сковорода",
          "type": "Оружие",
          "location": "Комната с паровыми вентиляционными отверстиями в Хотленде",
          "stats": "ATK +10 (расходуемые предметы восстанавливают на 4 HP больше)",
          "lore": "Тяжёлая чугунная сковорода, усиливающая восстановительный эффект всех предметов лечения, съеденных в бою."
        },
        {
          "name": "Запачканный фартук",
          "type": "Броня",
          "location": "Конвейерная зона второго этажа Хотленда",
          "stats": "DEF +11 (восстанавливает 1 HP каждые два хода)",
          "lore": "Практичный кухонный фартук, постепенно восстанавливающий здоровье во время долгих сражений."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Защищать других от страданий и развивать взаимное сочувствие.",
        "strengths": [
          "Глубокая эмпатия",
          "Бескорыстная щедрость",
          "Умение снижать напряжение в конфликте",
          "Способность оказывать эмоциональную поддержку"
        ],
        "weaknesses": [
          "Склонность к чрезмерному самопожертвованию",
          "Пренебрежение личными границами",
          "Трудность отказать тем, кто пользуется добротой"
        ],
        "realWorldTraits": "Добрые люди отвечают теплом на враждебность окружения. Они замечают тех, кого исключили из группы, и первыми стараются их принять."
      }
    },
    "patience": {
      "items": [
        {
          "name": "Игрушечный нож",
          "type": "Оружие",
          "location": "Скрытая трещина в Руинах",
          "stats": "ATK +3",
          "lore": "Безобидный пластиковый клинок, отражающий мягкую сдержанность и отсутствие злого умысла."
        },
        {
          "name": "Выцветшая лента",
          "type": "Броня",
          "location": "Комната со скрытым переключателем в Руинах",
          "stats": "DEF +3",
          "lore": "Нежная лента для волос, которая делает владельца милее и немного снижает агрессивность врагов."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Ясно наблюдать, ждать подходящего момента и сохранять спокойствие.",
        "strengths": [
          "Эмоциональное равновесие",
          "Точное чувство момента",
          "Стойкость перед импульсивной паникой",
          "Высокая терпимость к неопределённости"
        ],
        "weaknesses": [
          "Упущенные возможности из-за колебаний",
          "Впечатление пассивности",
          "Подавление реакций, требующих срочного действия"
        ],
        "realWorldTraits": "Терпеливые люди не паникуют, когда ответ задерживается. Они понимают, что преждевременное действие часто причиняет больше вреда, чем ожидание."
      }
    },
    "integrity": {
      "items": [
        {
          "name": "Пуанты",
          "type": "Оружие",
          "location": "Тропа среди кустов в Водопаде",
          "stats": "ATK +7 (3 шкалы точного удара)",
          "lore": "Атласные балетные туфли с жёсткими носками, позволяющие провести тройную атаку при точном ритме."
        },
        {
          "name": "Старая пачка",
          "type": "Броня",
          "location": "Тайная комната за водопадом",
          "stats": "DEF +10",
          "lore": "Многослойная пыльная сценическая пачка, обеспечивающая надёжную защиту благодаря осанке и дисциплине."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Жить в согласии с личной этикой и сохранять подлинность.",
        "strengths": [
          "Бескомпромиссная честность",
          "Высокая самодисциплина",
          "Искреннее самовыражение",
          "Верность личному кодексу"
        ],
        "weaknesses": [
          "Жёсткая самокритика",
          "Нетерпимость к нравственным серым зонам",
          "Негибкость в практических дилеммах"
        ],
        "realWorldTraits": "Порядочные люди поступают правильно, даже когда никто не видит. Необходимость притворяться или обманывать вызывает у них сильный внутренний дискомфорт."
      }
    },
    "perseverance": {
      "items": [
        {
          "name": "Порванная тетрадь",
          "type": "Оружие",
          "location": "Магазин Герсона в Водопаде",
          "stats": "ATK +2 (увеличивает время неуязвимости INV на 6 кадров)",
          "lore": "Плотная тетрадь с разборчивыми учебными записями, продлевающая неуязвимость после полученного удара."
        },
        {
          "name": "Мутные очки",
          "type": "Броня",
          "location": "Магазин Герсона в Водопаде",
          "stats": "DEF +5 (увеличивает время неуязвимости INV на 9 кадров)",
          "lore": "Толстые очки, помогающие предвидеть опасность и быстрее приходить в себя после получения урона."
        }
      ],
      "personalityAnalysis": {
        "coreMotivation": "Достигать мастерства через методичное обучение, привычку и упорство.",
        "strengths": [
          "Учебная дисциплина",
          "Аналитическое решение задач",
          "Долговременная выносливость",
          "Устойчивость благодаря подготовке"
        ],
        "weaknesses": [
          "Склонность к выгоранию и переработкам",
          "Излишний анализ простых ситуаций",
          "Нежелание действовать без данных"
        ],
        "realWorldTraits": "Настойчивые люди не зависят от кратких всплесков мотивации. Они используют ежедневные системы, записи и постоянные привычки, чтобы завершать сложную работу."
      }
    }
  }
};

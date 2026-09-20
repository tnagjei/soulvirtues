// input: Reviewed multilingual item and personality copy for 28 localized soul detail pages
// output: Localized items, personalityAnalysis, and deepDive fields keyed by locale and soul slug
// pos: src/data/soulDetailsLocalizedContent.ts（更新规则：文件变更需同步本注释与所属目录 README）

import type { SoulDetail } from './soulDetails';

type LocalizedSoulContent = Pick<SoulDetail, 'items' | 'personalityAnalysis' | 'deepDive'>;

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
      },
      "deepDive": [
        "En la vida cotidiana, la Determinación rara vez parece un gesto heroico: es la undécima solicitud enviada tras diez rechazos, el plan de ejercicio que se reinicia después de cada recaída y la conversación difícil que se reabre porque irse se siente peor. Las personas guiadas por este rasgo mantienen vivas sus metas mucho después de que otros las archivarían. Su impulso no depende del ánimo ni de la competencia; se renueva cada vez que algo sale mal. Esa capacidad de reinicio explica por qué la Determinación suele durar más que el talento o la suerte.",
        "Un malentendido común es creer que la Determinación implica no detenerse nunca. Su forma madura incluye un cálculo honesto del costo: saber qué muro merece otro intento y qué muro solo indica que ese camino se cerró. Combinada con la Perseverancia se vuelve aguante metódico; combinada con la Valentía, toma de riesgos decidida bajo presión. Sin equilibrio, el mismo combustible se estrecha en visión de túnel, donde renunciar a cualquier senda se siente como perder una parte de uno mismo. Nombrar ese miedo es el primer paso hacia la flexibilidad.",
        "Dos preguntas ayudan a separar la perseverancia sana del daño obstinado. Primera: tras un revés, ¿adaptas el plan en pocos días o repites la pérdida durante semanas sin cambiar nada? Segunda: ¿persigues esta meta porque todavía te importa o principalmente porque abandonarla sería insoportable? Anotar qué no estás dispuesto a sacrificar, como el sueño, la salud o las relaciones cercanas, convierte la voluntad bruta en un motor sostenible. La Determinación en su mejor versión no se niega a caer; se niega a dejar de decidir quién quiere ser."
      ]
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
      },
      "deepDive": [
        "La Valentía cotidiana rara vez es cinematográfica: es levantar la mano en una reunión donde todos callan, enviar el primer mensaje a alguien nuevo o empezar de cero en una ciudad donde no conoces a nadie. Las personas con este núcleo se acercan a la incomodidad cuando todavía es pequeña, y por eso sus problemas suelen seguir siendo manejables. Sienten el miedo como cualquier persona; la diferencia es que el miedo funciona como señal de salida y no como señal de alto. Una vez creada, la inercia tiende a protegerse sola.",
        "El malentendido más frecuente es confundir Valentía con ausencia de precaución. El valor real incluye elegir qué riesgos valen la pena y aceptar que algunas cargas conviene aplazarlas. Combinada con la Paciencia se convierte en coraje bien calculado que actúa en el momento justo; combinada con la Justicia, en la disposición a defender a otros aun con costo personal. Sin equilibrio, el mismo impulso se vuelve imprudencia, confundiendo velocidad con sabiduría y agotamiento con compromiso. Los valientes necesitan amigos honestos que sepan decir espera, no solo adelante.",
        "Una comprobación práctica: cuando evitas algo hoy, ¿es porque el momento no es adecuado o porque el miedo es ruidoso? Escribir el peor resultado realista de la acción evitada suele reducirlo a un tamaño manejable. La valentía crece por repetición, no por un gran gesto único. Empieza por acciones que te asusten a un nivel tres sobre diez, complétalas y deja que la evidencia se acumule. Con el tiempo, la zona de confort se expande desde dentro y el rasgo se convierte en un hábito confiable, no en un ánimo que va y viene."
      ]
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
      },
      "deepDive": [
        "La Justicia aparece en momentos pequeños mucho antes que en grandes batallas: corregir un rumor injusto sobre un compañero, dividir una cuenta con precisión porque alguien pagó de más sin quejarse, o nombrar la regla que todos ignoran en silencio. Las personas con este núcleo llevan un registro interno de la equidad, y el desequilibrio les molesta de forma casi física. Suelen ser la referencia a la que otros acuden cuando un conflicto necesita una lectura honesta. Su lealtad se adhiere primero a los principios y después a las personas, y eso hace valiosa su aprobación y útil su crítica.",
        "La sombra merece atención: un fuerte sentido de la equidad puede endurecerse en juicios de blanco y negro, donde cada disputa tiene un solo culpable y el contexto se aplana. Combinada con la Amabilidad, la Justicia se vuelve incidencia que protege a las personas mientras corrige sistemas; combinada con la Integridad, una vida de principios constantes incluso con costo personal. Sin empatía como contrapeso, el mismo rasgo puede volverse autojustificado, castigando en otros faltas que se perdona a sí mismo. Quienes practican la Justicia con salud preguntan qué voz falta en el veredicto antes de cerrar el caso.",
        "Reflexión útil: cuando te sientes agraviado, ¿buscas ser eficaz o solo tener razón? Antes de confrontar una injusticia, anota qué resultado repararía realmente el daño, porque la ira sin objetivo suele recrear la injusticia en sentido inverso. Practicar respuestas proporcionales, como hacer una pregunta aclaratoria antes de emitir un juicio, mantiene la credibilidad del rasgo. La Justicia es más poderosa cuando es lo bastante paciente para escuchar la historia completa y lo bastante firme para actuar. Esa combinación es rara, y la gente la nota."
      ]
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
      },
      "deepDive": [
        "La Amabilidad suele confundirse con blandura, pero en la vida diaria funciona como infraestructura: el colega que nota al recién llegado comiendo solo, el amigo que recuerda la fecha difícil de tu calendario, el desconocido que devuelve la cartera caída sin esperar aplauso. Las personas con este núcleo registran el clima emocional que otros pasan por alto. Dan sin facturar, y por eso se vuelven anclas en familias, equipos y amistades. Su calidez es estratégica en el mejor sentido: se dirige donde reduce sufrimiento real, no donde compra crédito visible.",
        "El modo de fallo recurrente es el colapso de límites. Quienes dan atraen a quienes toman, y la Amabilidad sin límites se convierte en un ciclo de martirio: el resentimiento crece en silencio mientras la sonrisa sigue en la superficie. Combinada con la Justicia, aprende a decir no a la explotación sin dejar de proteger a los vulnerables; combinada con la Paciencia, se vuelve cuidado constante en vez de rescates dramáticos. Este corazón verde rinde mejor al aceptar una verdad incómoda: no se puede servir de forma sostenible desde un recipiente vacío, y cuidar la propia energía es parte del servicio.",
        "Comprobaciones prácticas: ¿te disculpas por tener necesidades o las enuncias con claridad? Cuando alguien toma repetidamente sin reciprocidad, ¿ajustas o duplicas tu entrega esperando ganar equidad? Un hábito útil es programar la generosidad, reservando el descanso con la misma seriedad que la ayuda. Otro es preguntar antes de rescatar, porque salvar sin que lo pidan puede comunicar en silencio que la otra persona no puede arreglárselas. La Amabilidad en su máxima fuerza no es sacrificio infinito; es calidez confiable con límites funcionales, del tipo que la gente confía durante décadas."
      ]
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
      },
      "deepDive": [
        "La Paciencia se malinterpreta a menudo como lentitud, pero en la práctica es precisión temporal: la negociadora que deja morir una mala oferta sin apurar el silencio, la madre que repite la misma indicación con calma por quinta vez, el constructor que entrega en un año lo que otros abandonan en un mes. Las personas con este núcleo toleran la incertidumbre sin necesitar alivio inmediato. Esa tolerancia les permite ver patrones que los apurados pierden, y sus decisiones llevan menos correcciones costosas porque no se toman bajo urgencia artificial.",
        "La trampa es la vacilación disfrazada de sabiduría: esperar eternamente una decisión que merece diez minutos también es un error. Combinada con la Valentía, la Paciencia se vuelve audacia estratégica que actúa cuando la ventana se abre; combinada con la Perseverancia, se convierte en el juego largo, donde el progreso lento se acumula. Este corazón cian funciona mejor con plazos: paciencia para los resultados, urgencia para la preparación. Decidir por adelantado qué señal activará la acción, como una fecha, un umbral o un evento repetido, evita que la observación serena decaiga en pasividad.",
        "Una auditoría útil: enumera tres cosas que estás esperando ahora y pregúntate, para cada una, si la espera es estrategia o escondite. Si es estrategia genuina, escribe la condición que terminará la espera; si es escondite, da esta semana el paso más pequeño posible. La paciencia también se apoya en anclas físicas, porque la calma se sostiene mejor con sueño estable, paseos y respiración que con pura voluntad. Bien administrada, este rasgo se vuelve autoridad silenciosa: la persona que entra en pánico al final y, por eso, decide mejor."
      ]
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
      },
      "deepDive": [
        "La Integridad vive en decisiones poco glamorosas: admitir el error antes de que alguien revise los registros, devolver el cambio de más, negarse a reírse del chiste que se burla de un ausente. Las personas con este núcleo sienten la coherencia entre valores y acciones como bienestar físico, y el engaño como un dolor sordo. Esa consistencia las hace predecibles en el mejor sentido: sus colegas les entregan trabajo sensible sin contratos elaborados. Su palabra funciona como una firma, y con los años eso se convierte en una reputación que ningún presupuesto de marketing podría comprar.",
        "El punto de presión es la rigidez. Los principios altos pueden derivar en autocrítica severa e intolerancia a las zonas grises morales, donde los compromisos ordinarios se sienten como traiciones. Combinada con la Amabilidad, la Integridad se vuelve honestidad con cuidado, veraz sin herir; combinada con la Justicia, conducta principista que además protege a otros de sistemas injustos. Este corazón azul permanece sano cuando acepta que la integridad concierne a tu propia conducta, no a vigilar la de todos. Los estándares aplicados hacia dentro generan confianza; aplicados como arma hacia fuera, generan distancia.",
        "Dos hábitos protegen este rasgo. Primero, decide los casos difíciles antes de enfrentarlos: define de antemano qué harás si te piden cubrir a un amigo, exagerar en un currículo o callar ante un daño. Las posiciones decididas con antelación resisten mejor la presión social. Segundo, mantén abierta la vía de reparación: la integridad no es perfección sino un patrón de corrección honesta, y una disculpa rápida es en sí misma un acto de alineación. Pregúntate con frecuencia si tu historia pública y tu conducta privada seguirían coincidiendo si todos pudieran leer ambas."
      ]
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
      },
      "deepDive": [
        "La Perseverancia es la prima metódica del empeño: el estudiante de idiomas que completa su baraja diaria durante dos años, la investigadora que llena el cuaderno antes de confiar en una intuición, quien construye en pequeño y publica mejoras semanales mientras otros esperan inspiración. Las personas con este núcleo convierten el esfuerzo en sistemas y los sistemas en resultados que sobreviven a los malos días. Rara vez necesitan motivación dramática porque la estructura las sostiene cuando el entusiasmo baja. Su avance parece modesto semana a semana e imbatible al mirar años acumulados.",
        "El costo es el riesgo de quemarse: el mismo motor que se niega a saltarse un día también puede negarse a descansar, y el exceso de análisis puede convertir decisiones simples en proyectos de investigación. Combinada con la Paciencia, la Perseverancia se vuelve consistencia duradera a largo plazo; combinada con la Determinación, seguimiento imparable de las metas que importan. Este corazón morado se mantiene sano cuando el descanso se agenda con la misma disciplina que el trabajo, como mantenimiento y no como robo. Las métricas de progreso deberían incluir la recuperación.",
        "Comprobaciones prácticas: ¿tus metas tienen procesos semanales asociados o solo resultados? Escribe la versión de proceso, como treinta minutos enfocados en lugar de fluidez, y deja que la racha motive. Cuando te atasques, pregunta si el problema necesita más esfuerzo o un método distinto, porque insistir con un enfoque roto es desperdicio disfrazado de virtud. Revisa tus apuntes cada mes para ver la distancia recorrida. La Perseverancia en su mejor versión no es sufrir con elegancia; es progreso aburrido, repetible y silencioso que supera cualquier estrategia más vistosa."
      ]
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
      },
      "deepDive": [
        "日常の中でケツイは、劇的な踏ん張りとして現れることは少ないものです。十回の不採用の後でも十一通目の応募書類を送ること、挫折のたびにトレーニング計画をやり直すこと、逃げる方が楽でも難しい話し合いをもう一度開くことです。この特質を核に持つ人は、周囲が見切りをつけた後も目標を生かし続けます。原動力は盛り上がりや競争から借りたものではなく、うまくいかないたびに自分で更新されます。この再起動の力こそ、ケツイが才能や運よりも長く続く理由です。",
        "よくある誤解は、ケツイとは決して休まないことだというものです。成熟した形は、どの壁がもう一度の挑戦に値し、どの壁が道が閉じたことを教える情報なのかを見極める、誠実なコスト計算を含みます。こんきと組み合わされば粘り強く体系的な持久力に、ゆうきと組み合わさればプレッシャーの中での果断な決断力になります。バランスを失うと、同じエネルギーは一点だけを見つめる視野の狭さへと変わります。どんな道も断ることが自分の一部を失うように感じられるためです。その恐れを言葉にすることが、柔軟さへの第一歩です。",
        "二つの自問が、健やかな意志と意地を分けます。一つ目:つまずいた後、数日で計画を修正しますか、それとも何も変えずに敗北を何週間も反芻しますか。二つ目:その目標は今も本当に大切だから追っていますか、それとも辞めるのが耐えられないからですか。睡眠、健康、大切な人間関係など、犠牲にしないと決めたことを書き出すと、生の意志力は持続可能なエンジンに変わります。ケツイの本質は倒れないことではなく、自分がなりたい姿を決め続けることです。"
      ]
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
      },
      "deepDive": [
        "日常のゆうきは、映画のように派手ではありません。全員が黙る会議で最初に手を上げること、初対面の相手に最初のメッセージを送ること、知り合いが誰もいない街で一からやり直すことです。この特質を核に持つ人は、不快感がまだ小さいうちにそれへ向かいます。だから問題が大きくなる前に手をつけられます。恐れを感じないのではなく、恐れが停止信号ではなく発進の合図として働きます。一度つくった勢いは、自らを守るように続きます。",
        "最も多い誤解は、ゆうきを慎重さの欠けと同じにみなすことです。本当の勇気には、どのリスクが引き受ける価値があるかを選ぶ目が含まれます。にんたいと組み合わされば、好機を待って動く計算された勇気に。せいぎと組み合わされば、個人的な代償を払ってでも他者を守る意志になります。バランスを失うと、速度を賢さと、疲労を献身と混同する無謀さへ滑ります。ゆうきを持つ人には、前だけではなく待てとも言える正直な友人が必要です。",
        "実践的なチェック:今日避けたことについて、タイミングが悪いからですか、それとも恐怖がうるさいからですか。避けている行動の現実的な最悪の結果を書き出すと、多くの場合は扱える大きさに縮まります。勇気は一度の大舞台ではなく、反復で育ちます。怖さの度合いが十段階の三くらいの行動から始め、やり遂げ、小さな証拠を積み上げてください。やがて安心領域は内側から広がり、気分に左右されない習慣としてこの特質が定着します。"
      ]
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
      },
      "deepDive": [
        "せいぎは、大きな対決より先に小さな瞬間に現れます。同僚についての不当なうわさを訂正すること、黙って多く払った人がいるからと割り勘を正確にすること、全員が黙って無視しているルールを口にすることです。この特質を核に持つ人は公平さの内部台帳を持ち、不均衡に肉体的な不快感に近いものを覚えます。対立を誠実に読み取る相談役になることも多く、忠誠は人格より原則に先に向かいます。だからこそ、その承認は重く、その批判は役に立ちます。",
        "影の部分にも目を向ける必要があります。強い公平感は白黒の判定に硬直し、どんな争いにも一人の加害者を求め、文脈を平らにしてしまうことがあります。やさしさと組み合わされば、制度を正しながら人を守る擁護に。せいじつと組み合わされば、個人的な代償があっても崩さない一貫した原則の生活になります。共感というカウンターがなければ、同じ特質は自分を赦して他人を罰する独りよがりへ変わります。健全なせいぎは、判決を下す前に欠けている声を探します。",
        "有用な自問:不当な扱いを受けたと感じるとき、あなたは効果を求めていますか、それとも正しさだけを求めていますか。不公平に立ち向かう前に、何が本当に損害を修復するのかを書き出してください。目的のない怒りは、逆方向から不当を再生産しがちです。判定の前に一つ確認の質問をする、といった比例した対応を積み重ねると、この特質の信頼は保たれます。せいぎは、完全な話を聞く辛抱と、それでも行動する固さを両立するときに最も強くなります。"
      ]
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
      },
      "deepDive": [
        "やさしさは弱さと混同されがちですが、日常ではむしろインフラのように働きます。一人で食べる新入社員に気づく同僚、つらい記念日を覚えている友人、拍手を期待せず落とした財布を届ける通行人。この特質を核に持つ人は、他の人が見落とす感情の天候を記録します。見返りを請求せずに与えるため、家族や職場や友情の支えになります。その温かさは最良の意味で戦略的です。目立つ功績ではなく、実際に苦しみを減らせる場所へ向かいます。",
        "繰り返し起こる失敗モードは、境界の崩壊です。与える人は取る人を引き寄せ、限界のないやさしさは殉教のサイクルになります。表面は笑い続けるのに、不満が静かに育つのです。せいぎと組み合わされば、弱い立場の人を守りながら搾取にはノーと言えるようになり、にんたいと組み合わされば、劇的な救出ではなく地味な継続ケアになります。緑のタマシイが最も力を発揮するのは、空の容器からは注ぎ続けられない、という事実を受け入れたときです。自分のエネルギーを守ることも、奉仕の一部です。",
        "実践的なチェック:自分のニーズについて、謝ってから話しますか、それとも普通に伝えますか。見返りのない誰かが繰り返し取ってくるとき、関係を調整しますか、それとも公平が戻ることを期待して与える量を倍にしますか。有用な習慣は、助けと同じだけの真剣さで休息を予定に入れることです。もう一つは、救う前に尋ねることです。頼まれない救助は、相手が自分で対応できないというメッセージになり得ます。やさしさの完成形は際限のない犠牲ではなく、機能する境界を持つ、何年も信頼される確かな温かさです。"
      ]
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
      },
      "deepDive": [
        "にんたいは遅さと誤解されがちですが、実態は正確なタイミングです。悪い条件の提案を、沈黙を急いで埋めずに消滅させる交渉者。五回目でも冷静に同じ注意を繰り返す親。一ヶ月で投げ出す他人の作業を一年かけて完成させる作り手。この特質を核に持つ人は、不確実さを、即座の安楽を要求されずに耐えられます。その耐性があるから、慌てた人が見落とすパターンが見え、人工的な切迫の下で決断しない分、高くつく修正が少なくなります。",
        "罠は、知恵に見えるためらいです。十分間で決まる判断を永遠に待つことも、別種の誤りです。ゆうきと組み合わされば、窓が開いた瞬間に動く戦略的な大胆さに。こんきと組み合わされば、遅い進捗が複利のように積み上がる長期ゲームになります。シアンのタマシイは期限と組み合わせると最も強く、結果には忍耐を、準備には緊急さを使い分けます。日付や数値などの、行動を起こす合図を前もって決めておけば、冷静な観察が消極性に変わるのを防げます。",
        "有用な点検:今待っていることを三つ書き出し、それぞれについて待つことが戦略か隠れ場所かを自問してください。戦略なら、待ちを終わらせる条件を書きます。隠れ場所なら、今週できる最小の行動を一つ取ります。にんたいは身体的な土台にも支えられます。睡眠や散歩や呼吸を整えた静けさは、意志力だけの静けさより長持ちします。うまく運用されると、この特質は静かな権威になります。部屋の中で最後に慌てる人、だから最もよく決断できる人です。"
      ]
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
      },
      "deepDive": [
        "せいじつは地味な選択の中に生きています。誰も記録を確認する前に自分の誤りを認めること、多くもらった釣り銭を返すこと、いない人の悪口笑いに加わらないこと。この特質を核に持つ人は、価値観と行動が一致している状態を心地よさとして、欺きを鈍い痛みとして感じます。その一貫性は、良い意味で予測可能であることになります。同僚は複雑な契約なしに重要な仕事を任せ、その言葉は署名のように機能します。年月を重ねると、宣伝では買えない信頼が静かに積み上がります。",
        "圧力点は硬直です。高い原則は厳しい自己批判や、道徳的なグレーゾーンへの不寛容につながり、普通の妥協さえ裏切りのように感じさせることがあります。やさしさと組み合わされば、傷つけない誠実さ、真実を丁寧に伝える言葉になり、せいぎと組み合わされば、不当な制度から他者も守る原則的な行動になります。青いタマシイが健やかである条件は、せいじつとは自分の行動についての話であり、すべての人を監視する話ではない、と受け入れることです。内に向けた基準は信頼を生み、武器として外に向けた基準は距離を生みます。",
        "この特質を守る二つの習慣。一つ目は、難しい場面を会う前に決めておくことです。友人の嘘を被るよう頼まれたら、履歴書で盛るよう言われたら、害を見て黙っていたら、自分がどうするかを前もって定義します。事前に決めた立場は社会的圧力に強くなります。二つ目は、修復の道を開けておくことです。せいじつとは無欠ではなく、正直な訂正のパターンであり、速い謝罪そのものが一致の行為です。誰もが読めるとしたら、と言い聞かせて、外向きの物語と内向きの行動が一致するか定期的に確かめてください。"
      ]
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
      },
      "deepDive": [
        "こんきは粘り強さの几帳面な親戚です。二年間、毎日の単語カードを欠かさない語学学習者。直感を信じる前にノートを埋める研究者。ひらめきを待つ人の横で、週ごとの改善を出し続ける小さな作り手。この特質を核に持つ人は努力をシステムに変え、システムを悪い日に耐える結果に変えます。情熱が下がったときに構造が支えるため、劇的な動機をほとんど必要としません。週ごとの前進は地味でも、数年分重なると圧倒的になります。",
        "代償は燃え尽きのリスクです。一日も休まないよう設計されたエンジンは、休むこと自体を拒むようになり、分析のしすぎは単純な決断を研究プロジェクト化します。にんたいと組み合わされば、長期にわたる堅実な継続力に。ケツイと組み合わされば、本当に大切な目標への止まらない遂行力になります。紫のタマシイが健やかなのは、休息を泥棒ではなく整備として、仕事と同じ規律で予定に組み込んだときです。回復も進捗の指標に含めてください。休めないシステムは、最悪のタイミングで壊れます。",
        "実践的なチェック:目標に週次のプロセスが結びついていますか、結果だけが結びついていますか。流暢さではなく、三十分の集中、というプロセス版を書き、継続の記録に動かしてもらいましょう。詰まったら、努力が足りないのか、方法が違うのかを自問してください。壊れたやり方を続けるのは、美徳の衣を着た浪費です。月に一度ノートを見返し、移動した距離を確認してください。こんきの完成形は美しく苦しむことではなく、地味で繰り返される、どの派手な戦略より長く続く前進です。"
      ]
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
      },
      "deepDive": [
        "No dia a dia, a Determinação raramente parece um gesto heroico: é a décima primeira candidatura enviada depois de dez recusas, o plano de treino reiniciado após cada recaída, a conversa difícil reaberta porque desistir parece pior. Pessoas movidas por esse traço mantêm objetivos vivos muito depois de outros os arquivarem. O impulso não vem de entusiasmo emprestado; ele se renova cada vez que algo dá errado. Essa capacidade de recomeço explica por que a Determinação costuma durar mais do que talento, sorte ou apoio externo.",
        "Um equívoco comum é imaginar que Determinação significa nunca parar. A forma madura inclui uma contabilidade honesta de custos: saber qual parede merece outra tentativa e qual parede é apenas informação de que aquele caminho fechou. Combinada com Perseverança, vira resistência metódica; combinada com Coragem, vira assunção de riscos decisiva sob pressão. Sem equilíbrio, o mesmo combustível estreita-se em visão de túnel, na qual desistir de qualquer caminho parece perder parte de si mesmo. Nomear esse medo é o primeiro passo para a flexibilidade.",
        "Duas perguntas separam determinação saudável de teimosia que machuca. Primeira: depois de um revés, você ajusta o plano em poucos dias ou repete a perda por semanas sem mudar nada? Segunda: você persegue essa meta porque ela ainda importa, ou principalmente porque parar seria insuportável? Escrever o que você se recusa a sacrificar, como sono, saúde e relações próximas, transforma força bruta em um motor sustentável. A Determinação no seu melhor não se recusa a cair; recusa-se a parar de decidir quem você quer se tornar."
      ]
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
      },
      "deepDive": [
        "A Coragem cotidiana raramente é cinematográfica: é levantar a mão na reunião em que todos silenciam, enviar a primeira mensagem para alguém novo, recomeçar numa cidade onde você não conhece ninguém. Pessoas com esse núcleo caminham em direção ao desconforto enquanto ele ainda é pequeno, e por isso seus problemas costumam continuar solúveis. Elas sentem medo como qualquer pessoa; a diferença é que o medo funciona como sinal de largada, não de parada. Criado o movimento inicial, o impulso tende a se sustentar sozinho.",
        "O equívoco mais comum é confundir Coragem com ausência de cautela. O valor verdadeiro inclui escolher quais riscos valem a pena e aceitar que algumas investidas devem esperar. Combinada com Paciência, torna-se coragem bem calculada, que age na janela certa; combinada com Justiça, torna-se disposição para defender outras pessoas mesmo com custo próprio. Sem equilíbrio, o mesmo impulso escorrega para a imprudência, trocando velocidade por sabedoria e exaustão por compromisso. Quem é corajoso precisa de amigos honestos que saibam dizer espere, e não apenas siga.",
        "Uma checagem prática: quando você evita algo hoje, é porque o momento está errado ou porque o medo está alto? Escrever o pior resultado realista da ação evitada costuma reduzi-lo a um tamanho administrável. Coragem cresce por repetição, não por um único gesto grandioso. Comece por ações que assustem no nível três de dez, conclua-as e deixe as evidências se acumularem. Com o tempo, a zona de conforto se expande de dentro para fora, e o traço vira um hábito confiável, não um humor que vai e volta."
      ]
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
      },
      "deepDive": [
        "A Justiça aparece em momentos pequenos antes das grandes batalhas: corrigir um boato injusto sobre um colega, dividir uma conta com precisão porque alguém pagou demais em silêncio, nomear a regra que todos ignoram em voz baixa. Pessoas com esse núcleo mantêm um registro interno de equidade, e o desequilíbrio as incomoda quase fisicamente. Costumam ser a pessoa procurada quando um conflito precisa de uma leitura honesta. Sua lealdade vai primeiro aos princípios e depois às personalidades; por isso sua aprovação pesa e sua crítica serve.",
        "O lado sombra merece atenção: um forte senso de justiça pode endurecer em julgamentos preto no branco, em que toda disputa tem um culpado único e o contexto desaparece. Combinada com Bondade, a Justiça vira defesa que protege pessoas enquanto corrige sistemas; combinada com Integridade, vira uma vida de princípios consistentes mesmo com custo pessoal. Sem empatia como contrapeso, o mesmo traço pode se tornar autossuficiente em julgamentos, punindo nos outros falhas que perdoa em si. Quem pratica Justiça com saúde pergunta qual voz está faltando no veredicto antes de encerrar o caso.",
        "Reflexão útil: quando você se sente prejudicado, busca ser eficaz ou apenas ter razão? Antes de confrontar uma injustiça, anote qual resultado repararia de fato o dano, porque raiva sem objetivo costuma reproduzir a injustiça em sentido contrário. Respostas proporcionais, como fazer uma pergunta de esclarecimento antes de julgar, mantêm o traço confiável. A Justiça é mais forte quando é paciente o bastante para ouvir a história inteira e firme o bastante para agir. Essa combinação é rara, e as pessoas percebem."
      ]
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
      },
      "deepDive": [
        "A Bondade é confundida com fraqueza, mas no cotidiano funciona como infraestrutura: o colega que nota o novato comendo sozinho, o amigo que lembra da data difícil da sua agenda, o desconhecido que devolve a carteira caída sem esperar aplauso. Pessoas com esse núcleo monitoram o clima emocional que os outros perdem. Elas dão sem cobrar, e por isso viram âncoras de famílias, equipes e amizades. O calor delas é estratégico no melhor sentido: vai onde reduz sofrimento real, não onde compra visibilidade.",
        "O modo de falha recorrente é o colapso de limites. Quem dá atrai quem toma, e a Bondade sem limites vira um ciclo de martírio: o ressentimento cresce em silêncio enquanto o sorriso permanece na superfície. Combinada com Justiça, aprende a dizer não à exploração sem abandonar quem precisa de proteção; combinada com Paciência, vira cuidado contínuo em vez de resgates dramáticos. O coração verde rende mais quando aceita uma verdade dura: não se serve de forma sustentável com o recipiente vazio, e cuidar da própria energia é parte do serviço.",
        "Checagens práticas: você pede desculpa por ter necessidades ou as afirma com clareza? Quando alguém repete o padrão de só receber, você ajusta a relação ou dobra a própria oferta esperando equilíbrio? Um hábito útil é agendar a generosidade, reservando descanso com a mesma seriedade da ajuda. Outro é perguntar antes de socorrer, porque resgate não solicitado pode comunicar, em silêncio, que a pessoa não dá conta sozinha. A Bondade no seu melhor não é sacrifício infinito; é calor confiável com limites funcionais, do tipo que gera confiança por décadas."
      ]
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
      },
      "deepDive": [
        "A Paciência costuma ser lida como lentidão, mas na prática é senso de tempo: a negociadora que deixa uma proposta ruim morrer sem preencher o silêncio às pressas, a mãe que repete a mesma orientação calmamente pela quinta vez, quem constrói em um ano o que os outros abandonam em um mês. Pessoas com esse núcleo toleram incerteza sem exigir alívio imediato. Essa tolerância lhes mostra padrões que os apressados não veem, e suas decisões carregam menos correções caras porque não foram tomadas sob urgência artificial.",
        "A armadilha é a hesitação fantasiada de sabedoria: esperar para sempre uma decisão que merece dez minutos também é erro. Combinada com Coragem, a Paciência vira ousadia estratégica, que age quando a janela abre; combinada com Perseverança, vira o jogo longo, em que o progresso lento se acumula. O coração ciano funciona melhor com prazos: paciência para resultados, urgência para preparação. Decidir antecipadamente qual sinal dispara a ação, como uma data ou um número alcançado, impede que a observação calma apodreça em passividade.",
        "Uma auditoria útil: liste três coisas que você está esperando agora e pergunte, para cada uma, se a espera é estratégia ou esconderijo. Se for estratégia, escreva a condição que encerra a espera; se for esconderijo, tome esta semana a menor ação possível. A paciência também se apoia em âncoras físicas, porque a calma sustentada por sono estável, caminhadas e respiração dura mais que a calma por força de vontade. Bem administrada, essa qualidade vira autoridade tranquila: a pessoa que entra em pânico por último e, por isso, decide melhor."
      ]
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
      },
      "deepDive": [
        "A Integridade vive em escolhas sem glamour: admitir o erro antes de alguém conferir os registros, devolver o troco a mais, recusar-se a rir da piada que fere quem não está presente. Pessoas com esse núcleo sentem a coerência entre valores e ações como conforto físico, e o engano como uma dor surda. Essa consistência as torna previsíveis no melhor sentido: colegas entregam trabalho sensível sem contratos elaborados. A palavra delas funciona como assinatura, e com os anos isso vira uma reputação que nenhum orçamento de marketing compra.",
        "O ponto de pressão é a rigidez. Princípios altos podem virar autocobrança severa e intolerância com zonas cinzentas morais, nas quais compromissos comuns parecem traições. Combinada com Bondade, a Integridade vira honestidade com cuidado, verdadeira sem ferir; combinada com Justiça, vira conduta principista que também protege pessoas de sistemas injustos. O coração azul fica saudável quando aceita que integridade diz respeito à sua própria conduta, não à vigilância dos outros. Padrões aplicados para dentro constroem confiança; aplicados como arma para fora, constroem distância.",
        "Dois hábitos protegem essa qualidade. Primeiro, decida os casos difíceis antes de encontrá-los: defina antecipadamente o que fará se pedirem para cobrir um amigo, exagerar no currículo ou calar diante de um dano. Posições decididas antes resistem melhor à pressão social. Segundo, mantenha o caminho de reparo aberto: integridade não é perfeição, é um padrão de correção honesta, e um pedido de desculpas rápido já é um ato de alinhamento. Pergunte com frequência se sua história pública e sua conduta privada ainda combinariam se todos pudessem ler as duas."
      ]
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
      },
      "deepDive": [
        "A Perseverança é a prima metódica da garra: quem estuda idiomas completando o baralho diário por dois anos, quem pesquisa preenchendo o caderno antes de confiar no palpite, quem constrói devagar e publica melhorias semanais enquanto os outros esperam inspiração. Pessoas com esse núcleo transformam esforço em sistema e sistema em resultado que sobrevive aos dias ruins. Elas raramente precisam de motivação dramática, porque a estrutura as carrega quando o entusiasmo cai. O avanço semanal parece modesto e vira algo imbatível quando visto em anos acumulados.",
        "O custo é o risco de burnout: o mesmo motor que se recusa a pular um dia também pode se recusar a descansar, e o excesso de análise estica decisões simples em projetos de pesquisa. Combinada com Paciência, a Perseverança vira consistência duradoura de longo prazo; combinada com Determinação, vira execução imparável das metas que importam. O coração roxo fica saudável quando o descanso entra na agenda com a mesma disciplina do trabalho, tratado como manutenção, não como roubo. Métricas de progresso devem incluir recuperação.",
        "Checagens práticas: seus objetivos têm processos semanais ligados a eles, ou apenas resultados? Escreva a versão de processo, como trinta minutos focados em vez de fluência, e deixe a sequência motivar. Quando travar, pergunte se o problema precisa de mais esforço ou de um método diferente, porque insistir numa abordagem quebrada é desperdício fantasiado de virtude. Revise suas anotações todo mês para enxergar a distância percorrida. A Perseverança no seu melhor não é sofrer com elegância; é progresso simples, repetível e silencioso, que supera qualquer estratégia mais chamativa."
      ]
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
      },
      "deepDive": [
        "В повседневной жизни Решимость редко выглядит как драматичное последнее сражение. Она выглядит как одиннадцатая заявка на работу, отправленная после десяти отказов, план тренировок, начатый заново после каждой осечки, и трудный разговор, к которому возвращаются, потому что уйти кажется ещё хуже. Люди, которыми руководит эта черта, сохраняют цели живыми тогда, когда другие давно отправили бы их в архив. Этот внутренний импульс не приходит из азарта или соревнования; он возобновляется каждый раз, когда всё идёт наперекосяк. Именно эта способность к самоперезапуску позволяет Решимости пережить талант, удачу и даже поддержку окружающих.",
        "Распространённое заблуждение — считать, что Решимость означает никогда не останавливаться. На деле зрелая форма этой черты включает честный учёт цены: понимать, какую стену стоит штурмовать снова, а какая лишь сообщает, что путь закрыт. Решимость в сочетании с Настойчивостью становится терпеливой, выстроенной в систему выносливостью, а в сочетании с Храбростью — решительным принятием риска под давлением. Без баланса тот же заряд сужается до туннельного зрения, когда отказ от любого пути воспринимается как потеря части себя. Назвать этот страх — обычно первый шаг к гибкости.",
        "Два вопроса помогают отличить здоровую решимость от упрямого вреда. Во-первых, после неудачи вы корректируете план за считанные дни или неделями прокручиваете проигрыш, ничего не меняя? Во-вторых, вы идёте к цели, потому что она всё ещё важна вам, или в основном потому, что бросить было бы невыносимо? Записать, чем вы отказываетесь жертвовать — сном, здоровьем, близкими отношениями, — значит превратить сырую силу воли в устойчивый долгосрочный двигатель. Решимость в лучшем виде — это не отказ падать, а отказ переставать решать, кем вы хотите стать."
      ]
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
      },
      "deepDive": [
        "Храбрость в повседневной жизни редко бывает кинематографичной. Это поднятая рука на совещании, когда все молчат, первое сообщение незнакомому человеку, решение начать заново в городе, где вы никого не знаете. Люди с этим ядром идут навстречу дискомфорту, пока тот мал, поэтому их проблемы обычно остаются решаемыми. Они боятся как все; разница в том, что страх работает как стартовый сигнал, а не как стоп-знак. Созданное ускорение, как правило, начинает защищать себя само.",
        "Самое частое недопонимание — приравнивать Храбрость к отсутствию осторожности. Подлинное мужество включает выбор рисков, которые того стоят, и понимание, что некоторые атаки лучше отложить. В сочетании с Терпением Храбрость становится точным по времени мужеством, бьющим в нужный момент; в сочетании со Справедливостью — готовностью защищать других ценой личных удобств. Без баланса тот же импульс скатывается в безрассудство, принимая скорость за мудрость, а истощение за преданность. Храбрым людям нужны честные друзья, способные сказать подожди, а не только вперёд.",
        "Практическая самопроверка: когда вы сегодня чего-то избегаете, это потому, что время не подошло, или потому, что страх громкий? Записать худший реалистичный исход избегаемого действия часто уменьшает его до управляемого размера. Храбрость растёт через повторение, а не через один великий жест. Начните с действий, которые пугают вас на три из десяти, завершите их и позвольте доказательствам накапливаться. Со временем зона комфорта расширяется изнутри, а черта становится надёжной привычкой, а не настроением, которое приходит и уходит."
      ]
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
      },
      "deepDive": [
        "Справедливость проявляется в малых повторяющихся моментах задолго до драматических поступков: выправить несправедливый слух о коллеге, точно разделить общий счёт, потому что кто-то тихо переплатил, или назвать правило, которое все молча игнорируют. Люди с этим ядром ведут внутреннюю книгу справедливости, и дисбаланс действительно беспокоит их, порой физически. К ним часто приходят за честной оценкой конфликта. Их верность привязана сначала к принципам, затем к личностям, поэтому их одобрение весомо, а критика полезна.",
        "Теневая сторона заслуживает внимания. Сильная тяга к справедливости может затвердеть в чёрно-белые суждения, где в любом споре есть один виновный, а контекст стирается. Справедливость в сочетании с Добротой становится защитой людей при исправлении систем; в сочетании с Порядочностью — жизнью по последовательным принципам даже ценой личных удобств. Без эмпатии в качестве противовеса та же черта может стать самоправедностью, карающей других за ошибки, которые она прощает себе. Самые здоровые носители Справедливости перед закрытием дела спрашивают: чей голос отсутствует в вердикте?",
        "Полезное размышление: когда вы чувствуете себя обиженным, вы стремитесь быть действенным или просто правым? Перед конфронтацией с несправедливой ситуацией запишите, какой исход действительно исправит вред, потому что гнев без цели часто воссоздаёт несправедливость наоборот. Практика соразмерных реакций — например, один уточняющий вопрос перед вынесением суждения — сохраняет доверие к черте. Справедливость сильнее всего, когда терпелива настолько, чтобы выслушать историю целиком, и тверда настолько, чтобы действовать по ней. Такое сочетание редкость, и люди его замечают."
      ]
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
      },
      "deepDive": [
        "Доброту часто принимают за мягкость, но в повседневной жизни она работает скорее как инфраструктура: коллега, который замечает новичка, обедающего в одиночестве; друг, помнящий о трудной дате в вашем календаре; незнакомец, вернувший оброненный кошелёк без ожидания аплодисментов. Люди с этим ядром считывают эмоциональную погоду, которую другие пропускают. Они дают, не выставляя счетов, и потому становятся опорой в семьях, командах и дружбе. Их тепло стратегично в лучшем смысле: направлено туда, где оно по-настоящему уменьшает страдания, а не туда, где приносит видимые заслуги.",
        "Повторяющийся сбой — обвал границ. Дающие притягивают берущих, и Доброта без пределов превращается в цикл мученика: обида копится тихо, пока снаружи всё улыбается. В сочетании со Справедливостью Доброта учится говорить нет эксплуатации, продолжая защищать уязвимых; в сочетании с Терпением — становится ровной долгосрочной заботой вместо драматичных спасательных миссий. Зелёное сердце служит лучше всего, когда принимает суровую правду: из пустого сосуда не налить надолго, а защита собственной энергии — часть служения, а не предательство его.",
        "Практические проверки: вы извиняетесь за то, что у вас есть потребности, или называете их прямо? Когда кто-то снова и снова берёт, не отдавая, вы корректируете поведение или удваиваете даяние в надежде заслужить справедливость? Полезная привычка — планировать щедрость, бронируя отдых так же серьёзно, как помощь другим. Другая — спрашивать перед спасением, потому что непрошеное спасение тихо сообщает человеку, что он не справится сам. Доброта в полной силе — не бесконечная жертва; это надёжное тепло с работающими границами, которому доверяют десятилетиями, а не восхищаются мельком и забывают."
      ]
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
      },
      "deepDive": [
        "Терпение часто читают как медлительность, но на деле это точный расчёт времени. Это переговорщик, дающий скверному предложению умереть, не спеша заполнять паузу; родитель, спокойно повторяющий одну инструкцию в пятый раз; строитель, выпускающий за год то, что другие бросают через месяц. Люди с этим ядром выносят неопределённость без потребности в немедленном облегчении. Эта выносливость позволяет видеть закономерности, которые спешащие пропускают, а их решения несут меньше дорогих исправлений именно потому, что не принимались под искусственной спешкой.",
        "Ловушка — нерешительность, маскирующаяся под мудрость. Бесконечное ожидание решения, которое заслуживает десяти минут, — тоже вид ошибки. Терпение в сочетании с Храбростью становится стратегической смелостью, бьющей точно в открытое окно; в сочетании с Настойчивостью — долгой игрой, где медленный видимый прогресс накапливается. Голубое сердце работает лучше всего с дедлайнами: терпение к результатам, срочность к подготовке. Заранее решить, какой сигнал запустит действие — дата, порог, повторяющееся событие, — не даёт спокойному наблюдению выродиться в пассивность.",
        "Полезный аудит: выпишите три вещи, ожидания которых вы сейчас держите, и для каждой спросите, является ли ожидание стратегией или укрытием. Для настоящей стратегии запишите условие, которое завершит ожидание. Для укрытия сделайте на этой неделе самое маленькое возможное действие. Терпению помогают и физические якоря: спокойствие легче удерживать ровным сном, прогулками и дыханием, чем одной силой воли. Управляемое хорошо, эта черта становится тихим авторитетом: человеком в комнате, который паникует последним и потому решает лучше всех."
      ]
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
      },
      "deepDive": [
        "Порядочность живёт в неброских выборах: признать ошибку до того, как кто-то проверит записи, вернуть лишнюю сдачу, не смеяться над шуткой, бьющей по тому, кого нет рядом. Люди с этим ядром переживают совпадение ценностей и действий как физический комфорт, а обман — как глухую ноющую боль. Эта внутренняя последовательность делает их предсказуемыми в лучшем смысле: коллеги отдают им чувствительную работу без сложных контрактов. Их слово работает как подпись, и за годы это тихо складывается в репутацию, которую не купит ни один маркетинговый бюджет.",
        "Точка давления — ригидность. Высокие принципы могут переходить в суровое самоосуждение и нетерпимость к моральным полутонам, где обычные компромиссы ощущаются как предательство. Порядочность в сочетании с Добротой становится честностью, поданной с заботой, — правдивой, но не ранящей; в сочетании со Справедливостью — принципиальным поведением, которое к тому же защищает других от несправедливых систем. Синее сердце остаётся здоровым, когда принимает: порядочность касается вашего поведения, а не надзора за всеми остальными. Стандарты, обращённые внутрь, строят доверие; те же стандарты, обращённые наружу как оружие, строят дистанцию и тихую обиду.",
        "Две привычки защищают эту черту. Первая — решать трудные случаи до встречи с ними: заранее определите, что вы сделаете, когда попросят прикрыть друга, приукрасить резюме или промолчать о вреде. Заранее принятые позиции лучше держат социальное давление. Вторая — держать путь исправления открытым: порядочность — не безупречность, а модель честных исправлений, и быстрая извинительная реакция сама по себе акт соответствия. Регулярно спрашивайте себя: совпали бы ваша публичная история и частное поведение, если бы каждый мог прочитать и то и другое?"
      ]
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
      },
      "deepDive": [
        "Настойчивость — методичная родня упорства: изучающий язык, два года проходящий ежедневную колоду; исследователь, заполняющий блокнот, прежде чем довериться догадке; маленький строитель, выпускающий улучшения каждую неделю, пока другие ждут вдохновения. Люди с этим ядром превращают усилия в системы, а системы — в результаты, которые переживают плохие дни. Им редко нужна драматичная мотивация, потому что структура несёт их, когда энтузиазм падает. Их прогресс часто выглядит скромно от недели к неделе и неудержимо — в масштабе накопленных лет.",
        "Цена — риск выгорания. Тот же двигатель, который отказывается пропускать день, может отказываться и отдыхать, а избыточный анализ растягивает простые решения в исследовательские проекты. Настойчивость в сочетании с Терпением становится долговечной согласованностью на длинной дистанции; в сочетании с Решимостью — неудержимым доведением до конца по-настоящему важных целей. Фиолетовое сердце остаётся здоровым, когда отдых стоит в расписании с той же дисциплиной, что и работа, — как обслуживание, а не кража. В метрики прогресса стоит включать восстановление: система, которая не умеет делать паузу, в конце концов ломается в худший момент.",
        "Практические проверки: у ваших целей есть еженедельные процессы или только итоги? Запишите процессную версию — например, тридцать сосредоточенных минут вместо свободного владения языком, — и пусть серия сама вас мотивирует. Застряв, спросите, нужна проблеме большая сила усилий или другой метод, ведь упорствовать в сломанном подходе — трата, переодетая в добродетель. Раз в месяц просматривайте записи, чтобы увидеть пройденную дистанцию. Настойчивость в лучшем виде — не изящное страдание; это скучный, повторяемый прогресс, который тихо переживает любую более яркую стратегию."
      ]
    }
  }
};

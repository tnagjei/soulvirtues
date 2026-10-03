// input: Static spanish translation dictionary aligned with official Undertale localizations
// output: Full Spanish Translations object implementation
// pos: src/i18n/es.ts (更新规则：文件变更需同步本注释与所属目录 README)

import type { Translations } from './types';
import { ASSESSMENT_COPY } from '../data/assessmentContent';
import type { SoulCode, SoulDefinition } from '../data/souls';
import type { QuestionItem } from '../data/questions';
import { getQuestions } from '../data/questions';

export const ES_SOULS: Record<SoulCode, SoulDefinition> = {
  DET: {
    code: 'DET',
    name: 'DETERMINACIÓN',
    label: 'ROJA',
    hex: '#ff0000',
    confuse: 'PER',
    tag: "¿Qué hace que este objetivo siga mereciendo la pena y qué prueba te haría cambiarlo?",
    description: "Elegir un objetivo que te importe y decidir cómo volver a comprometerte tras un revés. Cambiar de rumbo después de reflexionar también encaja en este tema.",
  },
  BRV: {
    code: 'BRV',
    name: 'VALENTÍA',
    label: 'NARANJA',
    hex: '#fca600',
    confuse: 'DET',
    tag: "¿Qué acción segura puedes dar sin fingir que el miedo ha desaparecido?",
    description: "Expresarte o actuar pese al miedo o la presión social cuando hacerlo es razonablemente seguro. La puntuación no premia el peligro ni exige ser extrovertido.",
  },
  JUS: {
    code: 'JUS',
    name: 'JUSTICIA',
    label: 'AMARILLA',
    hex: '#ffff00',
    confuse: 'INT',
    tag: "¿Aceptarías el mismo criterio si se aplicara a ti o a alguien que te cae mal?",
    description: "Aplicar criterios justos a personas diferentes, atendiendo a sus derechos, oportunidades y resultados compartidos. La justicia puede requerir entender necesidades distintas.",
  },
  KND: {
    code: 'KND',
    name: 'AMABILIDAD',
    label: 'VERDE',
    hex: '#00c000',
    confuse: 'PAT',
    tag: "¿Qué ayuda responde a su necesidad real y qué puedes ofrecer razonablemente?",
    description: "Preocuparte, escuchar y ofrecer ayuda útil dentro de límites razonables. Ser amable no exige decidir por otra persona ni descuidar tus necesidades.",
  },
  PAT: {
    code: 'PAT',
    name: 'PACIENCIA',
    label: 'CIAN',
    hex: '#42fcff',
    confuse: 'KND',
    tag: "¿Cuándo sería razonable preguntar de nuevo y qué puedes hacer mientras esperas?",
    description: "Cómo respondes a la espera, la frustración leve y la irritación. Incluye hacer una pausa y calmarte; no exige tolerar daño ni retrasos indefinidos.",
  },
  INT: {
    code: 'INT',
    name: 'INTEGRIDAD',
    label: 'AZUL',
    hex: '#003cff',
    confuse: 'JUS',
    tag: "¿Cuál es la siguiente frase honesta y qué compromiso puedes cumplir de verdad?",
    description: "Honestidad, confidencialidad y cumplimiento de compromisos, incluido reconocer errores. Una puntuación no establece el valor moral de nadie ni hace correctas sus creencias.",
  },
  PER: {
    code: 'PER',
    name: 'PERSEVERANCIA',
    label: 'MORADA',
    hex: '#d535d5',
    confuse: 'DET',
    tag: "¿Qué pequeño paso puedes repetir y cómo sabrás si está funcionando?",
    description: "Mantener un esfuerzo útil durante la ejecución, gestionar distracciones e intentar terminar el trabajo. Una rutina productiva también permite descansar y cambiar según la experiencia.",
  },
};

export const ES_QUESTIONS: QuestionItem[] = getQuestions('es');

export const esTranslations: Translations = {
  locale: 'es',
  localeName: 'Español',
  pageTitle: "Soul Virtues Extractor - Test de Almas Undertale Gratis",
  pageDescription: "Descubre tu rasgo de alma de Undertale con el test gratuito de 66 preguntas de Soul Virtues Extractor: Determinación, Valentía, Justicia, Amabilidad y más.",
  heroBadge: "Test Gratis de 66 Preguntas",
  heroTitle: "SOUL VIRTUES",
  heroTitleHighlight: "EXTRACTOR",
  heroSubtitle: 'Realiza el test gratuito de 66 preguntas <strong class="text-white">Soul Virtues Test (Test de Almas de Undertale)</strong> para descubrir tu perfil entre Determinación, Valentía, Justicia, Amabilidad, Paciencia, Integridad y Perseverancia.',
  heroNote: "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones.",
  nav: {
    startTest: "Empezar Test",
    sevenVirtues: "7 Virtudes",
    howItWorks: "Cómo Funciona",
    faq: "Preguntas Frecuentes",
    about: "Acerca de",
    takeQuiz: "Hacer Test",
  },
  footer: {
    title: "SOUL VIRTUES EXTRACTOR",
    desc: "Una evaluación gratuita y completa de 66 preguntas que explora las siete virtudes del alma humana inspiradas en el universo de Undertale. Todos los cálculos se realizan 100% de forma local en tu navegador.",
    contact: "Contacto:",
    exploreTitle: "Explorar",
    testLink: "Test de Almas",
    traitsLink: "7 Rasgos de Alma",
    scoringLink: "Lógica de Puntuación",
    faqLink: "Preguntas Frecuentes (FAQ)",
    legalTitle: "Legal e Información",
    aboutLink: "Acerca de Nosotros",
    privacyLink: "Política de Privacidad",
    termsLink: "Términos de Servicio",
    contactLink: "Contacto",
    feedbackLink: "Comentarios",
    copyright: "© 2026 Soul Virtues Extractor (soulvirtues.org). Todos los derechos reservados.",
    disclaimer: "Aviso legal: Esta es una herramienta analítica independiente creada por fans. Undertale es una marca registrada de Toby Fox. Este sitio no está afiliado ni respaldado por Toby Fox ni por los creadores originales.",
  },
  what: {
    title: "¿Qué es Soul Virtues Extractor?",
    p1: "Soul Virtues Extractor es un test de fans independiente, gratuito y pensado para reflexionar. Sus 66 afirmaciones exploran siete temas cotidianos con una presentación inspirada en Undertale. No es una prueba oficial ni una evaluación clínica.",
    p2: "50 es el punto medio neutral de esta escala de respuestas. Una puntuación mayor indica que tus respuestas encajan con más afirmaciones del tema. No es un percentil poblacional ni una nota moral. Si todo es neutral, no hay tema principal. Mostramos los empates y presentamos juntos los resultados separados por hasta 3 puntos como ayuda de lectura, no como hallazgo estadístico.",
    p3: "El banco actual adapta 56 afirmaciones de dominio público de IPIP y añade 10 de Determinación escritas de forma independiente. Elegimos materiales de un conjunto mayor, no de un test fijo de 56 preguntas. Las siete agrupaciones y la redacción son decisiones de este sitio.",
    p4: "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones.",
  },
  why: {
    title: "¿Por qué hacer Soul Virtues Extractor?",
    intro: "Soul Virtues Extractor es un test de fans independiente, gratuito y pensado para reflexionar. Sus 66 afirmaciones exploran siete temas cotidianos con una presentación inspirada en Undertale. No es una prueba oficial ni una evaluación clínica.",
    points: [
  {
    "title": "Siete puntuaciones en un resultado completo",
    "desc": "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones."
  },
  {
    "title": "Fuentes de preguntas comprobables",
    "desc": "El banco actual adapta 56 afirmaciones de dominio público de IPIP y añade 10 de Determinación escritas de forma independiente. Elegimos materiales de un conjunto mayor, no de un test fijo de 56 preguntas. Las siete agrupaciones y la redacción son decisiones de este sitio."
  },
  {
    "title": "Lee tus respuestas en contexto",
    "desc": "50 es el punto medio neutral de esta escala de respuestas. Una puntuación mayor indica que tus respuestas encajan con más afirmaciones del tema. No es un percentil poblacional ni una nota moral. Si todo es neutral, no hay tema principal. Mostramos los empates y presentamos juntos los resultados separados por hasta 3 puntos como ayuda de lectura, no como hallazgo estadístico."
  },
  {
    "title": "Progreso local sin cuenta",
    "desc": "Las respuestas se calculan y guardan en este navegador con un identificador estable y la versión del banco. Puedes seguir el mismo progreso en cualquiera de nuestros cinco idiomas en este navegador, pero no se transfiere entre dispositivos. Las respuestas antiguas no se aplican a preguntas nuevas. El sonido se guarda por separado."
  }
],
  },
  traits: {
    title: "Las 7 Almas de Undertale y los Rasgos que Representan",
    subtitle: "Estas son las siete almas de Undertale: cada una tiene su propio color y un rasgo que la define. Aquí están las siete juntas, con el significado de cada una, antes de descubrir cuál domina en ti.",
  },
  colors: {
    title: "¿Cuál es tu color de alma en Undertale?",
    desc: "El resultado muestra siete puntuaciones independientes. Una puntuación claramente principal puede mostrarse como un color; las respuestas neutras o empatadas no se fuerzan a un solo tipo.",
    note: "*Nota: En la tradición de la comunidad de Undertale, el Alma Roja se asocia comúnmente con la Determinación, aunque el juego original no nombra explícitamente su rasgo oficial.",
    items: [
      { title: "ALMA ROJA · Determinación*", desc: "Elegir un objetivo que te importe y decidir cómo volver a comprometerte tras un revés. Cambiar de rumbo después de reflexionar también encaja en este tema." },
      { title: "ALMA NARANJA · Valentía", desc: "Expresarte o actuar pese al miedo o la presión social cuando hacerlo es razonablemente seguro. La puntuación no premia el peligro ni exige ser extrovertido." },
      { title: "ALMA AMARILLA · Justicia", desc: "Aplicar criterios justos a personas diferentes, atendiendo a sus derechos, oportunidades y resultados compartidos. La justicia puede requerir entender necesidades distintas." },
      { title: "ALMA VERDE · Amabilidad", desc: "Preocuparte, escuchar y ofrecer ayuda útil dentro de límites razonables. Ser amable no exige decidir por otra persona ni descuidar tus necesidades." },
      { title: "ALMA CIAN · Paciencia", desc: "Cómo respondes a la espera, la frustración leve y la irritación. Incluye hacer una pausa y calmarte; no exige tolerar daño ni retrasos indefinidos." },
      { title: "ALMA AZUL · Integridad", desc: "Honestidad, confidencialidad y cumplimiento de compromisos, incluido reconocer errores. Una puntuación no establece el valor moral de nadie ni hace correctas sus creencias." },
      { title: "ALMA MORADA · Perseverancia", desc: "Mantener un esfuerzo útil durante la ejecución, gestionar distracciones e intentar terminar el trabajo. Una rutina productiva también permite descansar y cambiar según la experiencia.", colSpan2: true },
    ],
  },
  scoring: {
    title: "Cómo funciona el algoritmo de puntuación",
    intro: "Cómo se calcula cada resultado",
    cards: [
  {
    "title": "Cinco opciones y preguntas inversas",
    "desc": "Elige entre cinco respuestas: de totalmente en desacuerdo (1) a totalmente de acuerdo (5). En una afirmación inversa usamos 6 menos la respuesta. Cada afirmación pertenece a un solo tema."
  },
  {
    "title": "Una media para cada tema",
    "desc": "Calculamos la media de las respuestas corregidas del tema y aplicamos 100 × (media − 1) ÷ 4."
  },
  {
    "title": "Una escala transparente de 0 a 100",
    "desc": "Los siete resultados son independientes. No tienen que sumar 100 y un número distinto de preguntas no cambia el máximo."
  }
],
    note: "Elige entre cinco respuestas: de totalmente en desacuerdo (1) a totalmente de acuerdo (5). En una afirmación inversa usamos 6 menos la respuesta. Cada afirmación pertenece a un solo tema. Calculamos la media de las respuestas corregidas del tema y aplicamos 100 × (media − 1) ÷ 4. Los siete resultados son independientes. No tienen que sumar 100 y un número distinto de preguntas no cambia el máximo.",
  },
  features: {
    title: "Características Destacadas",
    subtitle: "66 preguntas, 7 puntuaciones de virtudes y una tarjeta compartible al instante.",
    items: [
      { num: "66", title: "66 Preguntas", desc: "Preguntas situacionales sobre elecciones y tendencias en los 7 rasgos." },
      { num: "7", title: "7 Puntuaciones de Alma", desc: "Visualiza tu porcentaje en todas las virtudes del universo Undertale." },
      { num: "PNG", title: "Tarjeta Compartible", desc: "Descarga tu tarjeta de resultados en PNG con estilo pixel art retro." },
      { num: "NO", title: "Sin Registro", desc: "Realiza la evaluación completa gratis sin crear ninguna cuenta." },
    ],
  },
  faq: {
    title: "Preguntas Frecuentes (FAQ)",
    subtitle: "Todo lo que necesitas saber sobre Soul Virtues Extractor, los rasgos de alma y el sistema de puntuación.",
    items: ASSESSMENT_COPY.es.faqItems,
  },
  quizUI: {
    resultReading: {
      "cardScaleNote": "50% = NEUTRAL · PUNTUACIONES INDEPENDIENTES",
      "summaryBadge": "RESUMEN DEL PERFIL",
      "noPreferenceTitle": "SIN PREFERENCIA CLARA",
      "noPreferenceBody": "Estas respuestas no muestran ningún rasgo por encima del punto medio neutral. Revisa tus respuestas en vez de interpretar la primera barra como una personalidad dominante.",
      "incompleteTitle": "COMPLETA EL TEST",
      "incompleteBody": "Faltan respuestas o algunas no son válidas. Completa las 66 afirmaciones antes de interpretar el perfil.",
      "tieTitle": "RASGOS PRINCIPALES EMPATADOS",
      "tieBody": "Varios rasgos comparten la puntuación mostrada más alta. Su orden no decide un ganador.",
      "closeBody": "Las dos puntuaciones principales están a 3 puntos o menos. Las mostramos juntas para facilitar la lectura, no como prueba de significación estadística.",
      "scoreScaleNote": "Son puntuaciones independientes de 0 a 100 para tus respuestas, no percentiles poblacionales ni notas morales. No tienen que sumar 100.",
      "evidenceTitle": "CÓMO TUS RESPUESTAS AFECTARON LA PUNTUACIÓN",
      "evidenceRaised": "Aumentó este rasgo",
      "evidenceLowered": "Redujo este rasgo",
      "feedbackLink": "ENVIAR UNA SUGERENCIA",
      "allSoulsLink": "EXPLORAR LOS SIETE RASGOS"
    },
    title: "UNDERTALE SOUL EXTRACTOR",
    settingsBtn: "AJUSTES",
    audioSettingsTitle: "AJUSTES DE AUDIO",
    musicBgmLabel: "MÚSICA (BGM):",
    soundSfxLabel: "EFECTOS (SFX):",
    muteBtn: "SILENCIAR",
    soundEngineNote: "Audio de píxeles · Ajustes guardados",
    introScenes: ["¿ESTAMOS CONECTADOS?","UN ALMA EN EL VACÍO...","EXPLOREMOS TUS RESPUESTAS."],
    introContinueHint: "pulsa Z o haz clic para continuar",
    skipBtn: "SALTAR",
    startTitle: "SOUL VIRTUES EXTRACTOR",
    startDesc: "Siete virtudes del alma humana. Siete colores. 66 afirmaciones diseñadas para revelar tu resonancia entre Determinación, Valentía, Justicia, Amabilidad, Paciencia, Integridad y Perseverancia.",
    startProceedBtn: "* COMENZAR (66 PREGUNTAS)",
    startResumeBtn: "* CONTINUAR",
    startFeatures: [
      "✓ 100% Gratis y Sin Registro",
      "✓ Cálculo Local en Navegador",
      "✓ Diálogos y Sonidos de Undertale",
    ],
    hudResetBtn: "REINICIAR",
    resetConfirm: "¿Reiniciar las 66 preguntas?",
    dialogueHint: "Haz clic o pulsa Z/Enter para omitir animación de texto",
    extremeLeft: "Muy en desacuerdo",
    extremeRight: "Muy de acuerdo",
    tapAnswerHint: "Toca una respuesta para continuar",
    likertLabels: ["Totalmente en desacuerdo","En desacuerdo","Neutral","De acuerdo","Totalmente de acuerdo"],
    backBtn: "ATRÁS",
    confirmBtn: "CONFIRMAR",
    skipNeutralBtn: "SALTAR (NEUTRAL)",
    resultComplete: "EXTRACCIÓN COMPLETADA",
    primaryVirtue: "VIRTUD PRINCIPAL DEL ALMA",
    secondaryVirtue: "VIRTUD SECUNDARIA / RASGO SOMBRA",
    breakdownTitle: "DESGLOSE DE LAS 7 VIRTUDES",
    shareResultBtn: "COMPARTIR RESULTADO",
    shareResultChannels: "X · INSTAGRAM · MESSAGES · MORE",
    shareHint: "Abre el menú de compartir de tu teléfono y elige cualquier aplicación disponible.",
    shareCardMeta: "66 PREGUNTAS · 7 RASGOS",
    shareCardQuestion: "¿CUÁL ES TU ALMA?",
    shareCardCta: "HAZ EL TEST",
    downloadCardBtn: "DESCARGAR PNG",
    saveCardHint: "Mantén presionada la imagen para guardarla en Fotos o descargas.",
    copyLinkBtn: "COPIAR ENLACE",
    linkCopiedNotice: "¡Enlace copiado!",
    reviewAnswersBtn: "REVISAR RESPUESTAS",
    browseSoulsBtn: "GALERÍA DE LAS 7 ALMAS",
    retakeBtn: "REPETIR TEST",
    reviewTitle: "REVISIÓN DE RESPUESTAS (66 PREGUNTAS)",
    reviewBackBtn: "VOLVER A RESULTADOS",
    soulsGalleryTitle: "LAS SIETE ALMAS HUMANAS",
    soulsBackBtn: "VOLVER A RESULTADOS",
    soulSelectHint: "Haz clic en un alma para inspeccionar sus detalles",
    feedbackVote: {
      title: "¿Qué deberíamos agregar a continuación? (Vota con 1 clic)",
      subtitle: "Has extraído las virtudes de tu alma. Ayúdanos a dar forma al próximo capítulo de este mundo:",
      optFusion: "Interpretación de rasgos combinados — Cómo se combinan mis dos virtudes principales",
      optCards: "Tarjetas de alma personalizables — Más estilos de pixel art para guardar y compartir",
      optRealLife: "Significado en la vida real — Fortalezas, debilidades y trasfondo de mi alma",
      optDeltarune: "Test de almas de Deltarune — Nuevos rasgos y mecánicas de Deltarune",
      optEnough: "La prueba actual ya es genial tal como está",
      optOther: "¿Tienes otra idea? Escríbenos directamente:",
      otherPlaceholder: "Escribe tu sugerencia aquí...",
      submitBtn: "Emitir voto",
      thankYouTitle: "La voz de tu ALMA ahora está grabada en nuestro destino.",
      thankYouMessage: "No eres solo un visitante: estás construyendo este mundo junto a nosotros. Cada elección da forma al siguiente capítulo. Gracias por caminar a nuestro lado; tu chispa guiará lo que está por venir.",
    },
  },
  souls: ES_SOULS,
  questions: ES_QUESTIONS,
};

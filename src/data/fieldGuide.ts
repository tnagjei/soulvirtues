// input: Complete V2 answers or a verified-format legacy score snapshot
// output: Traceable seven-trait readings, answer receipts and a personal practice workbook
// pos: src/data/fieldGuide.ts (更新规则：内容/结构变化同步 success.astro、回归与所属目录 README)

import { QUESTIONS, getQuestions } from './questions';
import { ANSWER_STORAGE_KEY, BANK_VERSION, decodeAnswers } from './quizSession';
import { classifyProfile, computeScores } from './scoring';
import { TRAIT_READING } from './assessmentContent';
import { SOUL_CODES, type SoulCode } from './souls';
import { readReportInput, type ReportInput } from './reportDelivery';

export const GUIDE_VERSION = 'field-guide-1';
export type GuideLanguage = 'en' | 'es';
const colors = { DET: 'red', BRV: 'orange', JUS: 'yellow', KND: 'green', PAT: 'cyan', INT: 'blue', PER: 'purple' } as const;
const inks = { DET: '#f48477', BRV: '#e9a55e', JUS: '#dfca65', KND: '#84c29e', PAT: '#84c8d1', INT: '#8faeea', PER: '#c6a1e0' };

export const GUIDE_COPY = {
  en: {
    title: 'Your Soul Field Guide', brand: 'SOUL VIRTUES', edition: 'A personal companion',
    overview: 'At a glance', readings: 'Seven trait readings', practice: 'From insight to action', week: 'Your next seven days', notes: 'Make it yours', method: 'Sources & limits',
    save: 'Save PDF', home: 'Back to the test', sample: 'Design preview · example answers, not your personal result',
    lead: 'A clear picture of your answers. A practical next step.',
    intro: 'Use this guide to explore what fits your experience, test what does not, and choose one small change worth trying.',
    saved: 'Saved in this browser', saveFailed: 'Saving is unavailable in this browser. Save a PDF to keep your work.',
    scope: '66 answers · 7 themes · one personal workbook', contents: 'Inside your guide',
    close: 'Two themes, worth reading together.', tied: 'More than one theme shares the lead.',
    balanced: 'No strong preference this time.', dominant: 'A starting point, not a fixed identity.',
    closeBody: 'Your two highest readings are within 3 points. Explore them together rather than forcing one label. Three points is a display rule, not a statistical threshold.',
    tiedBody: 'Several themes have the same highest score. The order of the list does not make one more important.',
    balancedBody: 'None of your themes is above the midpoint. That can reflect disagreement, neutral responses or your current circumstances; it does not mean you lack these qualities.',
    dominantBody: 'This is the theme your responses supported most in this quiz. Treat it as a useful question to explore, not a diagnosis or a prediction.',
    signal: 'What the answers show', try: 'What to try', check: 'What to check in real life',
    midpoint: '50 = neutral midpoint', scale: 'Answer scale, 0–100. Not a percentile, ability score or moral grade.',
    pair: 'Your closest leading pair', gap: 'points apart', rank: 'Within your own profile',
    readingIntro: 'Every reading includes the theme’s meaning, your response pattern and the actual answers behind it. A lower score is not automatically something to “fix”.',
    receipt: 'Answer receipts', evidenceNote: 'One of your strongest supporting answers and one of your least supporting answers. These are anchors for reflection, not proof of a hidden trait.',
    response: 'Your response', contribution: 'Relative to the neutral midpoint', reverse: 'Reverse-scored item', direct: 'Direct-scored item',
    supports: 'Supporting', neutral: 'Neutral', counters: 'Less supporting', countNote: 'Counts after reverse-scoring; they describe answers, not people.',
    above: 'Your answers lean toward this theme overall.', below: 'Your answers lean away from these statements overall.', middle: 'Your keyed answers average to the neutral midpoint.',
    mixed: 'Your answers point in both directions. Look at the situations in the two receipts before turning this into a general statement about yourself.',
    neutralReading: 'These answers are mostly neutral. A real example from your week may be more informative than adding a stronger label.',
    consistent: 'The direction is relatively consistent within these items. Check whether it also describes a recent situation outside the quiz.',
    example: 'A situation to rehearse', question: 'Ask yourself', boundary: 'A useful boundary',
    actionsIntro: 'These are rehearsal exercises, not predictions about how you behave. Start with the situation that actually occurs in your life.',
    before: 'Before you act', next: 'A small next step', after: 'Look for this afterwards',
    focus: 'Choose a practice theme', planIntro: 'Use a theme you care about, not necessarily your lowest score. Each step should take about 5–10 minutes; repeat or skip a day to suit your circumstances.',
    day: 'Day', done: 'completed', goal: 'The situation I want to handle differently', cue: 'When this happens…', action: 'I will try…', review: 'What happened, and what will I change?',
    notesIntro: 'The most useful part is the example only you can add. Your notes stay in this browser and are included when you save a PDF.',
    notePlaceholder: 'Write a specific example here…', noteBlank: 'Space for your own example or notes.',
    sources: 'How this guide was made', sourcesBody: 'Scores use this site’s 66-item bank: 56 adapted public-domain IPIP statements and 10 independently written Determination statements. The seven groupings are our design, not a validated psychological inventory.',
    formula: 'Each item is scored from 1 to 5. Reverse items use 6 minus that value. A theme’s mean is converted with 100 × (mean − 1) ÷ 4. All seven themes have the same maximum.',
    limits: 'Use the guide for reflection. It cannot diagnose a condition, establish population rarity, predict relationships or measure game combat abilities.',
    methodLink: 'Read the sources and scoring method', support: 'Need help with your report?', aiTitle: 'An additional AI perspective',
    aiBody: 'Optional: ask for another interpretation of this profile. Your score summary will be sent to the report service. The answer-based workbook above is already complete.',
    aiButton: 'Request AI perspective', aiBusy: 'Preparing the additional perspective…', aiError: 'The AI section is unavailable right now. Your full answer-based guide and PDF are still available.',
    aiSource: 'AI interpretation · check it against your own examples', aiPrepared: 'Prepared interpretation · the AI service was unavailable',
    sampleAi: 'AI requests are disabled in this design preview.', noAnswers: 'Your completed answers were not found.',
    noAnswersBody: 'Open this page in the browser where you completed the test, or return to finish your saved answers. You do not need to pay again.',
    legacy: 'Only your saved scores are available. Item-level receipts are omitted rather than reconstructed. Complete the test in this browser to include them.',
    printHelp: 'Choose “Save as PDF” in the print window. Your notes and all seven readings are included.',
    of: 'of', items: 'items', mean: 'Keyed mean', spread: 'Difference between your highest and lowest readings',
    weeks: ['Choose a real situation', 'Notice the trigger', 'Try one small response', 'Ask for another perspective', 'Change one condition', 'Repeat what was useful', 'Review without grading yourself'],
    tasks: ['Write down one recent example. What did you want to happen?', 'Describe what happened just before your usual response. Use observable facts.', 'Try the action below once in a low-stakes situation.', 'Ask someone involved what they needed. Listen before explaining your intention.', 'Make the experiment smaller, clearer or easier to repeat. Change only one thing.', 'Repeat the useful part. Notice what differs when your energy or context changes.', 'Compare the first and latest example. What helped, what did not, and what will you keep?'],
    outputs: ['One situation', 'One cue', 'One attempt', 'One new detail', 'One adjustment', 'One repeated action', 'One decision for next week'],
  },
  es: {
    title: 'Tu guía personal del alma', brand: 'SOUL VIRTUES', edition: 'Una guía para acompañarte',
    overview: 'De un vistazo', readings: 'Lectura de siete rasgos', practice: 'De la idea a la acción', week: 'Tus próximos siete días', notes: 'Hazla tuya', method: 'Fuentes y límites',
    save: 'Guardar PDF', home: 'Volver al test', sample: 'Vista previa · respuestas de ejemplo, no tu resultado personal',
    lead: 'Entiende tus respuestas. Elige un siguiente paso.',
    intro: 'Explora qué encaja con tu experiencia, comprueba qué no encaja y elige un cambio pequeño que merezca la pena probar.',
    saved: 'Guardado en este navegador', saveFailed: 'No se puede guardar en este navegador. Guarda un PDF para conservar tu trabajo.',
    scope: '66 respuestas · 7 temas · una guía personal', contents: 'Dentro de tu guía',
    close: 'Dos temas que conviene leer juntos.', tied: 'Varios temas comparten el primer lugar.',
    balanced: 'Sin una preferencia clara esta vez.', dominant: 'Un punto de partida, no una identidad fija.',
    closeBody: 'Tus dos resultados mayores están a menos de 3 puntos. Explóralos juntos sin forzar una sola etiqueta. Tres puntos es una regla de presentación, no un umbral estadístico.',
    tiedBody: 'Varios temas tienen la misma puntuación máxima. El orden de la lista no convierte a uno en más importante.',
    balancedBody: 'Ningún tema supera el punto medio. Puede reflejar desacuerdo, respuestas neutrales o tus circunstancias actuales; no significa que carezcas de esas cualidades.',
    dominantBody: 'Este es el tema que más apoyan tus respuestas en este test. Úsalo como una pregunta para explorar, no como diagnóstico ni predicción.',
    signal: 'Qué muestran las respuestas', try: 'Qué probar', check: 'Qué comprobar en la vida real',
    midpoint: '50 = punto medio neutral', scale: 'Escala de respuestas de 0 a 100. No es un percentil, una capacidad ni una nota moral.',
    pair: 'Tus dos temas con mayor puntuación', gap: 'puntos de diferencia', rank: 'Dentro de tu propio perfil',
    readingIntro: 'Cada lectura explica el tema, el patrón de respuestas y las respuestas concretas que lo sustentan. Una puntuación menor no es automáticamente algo que debas corregir.',
    receipt: 'Respuestas de referencia', evidenceNote: 'Una de las respuestas que más apoya el tema y una de las que menos lo apoya. Son referencias para reflexionar, no pruebas de un rasgo oculto.',
    response: 'Tu respuesta', contribution: 'Respecto al punto medio neutral', reverse: 'Ítem de puntuación inversa', direct: 'Ítem de puntuación directa',
    supports: 'A favor', neutral: 'Neutrales', counters: 'Menor apoyo', countNote: 'Recuento tras invertir los ítems necesarios; describe respuestas, no personas.',
    above: 'En conjunto, tus respuestas se inclinan hacia este tema.', below: 'En conjunto, tus respuestas se alejan de estas afirmaciones.', middle: 'La media corregida coincide con el punto medio neutral.',
    mixed: 'Tus respuestas apuntan en ambas direcciones. Revisa las situaciones concretas antes de convertirlas en una afirmación general sobre ti.',
    neutralReading: 'Predominan respuestas neutrales. Un ejemplo real de esta semana puede ser más informativo que una etiqueta más fuerte.',
    consistent: 'La dirección es relativamente consistente en estos ítems. Comprueba si también describe una situación reciente fuera del test.',
    example: 'Una situación para ensayar', question: 'Pregúntate', boundary: 'Un límite útil',
    actionsIntro: 'Son ejercicios para ensayar, no predicciones sobre tu conducta. Empieza por una situación que realmente ocurra en tu vida.',
    before: 'Antes de actuar', next: 'Un paso pequeño', after: 'Qué observar después',
    focus: 'Elige un tema de práctica', planIntro: 'Elige un tema que te importe, no necesariamente el de menor puntuación. Dedica unos 5–10 minutos a cada paso y adapta el ritmo a tus circunstancias.',
    day: 'Día', done: 'completados', goal: 'La situación que quiero abordar de otra manera', cue: 'Cuando ocurra esto…', action: 'Probaré…', review: 'Qué ocurrió y qué cambiaré',
    notesIntro: 'Tu propio ejemplo es la parte que solo tú puedes aportar. Las notas quedan en este navegador y se incluyen al guardar el PDF.',
    notePlaceholder: 'Escribe aquí un ejemplo concreto…', noteBlank: 'Espacio para tu ejemplo o tus notas.',
    sources: 'Cómo se elaboró esta guía', sourcesBody: 'Se usa el banco de 66 ítems del sitio: 56 afirmaciones adaptadas del IPIP de dominio público y 10 de Determinación escritas de forma independiente. Las siete agrupaciones son un diseño propio, no un instrumento psicológico validado.',
    formula: 'Cada ítem vale de 1 a 5. Para ítems inversos se usa 6 menos el valor. La media del tema se convierte mediante 100 × (media − 1) ÷ 4. Los siete temas tienen el mismo máximo.',
    limits: 'Usa esta guía para reflexionar. No diagnostica condiciones, estima rareza poblacional, predice relaciones ni mide capacidades de combate.',
    methodLink: 'Consultar las fuentes y el método', support: '¿Necesitas ayuda con tu guía?', aiTitle: 'Una perspectiva adicional de IA',
    aiBody: 'Opcional: solicita otra interpretación de este perfil. El resumen de puntuaciones se enviará al servicio del informe. La guía basada en respuestas ya está completa.',
    aiButton: 'Solicitar perspectiva de IA', aiBusy: 'Preparando la perspectiva adicional…', aiError: 'La sección de IA no está disponible ahora. Tu guía basada en respuestas y su PDF siguen disponibles.',
    aiSource: 'Interpretación de IA · contrástala con tus ejemplos', aiPrepared: 'Interpretación preparada · la IA no estaba disponible',
    sampleAi: 'Las solicitudes de IA están desactivadas en esta vista previa.', noAnswers: 'No encontramos tus respuestas completas.',
    noAnswersBody: 'Abre esta página en el navegador donde terminaste el test o vuelve para completar las respuestas guardadas. No necesitas pagar otra vez.',
    legacy: 'Solo están disponibles tus puntuaciones guardadas. Omitimos las respuestas individuales en lugar de reconstruirlas. Completa el test en este navegador para incluirlas.',
    printHelp: 'Elige «Guardar como PDF» en la ventana de impresión. Se incluyen tus notas y los siete rasgos.',
    of: 'de', items: 'ítems', mean: 'Media corregida', spread: 'Diferencia entre tu mayor y menor resultado',
    weeks: ['Elige una situación real', 'Observa el desencadenante', 'Prueba una respuesta pequeña', 'Pide otra perspectiva', 'Cambia una condición', 'Repite lo que sirvió', 'Revisa sin ponerte una nota'],
    tasks: ['Anota un ejemplo reciente. ¿Qué querías que ocurriera?', 'Describe qué pasó justo antes de tu respuesta habitual. Usa hechos observables.', 'Prueba una vez la acción de abajo en una situación de poco riesgo.', 'Pregunta a otra persona involucrada qué necesitaba. Escucha antes de explicar tu intención.', 'Haz el experimento más pequeño, claro o fácil de repetir. Cambia solo una cosa.', 'Repite la parte útil. Observa qué cambia cuando varían tu energía o las circunstancias.', 'Compara el primer ejemplo con el último. ¿Qué sirvió, qué no y qué mantendrás?'],
    outputs: ['Una situación', 'Una señal', 'Un intento', 'Un detalle nuevo', 'Un ajuste', 'Una acción repetida', 'Una decisión para la próxima semana'],
  },
};

const names = {
  en: ['Determination', 'Bravery', 'Justice', 'Kindness', 'Patience', 'Integrity', 'Perseverance'],
  es: ['Determinación', 'Valentía', 'Justicia', 'Amabilidad', 'Paciencia', 'Integridad', 'Perseverancia'],
};
// Editorial exercises are suggestions to test, not conclusions inferred from a score.
const exercises = {
  en: [
    ['Write one reason your goal still matters and one condition under which you would change direction.', 'Do not use persistence as a reason to stay in harm or ignore new evidence.', 'Did the next step serve the goal, or only protect the old plan?'],
    ['Prepare one sentence for a concern you have avoided. Practise it privately, then choose a safe opportunity to use it.', 'Bravery does not require confrontation, danger or ignoring a power imbalance.', 'Was the concern expressed clearly, even if the nerves remained?'],
    ['Before dividing work or credit, write the rule you would accept from either side.', 'Fairness can require different support for different needs; equal is not always fair.', 'Would you accept this rule if you received the least favourable outcome?'],
    ['Ask “Would listening, practical help or some space be most useful?” before offering support.', 'You can be caring and still set a boundary on your time or energy.', 'Did the help match what the person actually asked for?'],
    ['Choose a reasonable time to follow up. Until then, switch to one task you can influence.', 'Patience is not a requirement to tolerate harm, disrespect or indefinite delay.', 'Did fewer checks leave more attention for the task in front of you?'],
    ['Name a commitment you may miss. Explain it early and propose one realistic next step.', 'Honesty does not mean disclosing private information that is not yours to share.', 'Did the new commitment become clearer and more achievable?'],
    ['Work on one defined step for ten minutes. Then decide to continue, adjust, rest or stop based on what you learned.', 'Finishing every task is not always useful. Rest and changing methods belong in the plan.', 'Did another attempt produce useful progress, or repeat the same obstacle?'],
  ],
  es: [
    ['Escribe una razón por la que tu objetivo sigue importando y una condición que te haría cambiar de rumbo.', 'La persistencia no obliga a soportar daño ni a ignorar información nueva.', '¿El siguiente paso ayudó al objetivo o solo protegió el plan anterior?'],
    ['Prepara una frase sobre una preocupación que has evitado. Ensáyala en privado y busca una ocasión segura para usarla.', 'La valentía no exige enfrentarse, correr peligro ni ignorar una desigualdad de poder.', '¿Expresaste la preocupación con claridad aunque siguieran los nervios?'],
    ['Antes de repartir trabajo o reconocimiento, escribe una regla que aceptarías desde cualquiera de los lados.', 'La justicia puede exigir apoyos distintos; lo igual no siempre es justo.', '¿Aceptarías la regla si recibieras el resultado menos favorable?'],
    ['Pregunta «¿Te ayudaría que escuche, que haga algo concreto o que te dé espacio?» antes de ofrecer apoyo.', 'Puedes preocuparte por alguien y poner límites a tu tiempo o energía.', '¿La ayuda respondió a lo que la persona realmente pidió?'],
    ['Elige un momento razonable para preguntar de nuevo. Mientras tanto, haz una tarea sobre la que puedas actuar.', 'La paciencia no obliga a tolerar daño, falta de respeto o retrasos indefinidos.', '¿Revisar menos te dejó más atención para la tarea presente?'],
    ['Identifica un compromiso que quizá no puedas cumplir. Explícalo pronto y propón un paso realista.', 'Ser honesto no exige revelar información privada que no te corresponde compartir.', '¿El nuevo compromiso quedó más claro y fue más viable?'],
    ['Trabaja diez minutos en un paso definido. Luego decide continuar, ajustar, descansar o parar según lo aprendido.', 'No siempre sirve terminarlo todo. Descansar y cambiar de método también forman parte del plan.', '¿Otro intento produjo progreso útil o repitió el mismo obstáculo?'],
  ],
};

export function buildFieldGuide(input: ReportInput, answers: number[] | null, lang: GuideLanguage) {
  const copy = GUIDE_COPY[lang];
  if (answers && (answers.length !== QUESTIONS.length || answers.some(a => !Number.isInteger(a) || a < 0 || a > 4))) throw new Error('Incomplete answers');
  if (answers) {
    const actual = computeScores(answers, QUESTIONS).pct;
    input = { ...input, scores: Object.fromEntries(SOUL_CODES.map(code => [colors[code], actual[code]])) as ReportInput['scores'] };
  }
  const questions = getQuestions(lang);
  const pct = Object.fromEntries(SOUL_CODES.map(code => [code, input.scores[colors[code]]])) as Record<SoulCode, number>;
  const profile = classifyProfile(pct, 66, 66);
  const traits = SOUL_CODES.map((code, index) => {
    const items = questions.flatMap((q, i) => q.trait !== code || !answers ? [] : [{
      id: q.id, number: i + 1, question: q.q, answer: q.labels[answers[i]], reverse: q.reverse,
      keyed: q.reverse ? 5 - answers[i] : answers[i] + 1,
    }]);
    const sorted = [...items].sort((a, b) => b.keyed - a.keyed || a.number - b.number);
    const evidence = items.length ? [sorted[0], sorted[sorted.length - 1]] : [];
    const positive = items.filter(item => item.keyed > 3).length;
    const negative = items.filter(item => item.keyed < 3).length;
    const neutral = items.filter(item => item.keyed === 3).length;
    const reading = TRAIT_READING[lang][code];
    return { code, color: colors[code], ink: inks[code], name: names[lang][index], score: pct[code],
      mean: 1 + pct[code] / 25, total: questions.filter(q => q.trait === code).length,
      items, evidence, positive, negative, neutral, ...reading,
      signal: pct[code] > 50 ? copy.above : pct[code] < 50 ? copy.below : copy.middle,
      pattern: !items.length ? copy.legacy : positive && negative ? copy.mixed : neutral > items.length / 2 ? copy.neutralReading : copy.consistent,
      experiment: exercises[lang][index][0], boundary: exercises[lang][index][1], outcome: exercises[lang][index][2],
    };
  });
  const ranked = profile.ranked.map(code => traits.find(t => t.code === code)!);
  // Keep notes attached to the answers across layout and report-language changes.
  const fingerprint = JSON.stringify({ bank: BANK_VERSION, scores: input.scores, answers });
  let hash = 2166136261;
  for (const char of fingerprint) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
  return { input, answers, lang, copy, traits, ranked, kind: profile.kind, fingerprint,
    id: 'SV-' + hash.toString(16).toUpperCase().padStart(8, '0'),
    title: profile.kind === 'close' ? copy.close : profile.kind === 'tied' ? copy.tied : profile.kind === 'balanced' ? copy.balanced : copy.dominant,
    summary: profile.kind === 'close' ? copy.closeBody : profile.kind === 'tied' ? copy.tiedBody : profile.kind === 'balanced' ? copy.balancedBody : copy.dominantBody,
    gap: ranked[0].score - ranked[1].score, spread: ranked[0].score - ranked[6].score,
  };
}

export function readFieldGuide(storage: Pick<Storage, 'getItem'>, lang: GuideLanguage) {
  const input = readReportInput(storage);
  if (!input) return null;
  const saved = storage.getItem(ANSWER_STORAGE_KEY);
  const answers = saved ? decodeAnswers(saved, QUESTIONS) : null;
  return buildFieldGuide(input, answers as number[] | null, lang);
}

export function sampleGuideInput() {
  // Development preview only. Reverse items are encoded using the same keyed scale.
  const targets = { DET: 0, BRV: 1, JUS: 3, KND: 2, PAT: 0, INT: 1, PER: 4 };
  const answers = QUESTIONS.map(() => 2);
  for (const code of SOUL_CODES) {
    const indices = QUESTIONS.flatMap((q, i) => q.trait === code ? [i] : []);
    let remaining = targets[code] + 1;
    for (const index of indices.slice(0, -1)) {
      const delta = Math.min(2, remaining);
      answers[index] = QUESTIONS[index].reverse ? 2 - delta : 2 + delta;
      remaining -= delta;
    }
    const last = indices[indices.length - 1];
    answers[last] = QUESTIONS[last].reverse ? 3 : 1;
  }
  return answers;
}

// input: JSON with soul scores and traits
// output: AI-generated 5-chapter comprehensive psychological dossier
// pos: functions/api/generate-report.ts

interface Env {
  DEEPSEEK_API_KEY?: string;
  OPENAI_API_KEY?: string;
}

const TRAIT_NAMES: Record<string, string> = {
  red: 'Determination (Red Soul)',
  orange: 'Bravery (Orange Soul)',
  yellow: 'Justice (Yellow Soul)',
  green: 'Kindness (Green Soul)',
  cyan: 'Patience (Cyan Soul)',
  blue: 'Integrity (Blue Soul)',
  purple: 'Perseverance (Purple Soul)',
};

interface ReportChapters {
  chapter1_engine: string;
  chapter2_paradox: string;
  chapter3_combat: string;
  chapter4_interpersonal: string;
  chapter5_evolution: string;
}

const FALLBACK_PROFILES: Record<string, { en: ReportChapters; es: ReportChapters }> = {
  red: {
    en: {
      chapter1_engine: 'You embody Determination—a profound internal drive characterized by purposeful autonomy and relentless resilience. When facing adversity, your primary instinct is not passive compromise, but focused resolve to reshape your circumstances according to your vision.',
      chapter2_paradox: 'Your greatest strength—unbending persistence—can subtly shift into situational rigidity. When objectives stall, distinguishing between genuine perseverance and stubborn attachment to outdated assumptions is your key area for personal evolution.',
      chapter3_combat: 'In the Undertale battle philosophy, your soul energy manifests as high baseline HP recovery and steady forward motion. You excel in complex encounters that reward endurance and unwavering commitment over impulsive improvisation.',
      chapter4_interpersonal: 'In collaborative settings, peers perceive you as a pillar of dependability during ambiguous crises. However, you must be mindful of peers who move at a different cadence, ensuring your high intensity does not accidentally overwhelm collaborative momentum.',
      chapter5_evolution: 'Practice deliberate tactical pauses. Taking a structured breath to re-evaluate your assumptions before re-committing your will enhances the strategic impact of your unstoppable drive.',
    },
    es: {
      chapter1_engine: 'Encarnas la Determinación: un profundo impulso interior caracterizado por la autonomía y la resiliencia constante. Ante la adversidad, tu instinto principal es avanzar con firmeza para transformar tus circunstancias.',
      chapter2_paradox: 'Tu mayor fortaleza—la persistencia inquebrantable—puede transformarse en rigidez. Cuando un objetivo se bloquea, distinguir entre la perseverancia constructiva y el apego a viejos supuestos es tu clave de crecimiento.',
      chapter3_combat: 'En la filosofía de combate de Undertale, tu alma roja se manifiesta como una resistencia inagotable. Sobresales en desafíos que premian la tenacidad y la negativa absoluta a rendirte.',
      chapter4_interpersonal: 'En el trabajo colaborativo, los demás te ven como un ancla de confianza en momentos de crisis. Cuida que tu elevado nivel de exigencia no abrume a quienes avanzan a un ritmo diferente.',
      chapter5_evolution: 'Practica pausas tácticas deliberadas. Evaluar tus supuestos antes de redoblar esfuerzos multiplicará el impacto real de tu extraordinaria voluntad.',
    },
  },
  orange: {
    en: {
      chapter1_engine: 'You are guided by Bravery—an energetic bias toward proactive engagement and courage under uncertainty. You naturally step into uncharted territory where others hesitate, seeking growth through initiative.',
      chapter2_paradox: 'The impulse to move forward boldly can occasionally bypass critical reflection. Under pressure, you may mistake pausing for weakness, whereas deliberate pacing often yields greater strategic impact.',
      chapter3_combat: 'Like the Orange Soul that must continually keep moving to avoid taking damage, your vitality peaks when you are actively pursuing dynamic momentum rather than staying stationary.',
      chapter4_interpersonal: 'You act as an energizer in social circles, inspiring others to break out of comfort zones. Your challenge is learning to listen deeply when situations call for stillness and diplomatic subtlety.',
      chapter5_evolution: 'Build emotional patience into your action loop. Before leaping into unknown territory, ground your courage in clear situational awareness.',
    },
    es: {
      chapter1_engine: 'Te guía la Valentía: una inclinación natural hacia la acción directa y el coraje ante lo desconocido. Avanzas donde otros vacilan, buscando la superación a través de la iniciativa.',
      chapter2_paradox: 'El deseo de actuar con audacia a veces ignora la reflexión previa. En momentos de tensión, podrías confundir una pausa con debilidad, cuando el ritmo medido suele ser más efectivo.',
      chapter3_combat: 'Al igual que el Alma naranja en Undertale que debe mantenerse en movimiento continuo, tu energía vital alcanza su máximo cuando tomas la iniciativa.',
      chapter4_interpersonal: 'Actúas como un motor motivador, animando a los demás a asumir retos. Tu desafío es desarrollar la escucha activa en situaciones que demandan calma.',
      chapter5_evolution: 'Incorpora la paciencia reflexiva en tu dinámica de acción. Asegúrate de evaluar el terreno antes de dar saltos audaces.',
    },
  },
  yellow: {
    en: {
      chapter1_engine: 'You channel Justice—a deeply calibrated moral compass centered on accountability, equity, and principled action. You are naturally motivated to protect balance and rectify unfairness.',
      chapter2_paradox: 'A high commitment to fairness can sometimes lead to black-and-white evaluations. Developing comfort with ambiguity and interpersonal nuance expands your moral leadership into true wisdom.',
      chapter3_combat: 'Resonating with the precision aim of the Yellow Soul, your strength lies in calculated decisiveness that addresses root causes rather than superficial symptoms.',
      chapter4_interpersonal: 'Peers look to you as an objective arbiter. Ensure your high moral clarity remains inviting and constructive, avoiding unintentional self-righteousness.',
      chapter5_evolution: 'Embrace compassionate equity. Understanding the systemic and emotional roots behind human errors will elevate your sense of justice into transformative leadership.',
    },
    es: {
      chapter1_engine: 'Canalizas la Justicia: una brújula moral centrada en la equidad, la responsabilidad y los principios. Sientes una motivación genuina por proteger el equilibrio y corregir lo injusto.',
      chapter2_paradox: 'El compromiso estricto con la justicia puede llevar a juicios dicotómicos. Aprender a navegar los matices humanos permite que tus principios se conviertan en verdadera sabiduría.',
      chapter3_combat: 'En sintonía con la puntería precisa del Alma amarilla, tu mayor virtud radica en la claridad para actuar sobre las causas reales y defender lo correcto.',
      chapter4_interpersonal: 'Los demás recurren a ti como árbitro objetivo. Procura que tu rectitud sea constructiva y empática, evitando posturas excesivamente severas.',
      chapter5_evolution: 'Integra la empatía con la rectitud. Comprender las razones humanas detrás de los fallos elevará tu liderazgo a un nivel superior.',
    },
  },
  green: {
    en: {
      chapter1_engine: 'Your core frequency is Kindness—an empathetic orientation that heals environments and fosters deep relational trust. You provide safety and emotional stability to those around you.',
      chapter2_paradox: 'Your boundless capacity for generosity can inadvertently deprioritize your own boundaries. Remember that protecting your own reserves is essential to sustaining genuine compassion.',
      chapter3_combat: 'Embodying the protective shield of the Green Soul, you naturally intercept harm and create safe harbor for others during intense emotional turbulence.',
      chapter4_interpersonal: 'You are the relational glue of any group. To prevent silent burnout, learn to state your personal needs directly without feeling guilty.',
      chapter5_evolution: 'Treat self-care as a non-negotiable discipline. You can only sustain kindness toward the world when your own well-being is safeguarded.',
    },
    es: {
      chapter1_engine: 'Tu frecuencia principal es la Amabilidad: una orientación empática que sana entornos y genera confianza mutua. Eres un refugio de estabilidad emocional para quienes te rodean.',
      chapter2_paradox: 'Tu generosidad puede hacer que descuides tus propios límites personales. Proteger tus reservas de energía es imprescindible para mantener tu compasión a largo plazo.',
      chapter3_combat: 'Al igual que el escudo protector del Alma verde en Undertale, tu naturaleza instintiva defiende a los demás y aporta serenidad ante el caos.',
      chapter4_interpersonal: 'Eres el pilar afectivo en tus relaciones. Para evitar el agotamiento silencioso, expresa tus necesidades sin sentir culpa.',
      chapter5_evolution: 'Establece límites saludables con firmeza. Cuidar de ti mismo es el primer requisito para poder seguir cuidando de los demás.',
    },
  },
  cyan: {
    en: {
      chapter1_engine: 'You manifest Patience—the rare power of deliberate stillness, observant timing, and emotional composure. You excel at reading long-term currents while others rush prematurely.',
      chapter2_paradox: 'Patience can occasionally mask hesitation or passive avoidance of friction. Knowing when observation has fulfilled its purpose and transition to action is necessary is your growth edge.',
      chapter3_combat: 'Aligned with the light-blue attack mechanics that demand standing completely still, you thrive when others panic, mastering the power of non-reactive presence.',
      chapter4_interpersonal: 'You bring tranquil clarity to chaotic discussions. Practice vocalizing your inner observations so your stillness is not mistaken for disinterest.',
      chapter5_evolution: 'Calibrate the tipping point from patience to proactive intervention. The most powerful patience knows exactly when the moment to strike has arrived.',
    },
    es: {
      chapter1_engine: 'Manifiestas la Paciencia: la valiosa capacidad de mantener la calma reflexiva y el tiempo preciso. Sabes esperar el momento oportuno mientras otros se apresuran.',
      chapter2_paradox: 'La paciencia a veces puede encubrir la postergación o el temor a la fricción. Saber cuándo la observación ha cumplido su ciclo y es hora de actuar es tu mayor aprendizaje.',
      chapter3_combat: 'En sintonía con los ataques celestes de Undertale que exigen permanecer inmóvil, destacas por mantener la serenidad cuando el entorno entra en pánico.',
      chapter4_interpersonal: 'Aportas claridad sosegada en momentos tensos. Comparte tus conclusiones para que tu silencio no se interprete como desinterés.',
      chapter5_evolution: 'Reconoce el momento justo para pasar a la acción. La verdadera maestría de la paciencia radica en intervenir en el instante preciso.',
    },
  },
  blue: {
    en: {
      chapter1_engine: 'Your foundation is Integrity—an internal architecture of truth, personal authenticity, and alignment between belief and behavior. You respect elegance, rhythm, and self-honesty.',
      chapter2_paradox: 'High internal standards can manifest as exacting self-criticism or disappointment with the compromises of daily life. Allowing room for imperfection strengthens your inner harmony.',
      chapter3_combat: 'Echoing the jumping physics and gravity rules of the Blue Soul, you navigate complex social and creative fields with grace, balance, and structured discipline.',
      chapter4_interpersonal: 'You command authentic respect through moral consistency. Soften your critique of others by recognizing diverse developmental stages.',
      chapter5_evolution: 'Practice self-compassion. Holding yourself to impossible ideals drains your joy; authentic integrity celebrates progress over absolute perfection.',
    },
    es: {
      chapter1_engine: 'Tu base es la Integridad: una arquitectura interior de honestidad y coherencia entre convicciones y conducta. Valoras la autenticidad y el compromiso contigo mismo.',
      chapter2_paradox: 'La exigencia interior puede derivar en una autocrítica implacable. Dar espacio a la imperfección humana fortalece tu equilibrio y bienestar emocional.',
      chapter3_combat: 'Reflejando la gravedad y el salto del Alma azul, te mueves por la vida con disciplina estructurada, buscando la armonía y la verdad.',
      chapter4_interpersonal: 'Inspiras respeto gracias a tu coherencia. Modera tus juicios hacia los demás reconociendo que cada persona tiene su propio proceso.',
      chapter5_evolution: 'Cultiva la autocompasión. La integridad verdadera celebra la evolución continua por encima de una perfección inalcanzable.',
    },
  },
  purple: {
    en: {
      chapter1_engine: 'You represent Perseverance—an analytical tenacity that systematically breaks down obstacles through study, method, and relentless execution. You do not just endure; you master.',
      chapter2_paradox: 'Relying heavily on cognitive problem-solving can distance you from emotional vulnerability. Integrating intuitive and relational insight accelerates your overall progress.',
      chapter3_combat: 'Like the Purple Soul navigating web lines with calculated discipline, you find order and tactical pathways where others see overwhelming complexity.',
      chapter4_interpersonal: 'You are the problem-solver who turns chaotic projects into structured success. Remember to validate others emotionally before offering analytical solutions.',
      chapter5_evolution: 'Allow room for intuitive play. Not every challenge requires a structured protocol; sometimes the most efficient path is creative experimentation.',
    },
    es: {
      chapter1_engine: 'Representas la Perseverancia: una tenacidad analítica que supera barreras mediante el estudio, el método y la dedicación constante. No te limitas a resistir: dominas el reto.',
      chapter2_paradox: 'Apoyarse demasiado en el análisis racional puede desconectarte de tu intuición emocional. Integrar la sensibilidad con tu rigor metódico multiplica tu potencial.',
      chapter3_combat: 'Al igual que el Alma morada moviéndose con orden sobre las líneas de la red, descubres caminos lógicos donde otros solo ven confusión.',
      chapter4_interpersonal: 'Eres quien transforma el desorden en estructura. Recuerda conectar a nivel humano antes de presentar soluciones técnicas.',
      chapter5_evolution: 'Da espacio a la creatividad intuitiva. No todos los retos requieren protocolos rígidos; la flexibilidad multiplica tu eficacia.',
    },
  },
};

export async function onRequest(context: { request: Request; env: Env }) {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = (await context.request.json()) as any;
    const { scores = {}, dominant = 'red', secondary = null, lang = 'en' } = body;

    const apiKey = context.env?.DEEPSEEK_API_KEY || context.env?.OPENAI_API_KEY;

    if (apiKey) {
      const prompt = `You are an authoritative psychological profiler and philosophical analyst of the Undertale 7 Soul Virtues framework (Determination, Bravery, Justice, Kindness, Patience, Integrity, Perseverance).
Analyze this user's specific 66-question test result profile:
- Dominant Virtue: ${TRAIT_NAMES[dominant] || dominant}
- Secondary Virtue: ${secondary ? (TRAIT_NAMES[secondary] || secondary) : 'None'}
- 7-Virtue Scores (0-100%): ${JSON.stringify(scores)}

Write a comprehensive, professional, 5-chapter psychological dossier in ${lang === 'es' ? 'Spanish' : 'English'}.
Format strictly as JSON with five keys:
1. 'chapter1_engine': (250 words) Detailed analysis of their Core Motivational Engine & Cognitive Bias.
2. 'chapter2_paradox': (200 words) Analysis of their Shadow Paradox, subconscious friction points, and stress triggers.
3. 'chapter3_combat': (200 words) Undertale Soul Battle Philosophy & Strategic Decision-making archetype.
4. 'chapter4_interpersonal': (200 words) Interpersonal Dynamics, leadership style, and collaboration friction points.
5. 'chapter5_evolution': (150 words) Tactical Evolution Protocol: 3 concrete behavioral adjustments for optimal personal growth.
Return ONLY raw valid JSON, no markdown code blocks.`;

      try {
        const isDeepSeek = Boolean(context.env?.DEEPSEEK_API_KEY);
        const endpoint = isDeepSeek
          ? 'https://api.deepseek.com/chat/completions'
          : 'https://api.openai.com/v1/chat/completions';
        const model = isDeepSeek ? 'deepseek-chat' : 'gpt-4o-mini';

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        const aiRes = await fetch(endpoint, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: 'You are an authoritative psychological profiler. Return clean JSON only.' },
              { role: 'user', content: prompt },
            ],
            temperature: 0.7,
            response_format: { type: 'json_object' },
          }),
        });

        clearTimeout(timeoutId);

        if (aiRes.ok) {
          const aiData = (await aiRes.json()) as any;
          const contentText = aiData?.choices?.[0]?.message?.content;
          if (contentText) {
            const parsed = JSON.parse(contentText);
            return new Response(JSON.stringify({ source: 'ai', ...parsed }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }
      } catch (aiErr) {
        console.error('AI API failed or timed out, safely falling back to curated matrix:', aiErr);
      }
    }

    // Guaranteed 100% Delivery: Full 7-Trait Multilingual 5-Chapter Synthesis Engine
    const profileKey = dominant in FALLBACK_PROFILES ? dominant : 'red';
    const languageKey = lang === 'es' ? 'es' : 'en';
    const fallbackData = FALLBACK_PROFILES[profileKey][languageKey];

    const fallbackReport = {
      source: 'synthesis',
      ...fallbackData,
    };

    return new Response(JSON.stringify(fallbackReport), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Report generation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// input: JSON with soul scores and traits
// output: AI-generated or structured psychological report
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

interface ReportSection {
  coreArchetype: string;
  behavioralParadox: string;
  soulResonance: string;
}

const FALLBACK_PROFILES: Record<string, { en: ReportSection; es: ReportSection }> = {
  red: {
    en: {
      coreArchetype: 'You embody Determination—a profound internal drive characterized by persistent autonomy and resilience. When facing adversity, your primary instinct is not compromise, but focused resolve to reshape your circumstances according to your vision.',
      behavioralParadox: 'Your greatest strength—unbending persistence—can subtly shift into stubborn resistance. When objectives stall, distinguishing between meaningful perseverance and attachment to outdated strategies is your key area for personal evolution.',
      soulResonance: 'In the Undertale battle philosophy, your soul energy manifests as high baseline HP recovery and steady forward motion. You thrive in complex encounters that reward endurance and unwavering commitment.',
    },
    es: {
      coreArchetype: 'Encarnas la Determinación: un profundo impulso interior caracterizado por la autonomía y la resiliencia constante. Ante la adversidad, tu instinto principal es avanzar con firmeza para transformar tus circunstancias.',
      behavioralParadox: 'Tu mayor fortaleza—la persistencia inquebrantable—puede transformarse en rigidez. Cuando un objetivo se bloquea, distinguir entre la perseverancia constructiva y el apego a viejos supuestos es tu clave de crecimiento.',
      soulResonance: 'En la filosofía de combate de Undertale, tu alma roja se manifiesta como una resistencia inagotable. Sobresales en desafíos que premian la tenacidad y la negativa absoluta a rendirte.',
    },
  },
  orange: {
    en: {
      coreArchetype: 'You are guided by Bravery—an energetic bias toward direct engagement and courage under uncertainty. You naturally step into uncharted territory where others hesitate, seeking growth through proactive action.',
      behavioralParadox: 'The impulse to move forward boldly can occasionally bypass critical reflection. Under pressure, you may mistake pausing for weakness, whereas deliberate pacing often yields greater strategic impact.',
      soulResonance: 'Like the Orange Soul that must continually keep moving to avoid taking damage, your vitality peaks when you are actively pursuing dynamic momentum rather than staying stationary.',
    },
    es: {
      coreArchetype: 'Te guía la Valentía: una inclinación natural hacia la acción directa y el coraje ante lo desconocido. Avanzas donde otros vacilan, buscando la superación a través de la iniciativa.',
      behavioralParadox: 'El deseo de actuar con audacia a veces ignora la reflexión previa. En momentos de tensión, podrías confundir una pausa con debilidad, cuando el ritmo medido suele ser más efectivo.',
      soulResonance: 'Al igual que el Alma naranja en Undertale que debe mantenerse en movimiento continuo, tu energía vital alcanza su máximo cuando tomas la iniciativa.',
    },
  },
  yellow: {
    en: {
      coreArchetype: 'You channel Justice—a deeply calibrated moral compass centered on accountability, equity, and principled action. You are naturally motivated to protect balance and rectify unfairness.',
      behavioralParadox: 'A high commitment to fairness can sometimes lead to black-and-white evaluations. Developing comfort with ambiguity and interpersonal nuance expands your moral leadership into true wisdom.',
      soulResonance: 'Resonating with the precision aim of the Yellow Soul, your strength lies in calculated decisiveness that addresses root causes rather than superficial symptoms.',
    },
    es: {
      coreArchetype: 'Canalizas la Justicia: una brújula moral centrada en la equidad, la responsabilidad y los principios. Sientes una motivación genuina por proteger el equilibrio y corregir lo injusto.',
      behavioralParadox: 'El compromiso estricto con la justicia puede llevar a juicios dicotómicos. Aprender a navegar los matices humanos permite que tus principios se conviertan en verdadera sabiduría.',
      soulResonance: 'En sintonía con la puntería precisa del Alma amarilla, tu mayor virtud radica en la claridad para actuar sobre las causas reales y defender lo correcto.',
    },
  },
  green: {
    en: {
      coreArchetype: 'Your core frequency is Kindness—an empathetic orientation that heals environments and fosters deep relational trust. You provide safety and emotional stability to those around you.',
      behavioralParadox: 'Your boundless capacity for generosity can inadvertently deprioritize your own boundaries. Remember that protecting your own reserves is essential to sustaining genuine compassion.',
      soulResonance: 'Embodying the protective shield of the Green Soul, you naturally intercept harm and create safe harbor for others during intense emotional turbulence.',
    },
    es: {
      coreArchetype: 'Tu frecuencia principal es la Amabilidad: una orientación empática que sana entornos y genera confianza mutua. Eres un refugio de estabilidad emocional para quienes te rodean.',
      behavioralParadox: 'Tu generosidad puede hacer que descuides tus propios límites personales. Proteger tus reservas de energía es imprescindible para mantener tu compasión a largo plazo.',
      soulResonance: 'Al igual que el escudo protector del Alma verde en Undertale, tu naturaleza instintiva defiende a los demás y aporta serenidad ante el caos.',
    },
  },
  cyan: {
    en: {
      coreArchetype: 'You manifest Patience—the rare power of deliberate stillness, observant timing, and emotional composure. You excel at reading long-term currents while others rush prematurely.',
      behavioralParadox: 'Patience can occasionally mask hesitation or passive avoidance of friction. Knowing when observation has fulfilled its purpose and transition to action is necessary is your growth edge.',
      soulResonance: 'Aligned with the light-blue attack mechanics that demand standing completely still, you thrive when others panic, mastering the power of non-reactive presence.',
    },
    es: {
      coreArchetype: 'Manifiestas la Paciencia: la valiosa capacidad de mantener la calma reflexiva y el tiempo preciso. Sabes esperar el momento oportuno mientras otros se apresuran.',
      behavioralParadox: 'La paciencia a veces puede encubrir la postergación o el temor a la fricción. Saber cuándo la observación ha cumplido su ciclo y es hora de actuar es tu mayor aprendizaje.',
      soulResonance: 'En sintonía con los ataques celestes de Undertale que exigen permanecer inmóvil, destacas por mantener la serenidad cuando el entorno entra en pánico.',
    },
  },
  blue: {
    en: {
      coreArchetype: 'Your foundation is Integrity—an internal architecture of truth, personal authenticity, and alignment between belief and behavior. You respect elegance, rhythm, and self-honesty.',
      behavioralParadox: 'High internal standards can manifest as exacting self-criticism or disappointment with the compromises of daily life. Allowing room for imperfection strengthens your inner harmony.',
      soulResonance: 'Echoing the jumping physics and gravity rules of the Blue Soul, you navigate complex social and creative fields with grace, balance, and structured discipline.',
    },
    es: {
      coreArchetype: 'Tu base es la Integridad: una arquitectura interior de honestidad y coherencia entre convicciones y conducta. Valoras la autenticidad y el compromiso contigo mismo.',
      behavioralParadox: 'La exigencia interior puede derivar en una autocrítica implacable. Dar espacio a la imperfección humana fortalece tu equilibrio y bienestar emocional.',
      soulResonance: 'Reflejando la gravedad y el salto del Alma azul, te mueves por la vida con disciplina estructurada, buscando la armonía y la verdad.',
    },
  },
  purple: {
    en: {
      coreArchetype: 'You represent Perseverance—an analytical tenacity that systematically breaks down obstacles through study, method, and relentless execution. You do not just endure; you master.',
      behavioralParadox: 'Relying heavily on cognitive problem-solving can distance you from emotional vulnerability. Integrating intuitive and relational insight accelerates your overall progress.',
      soulResonance: 'Like the Purple Soul navigating web lines with calculated discipline, you find order and tactical pathways where others see overwhelming complexity.',
    },
    es: {
      coreArchetype: 'Representas la Perseverancia: una tenacidad analítica que supera barreras mediante el estudio, el método y la dedicación constante. No te limitas a resistir: dominas el reto.',
      behavioralParadox: 'Apoyarse demasiado en el análisis racional puede desconectarte de tu intuición emocional. Integrar la sensibilidad con tu rigor metódico multiplica tu potencial.',
      soulResonance: 'Al igual que el Alma morada moviéndose con orden sobre las líneas de la red, descubres caminos lógicos donde otros solo ven confusión.',
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
      const prompt = `You are an insightful psychological profiler and philosophical analyst of the Undertale 7 Soul Virtues framework (Determination, Bravery, Justice, Kindness, Patience, Integrity, Perseverance).
Analyze this user's specific 66-question test result profile:
- Dominant Virtue: ${TRAIT_NAMES[dominant] || dominant}
- Secondary Virtue: ${secondary ? (TRAIT_NAMES[secondary] || secondary) : 'None'}
- 7-Virtue Scores (0-100%): ${JSON.stringify(scores)}

Write a deep, highly personalized, and empathetic 3-part psychological and character archive report for this user in ${lang === 'es' ? 'Spanish' : 'English'}.
Format strictly as JSON with three keys:
1. 'coreArchetype': A 250-word deep dive into their core behavioral engine, internal motivations, and how their dominant and secondary traits interact.
2. 'behavioralParadox': A 200-word analysis of their hidden psychological paradoxes, blind spots, and stress responses.
3. 'soulResonance': A 200-word creative analysis connecting their soul profile to everyday decision-making, interpersonal resonance, and Undertale battle philosophy.
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
              { role: 'system', content: 'You are an expert psychological profiler. Return clean JSON only.' },
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

    // Guaranteed 100% Delivery: Full 7-Trait Multilingual Synthesis Engine
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

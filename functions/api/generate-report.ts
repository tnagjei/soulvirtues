// input: JSON with soul scores and traits
// output: Highly structured RPG & Psychological dossier with badges, stats, and action plans
// pos: functions/api/generate-report.ts (更新规则：响应协议变化同步报告页面、回归与 functions/api/README.md)

import { isDossierReport, normalizeReportInput } from '../../src/data/reportDelivery';

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

interface DossierReport {
  archetypeTitle: string;
  archetypeSubtitle: string;
  tags: string[];
  percentileRank: string;
  engine: string;
  superpowers: string[];
  blindspots: string[];
  combat: {
    mode: string;
    atk: number;
    def: number;
    sta: number;
    agi: number;
    ability: string;
    synergy: string;
  };
  actionPlan: {
    keep: string;
    stop: string;
    quest: string;
  };
}

const FALLBACK_DOSSIERS: Record<string, { en: DossierReport; es: DossierReport }> = {
  red: {
    en: {
      archetypeTitle: 'THE APEX CATALYST',
      archetypeSubtitle: 'Unstoppable Force of Vision & Independent Resolve',
      tags: ['Absolute Autonomy', 'Crisis Initiator', 'Unrelenting Will'],
      percentileRank: 'Top 5% in Pure Autonomous Determination',
      engine: 'Your core psychological engine is fueled by an absolute refusal to be defined by circumstance. You possess a rare, self-regenerating internal locus of control. Where others wait for consensus or permission, you naturally initiate momentum, converting ambiguity into clear forward direction.',
      superpowers: [
        'Crisis Initiation: You cut through analysis paralysis when high-stakes decisions freeze others.',
        'Psychological Armor: You view setbacks not as personal invalidation, but as tactical calibration.',
        'Magnetic Leadership: Your unapologetic clarity gives peers a compelling center of gravity.'
      ],
      blindspots: [
        'Tunnel Vision: When committed to a path, you may dismiss valid warnings as mere timidity.',
        'Vulnerability Aversion: Subconsciously viewing compromise as a concession of personal autonomy.',
        'Pacing Disconnect: Frustration with collaborators who need time to digest complex transitions.'
      ],
      combat: {
        mode: 'Free Kinetic Vector (Red Heart)',
        atk: 96,
        def: 82,
        sta: 95,
        agi: 90,
        ability: 'Refusal to Yield: Lethal stress triggers an immediate 30% surge in focus and recovery.',
        synergy: 'Patience (Cyan Soul) balances your intense acceleration with strategic timing.'
      },
      actionPlan: {
        keep: 'Trust your decisive gut instinct during initial crisis phases.',
        stop: 'Stop treating tactical retreat as moral surrender.',
        quest: 'In your next team project, deliberately invite one dissenting opinion before executing.'
      }
    },
    es: {
      archetypeTitle: 'EL CATALIZADOR SUPREMO',
      archetypeSubtitle: 'Fuerza Inquebrantable de Visión y Autonomía Absoluta',
      tags: ['Autonomía Total', 'Iniciativa en Crisis', 'Voluntad Férrea'],
      percentileRank: 'Top 5% en Determinación Autónoma Absoluta',
      engine: 'Tu motor psicológico central se nutre de la negativa absoluta a dejarte definir por las circunstancias. Posees un locus de control interno inusualmente fuerte. Donde otros esperan consenso o permiso, tú avanzas de forma natural transformando la incertidumbre en dirección.',
      superpowers: [
        'Iniciativa en Crisis: Rompes la parálisis por análisis cuando las decisiones difíciles congelan a los demás.',
        'Blindaje Psicológico: Consideras los fracasos como meros ajustes tácticos, no como invalidaciones personales.',
        'Liderazgo Magnético: Tu convicción aporta a tu entorno un punto de apoyo firme.'
      ],
      blindspots: [
        'Visión de Túnel: Al comprometerte con un rumbo, tiendes a desestimar advertencias como simple timidez.',
        'Aversión a la Vulnerabilidad: Percibes el compromiso o la duda ajena como debilidad.',
        'Desconexión de Ritmo: Impaciencia con colaboradores que necesitan más tiempo para asimilar transiciones.'
      ],
      combat: {
        mode: 'Vector Cinético Libre (Alma Roja)',
        atk: 96,
        def: 82,
        sta: 95,
        agi: 90,
        ability: 'Negativa a Rendirse: El estrés crítico activa un aumento instantáneo de concentración.',
        synergy: 'Paciencia (Alma Celeste) equilibra tu aceleración con cálculo estratégico.'
      },
      actionPlan: {
        keep: 'Sigue confiando en tu instinto resolutivo en momentos de máxima presión.',
        stop: 'Deja de ver las pausas tácticas como una rendición moral.',
        quest: 'En tu próximo desafío, pide activamente una perspectiva contraria antes de ejecutar.'
      }
    }
  },
  purple: {
    en: {
      archetypeTitle: 'THE ARCHITECT OF ENDURANCE',
      archetypeSubtitle: 'Methodical Sovereign of Long-Horizon Masterwork',
      tags: ['Sunk-Cost Immunity', 'Systemic Focus', 'Deep Resilience'],
      percentileRank: 'Top 7% in Sustained Cognitive Perseverance',
      engine: 'Your psychological architecture is engineered for compounding mastery. You do not chase transient spikes of motivation; you construct systematic habits and outlast friction. While sprinters burn out in complex arenas, your steady cadence guarantees eventual completion.',
      superpowers: [
        'Exhaustion Resistance: You maintain intellectual rigor long after others abandon intricate problems.',
        'Pattern Deconstruction: You break overwhelming chaotic crises into step-by-step solvable units.',
        'Quiet Reliability: Peers trust that if you make a commitment, it will cross the finish line.'
      ],
      blindspots: [
        'Sunk-Cost Fixation: Pouring effort into deteriorating objectives because quitting feels like failure.',
        'Emotional Isolation: Solving interpersonal tensions with clinical logic instead of empathy.',
        'Silent Martyrdom: Carrying excessive burdens without communicating boundary strain.'
      ],
      combat: {
        mode: 'Tethered Matrix Weaver (Purple Heart)',
        atk: 78,
        def: 94,
        sta: 99,
        agi: 72,
        ability: 'Iterative Reinforcement: Each consecutive hit absorbed increases defense efficiency by 15%.',
        synergy: 'Bravery (Orange Soul) supplies the sudden momentum needed to escape stagnant loops.'
      },
      actionPlan: {
        keep: 'Leverage your meticulous structured workflows for complex long-term projects.',
        stop: 'Stop assuming that suffering through a bad process is a virtue in itself.',
        quest: "Execute a 'clean abandon': consciously drop one dead-end commitment this week."
      }
    },
    es: {
      archetypeTitle: 'EL ARQUITECTO DE LA RESISTENCIA',
      archetypeSubtitle: 'Maestro Metódico de Metas de Largo Alcance',
      tags: ['Inmunidad a la Fatiga', 'Enfoque Sistémico', 'Resiliencia Profunda'],
      percentileRank: 'Top 7% en Perseverancia Cognitiva Sostenida',
      engine: 'Tu mente está diseñada para el dominio progresivo y paciente. No dependes de picos volátiles de inspiración; construyes sistemas y desgastas los obstáculos por pura constancia.',
      superpowers: [
        'Resistencia al Desgaste: Mantienes el rigor mucho después de que otros abandonan problemas complejos.',
        'Desglose Estructurado: Conviertes crisis caóticas en pasos lógicos perfectamente abordables.',
        'Fiabilidad Inquebrantable: Tu entorno sabe que cualquier promesa tuya llegará a término.'
      ],
      blindspots: [
        'Apego a Costos Hundidos: Continuar en proyectos inviables solo porque abandonar se siente como fracaso.',
        'Aislamiento Intelectual: Intentar resolver tensiones emocionales con frialdad analítica.',
        'Sacrificio Silencioso: Asumir demasiada carga sin comunicar tus límites.'
      ],
      combat: {
        mode: 'Tejedor de Matriz (Alma Morada)',
        atk: 78,
        def: 94,
        sta: 99,
        agi: 72,
        ability: 'Refuerzo Progresivo: Cada dificultad superada reduce el desgaste posterior un 15%.',
        synergy: 'Valentía (Alma Naranja) aporta el impulso repentino para salir de rutinas agotadoras.'
      },
      actionPlan: {
        keep: 'Sigue apoyándote en tu metódica constancia para proyectos de alta complejidad.',
        stop: 'Deja de creer que aguantar sin sentido es una virtud.',
        quest: 'Abandona deliberadamente una tarea estancada esta semana sin sentir remordimientos.'
      }
    }
  }
};

// Generic fallback generator for other traits
function buildGenericFallback(dominant: string, lang: string): DossierReport {
  const isEs = lang === 'es';
  const name = (TRAIT_NAMES[dominant] || dominant).split(' ')[0];
  if (isEs) {
    return {
      archetypeTitle: `EL DEFENSOR DE ${name.toUpperCase()}`,
      archetypeSubtitle: 'Especialista en Alineación Ética y Claridad Emocional',
      tags: ['Claridad de Valores', 'Firmeza Ética', 'Presencia Serena'],
      percentileRank: `Top 10% en Coherencia de ${name}`,
      engine: `Tu núcleo de personalidad se organiza en torno a ${name}. Destacas por mantener un criterio sereno frente a presiones grupales.`,
      superpowers: ['Coherencia interna intachable', 'Claridad ante dilemas complejos', 'Estabilidad ante el ruido externo'],
      blindspots: ['Riesgo de autoexigencia desmedida', 'Dificultad para delegar tareas clave', 'Tendencia a postergar confrontaciones necesarias'],
      combat: {
        mode: `Modo Guardián de ${name}`,
        atk: 80, def: 88, sta: 85, agi: 80,
        ability: 'Equilibrio de Resonancia: Reduce el daño de estrés en entornos conflictivos un 25%.',
        synergy: 'Determinación (Alma Roja) aporta el empuje ejecutor necesario.'
      },
      actionPlan: {
        keep: 'Conserva tu firmeza moral en situaciones de ambigüedad.',
        stop: 'Evita cargar con responsabilidades que no te corresponden.',
        quest: 'Dedica 20 minutos esta semana a planificar objetivos personales sin interferencias.'
      }
    };
  }
  return {
    archetypeTitle: `THE ${name.toUpperCase()} STRATEGIST`,
    archetypeSubtitle: 'Principled Specialist in Grounded Balance & Clarity',
    tags: ['Core Authenticity', 'Ethical Locus', 'Calm Execution'],
    percentileRank: `Top 10% in ${name} Profile Index`,
    engine: `Your psychological framework is centered on ${name}. You excel at maintaining intentional clarity amidst social static and pressure.`,
    superpowers: ['Unflinching internal consistency', 'Decisive moral calibration', 'Calming presence during chaos'],
    blindspots: ['Over-calibration on perfection', 'Hesitation when immediate messy action is required', 'Suppressing emotional fatigue'],
    combat: {
      mode: `${name} Focus Aegis`,
      atk: 80, def: 88, sta: 85, agi: 80,
      ability: 'Resonant Equilibrium: Reduces ambient friction by 25% during prolonged tension.',
      synergy: 'Determination (Red Soul) provides the decisive momentum required to execute.'
    },
    actionPlan: {
      keep: 'Maintain your grounded ethics during ambiguous group challenges.',
      stop: 'Stop taking full responsibility for unpredictable team outcomes.',
      quest: 'Set aside 30 distraction-free minutes to calibrate your highest personal priorities.'
    }
  };
}

export async function onRequest(context: { request: Request; env: Env }) {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const input = normalizeReportInput(await context.request.json());
    if (!input) return Response.json({ error: 'A complete, valid quiz score profile is required' }, { status: 400 });
    const { scores, dominant, secondary, lang } = input;

    const apiKey = context.env?.DEEPSEEK_API_KEY || context.env?.OPENAI_API_KEY;

    if (apiKey) {
      const prompt = `You are an elite psychological profiler and game lore master of Undertale 7 Soul Virtues.
Given this user's specific test results:
- Dominant Virtue: ${dominant ? TRAIT_NAMES[dominant] : 'No single leading theme. Do not invent one.'}
- Secondary Virtue: ${secondary ? (TRAIT_NAMES[secondary] || secondary) : 'None'}
- 7-Virtue Scores: ${JSON.stringify(scores)}

Generate an RPG-styled fan self-reflection guide in ${lang === 'es' ? 'Spanish' : 'English'}.
These are quiz answer scores, not population percentiles or a validated psychological assessment.
Describe possibilities for reflection, not diagnoses, subconscious facts or claims about how other people see the user.
The combat section is explicitly fictional fan storytelling, not official game mechanics or psychological measurements.
Format strictly as JSON with this schema:
{
  "archetypeTitle": "Uppercase cool archetype name like THE UNYIELDING SENTINEL",
  "archetypeSubtitle": "One poetic line describing their essence",
  "tags": ["3 short hyphen/space tags like High Autonomy, Crisis Anchor, Pattern Hunter"],
  "engine": "150-word deep psychological analysis of their primary decision-making engine",
  "superpowers": ["3 bullet points highlighting their rarest psychological superpowers with brief explanation"],
  "blindspots": ["3 bullet points highlighting their shadow blindspots, stress traps, and subconscious fears"],
  "combat": {
    "mode": "Undertale battle mechanic parallel name like Tethered Matrix Weaver",
    "atk": 85, // integer 60-99
    "def": 92, // integer 60-99
    "sta": 95, // integer 60-99
    "agi": 70, // integer 60-99
    "ability": "Name and mechanic of their unique soul passive ability",
    "synergy": "Which soul trait complements them best and why"
  },
  "actionPlan": {
    "keep": "One concrete superpower habit to double down on",
    "stop": "One self-sabotaging behavior to immediately stop",
    "quest": "One 30-day tangible personal challenge to level up"
  }
}
Return raw JSON only, no markdown.`;

      try {
        const isDeepSeek = Boolean(context.env?.DEEPSEEK_API_KEY);
        const endpoint = isDeepSeek
          ? 'https://api.deepseek.com/chat/completions'
          : 'https://api.openai.com/v1/chat/completions';
        const model = isDeepSeek ? 'deepseek-chat' : 'gpt-4o-mini';

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7500);
        try {

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
                { role: 'system', content: 'Write fan self-reflection guidance grounded in the provided scores. Do not invent percentiles or clinical facts. Return clean JSON only.' },
                { role: 'user', content: prompt },
              ],
              temperature: 0.7,
              response_format: { type: 'json_object' },
            }),
          });

          if (aiRes.ok) {
            const aiData = (await aiRes.json()) as any;
            const contentText = aiData?.choices?.[0]?.message?.content;
            if (contentText) {
              const parsed = JSON.parse(contentText);
              const report = { ...parsed, source: 'ai' };
              if (isDossierReport(report)) return Response.json(report, { headers: { 'Cache-Control': 'no-store' } });
            }
          }
        } finally { clearTimeout(timeoutId); }
      } catch (aiErr) {
        console.error('AI API failed/timeout, smoothly falling back:', aiErr);
      }
    }

    // High quality guaranteed fallback
    const key = dominant ?? 'balanced';
    const langKey = lang === 'es' ? 'es' : 'en';
    const dossier = FALLBACK_DOSSIERS[key] ? FALLBACK_DOSSIERS[key][langKey] : buildGenericFallback(key, lang);

    const { percentileRank: _unused, ...content } = dossier;
    return Response.json({ source: 'synthesis', ...content }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Report generation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

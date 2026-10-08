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

export async function onRequest(context: { request: Request; env: Env }) {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = await context.request.json() as any;
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

        const aiRes = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: 'You are an expert psychological profiler. Return clean JSON only.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            response_format: { type: 'json_object' }
          }),
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json() as any;
          const contentText = aiData?.choices?.[0]?.message?.content;
          if (contentText) {
            const parsed = JSON.parse(contentText);
            return new Response(JSON.stringify({ source: 'ai', ...parsed }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }
      } catch (aiErr) {
        console.error('AI API failed, falling back to dynamic synthesis:', aiErr);
      }
    }

    // Fallback: Dynamic High-Quality Psychological Synthesis Engine
    const domName = (TRAIT_NAMES[dominant] || dominant).split(' ')[0];
    const secName = secondary ? (TRAIT_NAMES[secondary] || secondary).split(' ')[0] : 'Balanced';

    const fallbackReport = {
      source: 'synthesis',
      coreArchetype: `Your psychological matrix reveals a pronounced orientation toward ${domName}. You possess a concentrated internal locus of control that prioritizes purposeful autonomy over passive compliance. When confronted by ambiguity or resistance, your baseline strategy is not to retreat, but to re-anchor in your core values and steadily reshape your immediate environment. With ${secName} serving as your secondary counterbalance, your ambition is tempered by conscious discernment, granting you both initial acceleration and situational resilience.`,
      behavioralParadox: `Your greatest strength contains your most critical friction point: a subtle tension between decisive momentum and relational patience. Because your standards of ${domName} are self-evident to you, you may occasionally experience quiet frustration when peers move at a different cadence or compromise on principles that feel non-negotiable. Under prolonged stress, be vigilant against situational tunnel-vision; remember that thoughtful adaptation is not an abandonment of strength, but its highest expression.`,
      soulResonance: `In the Undertale battle philosophy, your soul energy manifests as high-impact precision paired with adaptive recovery. You excel in scenarios that reward steady rhythm and pattern comprehension over reckless improvisation. In interpersonal spheres, peers instinctively view you as an emotional anchor during crises—someone whose quiet resolve brings clarity when circumstances are volatile.`
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

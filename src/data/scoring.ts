// input: Valid answer indexes and the question weights used by the live quiz
// output: Scores, result certainty, tied leaders, and local answer contributions
// pos: src/data/scoring.ts (更新规则：文件变更需同步本注释与所属目录 README)

import { QUESTIONS, type QuestionItem } from './questions';
import { SOUL_CODES, type SoulCode } from './souls';

const CHOICE_FACTORS = [-1, -0.5, 0, 0.5, 1];
const CURVE = 0.6;
export const MAXP = Object.fromEntries(
  SOUL_CODES.map(code => [code, QUESTIONS.reduce((total, q) => total + Math.abs(q.load[code] || 0), 0)]),
) as Record<SoulCode, number>;

export function normPct(trait: SoulCode, raw: number): number {
  if (!MAXP[trait]) return 50;
  const n = Math.max(-1, Math.min(1, raw / MAXP[trait]));
  return Math.max(0, Math.min(100, 50 + Math.sign(n) * Math.pow(Math.abs(n), CURVE) * 50));
}

export interface ScoreResult {
  raw: Record<SoulCode, number>;
  pct: Record<SoulCode, number>;
  ranked: SoulCode[];
  primarySoul: SoulCode | null;
  secondarySoul: SoulCode | null;
  kind: 'incomplete' | 'balanced' | 'tied' | 'close' | 'dominant';
  leaders: SoulCode[];
  answeredCount: number;
  contributions: { questionIndex: number; answerIndex: number; trait: SoulCode; points: number }[];
}

export function classifyProfile(pct: Record<SoulCode, number>, answeredCount: number, total: number) {
  const ranked = [...SOUL_CODES].sort((a, b) => pct[b] - pct[a]);
  const highest = pct[ranked[0]];
  const leaders = ranked.filter(code => pct[code].toFixed(1) === highest.toFixed(1));
  let kind: ScoreResult['kind'];
  if (answeredCount < total) kind = 'incomplete';
  else if (highest <= 50) kind = 'balanced';
  else if (leaders.length > 1) kind = 'tied';
  // 三个百分点仅是界面并列展示规则，不是统计显著性或心理学阈值。
  else if (highest - pct[ranked[1]] <= 3) kind = 'close';
  else kind = 'dominant';
  return { ranked, leaders: kind === 'close' ? ranked.slice(0, 2) : leaders, kind };
}

export function computeScores(
  answers: (number | null | undefined)[],
  questions: QuestionItem[] = QUESTIONS,
): ScoreResult {
  const raw = Object.fromEntries(SOUL_CODES.map(code => [code, 0])) as Record<SoulCode, number>;
  const contributions: ScoreResult['contributions'] = [];
  let answeredCount = 0;
  questions.forEach((q, questionIndex) => {
    const answer = answers[questionIndex];
    if (!Number.isInteger(answer) || answer === null || answer === undefined || answer < 0 || answer > 4) return;
    answeredCount++;
    SOUL_CODES.forEach(trait => {
      const points = (q.load[trait] || 0) * CHOICE_FACTORS[answer];
      raw[trait] += points;
      if (points) contributions.push({ questionIndex, answerIndex: answer, trait, points });
    });
  });
  const pct = Object.fromEntries(SOUL_CODES.map(code => [code, normPct(code, raw[code])])) as Record<SoulCode, number>;
  const profile = classifyProfile(pct, answeredCount, questions.length);
  const hasPreference = profile.kind !== 'balanced' && profile.kind !== 'incomplete';
  return {
    raw, pct, ...profile, answeredCount, contributions,
    primarySoul: profile.kind === 'dominant' ? profile.ranked[0] : null,
    secondarySoul: hasPreference ? profile.ranked[1] : null,
  };
}

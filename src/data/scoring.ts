// input: Five-choice answers and the versioned one-trait-per-item question bank
// output: Independent mean-based scores, profile reading state, and local answer contributions
// pos: src/data/scoring.ts (更新规则：公式变化需同步方法页、所属目录 README 与评分回归)

import type { QuestionItem } from './questions';
import { isAnswer } from './quizSession';
import { SOUL_CODES, type SoulCode } from './souls';

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
  // 三个百分点仅是显示接近分数的规则，不表示统计或心理学显著性。
  else if (highest - pct[ranked[1]] <= 3) kind = 'close';
  else kind = 'dominant';
  return { ranked, leaders: kind === 'close' ? ranked.slice(0, 2) : leaders, kind };
}

export function computeScores(
  answers: (number | null | undefined)[],
  questions: QuestionItem[],
): ScoreResult {
  const raw = Object.fromEntries(SOUL_CODES.map(code => [code, 0])) as Record<SoulCode, number>;
  const counts = { ...raw };
  const contributions: ScoreResult['contributions'] = [];
  let answeredCount = 0;
  questions.forEach((q, questionIndex) => {
    const answer = answers[questionIndex];
    if (!isAnswer(answer)) return;
    const keyed = q.reverse ? 5 - answer : answer + 1;
    const points = keyed - 3;
    raw[q.trait] += points;
    counts[q.trait]++;
    answeredCount++;
    if (points) contributions.push({ questionIndex, answerIndex: answer, trait: q.trait, points });
  });
  // 与 100*(mean(keyed answers)-1)/4 等价；题数9/10不改变每维的0–100范围。
  const pct = Object.fromEntries(SOUL_CODES.map(code => [
    code, counts[code] ? 50 + 25 * raw[code] / counts[code] : 50,
  ])) as Record<SoulCode, number>;
  const profile = classifyProfile(pct, answeredCount, questions.length);
  const second = profile.ranked[1];
  const hasDistinctSecondary = profile.kind === 'dominant' && pct[second] > 50 &&
    pct[second].toFixed(1) !== pct[profile.ranked[2]].toFixed(1);
  return {
    raw, pct, ...profile, answeredCount, contributions,
    primarySoul: profile.kind === 'dominant' ? profile.ranked[0] : null,
    secondarySoul: hasDistinctSecondary ? second : null,
  };
}

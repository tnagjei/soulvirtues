// input: User answers array (numbers 0-4 or null)
// output: Calculated raw scores, normalized percentages (0-100), and ranked soul traits
// pos: src/data/scoring.ts (更新规则：文件变更需同步本注释与所属目录 README)

import { QUESTIONS } from './questions';
import { SOUL_CODES, type SoulCode } from './souls';

const PAYOUT = [-1.2, -0.72, 0, 0.6, 1];
const CURVE = 0.6;

// Precompute maximum possible raw score for normalization
export const MAXP: Record<SoulCode, number> = (() => {
  const map: Record<SoulCode, number> = {
    DET: 0,
    BRV: 0,
    JUS: 0,
    KND: 0,
    PAT: 0,
    INT: 0,
    PER: 0,
  };
  SOUL_CODES.forEach((trait) => {
    QUESTIONS.forEach((q) => {
      map[trait] += Math.abs(q.load[trait] || 0);
    });
  });
  return map;
})();

export function normPct(trait: SoulCode, raw: number): number {
  if (!MAXP[trait]) return 50;
  let n = Math.max(-1, Math.min(1, raw / MAXP[trait]));
  n = n < 0 ? -Math.pow(-n, CURVE) : Math.pow(n, CURVE);
  return Math.max(0, Math.min(100, ((n + 1) / 2) * 100));
}

export interface ScoreResult {
  raw: Record<SoulCode, number>;
  pct: Record<SoulCode, number>;
  ranked: SoulCode[];
  primarySoul: SoulCode;
  secondarySoul: SoulCode;
}

export function computeScores(answers: (number | null | undefined)[]): ScoreResult {
  const raw: Record<SoulCode, number> = {
    DET: 0,
    BRV: 0,
    JUS: 0,
    KND: 0,
    PAT: 0,
    INT: 0,
    PER: 0,
  };

  answers.forEach((answerIndex, qi) => {
    const q = QUESTIONS[qi];
    if (answerIndex === null || answerIndex === undefined || !q) return;
    const lean = answerIndex - 2; // -2, -1, 0, 1, 2
    SOUL_CODES.forEach((trait) => {
      const weight = q.load[trait] || 0;
      if (weight) {
        raw[trait] += Math.abs(weight) * PAYOUT[lean * (weight < 0 ? -1 : 1) + 2];
      }
    });
  });

  const pct: Record<SoulCode, number> = {
    DET: normPct('DET', raw.DET),
    BRV: normPct('BRV', raw.BRV),
    JUS: normPct('JUS', raw.JUS),
    KND: normPct('KND', raw.KND),
    PAT: normPct('PAT', raw.PAT),
    INT: normPct('INT', raw.INT),
    PER: normPct('PER', raw.PER),
  };

  const ranked = [...SOUL_CODES].sort((a, b) => pct[b] - pct[a]);

  return {
    raw,
    pct,
    ranked,
    primarySoul: ranked[0],
    secondarySoul: ranked[1],
  };
}

// input: Stored quiz answers, legacy score snapshots and report service responses
// output: Validated report inputs for field-guide snapshots
// pos: src/data/reportDelivery.ts (更新规则：协议变化同步 success.astro、报告接口、回归与所属目录 README)

import { QUESTIONS } from './questions';
import { ANSWER_STORAGE_KEY, decodeAnswers } from './quizSession';
import { classifyProfile, computeScores } from './scoring';
import { SOUL_CODES } from './souls';

const colors = { DET: 'red', BRV: 'orange', JUS: 'yellow', KND: 'green', PAT: 'cyan', INT: 'blue', PER: 'purple' } as const;
export type ReportColor = typeof colors[keyof typeof colors];
export interface ReportInput {
  scores: Record<ReportColor, number>;
  dominant: ReportColor | null;
  secondary: ReportColor | null;
  lang: string;
}

export function normalizeReportInput(value: unknown): ReportInput | null {
  if (!value || typeof value !== 'object') return null;
  const input = value as Record<string, unknown>;
  const source = input.scores ?? input.pct;
  if (!source || typeof source !== 'object' || Array.isArray(source)) return null;
  const map = source as Record<string, unknown>;
  const pct = Object.fromEntries(SOUL_CODES.map(code => [code, map[code] ?? map[colors[code]]])) as Record<typeof SOUL_CODES[number], number>;
  if (SOUL_CODES.some(code => typeof pct[code] !== 'number' || !Number.isFinite(pct[code]) || pct[code] < 0 || pct[code] > 100)) return null;
  const profile = classifyProfile(pct, 66, 66);
  const second = profile.ranked[1];
  const secondary = profile.kind === 'dominant' && pct[second] > 50 && pct[second].toFixed(1) !== pct[profile.ranked[2]].toFixed(1) ? colors[second] : null;
  return {
    scores: Object.fromEntries(SOUL_CODES.map(code => [colors[code], pct[code]])) as ReportInput['scores'],
    dominant: profile.kind === 'dominant' ? colors[profile.ranked[0]] : null,
    secondary,
    lang: typeof input.lang === 'string' && ['en', 'es', 'ja', 'pt', 'ru'].includes(input.lang) ? input.lang : 'en',
  };
}

export function readReportInput(storage: Pick<Storage, 'getItem'>): ReportInput | null {
  let snapshot: Record<string, unknown> = {};
  try { snapshot = JSON.parse(storage.getItem('soul_virtues_last_result') || '{}'); } catch { /* Use valid answers if the old summary is damaged. */ }
  const saved = storage.getItem(ANSWER_STORAGE_KEY);
  if (saved) {
    const answers = decodeAnswers(saved, QUESTIONS);
    if (!answers || answers.some(answer => answer === null)) return null;
    return normalizeReportInput({ pct: computeScores(answers, QUESTIONS).pct, lang: snapshot?.lang });
  }
  return normalizeReportInput(snapshot);
}

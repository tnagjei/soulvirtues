// input: Stored quiz answers, legacy score snapshots and report service responses
// output: Validated report inputs, bounded requests and complete report schema checks
// pos: src/data/reportDelivery.ts (更新规则：协议变化同步 success.astro、报告接口、回归与所属目录 README)

import { QUESTIONS } from './questions';
import { ANSWER_STORAGE_KEY, decodeAnswers } from './quizSession';
import { classifyProfile, computeScores } from './scoring';
import { SOUL_CODES } from './souls';

export const REPORT_CACHE_KEY = 'soul_virtues_dossier_v3';
const colors = { DET: 'red', BRV: 'orange', JUS: 'yellow', KND: 'green', PAT: 'cyan', INT: 'blue', PER: 'purple' } as const;
export type ReportColor = typeof colors[keyof typeof colors];
export interface ReportInput {
  scores: Record<ReportColor, number>;
  dominant: ReportColor | null;
  secondary: ReportColor | null;
  lang: string;
}

export interface DossierReport {
  source: 'ai' | 'synthesis';
  archetypeTitle: string;
  archetypeSubtitle: string;
  tags: string[];
  engine: string;
  superpowers: string[];
  blindspots: string[];
  combat: { mode: string; atk: number; def: number; sta: number; agi: number; ability: string; synergy: string };
  actionPlan: { keep: string; stop: string; quest: string };
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

const hasText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
export function isDossierReport(value: unknown): value is DossierReport {
  if (!value || typeof value !== 'object') return false;
  const report = value as Record<string, unknown>;
  if (!['archetypeTitle', 'archetypeSubtitle', 'engine'].every(key => hasText(report[key]))) return false;
  if (!['tags', 'superpowers', 'blindspots'].every(key => Array.isArray(report[key]) && report[key].length >= 3 && report[key].every(hasText))) return false;
  const combat = report.combat as DossierReport['combat'] | undefined;
  const plan = report.actionPlan as DossierReport['actionPlan'] | undefined;
  return !!combat && ['mode', 'ability', 'synergy'].every(key => hasText(combat[key as keyof typeof combat])) &&
    ['atk', 'def', 'sta', 'agi'].every(key => typeof combat[key as keyof typeof combat] === 'number' && Number.isFinite(combat[key as keyof typeof combat]) && Number(combat[key as keyof typeof combat]) >= 0 && Number(combat[key as keyof typeof combat]) <= 100) &&
    !!plan && [plan.keep, plan.stop, plan.quest].every(hasText) && ['ai', 'synthesis'].includes(String(report.source));
}

export async function fetchDossier(url: string, input: ReportInput, timeoutMs = 15000): Promise<DossierReport> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
    if (!response.ok) throw new Error('Report service unavailable');
    const report: unknown = await response.json();
    if (!isDossierReport(report)) throw new Error('Incomplete report response');
    return report;
  } finally { clearTimeout(timer); }
}

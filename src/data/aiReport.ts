// input: Structured AI self-reflection text and trusted saved quiz facts
// output: A bounded, evidence-linked personal interpretation and public job state
// pos: src/data/aiReport.ts (更新规则：结构变化同步生成接口、阅读页与支付回归)
import { SOUL_CODES, type SoulCode } from './souls';
import type { buildFieldGuide } from './fieldGuide';

export const AI_SCHEMA_VERSION = 1;
export interface PersonalAIReport {
  schemaVersion: 1;
  source: 'ai';
  language: 'en' | 'es';
  model: string;
  generatedAt: string;
  summary: { title: string; interpretation: string; tension: string; nextStep: string };
  traits: Array<{ code: SoulCode; evidenceIds: string[]; interpretation: string; reflection: string; experiment: string }>;
  scenarios: Array<{ title: string; context: string; action: string; observe: string }>;
  plan: Array<{ title: string; task: string; observe: string }>;
}
export interface AIJobState {
  status: 'awaiting-consent' | 'queued' | 'generating' | 'retrying' | 'ready' | 'failed';
  attempts: number;
  nextAttemptAt: string | null;
  error: string | null;
}
const object = (value: unknown): Record<string, unknown> => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
const text = (value: unknown, max = 2500): value is string => typeof value === 'string' && value.trim().length >= 3 && value.length <= max;
export function isPersonalAIReport(value: unknown, guide?: ReturnType<typeof buildFieldGuide>): value is PersonalAIReport {
  const report = object(value);
  const summary = object(report.summary);
  if (report.schemaVersion !== AI_SCHEMA_VERSION || report.source !== 'ai' || !['en','es'].includes(String(report.language)) || !text(report.model,100) || typeof report.generatedAt !== 'string' || !Number.isFinite(Date.parse(report.generatedAt))) return false;
  if (!text(summary.title,150) || !text(summary.interpretation) || !text(summary.tension,1200) || !text(summary.nextStep,1000)) return false;
  if (!Array.isArray(report.traits) || report.traits.length !== 7) return false;
  const seen = new Set();
  for (const value of report.traits) {
    const t = object(value);
    if (!SOUL_CODES.includes(t.code as SoulCode) || seen.has(t.code) || !text(t.interpretation) || !text(t.reflection,1000) || !text(t.experiment,1200)) return false;
    seen.add(t.code);
    if (!Array.isArray(t.evidenceIds) || t.evidenceIds.length !== 2 || new Set(t.evidenceIds).size !== 2 || t.evidenceIds.some(id => typeof id !== 'string' || !/^V2-[A-Z]{3}-\d{2}$/.test(id))) return false;
    if (guide && t.evidenceIds.some(id => !guide.traits.find(item => item.code === t.code)?.evidence.some(item => item.id === id))) return false;
  }
  if (!Array.isArray(report.scenarios) || report.scenarios.length !== 3 || report.scenarios.some(value => { const s=object(value); return !text(s.title,150) || !text(s.context,1400) || !text(s.action,1400) || !text(s.observe,1000); })) return false;
  return Array.isArray(report.plan) && report.plan.length === 7 && report.plan.every(value => { const p=object(value); return text(p.title,150) && text(p.task,1400) && text(p.observe,1000); });
}
export function readPersonalAIReport(value: string | null, guide?: ReturnType<typeof buildFieldGuide>): PersonalAIReport | null {
  try { const report = JSON.parse(value || 'null'); return isPersonalAIReport(report,guide) ? report : null; } catch { return null; }
}

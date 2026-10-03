// input: Stored browser text and stable question identities for the current bank
// output: Strict V2 answer serialization shared across all five locales
// pos: src/data/quizSession.ts (更新规则：版本或格式变更需同步题库、方法页与所属目录 README)

import type { QuestionItem } from './questions';

export const BANK_VERSION = '2.0-2026-10-02';
export const ANSWER_STORAGE_KEY = 'soulvirtues_answers_' + BANK_VERSION;

export function isAnswer(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 4;
}

export function encodeAnswers(answers: (number | null)[], questions: QuestionItem[]): string {
  if (answers.length !== questions.length || answers.some(value => value !== null && !isAnswer(value))) {
    throw new Error('Invalid quiz answers');
  }
  return JSON.stringify({
    version: BANK_VERSION,
    answers: Object.fromEntries(questions.map((q, index) => [q.id, answers[index]])),
  });
}

export function decodeAnswers(serialized: string, questions: QuestionItem[]): (number | null)[] | null {
  let saved;
  try { saved = JSON.parse(serialized); } catch { return null; }
  if (!saved || saved.version !== BANK_VERSION || !saved.answers ||
      typeof saved.answers !== 'object' || Array.isArray(saved.answers)) return null;
  if (Object.keys(saved.answers).length !== questions.length) return null;
  const answers = questions.map(q => Object.prototype.hasOwnProperty.call(saved.answers, q.id) ? saved.answers[q.id] : undefined);
  if (answers.some(value => value !== null && !isAnswer(value))) return null;
  return answers;
}

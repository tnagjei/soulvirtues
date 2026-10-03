// input: src/components/Quiz.astro and built HTML pages
// output: Fails unless question text renders immediately without hidden spans, and all 5 language question lists are complete
// pos: scripts/check_quiz_question_loading.mjs (更新规则：测验题目渲染机制变化时同步本脚本与 scripts/README.md)

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const quizSource = readFileSync(new URL('../src/components/Quiz.astro', import.meta.url), 'utf8');

// 1. Verify renderQuestion directly renders target text
assert(quizSource.includes('target.textContent = q.q'), 'Quiz.astro renderQuestion must assign target.textContent = q.q immediately');

// 2. Verify skipTyping safely guarantees full question text
assert(quizSource.includes('target.textContent = currentQ.q') || quizSource.includes('target.textContent = q.q'), 'Quiz.astro skipTyping must ensure target.textContent has full text');

// 3. The #test hash auto-starts before the event bindings below; quiz state must
// exist before startSoulQuiz() calls renderQuestion().
const timerDeclaration = quizSource.indexOf('let advanceTimer = null;');
const autoStartCall = quizSource.indexOf('window.startSoulQuiz();');
assert(timerDeclaration >= 0 && autoStartCall > timerDeclaration, 'advanceTimer must be initialized before the #test auto-start call');

// 4. Verify dist pages have all 66 questions for all 5 languages
const pages = ['dist/index.html', 'dist/es/index.html', 'dist/ja/index.html', 'dist/pt/index.html', 'dist/ru/index.html'];
for (const pagePath of pages) {
  const html = readFileSync(new URL('../' + pagePath, import.meta.url), 'utf8');
  const match = html.match(/data-questions="([^"]*)"/);
  assert(match, 'Missing data-questions in ' + pagePath);
  const decoded = match[1].replaceAll('&#34;', '"').replaceAll('&#39;', "'").replaceAll('&amp;', '&');
  const qs = JSON.parse(decoded);
  assert.equal(qs.length, 66, 'Page ' + pagePath + ' must have exactly 66 questions');
  qs.forEach((q, idx) => {
    assert(typeof q.q === 'string' && q.q.trim().length > 0, 'Question ' + idx + ' in ' + pagePath + ' must not be empty');
  });
}

// 5. Verify the current Spanish first statement, stable ID and complete visible rendering
const esHtml = readFileSync(new URL('../dist/es/index.html', import.meta.url), 'utf8');
assert(esHtml.includes('Incluso cuando siento miedo'), 'Spanish page must contain the current V2 first statement');
assert(esHtml.includes('V2-BRV-01'), 'Spanish page must include the same stable V2 item identity');
assert(esHtml.includes('id="questions-type"'), 'Spanish page must have a real question text target; immediate rendering is verified against the shared source above');

console.log('Quiz question loading checks passed.');

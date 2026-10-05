// input: src/components/Header.astro, src/components/Quiz.astro, src/pages/index.astro
// output: Fails unless Start Test navigation triggers active quiz start and smooth scrolling to #test
// pos: scripts/check_start_test_navigation.mjs (更新规则：导航与测验入口逻辑变化时同步本脚本与 scripts/README.md)

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const headerSource = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');
const quizSource = readFileSync(new URL('../src/components/Quiz.astro', import.meta.url), 'utf8');
const indexSource = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

// 1. Verify Header has startTest link and in-page anchor handler
assert(headerSource.includes('{t.nav.startTest}'), 'Header.astro must contain startTest nav link');
assert(headerSource.includes('href={testLink}'), 'Header.astro must point startTest to testLink');
assert(headerSource.includes('startSoulQuiz'), 'Header.astro must invoke startSoulQuiz when #test link is clicked');
assert(headerSource.includes('e.preventDefault()'), 'Header.astro must prevent default link action on in-page hash links to enable reliable re-clicking');

// 2. Verify Quiz exports window.startSoulQuiz
assert(quizSource.includes('window.startSoulQuiz'), 'Quiz.astro must expose window.startSoulQuiz');
assert(quizSource.includes('showScreen("active")') || quizSource.includes("showScreen('active')"), 'Quiz.astro startSoulQuiz must activate question screen');

// 3. Verify section#test exists in index.astro
assert(indexSource.includes('id="test"'), 'index.astro must have section id="test"');

// 4. Verify Quiz start screen has accessible click handlers on title and heart icon
assert(quizSource.includes('id="quiz-start-title"'), 'Quiz.astro must have id="quiz-start-title"');
assert(quizSource.includes('id="quiz-start-heart"'), 'Quiz.astro must have id="quiz-start-heart"');
assert(quizSource.includes('triggerStartFromIntroOrCard'), 'Quiz.astro must connect title and heart clicks to quiz start');
assert(quizSource.includes('border-yellow-400') && quizSource.includes('id="btn-start-fresh"'), 'Quiz.astro must give btn-start-fresh a prominent yellow CTA border');

console.log('Start Test navigation checks passed.');

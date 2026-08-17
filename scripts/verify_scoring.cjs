
const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('parsed_questions.json', 'utf8')).slice(0, 66);

const CODES = ["DET","BRV","JUS","KND","PAT","INT","PER"];
const PAYOUT = [-1.2, -0.72, 0, 0.6, 1];
const CURVE = 0.6;

let MAXP = {};
CODES.forEach(trait => {
  MAXP[trait] = 0;
  questions.forEach(q => {
    MAXP[trait] += Math.abs(q.load[trait] || 0);
  });
});

function normPct(trait, raw) {
  if (!MAXP[trait]) return 50;
  let n = Math.max(-1, Math.min(1, raw / MAXP[trait]));
  n = n < 0 ? -Math.pow(-n, CURVE) : Math.pow(n, CURVE);
  return Math.max(0, Math.min(100, (n + 1) / 2 * 100));
}

function computeScores(answers) {
  const raw = {};
  CODES.forEach(trait => raw[trait] = 0);
  answers.forEach((answerIndex, qi) => {
    const q = questions[qi];
    if (answerIndex === null || answerIndex === undefined || !q) return;
    const lean = answerIndex - 2;
    CODES.forEach(trait => {
      const weight = q.load[trait] || 0;
      if (weight) {
        raw[trait] += Math.abs(weight) * PAYOUT[lean * (weight < 0 ? -1 : 1) + 2];
      }
    });
  });
  const pct = {};
  CODES.forEach(trait => pct[trait] = normPct(trait, raw[trait]));
  const ranked = CODES.slice().sort((a, b) => pct[b] - pct[a]);
  return { raw, pct, ranked };
}

// Test with all neutral
const neutral = computeScores(new Array(66).fill(2));
console.log("All neutral results:", JSON.stringify(neutral.pct));

// Test with all agree
const allAgree = computeScores(new Array(66).fill(4));
console.log("All agree ranked:", JSON.stringify(allAgree.ranked));
console.log("All agree results:", JSON.stringify(allAgree.pct));

console.log("MAXP values:", JSON.stringify(MAXP));


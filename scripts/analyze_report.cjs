
const fs = require('fs');

const report = fs.readFileSync('deep-research-report (1).md', 'utf8');
const lines = report.split('\n');

console.log("Total lines in report:", lines.length);

// Extract all headers
lines.forEach((l, idx) => {
  if (l.startsWith('#')) {
    console.log((idx + 1) + ': ' + l);
  }
});


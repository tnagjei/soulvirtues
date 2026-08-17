
const fs = require('fs');

const agentsContent = fs.readFileSync('AGENTS.md', 'utf8');
const lines = agentsContent.split('\n');

let capturing = false;
let captured = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('## 11. 网站文案与 SEO 规范')) {
    capturing = true;
  }
  if (capturing) {
    captured.push(lines[i]);
    if (lines[i].includes('## 12. 提交前自检清单')) {
      break;
    }
  }
}

console.log(captured.join('\n'));


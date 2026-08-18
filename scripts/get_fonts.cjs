
const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const data = await fetch('https://undertale.jadenthejaded.uk/style.css');
  const matches = data.match(/@font-face\s*\{[\s\S]*?\}/g);
  if (matches) {
    console.log('Found font-face blocks:', matches.length);
    fs.writeFileSync('src/styles/fonts.css', matches.join('\n\n') + '\n');
    console.log('Saved src/styles/fonts.css');
  } else {
    console.log('No matches');
  }
}

run();


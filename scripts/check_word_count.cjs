
const fs = require('fs');

const html = fs.readFileSync('dist/index.html', 'utf8');
// strip tags and count words
const textOnly = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const words = textOnly.split(' ').filter(w => w.length > 0);
console.log('Total text word count on homepage:', words.length);


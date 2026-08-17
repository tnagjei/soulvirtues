
const fs = require('fs');

const pages = [
  { name: 'Home (index.astro)', file: 'src/pages/index.astro' },
  { name: 'About (about.astro)', file: 'src/pages/about.astro' },
  { name: 'Privacy (privacy.astro)', file: 'src/pages/privacy.astro' },
  { name: 'Terms (terms.astro)', file: 'src/pages/terms.astro' },
  { name: 'Contact (contact.astro)', file: 'src/pages/contact.astro' }
];

let out = [];

pages.forEach(p => {
  const content = fs.readFileSync(p.file, 'utf8');
  out.push('=== ' + p.name + ' ===');
  
  // Title
  const titleMatch = content.match(/title="([^"]+)"/) || content.match(/const pageTitle = "([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : 'N/A';
  out.push('Title (' + title.length + ' chars): ' + title);
  
  // Description
  const descMatch = content.match(/description="([^"]+)"/) || content.match(/const pageDescription = "([^"]+)"/);
  const desc = descMatch ? descMatch[1] : 'N/A';
  out.push('Description (' + desc.length + ' chars): ' + desc);
  
  // H1
  const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  out.push('H1 count: ' + h1Matches.length);
  h1Matches.forEach(m => out.push('  H1: ' + m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')));
  
  // H2
  const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
  out.push('H2 count: ' + h2Matches.length);
  h2Matches.forEach(m => out.push('  H2: ' + m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')));

  // H3
  const h3Matches = [...content.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)];
  out.push('H3 count: ' + h3Matches.length);
  h3Matches.forEach(m => out.push('  H3: ' + m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')));
  
  out.push('');
});

console.log(out.join('\n'));


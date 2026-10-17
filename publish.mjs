// Copies only the public files into dist/, which is the folder a static host publishes. Run: npm run dist
// (BRIEF.md, qa.mjs, check.mjs, the build scripts and the original screenshots are not for visitors, so they never reach the live site.)
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { dirname } from 'node:path';

const FILES = [
  'index.html', 'styles.css', 'app.js', 'copy.js', 'render.js', 'favicon.svg', 'JonaRu-Reimagined.jpeg',
  'locales/en.js', 'locales/hi.js', 'locales/gu.js', 'locales/mr.js',
  'assets/receipt-enhanced.png', 'assets/udhaar.png', 'assets/invoice-short.png', 'assets/reports.png', 'assets/social-preview.png', 'assets/demo-qr.svg', 'assets/products/chataka-pataka.jpg', 'assets/products/poprings.jpg', 'assets/products/dairy-milk.jpg', 'assets/products/center-fruit.jpg', 'assets/products/kitkat.jpg', 'assets/products/oreo.jpg',
];

await rm('dist', { recursive: true, force: true });
for (const f of FILES) {
  await mkdir(dirname(`dist/${f}`), { recursive: true });
  await cp(f, `dist/${f}`);
}

// Every local file the page links to must be in the list above, or the live site would have a broken image or script.
const html = await readFile('dist/index.html', 'utf8');
const linked = [...html.matchAll(/(?:src|href|content)="\.\/([^"#?]+)"/g)].map((m) => m[1]);
const missing = linked.filter((f) => !FILES.includes(f));
if (missing.length) throw new Error(`index.html links to files that are not published: ${missing.join(', ')}. Add them to FILES in publish.mjs.`);
console.log(`dist/ ready: ${FILES.length} files. Publish this folder.`);

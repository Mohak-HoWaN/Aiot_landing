import { readFile, writeFile } from 'node:fs/promises';
import { en, products, validateCopy } from './copy.js';
import { sections, escape } from './render.js';
validateCopy();
let html = await readFile(new URL('./index.template.html', import.meta.url), 'utf8');
html = html.replace(/\{\{(\w+)\}\}/g, (_, key) => {
  if (typeof en[key] !== 'string') throw new Error(`Unknown template key: ${key}`);
  return escape(en[key]);
});
for (const [key, value] of Object.entries(sections(en))) html = html.replace(`<!-- section:${key} -->`, value);
html = html.replace('<!-- product-options -->', products.map((p,i)=>`<option value="${i}"${i===5?' selected':''}>${escape(p)}</option>`).join(''));
// Add absolute social/canonical URLs only after the owner supplies a real public URL.
const siteUrl = process.env.SITE_URL || 'https://aiot.shahonthefloor.workers.dev/';
if (siteUrl) {
  const base = new URL(siteUrl.endsWith('/') ? siteUrl : siteUrl + '/');
  if (base.protocol !== 'https:') throw new Error('SITE_URL must use HTTPS');
  html = html.replace('<!-- hosting-meta -->', `<link rel="canonical" href="${escape(base.href)}"><meta property="og:url" content="${escape(base.href)}">`)
    .replace('content="./assets/social-preview.png"', `content="${escape(new URL('assets/social-preview.png', base).href)}"`);
}
await writeFile(new URL('./index.html', import.meta.url), html);
console.log('Built static English page. All four translation dictionaries have matching keys and structure.');

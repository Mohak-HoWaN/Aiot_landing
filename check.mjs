import './build.mjs';
import { readFile, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { translations, validateCopy } from './copy.js';
validateCopy();
const html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate HTML IDs');
for(const [,id] of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),`Missing anchor: ${id}`);
assert.ok(!/\{\{|<!-- section:|product-options/.test(html),'Unrendered template marker');
assert.ok(!/\b(?:JONARU|Jonaru)\b/.test(html),'Incorrect brand casing');
assert.ok(!/(?:localStorage|sessionStorage)\s*(?:\.|\[)|navigator\.language/.test(await readFile(new URL('./app.js',import.meta.url),'utf8')),'Language must reset on a fresh load');
assert.ok(html.includes('method="POST"') && html.includes('name="Preferred language"'),'Native form and contact language missing');
for(const section of ['problems','steps','bands','faqs','statuses'])assert.ok(new RegExp(`data-section="${section}">\\s*<(article|details)`).test(html),`Empty static section ${section}`);
const keys=new Set(Object.keys(translations.en));
for(const [,key] of html.matchAll(/data-i18n(?:-alt|-aria)?="([^"]+)"/g))assert.ok(keys.has(key),`Unknown copy key: ${key}`);
const js=['app.js','copy.js','render.js','build.mjs','server.mjs','check.mjs','qa.mjs',...Object.keys(translations).map(l=>`locales/${l}.js`)];
for(const file of js){const r=spawnSync(process.execPath,['--check',file],{cwd:new URL('.',import.meta.url),encoding:'utf8',windowsHide:true});assert.equal(r.status,0,`${file}: ${r.stderr}`);}
const files=['index.html','styles.css','app.js','copy.js','render.js','favicon.svg','JonaRu-Reimagined.jpeg',...Object.keys(translations).map(l=>`locales/${l}.js`),'assets/receipt-enhanced.png','assets/udhaar.png','assets/invoice-short.png','assets/reports.png','assets/social-preview.png'];
let bytes=0;
for(const file of files){bytes+=(await stat(new URL(file,import.meta.url))).size;if(process.env.CHECK_HTTP){const r=await fetch(new URL(file,'http://127.0.0.1:4173/'));assert.equal(r.status,200,`Asset HTTP failure: ${file}`);}}
if(process.env.CHECK_HTTP){for(const file of ['README.md','qa.mjs','../project/.env','.qa/results.json']){const r=await fetch(new URL(file,'http://127.0.0.1:4173/'));assert.equal(r.status,404,`Preview must not expose ${file}`);}}
console.log(`Static checks passed: ${Object.keys(translations).length} complete locales, ${ids.length} unique IDs, ${files.length} publishable files, ${Math.round(bytes/1024)} KiB including social preview.`);

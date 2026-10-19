import { products } from './copy.js';
export const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const e = escape;
export const list = items => `<ul>${items.map(item=>`<li>${e(item)}</li>`).join('')}</ul>`;
export function sections(t) {
  return {
    strengths: t.strengths.map((s,i)=>`<span><span class="strength-mark" aria-hidden="true">${['↗','✓','↳'][i]}</span>${e(s)}</span>`).join(''),
    problems: t.problems.map(([title,body],i)=>`<article><span class="card-number" aria-hidden="true">0${i+1}</span><h3>${e(title)}</h3><p>${e(body)}</p></article>`).join(''),
    steps: t.steps.map(([title,body],i)=>`<article><span class="step-number" aria-hidden="true">0${i+1}</span><h3>${e(title)}</h3><p>${e(body)}</p></article>`).join(''),
    bands: t.bands.map((band,i)=>`<article class="feature-band"><div class="band-heading"><span class="eyebrow"><span class="band-number" aria-hidden="true">0${i+1}</span> ${e(band.title)}</span><h3>${e(band.lead)}</h3></div><div class="band-grid"><div class="feature-list">${band.items.map(([title,body])=>`<div><h4>${e(title)}</h4><p>${e(body)}</p></div>`).join('')}</div><figure class="app-capture"><a href="./assets/${['receipt','invoice','reports'][i]}.png" target="_blank" rel="noopener" aria-label="${e(t.imageOpen)}: ${e(band.title)}"><div class="capture-viewport capture-${i}"><img src="./assets/${['receipt','invoice','reports'][i]}.png" loading="lazy" decoding="async" alt="${e(band.alt)}" width="1262" height="${i===1?2304:1704}"></div><span class="capture-open">${e(t.imageOpen)} ↗</span></a><figcaption>${e(band.caption)}</figcaption></figure></div></article>`).join(''),
    privacyRows: t.privacyRows.map(([title,body])=>`<div><dt>${e(title)}</dt><dd>${e(body)}</dd></div>`).join(''),
    needs: list(t.needs),
    data: t.dataRows.map(([title,body])=>`<div><dt>${e(title)}</dt><dd>${e(body)}</dd></div>`).join(''),
    statuses: t.statuses.map((status,i)=>`<article class="status-card status-${i}"><span class="status-symbol" aria-hidden="true">${['✓','◌','↗'][i]}</span><h3>${e(status.title)}</h3>${list(status.items)}</article>`).join(''),
    products: products.map(p=>`<li>${e(p)}</li>`).join(''),
    faqs: t.faqs.map(([q,a],i)=>`<details data-faq="${i}"><summary>${e(q)}<span aria-hidden="true">+</span></summary><p>${e(a)}</p></details>`).join(''),
    next: t.nextSteps.map((s,i)=>`<li><span aria-hidden="true">0${i+1}</span>${e(s)}</li>`).join('')
  };
}

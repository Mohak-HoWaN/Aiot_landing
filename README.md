# JonaRu Model-1 landing page

Updated 2026-10-31. A standalone HTML/CSS/JavaScript site in `landing/`, aligned to the rectangular scan-zone checkout introduced in the product on October 29.

## Preview

```powershell
cd landing
npm start
```

Open http://127.0.0.1:4173. Node 18+; no runtime packages or remote fonts required.

## Current experience

- Product-led hero with real packet photos, a dimensional CSS counter illustration and visitor-controlled Place / Review / Clear stages. The illustration is explicitly distinguished from a live camera and physical hardware.
- Interactive rectangular scan zone: place a supported packet, remove it, correct the ticket, or add a manual item. Pointer, touch, buttons and arrow keys work.
- Explicit sample Cash received, UPI received and Put on udhaar actions. No payment QR, automatic payment verification or payment collection. Udhaar is illustrative; no customer record is created.
- After recording a sample sale, paid packets remain excluded from the next bill until removed. New bill clears the ticket while preserving occupied paid items. Replay resets the illustration.
- Original app captures for billing, vendor invoice drafts and reporting. Sample data remains labelled.
- English, Gujarati, Hindi and Marathi, with identical dictionary structure. Fresh loads start in English; changing language preserves form inputs and independently selected contact language.
- Keyboard focus, reduced motion, static English content and a native form fallback. No looping decorative animations or scroll hijacking.
- Existing FormSubmit request flow retained, with confirmed service-acceptance handling and recoverable errors.

Research and design rationale: `DESIGN.md`. Product claims and constraints: `BRIEF.md`. Verification history: `AUDIT.md`.

## Editing

| File | Purpose |
| --- | --- |
| `index.template.html` | Source structure and translation placeholders |
| `index.html` | Generated English page |
| `locales/*.js`, `copy.js` | Four dictionaries and strict structure validation |
| `render.js` | Shared translated section markup |
| `app.js` | Hero stages, zone demo, payment records, forms and navigation |
| `styles.css` | Layout, responsive styling and CSS perspective |
| `build.mjs` | Static HTML and canonical/social metadata |
| `server.mjs` | Local preview with an explicit public-file allowlist |
| `publish.mjs` | Generates the public `dist/` directory |
| `check.mjs`, `qa.mjs` | Static and isolated browser checks |

Run `npm run build` after editing markup or copy. New public files must be listed in both `server.mjs` and `publish.mjs`.

## Verification

```powershell
npm run check
npm run check:browser
npm run dist
```

Browser checks need Node 22+ and installed Chrome; set `CHROME_PATH` if needed. The suite starts an isolated headless browser and intercepts external requests, including all form submissions. Screenshots and results are written into ignored `.qa/`. It checks 16 viewport/language combinations, keyboard and touch interactions, zone boundaries, paid-item carryover, hero controls, form responses, reduced motion and no-JavaScript fallback.

These checks do not validate camera accuracy, physical hardware, real shop performance, translations with native speakers, or email delivery.

## Assets and truth

Packet photos in `assets/products/` are existing local source images, framed/cropped with CSS. The hero adds no invented device or generated product model. The sample ticket in that illustration uses example prices, not retail or pilot prices.

Original captures remain unchanged: `receipt.png` (sample customer-credit receipt), `invoice.png` (synthetic English invoice draft), `reports.png` (sample sales/profit), and `udhaar.png` (sample credit ledger). Full captures open separately. They are evidence of the shown prototype UI, not proof of camera performance. Social preview uses an original sample receipt.

The older AI enclosure concept and illustrative QR remain source files for history but are excluded from the page and publication allowlist. No competitor assets are copied.

The most useful future asset is a current real checkout recording: place supported products in one layer, let the count settle, remove an item, review, record payment, and clear the counter. Do not show private customer details.

## Request form

Recipient: howan.ms.tc@gmail.com. The owner still needs to activate FormSubmit and verify actual inbox delivery. No activation email or test message was sent by this redesign.

The form requires name, shop, phone, city and contact consent. Other details are optional. Success means FormSubmit accepted the request, not confirmed inbox delivery. Failed or unconfirmed requests preserve inputs and offer email/native POST alternatives. No analytics, payment collection or local submission storage is added.

## Hosting

Static build command: `npm run dist`; output directory: `dist`. Cloudflare Workers configuration is retained. Canonical/social URLs default to the supplied https://aiot.shahonthefloor.workers.dev/; set `SITE_URL` to change them. Publish only `dist/`, never the development repository.

The redesign has been prepared locally; deployment is separate.

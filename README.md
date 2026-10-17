# JonaRu Model-1 landing page

Updated 2026-10-17 from the owner's factual handoff. A standalone website; implementation, assets and checks stay in `landing/`. The product app and database were not changed or used to generate new data.

## Preview

Node.js 18+; no dependencies to install.

```powershell
cd landing
npm start
```

Open **http://127.0.0.1:4173**. `npm start` validates all four dictionaries, generates static English HTML and starts the local server. The explicit public-file allowlist does not expose docs, tests, browser profiles, product code or environment files.

## Included

- Shop-owner positioning: billing, stock and udhaar together; camera assistance for six snacks. Primary action: **Request a demo**.
- Real-app receipt detail in the hero, with demo-data disclosure. The unbuilt hardware concept is smaller, below the fold, behind an explicit disclosure.
- Four kirana situations, three workflow steps and counter / stock / sales feature bands. Udhaar, returns, loose items, write-offs, profit and reorders are included.
- Real udhaar, invoice and report captures replace invented mini interfaces. Full captures open separately. Screens stay in English and are labelled as samples.
- Separate camera-to-bill hero motif, played once with replay. Simulated checkout supports six products, dragging, keyboard/button movement, correction, manual entry and sample udhaar.
- Working / sample-tested / next status board. Internet, hardware, payments, training, data handling, pricing and GST limits are explicit.
- 16 px body, 14 px secondary, minimum 12 px labels. System fonts, native scrolling, no animation loops. Reduced motion shows final static scenes.
- English on every fresh load; Gujarati, Hindi and Marathi translations. Language changes preserve form values and independently selected contact language.
- Static English content and form work without JavaScript. Mobile request bar hides at the form or while editing.
- FormSubmit AJAX responses with confirmed service acceptance, errors and verification states; native POST fallback.

## Editing and files

| File | Purpose |
| --- | --- |
| `index.template.html` | Source structure, form, metadata and translation placeholders |
| `index.html` | Generated English HTML; publish this, not the template |
| `locales/en.js`, `hi.js`, `gu.js`, `mr.js` | Complete dictionaries; retain identical structure |
| `copy.js` | Dictionary exports, six product names and strict parity validation |
| `render.js` | Shared static-build/language-switch section markup |
| `build.mjs` | Builds English HTML and optional public-domain metadata |
| `app.js`, `styles.css` | Interactions, forms, responsive design and motion |
| `assets/` | Real sample captures and social preview |
| `server.mjs` | Local preview with explicit public-file allowlist |
| `check.mjs`, `qa.mjs` | Static and isolated browser checks |
| `BRIEF.md`, `enhance.md` | Product truth and enhancement handoff |

Run `npm run build` after changing the template, copy or render helper. New assets need adding to `server.mjs`. Additional languages need complete dictionaries, imports, both language selectors and the allowlist.

## Form: owner activation remains required

Recipient: **howan.ms.tc@gmail.com**. No activation or real test email was sent during this work.

1. Submit once from the hosted page and confirm the activation email in that mailbox; check Spam.
2. If FormSubmit provides a recipient alias, replace the address in the template form's `action`. AJAX derives its URL from the action. Rebuild.
3. Test delivery from a phone and laptop, including contact-language values. A green message means the service accepted the request; it does not prove inbox delivery.
4. Verify CAPTCHA behaviour on the activated hosted form. We do not set `_captcha=false`, solve challenges or assume AJAX can display a CAPTCHA. On verification/failure, the visitor can use the standard POST, which opens FormSubmit. Live verification has not been tested.
5. No-JS completion uses FormSubmit's page. Add `_next` only when a real hosted thank-you URL exists.
6. Review the on-page privacy wording and [FormSubmit privacy terms](https://formsubmit.co/privacy.pdf). Verify current limits and retention before launch; the page promises no retention period or response deadline.

Required: name, shop, phone, city and consent. Email, product range, contact language and message are optional. Hidden `_honey` is a bot trap; its contents never cause a local success. No API key, mailbox password, analytics, local submission storage or payment collection is used.

Success requires an OK response and explicit `success: true` or `"true"`. Activation/verification messages are not success. Failures preserve inputs and show the email alternative. A timeout is unconfirmed because an interrupted response cannot establish whether the service received the request.

Integration reference: [official FormSubmit documentation](https://formsubmit.co/documentation), checked 2026-10-16. Inbox delivery remains an owner check.

## Asset provenance

Existing review captures were copied read-only from the reviewer's temporary output. **No shop test script ran and no database was accessed.** At the owner's request, the receipt and Receive Stock images now use clearly labelled AI-enhanced derivatives. Sample financial values were preserved; the invoice excerpt shows only the first two rows. Original captures remain locally. See `assets/IMAGE-NOTES.md` for provenance and prompt details.

| File | Original capture | Context |
| --- | --- | --- |
| `assets/receipt-enhanced.png` | Enhanced from `1-udhaar-receipt.png` | Sharp receipt-only preview with the original sample customer and amounts. The original `receipt.png` includes a blocked camera; neither image establishes recognition performance. |
| `assets/udhaar.png` | `3-udhaar-page.png` | Settled sample customer's credit page. |
| `assets/invoice-short.png` | Enhanced from `2-photo-imported.png` | Two complete sample rows, retaining their costs/prices/margins. Later rows omitted. Original retained as `invoice.png`. |
| `assets/reports.png` | `4-reports.png` | Frame shows sales/profit summary. Full capture includes camera-correction tiles; all are synthetic records, not recognition-performance evidence. |
| `assets/social-preview.png` | Local HTML composition rendered by `qa.mjs` | Enhanced receipt, branding and explicit enhancement/demo-data label. |

`JonaRu-Reimagined.jpeg` is the original AI concept. Its imagined fruit recognition, sensors, enclosure and screen specifications are not built features. No older fruit demo video is used.

Screenshots contain smaller raster text than the website copy; HTML typography checks do not measure text inside images. Feature captures have full-size links. Stronger proof still needs a clean current register capture and real 20–30 second recording. Do not manufacture these.

## Checks and limits

With the preview running:

```powershell
npm run check
# Include HTTP asset and private-file checks:
$env:CHECK_HTTP = '1'
npm run check
# Isolated headless Chrome; all external form requests intercepted:
npm run check:browser
```

Browser checks require Node 22+ with built-in WebSocket (run here on Node 26) and installed Chrome. Set `CHROME_PATH` if needed. Screenshots, isolated profile and results go only to ignored `.qa/`. The script closes its own browser; browser sandbox permission may be required. Form responses are synthetic; no email is sent.

The final browser run passed **39 interaction assertions** and covered all four languages at **320, 390, 768 and 1366 px**. No horizontal overflow, no HTML text below 12 px and no uncaught exceptions. English CTA visible at 1366×768 and 390×844. Checks include actual pointer dragging both ways, keyboard movement, all six product choices, localised required/phone/email validation, menu/FAQ, correction/manual/udhaar, language/form preservation, mobile bar, reduced motion, no-JS content/native POST and mocked success/error/network/verification. See `.qa/results.json` for exact executed assertions.

These are landing-page checks, not product, camera, physical-phone or inbox tests. Native-speaker review and live form delivery remain outstanding. Product tests were not rerun.

## Static hosting

**Deploy settings for any static host (Cloudflare Pages, Vercel, Netlify, Render Static Site):** build command `npm run dist`, output directory `dist`, Node 18 or newer. `npm run dist` builds the page and copies only the public files into `dist/`, and stops with an error if the page links to a file that is not published. Set the `SITE_URL` environment variable to the real HTTPS address so the canonical and social links are correct. Do not use a "Web Service" type: those sleep when idle on free plans, and this site needs no server.

The file list below is what `dist/` contains:

Upload only `index.html`, `styles.css`, `app.js`, `copy.js`, `render.js`, the four `locales/*.js`, `favicon.svg`, `JonaRu-Reimagined.jpeg`, and the five listed `assets/*.png`. Serve JavaScript with the correct MIME type. Do not publish `.qa` or the development repository.

No public domain was supplied. OG image is relative for local work. Canonical and absolute social URLs are built only with the actual HTTPS page URL:

```powershell
$env:SITE_URL = 'https://YOUR-ACTUAL-DOMAIN/your-page/'
npm run build
```

Replace the example with the real URL before running. Nothing has been published or pushed.

# JonaRu landing audit — 19 October 2026

## Scope and baseline

Entry point: `index.template.html` → `build.mjs` → `index.html`. Vanilla ES modules, four locale dictionaries, no UI dependencies. `publish.mjs` packages public assets for the existing Cloudflare Worker (`wrangler.jsonc`, name `aiot`). Product code was inspected read-only. No database, product APIs, credentials or live messaging were used.

The public page was fetched with curl and rendered in isolated headless Chrome. The built-in web reader could not open it; the shell fetch and Chrome succeeded. Source HTML is saved at `.qa/audit-before/live.html`. Chrome captures at 1366, 768, 390 and 320 px found no horizontal overflow and no uncaught exceptions during capture. This is not a complete baseline interaction test.

## Findings before implementation

| Severity | Finding and evidence | Impact / recommended fix |
| --- | --- | --- |
| High | Public hero uses `receipt-enhanced.png`; stock uses `invoice-short.png`, both AI redraws. Invoice caption was removed. | Evidence can be mistaken for an unmodified app screen. Use original screenshots with truthful crops and demo-data labels. |
| High | At 390 px the interactive demo begins 2,927 px down; page height is 14,110 px. Desktop demo begins 1,966 px down. | Visitors must pass repeated introductory material before trying the product. Move demonstration immediately after hero; group workflows and readiness. |
| High | `qa.mjs` still clicks removed `#demo-credit` / `#credit-note`. | Prior passing results do not validate the new cash/UPI overlay. Update and run regression coverage. |
| High | Automatic UPI success animation is illustrative; actual `BillPage.tsx` asks cashier to check their phone and record receipt. | Could imply a working payment gateway. Keep simulation disclosure visible before and during the payment flow and on completion. |
| Medium | Hero CTA says “Request a demo”; nine form inputs including consent; optional fields occupy the initial view. | Pilot fit and next step are unclear. Use “Request a Pilot Demo”, four required contact/shop details, and optional details in a disclosure. |
| Medium | Status, device needs, privacy and FAQs repeat overlapping limitations. | Reading burden. Consolidate readiness and requirements; give data handling its own section and keep concise FAQs. |
| Medium | Two enhanced PNGs alone total 2.66 MB; original receipt and invoice total 0.64 MB. | Unnecessary download for small-screen evidence. Restore originals, crop by presentation, retain lazy loading and explicit dimensions. |
| Medium | Six-product selection resets `crossed` even when that product already has a billed item. | Returning to a previously selected product can duplicate the simulated tracked object. Track billed crossing state per product. |
| Medium | Pointer drag suppresses clicks with a zero-delay timer; overlay choices lack an Escape exit; bill-row correction targets are 36 px. | Touch/keyboard reliability risk. Harden drag completion, support Escape and restore focus, use 44 px targets. Verify with browser input. |
| Medium | Live HTML has relative `og:image`, no canonical; `build.mjs` requires an unset `SITE_URL`. | Weak sharing/canonical signals. Default to the supplied live URL while preserving the environment override; regenerate social image from real evidence. |
| Medium | Privacy names cloud records but omits unconfirmed access, retention, deletion and optional messaging-provider processing. | Prospective shops cannot assess data handling. Explain inspected flow and state what must be agreed before a pilot. |
| Medium | No evidence of FormSubmit activation/delivery in repo. AJAX checks service success and handles verification; native POST leaves site. | A working form UI does not prove mailbox delivery. Preserve service and native fallback; mock success/failure/verification/timeout without sending messages. Founder must confirm activation and delivery. |
| Low | Feature band “At the counter” shows a customer-credit screenshot rather than billing; supplementary hero animation duplicates main demo. | Weak connection between copy and evidence. Pair screenshots with the correct workflow; retain supplementary motif in the camera explanation. |
| Low | Translations have structural parity, but no recorded native-speaker sign-off. | Technical correctness does not prove natural language quality. Review changed copy and layouts in all four languages; keep native review outstanding. |

No Critical defect was established by the initial source/capture audit. Form delivery and full interaction behavior were not yet tested at this stage.

## Verified product facts and discrepancies

- `project/pipeline/models/production/manifest.json`: exactly six classes. `cart.py`: tracked crossing adds/removes. `VisionStream.tsx` and `useVisionWebSocket.ts`: browser camera → authenticated web proxy → vision server.
- `api/orders/route.ts`: cash/UPI/credit recording, database transaction and stock guard. `BillPage.tsx`: manual product buttons, manual loose weights, browser printing, hard-coded tax display. No payment collection/verification or proper GST invoicing was established.
- `prisma/schema.prisma`, `docs/handoff/README.md`: Postgres/Neon stores shop records. No implemented offline bill-save path found. PIN middleware and signed WebSocket tickets exist; this is not a security audit.
- Invoice parser handles PDF text and OCR fallback for scans; the older “PDF never uses OCR” statement is outdated. Handoff evidence remains sample English invoices, not real vendor validation.
- Current code adds a loose-item catalogue, customer mobile numbers, message logs and optional Twilio delivery. Default messaging is simulated. Real provider delivery is documented as unverified. Do not infer working automatic reminders from this code.
- Pi deployment, real shop trial and physical printing remain unvalidated according to current handoff/Pi docs; absence of a later trial cannot be proved from code alone. Founder should confirm these dated statements.
- No frame/video recording found in the reviewed runtime vision path. Hosting infrastructure, logs, access policies and retention were not comprehensively audited; never convert that finding into “video never stored anywhere”.

## Proposed implementation

Hero → interactive demo → three core workflows → four camera steps → readiness and requirements → privacy/data handling → FAQs → pilot request. Preserve the static architecture, translations, demo interactions, form mechanism and Cloudflare configuration. Replace decorative/generated evidence with original captures; keep hardware concept only in its labelled disclosure.

## Implemented result

The eight requested sections are in order. The interactive demo, six matching packet photos, correction/manual entry, payment overlay, concept disclosure, four languages, native form fallback and Cloudflare architecture remain. The supplementary signature animation now belongs to the camera explanation. Optional form fields are retained behind a disclosure; four required details and contact consent are initially visible.

Original receipt and invoice captures replace generated derivatives. The invoice frame contains the first two original rows; it does not alter margins. Full-capture links deliberately retain all original evidence. Screenshot text is raster content and is not included in HTML typography measurements. These are existing review captures, not screenshots of a newly run shop app.

### Measured comparison (English, 844 px viewport height)

| Width | Before page height | After page height | Before demo position | After demo position |
| --- | ---: | ---: | ---: | ---: |
| 1366 px | 9,155 px | 8,311 px | 1,966 px | 763 px |
| 768 px | 10,092 px | 9,333 px | 2,047 px | 794 px |
| 390 px | 14,110 px | 13,518 px | 2,927 px | 1,138 px |
| 320 px | 15,423 px | 14,709 px | 3,477 px | 1,147 px |

The demo is about 61% closer to the top on desktop and 390 px mobile. Overall page reduction is modest because a substantive privacy section and a fourth camera step were added. There is no measured conversion-rate claim. The two replacement images save 2,021,128 bytes versus the enhanced pair. Final public package is approximately 1.56 MiB including all product photos and the social card; this is file size, not a Lighthouse score or measured real-network load time.

### Before/after captures

- Desktop hero: [before](.qa/audit-before/1366-hero.png) / [after](.qa/audit-after/1366-hero.png).
- Mobile hero: [before](.qa/audit-before/390-hero.png) / [after](.qa/audit-after/390-hero.png).
- Mobile demo: [before](.qa/audit-before/390-demo.png) / [after](.qa/audit-after/390-demo.png).
- Final details: [stock](.qa/audit-after/1366-stock.png), [mobile form](.qa/audit-after/390-form.png), [privacy](.qa/audit-after/390-privacy.png), [UPI overlay](.qa/mobile-upi.png), [payment confirmation](.qa/mobile-payment.png).

These files are local review artifacts under ignored `.qa/`; they are not published. Baseline is the actual public Cloudflare page; after captures use the local candidate.

## Verification

- `npm run check`: passed. Builds static English, validates four matching dictionaries, unique IDs/anchors/translation references, brand casing and JavaScript syntax. HTTP-enabled run passed for all 23 public assets; development docs, test artifacts and a product environment-file path returned 404.
- `npm run dist`: passed; 23 allowlisted public files, compatible with unchanged `wrangler.jsonc`. The supplied public URL is the canonical/OG default; `SITE_URL` still overrides it.
- `node qa.mjs --url=http://127.0.0.1:4175`: **70 assertions passed**, **16 viewport/language combinations** (320, 390, 768, 1366 × en/gu/hi/mr), **zero horizontal overflow**, **zero visible HTML text nodes below 12 px**, **zero uncaught exceptions**, **zero broken local asset requests**. See `.qa/results.json` for exact assertions.
- Actual browser input tested: pointer and emulated touch dragging both ways, keyboard arrows, menu Enter/Escape, FAQ toggling and payment Escape/focus restoration. All six image selections load and match; switching back to an already billed tracked product cannot duplicate it.
- Cash confirmation, three-second UPI QR, delayed confirmation/dismissal and unchanged bill height passed. Editing cancels pending confirmation. Reduced-motion states have no running animation. This verifies the landing simulation, not a payment integration.
- Form checks: localised required/phone/email validation, preserved values/contact language across locales, collapsed optional-field validation, intercepted error/network/verification/timeout/success, and native POST with JS disabled. **No real form request or email was sent.** Activation, CAPTCHA service behavior, quotas and mailbox delivery remain unverified.
- Accessibility review includes exposed control names from Chrome's accessibility tree, visible heading order, focus indicators, keyboard input, 44 px correction targets, labels, image descriptions, no-JS content and reduced motion. Core palette contrast calculations: body 14.89:1, secondary 6.36:1, white/blue CTA 5.89:1, blue/pale-blue 5.26:1, privacy text/navy 11.33:1. This is not a full WCAG conformance certification or screen-reader usability study.
- Native-language copy was reviewed for key parity, intended meaning and rendered layout; it has **not** received native-speaker sign-off. No physical phone, Pi, printer, real invoice, production shop or backend test was run.
- No dedicated linter or TypeScript configuration exists in this standalone vanilla-JS landing project. Available syntax/static/browser/build checks were used without adding dependencies.

### Failures encountered and resolved

1. Public URL failed in the built-in web reader and sandbox PowerShell fetch. Approved curl and isolated Chrome fetched/rendered it successfully.
2. Sandbox blocked Node subprocesses and Chrome startup. Approved runs succeeded; these were environment failures.
3. The first new form assertion counted an input inside a closed native `details` element because layout rectangles still existed. Fixed the test to exclude closed disclosures; actual form visibility was correct.
4. The obsolete udhaar-demo assertions were replaced with cash/UPI coverage. No failing final landing checks remain. Live email delivery is an explicit verification gap, not a passed check.

## Files changed and why

| Files | Reason |
| --- | --- |
| `index.template.html`, generated `index.html` | Eight-section order, real hero capture, simulation boundary, semantic headings, consolidated readiness/privacy and compact form. |
| `locales/en.js`, `gu.js`, `hi.js`, `mr.js` | Pilot CTA, concise hero, four camera steps, workflow grouping, screenshot descriptions, privacy explanations and optional-form labels. |
| `render.js` | Original screenshot references/captions and shared privacy definition-list rendering for static English and language changes. |
| `styles.css` | Consistent spacing/type, mobile hierarchy, real screenshot framing, readiness/privacy layouts, compact form, 44 px correction buttons. |
| `app.js` | Track crossing state per product, suppress post-drag ghost clicks, Escape payment dismissal/focus and reveal invalid optional fields. |
| `build.mjs` | Canonical and absolute social metadata default to the supplied live URL, with environment override preserved. |
| `server.mjs`, `publish.mjs` | Serve/package original image assets; keep generated derivatives and development files out of public output. |
| `check.mjs` | Match new static sections and original assets; configurable preview base for HTTP checks. |
| `qa.mjs` | Update obsolete demo tests; cover photos, tracked state, mouse/touch/keyboard, payment timing/cancellation/layout, form timeout, accessibility tree/headings and loading. Regenerate social preview from original receipt. |
| `capture.mjs` | Repeatable read-only before/after browser captures and layout metrics. |
| `assets/social-preview.png` | New sharing image using original receipt evidence and pilot messaging. |
| `README.md`, `BRIEF.md`, `enhance.md`, `assets/IMAGE-NOTES.md`, `AUDIT.md` | Current architecture, evidence provenance, hosting instructions, audit results and limits. |
| `dist/`, `.qa/` (ignored) | Ready-to-publish build and local verification artifacts. |

No product API, database schema, authentication, inference code, dependency manifest, routing framework or Cloudflare deployment configuration was changed. No commit, push or live deployment was performed; the landing repository remote is still not supplied.

## Founder confirmations before a real pilot

1. Confirm there has still been no real-shop trial, Pi run or physical-printer validation since the reviewed handoff; supply dates/evidence if that has changed.
2. Define pilot location/eligibility, duration, price, hardware provision, installation, support and who responds to demo requests. No response-time promise is published.
3. Confirm app/vision hosting, cloud regions, operator access, customer consent, retention/deletion, backups and incident handling. Cloudflare deployment logging is enabled in `wrangler.jsonc`; its actual log contents, access and retention need review. No guarantees were invented.
4. Confirm FormSubmit activation and actual mailbox delivery, native CAPTCHA flow, service limits and privacy acceptance. The [official AJAX documentation](https://formsubmit.co/ajax-documentation) and [linked privacy PDF](https://formsubmit.co/privacy.pdf) were reachable during review; that does not verify account configuration or delivery.
5. Confirm optional Twilio configuration and customer-messaging consent before enabling it. Code exists; provider delivery has not been established. Do not promise automatic scheduled reminders.
6. Obtain native review of Gujarati, Hindi and Marathi and confirm product-photo publication rights. The page's language selector changes the website only.

## Prioritised next improvements

1. Activate and delivery-test the form with the founder; connect the confirmed landing repository and deploy this reviewed candidate.
2. Record a clean 20–30 second real checkout on the current app, plus a genuine current register screenshot and permitted real vendor invoice. Replace old sample evidence when available.
3. Agree pilot/privacy/support terms and native-language wording before recruiting shops into an installed trial.
4. Run the actual Pi, printer, outage/recovery, real-invoice and labelled checkout validations. Publish only results with their measured conditions, including limitations.

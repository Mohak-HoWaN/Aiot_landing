# JonaRu Model-1 — enhancement handoff

Updated 2026-10-17. The main improvements below are implemented inside `landing/`. `README.md` covers preview, files, assets, form activation and verification limits.

## Implemented

### Branding and conversion

- Practical hero: counter, stock and udhaar in one app. Names kirana/snack shops and the six-product recognition limit.
- **Request a demo** replaces booking language. Nav, hero and form actions; a compact mobile bar helps later in the page.
- Working-prototype/no-shop-trial disclosure. No fabricated reviews, results, scarcity, prices or availability.
- Three strengths, four shop situations, grouped features and concise FAQs. Added udhaar, returns, loose items, write-offs, profit and reorders. Supplier credit is clearly distinguished.

### Real evidence

- Hero receipt detail from the real app, visibly labelled demo data.
- Larger real udhaar, synthetic-invoice-import and report captures replace tiny decorative screens. Full-size feature links.
- Screens stay in English; sample records do not prove recognition accuracy, real-invoice reliability or shop trials.
- Original AI concept is below the fold behind a disclosure, with imagined hardware/fruit details expressly unbuilt.
- Social preview uses the real receipt. Actual domain remains needed for canonical and absolute OG URLs.

### Motion and interaction

- Separate camera → recognition → sample bill motif plays once, has Replay and stops offscreen. The real screenshot is not animated or presented as a recording.
- Checkout simulation: all six products, optional drag, movement buttons, keyboard actions, quantity correction, manual unknown-product entry and sample udhaar.
- Larger counter on the right to smaller billed area on the left. Clearly labelled simulation; example prices are not real product or pilot prices.
- Recognition/scan/bill sequence, replay, subtle bill entry, section reveals and scroll progress. Transform/opacity motion, native scrolling, no permanent loops.
- Reduced motion removes animation and shows a final static scene. Interactive buttons remain usable.
- Mobile request bar appears after the hero, hides at the form/while editing, and includes safe-area padding.

### Readability, language and form

- 16 px body, 14 px secondary, minimum 12 px labels. System fonts with script fallbacks; no external fonts.
- English content exists in static HTML without JavaScript. All four dictionaries have strict structure checks; no silent fallback.
- English on fresh visits. Language changes preserve form/FAQ/demo state. Contact language is a separate optional visible field.
- Service-confirmed acceptance, error and verification states; native POST fallback. No success before a confirmed response.
- Honeypot, localised validation, consent, FormSubmit disclosure and privacy-policy link. Activation and actual delivery remain owner tasks.
- Updated asset allowlist and static upload list.

## Browser review completed

Isolated headless Chrome checked four languages at 320, 390, 768 and 1366 px, including 1366×768 and 390×844 hero views. No horizontal overflow or HTML text below 12 px. Keyboard menu/FAQ, demo controls, form preservation, reduced motion, mobile bar and no-JS content/native POST checked. Service success/failure/verification/network responses were intercepted and mocked; nothing sent to FormSubmit.

The final run passed 39 interaction assertions, including pointer dragging both ways, all six product choices, arrow-key movement and required/phone/email validation in each language. Exact assertions and screenshots are in ignored `.qa/`. No product tests, database mutations, physical-phone checks or inbox delivery checks are implied. Native-speaker review is still needed.

## Good additions when evidence is available

### 1. Real 20–30 second checkout recording — first priority

Record the current app in real lighting: supported snack crosses, cashier reviews, payment is recorded, receipt opens. Hide PIN/private details and keep customers out of frame. Embed with captions, poster, controls and `preload="none"`. No autoplay sound. Do not use the older fruit-class video.

### 2. Clean register screenshot and actual setup photo

The receipt hero proves the billing app exists but does not show recognition working. Replace it with a current register capture using demo data. A real setup photo can explain actual camera/device placement. Keep the concept separate.

### 3. A day at the counter

Current feature bands cover counter, stock and closing accounts. A later story could follow morning delivery → checkout → udhaar payment → evening report with four real captures. Avoid repeating the same copy just to lengthen the page.

### 4. Invoice-to-stock animation

Show a labelled synthetic English invoice, scan once, fill a draft, highlight fields to check and end on “Review and save.” Do not imply perfect real-invoice reading or vendor-layout memory. A more legible crop/recording should improve on the current screenshot before adding this.

### 5. WhatsApp contact

Add “Message us” when the owner supplies a public number. No invented number or automatic messages. Keep the form as another route.

### 6. Real proof and pilot terms

When complete, publish qualified final-rig checkout results, Pi benchmarks, a consenting real vendor invoice and consenting pilot shop. Include conditions and failures. First define pilot duration, setup, support, cost and what the owner is asked to do. Until then keep the status board honest.

## Real talk

Camera recognition is the hook; daily shop work is the reason to explore. Six products is not a kirana catalogue. Tap-to-add exists, but no search or barcode scanner means a large catalogue has friction. Internet dependence, printer testing, hardware, support and price are real decision points. State them plainly.

Useful attraction explains a real task and lets the owner try a correction. Avoid 3D hardware rotation, cursor particles, scroll-jacking, chatbot filler, accuracy gauges, fake counters, activity pop-ups and testimonial carousels.

## References

- [FormSubmit documentation](https://formsubmit.co/documentation) and [privacy terms](https://formsubmit.co/privacy.pdf).
- [web.dev: animation performance](https://web.dev/articles/animations-guide).
- [MDN: reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

Trends do not prove conversion gains. This page uses readable copy, real software and useful interaction. Conversion performance has not been measured.

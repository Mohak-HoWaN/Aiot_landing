# JonaRu Model-1 — current landing brief

Updated 2026-10-17. Supersedes the earlier brief. Brand: **JonaRu**, including visual styling. Work only in `landing/`.

## Audience and action

Primary: kirana and snack-shop owners considering a demo. Secondary: college/SSIP evaluators and investors looking for real working software.

Positioning: **One simple app for your counter, stock and udhaar.** The camera attracts attention; connected shop workflows explain daily value. Plain practical copy, white/blue palette, real evidence, readable type and purposeful motion.

Action: **Request a demo**. Pilot terms, eligibility, duration, installation, support and pricing are unknown. Do not imply a booked appointment, available deployment, free pilot or purchase commitment. Contact: `howan.ms.tc@gmail.com`.

## Product truth

- Working prototype in pilot preparation. No real shop trial or Raspberry Pi run.
- Billing uses the browser device's camera, sending frames to a vision server. Real counters require HTTPS for camera access.
- Six packaged snacks: Balaji Chataka Pataka, Balaji PopRings, Cadbury Dairy Milk, Center Fruit, Nestlé KitKat and Oreo. Demonstration products, not partners.
- Line crossings add/remove tracked items. Simulation moves from the larger counter side to the smaller billed side; line position is illustrative.
- Inventory products can be tapped onto a bill. Adding inventory does not train the camera. No barcode scanning or billing search. The scrolling strip has limitations for large catalogues.
- Cashier can add/remove/edit quantities and void bills. Saving beyond available stock is blocked.
- Cash, UPI and customer udhaar are recorded, not collected or verified. Payments/returns affect the customer credit ledger.
- Loose items: manually type grams. No connected scale or camera recognition for loose goods.
- Vendor receiving: packs/pieces, costs/prices, batch, expiry and supplier credit. Distinguish supplier credit from customer udhaar.
- PDF/photo invoice import creates a reviewable draft. Tested only on synthetic English invoices on a PC. Real invoices, non-English reading and Pi timing are unproven. Vendor layout memory is planned.
- Inventory, low stock, activity, write-offs, approximate batch expiry, suggested vendor reorders, sales reports, profit and CSV export are implemented. Profit excludes and counts unknown-cost items.
- Camera report tiles are correction records, not event-level recognition accuracy.
- Shared staff PIN. Numbered browser-printable 80 mm receipts with JonaRu header. Physical printer untested.
- No GST invoicing. Do not promote the hard-coded register tax display or promise a GST release.
- Cloud database holds sales, stock and customer records. Internet is required to save bills. No offline mode.
- Current vision server has no recording feature. Pilot hosting, access and data handling need agreement. Do not claim a completed privacy audit or already-local shop deployment.
- Raspberry Pi 5 is a target. No built enclosure, ultrasonic sensor or weight sensor.
- Website: English, Gujarati, Hindi, Marathi. Product screens and OCR: English. Fresh visits start English. Contact language is independently selected.

Source basis: owner's 2026-10-16 code-referenced handoff, project handoff/stock-intake notes, model manifest and cited billing/invoice/shop code. Earlier test results belong to their stated conditions. This landing work did not repeat product tests or touch the app/database.

## Page order

1. Navbar, language and demo request.
2. Shop-value hero, real receipt and separate labelled simulation motif.
3. Four small-shop situations.
4. Three checkout steps and interactive simulated bill.
5. Counter / stock / sales feature bands with real sample captures.
6. Shop-owner invitation, hardware/connectivity needs and data flow.
7. Working / sample-tested / next board, six names, training/non-affiliation notes, expandable future concept.
8. Plain FAQ, including real decision limits.
9. Demo form, next steps, contact and data disclosure.
10. Footer, privacy and contact.

## Evidence rules

Never invent reviews, shop logos, partnerships, demand, prices, accuracy, speed, savings or usage counts. No fake activity, countdowns or trust strips. Six-product count comes from the manifest. Simulation prices/customer names and screenshot amounts are explicitly examples, never performance or customer evidence.

Every simulation, screenshot and concept has a visible disclosure. Screenshots may be framed but must not be redrawn to fabricate recognition. Hero is a receipt capture, not a live-camera demonstration. Provenance and limitations are in `README.md`.

## Owner inputs still needed

- Activated, delivery-tested form; optional recipient alias and actual hosted URL.
- Native-speaker review of Gujarati, Hindi and Marathi.
- Current real-app recording, clean register capture and optional setup photo.
- Pilot scope, cost, installation/support and hosting/data-handling arrangements.
- Privacy wording review; optional public WhatsApp number and named team.

Keep unknowns explicit until supplied. Do not publish testimonial or affiliation placeholders.

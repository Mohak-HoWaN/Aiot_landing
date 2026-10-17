export default {
  makeBill: "Make bill",
  choosePayment: "How would you like to pay?",
  payCash: "Pay by cash",
  payUpi: "Pay by UPI",
  demoQr: "Demo QR",
  qrWait: "Showing demo QR for 3 seconds…",
  qrAlt: "Illustrative demo QR. Not a payment code.",
  paymentReceived: "Payment received",
  cashReceived: "Cash received",
  upiReceived: "UPI payment received",
  paymentDisclaimer: "Simulated payment only. No money is collected. JonaRu records payments; it does not verify them.",
  signatureLabel: 'Simulated camera-to-bill sequence', signatureCamera: 'Camera', signatureBill: 'Sample bill',
  skip: 'Skip to content', navigation: 'Main navigation', navHow: 'How it works', navFeatures: 'Features', navOwners: 'For shop owners', navFaq: 'FAQ', language: 'Page language', menu: 'Open or close menu', request: 'Request a demo',
  badge: 'Pilot preparation', headline: 'One simple app for your counter, stock and udhaar.', intro: 'For kirana and snack shops. JonaRu Model-1 brings billing, deliveries and customer credit together, with a camera to help.', heroDetail: 'The camera recognises six packaged snacks today. You review every bill and tap in other products.', seeDemo: 'See how a bill is made', prototype: 'A working prototype. Not yet used in a shop.',
  realApp: "Enhanced receipt · Demo data", screenshotLanguage: 'App screenshots are in English. This selector changes the website only.', receiptAlt: "Enhanced JonaRu receipt preview with the original sample Oreo sale and udhaar details", imageOpen: 'View full capture',
  strengths: ['Billing, stock and udhaar together', 'Every bill stays in your hands', 'Vendor bills become stock drafts'],
  problemLabel: 'The everyday counter', problemTitle: 'A shop is more than a bill.', problemIntro: 'The small jobs that follow you through the day.',
  problems: [
    ['Udhaar in a notebook.', 'Who owes what, and since when? Pages are easy to lose and hard to add up.'],
    ['Loose items and packets together.', 'Rice by the gram and biscuits by the piece on the same bill.'],
    ['Vendor bills on paper.', 'Typing every delivery line takes time and invites mistakes.'],
    ['What to order. What is expiring.', 'Guessing from the shelf works until the busy week.']
  ],
  howLabel: 'At the counter', howTitle: 'The camera helps. You make the call.', howIntro: 'Use the camera on the device running the billing page. Keep control of every item.',
  steps: [
    ['Show it to the camera.', 'A supported snack in front of the camera is recognised. Today that means six products.'],
    ['Cross the line to add it.', 'Moving it across the billing line adds it; moving it back removes it. Anything else you tap in by hand.'],
    ['Review, record, print.', 'Check the bill, record cash, UPI or udhaar, and print a receipt. Stock updates when you save.']
  ],
  demoLabel: 'Simulated demo. Not the live camera.', demoTitle: 'Try a bill. Then change your mind.', demoHint: "Drag the pack across the line or use the buttons. Then make a bill and try a simulated cash or UPI payment. Prices are examples.", chooseProduct: 'Choose a supported product', desk: 'Counter', billed: 'On the bill', line: 'Billing line', drag: 'Drag the product across the billing line', add: 'Move to bill', back: 'Move back', replay: 'Replay', manual: 'Try an unknown product', manualItem: 'Example shop item', manualHint: 'The camera does not know this item. Tap it onto the bill.', manualAdd: 'Add manually', currentBill: 'Your sample bill', empty: 'Your next item starts here.', total: 'Total', remove: 'Remove one', ready: 'Move a supported product from the counter to the bill.', added: 'Item added. You can correct the bill below.', removed: 'Item removed. You stay in control.', corrected: 'Quantity corrected by the cashier.', manualAdded: 'Unknown product added by hand.', detected: 'Recognised', simulationNoJs: 'Enable JavaScript to try the simulated checkout. The steps above explain the workflow.',
  featuresLabel: 'Through the shop day', featuresTitle: 'From a delivery to the day’s accounts.', featuresIntro: 'Working software for everyday shop tasks. These captures use demo data, not a real shop’s records.',
  bands: [
    { title: 'At the counter', lead: 'Make the bill. Keep the relationship.', items: [
      ['Camera-assisted billing', 'Six packaged snacks recognised. Tap other inventory products onto the bill.'],
      ['Cashier control', 'Add, remove, change quantities or void a bill. Checkout blocks quantities above available stock.'],
      ['Udhaar and returns', 'Record customer credit and later payments. Returns restock items and reduce an udhaar balance or show a refund.'],
      ['Loose items by weight', 'Type the weight in grams. Loose items are added manually, not recognised by the camera.'],
      ['Payments and receipts', 'Record cash, UPI or udhaar. Numbered receipts use the browser’s print layout; a physical printer is not yet tested.'],
      ['Staff access', 'A shared staff PIN protects the app.']
    ], caption: 'Real app · Demo data. A sample customer’s settled udhaar balance.', alt: 'Customer credit page of JonaRu with a settled sample customer' },
    { title: 'Managing stock', lead: 'A delivery comes in. Your records follow.', items: [
      ['Invoice to draft', 'Upload a PDF or photo. Review the filled draft before saving. Tested only on sample English invoices.'],
      ['Vendor deliveries', 'Record packs, cost, selling price, batch, expiry and supplier credit — money you owe the vendor.'],
      ['Stock and write-offs', 'See low stock and activity. Write off expired, damaged or lost items at cost.'],
      ['Expiry and reorders', 'Check approximate batch expiry and a suggested order list grouped by vendor. Copy the list for WhatsApp.']
    ], caption: "AI-enhanced excerpt · Sample English invoice. First two rows shown. Review imported values before saving.", alt: "Enhanced receive-stock preview showing the first two sample invoice rows: Center Fruit and PopRings" },
    { title: 'Understanding sales', lead: 'Close the day with a clearer picture.', items: [
      ['Daily reports', 'See sales, cash, UPI and udhaar totals, products sold and a CSV download.'],
      ['Profit view', 'Profit uses the recorded cost of each sold item. Items without a cost are excluded and counted.'],
      ['Camera corrections', 'See how often a cashier edited the camera’s bill. This is a correction record, not a lab accuracy score.'],
      ['System dashboard', 'View the camera, adjust the billing line and check the vision system’s health.']
    ], caption: 'Real app · Demo data. Sales and profit summary; sample amounts only.', alt: 'Daily sales and profit summary in JonaRu using demo data' }
  ],
  ownersLabel: 'For shop owners', ownersTitle: 'Start with your counter. And your questions.', ownersIntro: 'We are looking for shop owners to explore a pilot with us. We will discuss your products, setup, support and any cost before you decide.', needTitle: 'What you need today', needs: ['A device with a camera and a browser.', 'Internet to save bills and stock.', 'A secure page address (HTTPS) for the camera.', 'A receipt printer is optional; physical printing is not yet tested.'], dataTitle: 'Where things happen today', dataRows: [['Camera pictures', 'Sent to the JonaRu vision server for recognition. The exact pilot location is still to be agreed.'], ['Shop records', 'Sales, stock and customer records are kept in a cloud database.']], hardwareNote: 'Raspberry Pi 5 is a target device. Model-1 has not run on a Pi yet. The pilot setup still needs testing.',
  statusLabel: 'An honest look at Model-1', statusTitle: 'Working prototype. Real work still ahead.', statusIntro: 'No real shop trial yet. Here is what exists and what still needs to be tried.', statuses: [
    { title: 'Working today', items: ['Camera billing for six snacks', 'Tap-to-add for inventory products', 'Cash, UPI and udhaar recording', 'Stock, returns and write-offs', 'Vendor deliveries and expiry', 'Reports, profit and reorder list'] },
    { title: 'Tested on samples only', items: ['Invoice import: sample English invoices', 'Receipt layout: browser preview, not a physical printer', 'Shop workflows: synthetic data, not a live shop'] },
    { title: 'Next to explore', items: ['Raspberry Pi 5 and real shop lighting', 'Real vendor invoices', 'More camera product classes', 'Installation, support and pricing'] }
  ],
  sixTitle: 'Six snacks the camera knows today.', training: 'Adding a product to inventory does not teach the camera. New recognition classes need training and validation.', affiliation: 'Product names belong to their owners. They appear as demonstration products; JonaRu is not affiliated with them.',
  conceptTitle: 'A possible future counter unit', conceptCaption: 'AI-generated concept of a future counter unit. Not the current prototype.', conceptNote: 'The pictured enclosure, sensors, screen specifications and fruit recognition are not built features.', conceptAlt: 'AI concept of future hardware, with unbuilt details and illustrative food on its screen',
  faqLabel: 'Plain answers', faqTitle: 'Before it meets your counter.', faqs: [
    ['What if my product is not one of the six?', 'You can still sell it. Add it to inventory and tap its button on the bill. There is no barcode scanning or billing search yet; the scrolling product strip needs work for a large catalogue.'],
    ['What if the camera gets it wrong?', 'Remove, add or adjust items before saving. The report records corrections. It is not a measured camera accuracy score.'],
    ['What if the internet drops?', 'You cannot save bills or stock changes without internet today. Records are stored in a cloud database. There is no offline billing mode.'],
    ['Does it handle udhaar and loose items?', 'Yes. Put a bill on a customer’s udhaar and record payments later. For loose items, type the weight in grams. There is no connected weighing scale.'],
    ['Does it take payments?', 'No. Record the cash or UPI you have received. JonaRu does not collect or verify money.'],
    ['Can it read my vendor bills?', 'Upload a PDF or photo and review a filled draft. Only sample English invoices have been tested. Real bills may need more corrections; you check every field before saving.'],
    ['Does it do GST invoices?', 'No. The current prototype does not provide GST invoicing.'],
    ['What device do I need?', 'A camera-equipped device, a browser, internet and HTTPS for camera access. The final pilot setup is not decided. Raspberry Pi performance and physical receipt printing are untested.'],
    ['Is video stored? Where does my data go?', 'The current vision server has no video-recording feature. Pictures go to the vision server for recognition; shop records go to a cloud database. We will confirm hosting, access and data handling before a pilot.'],
    ['How much does it cost?', 'Pricing is not set yet. We will discuss scope and any cost before you decide. A demo request is not a purchase.'],
    ['Does the website language change the app?', 'No. The selector changes this page only. Product screens and invoice reading are in English.']
  ],
  formLabel: 'Let’s talk about your shop', formTitle: 'See if JonaRu fits your counter.', formIntro: 'Tell us about your shop. We will contact you to discuss a demo, your products and what a pilot could involve.', nextTitle: 'What happens next', nextSteps: ['We discuss your shop and questions.', 'We explain the current prototype and its limits.', 'You decide whether to explore a pilot.'], ownerName: 'Your name', shopName: 'Shop name', phone: 'Phone number', city: 'City / town', email: 'Email (optional)', count: 'About how many products do you sell? (optional)', choose: 'Select a range', notSure: 'Not sure yet', preferred: 'Preferred contact language (optional)', noPreference: 'No preference', otherLanguage: 'Another language', message: 'Your questions or preferred language (optional)', consent: 'You may contact me about a JonaRu demo or pilot using these details.', formNote: 'This request does not commit you to anything. We use your details to reply. Requests go through FormSubmit, a third-party service. Please do not include payment details or sensitive information.', formSuccess: 'Thank you. Your request was accepted by the form service. We will contact you using the details you gave.', formError: 'We could not confirm your request. Please try again or email howan.ms.tc@gmail.com.', formPending: 'The form service needs activation or verification. Please email howan.ms.tc@gmail.com to reach us.', submitting: 'Sending your request…', standardSubmit: 'Use the standard form instead', standardNote: 'The standard form opens FormSubmit to complete verification and submission.', required: 'Please complete this field.', consentRequired: 'Please allow us to contact you before sending.', phoneInvalid: 'Enter a phone number with 7 to 15 digits.', emailInvalid: 'Enter a valid email address.',
  footerLine: 'A little help at the counter. A clearer view of your shop.', privacy: 'This form collects your contact and shop details so we can reply about a demo. FormSubmit handles delivery. For questions about your request or data, email us.', privacyLink: 'FormSubmit privacy policy', backTop: 'Back to top', noJs: 'English content and the request form work without JavaScript. Enable JavaScript for other languages and the interactive demo.'
};

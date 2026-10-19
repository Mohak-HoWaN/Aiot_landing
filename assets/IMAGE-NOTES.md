# Enhanced landing images

**19 October 2026 audit update:** these generated derivatives are retained as historical files only. The current page and social preview use original `receipt.png`, `invoice.png` and `reports.png`, framed in CSS without redrawing pixels. The receipt crop excludes the camera-unavailable panel; it demonstrates a sample receipt, not successful recognition. The invoice frame shows the first two original rows. Full-capture links retain the complete original evidence. The enhanced derivatives are excluded from the public allowlists. The notes below describe the earlier image-editing work, not current evidence.

Updated 2026-10-17 at the owner's request. Built-in Image Generation was used, followed by visual comparison with the original captures. Original files `receipt.png` and `invoice.png` are retained locally; the page and its full-size link use the enhanced variants.

- `receipt-enhanced.png`: 1153 × 1364. Receipt-only close-up, sharper type, unchanged sample bill/customer/amounts. The page crops only the surrounding white margin with CSS. Labelled as AI enhanced.
- `invoice-short.png`: 1536 × 1024. Enhanced excerpt containing the upload panel, vendor details and two complete rows, Center Fruit and PopRings. Their original costs, prices and margins remain. Later rows are omitted. The eight-line import message is retained because this is a two-row excerpt of the original draft. Labelled as an enhanced excerpt of a sample invoice.

These are enhanced derivatives, not unaltered screenshots or new evidence of a shop trial. No app or database changes were made.

## Receipt prompt

Edit the real JonaRu screenshot into a crisp high-resolution close-up of only the white receipt modal, its green checkmark, Print receipt and New bill buttons. Remove the surrounding app/camera by cropping. Preserve the layout, blue button, rounded white card and exact receipt data. Make text sharp and legible. Exact text: JonaRu; Bill #1; 16/10/2026, 10:27:37 pm; Oreo; ₹10.00; 1 × ₹10.00; TOTAL ₹10.00; On udhaar: UI Customer (to pay later); Thank you for shopping with us!; Print receipt; New bill. No added features, products, amounts, watermark or decorative background.

## Receive Stock prompt

Make a sharp faithful excerpt of the original Receive stock capture: heading, upload/review panel, Vendor bill and only LINE 1 Center Fruit and LINE 2 PopRings. End after LINE 2; omit all subsequent rows. Do not change financial values or manufacture positive margins. Preserve the original eight-line import message. Vendor SHREE BALAJI TRADERS; invoice INV-2026-0457; date 14-10-2026. Center Fruit: packs 5, pieces per pack 100, cost 80, sale price 1, weight 25 g, batch CF2409, expiry 31-08-2027; 500 pieces, ₹0.80 cost each, ₹0.20 margin. PopRings: packs 10, pieces per pack 12, cost 120, sale price 10, weight 25 g, batch PR1102, expiry 31-03-2027; 120 pieces, ₹10.00 cost each, ₹0.00 margin. Preserve app styling; no extra controls or data.

One corrective edit completed the initially cut-off second card: extend the white canvas to include LINE 2's summary and bottom border, keeping all fields unchanged. Exact summary: “Adds 120 pieces · cost ₹10.00 each · margin ₹0.00 per piece”.

## Page integration

Hero, image dimensions, responsive CSS, all four language captions/alt text, full-size invoice link, server allowlist and social preview reference the replacements. `qa.mjs --images-only` checks loading/framing at desktop and mobile widths and regenerates the social preview; `PREVIEW_URL` selects the temporary preview port if 4173 is already in use.

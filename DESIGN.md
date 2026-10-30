# JonaRu: the considered counter

2026-10-31. This direction supersedes the visual and line-crossing guidance in the October 19 brief.

## Research and interpretation

- https://stripe.com/terminal — leads with the physical checkout product, then connects it to software and operations. Apply that relationship to camera, bill and stock; do not imply JonaRu offers payment processing.
- https://www.apple.com/apple-pay/ — organises the story around a familiar action and short, task-specific explanations. Give visitors something understandable to do before presenting the feature catalogue.
- https://www.adyen.com/pos-payments — uses real payment contexts, product details and customer evidence. Use our own packet photographs and original app captures; no borrowed trust marks, merchant results or hardware claims.

These are interpretations of the published page content, not measured conversion findings or a claim to copy their visual designs. Browser research screenshots were unavailable in this environment.

## Product source

`project/pipeline/jonaru/zone.py`, `project/web/src/content/help.ts` (camera topic updated October 29), and `project/web/src/components/billing/BillPage.tsx`.
The current mechanism is rectangle occupancy, not directional line crossing. Recognised products inside the zone enter the ticket; removal reduces it. Closed-ticket items still in the zone remain excluded until removed. Cash and UPI are manually confirmed records, not transfers or verified payments. The app does not create a UPI QR.

## Design tokens and plan

- Porcelain #F7F9FC, white #FFFFFF, midnight blue #102D50, cobalt #2354ED, steel #62758B, scan green #25836A.
- Segoe UI Variable / Segoe UI for readable product-led display and body copy; native Indic script fallbacks. Large sentence-case headlines, no decorative all-caps labels.
- Hero: left-aligned promise beside a dimensional scan surface made of real product photos and a clearly labelled sample ticket. Three visitor-selected stages tell one story. CSS perspective gives the surface depth without pretending it is a manufactured device.
- Below: full interactive zone, then alternating wide editorial product sections, factual readiness, FAQs and the demo request.

```
brand       workflows / how it works       demo request
clear promise           dimensional scan surface
primary + try CTA       place / review / clear
             interactive scan zone + ticket
stock story             original app capture
original app capture    daily shop story
readiness / FAQs / request
```

## Critique before implementation

Surface refinement: consistent upper-left soft lighting, stationary fine brushed texture on counter surfaces, subtle paper shading on the example ticket, and layered contact/cast shadows under packets and the counter. Content panels receive quieter edge highlights. Texture and lighting do not animate; motion remains attached to the existing checkout story and actions. CSS only, with no extra assets or runtime dependencies.

A floating terminal or bank card would misrepresent this camera-assisted billing app. Use the actual supported packets as the recognisable subject. Avoid unrelated particles, generic abstract blobs, constant rotations and scroll hijacking. Depth belongs to the counter illustration; information and controls remain flat and readable. Motion is tied to stage selection, product placement and recording a sample sale. All imagery remains local. No additional image is required to build this version; a current real checkout recording is the most valuable future asset.

# Boston Tea Party runtime v2 — generation record

## Output

- Runtime path: `public/images/boston-tea-party-panorama.png`
- Generated: July 31, 2026
- Provider: OpenAI through the Codex built-in image-generation interface
- Model/version and provider generation ID: not exposed by the interface
- Dimensions: `1774 × 887` (`2:1`)
- Format: 8-bit RGB PNG, no alpha, non-interlaced
- Bytes: `2,100,502`
- SHA-256:
  `5be2ba14d2d4dc1c878fa4dc11a0558b7c954ff509465e1afa613b5f665732a5`

## Exact prompt

```text
Use case: historical-scene
Asset type: production 360-degree equirectangular game panorama for PastPoint
Primary request: Boston Tea Party at Griffin's Wharf, Boston, on the night of December 16, 1773. A controlled group of ordinary colonists on a timber wharf and the deck of a modest merchant ship are actively breaking open wooden tea chests and tipping loose dark tea over the rail into the harbor water. The event-defining action must be immediately readable.
Scene/backdrop: eighteenth-century colonial Boston harbor with low Georgian English-style brick and timber waterfront buildings, small warm candle lanterns, timber piers, calm dark water, modest cargo ships with ordinary rigging and furled sails.
Subject: several adult workers in restrained 1770s coats, breeches, cloaks, work caps, and subtle disguises; nobody is in the water. Show open cargo hatch, ropes or tackle, axes used to open chests, broken chests on deck, and loose tea visibly pouring into the water.
Style/medium: cinematic historically grounded realistic digital environment, detailed but natural, suitable for an educational historical game; no text.
Composition/framing: true full-spherical 360 x 180 equirectangular panorama, exact 2:1 visual composition. Eye-level observer standing on the wharf beside the merchant ship. Put the main tea-dumping action in the central opening view. Continue the harbor, wharf, and low Georgian buildings naturally around the full horizon. Keep the left and right image edges as matching simple open-water/sky background for a clean seamless wrap, with no person, ship mast, building edge, rope, or focal object crossing the seam. Keep zenith as simple continuous cloudy night sky and nadir as coherent timber wharf planks without pinching or a blurred strip.
Lighting/mood: blue winter night, controlled warm lantern light, focused civic protest rather than battle or spectacle.
Constraints: historically plausible 1773 materials and architecture; modest merchant vessels only; people remain on ship or wharf; tea is loose and visibly emptied from already opened chests; calm organized work party; horizontally seamless 360 wrap; projection geometry must remain coherent at both poles; no duplicated people or objects at the seam; no watermark.
Avoid: people swimming or falling into water; intact chests flying through the air; giant galleons; cannon rows; gunports; warships; naval combat; soldiers attacking; weapons other than work axes; fire; explosions; elaborate war bonnets; stereotyped Indigenous costume; modern, Victorian, or industrial architecture; electric or gas streetlights; steamships; cars; flags; logos; signs; readable text; moon as a focal object; fisheye frame; flat conventional landscape photo; visible vertical seam; warped faces or extra limbs.
```

## Acceptance evidence

- Material content review: pass.
- Exact `2:1` runtime format: pass.
- Flat edge comparison: mean absolute difference `4.25 / 255`.
- Production viewer full horizontal sweep: pass.
- Production viewer zenith and nadir inspection: pass.
- Desktop opening view at `1280 × 720`: pass.
- Mobile opening and seam inspection at `390 × 844`: pass.
- Final opening camera: yaw `56°`, pitch `0°`, zoom `71`.

This record documents the generated reconstruction and its internal QA. It is
not a claim of specialist historical certification.

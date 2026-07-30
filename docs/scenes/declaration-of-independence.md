# Adoption of the Declaration of Independence — scene dossier

## Status

- Runtime scene:
  `src/features/game/declaration-of-independence.ts`.
- Runtime asset:
  `public/images/declaration-of-independence-panorama.png`.
- Asset status: generated hackathon candidate; passed flat material review and
  wrapped opening-view smoke. Exhaustive seam and pole checks remain Phase D.
- Generation method: built-in OpenAI image generation through Codex. No CLI,
  API fallback, or provider pipeline was used.
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,346,883`.
- SHA-256:
  `6bc12ccb337a2a46d1b4cd2612fc0b5ffed9b7ead291d528934bf4d4882f87ad`.

## Canonical scene facts

- Event: the Second Continental Congress adopts the wording of the Declaration
  of Independence.
- Date: July 4, 1776.
- Place: Assembly Room of the Pennsylvania State House, now Independence Hall,
  Philadelphia.
- Game coordinates: `39.9489, -75.1501`.
- Congress voted for independence on July 2 and adopted the Declaration's text
  on July 4.
- Most delegates signed the later engrossed parchment on August 2, so the scene
  deliberately depicts approval rather than a mass signing ceremony.

## Visual blueprint

Required:

- a modest Georgian Assembly Room with sash windows and period woodwork;
- colony tables covered with green wool baize and Philadelphia Windsor chairs;
- a plain presiding platform, secretary, working papers, quills, and inkstands;
- delegates turning toward the chair in restrained acknowledgment of approval;
- warm summer daylight and a dignified working-session atmosphere.

Forbidden:

- delegates signing the engrossed parchment or recreating Trumbull's tableau;
- a `1777` thirteen-star flag, the later Rising Sun chair, or George Washington
  participating in the vote;
- readable document text, modern museum ropes, electric fixtures, tourists,
  fireworks, captions, or logos;
- duplicated delegates or furniture across the horizontal wrap seam.

## Generated candidate review

| Material check | Result | Evidence |
| --- | --- | --- |
| Adoption rather than signing | pass | delegates remain at baize-covered tables and acknowledge the chair; no one signs |
| Assembly Room character | pass | Georgian interior, platform, sash windows, tables, Windsor chairs, papers, and chandelier |
| Period material culture | pass | restrained 1770s clothing, furniture, quills, candles, wood, and wool |
| Anachronism review | pass | no flag, Rising Sun chair, modern museum object, electric light, or readable text |
| Portrait dependence | pass | the event reads through room and action rather than exact faces |
| Equirectangular delivery | candidate | exact `2:1`, level floor/room datum, centered vote, and continuous rear wall zone |

Material decision: **accept for runtime integration**. The image is a
responsible reconstruction of a poorly documented visual moment, not a claim
of exact seating or portrait placement.

## Generation prompt

```text
Use case: historical-scene
Asset type: PastPoint runtime panorama, a full-spherical environment map for an interactive 360-degree historical guessing game
Primary request: Create a photorealistic, historically responsible reconstruction inside the Assembly Room of the Pennsylvania State House, now Independence Hall, Philadelphia, in the late morning or afternoon of 4 July 1776, at the restrained moment when the Second Continental Congress has just approved and adopted the wording of the Declaration of Independence.
Historical distinction: This is the July 4 adoption of the document after debate, NOT the later August 2 signing. Do not show delegates lining up to sign, do not show anyone writing a signature, do not show a large engrossed parchment, and do not recreate the theatrical Trumbull signing tableau.
Scene/backdrop: A neat but not elegant Georgian colonial assembly chamber with painted plaster and period woodwork, tall sash windows with simple shades, a large glass chandelier, two simple folding screens in the front corners, and a plain raised Speaker's platform at the front. The President's chair must be a plausible plain 1776 high-backed chair, NOT the carved Rising Sun chair made in 1779 and not a throne.
Subject and clear front-sector clues: In the central forward 120 degrees, show the raised platform with the presiding officer and secretary, a modest stack of handwritten working-paper sheets on the table with no readable writing, and the assembled delegates turning toward the chair in solemn acknowledgment that the document has been approved. A few delegates may stand or raise a hand in restrained assent; most remain at their colony tables. The moment should read as a congressional vote and adoption, not a signing ceremony, banquet, speech to the public, or later public reading.
Furnishings: Thirteen colony tables arranged plausibly in two gently curving rows with a center aisle facing the platform; each table covered in loosely woven heavy green wool baize. Period Philadelphia Windsor chairs around the tables. Quill pens, closed inkstands, small stacks of working papers, candleholders, and a few books may rest naturally on tables, but no person touches a quill to the Declaration and no text is legible.
People and period accuracy: Roughly forty to fifty adult male delegates distributed naturally around the room, mid-distance rather than close portraits, with realistic anatomy and individual poses. Plausible 1776 colonial clothing: wool coats, waistcoats, knee breeches, stockings, buckled shoes, neckcloths, restrained wigs and natural hair in period styles. Avoid facial caricature and avoid exact celebrity portraiture.
Style/medium: Photorealistic historical reconstruction with documentary realism, natural human expressions, worn wood, wool texture, paper, brass, glass, and soft daylight; not an oil painting, illustration, engraving, wax museum, stage set, diorama, or fantasy.
Composition/projection: Output one PNG exactly 1774 x 887 pixels, exact 2:1 aspect ratio. True full-spherical equirectangular projection covering 360 degrees horizontally and 180 degrees vertically, one flattened latitude-longitude environment map, not a cropped cinematic frame, not fisheye, not a cylindrical strip. Camera at standing eye height near the rear-center aisle, aimed toward the Speaker's platform. Keep all vertical architecture straight where locally viewed and keep the horizontal room datum level across the middle line. Top edge is continuous ceiling/zenith; bottom edge is continuous floor/nadir.
Seam and poles: The left and right image edges must join seamlessly as one continuous rear wall and doorway zone, with matching woodwork, floorboards, ceiling, lighting, and geometry. Keep the platform, all recognizable action, delegates, tables, chandelier, documents, and props far from the left-right seam and away from zenith/nadir. No duplicated delegates or furniture, no half-person or half-chair at either edge, and no visible vertical seam.
Lighting/mood: Warm summer daylight from windows balanced with soft interior shadow; dignified, quiet, momentous, readable throughout the room, not theatrical or triumphalist.
Constraints: No flags of any kind, especially no 13-star or 1777 United States flag. No text, letters, numerals, captions, wall labels, maps with lettering, readable document writing, logos, signatures, or watermark anywhere. No modern furniture, electric light, microphones, cameras, plastics, modern clothing, modern fire equipment, modern exit signs, tourists, museum ropes, portraits from later periods, Rising Sun chair, celebratory fireworks, public crowd, or signing ceremony.
```

## Sources

- [U.S. National Park Service — Assembly Room history](https://www.nps.gov/inde/learn/historyculture/places-independencehall-assemblyroom.htm)
- [U.S. National Park Service — Assembly Room furnishings](https://www.nps.gov/articles/000/assembly-room-furnishings.htm)
- [U.S. National Archives — Declaration of Independence](https://www.archives.gov/milestone-documents/declaration-of-independence)

# Wright Brothers' First Flight — scene dossier

## Status

- Gameplay status: round 2 in the ordered scene list.
- Historical status: research-backed prototype, not yet independently
  certified.
- Panorama status: generated interaction asset, not a final production master.
- Asset:
  `public/images/wright-brothers-first-flight-panorama.png`
- Initial game view: yaw `68°`, pitch `0°`, zoom level `71` under the current
  `60°` minimum vertical field-of-view limit. This preserves approximately the
  previous `69°` opening field of view while preventing close zoom.
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,037,159`.
- SHA-256:
  `8c877e7e6aed92a11b3a61a885b74e1563d5797224ef0bdc43ae2a8db53f6b02`

The panorama was generated with the built-in OpenAI image-generation tool on
July 29, 2026. It should remain labelled as a prototype until a historian or
qualified aviation reviewer checks the aircraft anatomy, scene composition,
and panorama projection.

## Canonical scene facts

- Event: Wright Brothers' First Flight.
- Date: December 17, 1903.
- Time represented: approximately 10:35 a.m.
- Place: the first-flight takeoff point at Kill Devil Hills near Kitty Hawk,
  North Carolina.
- Coordinates used by the game: `36.01984, -75.66881`.
- Pilot: Orville Wright, lying prone at the controls.
- Ground assistant: Wilbur Wright, running alongside the Flyer.
- First-flight result: 120 feet in 12 seconds.

The coordinate is the modern geotag for the First Flight Boulder and is treated
as the canonical game point. The National Park Service describes the marker as
an approximate reconstruction because the sandy topography shifted between
1903 and the witnesses' 1928 site survey.

## Visual blueprint

Required:

- one 1903 Wright Flyer just above the launch rail;
- an unpainted muslin biplane with exposed wood frame and wire bracing;
- a prone pilot, forward elevator, twin rear rudders, two pusher propellers,
  exposed engine, and skids with no wheels;
- Wilbur in period wool clothing running beside the aircraft;
- the 60-foot wooden launch rail on level sand;
- cold, windy winter light, low dunes, sparse vegetation, and simple camp
  buildings in the distance.

Forbidden:

- the later Wright memorial, boulder, flight markers, visitor centre, airport,
  roads, cars, power lines, signs, or a stabilised green lawn;
- catapult equipment, wheels, a closed cockpit, modern tailplane, nose
  propeller, painted markings, or later Wright aircraft;
- modern flying clothes, a crowd, flags, press equipment, text, labels, logos,
  or a watermark;
- fire, smoke, crash damage, injury, or other spectacle.

## Generation brief

The final generation and correction prompts requested a photorealistic `2:1`
full-spherical equirectangular reconstruction with a level horizon and the
left-right seam passing only through open sand and sky. The Flyer, brothers,
rail, and camp were kept away from the seam. The correction pass specifically
requested the 1903 Flyer's forward canard, twin rear rudders, two wooden pusher
propellers, chain drive, prone pilot, and absence of wheels while preserving
the original panorama composition.

## Current validation

- exact `2:1` dimensions: pass;
- correct RGB PNG and stable checksum: pass;
- first/last pixel-column mean absolute RGB difference: `4.70`;
- no text, modern monument, paved infrastructure, crowd, or wheels: visual
  pass;
- full horizontal wrapped-view, seam, and pole inspection in the production
  game viewer: pass;
- expert aircraft-anatomy review: pending;
- target `4096 × 2048` production resolution: pending.

## Sources

- [National Park Service — The Wright Flyer](https://www.nps.gov/articles/wrightflyer.htm)
- [National Park Service — The Road to the First Flight](https://www.nps.gov/wrbr/learn/historyculture/theroadtothefirstflight.htm)
- [National Park Service — First Flight Boulder](https://www.nps.gov/places/000/first-flight-boulder.htm)
- [National Park Service — Wright Brothers FAQ](https://www.nps.gov/wrbr/learn/frequently-asked-questions.htm)
- [Library of Congress — First Flight collection highlight](https://www.loc.gov/collections/wilbur-and-orville-wright-papers/articles-and-essays/collection-highlights/first-flight/)
- [Library of Congress — first-flight photograph record](https://www.loc.gov/item/00652085/)
- [Smithsonian National Air and Space Museum — 1903 Wright Flyer](https://airandspace.si.edu/collection-objects/wright-1903-flyer/nasm_A19610048000)

# Attack on Pearl Harbor — scene dossier

## Status

- Runtime scene:
  `src/features/game/pearl-harbor-attack.ts`.
- Runtime asset:
  `public/images/pearl-harbor-attack-panorama.png`.
- Asset status: corrected generated hackathon candidate; passed flat material
  review and wrapped opening-view smoke. Exhaustive seam and pole checks remain
  Phase D.
- Generation method: built-in OpenAI image generation through Codex. The first
  candidate had a materially wrong twin-engine-looking foreground aircraft; one
  focused edit corrected aircraft anatomy and the torpedo depiction.
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,215,964`.
- SHA-256:
  `81b5042a2fb02598d33f18410c1020e8f4b06248e51f6baa182360af84315ba1`.

## Canonical scene facts

- Event: Japanese attack on Pearl Harbor.
- Date: December 7, 1941.
- Place represented: Battleship Row along the east side of Ford Island, Oʻahu.
- Game coordinates: `21.3650, -157.9502`.
- The opening attack began shortly before `08:00` and included low torpedo
  attacks against the moored battleships.
- The final image depicts a non-graphic opening moment rather than casualties
  or the later memorial landscape.

## Visual blueprint

Required:

- several prewar U.S. battleships moored beside Ford Island;
- exactly two small, clearly single-engine Japanese carrier aircraft;
- one submerged torpedo wake and a restrained water impact plume;
- 1941 harbor buildings, steel, water, smoke, and early-morning light;
- important clues grouped in the central opening sector.

Forbidden:

- the modern USS Arizona Memorial, modern Honolulu, jets, helicopters, or
  postwar radar;
- twin-engine aircraft, wing-mounted engines, extra aircraft, an exposed
  missile-like torpedo, or malformed ships;
- graphic casualties, giant explosions, triumphalist treatment, readable text,
  captions, logos, or watermark;
- ship or aircraft geometry crossing the horizontal wrap seam.

## Generated candidate review

| Material check | Result | Evidence |
| --- | --- | --- |
| Event recognition | pass | Battleship Row, Ford Island, Japanese aircraft, torpedo wake, impact plume, and smoke read together |
| Aircraft anatomy | pass after correction | exactly two modest single-engine monoplanes, each with one nose engine and no wing nacelles |
| Torpedo depiction | pass after correction | weapon remains submerged; only its wake crosses the water |
| Period setting | pass with soft note | 1941 harbor and naval silhouettes read correctly; generated ships are not forensic replicas |
| Human treatment | pass | distant operational scene with no visible casualty or graphic injury |
| Equirectangular delivery | candidate | exact `2:1`, level horizon, centered clues, and quiet water/shoreline at the wrap edges |

Material decision: **accept the corrected candidate for runtime integration**.
The scene is an AI reconstruction, not documentary or ship-identification
evidence.

## Base generation prompt

```text
Use case: historical-scene
Asset type: PastPoint full-screen 360-degree game panorama
Primary request: Create a photorealistic, historically plausible reconstruction of the Japanese attack on Pearl Harbor on the morning of December 7, 1941, viewed from a fixed human-height position at the edge of Ford Island harbor, looking toward Battleship Row during the opening torpedo attack just after 7:55 a.m.
Scene/backdrop: Pearl Harbor's Southeast Loch in clear early-morning Hawaiian light, 1941 Ford Island shoreline and low naval facilities, calm harbor water, haze and restrained smoke. No modern memorials or postwar structures.
Subject: In the opening/front sector, make Battleship Row unmistakable: several massive prewar U.S. battleships moored in a parallel row along the southeast shore of Ford Island, in 1941 naval gray, with period superstructures, cage or tripod masts, gun turrets and nested berths. Show two historically plausible Imperial Japanese Navy Nakajima B5N-style carrier torpedo bombers flying very low over the water on attack runs and one Aichi D3A-style dive bomber higher in the sky; accurate radial-engine monoplane silhouettes and small period red roundels, no readable markings. Include one torpedo wake and one tall water plume beside a battleship, localized smoke and anti-aircraft bursts, but no giant fireball.
Style/medium: grounded photorealistic documentary reconstruction, realistic steel, water, smoke, weathering and imperfect period machinery; sober, legible, non-cinematic historical atmosphere.
Composition/framing: EXACT 2:1 full-spherical equirectangular 360 panorama, level straight horizon across the center, complete 360-degree environment from one fixed human-height viewpoint, full zenith sky and plausible nadir dock edge/water. Keep Battleship Row, low torpedo aircraft, torpedo wake and impact plume together in the central opening sector and away from the left-right wrap seam and poles. Put only calm open harbor water, low distant shoreline and pale sky at both horizontal seam edges so they join continuously. Preserve natural equirectangular stretching only near poles; no conventional perspective crop, no fisheye circle, no tiny-planet effect.
Lighting/mood: clear soft early morning, urgent but dignified and non-graphic.
Constraints: historically recognizable from ships, Ford Island harbor geometry and period Japanese carrier aircraft without readable text or exact faces. No bodies, blood, visible casualties, close-up suffering or triumphalism. No readable text, captions, logos, trademarks or watermark.
Avoid: modern USS Arizona Memorial, modern USS Missouri museum appearance, aircraft carriers in harbor, jets, helicopters, postwar radar, modern Honolulu skyline, modern buildings, tropical resort imagery, fantasy explosions, mushroom cloud, sinking ships broken in half, malformed or duplicated battleships, duplicated aircraft, biplanes, modern fighters, wrong-country aircraft, warped masts, broken geometry, discontinuous seam, flat perspective image.
```

## Focused correction prompt

```text
Use case: precise-object-edit
Asset type: PastPoint full-screen 360-degree historical game panorama
Input images: Image 1 is the edit target and current accepted Pearl Harbor panorama.
Primary request: Correct ONLY the Japanese aircraft anatomy and the torpedo depiction in Image 1. Preserve the entire strong panorama composition, Battleship Row, every ship, Ford Island shoreline and buildings, dock foreground, water plume, smoke, flak bursts, lighting, color, camera position, level horizon, full-spherical equirectangular projection, nadir, zenith, and seam-safe edge content unchanged.
Aircraft correction: Replace all current aircraft with EXACTLY TWO clearly single-engine Nakajima B5N-style Imperial Japanese Navy carrier torpedo bombers, both slightly farther from the camera and modest in frame size for stable anatomy. Each must be an unmistakable low-wing monoplane with ONE radial engine centered in the fuselage nose, ONE propeller centered directly in front of that nose engine, a long narrow fuselage and greenhouse canopy, one continuous left wing and one continuous right wing, and small period red roundels. There must be NO engine nacelles on either wing, NO second engine, NO second propeller, NO twin-engine silhouette, NO extra aircraft, and NO aircraft-like fragments. Keep the two aircraft in the central opening sector above the harbor and away from the wrap seam and poles; one may fly low over the water and the other slightly higher and farther away.
Torpedo correction: Remove the separate exposed cylindrical torpedo-like object currently hovering or skimming above the water in the center foreground. Replace it only with a believable narrow torpedo wake that enters and continues beneath the water surface toward Battleship Row; the weapon itself must be submerged and invisible. Keep the existing restrained impact water plume.
Projection and invariants: retain EXACT 2:1 full-spherical equirectangular 360 format, straight level horizon, identical fixed human-height viewpoint, complete zenith and nadir, and continuous left-right seam. Do not crop, reframe, relight, restyle, move ships, alter ship anatomy, add explosions, or change the shoreline.
Constraints: photorealistic historically plausible December 7, 1941 reconstruction; non-graphic; no readable text, captions, logos, trademarks or watermark.
Avoid: twin-engine aircraft, wing-mounted engines, wing nacelles, multiple propellers, modern missiles, exposed torpedo above water, extra aircraft, biplanes, modern fighters, malformed wings, duplicated tails, changed battleships, changed dock, changed horizon, changed seam, flat perspective image.
```

## Sources

- [U.S. National Park Service — Battlefield Oʻahu](https://www.nps.gov/perl/learn/historyculture/oahu.htm)
- [Naval History and Heritage Command — overall views of the attack](https://www.history.navy.mil/our-collections/photography/wars-and-events/world-war-ii/pearl-harbor-raid/overall-views-of-the-pearl-harbor-attack.html)
- [Naval History and Heritage Command — archival image 80-G-30550](https://www.history.navy.mil/content/history/museums/nmusn/explore/photography/wwii/wwii-pacific/us-entry-into-wwii-japanese-offensive/1941-december-7-japanese-attack-on-pearl-harbor/japanese-air-attack/80-g-30550.html)

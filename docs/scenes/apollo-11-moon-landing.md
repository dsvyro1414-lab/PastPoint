# Apollo 11 Moon landing — scene dossier

## Status

- Runtime scene:
  `src/features/game/apollo-11-moon-landing.ts`.
- Runtime asset:
  `public/images/apollo-11-moon-landing-panorama.png`.
- Asset status: generated hackathon candidate; passed flat material review and
  wrapped opening-view smoke. The complete off-world input and result flow
  passed at desktop and `390 × 844`; exhaustive seam and pole checks remain
  Phase D.
- Generation method: built-in OpenAI image generation through Codex. No CLI,
  API fallback, or provider pipeline was used.
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,329,758`.
- SHA-256:
  `d4c5e9ba770be1a35a98702576f72fb4233f3967dd2a542b0c850b6de5dd1ad4`.

## Canonical scene facts

- Event: Apollo 11, the first crewed landing on the Moon.
- Landing date represented: July 20, 1969.
- Place: Tranquility Base in Mare Tranquillitatis.
- Selenographic coordinates: `0.67409° N, 23.47298° E`.
- Neil Armstrong and Buzz Aldrin landed in the lunar module `Eagle`; Michael
  Collins remained in lunar orbit in `Columbia`.
- The surface EVA included photography, sample collection, the television
  camera, and compact Early Apollo Scientific Experiments Package equipment.

## Location-input exception

This is the only off-world round. It must not project lunar coordinates onto
the Earth basemap or score a fictional Earth distance.

- During play, the Earth map is replaced by a compact `Moon` choice.
- The exact Tranquility Base label and coordinates remain hidden until result.
- The stable `distanceKm` result field is `null` for the lunar round.
- The result says `Moon identified` and shows the correct lunar site rather
  than an Earth map or a fake `0 km`.

## Visual blueprint

Required:

- the complete lunar module `Eagle` on four legs;
- exactly two Apollo 11 astronauts in period-correct A7L suits;
- the ladder, MESA area, surface camera, and compact experiment equipment;
- flat gray Mare Tranquillitatis terrain, bootprints, and long coherent shadows;
- a black, starless sky and a small supported flag as a secondary clue.

Forbidden:

- a lunar rover, later Apollo hardware, red commander stripes, or extra people;
- a waving flag, atmosphere, visible stars, a giant Earth, or studio lighting;
- modern suits, fantasy bases, launch exhaust, readable text, or logos;
- important geometry at the horizontal seam or spherical poles.

## Generated candidate review

| Material check | Result | Evidence |
| --- | --- | --- |
| Event recognition | pass | `Eagle`, two astronauts, ladder, flag, camera, and experiment package read together |
| Apollo 11 period | pass | no rover, later red-striped suit, modern hardware, or extra astronaut |
| Lunar environment | pass | airless black sky, low horizon, gray regolith, bootprints, and one-direction shadows |
| Flag treatment | pass | modest flag with a rigid upper support; it does not appear windblown |
| Text dependence | pass | no readable caption, mission lettering, or exact face is needed |
| Equirectangular delivery | candidate | exact `2:1`, level horizon, and simple wrap edges; runtime seam/pole review remains |

Material decision: **accept for runtime integration**. The scene is an AI
reconstruction, not documentary evidence.

## Generation prompt

```text
Use case: historical-scene
Asset type: PastPoint runtime game environment, full-spherical panorama
Primary request: Apollo 11 EVA at Tranquility Base during humanity's first crewed Moon landing, July 20, 1969; historically grounded, immediately recognizable, photorealistic reconstruction.
Scene/backdrop: the flat, gently cratered gray regolith of Mare Tranquillitatis near the Apollo 11 landing site; fine powder, scattered small rocks, shallow craters, crisp bootprints and equipment tracks; no mountains or dramatic fantasy terrain. Airless black sky.
Subject: the complete Apollo Lunar Module Eagle standing on four landing legs, with the black-and-metal ascent stage above the gold-and-silver foil-wrapped descent stage, forward ladder and footpad visible. Exactly two Apollo 11 astronauts: one close to the ladder/MESA area, the other several metres away working carefully with a period sampling tool or the compact Early Apollo Scientific Experiments Package. Both wear period-accurate white Apollo A7L lunar suits, PLSS backpacks, chest control units, lunar overshoes, reflective gold visors; no later-mission red commander stripes. Include only plausible Apollo 11 surface equipment such as the black-and-white TV camera on a tripod and compact experiment hardware.
Flag: a secondary clue several metres from Eagle, mounted on a vertical staff with a horizontal top support rod; the top rod is not fully extended, so the fabric is slightly folded and creased but completely motionless in vacuum, never billowing or windblown. Keep it geometrically modest and away from seams.
Style/medium: photorealistic historical reconstruction with convincing NASA-era engineering materials, restrained archival color, realistic lunar dust and foil textures; not concept art, not a studio set.
Composition/framing: EXACT 2:1 full-spherical equirectangular panorama, true 360 x 180 degree environment from a fixed human-eye-height viewpoint on the lunar surface, approximately 1.6 metres above ground. Level lunar horizon across the entire frame and centered vertically in equirectangular projection. Put Eagle, both astronauts, ladder, flag, and key equipment within the central opening-view sector, all fully visible and separated. Reserve the far left and far right wrap-edge zones for only continuous simple regolith, distant low horizon, and black sky so the horizontal seam wraps safely. Keep all people, spacecraft geometry, flag, equipment, and shadows away from left/right seam and top/bottom poles. No object cut off at frame edges.
Lighting/mood: harsh unfiltered low-angle lunar sunlight, long crisp single-direction shadows, bright sunlit surfaces and deep natural shadows, no atmospheric haze, no fill lights, no studio lights, no visible light rigs. Preserve readable detail without fake ambient glow.
Astronomy: omit Earth entirely rather than risk an implausible position or scale. Pure black sky with NO visible stars, consistent with short-exposure Apollo surface photography. Do not show the Sun in frame.
Constraints: exactly two astronauts; correct Apollo 11-era suits and equipment; Eagle is stationary and intact on the surface; flag fabric supported and motionless; physically coherent shadows; scene must read as a seamless explorable spherical panorama; no readable text, no mission lettering, no logos, no watermark.
Avoid: giant Earth, visible stars, waving flag, wind, atmospheric glow, clouds, lens flare, studio lighting, modern space suits, red commander stripes, lunar rover, later Apollo hardware, extra astronauts, duplicated limbs or backpacks, malformed hands, fantasy lunar base, rocket exhaust, launch scene, cinematic explosions, readable plaque text, captions, borders, fisheye circular frame, ordinary wide-angle photograph, cubemap faces, obvious left-right seam.
```

## Sources

- [NASA — Apollo 11 mission overview](https://www.nasa.gov/history/apollo-11-mission-overview/)
- [NASA — Apollo 11 Lunar Surface Journal mission overview](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11ov.html)
- [NASA — Apollo 11 mission summary](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11.summary.html)
- [NASA — Apollo 11 technical crew debriefing](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11tcdb.html)

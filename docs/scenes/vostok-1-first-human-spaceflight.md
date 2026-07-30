# Vostok 1 first human spaceflight — scene dossier

## Status

- Runtime scene:
  `src/features/game/vostok-1-first-human-spaceflight.ts`.
- Runtime asset:
  `public/images/vostok-1-launch-panorama.png`.
- Asset status: generated hackathon candidate; passed flat material review and
  wrapped opening-view smoke. Exhaustive seam and pole checks remain Phase D.
- Generation method: built-in OpenAI image generation through Codex. No CLI,
  API fallback, or provider pipeline was used.
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,215,496`.
- SHA-256:
  `18ec72634e8626fea9e038083c7e60ba553d2cc28c46da410f1f3b0a4a29e32a`.

## Canonical scene facts

- Event: launch of Vostok 1, the first human spaceflight.
- Date: April 12, 1961.
- Place: Site No. 1, Baikonur Cosmodrome, in present-day Kazakhstan.
- Game coordinates: `45.9203, 63.3422`.
- Yuri Gagarin completed one orbit of Earth after launching at `06:07 UTC`.
- The launch vehicle was derived from the R-7 family and used four tapered
  strap-on booster blocks around its central core.

## Visual blueprint

Required:

- a slender Vostok-K/R-7 launch vehicle with four tapered boosters;
- the distinctive Site No. 1 launch mount and withdrawn support arms;
- bright engine exhaust that does not hide the vehicle silhouette;
- early-1960s Soviet utility structures and vehicles;
- the open, dry Kazakh steppe.

Forbidden:

- Saturn V, Space Shuttle, Falcon, Proton, or a modern Soyuz-2 complex;
- a modern crew tower, drones, LED displays, or contemporary vehicles;
- an explosion, damaged rocket, unsafe crowd, or graphic injury;
- readable slogans, portraits, logos, captions, or important seam-edge objects.

## Generated candidate review

| Material check | Result | Evidence |
| --- | --- | --- |
| Event recognition | pass | Vostok/R-7 silhouette, booster cluster, withdrawn arms, exhaust, and steppe read together |
| Vehicle anatomy | pass with soft note | tapered booster cluster and narrow upper stage read correctly; rear boosters partly overlap in the flat projection |
| Period setting | pass | low Soviet industrial infrastructure and vehicles avoid modern launch-complex cues |
| Safe launch | pass | rising vehicle and controlled exhaust, with no accident interpretation |
| Text dependence | pass | no readable sign, flag, logo, or exact face is needed |
| Equirectangular delivery | candidate | exact `2:1`, level horizon, full vehicle in opening sector, and simple wrap edges |

Material decision: **accept for runtime integration**. The scene is an AI
reconstruction rather than forensic or documentary imagery.

## Generation prompt

```text
Use case: historical-scene
Asset type: PastPoint full-screen 360-degree game panorama
Primary request: Create a photorealistic, historically plausible reconstruction of the launch of Vostok 1 carrying Yuri Gagarin, the first human spaceflight, at Baikonur Cosmodrome Site No. 1 (Gagarin's Start) on the morning of April 12, 1961, at the instant of liftoff.
Scene/backdrop: Eye-level fixed viewpoint from the safe pad perimeter in the arid Kazakh steppe at early morning, pale blue sky, low April sunlight, sparse 1961 Soviet launch facilities, rail and utility structures, open flat desert horizon. No modern buildings or contemporary equipment.
Subject: In the opening/front sector, show a historically plausible Vostok-K launch vehicle just rising above the launch mount: a slender pale gray/metallic modified R-7 rocket with one central core and FOUR clearly visible tapered conical strap-on boosters arranged symmetrically around its base, an authentic narrow Vostok upper stage and smooth pointed payload shroud, no Soyuz escape tower. Surround it with the distinctive skeletal steel service gantries and four petal-like support arms of Baikonur Site No. 1 pulled back for launch. Bright clustered orange-white engine exhaust and dense steam spread below the rocket while the vehicle, booster geometry and gantry remain readable. A few small period ground personnel and boxy 1961 support vehicles remain far behind safety barriers for scale; no face is important.
Style/medium: grounded photorealistic documentary reconstruction, restrained Soviet industrial realism, authentic riveted and weathered steel, concrete, pipes, cables, dust, steam and heat shimmer; not glossy science-fiction concept art.
Composition/framing: EXACT 2:1 full-spherical equirectangular 360 panorama, straight level horizon across the center, complete 360-degree environment from one fixed human-height viewpoint, full zenith sky and plausible nadir gravel/concrete pad perimeter. Keep the full Vostok-K rocket, all four conical boosters, retracted gantry arms, launch mount and first exhaust plume together in the central opening sector, entirely away from the left-right wrap seam and poles. Put only empty Kazakh steppe, low utility fencing and pale sky at both horizontal seam edges so they join continuously. Natural equirectangular stretching only near poles; no conventional perspective crop, no fisheye circle, no tiny-planet effect.
Lighting/mood: crisp cool dawn light with warm engine illumination; historic, hopeful and technically grounded.
Constraints: Event must be identifiable through the Vostok-K/R-7 silhouette, four tapered boosters, Soviet 1961 pad architecture and Baikonur steppe without readable text, flags or a portrait of Gagarin. The rocket is lifting safely, not exploding. No readable text, captions, logos, trademarks or watermark.
Avoid: Saturn V, Apollo launch tower, Space Shuttle, Falcon rocket, Proton rocket, modern Soyuz-2 paint scheme, modern crew access tower, modern cameras, smartphones, drones, LED screens, American flags, Moon surface, spacecraft already in orbit, night launch, giant explosion, damage, injuries, panic, crowds close to exhaust, malformed booster count, missing or duplicated boosters, extra engines, bent rocket, warped gantry, discontinuous seam, flat perspective image.
```

## Sources

- [European Space Agency — The flight of Vostok 1](https://www.esa.int/About_Us/50_years_of_ESA/50_years_of_humans_in_space/The_flight_of_Vostok_1)
- [European Space Agency — Baikonur: from the steppes of Kazakhstan to space](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Mission_Odissea_-_F._De_Winne_-_english/Baikonur_from_the_steppes_of_Kazakhstan_to_space)
- [Smithsonian National Air and Space Museum — Racing to space](https://airandspace.si.edu/explore/stories/gagarin-vs-shepard)

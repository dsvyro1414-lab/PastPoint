# First Ascent of Mount Everest — scene dossier

## Status

- Phase C2 batch: 2.
- Research and gameplay metadata: drafted.
- Panorama generation: completed with the built-in image-generation workflow;
  the current file is a generated candidate, not a historically certified
  source image.
- The first generation attempt remained in progress for more than five minutes
  and was stopped; a retry succeeded.
- CLI fallback was intentionally not used.
- Runtime path:
  `public/images/first-ascent-of-mount-everest-panorama.png`.
- Asset: `1774 × 887`, RGB, exact `2:1`, `2,313,619` bytes.
- SHA-256:
  `46f8505e5bb581ec42b0d6a60edfcf0ba497839ce490be7fe239cac98aa9a215`.
- Scene module:
  `src/features/game/first-ascent-of-mount-everest.ts`.
- Registration: complete.
- Desktop runtime load and opening-view smoke: passed after widening the
  initial viewer zoom to show both climbers, their rope, oxygen equipment, and
  the Himalayan horizon together.

## Canonical facts

- Event: the first successful ascent of Mount Everest.
- Date and approximate summit time: May 29, 1953, at 11:30 a.m.
- Climbers: Edmund Hillary and Tenzing Norgay.
- Route: the south-east ridge after establishing Camp IX at approximately
  `8,503 m`.
- The pair used open-circuit oxygen equipment.
- The final major obstacle was the steep rock-and-ice step later known as the
  Hillary Step.
- The Royal Geographical Society describes the summit image as Tenzing Norgay
  photographed by Hillary, wearing goggles and an oxygen mask and holding an
  ice axe.

## Game metadata

- Canonical answer: `First Ascent of Mount Everest`.
- Accepted English aliases include `First Successful Ascent of Mount Everest`,
  `Everest First Ascent`, `1953 Everest Ascent`,
  `Hillary and Tenzing Reach Everest`, and close variants naming both climbers.
- Accepted Russian aliases include `Первое восхождение на Эверест`,
  `Первое успешное восхождение на Эверест`,
  `Хиллари и Тенцинг на вершине Эвереста`, and a full-name variant.
- Year: `1953`.
- Date: `1953-05-29`.
- Game marker: `27.9881, 86.9250`.
- Marker interpretation: the summit point; coordinates are rounded from the
  Nepal government statistical position `27°59′17″ N, 86°55′31″ E`.
- Location label: `Summit of Mount Everest, Nepal–Tibet border`.

## Visual anchors

- Hillary and Tenzing together on the small exposed snow summit, not a modern
  crowd;
- bulky, practical 1953 high-altitude clothing, balaclavas, goggles, heavy
  leather boots, mittens, and frost;
- period open-circuit oxygen cylinders, fabric harnesses, corrugated hoses, and
  face masks;
- wooden-shaft ice axes and a taut rope between the climbers;
- the narrow wind-sculpted summit ridge above cloud level, with the Himalayan
  panorama extending in every direction.

## Forbidden details

- modern synthetic one-piece suits, bright commercial branding, modern
  crampons or oxygen sets, satellite devices, radios with digital screens,
  selfie sticks, drones, or helicopters;
- queues, fixed modern ropes, ladders, tents on the summit, corpses, rubbish,
  rescue drama, or later expedition infrastructure;
- prayer-flag installations, permanent summit signs, plaques, monuments, or a
  broad flat viewing platform;
- impossible cliff geometry, duplicated climbers, exposed faces presented as
  exact portraits, or a camera visible in the scene;
- readable text, logos, trademarks, watermark, or a rectilinear image posing as
  a spherical panorama.

## Exact generation prompt

```text
Use case: historical-scene
Asset type: PastPoint game environment, exact 2:1 full-spherical equirectangular 360-degree panorama
Primary request: a historically plausible reconstruction of Edmund Hillary and Tenzing Norgay together on the summit of Mount Everest at about 11:30 a.m. on May 29, 1953, moments after completing the first successful ascent
Scene/backdrop: the small exposed snow summit and south-east ridge of Everest above a sea of clouds, wind-carved snow, dark rock edges, and a geographically believable high-Himalayan panorama in every direction
Subject: two exhausted climbers only, faces mostly concealed by frost-rimmed goggles, balaclavas, and period oxygen masks; bulky practical 1953 down and windproof layers in muted colors, heavy leather boots and mittens; period open-circuit oxygen cylinders with fabric harnesses and corrugated hoses; wooden-shaft ice axes and a rope; Tenzing raises an ice axe while Hillary stands close by, without requiring exact facial likeness
Style/medium: photorealistic natural historical reconstruction, crisp but not glossy, believable cloth wear, ice, frost, snow, rock, and thin high-altitude light
Composition/framing: exact latitude-longitude equirectangular projection covering a complete 360 by 180 degrees; level spherical horizon; climbers and summit crest centered in the front viewing sector and well away from the left-right wrap seam; seam passes through distant empty mountain and sky; preserve continuous sky at the zenith and snow-rock ground at the nadir; no fisheye, crop, mirrored mountains, duplicated equipment, or repeated people
Lighting/mood: clear late-morning high-altitude light, deep blue sky, hard cold shadows, restrained triumph and extreme exposure rather than action-movie spectacle
Constraints: exactly two climbers; accurate 1953 open-circuit oxygen equipment and mountaineering clothing; no readable text; no visible emblem detail; no logos; no trademarks; no watermark
Avoid: modern expedition queue, fixed ropes, aluminium ladders, tents on the summit, modern bright synthetic suits, commercial gear, satellite devices, selfie sticks, drones, helicopters, rescue scene, bodies, rubbish, permanent prayer flags, summit signs, plaques, fantasy peaks, giant cornice, exact portrait close-up
```

## Honest visual limitations and acceptance gate

- Static visual review passed the intended event anchors: the candidate shows
  exactly two climbers linked by a rope, period-looking oxygen equipment, a
  readable summit crest and Himalayan horizon, and no modern expedition queue.
- The file itself has the required exact `2:1` geometry. The left-right seam,
  zenith, and nadir still require inspection in the wrapped runtime viewer.
- Any generated 360 view will be an interpretive reconstruction: the exact
  simultaneous poses of Hillary and Tenzing and the full horizon around them
  are not documented by one photograph.
- Wrapped-view seam and pole review remains a submission-QA task; the runtime
  load and calibrated opening view pass do not certify forensic historical
  accuracy.

## Sources

- [Royal Geographical Society — Mount Everest education resource](https://www.rgs.org/schools/resources-for-schools/mountains-volcanoes-and-earthquakes/mount-everest)
- [Royal Geographical Society — Everest 1953 expedition photographs and chronology](https://www.rgs.org/our-collections/buy-and-license-images/limited-edition-platinum-prints/everest-1953-limited-edition-platinum-prints)
- [New Zealand History, Ministry for Culture and Heritage — Hillary and Tenzing reach Everest](https://nzhistory.govt.nz/edmund-hillary-and-tensing-norgay-reach-summit-of-everest)

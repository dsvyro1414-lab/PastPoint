# Storming of the Bastille — scene dossier

## Status

- Scene module: `src/features/game/storming-of-the-bastille.ts`.
- Runtime asset:
  `public/images/storming-of-the-bastille-panorama.png`.
- Asset status: generated hackathon candidate; accepted for integration after
  material visual review and desktop opening-view smoke. A full seam-and-pole
  sweep remains submission QA.
- Generation method: built-in OpenAI image generation through Codex after an
  earlier direct request returned HTTP `403`. No CLI or API fallback was used.
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,611,126`.
- SHA-256:
  `1aa954aefabb63e79828a108aec59dadd619067f5e28e45e5b771a2fa1ff34ff`.
- Registration and desktop runtime smoke: passed. The default camera loads the
  fortress wall, drawbridge approach, crowd, weapons, cannon, and smoke.

## Canonical facts and game data

- Event: Storming of the Bastille.
- Date: July 14, 1789.
- Place: the Bastille fortress at the end of Rue Saint-Antoine, Paris.
- Canonical game point: `48.8531, 2.3696`, at the former fortress site.
- Proposed opening view: the fortress, drawbridge, moat, armed crowd, and smoke
  from the assault all readable together.
- Proposed year control: initial `1750`, range `1650–1900`.

## Accepted aliases

- Storming of the Bastille
- The Storming of the Bastille
- Storming of Bastille
- Taking of the Bastille
- Fall of the Bastille
- Prise de la Bastille
- Bastille
- Взятие Бастилии
- Штурм Бастилии
- Бастилия

## Visual anchors

- the Bastille's eight cylindrical towers and high stone curtain walls;
- the moat, outer court, and drawbridge approach;
- a large Parisian crowd in varied late-eighteenth-century civilian clothing;
- muskets, pikes, several cannon, and localized powder smoke;
- dense pre-Haussmann Paris buildings around the fortress.

## Material forbidden details

- the July Column, modern Place de la Bastille, broad Haussmann boulevards,
  Eiffel Tower, cars, electric lighting, or modern paving;
- a guillotine, Napoleon, later republican uniforms, modern tricolour flags, or
  readable political banners;
- a generic medieval castle without the Bastille's recognizable eight-tower
  massing and drawbridge approach;
- an empty fortress scene, fantasy siege engines, a city-wide inferno, graphic
  gore, logos, or watermarks;
- warped towers, duplicate bodies, or a disruptive panorama seam.

## Generated candidate review

| Material check | Result | Evidence |
| --- | --- | --- |
| Event recognition | pass | fortress towers, drawbridge approach, armed Parisian crowd, cannon, and smoke read together |
| Bastille silhouette | pass | the dense cylindrical-tower massing avoids a generic single-tower castle |
| Period setting | pass | pre-Haussmann buildings, clothing, weapons, and cobbled ground support 1789 |
| Non-graphic treatment | pass | urgency is visible without bodies, wounds, or close-up suffering |
| Anachronism screen | pass | no July Column, Eiffel Tower, modern street, car, or electric light |
| Equirectangular delivery | candidate | exact 2:1 frame and level horizon; wrapped-view seam and poles still need runtime review |

Material decision: **accept for hackathon integration**. Multiple visual anchors
identify the assault without requiring readable banners or an exact portrait.
This remains a generated reconstruction rather than documentary evidence.

## Built-in generation prompt

> Use case: historical-scene. Asset type: PastPoint full-screen 360 game
> panorama. Create a photorealistic reconstruction of the storming of the
> Bastille in Paris on July 14, 1789. Eye-level viewpoint near the outer court
> and drawbridge approach. The massive medieval Bastille must be immediately
> recognizable through eight round stone towers, high curtain walls, moat and
> drawbridge. A large but readable crowd of Parisian artisans, tradespeople and
> defecting soldiers in accurate late-eighteenth-century coats, waistcoats,
> breeches, skirts, caps and tricorn hats advances with pikes, muskets and a few
> cannon; localized musket and cannon smoke, urgent action, no graphic gore.
> Dense low pre-Haussmann Paris buildings surround the fortress. Exact 2:1
> equirectangular full-spherical 360 panorama, level horizon, complete sky and
> cobbled ground, continuous left/right seam through plain buildings and smoke,
> fortress and drawbridge centered in the opening view, no fisheye or
> tiny-planet distortion. No July Column, Eiffel Tower, modern boulevard,
> guillotine, Napoleon, modern tricolour flags, readable banners, fantasy siege
> engines, logos, text, watermark, duplicated people, broken anatomy, warped
> towers, disruptive seam, or polar smearing.

## Sources

- [Château de Versailles — Storming of the Bastille, 14 July 1789](https://www.chateauversailles.fr/ressources-pedagogiques/vie-politique/revolution-francaise/prise-bastille-14-juillet-1789)
- [Paris Musées / Musée Carnavalet — contemporary scene of the assault](https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/prise-de-la-bastille-le-14-juillet-1789-20)

## Honest limitations

Static and opening-view review cannot certify exact fortress geometry, wrapped
seam continuity, zenith, nadir, or every background figure.

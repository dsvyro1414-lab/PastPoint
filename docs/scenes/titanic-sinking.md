# Sinking of RMS Titanic — scene dossier

## Status

- Phase C2 batch: 1.
- Runtime session order: round 6.
- Runtime asset:
  `public/images/titanic-sinking-panorama.png`.
- Asset status: accepted generated hackathon candidate after material review,
  opening-view smoke, full wrap review, and a targeted zenith repair.
- Generation method: built-in OpenAI image generation through Codex plus a
  deterministic upper-sky composite.
- Zenith repair record:
  [Titanic zenith repair](./titanic-zenith-repair.md).
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `1,837,557`.
- SHA-256:
  `ed29d7d66775ea0393bb65c5f15e484ff5de5731e06bc361f12b32d7382cf6ae`.

## Canonical scene facts

- Event: the sinking of RMS Titanic during its maiden voyage.
- Iceberg collision: late on April 14, 1912.
- Sinking: early on April 15, 1912.
- Game coordinates: `41.7325, -49.9469`.
- Marker interpretation: the recorded wreck area in the North Atlantic, used
  as a stable game point for an event that unfolded on the moving ocean.
- Titanic was a four-funnel British passenger liner. It struck an iceberg and
  sank in less than three hours.

## Visual blueprint

Required:

- Titanic's recognisable black hull, white superstructure, and four funnels;
- the bow already low in the water and the stern visibly raised;
- a cold, starry North Atlantic night with an iceberg in the wider scene;
- period wooden lifeboats moving away from the liner;
- restrained emergency activity on the decks without graphic suffering.

Forbidden:

- a stern-first sinking attitude or an intact, level ship;
- a daylight scene, tropical water, nearby city, rescue helicopters, or modern
  ships;
- two complete Titanic hulls, a cruise-ship silhouette, a modern lifeboat, or
  readable logos;
- bodies, graphic injury, panic close-ups, or imagery copied from a film.

## Generated candidate review

| Material check | Result | Evidence |
| --- | --- | --- |
| Event recognition | pass | four-funnel liner, lifeboats, iceberg, and night ocean read together |
| Sinking attitude | pass after correction | accepted candidate shows the bow descending and the stern high above the water |
| Period silhouette | pass with soft note | hull, promenade decks, funnels, davits, and boats read as an early-1910s liner; fine anatomy remains generated |
| Non-graphic treatment | pass | passengers remain distant and no victim or injury is shown |
| Text and portrait dependence | pass | identification does not require a ship name, caption, or face |
| Runtime opening view | pass | the bow-down liner, raised stern, funnels, lifeboat viewpoint, and cold night are readable together |
| Equirectangular delivery | pass after zenith repair | exact 2:1 frame, continuous seam, clean dark zenith, and coherent nadir in the production viewer |

The first candidate was rejected because its visible hull attitude made the
ship appear to sink stern-first. One focused edit corrected that material
error. Phase D later found a radial star vortex at the zenith; a second targeted
repair replaced only the upper polar sky and preserved the accepted scene below
the blend. Runtime decision: **accept the repaired candidate for hackathon
submission**. This is a generated reconstruction rather than documentary
evidence.

## Generation prompt

```text
Use case: historical-scene
Asset type: PastPoint full-screen 360-degree game panorama
Primary request: Create a photorealistic historical reconstruction of RMS Titanic sinking in the North Atlantic shortly before 2:20 a.m. on April 15, 1912.
Scene/backdrop: Eye-level viewpoint from a period wooden lifeboat on a cold, calm, moonless ocean. The enormous four-funnel liner dominates the opening view, with its bow already deep beneath the waterline and its stern raised high, propellers approaching visibility. A pale iceberg sits at a plausible distance beneath a dense star field.
Subject: Titanic's black hull, white superstructure, four buff funnels with black tops, promenade decks, rigging, davits and remaining lifeboats; small distant passengers and crew respond on deck while several period lifeboats pull away.
Style/medium: grounded photorealistic documentary reconstruction, restrained low-light exposure, realistic steel, painted wood, coal smoke, sea and cold night air; solemn rather than cinematic spectacle.
Composition/framing: exact 2:1 full-spherical equirectangular panorama, level horizon, complete 360-degree environment from one fixed human-height lifeboat viewpoint. Keep the bow-down and stern-high sinking attitude, four-funnel silhouette, nearest lifeboats and iceberg readable in the opening/front sector. Put mostly empty dark ocean and sky near the left-right wrap seam. Keep the liner, boats and people away from seam and poles.
Constraints: Titanic must be recognisable without readable text or a movie-specific composition. The ship is sinking bow-first, not stern-first. Preserve a dignified, non-graphic view of the disaster.
Avoid: stern-first sinking, level intact ship, ship already broken completely in two, modern cruise ship, daylight, tropical water, city skyline, rescue helicopter, modern lifeboats, giant waves, explosion, bodies, graphic injury, panic close-ups, readable ship name, logos, captions, watermark, duplicated ship, malformed funnels, warped rigging, fisheye frame, flat perspective image.
```

## Sources

- [NOAA — RMS Titanic history and significance](https://prod-01-alb-www-noaa.woc.noaa.gov/office-of-general-counsel/gc-international-section/rms-titanic-history-and-significance)
- [Smithsonian National Museum of American History — Titanic](https://americanhistory.si.edu/explore/exhibitions/on-the-water/online/ocean-crossings/comfort-courtesy-safety-speed/titanic)

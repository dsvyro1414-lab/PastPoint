# Skybox AI API panorama generation runbook

## Decision

Skybox AI API is the canonical panorama generator for PastPoint.

- Generate reviewed historical scenes offline before publication.
- Use Skybox Model 3 to create a native `8192 × 4096` equirectangular master.
- Keep the master immutable and derive smaller or tiled runtime assets from it.
- Never call Skybox from the browser or during a player session.
- Keep `SKYBOX_API_KEY` only in ignored `.env.local` and send it through the
  `x-api-key` request header.
- Keep the current `1774 × 887` panoramas unchanged as viewer controls until a
  new master passes every review gate.

Exact OpenAI `3840 × 1920` generation is no longer required before the scene
pipeline proceeds. It remains an optional provider benchmark or fallback if a
Skybox scene cannot pass historical review.

## Immediate milestone

Use the Wright first-flight scene to prove the complete API lane:

1. Implement a repository-owned offline generation command.
2. Fetch Model 3 styles and select a neutral, photorealistic style.
3. Validate the selected style's model and prompt limits before spending a
   credit.
4. Queue exactly one Wright candidate with a recorded non-zero seed.
5. Poll the request to completion and record the generation metadata.
6. Request an equirectangular PNG export at `8192 × 4096`.
7. Save the immutable master and a sidecar manifest outside the public runtime
   asset path.
8. Verify dimensions, checksum, projection, seam, zenith, nadir, and historical
   details.
9. Only after the master passes, derive runtime delivery candidates and inspect
   them in the production viewer.

Do not automatically generate several paid candidates. Review the first result
before spending further credits.

## API and security contract

Environment variable:

```text
SKYBOX_API_KEY
```

Rules:

- load the key only in the offline Node process;
- send it in the `x-api-key` header, never as a query parameter;
- never print the key, include it in an error, persist it in a manifest, or add
  a `NEXT_PUBLIC_` prefix;
- fail closed if the key is absent;
- require an explicit paid-generation flag before a `POST` request;
- allow style discovery, validation, and prompt preview without consuming a
  generation credit;
- write intermediate API responses only after removing credentials and private
  account fields;
- never overwrite an accepted master or current game asset.

Official endpoints:

- styles:
  `GET https://backend.blockadelabs.com/api/v1/skybox/styles?model_version=3`;
- generation:
  `POST https://backend.blockadelabs.com/api/v1/skybox`;
- generation status:
  `GET https://backend.blockadelabs.com/api/v1/imagine/requests/{id}`;
- export types and resolutions:
  `GET https://backend.blockadelabs.com/api/v1/skybox/export`;
- request export:
  `POST https://backend.blockadelabs.com/api/v1/skybox/export`;
- export status:
  `GET https://backend.blockadelabs.com/api/v1/skybox/export/{id}`.

Official references:

- [Getting started and API-key handling](https://api-documentation.blockadelabs.com/api/)
- [Skybox generation and style discovery](https://api-documentation.blockadelabs.com/api/skybox.html)
- [Skybox exports](https://api-documentation.blockadelabs.com/api/skybox-exports.html)

## Model 3 request contract

The first generation request must include:

- a discovered `skybox_style_id` whose response reports `model_version: "3"`;
- the reviewed scene prompt;
- the reviewed `negative_text`;
- `enhance_prompt: false`;
- a fixed non-zero `seed`;
- a bounded `max_wait`.

Do not send Model 4-only parameters. Model 3 generations cost one Skybox credit
and produce 8K by default. Model 4 may be explored separately, but its current
maximum output is `4096 × 2048` and it is not the canonical 8K lane.

The command must persist:

- scene ID and scene blueprint version;
- provider and API model version;
- style ID, style name, and its prompt limits;
- exact prompt and negative prompt;
- seed;
- generation request ID and obfuscated ID;
- generation timestamps and final status;
- export type and resolution;
- source-reference URLs;
- output byte size, pixel dimensions, and SHA-256;
- reviewer status and findings.

## Wright first-flight prompt

```text
Ground-level documentary view at Kill Devil Hills, 10:35 a.m. Dec 17 1903; exact 1903 Wright Flyer barely above a straight 60-ft timber monorail: natural-muslin open biplane, forward canard, twin rear rudders, two chain-driven pusher propellers, Orville prone, Wilbur running at right. Cold dunes, simple camp sheds, level horizon, seam through empty sand and sky, photorealistic.
```

Negative prompt:

```text
modern monument, boulder, roads, cars, green lawn, crowd, catapult, aircraft wheels, cockpit, fuselage, upright pilot, modern tail, nose propeller, single rudder, later Flyer, extra wings or propellers, text, watermark, seam, warped anatomy
```

Use the scene dossier as the historical review contract:
[Wright Brothers' First Flight](../scenes/wright-brothers-first-flight.md).

Immediate rejection conditions:

- missing forward canard or twin rear rudders;
- missing or front-mounted propellers;
- wheels attached to the aircraft;
- enclosed cockpit, fuselage, seat, or upright pilot;
- curved, doubled, metal, or railway-like launch rail;
- dramatic altitude instead of the first low liftoff;
- later memorial landscape or any modern infrastructure.

## Boston Tea Party prompt

Use this only after the Wright API lane and review process work end to end:

```text
Photorealistic 360° Griffin's Wharf, Boston, night Dec 16 1773; eye-level on timber wharf. Three modest moored merchant vessels, furled sails. Men in 1770s coats, breeches, cloaks, soot-dark faces, few feathers use tackle, split tea chests with hatchets, pour loose tea over rail. Georgian warehouses, crowd, oil lanterns, dark sky, thin crescent. Level horizon; seam over open harbor.
```

Negative prompt:

```text
full moon, warship, cannon, gunports, people in water, intact chests, battle, fire, modern or Victorian city, gas lights, cars, steamships, American flags, war bonnets, Native stereotype, text, watermark, tilted horizon, bad rigging, visible seam
```

Immediate rejection conditions:

- a full or oversized Moon;
- warships, cannon rows, or giant galleons;
- people swimming in the harbor;
- intact chests thrown wholesale into the water instead of tea opened on deck;
- stereotyped Indigenous costume;
- gas or electric street lighting;
- battle, fire, weapons, attacking soldiers, or modern architecture.

Historical references:

- [National Park Service — Boston Tea Party in real time](https://www.nps.gov/articles/000/boston-tea-party-in-real-time.htm)
- [Massachusetts Historical Society teaching source](https://www.masshist.org/2012/juniper/assets/ed-curricula/green_section_5h.pdf)
- [Library of Congress — colonies move toward rebellion](https://www.loc.gov/classroom-materials/united-states-history-primary-source-timeline/american-revolution-1763-1783/colonies-rebellion-1773-1774/)

## Master acceptance record

| Field | Control | Skybox 8K master |
| --- | --- | --- |
| Provider and model | existing prototype | Skybox Model 3 |
| Style ID and name | n/a | pending discovery |
| Seed | n/a | pending |
| Exact prompts | existing asset | recorded above |
| Source references | existing dossier | pending manifest |
| Pixel dimensions | `1774 × 887` | must be `8192 × 4096` |
| File format and bytes | existing PNG | pending PNG export |
| SHA-256 | existing dossier | pending |
| Horizontal wrap seam | control | pending |
| Zenith / nadir | control | pending |
| Historical review | prototype | pending |
| Reviewer decision | control only | pending |

## Runtime delivery experiment

Provider selection and runtime delivery are separate decisions. Even though
Skybox produces an 8K master, the first public beta may serve:

- one optimized 4K derivative; or
- a low-resolution preview plus tiled 8K delivery.

Compare both derivatives from the same accepted Skybox master at the same yaw,
pitch, field of view, `1536 × 1024` desktop viewport, and `390 × 844` mobile
viewport. Record cold/warm loading, visual quality, memory behaviour, and
screenshots.

Do not implement the tiled delivery path until the viewer comparison proves
that its visible improvement justifies the additional complexity.

## Superseded OpenAI preview exploration

Earlier built-in OpenAI prompt previews returned `1774 × 887` files and failed
at least one historical or mechanical review gate. They remain experiment
evidence only and are not production candidates. No current game panorama was
overwritten.

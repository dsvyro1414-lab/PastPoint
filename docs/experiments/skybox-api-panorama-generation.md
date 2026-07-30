# Skybox Model 3 experiment archive

## Status

This is archived evidence from the completed Skybox investigation, not an
executable runbook or active product roadmap.

On July 30, 2026, Phase A retired the repository-owned Skybox command and its
untracked executable source. Before removal, the three rejected binary masters
were independently checked against their adjacent manifests for exact path,
byte size, dimensions, SHA-256, and rejection status. They were then moved
individually from the active workspace to recoverable Trash.

The following evidence remains under `artifacts/skybox/`:

- sanitized generation and export response JSON;
- one final manifest for each candidate;
- request IDs, prompts, seeds, output metadata, review outcomes, and findings.

The binary masters are intentionally absent. `artifacts/openai/`, both runtime
panoramas under `public/images/`, and both registered scene files remain
unchanged.

## Conclusion

Skybox Model 3 reliably produced native `8192 × 4096` files, but all three
prompt-only candidates failed the historical or compositional quality gate.
Native resolution was not acceptance evidence.

The experiment established:

- style `67`, `M3 Photoreal`, reported Model 3 prompt limits of `600` and
  `410` characters;
- the authenticated style-discovery request returned 45 Model 3 styles;
- the Wright preflight passed with seed `19031217`, `enhance_prompt: false`,
  and `max_wait: 60`;
- the guarded dry run reported `paidRequestSent: false`;
- Skybox text-to-scene is closed as a production strategy for the hackathon.

No runtime panorama was replaced. The unexecuted `control_image` idea remains a
post-submission research note, not a production dependency.

## Candidate record

| Scene | Generation | Seed | Original bytes | Original SHA-256 | Decision |
| --- | ---: | ---: | ---: | --- | --- |
| Wright brothers' first flight | `15582320` | `19031217` | `19,077,760` | `a2b0d978bf0718c3d35f81e2090ba9aa91b26f3ba7af516bdb7172b993a8b676` | rejected |
| Boston Tea Party v1 | `15582329` | `17731216` | `29,425,205` | `509b92b9d977eed3dd4151bcf84772d78a01090973df1ddaae83abfb6cd56c23` | rejected |
| Boston Tea Party v2 | `15582337` | `17731216` | `34,372,835` | `12d8a2750bf96eece468f99d4cb41b948297d73e2d6f20dc4e9d7a5368103e31` | rejected |

All three original files were PNGs at `8192 × 4096`. Their archived manifests
remain at:

- `artifacts/skybox/wright-brothers-first-flight/15582320/manifest.json`;
- `artifacts/skybox/boston-tea-party/15582329/manifest.json`;
- `artifacts/skybox/boston-tea-party/15582337/manifest.json`.

## Wright brothers' first flight

Prompt:

```text
Ground-level documentary view at Kill Devil Hills, 10:35 a.m. Dec 17 1903; exact 1903 Wright Flyer barely above a straight 60-ft timber monorail: natural-muslin open biplane, forward canard, twin rear rudders, two chain-driven pusher propellers, Orville prone, Wilbur running at right. Cold dunes, simple camp sheds, level horizon, seam through empty sand and sky, photorealistic.
```

Negative prompt:

```text
modern monument, boulder, roads, cars, green lawn, crowd, catapult, aircraft wheels, cockpit, fuselage, upright pilot, modern tail, nose propeller, single rudder, later Flyer, extra wings or propellers, text, watermark, seam, warped anatomy
```

Generation `15582320` was rejected because:

- multiple oversized, duplicated Flyer-like aircraft dominated the panorama;
- Orville, Wilbur, the first-flight action, and the straight launch rail were
  not represented clearly;
- aircraft anatomy and scale failed the scene blueprint;
- a large aircraft crossed the panorama boundary instead of leaving the seam
  over empty sand and sky.

## Boston Tea Party v1

Prompt:

```text
Photorealistic 360° Griffin's Wharf, Boston, night Dec 16 1773; eye-level on timber wharf. Three modest moored merchant vessels, furled sails. Men in 1770s coats, breeches, cloaks, soot-dark faces, few feathers use tackle, split tea chests with hatchets, pour loose tea over rail. Georgian warehouses, crowd, oil lanterns, dark sky, thin crescent. Level horizon; seam over open harbor.
```

Negative prompt:

```text
full moon, warship, cannon, gunports, people in water, intact chests, battle, fire, modern or Victorian city, gas lights, cars, steamships, American flags, war bonnets, Native stereotype, text, watermark, tilted horizon, bad rigging, visible seam
```

Generation `15582329` was rejected because:

- it depicted a modern illuminated waterfront rather than Griffin's Wharf in
  1773;
- the merchant vessels, participants, opened tea chests, and tea-disposal
  action were absent;
- the modern skyline, electric lighting, and contemporary architecture
  violated the negative prompt;
- the scene was not identifiable as the Boston Tea Party.

The Moon wording above is preserved as historical request evidence. Moon phase
was not supported as a material acceptance or rejection gate.

## Boston Tea Party v2

Prompt:

```text
Eye-level ground view on the deck of an eighteenth-century merchant ship at Griffin's Wharf in Boston on 16 December 1773, colonial men in plain coats and breeches split open wooden tea chests with hatchets and pour loose dark tea leaves over the rail, two nearby wooden merchant ships with furled sails beside a timber wharf and Georgian brick warehouses, lantern-lit winter night photorealistic historical documentary reconstruction
```

Negative prompt:

```text
modern skyline and modern waterfront, electric lights cars skyscrapers glass buildings, warships cannons battle fire flags full moon, tourists text watermark duplicated ships deformed people visible seam
```

Generation `15582337` was rejected because:

- the shorter prompt improved period architecture and clothing;
- it produced an enclosed warehouse courtyard rather than a merchant-ship deck
  and harbor;
- water, ships, opened tea chests, and the tea-disposal action were absent;
- repeated static figures and electric-looking lights violated the action and
  negative-prompt contracts.

Prompt simplification alone did not solve the composition.

## Runtime and historical boundary

The rejected candidates never replaced:

- `public/images/boston-tea-party-panorama.png`;
- `public/images/wright-brothers-first-flight-panorama.png`.

The runtime panoramas remain interaction prototypes. Scene facts and acceptance
criteria remain in the [Boston Tea Party dossier](../scenes/boston-tea-party.md)
and the [Wright brothers dossier](../scenes/wright-brothers-first-flight.md).

Historical references used for the Boston review:

- [National Park Service — Boston Tea Party in real time](https://www.nps.gov/articles/000/boston-tea-party-in-real-time.htm)
- [Massachusetts Historical Society teaching source](https://www.masshist.org/2012/juniper/assets/ed-curricula/green_section_5h.pdf)
- [Library of Congress — colonies move toward rebellion](https://www.loc.gov/classroom-materials/united-states-history-primary-source-timeline/american-revolution-1763-1783/colonies-rebellion-1773-1774/)

Provider documentation consulted during the archived experiment:

- [Skybox API getting started](https://api-documentation.blockadelabs.com/api/)
- [Skybox generation and style discovery](https://api-documentation.blockadelabs.com/api/skybox.html)
- [Skybox exports](https://api-documentation.blockadelabs.com/api/skybox-exports.html)

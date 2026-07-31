# Boston Tea Party — scene dossier

## Status

- Gameplay status: round 2 in the ordered scene list.
- Runtime control:
  `public/images/boston-tea-party-panorama.png`.
- Runtime status: accepted replacement after material, wrap, pole, desktop, and
  mobile viewer review on July 31, 2026.
- Runtime generation record:
  [Boston Tea Party runtime v2](./boston-tea-party-runtime-v2-prompt.md).
- OpenAI composition candidate:
  `artifacts/openai/boston-tea-party/2026-07-30/composition-candidate-v1.png`.
- Candidate status: historical composition candidate; superseded by runtime v2.
- Rejected Skybox generations `15582329` and `15582337` remain documented in
  the [archived experiment](../experiments/skybox-api-panorama-generation.md).
  Their manifests and request metadata remain; the checksum-verified binary
  masters were moved from the active workspace to recoverable Trash.
- The original rejected runtime control is preserved in Git history.

## Canonical scene facts

- Event: Boston Tea Party.
- Date: December 16, 1773.
- Place: Griffin's Wharf, Boston, Massachusetts.
- Game coordinates: `42.3515, -71.0514`.
- Three East India Company merchant vessels were involved: the Dartmouth,
  Eleanor, and Beaver.
- At about 6:10 p.m., roughly 150 men split into three groups and boarded the
  ships without resistance.
- Participants opened the cargo hatches, used tackle and rope to bring chests
  up from the holds, broke the chests open with axes, and discharged the tea
  over the rail.
- All 342 chests were destroyed over approximately three hours. The action
  targeted the tea rather than becoming a general attack on the ships or crew.

## Proportional review policy

The scene must communicate the event, not reproduce every incidental condition
as if it were forensic evidence.

Hard blockers:

- the tea-destruction action is absent or materially wrong;
- the vessels read as naval warships rather than merchant ships;
- people swim in the harbor or intact chests are staged as spectacle instead of
  tea being opened and emptied from the ships;
- modern architecture, electric lighting, vehicles, weapons, battle, or fire
  changes the event;
- participants are rendered as a harmful Indigenous caricature;
- the composition is too ambiguous for a player to identify the event.

Soft notes that do not reject a composition by themselves:

- moon phase or whether the Moon is visible;
- exact cloud cover, rain, or water conditions;
- exact crowd size, ship spacing, or lantern count;
- incidental color and lighting choices that do not create an anachronism.

## Material visual blueprint

Required:

- an eye-level view from a merchant-ship deck or Griffin's Wharf;
- modest eighteenth-century cargo vessels with timber hulls, ordinary rigging,
  and furled sails;
- an open cargo hatch, tackle or rope, broken tea chests, axes, and loose tea
  being emptied over a rail;
- ordinary 1770s coats, breeches, cloaks, work caps, and restrained disguises;
- a timber wharf and low Georgian-era waterfront buildings;
- a controlled nighttime work party rather than a battle scene.

Forbidden:

- giant galleons, cannon rows, gunports, or naval battle staging;
- modern or Victorian skyline elements, gas or electric street lighting, cars,
  steamships, flags, logos, or text;
- people in the water, intact chests flying through the air, fire, fighting, or
  attacking soldiers;
- elaborate war bonnets or stereotyped Indigenous costume.

## OpenAI asset inventory

### Runtime v2 — accepted replacement

- Path: `public/images/boston-tea-party-panorama.png`.
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,100,502`.
- SHA-256:
  `5be2ba14d2d4dc1c878fa4dc11a0558b7c954ff509465e1afa613b5f665732a5`.
- Provider: OpenAI through the Codex built-in image-generation interface.
- Model/version and provider generation ID: not exposed by the interface.
- Exact prompt and acceptance evidence:
  [runtime v2 generation record](./boston-tea-party-runtime-v2-prompt.md).

The accepted runtime shows a controlled work party opening tea chests and
emptying loose tea into the harbor from a modest merchant vessel. People remain
on the ship and wharf, the vessel does not read as a warship, and the surrounding
low Georgian waterfront gives the scene an immediately legible colonial-port
context.

### Original runtime control — replaced

- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,602,967`.
- SHA-256:
  `201acc425b3efa8c9d7448b20faa59ae6e8120d23ebe5cf982bf33e61814dc37`.
- First committed in `337caf6`.

The original control was recognizable but failed material gates: the dominant
vessel read as an oversized armed ship, people were shown in the water, and
intact chests became theatrical projectiles. It was replaced on July 31, 2026.

### Composition candidate v1

- Path:
  `artifacts/openai/boston-tea-party/2026-07-30/composition-candidate-v1.png`.
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,211,569`.
- SHA-256:
  `a25c0305f0fea989977cb054cae9cb252e1ee7ab5f1d593d5d87d2fc4d8b85b1`.
- Provider: OpenAI through the Codex built-in image-generation interface.
- Underlying model/version and provider generation ID: not exposed by the
  interface.
- Exact prompt:
  `artifacts/openai/boston-tea-party/2026-07-30/prompt.txt`.
- Sanitized manifest:
  `artifacts/openai/boston-tea-party/2026-07-30/manifest.json`.

The exact prompt is preserved as generation evidence. It was sent before the
review policy was corrected and includes an unnecessary Moon preference; that
line is historical request metadata, not an active acceptance rule.

## Candidate v1 review

| Material check | Internal result | Evidence |
| --- | --- | --- |
| Event recognition | pass | shipboard tea-destruction work party is the focal action |
| Open hatch and tackle | pass | central open hatch and lifting rig are visible |
| Chests opened on deck | pass | workers open and handle chests on the ship |
| Loose tea over the rail | pass | loose dark material is visibly tipped over the starboard rail |
| Merchant rather than naval scene | pass | no cannon row, gunports, or battle staging |
| People kept out of the water | pass | harbor remains clear of swimmers |
| Period clothing and waterfront | pass | clothing and low waterfront buildings read as eighteenth century |
| Harmful stereotype | pass | no elaborate or caricatured Indigenous costume |
| Exact three-ship readability | soft note | three-ship context is not equally legible from the opening composition |
| Obvious modern detail | pass | none found in the internal or independent visual review |

Composition decision: **pass**. An independent visual review confirmed the
event-defining action, merchant-vessel context, period setting, and absence of
the material forbidden details. The candidate remains eligible for future
spherical finishing if that work is separately prioritized after the hackathon.
This is a composition review, not historical certification by a specialist.

## Runtime v2 review

| Gate | Result | Evidence |
| --- | --- | --- |
| Event recognition | pass | people visibly open chests and empty loose tea into the harbor |
| Merchant-ship context | pass | timber cargo vessel, ordinary rigging, no gunports or cannon rows |
| People kept out of water | pass | every participant remains on ship or wharf |
| Period clothing and waterfront | pass | restrained 1770s clothing and low Georgian waterfront |
| Harmful stereotype | pass | no caricatured Indigenous costume |
| Exact `2:1` RGB PNG | pass | `1774 × 887`, no alpha |
| Horizontal wrap | pass | flat edge delta plus full production-viewer sweep |
| Zenith and nadir | pass | simple sky and coherent timber/water geometry without a hole or blurred ring |
| Desktop opening view | pass | accepted at `1280 × 720` |
| Mobile opening view | pass | accepted at `390 × 844` |
| Runtime integration | pass | one viewer canvas, no fallback alert or console error |

The final opening camera is yaw `56°`, pitch `0°`, zoom `71`, centering the
tea-destruction action while keeping the scene usable under both the desktop and
mobile HUD.

## Sources

- [National Park Service — Boston Tea Party Timeline](https://www.nps.gov/articles/000/boston-tea-party-in-real-time.htm)
- [Library of Congress — The Colonies Move Toward Open Rebellion, 1773–1774](https://www.loc.gov/classroom-materials/united-states-history-primary-source-timeline/american-revolution-1763-1783/colonies-rebellion-1773-1774/)
- [Massachusetts Historical Society teaching source](https://www.masshist.org/2012/juniper/assets/ed-curricula/green_section_5h.pdf)

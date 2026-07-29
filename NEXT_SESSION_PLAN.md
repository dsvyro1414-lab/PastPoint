# PastPoint — next development steps

## Current state

The canonical Next.js application contains a two-round playable preview:

`Boston Tea Party -> result -> Wright brothers' first flight -> session restart`

It includes a spherical panorama viewer, local event normalization, year and
location inputs, raw result calculations, replay reset, responsive layout, unit
tests, and a verified production build.

The first reusable-engine slice is now implemented:

- scene-owned initial year and allowed year range;
- scene-owned panorama URL and initial yaw, pitch, and zoom;
- session-owned timer and panorama onboarding;
- a validated scene registry and ordered session definition;
- deterministic replay, next-round, and full-session restart transitions;
- a single round token that resets the map, ruler, timer, panorama, inputs, and
  onboarding cue together;
- unit coverage for configuration validation and multi-round state transitions.

Boston and the Wright brothers' first flight are both registered and use the
same HUD. The second scene includes a research dossier and generated
equirectangular prototype, but neither panorama is yet a historically certified
production master.

Boston is the first technical template, not the final product scope. The target
sequence is:

`game engine -> scene pipeline -> multiple locations -> complete game session`

## Next objective

Build the rapid scene pipeline described below, then make the reusable engine a
release-gated contract with repository-owned browser coverage and an
accessibility pass. New scenes should be versioned data and reviewed assets, not
copies of the Boston-specific interface.

## Next session — rapid scene pipeline

Before the deadline, design and implement a repeatable pipeline that can add a
historical location without rewriting the interface. An API-backed workflow is
allowed. The pipeline should turn reviewed sources into a versioned scene
package, generate or ingest a panorama, validate metadata and assets, and
produce a registry-ready scene only after review gates pass.

### Required panorama quality A/B test

Before replacing either current prototype, test both source-level upgrade
approaches against the same reviewed scene blueprint, historical references,
camera framing, and acceptance checklist:

1. [ ] **OpenAI high-quality generation**
   - use [OpenAI Image Generation](https://developers.openai.com/api/docs/guides/image-generation);
   - request an exact `3840 × 1920` (`2:1`) image with `quality: high`;
   - treat the result as a new historical reconstruction that must pass the
     complete historical, projection, seam, pole, and nadir review.
2. [ ] **Native 360° generation**
   - test a generator designed for equirectangular panoramas, initially
     [Skybox AI](https://api-documentation.blockadelabs.com/api/skybox.html);
   - target a true `8192 × 4096` (`8K`, `2:1`) panorama with a clean horizontal
     seam;
   - apply the same historical review even if projection and seam quality are
     better by construction.

Keep the current panorama unchanged as the control. Compare both candidates in
the production viewer at identical yaw, pitch, field of view, desktop viewport,
and mobile viewport. Record model/version, prompt and references, checksum,
file size, load behaviour, seam/pole results, historical findings, and rendered
screenshots. Do not select a replacement on sharpness alone.

## Before public production — start screen

Add a lightweight start screen after the playable HUD is accepted:

- a one-sentence description of PastPoint and the three-part guess;
- a mode selector driven by session definitions, with only implemented modes
  enabled;
- one primary `Start game` action;
- concise panorama, map, and year-control instructions;
- an explicit prototype / generated historical reconstruction notice.

Keep this presentation layer separate from the game session engine so adding a
mode or scene remains a configuration change rather than a HUD rewrite.

## Priority 1 — reusable game engine

1. [x] Move the initial year, allowed year range, round number, timer duration,
   and panorama onboarding settings into scene or session configuration.
2. [x] Add a scene registry and deterministic session state that can advance,
   replay, and restart several rounds.
3. [x] Keep raw facts as the stable result contract:
   - event correctness;
   - year difference;
   - geographic distance.
4. [ ] Add repository-owned browser coverage for:
   - incomplete-answer validation;
   - event, year, and map interaction;
   - result facts and both map markers;
   - full replay reset;
   - transition to another scene.
5. [ ] Run an accessibility pass for focus order, keyboard use, contrast, map
   controls, and reduced motion.

## Priority 2 — scene production pipeline

Define one versioned scene package containing:

- a source dossier and citations;
- a structured blueprint with required and forbidden details;
- event metadata and accepted aliases;
- camera and location data;
- a prepared explanation;
- panorama provenance, licence, and review status;
- automated schema and asset validation.

The panorama stage should produce a true equirectangular asset, ideally
`4096 × 2048`, and verify:

- horizontal seam continuity;
- level horizon and correct spherical projection;
- poles and nadir;
- historical details such as clothing, architecture, vehicles, and props;
- absence of modern or invented identifying details.

The current Boston and Wright images remain prototypes until they pass this
process.

## Priority 3 — prove scale with content

1. Run Boston through the pipeline and record its review evidence.
2. [x] Add a second event without changing the HUD implementation.
3. Expand to several reviewed scenes.
4. Build a complete session around those scenes.
5. Introduce scoring only after the raw result contract and multi-round flow are
   stable; the absence of scoring is a vertical-slice constraint, not a
   permanent product rule.

## Delivery polish

- Lazy-load the map and panorama viewer to reduce the initial client bundle.
- Add an offline basemap fallback or a deliberate map-empty state.
- Verify every scene at `1536 × 1024` and a narrow mobile viewport.
- Keep lint, unit tests, browser checks, and the production build as release
  gates.

## Definition of done for the next milestone

- The round UI is driven by reusable scene/session configuration.
- The scene package has a versioned schema and validation command.
- Boston has provenance and historical-review records.
- A second reviewed scene runs through the same engine.
- Automated unit and browser checks cover replay and scene transition.
- Lint, tests, browser checks, and production build all pass.

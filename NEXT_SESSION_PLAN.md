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

Build a repository-owned Skybox AI API generation lane and use the Wright scene
to produce and review one native 8K master. Then choose the runtime delivery
format from that accepted master and make the reusable engine a release-gated
contract with browser coverage and an accessibility pass.

## Next session — Skybox API panorama pipeline

Skybox AI API is now the canonical panorama generator. Generation happens
offline before publication, never in the browser or during a player session.
`SKYBOX_API_KEY` stays in ignored `.env.local`, is sent only through the
server-side `x-api-key` header, and must never be logged or exposed through a
`NEXT_PUBLIC_` variable.

The pipeline should turn reviewed sources into a versioned scene package,
generate a native `8192 × 4096` Model 3 master, validate metadata and assets,
and produce a registry-ready scene only after review gates pass.

The API endpoints, copy-paste prompts, security contract, rejection gates, and
result manifest are recorded in
[the Skybox API panorama runbook](docs/experiments/skybox-api-panorama-generation.md).

### Required first API run

1. [ ] Implement an offline repository command that discovers Model 3 styles,
   validates prompt limits, and fails closed before any paid request.
2. [ ] Select and record a neutral photorealistic Model 3 style.
3. [ ] Generate exactly one Wright candidate with the reviewed prompt,
   `enhance_prompt: false`, and a fixed non-zero seed.
4. [ ] Poll the request, export an equirectangular PNG at `8192 × 4096`, and
   save the immutable master plus a sanitized provenance manifest.
5. [ ] Verify exact dimensions, checksum, seam, horizon, poles, nadir, aircraft
   anatomy, and absence of modern details.
6. [ ] Only after the master passes, compare an optimized 4K derivative with
   preview-plus-tiles 8K delivery in the production viewer.

Keep the current panorama unchanged as the control. Do not automatically spend
credits on several candidates; review the first result before another paid
generation. OpenAI 4K remains an optional fallback benchmark and no longer
blocks the Skybox pipeline.

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

The canonical panorama stage uses the offline Skybox AI API lane to produce an
immutable native `8192 × 4096` master plus a sanitized manifest. Runtime assets
are derived only after that master passes review. Verify:

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
- The offline Skybox command discovers Model 3 styles, validates prompts, and
  requires explicit confirmation before a paid generation.
- One Wright `8192 × 4096` master and sanitized provenance manifest pass the
  technical and historical review gates.
- The viewer test records an explicit decision between a 4K runtime derivative
  and preview-plus-tiles 8K delivery.
- The scene package has a versioned schema and validation command.
- Boston has provenance and historical-review records.
- A second reviewed scene runs through the same engine.
- Automated unit and browser checks cover replay and scene transition.
- Lint, tests, browser checks, and production build all pass.

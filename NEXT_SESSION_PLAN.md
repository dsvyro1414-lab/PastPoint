# PastPoint — next development steps

## Current state

The canonical Next.js application contains one complete Boston Tea Party
vertical slice:

`360 scene -> enter event -> select year -> place marker -> submit -> result`

It includes a spherical panorama viewer, local event normalization, year and
location inputs, raw result calculations, replay reset, responsive layout, unit
tests, and a verified production build.

Boston is the first technical template, not the final product scope. The target
sequence is:

`game engine -> scene pipeline -> multiple locations -> complete game session`

## Next objective

Extract a reusable round engine and prove the content workflow with a second
historical scene. New scenes should be data and reviewed assets, not copies of
the Boston-specific interface.

## Priority 1 — reusable game engine

1. Move the initial year, allowed year range, round number, timer duration, and
   panorama onboarding settings into scene or session configuration.
2. Add a scene registry and deterministic session state that can advance,
   replay, and restart several rounds.
3. Keep raw facts as the stable result contract:
   - event correctness;
   - year difference;
   - geographic distance.
4. Add repository-owned browser coverage for:
   - incomplete-answer validation;
   - event, year, and map interaction;
   - result facts and both map markers;
   - full replay reset;
   - transition to another scene.
5. Run an accessibility pass for focus order, keyboard use, contrast, map
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

The current Boston image remains a prototype until it passes this process.

## Priority 3 — prove scale with content

1. Run Boston through the pipeline and record its review evidence.
2. Add a second event without changing the HUD implementation.
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

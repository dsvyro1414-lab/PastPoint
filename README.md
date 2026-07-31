# PastPoint

PastPoint is a GeoGuessr-style history game. Players explore a spherical
historical reconstruction and determine what happened, where it happened, and
when.

## Hackathon target

The hackathon MVP is a complete session with at least **10 playable historical
rounds**. The release-gate session now contains all 10; two extra rounds remain
optional stretch work rather than a blocker.

The current ordered session contains:

1. fall of Constantinople;
2. Boston Tea Party;
3. adoption of the Declaration of Independence;
4. Storming of the Bastille;
5. Wright brothers' first powered flight;
6. sinking of RMS Titanic;
7. attack on Pearl Harbor;
8. first ascent of Mount Everest;
9. Vostok 1 and the first human spaceflight;
10. Apollo 11 Moon landing.

All rounds use the same reusable session engine and HUD. Scene preparation is
manual for the hackathon; a stable automated generation pipeline is
deliberately postponed.

## Current gameplay

- begin with a short explanation of the three-part challenge and controls;
- rotate and zoom a full-screen 360° panorama;
- enter the event name without answer choices;
- select a year on a draggable ruler;
- place a marker on the world map, with one explicit Moon choice for the
  off-world Apollo 11 round;
- submit only after all three inputs are complete;
- review event correctness, year difference, geographic distance, and a
  prepared explanation;
- advance to the next scene or restart the complete session.

The current build has no authentication, leaderboard, backend, database, or
runtime AI request.

## Run locally

The project uses Node.js 20.19 or Node.js 22.12+ and pnpm 11.9.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Quality checks:

```bash
pnpm lint
pnpm test
pnpm build
```

Development and production builds use Next.js Webpack mode because the current
WebGL panorama dependency can stall the Next.js 16 Turbopack compiler.

Panorama assets are local. The world map uses online CARTO basemap tiles, so
location guessing requires a network connection.

## Project structure

```text
src/app/
  page.tsx                 loads the ordered scene list
src/features/game/
  *.ts                     individual scene data and game components
  scenes.ts                ordered 10-scene readonly list
  session-state.ts         advance and full-session restart state
  model.ts                 scene, answer, and result types
  logic.ts                 answer normalization and distance calculation
  PastPointGame.tsx        session HUD and submit flow
  PanoramaViewer.tsx       spherical viewer adapter
  MapCanvas.tsx            Leaflet map adapter
  YearRuler.tsx            draggable year control
  ResultPanel.tsx          round result state
```

Scene data is separate from the interface. New rounds should be added as local
assets and scene configuration, without rewriting the HUD.

## Panorama status

Boston now uses an accepted replacement `1774 × 887` panorama; its original
interaction prototype remains only in Git history. Wright remains an
interaction prototype with a documented non-blocking aircraft-anatomy review.
The other eight panoramas are generated hackathon candidates. All ten runtime
assets pass opening-view smoke, and the higher-risk Constantinople, Boston,
Declaration, Bastille, Titanic, and Everest scenes also passed targeted
production-viewer wrap and pole review. The Apollo scene passes its distinct
Moon-specific input and result path. Native 4K or 8K output is not a submission
requirement.

Scene-specific facts and review notes live in:

- [Boston Tea Party dossier](./docs/scenes/boston-tea-party.md);
- [Wright brothers dossier](./docs/scenes/wright-brothers-first-flight.md);
- [ordered 10-round scene slate](./docs/scenes/scene-slate.md).

The completed Skybox provider investigation is preserved as
[archived experiment evidence](./docs/experiments/skybox-api-panorama-generation.md).
Its executable tooling and rejected binary masters were retired after checksum
verification; the JSON manifests and textual findings remain archived. It is
not the active product roadmap.

## Project documents

- [Product concept](./CONCEPT.md)
- [Hackathon MVP plan](./HACKATHON_MVP_PLAN.md)
- [Agent execution plan](./AGENT_EXECUTION_PLAN.md) — current ordered handoff
- [Latest manual design and interaction QA](./design-qa.md)

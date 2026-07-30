# PastPoint

PastPoint is a GeoGuessr-style history game. Players explore a spherical
historical reconstruction and determine what happened, where it happened, and
when.

## Hackathon target

The hackathon MVP is a complete session with at least **10 playable historical
rounds**. The working target is 12 scenes.

The project currently contains two playable prototype rounds:

1. Boston Tea Party;
2. Wright brothers' first powered flight.

Both use the same reusable session engine and HUD. Before submission, content
may be prepared manually. A stable automated scene-generation pipeline is
deliberately postponed until after the hackathon.

## Current gameplay

- begin with a short explanation of the three-part challenge and controls;
- rotate and zoom a full-screen 360° panorama;
- enter the event name without answer choices;
- select a year on a draggable ruler;
- place a marker on the world map;
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
  boston-tea-party.ts      first scene data
  wright-brothers-first-flight.ts
                           second scene data
  scenes.ts                ordered readonly scene list
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

The two current `1774 × 887` panoramas are interaction prototypes. Hackathon
scenes need to be recognizable, free of material visual failures, and usable in
the existing viewer; native 4K or 8K output is not a submission requirement.

Scene-specific facts and review notes live in:

- [Boston Tea Party dossier](./docs/scenes/boston-tea-party.md);
- [Wright brothers dossier](./docs/scenes/wright-brothers-first-flight.md).

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

# PastPoint

PastPoint is a GeoGuessr-style history game. Players explore a spherical
historical reconstruction from one fixed viewpoint and determine what happened,
where it happened, and when.

The current preview contains two playable rounds:

1. the Boston Tea Party;
2. the Wright brothers' first powered flight.

Both rounds run through the same reusable session engine and HUD.

## Current gameplay

- rotate and zoom a full-screen 360° equirectangular panorama;
- enter the event name without answer choices;
- select a year on a draggable `1500–2000` ruler;
- place and move a marker on an interactive world map;
- submit only after all three inputs are complete;
- review event correctness, year difference, geographic distance, and the
  prepared scene explanation;
- replay the current round or advance to the next scene;
- restart the complete session after the final result.

There is no scoring, authentication, leaderboard, backend, database, or runtime
AI request in this slice.

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

Both development and production builds use Next.js' Webpack mode because the
current WebGL panorama dependency can stall the Next.js 16 Turbopack compiler.

## Project structure

```text
src/app/
  page.tsx                 loads the current preview session
src/features/game/
  boston-tea-party.ts      scene content and accepted answers
  wright-brothers-first-flight.ts
                           second scene content and round configuration
  scene-registry.ts        validated scene registry and session definition
  session-state.ts         deterministic round replay/advance/restart state
  model.ts                 scene, answer, and result types
  logic.ts                 normalization and Haversine distance
  PastPointGame.tsx        configured session HUD and submit flow
  PanoramaViewer.tsx       spherical 360° viewer adapter
  MapCanvas.tsx            Leaflet map adapter
  GuessMapPanel.tsx        floating location UI
  YearRuler.tsx            draggable/scrollable year control
  ResultPanel.tsx          submitted answer and result state
  game.module.css          HUD design system and responsive layout
```

Scene data is deliberately separate from the interface. The Wright scene was
added through a new scene object, a panorama, and a registry entry without
rewriting the game HUD. Each scene also owns its initial panorama yaw, pitch,
and zoom so its identifying evidence opens in a useful frame.

## Panorama asset status

Both panoramas are temporary `1774 × 887` equirectangular assets for interaction
development. They are not yet historically certified production masters. Final
content should ideally be `4096 × 2048`, checked for historical accuracy,
spherical projection quality, and a clean horizontal seam before publication.
Until a higher-resolution master is accepted, the viewer limits maximum zoom
to a `60°` vertical field of view while preserving the existing opening
framing.

The Wright research, provenance, visual constraints, and current validation are
recorded in
[its scene dossier](./docs/scenes/wright-brothers-first-flight.md).

See [CONCEPT.md](./CONCEPT.md) for the product concept,
[GAME_FIRST_DIRECTION.md](./GAME_FIRST_DIRECTION.md) for the game-first product
direction, and [NEXT_SESSION_PLAN.md](./NEXT_SESSION_PLAN.md) for the next
development sequence.

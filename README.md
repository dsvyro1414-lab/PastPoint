# PastPoint

PastPoint is a GeoGuessr-style history game. Players explore a spherical
historical reconstruction from one fixed viewpoint and determine what happened,
where it happened, and when.

The current vertical slice contains one playable round: the Boston Tea Party.

## Current gameplay

- rotate and zoom a full-screen 360° equirectangular panorama;
- enter the event name without answer choices;
- select a year on a draggable `1500–2000` ruler;
- place and move a marker on an interactive world map;
- submit only after all three inputs are complete;
- review event correctness, year difference, geographic distance, and the
  prepared scene explanation;
- reset the entire round with `Play again`.

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
  page.tsx                 loads the current scene
src/features/game/
  boston-tea-party.ts      scene content and accepted answers
  model.ts                 scene, answer, and result types
  logic.ts                 normalization and Haversine distance
  PastPointGame.tsx        round state and submit/reset flow
  PanoramaViewer.tsx       spherical 360° viewer adapter
  MapCanvas.tsx            Leaflet map adapter
  GuessMapPanel.tsx        floating location UI
  YearRuler.tsx            draggable/scrollable year control
  ResultPanel.tsx          submitted answer and result state
  game.module.css          HUD design system and responsive layout
```

Scene data is deliberately separate from the interface. A later historical
location should require a new scene object and a reviewed 2:1 panorama, not a
rewrite of the game HUD.

## Panorama asset status

`public/images/boston-tea-party-panorama.png` is a temporary 2:1
equirectangular asset for interaction development. It is not yet the
historically reviewed final panorama. Final content should ideally be
`4096 × 2048`, checked for historical accuracy, spherical projection quality,
and a clean horizontal seam before publication.

See [CONCEPT.md](./CONCEPT.md) for the product concept,
[GAME_FIRST_DIRECTION.md](./GAME_FIRST_DIRECTION.md) for the game-first product
direction, and [NEXT_SESSION_PLAN.md](./NEXT_SESSION_PLAN.md) for the next
development sequence.

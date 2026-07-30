# PastPoint

## Product

PastPoint is a GeoGuessr-style history game. The player explores a panoramic
reconstruction of a historical event and determines:

- what happened;
- when it happened;
- where it happened.

The game is based on visual investigation rather than a text quiz. Clothing,
architecture, transport, objects, landscape, and human activity should provide
enough evidence to make an informed guess.

## Core round

1. Explore a full-screen 360° scene from one fixed viewpoint.
2. Enter the event name without answer choices.
3. Select a year on the horizontal year ruler.
4. Place a marker on the world map.
5. Submit the answer.
6. Review the correct event, year difference, geographic distance, and a short
   prepared explanation.
7. Continue to the next round.

The interface stays secondary to the scene. There is no walking, runtime chat,
or required interaction with clue hotspots.

## Hackathon MVP

The hackathon MVP is a complete playable game session with **at least 10
distinct historical rounds**.

The operational target is 12 rounds so that one or two weak scenes can be
removed without falling below the release gate. A broad, coherent session is
more important before submission than one perfect scene or a sophisticated
content-production system.

The MVP includes:

- a short start screen and clear instructions;
- at least 10 registered and playable scenes;
- the event, year, and location guess in every round;
- deterministic transitions through the complete session;
- per-round facts and explanations;
- a final session-complete state and full restart;
- local assets with no generation request during gameplay;
- desktop support and a usable narrow-screen layout.

The MVP does not require:

- a stable or automated scene-generation pipeline;
- a specific image provider;
- native 8K masters, tiled delivery, or automated spherical finishing;
- accounts, profiles, leaderboards, or multiplayer;
- a backend, database, or analytics;
- runtime AI judging;
- Classic and Expert modes;
- a complex scoring system.

A simple aggregate score may be added only after 10 complete rounds work from
start to finish. Raw facts remain the stable result contract.

## Scene quality bar

Every hackathon scene must:

- communicate a recognizable event through multiple visual clues;
- use the correct year, location, accepted aliases, and explanation;
- avoid obvious modern anachronisms and harmful stereotypes;
- use a local 2:1 panorama that remains readable at the runtime zoom level;
- avoid a disruptive horizontal seam or projection failure in normal play;
- open with useful evidence in view;
- pass a short manual round smoke test.

Production-grade historical certification is not required before the hackathon,
but obvious factual failures must not be knowingly presented as correct.

When a scene is difficult to generate, the preferred response before submission
is to replace the event with a more visually achievable one, not to build new
infrastructure.

## Role of AI

AI helps create scene compositions, visual blueprints, aliases, and prepared
explanations. This work happens before publication.

The player interacts with the game, not with an AI assistant. Provider choice,
generation automation, upscaling, provenance tooling, and batch production are
implementation concerns rather than the product itself.

Before the hackathon, content may be produced manually or with lightweight
batch assistance. A stable high-volume pipeline is a post-submission project.

## Product principles

- The scene comes before the interface.
- The player investigates before answering.
- The event must be visually identifiable.
- A finished 10+ round session beats a perfect single scene.
- Manual content work is acceptable for the hackathon.
- Technical infrastructure must solve an immediate game need.
- Historical credibility matters, but review depth stays proportional to the
  submission.
- AI scales the content; it is not the player-facing experience.

## After the hackathon

Post-submission development may add:

- a versioned and automated scene-production pipeline;
- stronger historical review and provenance;
- higher-resolution masters and optimized delivery;
- more events and curated collections;
- scoring, Classic and Expert modes, and daily sessions;
- accounts, leaderboards, friend rooms, and multiplayer;
- multi-panorama historical routes;
- an internal Scene Studio.

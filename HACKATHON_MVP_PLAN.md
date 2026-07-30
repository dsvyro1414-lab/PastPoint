# PastPoint — Hackathon MVP Plan

## Locked direction

The submission must contain a complete playable session with **at least 10
historical rounds**.

Until submission:

- game breadth and session completeness come first;
- scene preparation may remain manual;
- the project will not build a stable high-volume generation pipeline;
- no provider, 8K, tiling, or provenance system is a release dependency.

The working target is 12 scenes. The hard release gate is 10.

Detailed task order, active-stage status, and agent handoffs live in
`AGENT_EXECUTION_PLAN.md`. This document owns MVP scope and release gates; the
execution plan owns the current task sequence.

## Current baseline

The application currently has:

- two playable rounds: Boston Tea Party and the Wright brothers' first flight;
- one reusable data-driven session engine;
- a lightweight start screen with the complete control instructions;
- event, year, and map input;
- raw event correctness, year difference, and geographic distance;
- next-round, explicit session-complete, and full restart transitions;
- concise panorama and online-map failure guidance;
- responsive desktop and mobile layouts;
- unit tests and a previously completed manual browser regression.

Both runtime panoramas are prototypes. They prove interaction and engine reuse,
but they still need a quick submission-focused content decision.

## Definition of the MVP

The MVP is complete when:

- at least 10 unique scenes are registered;
- a player can start a new session and finish every round;
- no answer, map, panorama, or reset state leaks into the next round;
- every round has a local panorama, metadata, aliases, year, location, and
  explanation;
- every scene passes the hackathon quality bar in `CONCEPT.md`;
- the final round ends in a clear session-complete state;
- the complete session can be restarted;
- desktop play is accepted and mobile has no blocking layout defect;
- lint, unit tests, production build, and a manual full-session browser run pass;
- the public README and submission material describe the actual product.

## Explicit non-goals before submission

- Stable or automated scene generation.
- Provider API research as a product milestone.
- Mandatory 4K or 8K masters.
- Automated seam repair, upscaling, or tiled delivery.
- Production-grade scene certification.
- Scene Studio.
- Authentication, persistence, backend, or database.
- Leaderboards or multiplayer.
- Classic and Expert modes.
- Sophisticated fuzzy or runtime-AI answer judging.
- Complex scoring.
- Repository-owned browser automation, unless all submission gates are already
  complete.

## Complete-round contract

A round is submission-ready when it has:

1. A distinct historical event.
2. A local 2:1 panorama that loads in the existing viewer.
3. Several visible clues that make the event reasonably identifiable.
4. No obvious anachronism, harmful stereotype, or projection failure that
   changes the meaning of the scene.
5. Correct event name, aliases, date/year, coordinates, and location label.
6. A concise prepared explanation.
7. A useful initial camera position and year range.
8. Successful event, year, map, submit, result, and next-round interaction.
9. A recorded manual desktop smoke-test result.

One or two authoritative sources are enough for the pre-submission scene brief.
Long production dossiers and expert certification can follow after the
hackathon.

## Round slate

The event list must be locked before scene production begins. Prefer events with
strong visual anchors, geographic variety, different eras, and a realistic
chance of producing a readable panorama quickly.

| Round | Event | Asset | Metadata | Registered | Smoke test | Status |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Boston Tea Party | prototype | ready | yes | passed previously | needs submission asset decision |
| 2 | Wright brothers' first flight | prototype | ready | yes | passed previously | needs quick content review |
| 3 | TBD | missing | missing | no | no | backlog |
| 4 | TBD | missing | missing | no | no | backlog |
| 5 | TBD | missing | missing | no | no | backlog |
| 6 | TBD | missing | missing | no | no | backlog |
| 7 | TBD | missing | missing | no | no | backlog |
| 8 | TBD | missing | missing | no | no | backlog |
| 9 | TBD | missing | missing | no | no | backlog |
| 10 | TBD | missing | missing | no | no | release gate |
| 11 | TBD | missing | missing | no | no | target buffer |
| 12 | TBD | missing | missing | no | no | target buffer |

## Manual content workflow

For each new round:

1. Choose an event with clear visual anchors.
2. Record the correct year, location, aliases, one or two sources, three to five
   required clues, and obvious forbidden details.
3. Produce the fastest usable 2:1 scene with the available tools.
4. Review event readability and reject only material failures.
5. Timebox generation attempts. If the scene remains weak, change the event
   instead of extending the tooling.
6. Add the scene object, local asset, and ordered session entry.
7. Run the complete-round checklist.
8. Update the round slate.

This is intentionally a manual workflow. Repetition is acceptable; automation
is not the milestone.

## Execution order

### 0. Complete the cleanup handoff

Follow Phase A of `AGENT_EXECUTION_PLAN.md` before starting new product or
content work. The cleanup phase removes obsolete provider tooling, unused
dependencies, decorative behaviour, and fixed-session abstractions. It must pass
its own validation gate before this plan continues.

### 1. Close only blocking session gaps

- Add a lightweight start screen with the three-part guess and controls.
- Add a clear final session-complete state and restart.
- Do not redesign the working round HUD.

### 2. Lock the content slate

- Select 10 required events plus two backup events.
- Reject events that depend on readable text, exact faces, or fragile geometry.
- Balance era, region, visual setting, and difficulty.

### 3. Produce scenes in small batches

- Work in batches of two or three scenes.
- Integrate each batch immediately.
- Run the full session after each batch.
- Replace stubborn events instead of building a provider-specific solution.

### 4. Reach the 10-round gate

- Register at least 10 unique scenes.
- Verify deterministic progression through all rounds.
- Verify fresh event, year, map, and panorama state.
- Keep rounds 11 and 12 only when they do not threaten the release gate.

### 5. Submission QA

- Run lint, unit tests, and the production build.
- Complete one desktop browser run from start to final restart.
- Smoke-test every scene at the default camera view.
- Check a narrow mobile viewport for blocking overlap or clipping.
- Check console output and failed asset/network states.
- Remove secrets, confirm all panorama assets are local, and document the map
  tile network dependency.

### 6. Submission presentation

- Update screenshots and the README.
- Record a concise demo that shows scene exploration, all three guesses, result,
  and multi-round progression.
- Describe the manual MVP workflow honestly.
- Present the stable generation pipeline as future scalability work.

## Stop rules

Before submission:

- do not run another provider comparison unless no existing tool can produce a
  usable scene;
- do not make 8K a blocker;
- do not build automated generation, finishing, or provenance infrastructure;
- do not polish one scene while the session has fewer than 10 playable rounds;
- do not add a new game system until it directly unblocks the complete session;
- do not keep a historically or visually broken event when replacing it is
  faster.

## Stretch work

Only after the 10-round release gate:

- simple deterministic scoring;
- aggregate session statistics;
- extra rounds;
- non-blocking visual polish;
- repository-owned browser automation;
- deeper accessibility improvements.

## Post-submission backlog

- Versioned scene packages and automated validation.
- Reproducible generation, correction, and finishing.
- Provider evaluation and fallback strategy.
- Provenance, checksums, licensing, and review automation.
- 4K/8K masters, previews, and tiled delivery.
- Expert historical review.
- Scene Studio and high-volume content operations.
- Scoring, modes, daily sessions, accounts, and social systems.

## Current execution

The active stage and next action are maintained only in
`AGENT_EXECUTION_PLAN.md`.

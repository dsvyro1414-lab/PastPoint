# PastPoint — Agent Execution Plan

## Authority and scope

This is the authoritative next-session handoff for agents.

Document hierarchy:

1. `CONCEPT.md` defines the product.
2. `HACKATHON_MVP_PLAN.md` defines the submission scope.
3. This file defines the required execution order.

The order is locked:

`cleanup and simplification -> minimal product additions -> 8+ new rounds -> submission QA`

Agents must not mix these stages. Complete and validate the current stage before
starting the next one.

Active stage: **Phase D release QA and the submission content gate are complete.
Commit, push, production deployment, and Devpost publication were explicitly
authorized and are in progress**.

## Starting state

- Canonical checkout: `/Users/davidskroba/Projects/PastPoint`.
- Current Git branch: `main`.
- Current committed HEAD at handoff creation: `2c0649b`.
- The working tree is intentionally dirty.
- Product-document changes in `CONCEPT.md`, `README.md`,
  `HACKATHON_MVP_PLAN.md`, and the removal of the obsolete planning files are
  intentional and must be preserved.
- `.gitignore`, `package.json`, `artifacts/`, `scripts/`, and the Boston dossier
  also contain uncommitted pipeline-era work that Phase A must resolve.
- There are no intended uncommitted changes under `src/` at handoff creation.

Before any edit:

1. Verify the real working directory.
2. Read `CONCEPT.md`, `HACKATHON_MVP_PLAN.md`, this file, and `README.md`.
3. Inspect `git status --short --branch`, the complete diff, and all untracked
   paths.
4. Preserve unrelated user work.
5. Never use `git reset --hard`, `git clean`, or a broad checkout command.
6. Do not commit or push unless the user explicitly requests it.

## Global stop rules

- Do not call Skybox, OpenAI, or another generation provider during cleanup.
- Do not run a paid generation command.
- Do not add a new provider integration.
- Do not build a content pipeline, schema framework, mode system, router-based
  start flow, persistence layer, scoring system, or browser-test framework.
- Do not redesign the working HUD.
- Do not replace the current runtime panoramas during Phase A.
- Use a recoverable Trash operation for untracked scripts and generated
  artifacts after their exact paths and runtime references have been verified.
- If a target differs from the paths documented below, stop and report the
  mismatch instead of widening the deletion scope.

# Phase A — Cleanup and simplification

Phase A is the only implementation stage authorized for the next cleanup
session. Do not begin Phase B in the same run unless the user explicitly asks to
continue after reviewing the Phase A handoff.

## A0. Record the cleanup baseline

Record:

- Git status and diff;
- file counts and sizes under `scripts/skybox/` and `artifacts/`;
- current package scripts and dependencies;
- the two-round gameplay baseline;
- the current test, lint, and build status if the required local toolchain is
  available.

Do not treat a pre-existing failure as a cleanup regression.

## A1. Remove provider-specific tooling and generated artifacts

The Skybox experiment is complete and is not part of the hackathon MVP.

After confirming that no runtime source imports these paths:

1. Recompute and compare the adjacent manifest checksum for each rejected
   Skybox binary:
   - `artifacts/skybox/boston-tea-party/15582329/master-8k.png`;
   - `artifacts/skybox/boston-tea-party/15582337/master-8k.png`;
   - `artifacts/skybox/wright-brothers-first-flight/15582320/master-8k.png`.
2. Confirm that every adjacent final manifest still marks the candidate as
   rejected.
3. Move those three exact PNG files to Trash individually. Do not target a
   directory or wildcard, and do not empty Trash.
4. Preserve the small Skybox JSON manifests and request metadata as archived
   evidence.
5. Preserve `artifacts/openai/`. Its composition is non-runtime evidence that
   may be reconsidered after submission.
6. Remove the `skybox` command from `package.json`.
7. Update the archived runbook to say that the executable source is being
   retired and that the rejected binary masters were removed from the active
   workspace after checksum verification.
8. Move the exact `scripts/skybox/` directory to Trash only after removing its
   package entrypoint and confirming that `src/` has no import or runtime
   dependency on it.
9. Replace the Skybox-specific artifact ignores in `.gitignore` with one
   provider-neutral `/artifacts/` rule.
10. Keep `docs/experiments/skybox-api-panorama-generation.md` as compact
    archived evidence.
11. Update the archived experiment and Boston dossier so they do not claim that
    trashed binaries or executable sources still exist. Preserve useful IDs,
    prompts, hashes, outcomes, and rejection reasons in text.

Do not remove:

- `public/images/boston-tea-party-panorama.png`;
- `public/images/wright-brothers-first-flight-panorama.png`;
- either registered scene file;
- source references or review conclusions.

Acceptance:

- `scripts/skybox/` no longer exists in the active project;
- the three rejected Skybox 8K binaries no longer exist at their source paths;
- manifests and OpenAI evidence remain intact under ignored `artifacts/`;
- `package.json` exposes no paid provider command;
- no Markdown link or instruction depends on a removed artifact;
- no runtime import or asset URL is broken.

Stop without deleting a target if its checksum, review decision, tracked state,
runtime references, or exact path differs from this plan. If Trash fails, do not
fall back to `rm`.

## A2. Remove unused scaffold dependencies

The application uses CSS Modules, not Tailwind utilities.

1. Remove `@import "tailwindcss"` from `src/app/globals.css`.
2. Remove `tailwindcss` and `@tailwindcss/postcss` from `devDependencies`.
3. Update `pnpm-lock.yaml` using pnpm rather than editing dependency blocks by
   hand.
4. Delete `postcss.config.mjs` if it contains only the Tailwind plugin.
5. Delete `next.config.ts` if it remains an empty placeholder.

Acceptance:

- no Tailwind import or dependency remains;
- plain global CSS and CSS Modules still compile;
- dependency installation and production build still succeed.

## A3. Remove non-essential game behaviour

### Remove the decorative timer

The timer reaches zero without changing the round. The MVP will be untimed.

Remove:

- `src/features/game/CountdownTimer.tsx`;
- timer rendering in `PastPointGame.tsx`;
- `timerDurationSeconds` from session types and configuration;
- timer validation and tests;
- timer-only CSS and icon imports.

Do not replace it with timeout semantics.

### Remove per-round replay

The hackathon session is linear.

- Remove the `replay-round` action.
- Remove the replay button and single-round compatibility labels.
- Keep `Next round` for non-final rounds.
- Keep full-session restart after the final round.
- Update reducer tests and factual documentation.

### Remove one duplicate map reset control

`GuessMapPanel` currently exposes two controls that call `resetView()`. Keep one
clear reset action and remove the duplicate markup, icon import, and related CSS
only.

### Preserve onboarding until Phase B

Do not remove the 360° onboarding cue during Phase A. It remains the only
in-product instruction until the start screen exists.

## A4. Simplify the fixed-session scene architecture

The hackathon has one ordered session. It does not need string IDs to be resolved
through a separate runtime registry.

Target structure:

```text
individual scene files
  -> scenes.ts with one ordered readonly Scene[]
  -> PastPointGame
  -> session-state reducer
```

Required changes:

1. Keep one file per scene.
2. Add `src/features/game/scenes.ts` with one ordered scene array.
3. Pass the ordered scenes directly to `PastPointGame`.
4. Remove `GameSessionDefinition`, `ResolvedGameSession`,
   `PanoramaOnboarding`, the lookup registry, and string-based session
   resolution.
5. Keep per-scene year range and initial panorama view.
6. Keep the pure session reducer and `roundToken` reset mechanism.
7. Replace the large registry test suite with one compact table-driven scene
   integrity test.

The integrity test should check only immediate manual-content risks:

- at least one scene during Phase A;
- unique non-empty IDs;
- non-empty event, aliases, panorama URL, location label, and explanation;
- finite coordinates within valid ranges;
- valid year range containing both initial and correct years;
- finite initial yaw, pitch, and zoom.

Do not introduce Zod, JSON Schema, generated manifests, or a versioned package
format.

## A5. Phase A validation gate

Run:

```bash
pnpm lint
pnpm test
pnpm build
git diff --check
```

Then perform one manual browser pass:

1. Open Boston.
2. Complete event, year, and map input.
3. Submit and advance.
4. Verify Wright opens with clean inputs, map, ruler, panorama, and onboarding.
5. Complete Wright.
6. Verify full-session restart returns to clean Boston.
7. Check one narrow mobile viewport for blocking overlap.
8. Confirm the browser console has no new errors or warnings.

The Phase A handoff must separate:

- removed;
- simplified;
- preserved;
- validation passed;
- validation blocked;
- uncommitted work remaining.

Stop after this handoff unless the user explicitly authorizes Phase B.

## Phase A completion record — July 30, 2026

Phase A removed the retired provider tooling and checksum-verified rejected
binaries, unused Tailwind scaffold, decorative timer, per-round replay, one
duplicate map reset, and the string-based scene registry. The ordered scene
array, reducer, `roundToken`, onboarding, scene-specific ranges/views, JSON
evidence, OpenAI evidence, and runtime panoramas remain.

Dependency installation, lint, 14 unit tests, the production Webpack build,
`git diff --check`, the complete two-round browser workflow, final restart, and
the `390 × 844` responsive check passed. Phase B remains blocked pending
explicit user authorization.

# Phase B — Minimal product additions

Begin only after Phase A passes and the user authorizes continuation.

## B1. Add a lightweight start screen

- Use one local start/session phase.
- Show the one-sentence pitch.
- Explain the event, year, and location guesses.
- Include concise panorama, ruler, and map instructions.
- Include one `Start game` action.
- Do not add routing, modes, persistence, authentication, or settings.

When the start screen is accepted, remove the per-round panorama onboarding
state, action, interaction listeners, markup, and CSS. Instructions should not
repeat on every round.

## B2. Add a clear final session state

- Reuse the existing final result surface.
- On the last round, show explicit `Session complete` copy.
- Offer full-session restart.
- Do not add score, result history, aggregate statistics, or persistence before
  the 10-round gate.

## B3. Add minimal failure messages

- Catch panorama initialization failures and show a concise retry/reload message.
- Catch map initialization failures.
- Keep the existing online CARTO basemap for the hackathon.
- Document that map tiles require network access.
- Do not build an offline basemap or tile pipeline.

## B4. Phase B validation gate

- Repeat lint, tests, build, and `git diff --check`.
- Manually verify start -> Boston -> Wright -> session complete -> restart.
- Verify that onboarding instructions appear on the start screen and do not
  repeat in each round.
- Verify map and panorama failure copy without adding a new framework.

Stop and hand off before producing new scenes unless the user explicitly
authorizes Phase C.

## Phase B completion record — July 30, 2026

Phase B added one local start/session phase with the product pitch, panorama
controls, and event/year/location instructions. The accepted start screen
replaced the per-round panorama onboarding state and listeners. The final
round result now says `Session complete`, while full-session restart still
returns directly to a clean Boston round.

Panorama initialization and load failures now expose concise reload guidance.
Map initialization and CARTO tile failures expose concise connection/reload
guidance, and the README records the online tile dependency. No router, mode,
score, persistence, authentication, offline basemap, or test framework was
added.

Direct ESLint, TypeScript, 14 unit tests, the production Webpack build, and
`git diff --check` passed. The `pnpm lint` and `pnpm test` wrappers were also
attempted, but the local GUI shell triggered pnpm's known non-TTY module-purge
guard while the registry was unavailable; the corresponding checked-in local
binaries passed.

The production browser passed `start -> Boston -> Wright -> Session complete
-> restart`, a `390 × 844` layout check, clean-state transitions, and a clean
console. A temporary diagnostic build verified both failure messages with
missing panorama and tile URLs; those URL substitutions were reverted before
the final production build and smoke check.

Phase C remains blocked pending explicit user authorization.

# Phase C — Content expansion

Begin only after Phases A and B pass.

## C1. Lock the scene slate

- Select 10 required events total, including Boston and Wright.
- Select two backup events.
- Prefer strong visual anchors, different eras and regions, and scenes that can
  be produced quickly.
- Reject events dependent on readable text, exact faces, or fragile geometry.

## C1 completion record — July 30, 2026 (superseded July 31)

The ordered session is locked to Boston Tea Party, the Wright brothers' first
flight, the eruption of Vesuvius at Pompeii, the Storming of the Bastille, the
sinking of RMS Titanic, the D-Day Normandy landings, the first ascent of Mount
Everest, the Apollo 11 launch, the opening of the Berlin Wall at Bornholmer
Strasse, and the Chernobyl disaster.

This supersedes the first draft of C1 after the user asked for scenes based on
events known by most players. Suez Canal, Dandi Salt March, and the opening of
Sydney Opera House were removed from the required slate before runtime
integration. The Hindenburg disaster is the first replacement candidate and
the already prepared Chilean miners rescue is the second.
`docs/scenes/scene-slate.md` records the order, canonical points, visual
anchors, risks, sources for the replacements, and the rule to replace a failed
event instead of extending tooling. Event lock does not imply asset acceptance.

## C2. Add scenes in small batches

Eight additional accepted rounds are required to reach the release gate. Rounds
11 and 12 are buffers, not blockers.

For every scene:

1. Record one or two sources.
2. Record event, aliases, year, coordinates, location, explanation, initial
   camera view, and year range.
3. Produce the fastest usable local 2:1 panorama.
4. Reject only material historical, stereotype, readability, seam, or projection
   failures.
5. Add the scene file and ordered-array entry.
6. Run the compact integrity test.
7. Smoke-test the round.

Work in batches of two or three. After every batch, run the full session from
Boston through the newest scene.

Do not restart provider research or build reusable generation tooling. Replace a
stubborn event when that is faster.

## C3. Ten-round gate

Before submission work:

- at least 10 unique rounds are playable;
- the complete ordered session reaches the final state;
- every round resets all transient state;
- every panorama is local and usable at runtime zoom;
- every scene has accepted metadata and aliases;
- every round has a recorded smoke test.

## Phase C completion record — July 30, 2026 (superseded roster)

C1 was relocked around globally recognisable events after user feedback. C2
then added eight generated local panorama candidates and their scene modules,
metadata, aliases, sources, explanations, checksums, and dossiers. The runtime
order is Boston, Wright, Pompeii, Bastille, Titanic, D-Day, Everest, Apollo 11,
Berlin Wall, and Chernobyl. The Chilean miners rescue remains a prepared backup
and is not registered.

The first Titanic candidate was rejected for a materially wrong sinking
attitude and corrected once. The final browser pass also exposed weak opening
cameras for Everest and Apollo 11; Everest was widened and Apollo was
re-centred on the Saturn V, tower, and plume before the final rebuild.

The compact integrity suite now enforces exactly 10 unique scene IDs, unique
local panorama URLs, present asset files, complete metadata, valid coordinates,
usable year ranges, and finite camera values. Common shorthand answers such as
`Titanic`, `Apollo 11`, `Chernobyl`, and `Pompeii` are explicit aliases rather
than fuzzy guesses. Direct ESLint, TypeScript, all 30 unit tests, the production
Webpack build, local Markdown links, asset-dimension checks, and
`git diff --check` passed.

The production browser run completed all 10 rounds, reached `Session complete`,
restarted to a clean Boston round, loaded one panorama canvas with no alert in
every round, and left the browser console clean. A narrow `390 × 844` smoke
check found no blocking overflow or clipped interactive control; dedicated
mobile optimisation is intentionally deferred per user direction. The later
alias-only patch was covered by the final 30-test, lint, TypeScript, and build
run; the browser workflow was not repeated for that data-only change. A
comprehensive seam-and-pole review remains Phase D submission QA.

Phase D is not authorized in this session.

## Phase C roster revision — July 31, 2026

After reviewing the first generated roster, the user explicitly retained
Boston Tea Party, the Storming of the Bastille, the Wright brothers' first
flight, the sinking of RMS Titanic, and the first ascent of Mount Everest.
Pompeii, D-Day, the Apollo 11 launch panorama, Bornholmer Strasse, Chernobyl,
and the prepared Chilean-miners backup were rejected.

The replacement session is locked in chronological order:

1. fall of Constantinople, 1453;
2. Boston Tea Party, 1773;
3. adoption of the Declaration of Independence, 1776;
4. Storming of the Bastille, 1789;
5. Wright brothers' first flight, 1903;
6. sinking of RMS Titanic, 1912;
7. attack on Pearl Harbor, 1941;
8. first ascent of Mount Everest, 1953;
9. Vostok 1 and the first human spaceflight, 1961;
10. Apollo 11 Moon landing, 1969.

Five new local `2:1` panorama candidates, scene modules, aliases, explanations,
and dossiers replace the rejected registered rounds. The Apollo 11 surface
round is the only off-world exception: it uses an explicit `Moon` location
choice, stores Tranquility Base in selenographic coordinates, keeps
`distanceKm` as `null`, and never projects a false point onto the Earth map.

The superseded uncommitted scene, panorama, and dossier triples must be moved
to recoverable Trash only after all five replacements exist and pass static
integrity checks. The final revision record must list the exact removed paths,
asset checksums, correction decisions, automated validation, browser smoke,
and remaining submission QA.

## Phase C roster revision completion record — July 31, 2026

The five replacement assets are registered and retain their exact generated
bytes:

- `fall-of-constantinople-panorama.png`:
  `ec00033afafb284f0ce97fb81530d44baaab1812016a31bb9eb8e25690378316`;
- `declaration-of-independence-panorama.png`:
  `6bc12ccb337a2a46d1b4cd2612fc0b5ffed9b7ead291d528934bf4d4882f87ad`;
- `pearl-harbor-attack-panorama.png`:
  `81b5042a2fb02598d33f18410c1020e8f4b06248e51f6baa182360af84315ba1`;
- `vostok-1-launch-panorama.png`:
  `18ec72634e8626fea9e038083c7e60ba553d2cc28c46da410f1f3b0a4a29e32a`;
- `apollo-11-moon-landing-panorama.png`:
  `d4c5e9ba770be1a35a98702576f72fb4233f3967dd2a542b0c850b6de5dd1ad4`.

Flat material review accepted Constantinople, the Declaration, Vostok 1, and
the Moon landing without a retry. Pearl Harbor used its single focused
correction after the first aircraft read as twin-engined; the accepted edit
contains two modest single-engine aircraft and a submerged torpedo wake.

The complete chronological 10-round session passed twice in the production
browser: once at the default `1280 × 720` viewport and once with a `390 × 844`
responsive override. Both runs reached `Session complete`; the desktop run
also restarted to a clean first round. Every round rendered one panorama
canvas with no application alert. The lunar round hid Tranquility Base until
submission, enabled only after `Moon` was chosen, returned `Moon identified`,
reported no Earth distance, and rendered no Earth result map. The browser
console had no warning or error and the responsive DOM had no horizontal
overflow. Exhaustive seam-and-pole review remains Phase D submission QA.

Independent review then tightened the off-world contract before the final
rerun: scene coordinates are now a discriminated Earth/geographic or
Moon/selenographic union, submission requires the selected celestial body to
match the scene, and the result stores `locationBodyCorrect`. The narrow lunar
input and result layouts now reserve separate rows for their hints and labels;
keyboard focus and reduced-motion coverage include the new controls.

The rejected uncommitted triples were moved to recoverable system Trash:

- `docs/scenes/eruption-of-mount-vesuvius.md`,
  `public/images/eruption-of-mount-vesuvius-panorama.png`, and
  `src/features/game/eruption-of-mount-vesuvius.ts`;
- `docs/scenes/d-day-normandy-landings.md`,
  `public/images/d-day-normandy-landings-panorama.png`, and
  `src/features/game/d-day-normandy-landings.ts`;
- `docs/scenes/apollo-11-launch.md`,
  `public/images/apollo-11-launch-panorama.png`, and
  `src/features/game/apollo-11-launch.ts`;
- `docs/scenes/berlin-wall-opening.md`,
  `public/images/berlin-wall-opening-panorama.png`, and
  `src/features/game/berlin-wall-opening.ts`;
- `docs/scenes/chernobyl-disaster.md`,
  `public/images/chernobyl-disaster-panorama.png`, and
  `src/features/game/chernobyl-disaster.ts`;
- `docs/scenes/chilean-miners-rescue.md`,
  `public/images/chilean-miners-rescue-panorama.png`, and
  `src/features/game/chilean-miners-rescue.ts`.

All 34 direct unit tests, ESLint, TypeScript, the production Webpack build,
22 local Markdown links, exact image dimensions and checksums, and
`git diff --check` passed. No commit or push is part of Phase C.

# Phase D — Submission QA

Only after the ten-round gate:

- run final lint, tests, and production build;
- complete a desktop end-to-end pass;
- check the narrow mobile layout;
- check map network failure behaviour;
- review console output;
- audit secrets and publish scope;
- update README, screenshots, and submission material;
- commit or push only with explicit user authorization.

## Phase D functional QA record — July 31, 2026

The final source passed direct ESLint, all 34 unit tests, TypeScript,
the production Webpack build, and `git diff --check`. The `pnpm lint` wrapper
was blocked before project execution by the known non-TTY dependency-purge
guard; no dependency was installed or changed.

The production browser completed the chronological 10-round session at
`1280 × 720` and again at `390 × 844`. Both runs reached `Session complete`;
the final build restarted to clean Constantinople, rendered one panorama canvas
per round, showed no application alert, and left the clean-run console without
warnings or errors. A `1536 × 1024` smoke check also passed.

Phase D found and fixed one keyboard interaction defect. Photo Sphere Viewer's
global `keyboard: "always"` listener could consume arrow and page keys outside
the panorama. Keyboard control is now enabled only while the focusable
panorama owns focus, preserving panorama keyboard navigation without coupling
it to the event field, year ruler, map, or scrollable result. The lunar
selected-state hint also stops naming Tranquility Base before submission.

A temporary diagnostic build verified the existing panorama and map failure
messages with known-missing local URLs. Those substitutions were reverted
before the final build.

The targeted production-viewer review then completed full horizontal rotations,
explicit seam crossings, and zenith/nadir checks for Constantinople,
Declaration, Bastille, Titanic, and Everest. That review found a radial star
vortex at Titanic's exact zenith. A targeted generated upper-sky repair removed
it while preserving the accepted lower scene; the maximum-pitch recheck then
passed with no vortex, ring, or hole. Exact maximum-pitch checks for
Constantinople, Bastille, and Everest also passed. No submission-blocking wrap
jump, projection hole, remaining pole ring, or broken geometry remains.

The rejected Boston control was replaced at the existing runtime path with a
new `1774 × 887` RGB panorama generated through the Codex built-in OpenAI image
interface. It shows people on a modest merchant vessel and wharf opening tea
chests and emptying loose tea into the harbor, with low Georgian waterfront
architecture. It contains none of the old hard blockers: no person is in the
water, no intact chest is thrown as a projectile, and no warship dominates the
scene. The replacement passed material, edge, full-rotation, seam, pole,
desktop, and mobile review. Its final camera is yaw `56°`, pitch `0°`, zoom
`71`; exact generation and QA evidence is in
`docs/scenes/boston-tea-party-runtime-v2-prompt.md`.

The Titanic repair prompts, deterministic composite boundary, final checksum,
and acceptance evidence are recorded in
`docs/scenes/titanic-zenith-repair.md`.

A full browser run after the replacement again completed all ten rounds,
reached `Session complete`, preserved the Apollo Moon result, and restarted to
clean Constantinople. The Phase D functional and submission content gates are
closed. Wright's documented aircraft-anatomy review remains a non-blocking
historical-certification note.

The publish-scope audit found no tracked environment file or runtime
environment reference. `.env.local` remains ignored, and the documented CARTO
tiles are the only gameplay network dependency.

The user explicitly authorized committing and pushing all scoped PastPoint
changes, deploying the resulting revision to Vercel production, and completing
the open Devpost submission. Publication work follows the final static gate and
secret audit.

## Explicitly deferred until after submission

- automated generation and finishing;
- provider evaluation;
- Scene Studio;
- 4K/8K masters and tiled delivery;
- scoring and aggregate statistics;
- Classic or Expert modes;
- daily sessions;
- accounts, leaderboards, multiplayer, and persistence;
- automated browser infrastructure;
- production-grade historical certification.

## Required handoff format

Every stage handoff must report:

- completed work;
- removed or moved-to-Trash paths;
- validation passed;
- validation blocked or not run;
- intentionally preserved work;
- current `git status`;
- uncommitted and unpushed changes;
- the next stage, clearly marked as authorized or not yet authorized.

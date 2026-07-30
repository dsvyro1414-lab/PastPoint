# PastPoint design QA

- Source visual truth:
  `docs/design/pastpoint-game-interface-reference.png`
- Source dimensions: `1536 × 1024` pixels at 1× density.
- Runtime under test: Next.js production build at
  `http://127.0.0.1:3000/`.
- Desktop viewport: `1536 × 1024` CSS pixels.
- Mobile viewport: `390 × 844` CSS pixels.
- State: two-round Boston Tea Party and Wright first-flight preview.

The sections below preserve the pre-Phase-A browser baseline. References to the
timer and per-round replay describe that historical build, not the current
runtime.

## Pre-Phase-A browser evidence

The complete two-round desktop workflow and the previously verified mobile
layout were rendered in the Codex in-app browser. The primary workflow was
exercised against the production server:

1. Enter `Boston Tea Party`.
2. Move the year ruler from 1750 to 1773 with 23 `ArrowRight` presses.
3. Place a marker on the world map.
4. Submit the answer and verify the raw event, year, difference, and distance
   facts.
5. Select `Next round` and verify that the Wright scene opens as `Round 2 of 2`
   with an empty event, no map marker, a `1900` initial year, a `1800–2000`
   range, a reset `02:00` timer, and the onboarding cue.
6. Inspect the Wright panorama through a full horizontal rotation, including
   the open-sand seam sector and the camp buildings.
7. Enter `Wright Brothers' First Flight`, move the year to `1903`, place a map
   marker, submit, and verify the final result.
8. Select `Replay round` and verify the second scene's inputs, timer,
   onboarding, and initial camera view reset.
9. Complete the replay and select `Restart session`; verify the preview returns
   to the clean Boston round at `1750`.

The submit button stayed disabled until all three inputs were present. Both
results showed the correct event and year, a zero-year difference, a raw
distance in kilometres, the explanation, both map markers, and the correct
location.

## Responsive checks

At `390 × 844`:

- the onboarding cue occupies `x=20…132` while the map begins at `x=148`;
- the event input ends above the year bubble;
- the year bubble, fixed pointer, and selected 1750 tick are centred at `x=195`;
- all primary controls remain visible without horizontal clipping.

## Findings resolved during QA

- The event input, year ruler, and submit action occupied several stacked
  vertical bands and obscured too much of the panorama. Desktop now uses one
  compact bottom dock; the year control is capped at `520px` wide and `70px`
  high, with a smaller value bubble and labels.
- At `390 × 844`, the same controls remain vertically ordered but sit lower:
  the compact ruler is `62px` high, the input clears its value bubble, and the
  submit button remains fully visible.
- On the Wright scene, the starting value `1900` is also a century label. The
  selected marker was moved above the label so the two no longer overlap in
  the compact ruler.
- The year ruler used smooth scrolling and stale React state, so repeated
  keyboard input did not accumulate deterministically. Keyboard movement now
  updates synchronously; 23 right-arrow presses produce exactly 1773.
- Tick positioning did not keep the selected year aligned with the ruler
  pointer. The track width and year-to-pixel calculation now use the same
  1500-pixel range. At desktop width, the 1750 tick and slider centre both
  resolve to `x=768`; at mobile width both resolve to `x=195`.
- Rapid arrow-key input now accumulates deterministically, and `Home` / `End`
  select 1500 / 2000 directly instead of depending on a stale render value.
- `Play again` reset the game data but did not restore the 360° onboarding cue.
  The cue now returns with the rest of the round state.
- On mobile, the map obscured the onboarding cue and the event field crowded the
  year bubble. The cue is now a fixed left column and the lower controls have
  clear separation.
- Result markers now use a blue player dot and a larger gold ring with explicit
  layer order, so exact or near-exact guesses do not hide one marker beneath the
  other.

## Prototype zoom guard regression

The `1774 × 887` prototype panoramas no longer allow close zoom. The viewer now
uses a `60°` minimum vertical field of view instead of `32°`. Both scene opening
zoom levels were recalibrated from `38` to `71`, preserving approximately the
previous `69°` opening field of view while leaving only a small additional
zoom-in range.

Repeated high-magnitude wheel zoom was checked on Boston and Wright at
`1536 × 1024` and on Boston at `390 × 844`. In all three cases the panorama
stopped at the restricted zoom boundary, the scene remained readable, the
onboarding cue dismissed after interaction, primary controls remained visible,
and the browser console reported no errors or warnings.

## Remaining content note

Both repository panoramas are prototypes. They are suitable for interaction
and layout verification, but are not treated as historically certified source
material. Replacing them with reviewed, provenance-recorded production masters
remains content work rather than a functional blocker for this vertical slice.

## Reusable engine regression check

After extracting the scene/session configuration and deterministic session
state, the production build was exercised again in the in-app browser:

1. The preview opened as `Round 1 of 2` with a `02:00` timer, `1750`
   initial year, visible panorama cue, and disabled submit button.
2. `Boston Tea Party`, 23 right-arrow year steps, and a map click enabled
   submission at exactly `1773`.
3. The result retained the raw event, year, difference, distance, explanation,
   both locations, `Replay round`, and `Next round`.
4. The real Wright scene then reset every transient value, used its own year
   range and centred camera, and accepted its `1903` answer.
5. `Replay round` restored the Wright initial camera and state; `Restart
   session` restored the Boston initial camera and state.
6. The full panorama rotation had no visible horizontal seam break or pole
   failure in the game viewer.
7. The browser reported no console errors or warnings during the workflow.

Multi-round transitions use both real registered scenes in unit coverage and
have now passed a manual production-browser regression. A repository-owned
automated browser test remains follow-up work.

pre-Phase-A result: pass

## Phase A cleanup regression — July 30, 2026

The Phase A production build passed a fresh manual browser workflow:

1. Boston opened as `Round 1 of 2` with onboarding, an empty event, no map
   marker, the `1750` initial year, and a disabled submit button. No decorative
   timer was present.
2. Entering `Boston Tea Party`, moving the ruler to `1773`, and placing a map
   marker enabled submission and produced the expected raw result.
3. The Boston result exposed `Next round` without a per-round replay action.
4. Wright opened as `Round 2 of 2` with an empty event, no marker, the `1900`
   initial year, its `1800–2000` range, the configured opening panorama, and
   the onboarding cue.
5. Completing Wright at `1903` produced the final result with one `Restart
   session` action.
6. Restart returned to clean Boston at `1750`, restored onboarding, removed the
   marker, and disabled submit.

The location panel exposed one whole-world reset action plus zoom and minimize
controls; the duplicate reset was absent.

At `390 × 844`, the document had no horizontal or vertical overflow. Measured
bounds confirmed no blocking overlap between onboarding and the map, event
input and ruler, or ruler and submit. All primary controls remained within the
viewport.

The browser console reported no warnings or errors during the complete workflow
and responsive check.

Phase A result: pass

## Phase B minimal-product regression — July 30, 2026

The Phase B production build passed a fresh browser workflow at `1536 × 1024`:

1. The start screen explained the product, panorama controls, and the event,
   year, and location guesses with one `Start game` action.
2. Starting the game opened clean Boston at `1750`; no per-round onboarding
   cue remained.
3. Boston accepted its event, `1773`, and a map marker, then advanced to clean
   Wright at `1900`.
4. Wright accepted its event, `1903`, and a map marker.
5. The final result exposed an explicit `Session complete` state and one
   `Restart session` action.
6. Restart returned directly to clean Boston at `1750`.

The start screen and first gameplay state were also checked at `390 × 844`.
The document measured exactly `390 × 844` with no horizontal or vertical
overflow, and all start/game controls remained visible without a blocking
overlap. Browser screenshots were visually reviewed at both sizes. Activating
`Start game` moved keyboard focus to the named game-session region.

A temporary diagnostic production build replaced only the Boston panorama and
CARTO tile URLs with known-missing local URLs. It displayed `Panorama
unavailable` with reload guidance and `Map unavailable` with
connection/reload guidance. Both substitutions were reverted, the final
production build was recreated, and its smoke check showed neither failure
message.

The final production browser console contained no warnings or errors.

Phase B result: pass

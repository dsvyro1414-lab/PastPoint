# PastPoint design QA

- Source visual truth:
  `docs/design/pastpoint-game-interface-reference.png`
- Source dimensions: `1536 × 1024` pixels at 1× density.
- Runtime under test: Next.js production build at
  `http://127.0.0.1:3000/`.
- Desktop viewport: `1536 × 1024` CSS pixels.
- Mobile viewport: `390 × 844` CSS pixels.
- State: Boston Tea Party vertical slice.

## Final browser evidence

The initial desktop round, submitted result, reset round, and mobile layout were
rendered in the Codex in-app browser. The primary workflow was exercised against
the production server:

1. Enter `Boston Tea Party`.
2. Move the year ruler from 1750 to 1773 with 23 `ArrowRight` presses.
3. Place a marker on the world map.
4. Submit the answer and verify the raw event, year, difference, and distance
   facts.
5. Select `Play again` and verify that the event, year, map marker, timer,
   result, and 360° onboarding cue reset.

The submit button stayed disabled until all three inputs were present. The
result showed the correct event and year, a zero-year difference, a raw distance
in kilometres, the explanation, both map markers, and the correct location.

## Responsive checks

At `390 × 844`:

- the onboarding cue occupies `x=20…132` while the map begins at `x=148`;
- the event input ends above the year bubble;
- the year bubble, fixed pointer, and selected 1750 tick are centred at `x=195`;
- all primary controls remain visible without horizontal clipping.

## Findings resolved during QA

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

## Remaining content note

`public/images/boston-tea-party-panorama.png` is a prototype panorama. It is
suitable for interaction and layout verification, but it is not treated as
historically certified source material. Replacing it with a licensed,
provenance-recorded production panorama remains content work rather than a
functional blocker for this vertical slice.

final result: pass

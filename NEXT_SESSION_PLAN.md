# PastPoint — plan for the next session

## Session objective

Build one playable Boston Tea Party vertical slice:

`360 scene -> enter event -> select year -> place map marker -> submit -> result`

The goal of the next session is a functional interaction prototype. Pixel-perfect reproduction of the final visual reference is not required yet, but the layout and component placement should follow it.

Current visual reference:

`docs/design/pastpoint-game-interface-reference.png`

## Locked product decisions

- Full-screen interactive panorama from one fixed viewpoint.
- No walking, 3D world, VR, NPCs, or transitions between viewpoints.
- No scoring system yet.
- No multiple-choice event answers.
- The player types the event manually.
- The player selects the year with a horizontal draggable / scrollable ruler.
- The player selects the location on a small interactive map in the upper-right corner.
- No clue hotspots or post-answer camera tour.
- After submission, show a short AI-generated explanation of how the event could be identified.
- Do not show an `AI-generated historical reconstruction` label.
- No accounts, leaderboard, multiplayer, database, or runtime panorama generation.

## Target UI

### Header

- Left: `PASTPOINT`.
- Next to it: `Round 1 of 1`.
- Center: countdown timer.
- Do not show Score or profile controls in this version.

### Panorama

- Occupies the entire viewport behind all controls.
- Supports mouse drag, touch drag, and zoom.
- On first load, show a temporary centered onboarding cue:
  - `360°`
  - `Drag to look around`
- Hide the cue after the first panorama interaction.

### Event input

- Floating glass panel on the left, above the year ruler.
- Label or placeholder: `What happened here?`
- Plain text input with autocomplete disabled.
- Do not offer event suggestions or answer choices.

### Map

- Compact floating panel in the upper-right corner.
- Clicking the map places a marker; a later click moves it.
- Include zoom and close/minimize controls.
- An expanded-map state is optional for this vertical slice.

### Year selector

- Large glass panel across the bottom of the viewport.
- Horizontal ruler for the Boston slice: `1500–2000`.
- Fixed center pointer; the ruler moves underneath it.
- Support horizontal drag, mouse wheel, trackpad, and touch.
- Show the currently selected year in a value bubble.
- Do not initialize the game at `1773`.
- Track whether the player has actively interacted with the ruler.

### Submit

- Bottom-right button: `Submit Answer`.
- Disabled until:
  - the event field is non-empty;
  - the year selector has been touched;
  - a map marker has been placed.

## Boston Tea Party scene data

- Event: `Boston Tea Party`
- Date: `1773-12-16`
- Accepted year: `1773`
- Location: Griffin's Wharf, Boston, Massachusetts
- Approximate coordinates: `42.3515, -71.0514`
- Scene: Boston Harbor at night, wooden wharf, eighteenth-century merchant ships, colonists throwing tea chests into the water.

Accepted event aliases for the first implementation:

- `Boston Tea Party`
- `The Boston Tea Party`
- `Бостонское чаепитие`

Normalize answers before comparison:

- trim surrounding whitespace;
- lowercase;
- collapse repeated whitespace;
- remove harmless punctuation;
- compare against the normalized alias list.

Do not use an LLM to judge event correctness in this version.

## Result state

Replace or cover the game controls with a simple result panel containing:

- `Your event` and `Correct event`;
- `Your year` and `Correct year`;
- the player's marker and the correct marker on the map;
- year difference;
- distance from the correct location in kilometers;
- one short AI-generated explanation;
- `Play again` button.

Initial explanation stored with the scene:

> The tea chests, colonial merchant ships, nighttime harbor setting, and eighteenth-century clothing point toward the Boston Tea Party, which took place in Boston on December 16, 1773.

For this MVP, generate the explanation beforehand and store it in scene data. Do not add a runtime AI request to the gameplay path.

## Minimal data model

```ts
type Scene = {
  id: string;
  panoramaUrl: string;
  event: string;
  acceptedEventAliases: string[];
  year: number;
  location: {
    label: string;
    lat: number;
    lng: number;
  };
  explanation: string;
};

type PlayerAnswer = {
  eventText: string;
  year: number;
  location: {
    lat: number;
    lng: number;
  };
};

type RoundResult = {
  eventCorrect: boolean;
  yearDifference: number;
  distanceKm: number;
};
```

Do not derive points from `RoundResult` yet. These raw values are enough to add scoring later.

## Recommended implementation order

1. Initialize a Next.js + TypeScript project.
2. Add the local `Scene`, `PlayerAnswer`, and `RoundResult` types.
3. Create the full-viewport layout with placeholder background and glass controls.
4. Integrate the panorama viewer with a temporary equirectangular image.
5. Implement the year ruler as an isolated component.
6. Integrate the map and marker placement.
7. Implement the event text input and answer normalization.
8. Add submit validation and round state management.
9. Calculate year difference and Haversine distance.
10. Build the result panel and reset flow.
11. Replace the temporary panorama with the final Boston Tea Party panorama when available.
12. Run lint, production build, and a desktop interaction check.

## Panorama asset constraint

The attached UI reference is a flat mockup, not a usable 360 panorama.

The viewer needs a true 2:1 equirectangular asset, ideally `4096 x 2048`. Until that exists, use a temporary equirectangular panorama to build and test the interaction. Panorama generation and historical visual review can be handled as a separate content task.

## Definition of done

- The app opens directly into the Boston Tea Party round.
- The user can rotate and zoom the panorama.
- The user can type an event.
- The user can drag or scroll to select a year.
- The user can place and move a map marker.
- Submit remains disabled until all three inputs are complete.
- Submission produces event correctness, year difference, and geographic distance.
- The result view shows the correct answer and the prepared AI explanation.
- `Play again` resets the full round.
- No score, answer choices, clue overlays, AI reconstruction label, authentication, or backend.
- Lint and production build pass.

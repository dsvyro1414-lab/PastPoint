# Fall of Constantinople — scene dossier

## Status

- Runtime scene:
  `src/features/game/fall-of-constantinople.ts`.
- Runtime asset:
  `public/images/fall-of-constantinople-panorama.png`.
- Asset status: generated hackathon candidate; passed flat material review and
  wrapped opening-view smoke. Exhaustive seam and pole checks remain Phase D.
- Generation method: built-in OpenAI image generation through Codex. No CLI,
  API fallback, or provider pipeline was used.
- Dimensions: `1774 × 887` (`2:1`, RGB PNG).
- Bytes: `2,340,025`.
- SHA-256:
  `ec00033afafb284f0ce97fb81530d44baaab1812016a31bb9eb8e25690378316`.

## Canonical scene facts

- Event: fall of Constantinople to the Ottoman Empire.
- Date: May 29, 1453.
- Place represented: the Theodosian land-wall system near the main final
  assault sector, in present-day Istanbul.
- Game coordinates: `41.025, 28.925`, the UNESCO land-walls component area.
- The fifth-century defensive system used a high inner wall, lower outer wall,
  towers, and a ditch.
- Large Ottoman bombards and repeated assaults damaged and pressured the land
  defenses during the siege.

## Visual blueprint

Required:

- massive layered late-Roman walls, towers, ditch, and a damaged sector;
- a large fifteenth-century bronze bombard on a timber bed;
- stone cannonballs, earthworks, smoke, and advancing Ottoman forces;
- a smaller number of Byzantine defenders on the ramparts;
- a distant late-Byzantine skyline without later Ottoman monuments.

Forbidden:

- modern Turkish flags, later Janissary uniforms, fantasy armor, or gunpowder
  weapons from later centuries;
- Ottoman-era minarets, modern Istanbul, roads, electricity, or vehicles;
- giant heroic portraits, propaganda framing, gore, readable text, or logos;
- key figures, cannon, or wall breach at the wrap seam or poles.

## Generated candidate review

| Material check | Result | Evidence |
| --- | --- | --- |
| Event recognition | pass | bombard, stone shot, siege positions, damaged walls, smoke, and assault read together |
| Fortification character | pass | broad late-Roman wall line, towers, ditch, and battered central sector dominate the view |
| Period material culture | pass with soft note | plausible armor, earthworks, timber, and artillery; generated details are not forensic |
| Anachronism review | pass | no modern flag, minarets, skyline, vehicle, text, or later firearm is visible |
| Human treatment | pass | mid-distance forces, no graphic injury or triumphant close portrait |
| Equirectangular delivery | candidate | exact `2:1`, level horizon, centered clues, and low-detail rear seam |

Material decision: **accept for runtime integration**. This is an AI-generated
historical reconstruction, not documentary evidence.

## Generation prompt

```text
Use case: historical-scene
Asset type: PastPoint runtime panorama, a full-spherical environment map for an interactive 360-degree historical guessing game
Primary request: Create a photorealistic, historically grounded reconstruction of the final Ottoman assault during the Fall of Constantinople at dawn on 29 May 1453, viewed from the Ottoman siege ground outside the Theodosian land walls near Topkapi / the Gate of Saint Romanus.
Scene/backdrop: The fifth-century Theodosian land-wall system must read as a massive late-Roman layered fortification: tall inner stone-and-brick curtain wall with square towers, a lower outer defensive wall, earthworks and a broad defensive ditch. The front-facing wall section is battered and partly breached, with fallen masonry and smoke. Beyond it, only distant late-Byzantine roofs and church domes; absolutely no Ottoman-era minarets and no modern skyline.
Subject and clear front-sector clues: In the central 120 degrees of the panorama, center a large fifteenth-century bronze Ottoman bombard on a heavy timber firing bed behind rough earthworks, with several huge round stone cannonballs, powder equipment, smoke, and crews. Beyond it, Ottoman assault troops advance toward the damaged wall while a small number of Byzantine defenders remain on the ramparts. The wall, breach, bombard, and cannonballs must all be unmistakable in the initial forward view.
People and period accuracy: Mid-distance human figures only, natural scale and anatomy. Ottoman troops wear plausible mid-fifteenth-century conical helmets, mail, quilted garments, simple turbans and kaftans; Byzantine defenders wear plausible late-medieval mail and plate with spears, bows, and shields. No later sixteenth-to-nineteenth-century Janissary uniforms. No modern national flags; no modern Turkish star-and-crescent flag. If standards appear, keep them plain, small, period-plausible, and without readable symbols.
Style/medium: Photorealistic historical reconstruction, convincing documentary realism, weathered limestone and brick, soot, timber grain, earth, dust, restrained battle smoke; not a painting, illustration, game concept art, diorama, or fantasy scene.
Composition/projection: Output one PNG exactly 1774 x 887 pixels, exact 2:1 aspect ratio. True full-spherical equirectangular projection covering 360 degrees horizontally and 180 degrees vertically, a flattened latitude-longitude environment map, not a cropped cinematic frame, not fisheye, not a cylindrical strip. Keep the horizon perfectly level on the horizontal middle line. Top edge is continuous zenith sky; bottom edge is continuous nadir ground. Preserve believable scale with no warped walls, bent horizon, giant people, or stretched foreground.
Seam and poles: The left and right edges must join seamlessly with matching ground, sky, lighting, smoke, and geometry. Keep all important people, cannon, breach, towers, and props far from the left-right seam and away from zenith/nadir. Put only low-detail earthworks and open siege ground across the rear seam. No duplicated figures or half-objects at either edge; no visible vertical seam.
Lighting/mood: Clear cool dawn light with warm low sun filtered through restrained smoke; readable, not dark; tense and historically serious, no gore.
Constraints: No text, letters, numerals, captions, signs, labels, logos, signatures, or watermark anywhere. No modern objects, roads, vehicles, electricity, plastics, firearms later than the fifteenth century, fantasy armor, monumental heroic close-up, gore, or celebratory propaganda.
```

## Sources

- [UNESCO — Historic Areas of Istanbul](https://whc.unesco.org/en/list/356/)
- [Istanbul Panorama 1453 History Museum](https://www.panoramikmuze.com/Home/Hakkimizda)
- [Metropolitan Museum of Art — The Art of the Ottomans before 1600](https://www.metmuseum.org/essays/the-art-of-the-ottomans-before-1600)

# Titanic zenith repair — generation record

## Output

- Runtime path: `public/images/titanic-sinking-panorama.png`
- Repaired: July 31, 2026
- Provider: OpenAI through the Codex built-in image-generation interface
- Model/version and provider generation IDs: not exposed by the interface
- Dimensions: `1774 × 887` (`2:1`)
- Format: 8-bit RGB PNG, no alpha, non-interlaced
- Bytes: `1,837,557`
- SHA-256:
  `ed29d7d66775ea0393bb65c5f15e484ff5de5731e06bc361f12b32d7382cf6ae`

## Reason for repair

The Phase D production-viewer sweep found a visible radial star vortex when the
camera reached Titanic's zenith. The ship, lifeboats, people, water, horizon,
and horizontal seam already passed and were not targets for redesign.

## Exact first edit prompt

```text
Use case: precise-object-edit
Input images: Image 1 is the edit target, an existing full-spherical equirectangular Titanic game panorama.
Primary request: repair only the zenith sky of Image 1 so it remains visually clean when viewed straight up in a 360-degree viewer.
Change only: the uppermost night-sky region, especially the top 18 percent of the equirectangular frame. Replace the dense radial-looking star texture near the zenith with a smooth, coherent, very dark navy-black night sky containing only tiny sparse natural stars. Fade the star density gradually toward zero at the exact top edge so the collapsed zenith becomes an unobtrusive dark point, not a star vortex, ring, streak pattern, or pinched burst.
Preserve exactly: the 2:1 equirectangular projection and original dimensions; Titanic, its angle and lights; every lifeboat, passenger, iceberg, horizon, ocean reflection, rigging, composition, color, exposure, and the entire lower 82 percent of the image. Preserve the existing left/right horizontal wrap and do not move, add, remove, duplicate, or redesign any object.
Constraints: seamless full 360 horizontal wrap; coherent zenith; no visible blend band between repaired sky and preserved sky; no text; no watermark.
Avoid: radial star trails, circular star rings, Milky Way bands, aurora, clouds, moon, meteors, new lights, changed ship geometry, changed faces, changed water, changed horizon, or any edits outside the upper sky.
```

The first result reduced the star density but still produced a visible vortex
at maximum upward pitch, so it was not accepted as the final pole repair.

## Exact second edit prompt

```text
Use case: precise-object-edit
Input images: Image 1 is the current full-spherical equirectangular Titanic game panorama.
Primary request: eliminate the remaining visible zenith star vortex by changing only the upper polar sky.
Change only: the upper 35 percent of the frame. Make the exact upper 22 percent a completely featureless, uniform very dark navy-black sky with ZERO stars, ZERO specks, ZERO texture, ZERO glow, ZERO bands, and ZERO radial detail. From 22 percent to 35 percent of image height, introduce an extremely smooth vertical blend into the preserved lower night sky, with only a few tiny stars appearing gradually near the bottom of that transition. The exact top edge must be one uniform color across the entire width so it collapses to a clean, invisible zenith point in a 360 viewer.
Preserve exactly: the 2:1 equirectangular projection and 1774 x 887 dimensions; Titanic, its angle and lights; all lifeboats, passengers, iceberg, horizon, ocean, reflections, rigging, composition, exposure, left/right wrap, and every pixel below the upper-sky transition. Do not move, add, remove, duplicate, redraw, or reinterpret any subject.
Constraints: no visible horizontal blend boundary; seamless left/right wrap; clean uniform zenith; no text; no watermark.
Avoid: ANY stars or noise in the upper 22 percent; radial star trails; circular rings; pinched burst; Milky Way; aurora; clouds; moon; meteors; new lights; and any change to ship, people, water, horizon, or lower composition.
```

The second result supplied the clean polar sky but changed non-target content.
Only its upper sky was therefore used. A deterministic alpha composite keeps
that sky fully through row `194`, blends it through rows `195–329`, and
preserves the accepted first-edit runtime pixels exactly from row `330`
downward. The final PNG was flattened back to RGB.

## Acceptance evidence

- Exact `1774 × 887`, 8-bit RGB PNG: pass.
- Lower scene preserved exactly below the transition: pass.
- Horizontal wrap and seam sector: pass.
- Production-viewer maximum-pitch zenith: pass; no vortex, ring, or hole.
- Runtime canvas and clean console smoke: pass.

This is a targeted technical repair of a generated reconstruction, not a claim
of specialist historical certification.

import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { scenes } from "./scenes";

describe("scene integrity", () => {
  it("keeps the 10-round release gate with unique IDs and assets", () => {
    const ids = scenes.map((scene) => scene.id.trim());
    const panoramaUrls = scenes.map((scene) => scene.panorama.url.trim());

    expect(scenes).toHaveLength(10);
    expect(ids.every((id) => id.length > 0)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      panoramaUrls.every(
        (url) => url.startsWith("/images/") && url.endsWith(".png"),
      ),
    ).toBe(true);
    expect(
      panoramaUrls.every((url) =>
        existsSync(join(process.cwd(), "public", url.slice(1))),
      ),
    ).toBe(true);
    expect(new Set(panoramaUrls).size).toBe(panoramaUrls.length);
  });

  it.each(scenes)("$id has complete playable content", (scene) => {
    const { min, max } = scene.round.yearRange;
    const { yawDegrees, pitchDegrees, zoomLevel } =
      scene.panorama.initialView;

    expect(scene.event.trim()).not.toBe("");
    expect(scene.date).toMatch(/^\d{4}(?:-\d{2}-\d{2})?$/);
    expect(scene.acceptedEventAliases.length).toBeGreaterThan(0);
    expect(
      scene.acceptedEventAliases.every((alias) => alias.trim().length > 0),
    ).toBe(true);
    expect(scene.panorama.url.trim()).not.toBe("");
    expect(scene.location.label.trim()).not.toBe("");
    expect(scene.explanation.trim()).not.toBe("");
    expect(["earth", "moon"]).toContain(scene.location.body ?? "earth");

    expect(Number.isFinite(scene.location.lat)).toBe(true);
    expect(scene.location.lat).toBeGreaterThanOrEqual(-90);
    expect(scene.location.lat).toBeLessThanOrEqual(90);
    expect(Number.isFinite(scene.location.lng)).toBe(true);
    expect(scene.location.lng).toBeGreaterThanOrEqual(-180);
    expect(scene.location.lng).toBeLessThanOrEqual(180);

    expect(Number.isInteger(min)).toBe(true);
    expect(Number.isInteger(max)).toBe(true);
    expect(Number.isInteger(scene.round.initialYear)).toBe(true);
    expect(Number.isInteger(scene.year)).toBe(true);
    expect(min).toBeLessThan(max);
    expect(scene.round.initialYear).toBeGreaterThanOrEqual(min);
    expect(scene.round.initialYear).toBeLessThanOrEqual(max);
    expect(scene.year).toBeGreaterThanOrEqual(min);
    expect(scene.year).toBeLessThanOrEqual(max);

    expect(Number.isFinite(yawDegrees)).toBe(true);
    expect(Number.isFinite(pitchDegrees)).toBe(true);
    expect(Number.isFinite(zoomLevel)).toBe(true);
  });

  it("keeps the Moon round explicit instead of using a false Earth point", () => {
    const moonScenes = scenes.filter(
      (scene) => scene.location.body === "moon",
    );

    expect(moonScenes).toHaveLength(1);
    expect(moonScenes[0].id).toBe("apollo-11-moon-landing");
    expect(moonScenes[0].location.label).toContain("Moon");
  });
});

import { describe, expect, it } from "vitest";
import { scenes } from "./scenes";

describe("scene integrity", () => {
  it("keeps a non-empty ordered list with unique IDs", () => {
    const ids = scenes.map((scene) => scene.id.trim());

    expect(scenes.length).toBeGreaterThan(0);
    expect(ids.every((id) => id.length > 0)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(scenes)("$id has complete playable content", (scene) => {
    const { min, max } = scene.round.yearRange;
    const { yawDegrees, pitchDegrees, zoomLevel } =
      scene.panorama.initialView;

    expect(scene.event.trim()).not.toBe("");
    expect(scene.acceptedEventAliases.length).toBeGreaterThan(0);
    expect(
      scene.acceptedEventAliases.every((alias) => alias.trim().length > 0),
    ).toBe(true);
    expect(scene.panorama.url.trim()).not.toBe("");
    expect(scene.location.label.trim()).not.toBe("");
    expect(scene.explanation.trim()).not.toBe("");

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
});

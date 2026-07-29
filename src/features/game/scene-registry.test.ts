import { describe, expect, it } from "vitest";
import { bostonTeaPartyScene } from "./boston-tea-party";
import type {
  GameSessionDefinition,
  Scene,
} from "./model";
import {
  previewSessionDefinition,
  resolveGameSession,
  sceneRegistry,
} from "./scene-registry";

describe("scene registry", () => {
  it("resolves session order into scene data", () => {
    const session = resolveGameSession(
      previewSessionDefinition,
      sceneRegistry,
    );

    expect(session.scenes.map((scene) => scene.id)).toEqual([
      "boston-tea-party",
      "wright-brothers-first-flight",
    ]);
    expect(session.scenes[1].panorama.initialView).toEqual({
      yawDegrees: 68,
      pitchDegrees: 0,
      zoomLevel: 71,
    });
    expect(session.timerDurationSeconds).toBe(120);
  });

  it("rejects empty, duplicate, and unknown scene lists", () => {
    expect(() =>
      resolveGameSession(
        {
          ...previewSessionDefinition,
          sceneIds: [],
        },
        sceneRegistry,
      ),
    ).toThrow(/at least one scene/);

    expect(() =>
      resolveGameSession(
        {
          ...previewSessionDefinition,
          sceneIds: [
            bostonTeaPartyScene.id,
            bostonTeaPartyScene.id,
          ],
        },
        sceneRegistry,
      ),
    ).toThrow(/duplicate scene IDs/);

    expect(() =>
      resolveGameSession(
        {
          ...previewSessionDefinition,
          sceneIds: ["missing-scene"],
        },
        sceneRegistry,
      ),
    ).toThrow(/unknown scene/);
  });

  it("rejects invalid session and round configuration", () => {
    const invalidDuration: GameSessionDefinition = {
      ...previewSessionDefinition,
      timerDurationSeconds: 0,
    };
    const invalidScene: Scene = {
      ...bostonTeaPartyScene,
      round: {
        initialYear: 1773,
        yearRange: {
          min: 2000,
          max: 1500,
        },
      },
    };

    expect(() =>
      resolveGameSession(invalidDuration, sceneRegistry),
    ).toThrow(/positive timer duration/);

    expect(() =>
      resolveGameSession(previewSessionDefinition, {
        [invalidScene.id]: invalidScene,
      }),
    ).toThrow(/invalid year range/);
  });

  it("rejects an initial year outside the allowed range", () => {
    const invalidScene: Scene = {
      ...bostonTeaPartyScene,
      round: {
        initialYear: 1499,
        yearRange: {
          min: 1500,
          max: 2000,
        },
      },
    };

    expect(() =>
      resolveGameSession(previewSessionDefinition, {
        [invalidScene.id]: invalidScene,
      }),
    ).toThrow(/initial year outside/);
  });

  it("rejects a correct year outside the selectable range", () => {
    const invalidScene: Scene = {
      ...bostonTeaPartyScene,
      year: 1499,
    };

    expect(() =>
      resolveGameSession(previewSessionDefinition, {
        [invalidScene.id]: invalidScene,
      }),
    ).toThrow(/correct year outside/);
  });

  it("rejects a zero-width year range", () => {
    const invalidScene: Scene = {
      ...bostonTeaPartyScene,
      round: {
        initialYear: 1773,
        yearRange: {
          min: 1773,
          max: 1773,
        },
      },
    };

    expect(() =>
      resolveGameSession(previewSessionDefinition, {
        [invalidScene.id]: invalidScene,
      }),
    ).toThrow(/invalid year range/);
  });

  it("rejects an invalid initial panorama view", () => {
    const invalidScene: Scene = {
      ...bostonTeaPartyScene,
      panorama: {
        ...bostonTeaPartyScene.panorama,
        initialView: {
          ...bostonTeaPartyScene.panorama.initialView,
          pitchDegrees: 91,
        },
      },
    };

    expect(() =>
      resolveGameSession(previewSessionDefinition, {
        [invalidScene.id]: invalidScene,
      }),
    ).toThrow(/invalid initial panorama view/);
  });

  it("rejects an empty panorama URL", () => {
    const invalidScene: Scene = {
      ...bostonTeaPartyScene,
      panorama: {
        ...bostonTeaPartyScene.panorama,
        url: " ",
      },
    };

    expect(() =>
      resolveGameSession(previewSessionDefinition, {
        [invalidScene.id]: invalidScene,
      }),
    ).toThrow(/invalid panorama URL/);
  });
});

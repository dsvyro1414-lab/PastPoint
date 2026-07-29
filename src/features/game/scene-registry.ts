import { bostonTeaPartyScene } from "./boston-tea-party";
import type {
  GameSessionDefinition,
  ResolvedGameSession,
  Scene,
} from "./model";
import { wrightBrothersFirstFlightScene } from "./wright-brothers-first-flight";

export type SceneRegistry = Readonly<Record<string, Scene>>;

export const sceneRegistry = {
  [bostonTeaPartyScene.id]: bostonTeaPartyScene,
  [wrightBrothersFirstFlightScene.id]: wrightBrothersFirstFlightScene,
} satisfies SceneRegistry;

export const previewSessionDefinition = {
  id: "preview",
  sceneIds: [
    bostonTeaPartyScene.id,
    wrightBrothersFirstFlightScene.id,
  ],
  timerDurationSeconds: 120,
  panoramaOnboarding: {
    label: "360°",
    instruction: "Drag to look around",
  },
} satisfies GameSessionDefinition;

function validateSceneConfiguration(scene: Scene) {
  const { initialYear, yearRange } = scene.round;
  const { yawDegrees, pitchDegrees, zoomLevel } =
    scene.panorama.initialView;

  if (scene.panorama.url.trim().length === 0) {
    throw new Error(`Scene "${scene.id}" has an invalid panorama URL.`);
  }

  if (
    !Number.isFinite(yawDegrees) ||
    !Number.isFinite(pitchDegrees) ||
    pitchDegrees < -90 ||
    pitchDegrees > 90 ||
    !Number.isFinite(zoomLevel) ||
    zoomLevel < 0 ||
    zoomLevel > 100
  ) {
    throw new Error(
      `Scene "${scene.id}" has an invalid initial panorama view.`,
    );
  }

  if (
    !Number.isInteger(yearRange.min) ||
    !Number.isInteger(yearRange.max) ||
    yearRange.min >= yearRange.max
  ) {
    throw new Error(`Scene "${scene.id}" has an invalid year range.`);
  }

  if (
    !Number.isInteger(initialYear) ||
    initialYear < yearRange.min ||
    initialYear > yearRange.max
  ) {
    throw new Error(
      `Scene "${scene.id}" has an initial year outside its allowed range.`,
    );
  }

  if (
    !Number.isInteger(scene.year) ||
    scene.year < yearRange.min ||
    scene.year > yearRange.max
  ) {
    throw new Error(
      `Scene "${scene.id}" has a correct year outside its allowed range.`,
    );
  }
}

export function resolveGameSession(
  definition: GameSessionDefinition,
  registry: SceneRegistry,
): ResolvedGameSession {
  if (definition.sceneIds.length === 0) {
    throw new Error(`Session "${definition.id}" must contain at least one scene.`);
  }

  if (
    !Number.isInteger(definition.timerDurationSeconds) ||
    definition.timerDurationSeconds <= 0
  ) {
    throw new Error(
      `Session "${definition.id}" must use a positive timer duration.`,
    );
  }

  const uniqueSceneIds = new Set(definition.sceneIds);

  if (uniqueSceneIds.size !== definition.sceneIds.length) {
    throw new Error(`Session "${definition.id}" contains duplicate scene IDs.`);
  }

  const scenes = definition.sceneIds.map((sceneId) => {
    const scene = registry[sceneId];

    if (!scene) {
      throw new Error(
        `Session "${definition.id}" references unknown scene "${sceneId}".`,
      );
    }

    if (scene.id !== sceneId) {
      throw new Error(
        `Scene registry key "${sceneId}" does not match scene ID "${scene.id}".`,
      );
    }

    validateSceneConfiguration(scene);
    return scene;
  });

  return {
    ...definition,
    scenes: scenes as [Scene, ...Scene[]],
  };
}

export const previewSession = resolveGameSession(
  previewSessionDefinition,
  sceneRegistry,
);

import { bostonTeaPartyScene } from "./boston-tea-party";
import type { Scene } from "./model";
import { wrightBrothersFirstFlightScene } from "./wright-brothers-first-flight";

export const scenes: readonly [Scene, ...Scene[]] = [
  bostonTeaPartyScene,
  wrightBrothersFirstFlightScene,
];

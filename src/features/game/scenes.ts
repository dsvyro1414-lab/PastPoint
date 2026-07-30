import { apollo11MoonLandingScene } from "./apollo-11-moon-landing";
import { bostonTeaPartyScene } from "./boston-tea-party";
import { declarationOfIndependenceScene } from "./declaration-of-independence";
import { fallOfConstantinopleScene } from "./fall-of-constantinople";
import { firstAscentOfMountEverestScene } from "./first-ascent-of-mount-everest";
import type { Scene } from "./model";
import { pearlHarborAttackScene } from "./pearl-harbor-attack";
import { stormingOfTheBastilleScene } from "./storming-of-the-bastille";
import { titanicSinkingScene } from "./titanic-sinking";
import { vostok1FirstHumanSpaceflightScene } from "./vostok-1-first-human-spaceflight";
import { wrightBrothersFirstFlightScene } from "./wright-brothers-first-flight";

export const scenes: readonly [Scene, ...Scene[]] = [
  fallOfConstantinopleScene,
  bostonTeaPartyScene,
  declarationOfIndependenceScene,
  stormingOfTheBastilleScene,
  wrightBrothersFirstFlightScene,
  titanicSinkingScene,
  pearlHarborAttackScene,
  firstAscentOfMountEverestScene,
  vostok1FirstHumanSpaceflightScene,
  apollo11MoonLandingScene,
];

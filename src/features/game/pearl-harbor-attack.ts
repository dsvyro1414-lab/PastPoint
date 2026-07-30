import type { Scene } from "./model";

export const pearlHarborAttackScene: Scene = {
  id: "pearl-harbor-attack",
  panorama: {
    url: "/images/pearl-harbor-attack-panorama.png",
    initialView: {
      yawDegrees: 0,
      pitchDegrees: 0,
      zoomLevel: 71,
    },
  },
  event: "Attack on Pearl Harbor",
  acceptedEventAliases: [
    "Attack on Pearl Harbor",
    "The Attack on Pearl Harbor",
    "Pearl Harbor Attack",
    "Bombing of Pearl Harbor",
    "Pearl Harbor Bombing",
    "Pearl Harbor",
    "December 7 1941",
    "Нападение на Перл-Харбор",
    "Атака на Перл-Харбор",
    "Бомбардировка Перл-Харбора",
    "Перл-Харбор",
    "Нападение на Пёрл-Харбор",
    "Пёрл-Харбор",
  ],
  year: 1941,
  date: "1941-12-07",
  location: {
    label: "Battleship Row, Pearl Harbor, Oʻahu, Hawaiʻi",
    lat: 21.365,
    lng: -157.9502,
  },
  explanation:
    "Battleships moored beside Ford Island, low-flying Japanese carrier aircraft, torpedo wakes, burning hangars, and the Hawaiian harbor identify the attack on Pearl Harbor. The surprise attack began shortly before 8 a.m. on December 7, 1941.",
  round: {
    initialYear: 1940,
    yearRange: {
      min: 1850,
      max: 2000,
    },
  },
};

import type { Scene } from "./model";

export const stormingOfTheBastilleScene: Scene = {
  id: "storming-of-the-bastille",
  panorama: {
    url: "/images/storming-of-the-bastille-panorama.png",
    initialView: {
      yawDegrees: 0,
      pitchDegrees: 0,
      zoomLevel: 71,
    },
  },
  event: "Storming of the Bastille",
  acceptedEventAliases: [
    "Storming of the Bastille",
    "The Storming of the Bastille",
    "Storming of Bastille",
    "Taking of the Bastille",
    "Fall of the Bastille",
    "Prise de la Bastille",
    "Bastille",
    "Взятие Бастилии",
    "Штурм Бастилии",
    "Бастилия",
  ],
  year: 1789,
  date: "1789-07-14",
  location: {
    label: "Bastille fortress site, Paris, France",
    lat: 48.8531,
    lng: 2.3696,
  },
  explanation:
    "The eight-towered medieval fortress, its drawbridge and moat, armed Parisian crowd, cannon, and musket smoke identify the storming of the Bastille in Paris on July 14, 1789.",
  round: {
    initialYear: 1750,
    yearRange: {
      min: 1650,
      max: 1900,
    },
  },
};

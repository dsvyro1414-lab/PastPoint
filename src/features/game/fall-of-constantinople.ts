import type { Scene } from "./model";

export const fallOfConstantinopleScene: Scene = {
  id: "fall-of-constantinople",
  panorama: {
    url: "/images/fall-of-constantinople-panorama.png",
    initialView: {
      yawDegrees: 0,
      pitchDegrees: 0,
      zoomLevel: 71,
    },
  },
  event: "Fall of Constantinople",
  acceptedEventAliases: [
    "Fall of Constantinople",
    "The Fall of Constantinople",
    "Conquest of Constantinople",
    "Ottoman Conquest of Constantinople",
    "Siege of Constantinople",
    "Siege of Constantinople 1453",
    "Constantinople 1453",
    "Падение Константинополя",
    "Взятие Константинополя",
    "Завоевание Константинополя",
    "Осада Константинополя",
    "Константинополь 1453",
  ],
  year: 1453,
  date: "1453-05-29",
  location: {
    label:
      "Theodosian Land Walls, Constantinople (present-day Istanbul), Türkiye",
    lat: 41.025,
    lng: 28.925,
  },
  explanation:
    "The breached double land walls, deep defensive ditch, enormous Ottoman bombards, and opposing fifteenth-century forces identify the final assault on Constantinople. Ottoman forces captured the Byzantine capital on May 29, 1453.",
  round: {
    initialYear: 1450,
    yearRange: {
      min: 1200,
      max: 1700,
    },
  },
};

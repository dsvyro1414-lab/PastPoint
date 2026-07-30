import type { Scene } from "./model";

export const titanicSinkingScene: Scene = {
  id: "titanic-sinking",
  panorama: {
    url: "/images/titanic-sinking-panorama.png",
    initialView: {
      yawDegrees: 0,
      pitchDegrees: 0,
      zoomLevel: 71,
    },
  },
  event: "Sinking of RMS Titanic",
  acceptedEventAliases: [
    "Sinking of RMS Titanic",
    "The Sinking of RMS Titanic",
    "Sinking of the Titanic",
    "The Sinking of the Titanic",
    "Titanic Sinking",
    "RMS Titanic Disaster",
    "Titanic Disaster",
    "Titanic",
    "RMS Titanic",
    "Крушение Титаника",
    "Гибель Титаника",
    "Затопление Титаника",
    "Титаник",
  ],
  year: 1912,
  date: "1912-04-15",
  location: {
    label: "North Atlantic Ocean, RMS Titanic wreck area",
    lat: 41.7325,
    lng: -49.9469,
  },
  explanation:
    "The four-funnel ocean liner sinking bow-first, lifeboats in the water, iceberg, and cold North Atlantic night identify the loss of RMS Titanic. The ship struck an iceberg late on April 14 and sank early on April 15, 1912.",
  round: {
    initialYear: 1900,
    yearRange: {
      min: 1800,
      max: 2000,
    },
  },
};

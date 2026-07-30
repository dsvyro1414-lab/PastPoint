import type { Scene } from "./model";

export const apollo11MoonLandingScene: Scene = {
  id: "apollo-11-moon-landing",
  panorama: {
    url: "/images/apollo-11-moon-landing-panorama.png",
    initialView: {
      yawDegrees: 0,
      pitchDegrees: 0,
      zoomLevel: 60,
    },
  },
  event: "Apollo 11 Moon Landing",
  acceptedEventAliases: [
    "Apollo 11 Moon Landing",
    "Apollo 11 Landing",
    "Apollo 11",
    "First Moon Landing",
    "The First Moon Landing",
    "First Human Moon Landing",
    "First Crewed Moon Landing",
    "First Humans on the Moon",
    "Moon Landing",
    "Man on the Moon",
    "Высадка Аполлона-11 на Луну",
    "Высадка Аполлона 11 на Луну",
    "Первая высадка на Луну",
    "Первая высадка людей на Луну",
    "Первые люди на Луне",
    "Высадка на Луну",
    "Аполлон-11",
    "Аполлон 11",
  ],
  year: 1969,
  date: "1969-07-20",
  location: {
    body: "moon",
    coordinateSystem: "selenographic",
    label: "Tranquility Base, Sea of Tranquility, Moon",
    lat: 0.67409,
    lng: 23.47298,
  },
  explanation:
    "The Eagle lunar module, two Apollo pressure suits, surface experiments, and airless gray terrain identify Apollo 11 at Tranquility Base. Neil Armstrong and Buzz Aldrin completed the first crewed Moon landing and surface walk in July 1969.",
  round: {
    initialYear: 1960,
    yearRange: {
      min: 1900,
      max: 2025,
    },
  },
};

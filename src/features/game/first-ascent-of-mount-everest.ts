import type { Scene } from "./model";

export const firstAscentOfMountEverestScene: Scene = {
  id: "first-ascent-of-mount-everest",
  panorama: {
    url: "/images/first-ascent-of-mount-everest-panorama.png",
    initialView: {
      yawDegrees: 0,
      pitchDegrees: 0,
      zoomLevel: 0,
    },
  },
  event: "First Ascent of Mount Everest",
  acceptedEventAliases: [
    "First Ascent of Mount Everest",
    "The First Ascent of Mount Everest",
    "First Successful Ascent of Mount Everest",
    "First Successful Everest Ascent",
    "Everest First Ascent",
    "1953 Everest Ascent",
    "1953 Mount Everest Expedition",
    "Hillary and Tenzing Reach Everest",
    "Hillary and Tenzing Summit Everest",
    "Edmund Hillary and Tenzing Norgay Reach Everest",
    "Everest",
    "Mount Everest",
    "Первое восхождение на Эверест",
    "Первое успешное восхождение на Эверест",
    "Хиллари и Тенцинг на вершине Эвереста",
    "Эдмунд Хиллари и Тенцинг Норгей на Эвересте",
    "Эверест",
  ],
  year: 1953,
  date: "1953-05-29",
  location: {
    label: "Summit of Mount Everest, Nepal–Tibet border",
    lat: 27.9881,
    lng: 86.925,
  },
  explanation:
    "The exposed summit ridge, period open-circuit oxygen sets, ice axes, and the two climbers in 1953 high-altitude clothing identify the first successful ascent of Mount Everest. Edmund Hillary and Tenzing Norgay reached the summit by the south-east ridge at about 11:30 a.m. on May 29, 1953.",
  round: {
    initialYear: 1950,
    yearRange: {
      min: 1900,
      max: 2000,
    },
  },
};

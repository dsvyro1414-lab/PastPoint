import type { Scene } from "./model";

export const vostok1FirstHumanSpaceflightScene: Scene = {
  id: "vostok-1-first-human-spaceflight",
  panorama: {
    url: "/images/vostok-1-launch-panorama.png",
    initialView: {
      yawDegrees: 0,
      pitchDegrees: 8,
      zoomLevel: 71,
    },
  },
  event: "Vostok 1: First Human Spaceflight",
  acceptedEventAliases: [
    "Vostok 1 First Human Spaceflight",
    "Vostok 1",
    "Vostok One",
    "Yuri Gagarin's Flight",
    "Yuri Gagarin Spaceflight",
    "Gagarin's First Spaceflight",
    "Gagarin Flight",
    "Gagarin",
    "First Human Spaceflight",
    "First Human in Space",
    "First Man in Space",
    "Полет Гагарина",
    "Полёт Гагарина",
    "Первый полет человека в космос",
    "Первый полёт человека в космос",
    "Восток-1",
    "Восток 1",
    "Юрий Гагарин",
    "Гагарин",
  ],
  year: 1961,
  date: "1961-04-12",
  location: {
    label: "Baikonur Cosmodrome Site No. 1, Kazakhstan",
    lat: 45.9203,
    lng: 63.3422,
  },
  explanation:
    "The Vostok launch vehicle, four tapered boosters, service gantries, and open Kazakh steppe identify the start of Vostok 1 from Baikonur. Yuri Gagarin launched on April 12, 1961, becoming the first human to travel into space and orbit Earth.",
  round: {
    initialYear: 1960,
    yearRange: {
      min: 1900,
      max: 2025,
    },
  },
};

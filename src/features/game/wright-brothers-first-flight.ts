import type { Scene } from "./model";

export const wrightBrothersFirstFlightScene: Scene = {
  id: "wright-brothers-first-flight",
  panorama: {
    url: "/images/wright-brothers-first-flight-panorama.png",
    initialView: {
      yawDegrees: 68,
      pitchDegrees: 0,
      zoomLevel: 71,
    },
  },
  event: "Wright Brothers' First Flight",
  acceptedEventAliases: [
    "Wright Brothers' First Flight",
    "The Wright Brothers' First Flight",
    "First Flight of the Wright Brothers",
    "Wright Brothers' First Powered Flight",
    "First Powered Flight by the Wright Brothers",
    "First Controlled Powered Flight by the Wright Brothers",
    "First Flight of the Wright Flyer",
    "Wright Flyer First Flight",
    "Orville Wright's First Flight",
    "Kitty Hawk First Flight",
    "Первый полёт братьев Райт",
    "Первый полет братьев Райт",
    "Первый управляемый полёт братьев Райт",
    "Первый управляемый полет братьев Райт",
    "Первый моторный полёт братьев Райт",
    "Первый моторный полет братьев Райт",
    "Первый полёт самолёта братьев Райт",
    "Первый полет самолета братьев Райт",
    "Первый полёт аэроплана братьев Райт",
    "Первый полет аэроплана братьев Райт",
    "Первый полёт Флайера братьев Райт",
    "Первый полет Флайера братьев Райт",
  ],
  year: 1903,
  date: "1903-12-17",
  location: {
    label:
      "First Flight takeoff point, Kill Devil Hills near Kitty Hawk, North Carolina",
    lat: 36.01984,
    lng: -75.66881,
  },
  explanation:
    "The natural-muslin biplane, wooden launch rail, Orville lying prone at the controls, and Wilbur running beside it identify the Wright brothers' first powered, controlled flight. It took place at Kill Devil Hills near Kitty Hawk, North Carolina, on December 17, 1903; the first flight covered 120 feet in 12 seconds.",
  round: {
    initialYear: 1900,
    yearRange: {
      min: 1800,
      max: 2000,
    },
  },
};

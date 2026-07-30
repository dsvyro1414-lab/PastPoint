import type { Scene } from "./model";

export const declarationOfIndependenceScene: Scene = {
  id: "declaration-of-independence",
  panorama: {
    url: "/images/declaration-of-independence-panorama.png",
    initialView: {
      yawDegrees: 0,
      pitchDegrees: 0,
      zoomLevel: 71,
    },
  },
  event: "Adoption of the Declaration of Independence",
  acceptedEventAliases: [
    "Adoption of the Declaration of Independence",
    "Declaration of Independence",
    "US Declaration of Independence",
    "U.S. Declaration of Independence",
    "American Declaration of Independence",
    "American Independence",
    "United States Independence",
    "Fourth of July",
    "4th of July",
    "July 4 1776",
    "Принятие Декларации независимости",
    "Декларация независимости США",
    "Американская декларация независимости",
    "День независимости США",
    "4 июля 1776",
  ],
  year: 1776,
  date: "1776-07-04",
  location: {
    label: "Assembly Room, Pennsylvania State House, Philadelphia",
    lat: 39.9489,
    lng: -75.1501,
  },
  explanation:
    "The Pennsylvania State House Assembly Room, colony tables, Windsor chairs, quills, and delegates reviewing the approved manuscript identify the adoption of the Declaration of Independence. Congress adopted its text on July 4, 1776; most delegates signed the engrossed parchment on August 2.",
  round: {
    initialYear: 1750,
    yearRange: {
      min: 1600,
      max: 1900,
    },
  },
};

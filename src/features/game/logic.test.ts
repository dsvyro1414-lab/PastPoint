import { describe, expect, it } from "vitest";
import { bostonTeaPartyScene } from "./boston-tea-party";
import {
  evaluateAnswer,
  haversineDistanceKm,
  isAcceptedEventAnswer,
  normalizeAnswer,
} from "./logic";
import { scenes } from "./scenes";
import { wrightBrothersFirstFlightScene } from "./wright-brothers-first-flight";

describe("round evaluation", () => {
  it("normalizes harmless punctuation and repeated whitespace", () => {
    expect(normalizeAnswer("  The   Boston-Tea Party!  ")).toBe(
      "the boston tea party",
    );
  });

  it("accepts English and Russian aliases without fuzzy AI judging", () => {
    expect(
      isAcceptedEventAnswer("Бостонское чаепитие", bostonTeaPartyScene),
    ).toBe(true);
    expect(
      isAcceptedEventAnswer("Boston Massacre", bostonTeaPartyScene),
    ).toBe(false);
    expect(
      isAcceptedEventAnswer(
        "Первый полёт братьев Райт",
        wrightBrothersFirstFlightScene,
      ),
    ).toBe(true);
    expect(
      isAcceptedEventAnswer(
        "First Flight",
        wrightBrothersFirstFlightScene,
      ),
    ).toBe(false);
  });

  it.each([
    ["fall-of-constantinople", "Constantinople 1453"],
    ["declaration-of-independence", "Fourth of July"],
    ["storming-of-the-bastille", "Bastille"],
    ["titanic-sinking", "Titanic"],
    ["pearl-harbor-attack", "Pearl Harbor"],
    ["first-ascent-of-mount-everest", "Everest"],
    ["vostok-1-first-human-spaceflight", "Gagarin"],
    ["apollo-11-moon-landing", "Moon Landing"],
  ])("accepts the recognizable shorthand for %s", (sceneId, answer) => {
    const scene = scenes.find(({ id }) => id === sceneId);

    expect(scene).toBeDefined();
    expect(isAcceptedEventAnswer(answer, scene!)).toBe(true);
  });

  it("returns zero distance for the same coordinates", () => {
    expect(
      haversineDistanceKm(
        bostonTeaPartyScene.location,
        bostonTeaPartyScene.location,
      ),
    ).toBe(0);
  });

  it("evaluates the Moon round without projecting it onto Earth", () => {
    const moonScene = scenes.find(
      ({ id }) => id === "apollo-11-moon-landing",
    );

    expect(moonScene).toBeDefined();
    expect(
      evaluateAnswer(
        {
          eventText: "Apollo 11",
          year: 1969,
          location: {
            body: "moon",
          },
        },
        moonScene!,
      ),
    ).toEqual({
      eventCorrect: true,
      yearDifference: 0,
      locationBodyCorrect: true,
      distanceKm: null,
    });
  });

  it("rejects an Earth location body for the Moon without calculating distance", () => {
    const moonScene = scenes.find(
      ({ id }) => id === "apollo-11-moon-landing",
    );

    expect(moonScene).toBeDefined();
    expect(
      evaluateAnswer(
        {
          eventText: "Apollo 11",
          year: 1969,
          location: bostonTeaPartyScene.location,
        },
        moonScene!,
      ),
    ).toMatchObject({
      locationBodyCorrect: false,
      distanceKm: null,
    });
  });

  it("keeps the antipodal distance finite", () => {
    const distance = haversineDistanceKm(
      { lat: 0, lng: 0 },
      { lat: 0, lng: 180 },
    );

    expect(Number.isFinite(distance)).toBe(true);
    expect(distance).toBeCloseTo(Math.PI * 6371.0088, 6);
  });

  it("calculates raw round facts without inventing a score", () => {
    expect(
      evaluateAnswer(
        {
          eventText: "Boston Tea Party",
          year: 1775,
          location: bostonTeaPartyScene.location,
        },
        bostonTeaPartyScene,
      ),
    ).toEqual({
      eventCorrect: true,
      yearDifference: 2,
      locationBodyCorrect: true,
      distanceKm: 0,
    });
  });
});

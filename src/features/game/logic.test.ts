import { describe, expect, it } from "vitest";
import { bostonTeaPartyScene } from "./boston-tea-party";
import {
  evaluateAnswer,
  haversineDistanceKm,
  isAcceptedEventAnswer,
  normalizeAnswer,
} from "./logic";
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

  it("returns zero distance for the same coordinates", () => {
    expect(
      haversineDistanceKm(
        bostonTeaPartyScene.location,
        bostonTeaPartyScene.location,
      ),
    ).toBe(0);
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
      distanceKm: 0,
    });
  });
});

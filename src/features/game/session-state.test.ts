import { describe, expect, it } from "vitest";
import { bostonTeaPartyScene } from "./boston-tea-party";
import type { Submission } from "./model";
import {
  createInitialSessionState,
  createSessionReducer,
} from "./session-state";
import { wrightBrothersFirstFlightScene } from "./wright-brothers-first-flight";

const scenes = [
  bostonTeaPartyScene,
  wrightBrothersFirstFlightScene,
] as const;
const reducer = createSessionReducer(scenes);

const submission: Submission = {
  answer: {
    eventText: "Boston Tea Party",
    year: 1773,
    location: bostonTeaPartyScene.location,
  },
  result: {
    eventCorrect: true,
    yearDifference: 0,
    distanceKm: 0,
  },
};

const secondSubmission: Submission = {
  answer: {
    eventText: "Wright Brothers' First Flight",
    year: 1903,
    location: wrightBrothersFirstFlightScene.location,
  },
  result: {
    eventCorrect: true,
    yearDifference: 0,
    distanceKm: 0,
  },
};

function createCompletedRound() {
  let state = createInitialSessionState(
    bostonTeaPartyScene.round.initialYear,
  );

  state = reducer(state, {
    type: "set-event",
    value: "Boston Tea Party",
  });
  state = reducer(state, {
    type: "set-year",
    value: 1773,
    touched: true,
  });
  state = reducer(state, {
    type: "set-location",
    value: bostonTeaPartyScene.location,
  });
  state = reducer(state, { type: "toggle-map" });
  state = reducer(state, { type: "panorama-interacted" });

  return reducer(state, { type: "submit", submission });
}

describe("multi-round session state", () => {
  it("starts the first scene from its configured initial year", () => {
    expect(
      createInitialSessionState(
        bostonTeaPartyScene.round.initialYear,
      ),
    ).toMatchObject({
      roundIndex: 0,
      roundToken: 0,
      phase: "playing",
      year: 1750,
      yearTouched: false,
      location: null,
      panoramaCueVisible: true,
      submission: null,
    });
  });

  it("replays the current round with every transient value reset", () => {
    const completed = createCompletedRound();
    const replayed = reducer(completed, { type: "replay-round" });

    expect(replayed).toEqual({
      roundIndex: 0,
      roundToken: 1,
      phase: "playing",
      eventText: "",
      year: 1750,
      yearTouched: false,
      location: null,
      mapMinimized: false,
      panoramaCueVisible: true,
      submission: null,
    });
  });

  it("advances deterministically and uses the next scene configuration", () => {
    const advanced = reducer(createCompletedRound(), {
      type: "advance-round",
    });

    expect(advanced).toMatchObject({
      roundIndex: 1,
      roundToken: 1,
      phase: "playing",
      eventText: "",
      year: 1900,
      yearTouched: false,
      location: null,
      panoramaCueVisible: true,
      submission: null,
    });
  });

  it("does not advance beyond the final scene", () => {
    const finalRound = reducer(createCompletedRound(), {
      type: "advance-round",
    });
    const completedFinalRound = reducer(finalRound, {
      type: "submit",
      submission: secondSubmission,
    });

    expect(
      reducer(completedFinalRound, { type: "advance-round" }),
    ).toBe(completedFinalRound);
  });

  it("restarts the full session at round one", () => {
    const finalRound = reducer(createCompletedRound(), {
      type: "advance-round",
    });
    const completedFinalRound = reducer(finalRound, {
      type: "submit",
      submission: secondSubmission,
    });
    const restarted = reducer(completedFinalRound, {
      type: "restart-session",
    });

    expect(restarted).toEqual({
      roundIndex: 0,
      roundToken: 2,
      phase: "playing",
      eventText: "",
      year: 1750,
      yearTouched: false,
      location: null,
      mapMinimized: false,
      panoramaCueVisible: true,
      submission: null,
    });
  });

  it("cannot replay, advance, or restart an unfinished round", () => {
    const playing = createInitialSessionState(
      bostonTeaPartyScene.round.initialYear,
    );

    expect(reducer(playing, { type: "replay-round" })).toBe(playing);
    expect(reducer(playing, { type: "advance-round" })).toBe(playing);
    expect(reducer(playing, { type: "restart-session" })).toBe(playing);
  });

  it("keeps the first submitted facts immutable", () => {
    const completed = createCompletedRound();
    const replacement = {
      ...submission,
      result: {
        ...submission.result,
        eventCorrect: false,
      },
    };

    expect(
      reducer(completed, {
        type: "submit",
        submission: replacement,
      }),
    ).toBe(completed);
  });
});

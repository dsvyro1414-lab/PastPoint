import { describe, expect, it } from "vitest";
import type { Scene, Submission } from "./model";
import { scenes } from "./scenes";
import {
  createInitialSessionState,
  createSessionReducer,
} from "./session-state";

const [firstScene] = scenes;
const reducer = createSessionReducer(scenes);

const submission: Submission = {
  answer: {
    eventText: firstScene.event,
    year: firstScene.year,
    location: firstScene.location,
  },
  result: {
    eventCorrect: true,
    yearDifference: 0,
    locationBodyCorrect: true,
    distanceKm: 0,
  },
};

function createSubmission(scene: Scene): Submission {
  const isMoonScene = scene.location.body === "moon";

  return {
    answer: {
      eventText: scene.event,
      year: scene.year,
      location: isMoonScene ? { body: "moon" } : scene.location,
    },
    result: {
      eventCorrect: true,
      yearDifference: 0,
      locationBodyCorrect: true,
      distanceKm: isMoonScene ? null : 0,
    },
  };
}

function createCompletedRound() {
  let state = createInitialSessionState(
    firstScene.round.initialYear,
  );

  state = reducer(state, {
    type: "set-event",
    value: firstScene.event,
  });
  state = reducer(state, {
    type: "set-year",
    value: firstScene.year,
    touched: true,
  });
  state = reducer(state, {
    type: "set-location",
    value: firstScene.location,
  });
  state = reducer(state, { type: "toggle-map" });

  return reducer(state, { type: "submit", submission });
}

function completeSession() {
  let state = createCompletedRound();

  for (let index = 1; index < scenes.length; index += 1) {
    const scene = scenes[index];
    const roundSubmission = createSubmission(scene);

    state = reducer(state, { type: "advance-round" });
    state = reducer(state, {
      type: "set-location",
      value: roundSubmission.answer.location,
    });
    if (scene.location.body === "moon") {
      state = reducer(state, { type: "toggle-map" });
    }
    state = reducer(state, {
      type: "submit",
      submission: roundSubmission,
    });
  }

  return state;
}

describe("multi-round session state", () => {
  it("starts the first scene from its configured initial year", () => {
    expect(
      createInitialSessionState(
        firstScene.round.initialYear,
      ),
    ).toMatchObject({
      roundIndex: 0,
      roundToken: 0,
      phase: "playing",
      year: firstScene.round.initialYear,
      yearTouched: false,
      location: null,
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
      year: scenes[1].round.initialYear,
      yearTouched: false,
      location: null,
      submission: null,
    });
  });

  it("does not advance beyond the final scene", () => {
    const completedFinalRound = completeSession();

    expect(
      reducer(completedFinalRound, { type: "advance-round" }),
    ).toBe(completedFinalRound);
  });

  it("restarts the full session at round one", () => {
    const completedFinalRound = completeSession();
    const restarted = reducer(completedFinalRound, {
      type: "restart-session",
    });

    expect(restarted).toEqual({
      roundIndex: 0,
      roundToken: scenes.length,
      phase: "playing",
      eventText: "",
      year: firstScene.round.initialYear,
      yearTouched: false,
      location: null,
      mapMinimized: false,
      submission: null,
    });
  });

  it("clears the Moon choice and minimized panel on session restart", () => {
    const completedFinalRound = completeSession();

    expect(completedFinalRound.location).toEqual({ body: "moon" });
    expect(completedFinalRound.mapMinimized).toBe(true);

    expect(
      reducer(completedFinalRound, { type: "restart-session" }),
    ).toMatchObject({
      location: null,
      mapMinimized: false,
      roundIndex: 0,
    });
  });

  it("cannot advance or restart an unfinished round", () => {
    const playing = createInitialSessionState(
      firstScene.round.initialYear,
    );

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

import type { Coordinates, Scene, Submission } from "./model";

export type SessionState = {
  roundIndex: number;
  roundToken: number;
  phase: "playing" | "result";
  eventText: string;
  year: number;
  yearTouched: boolean;
  location: Coordinates | null;
  mapMinimized: boolean;
  panoramaCueVisible: boolean;
  submission: Submission | null;
};

export type SessionAction =
  | { type: "set-event"; value: string }
  | { type: "set-year"; value: number; touched: boolean }
  | { type: "set-location"; value: Coordinates }
  | { type: "toggle-map" }
  | { type: "panorama-interacted" }
  | { type: "submit"; submission: Submission }
  | { type: "advance-round" }
  | { type: "restart-session" };

export function createInitialSessionState(initialYear: number): SessionState {
  return {
    roundIndex: 0,
    roundToken: 0,
    phase: "playing",
    eventText: "",
    year: initialYear,
    yearTouched: false,
    location: null,
    mapMinimized: false,
    panoramaCueVisible: true,
    submission: null,
  };
}

function resetRound(
  state: SessionState,
  roundIndex: number,
  initialYear: number,
): SessionState {
  return {
    ...createInitialSessionState(initialYear),
    roundIndex,
    roundToken: state.roundToken + 1,
  };
}

export function createSessionReducer(
  scenes: readonly [Scene, ...Scene[]],
) {
  return function sessionReducer(
    state: SessionState,
    action: SessionAction,
  ): SessionState {
    switch (action.type) {
      case "set-event":
        return { ...state, eventText: action.value };
      case "set-year":
        return {
          ...state,
          year: action.value,
          yearTouched: state.yearTouched || action.touched,
        };
      case "set-location":
        return { ...state, location: action.value };
      case "toggle-map":
        return { ...state, mapMinimized: !state.mapMinimized };
      case "panorama-interacted":
        return state.panoramaCueVisible
          ? { ...state, panoramaCueVisible: false }
          : state;
      case "submit":
        return state.phase === "playing"
          ? {
              ...state,
              phase: "result",
              submission: action.submission,
            }
          : state;
      case "advance-round": {
        if (state.phase !== "result") {
          return state;
        }

        const nextRoundIndex = state.roundIndex + 1;
        const nextScene = scenes[nextRoundIndex];

        return nextScene
          ? resetRound(
              state,
              nextRoundIndex,
              nextScene.round.initialYear,
            )
          : state;
      }
      case "restart-session":
        return state.phase === "result"
          ? resetRound(state, 0, scenes[0].round.initialYear)
          : state;
    }
  };
}

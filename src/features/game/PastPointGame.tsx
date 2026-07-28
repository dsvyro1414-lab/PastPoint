"use client";

import {
  ArrowRight,
  HandSwipeLeft,
  Question,
} from "@phosphor-icons/react";
import {
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { CountdownTimer } from "./CountdownTimer";
import { GuessMapPanel } from "./GuessMapPanel";
import { evaluateAnswer } from "./logic";
import type {
  Coordinates,
  Scene,
  Submission,
} from "./model";
import { PanoramaViewer } from "./PanoramaViewer";
import { ResultPanel } from "./ResultPanel";
import { YearRuler } from "./YearRuler";
import styles from "./game.module.css";

const INITIAL_YEAR = 1750;

type GameState = {
  attemptId: number;
  phase: "playing" | "result";
  eventText: string;
  year: number;
  yearTouched: boolean;
  location: Coordinates | null;
  mapMinimized: boolean;
  submission: Submission | null;
};

type GameAction =
  | { type: "set-event"; value: string }
  | { type: "set-year"; value: number; touched: boolean }
  | { type: "set-location"; value: Coordinates }
  | { type: "toggle-map" }
  | { type: "submit"; submission: Submission }
  | { type: "reset" };

function createInitialState(attemptId = 0): GameState {
  return {
    attemptId,
    phase: "playing",
    eventText: "",
    year: INITIAL_YEAR,
    yearTouched: false,
    location: null,
    mapMinimized: false,
    submission: null,
  };
}

function reducer(state: GameState, action: GameAction): GameState {
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
    case "submit":
      return {
        ...state,
        phase: "result",
        submission: action.submission,
      };
    case "reset":
      return createInitialState(state.attemptId + 1);
  }
}

type PastPointGameProps = {
  scene: Scene;
};

export function PastPointGame({ scene }: PastPointGameProps) {
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createInitialState(),
  );
  const [showPanoramaCue, setShowPanoramaCue] = useState(true);

  const canSubmit = useMemo(
    () =>
      state.eventText.trim().length > 0 &&
      state.yearTouched &&
      state.location !== null,
    [
      state.eventText,
      state.location,
      state.yearTouched,
    ],
  );

  const registerPanoramaInteraction = useCallback(() => {
    setShowPanoramaCue(false);
  }, []);

  const submitAnswer = () => {
    if (!canSubmit || !state.location || state.phase !== "playing") {
      return;
    }

    const answer = {
      eventText: state.eventText.trim(),
      year: state.year,
      location: state.location,
    };

    dispatch({
      type: "submit",
      submission: {
        answer,
        result: evaluateAnswer(answer, scene),
      },
    });
  };

  const playAgain = () => {
    dispatch({ type: "reset" });
    setShowPanoramaCue(true);
  };

  return (
    <main className={styles.gameRoot}>
      <PanoramaViewer
        panoramaUrl={scene.panoramaUrl}
        resetKey={state.attemptId}
        onInteract={registerPanoramaInteraction}
      />
      <div className={styles.panoramaShade} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.brandGroup}>
          <span className={styles.brand}>PASTPOINT</span>
          <span className={styles.roundPill}>Round 1 of 1</span>
        </div>
        <CountdownTimer key={state.attemptId} />
      </header>

      {state.phase === "playing" ? (
        <>
          {showPanoramaCue ? (
            <div className={styles.panoramaCue} aria-hidden="true">
              <strong>360°</strong>
              <HandSwipeLeft size={28} weight="regular" />
              <span>Drag to look around</span>
            </div>
          ) : null}

          <GuessMapPanel
            key={`map-${state.attemptId}`}
            location={state.location}
            minimized={state.mapMinimized}
            onLocationChange={(value) =>
              dispatch({ type: "set-location", value })
            }
            onToggleMinimized={() => dispatch({ type: "toggle-map" })}
          />

          <label className={styles.eventPanel}>
            <Question size={23} weight="regular" aria-hidden="true" />
            <input
              value={state.eventText}
              onChange={(event) =>
                dispatch({ type: "set-event", value: event.target.value })
              }
              placeholder="What happened here?"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="What happened here?"
            />
          </label>

          <YearRuler
            key={`year-${state.attemptId}`}
            value={state.year}
            onChange={(value, touched) =>
              dispatch({ type: "set-year", value, touched })
            }
          />

          <button
            className={styles.submitButton}
            type="button"
            disabled={!canSubmit}
            onClick={submitAnswer}
          >
            Submit Answer
            <ArrowRight size={21} weight="bold" aria-hidden="true" />
          </button>
        </>
      ) : state.submission ? (
        <ResultPanel
          scene={scene}
          submission={state.submission}
          onPlayAgain={playAgain}
        />
      ) : null}
    </main>
  );
}

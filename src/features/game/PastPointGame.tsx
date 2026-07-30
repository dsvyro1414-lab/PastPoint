"use client";

import {
  ArrowRight,
  CalendarDots,
  Compass,
  MapPin,
  Question,
} from "@phosphor-icons/react";
import {
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { GuessMapPanel } from "./GuessMapPanel";
import { evaluateAnswer } from "./logic";
import type { Scene } from "./model";
import { PanoramaViewer } from "./PanoramaViewer";
import { ResultPanel } from "./ResultPanel";
import {
  createInitialSessionState,
  createSessionReducer,
} from "./session-state";
import { LunarLocationPanel } from "./LunarLocationPanel";
import { YearRuler } from "./YearRuler";
import styles from "./game.module.css";

type PastPointGameProps = {
  scenes: readonly [Scene, ...Scene[]];
};

type StartScreenProps = {
  roundCount: number;
  onStart: () => void;
};

function StartScreen({ roundCount, onStart }: StartScreenProps) {
  return (
    <main className={`${styles.gameRoot} ${styles.startRoot}`}>
      <div className={styles.startImage} aria-hidden="true" />
      <div className={styles.startShade} aria-hidden="true" />

      <header className={styles.startHeader}>
        <span className={styles.brand}>PASTPOINT</span>
        <span className={styles.startRoundPill}>
          {roundCount}-round session
        </span>
      </header>

      <section
        className={styles.startContent}
        aria-labelledby="pastpoint-start-title"
      >
        <p className={styles.startEyebrow}>A 360° history game</p>
        <h1 id="pastpoint-start-title">
          Read the scene.
          <br />
          Find the moment.
        </h1>
        <p className={styles.startPitch}>
          Explore a historical panorama and decide what happened, when it
          happened, and where.
        </p>

        <div className={styles.panoramaInstruction}>
          <Compass size={23} weight="regular" aria-hidden="true" />
          <span>
            Drag to look around
            <small>Scroll or pinch to zoom</small>
          </span>
        </div>

        <ol className={styles.guessInstructions}>
          <li>
            <span className={styles.instructionIcon}>
              <Question size={23} weight="regular" aria-hidden="true" />
            </span>
            <span>
              <small>What</small>
              <strong>Name the event</strong>
              <span>Use the visual clues in the scene.</span>
            </span>
          </li>
          <li>
            <span className={styles.instructionIcon}>
              <CalendarDots size={23} weight="regular" aria-hidden="true" />
            </span>
            <span>
              <small>When</small>
              <strong>Choose the year</strong>
              <span>Drag the ruler to set your answer.</span>
            </span>
          </li>
          <li>
            <span className={styles.instructionIcon}>
              <MapPin size={23} weight="regular" aria-hidden="true" />
            </span>
            <span>
              <small>Where</small>
              <strong>Pin the location</strong>
              <span>Use the world map or identify an off-world site.</span>
            </span>
          </li>
        </ol>

        <button
          className={styles.startButton}
          type="button"
          onClick={onStart}
        >
          Start game
          <ArrowRight size={20} weight="bold" aria-hidden="true" />
        </button>
      </section>
    </main>
  );
}

export function PastPointGame({ scenes }: PastPointGameProps) {
  const gameRootRef = useRef<HTMLElement>(null);
  const [experiencePhase, setExperiencePhase] = useState<
    "start" | "session"
  >("start");
  const sessionReducer = useMemo(
    () => createSessionReducer(scenes),
    [scenes],
  );
  const [state, dispatch] = useReducer(
    sessionReducer,
    scenes[0].round.initialYear,
    createInitialSessionState,
  );
  const scene = scenes[state.roundIndex];
  const roundNumber = state.roundIndex + 1;
  const roundCount = scenes.length;
  const hasNextRound = roundNumber < roundCount;
  const roundKey = state.roundToken;
  const locationBody = scene.location.body ?? "earth";
  const selectedLocationBody =
    state.location === null
      ? null
      : state.location.body ?? "earth";

  const canSubmit =
    state.eventText.trim().length > 0 &&
    state.yearTouched &&
    state.location !== null &&
    selectedLocationBody === locationBody;

  const startSession = () => {
    setExperiencePhase("session");
    window.requestAnimationFrame(() => gameRootRef.current?.focus());
  };

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

  if (experiencePhase === "start") {
    return (
      <StartScreen
        roundCount={roundCount}
        onStart={startSession}
      />
    );
  }

  return (
    <main
      ref={gameRootRef}
      className={styles.gameRoot}
      aria-label="PastPoint game session"
      tabIndex={-1}
    >
      <PanoramaViewer
        panoramaUrl={scene.panorama.url}
        initialYawDegrees={scene.panorama.initialView.yawDegrees}
        initialPitchDegrees={scene.panorama.initialView.pitchDegrees}
        initialZoomLevel={scene.panorama.initialView.zoomLevel}
        resetKey={state.roundToken}
      />
      <div className={styles.panoramaShade} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.brandGroup}>
          <span className={styles.brand}>PASTPOINT</span>
          <span className={styles.roundPill}>
            Round {roundNumber} of {roundCount}
          </span>
        </div>
      </header>

      {state.phase === "playing" ? (
        <>
          {locationBody === "moon" ? (
            <LunarLocationPanel
              key={`moon-${roundKey}`}
              location={state.location}
              minimized={state.mapMinimized}
              onLocationChange={(value) =>
                dispatch({ type: "set-location", value })
              }
              onToggleMinimized={() => dispatch({ type: "toggle-map" })}
            />
          ) : (
            <GuessMapPanel
              key={`map-${roundKey}`}
              location={
                state.location?.body === "moon" ? null : state.location
              }
              minimized={state.mapMinimized}
              onLocationChange={(value) =>
                dispatch({ type: "set-location", value })
              }
              onToggleMinimized={() => dispatch({ type: "toggle-map" })}
            />
          )}

          <div className={styles.answerDock}>
            <label className={styles.eventPanel}>
              <Question size={21} weight="regular" aria-hidden="true" />
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
              key={`year-${roundKey}`}
              value={state.year}
              range={scene.round.yearRange}
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
              <ArrowRight size={19} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </>
      ) : state.submission ? (
        <ResultPanel
          scene={scene}
          submission={state.submission}
          primaryAction={hasNextRound ? "next-round" : "restart-session"}
          onPrimaryAction={() =>
            dispatch({
              type: hasNextRound ? "advance-round" : "restart-session",
            })
          }
        />
      ) : null}
    </main>
  );
}

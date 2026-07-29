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
} from "react";
import { CountdownTimer } from "./CountdownTimer";
import { GuessMapPanel } from "./GuessMapPanel";
import { evaluateAnswer } from "./logic";
import type { ResolvedGameSession } from "./model";
import { PanoramaViewer } from "./PanoramaViewer";
import { ResultPanel } from "./ResultPanel";
import {
  createInitialSessionState,
  createSessionReducer,
} from "./session-state";
import { YearRuler } from "./YearRuler";
import styles from "./game.module.css";

type PastPointGameProps = {
  session: ResolvedGameSession;
};

export function PastPointGame({ session }: PastPointGameProps) {
  return <ConfiguredGameSession key={session.id} session={session} />;
}

function ConfiguredGameSession({ session }: PastPointGameProps) {
  const sessionReducer = useMemo(
    () => createSessionReducer(session.scenes),
    [session.scenes],
  );
  const [state, dispatch] = useReducer(
    sessionReducer,
    session.scenes[0].round.initialYear,
    createInitialSessionState,
  );
  const scene = session.scenes[state.roundIndex];
  const roundNumber = state.roundIndex + 1;
  const roundCount = session.scenes.length;
  const hasNextRound = roundNumber < roundCount;
  const roundKey = `${session.id}-${state.roundToken}`;

  const canSubmit =
    state.eventText.trim().length > 0 &&
    state.yearTouched &&
    state.location !== null;

  const registerPanoramaInteraction = useCallback(() => {
    dispatch({ type: "panorama-interacted" });
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

  return (
    <main className={styles.gameRoot}>
      <PanoramaViewer
        panoramaUrl={scene.panorama.url}
        initialYawDegrees={scene.panorama.initialView.yawDegrees}
        initialPitchDegrees={scene.panorama.initialView.pitchDegrees}
        initialZoomLevel={scene.panorama.initialView.zoomLevel}
        resetKey={state.roundToken}
        onInteract={registerPanoramaInteraction}
      />
      <div className={styles.panoramaShade} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.brandGroup}>
          <span className={styles.brand}>PASTPOINT</span>
          <span className={styles.roundPill}>
            Round {roundNumber} of {roundCount}
          </span>
        </div>
        <CountdownTimer
          key={`timer-${roundKey}`}
          durationSeconds={session.timerDurationSeconds}
        />
      </header>

      {state.phase === "playing" ? (
        <>
          {state.panoramaCueVisible && session.panoramaOnboarding ? (
            <div className={styles.panoramaCue} aria-hidden="true">
              <strong>{session.panoramaOnboarding.label}</strong>
              <HandSwipeLeft size={28} weight="regular" />
              <span>{session.panoramaOnboarding.instruction}</span>
            </div>
          ) : null}

          <GuessMapPanel
            key={`map-${roundKey}`}
            location={state.location}
            minimized={state.mapMinimized}
            onLocationChange={(value) =>
              dispatch({ type: "set-location", value })
            }
            onToggleMinimized={() => dispatch({ type: "toggle-map" })}
          />

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
          showReplayRound={roundCount > 1}
          primaryAction={hasNextRound ? "next-round" : "restart-session"}
          onReplayRound={() => dispatch({ type: "replay-round" })}
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

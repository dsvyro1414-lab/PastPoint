"use client";

import {
  ArrowRight,
  ArrowCounterClockwise,
  CalendarBlank,
  CheckCircle,
  MapPin,
  XCircle,
} from "@phosphor-icons/react";
import { MapCanvas } from "./MapCanvas";
import type { Scene, Submission } from "./model";
import styles from "./game.module.css";

type ResultPanelProps = {
  scene: Scene;
  submission: Submission;
  primaryAction: "next-round" | "restart-session";
  onPrimaryAction: () => void;
};

export function ResultPanel({
  scene,
  submission,
  primaryAction,
  onPrimaryAction,
}: ResultPanelProps) {
  const { answer, result } = submission;
  const primaryLabel =
    primaryAction === "next-round"
      ? "Next round"
      : "Restart session";

  return (
    <div className={styles.resultBackdrop}>
      <section className={styles.resultPanel} aria-label="Round result">
        <div className={styles.resultCopy}>
          <div
            className={`${styles.resultStatus} ${
              result.eventCorrect
                ? styles.resultStatusCorrect
                : styles.resultStatusIncorrect
            }`}
          >
            {result.eventCorrect ? (
              <CheckCircle size={22} weight="fill" aria-hidden="true" />
            ) : (
              <XCircle size={22} weight="fill" aria-hidden="true" />
            )}
            {result.eventCorrect
              ? "You identified the event"
              : "The event was not identified"}
          </div>

          <div className={styles.answerGrid}>
            <div>
              <span>Your event</span>
              <strong>{answer.eventText}</strong>
            </div>
            <div>
              <span>Correct event</span>
              <strong>{scene.event}</strong>
            </div>
            <div>
              <span>Your year</span>
              <strong>{answer.year}</strong>
            </div>
            <div>
              <span>Correct year</span>
              <strong>{scene.year}</strong>
            </div>
          </div>

          <div className={styles.resultMetrics}>
            <div>
              <CalendarBlank size={24} weight="regular" aria-hidden="true" />
              <span>
                <small>Year difference</small>
                <strong>
                  {result.yearDifference}{" "}
                  {result.yearDifference === 1 ? "year" : "years"}
                </strong>
              </span>
            </div>
            <div>
              <MapPin size={24} weight="regular" aria-hidden="true" />
              <span>
                <small>Distance from the correct location</small>
                <strong>{result.distanceKm.toFixed(1)} km</strong>
              </span>
            </div>
          </div>

          <p className={styles.explanation}>{scene.explanation}</p>

          <div className={styles.resultActions}>
            <button
              className={styles.playAgainButton}
              type="button"
              onClick={onPrimaryAction}
            >
              {primaryAction === "next-round" ? (
                <ArrowRight size={21} weight="bold" aria-hidden="true" />
              ) : (
                <ArrowCounterClockwise
                  size={21}
                  weight="bold"
                  aria-hidden="true"
                />
              )}
              {primaryLabel}
            </button>
          </div>
        </div>

        <div className={styles.resultMapWrap}>
          <MapCanvas
            playerLocation={answer.location}
            correctLocation={scene.location}
            interactive={false}
          />
          <div className={styles.mapLegend}>
            <span>
              <MapPin size={18} weight="fill" aria-hidden="true" />
              Your marker
            </span>
            <span>
              <MapPin size={18} weight="fill" aria-hidden="true" />
              Correct location
            </span>
          </div>
          <p className={styles.correctLocationLabel}>
            <MapPin size={20} weight="fill" aria-hidden="true" />
            {scene.location.label}
          </p>
        </div>
      </section>
    </div>
  );
}

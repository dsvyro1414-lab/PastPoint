"use client";

import { CheckCircle, Moon, X } from "@phosphor-icons/react";
import type { LocationGuess } from "./model";
import styles from "./game.module.css";

type LunarLocationPanelProps = {
  location: LocationGuess | null;
  minimized: boolean;
  onLocationChange: (location: LocationGuess) => void;
  onToggleMinimized: () => void;
};

const TRANQUILITY_BASE = {
  body: "moon",
} as const;

export function LunarLocationPanel({
  location,
  minimized,
  onLocationChange,
  onToggleMinimized,
}: LunarLocationPanelProps) {
  const selected = location?.body === "moon";

  if (minimized) {
    return (
      <button
        className={styles.mapRestoreButton}
        type="button"
        onClick={onToggleMinimized}
        aria-label="Open off-world location choice"
      >
        <Moon size={24} weight="regular" aria-hidden="true" />
      </button>
    );
  }

  return (
    <aside
      className={`${styles.mapPanel} ${styles.lunarPanel}`}
      aria-label="Off-world location guess"
    >
      <button
        className={styles.lunarCloseButton}
        type="button"
        onClick={onToggleMinimized}
        aria-label="Minimize location choice"
      >
        <X size={22} weight="regular" aria-hidden="true" />
      </button>

      <button
        className={styles.lunarChoice}
        type="button"
        aria-pressed={selected}
        onClick={() => onLocationChange(TRANQUILITY_BASE)}
      >
        <span className={styles.lunarOrb} aria-hidden="true">
          <span className={styles.lunarCraterOne} />
          <span className={styles.lunarCraterTwo} />
          <span className={styles.lunarCraterThree} />
        </span>
        <span>
          <small>Off-world location</small>
          <strong>{selected ? "Moon selected" : "Choose the Moon"}</strong>
        </span>
      </button>

      <div className={styles.mapHint}>
        {selected ? (
          <CheckCircle size={28} weight="regular" aria-hidden="true" />
        ) : (
          <Moon size={28} weight="regular" aria-hidden="true" />
        )}
        <span>
          <strong>{selected ? "Location selected" : "Identify the world"}</strong>
          <small>
            {selected
              ? "Tranquility Base will be revealed after submission"
              : "This round happened beyond the Earth map"}
          </small>
        </span>
      </div>
    </aside>
  );
}

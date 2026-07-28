"use client";

import { Timer } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import styles from "./game.module.css";

type CountdownTimerProps = {
  durationSeconds?: number;
};

export function CountdownTimer({
  durationSeconds = 120,
}: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className={styles.timer} aria-label={`${minutes}:${seconds} remaining`}>
      <Timer aria-hidden="true" size={22} weight="regular" />
      <span aria-hidden="true">
        {String(minutes).padStart(2, "0")}:{seconds}
      </span>
    </div>
  );
}

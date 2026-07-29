"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import type { YearRange } from "./model";
import styles from "./game.module.css";

const PIXELS_PER_YEAR = 3;

type YearRulerProps = {
  value: number;
  range: YearRange;
  onChange: (year: number, interacted: boolean) => void;
};

type DragState = {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
};

export function YearRuler({ value, range, onChange }: YearRulerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const interactionRef = useRef(false);
  const initialValueRef = useRef(value);
  const currentValueRef = useRef(value);
  const trackRangePixels =
    (range.max - range.min) * PIXELS_PER_YEAR;

  const ticks = useMemo(
    () => {
      const firstTick = Math.ceil(range.min / 10) * 10;
      const tickCount = Math.floor((range.max - firstTick) / 10) + 1;

      return Array.from(
        { length: Math.max(0, tickCount) },
        (_, index) => firstTick + index * 10,
      );
    },
    [range.max, range.min],
  );

  useLayoutEffect(() => {
    const scroller = scrollRef.current;

    if (!scroller) {
      return;
    }

    interactionRef.current = false;
    scroller.scrollLeft =
      (initialValueRef.current - range.min) * PIXELS_PER_YEAR;
  }, [range.min]);

  const updateFromScroll = () => {
    const scroller = scrollRef.current;

    if (!scroller) {
      return;
    }

    const nextYear = Math.min(
      range.max,
      Math.max(
        range.min,
        Math.round(scroller.scrollLeft / PIXELS_PER_YEAR) + range.min,
      ),
    );

    if (nextYear !== currentValueRef.current || interactionRef.current) {
      currentValueRef.current = nextYear;
      onChange(nextYear, interactionRef.current);
    }
  };

  const moveToYear = (year: number) => {
    const nextYear = Math.min(
      range.max,
      Math.max(range.min, year),
    );
    interactionRef.current = true;
    currentValueRef.current = nextYear;

    if (scrollRef.current) {
      scrollRef.current.scrollLeft =
        (nextYear - range.min) * PIXELS_PER_YEAR;
    }

    onChange(nextYear, true);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current;

    if (!scroller) {
      return;
    }

    interactionRef.current = true;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: scroller.scrollLeft,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    onChange(currentValueRef.current, true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current;
    const drag = dragRef.current;

    if (!scroller || !drag || drag.pointerId !== event.pointerId) {
      return;
    }

    scroller.scrollLeft =
      drag.startScrollLeft - (event.clientX - drag.startX);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current;

    if (!scroller) {
      return;
    }

    event.preventDefault();
    interactionRef.current = true;
    onChange(currentValueRef.current, true);
    scroller.scrollLeft +=
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      moveToYear(event.key === "Home" ? range.min : range.max);
      return;
    }

    const directions: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      PageUp: 10,
      PageDown: -10,
    };
    const delta = directions[event.key];

    if (delta === undefined) {
      return;
    }

    event.preventDefault();
    moveToYear(currentValueRef.current + delta);
  };

  return (
    <section className={styles.yearSelector} aria-label="Year guess">
      <div className={styles.yearBubble} aria-hidden="true">
        {value}
      </div>
      <div className={styles.yearPointer} aria-hidden="true" />
      <div
        ref={scrollRef}
        className={styles.rulerScroll}
        role="slider"
        aria-label="Select the year"
        aria-valuemin={range.min}
        aria-valuemax={range.max}
        aria-valuenow={value}
        tabIndex={0}
        onScroll={updateFromScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
      >
        <div
          className={styles.rulerTrack}
          style={{ width: `calc(100% + ${trackRangePixels}px)` }}
        >
          {ticks.map((year) => {
            const isCentury = year % 100 === 0;
            const isHalfCentury = year % 50 === 0;
            const offset = (year - range.min) * PIXELS_PER_YEAR;

            return (
              <span
                className={`${styles.tick} ${
                  isCentury
                    ? styles.tickCentury
                    : isHalfCentury
                      ? styles.tickHalfCentury
                      : ""
                }`}
                style={{
                  left: `calc((100% - ${trackRangePixels}px) / 2 + ${offset}px)`,
                }}
                key={year}
                aria-hidden="true"
              >
                {isCentury ? (
                  <span className={styles.tickLabel}>{year}</span>
                ) : null}
              </span>
            );
          })}
        </div>
      </div>
      <p className={styles.rulerHelp}>Drag or scroll to select the year</p>
    </section>
  );
}

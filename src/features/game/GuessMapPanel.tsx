"use client";

import {
  ArrowsOutSimple,
  CheckCircle,
  MapTrifold,
  Minus,
  Plus,
  X,
} from "@phosphor-icons/react";
import { useRef } from "react";
import { MapCanvas, type MapCanvasHandle } from "./MapCanvas";
import type { Coordinates } from "./model";
import styles from "./game.module.css";

type GuessMapPanelProps = {
  location: Coordinates | null;
  minimized: boolean;
  onLocationChange: (location: Coordinates) => void;
  onToggleMinimized: () => void;
};

export function GuessMapPanel({
  location,
  minimized,
  onLocationChange,
  onToggleMinimized,
}: GuessMapPanelProps) {
  const mapRef = useRef<MapCanvasHandle>(null);

  if (minimized) {
    return (
      <button
        className={styles.mapRestoreButton}
        type="button"
        onClick={onToggleMinimized}
        aria-label="Open location map"
      >
        <MapTrifold size={24} weight="regular" aria-hidden="true" />
      </button>
    );
  }

  return (
    <aside className={styles.mapPanel} aria-label="Location guess">
      <MapCanvas
        ref={mapRef}
        playerLocation={location}
        onLocationChange={onLocationChange}
      />

      <div className={styles.mapTopControls}>
        <button
          type="button"
          onClick={() => mapRef.current?.resetView()}
          aria-label="Show the whole world"
        >
          <ArrowsOutSimple size={22} weight="regular" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onToggleMinimized}
          aria-label="Minimize map"
        >
          <X size={22} weight="regular" aria-hidden="true" />
        </button>
      </div>

      <div className={styles.mapZoomControls}>
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          aria-label="Zoom map in"
        >
          <Plus size={22} weight="regular" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          aria-label="Zoom map out"
        >
          <Minus size={22} weight="regular" aria-hidden="true" />
        </button>
      </div>

      <div className={styles.mapHint}>
        {location ? (
          <CheckCircle size={28} weight="regular" aria-hidden="true" />
        ) : (
          <MapTrifold size={28} weight="regular" aria-hidden="true" />
        )}
        <span>
          <strong>{location ? "Marker placed" : "Place your marker"}</strong>
          <small>
            {location
              ? "Click again to move it"
              : "Click on the map to pin the location"}
          </small>
        </span>
      </div>
    </aside>
  );
}

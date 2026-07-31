"use client";

import type { Viewer as PhotoSphereViewer } from "@photo-sphere-viewer/core";
import { useEffect, useRef, useState } from "react";
import styles from "./game.module.css";

const MIN_VERTICAL_FOV_DEGREES = 60;
const MAX_VERTICAL_FOV_DEGREES = 92;

type PanoramaViewerProps = {
  panoramaUrl: string;
  initialYawDegrees: number;
  initialPitchDegrees: number;
  initialZoomLevel: number;
  resetKey: number;
};

export function PanoramaViewer({
  panoramaUrl,
  initialYawDegrees,
  initialPitchDegrees,
  initialZoomLevel,
  resetKey,
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PhotoSphereViewer | null>(null);
  const [failure, setFailure] = useState<{
    panoramaUrl: string;
    resetKey: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let cancelled = false;
    let viewer: PhotoSphereViewer | null = null;

    async function createViewer() {
      try {
        const { Viewer } = await import("@photo-sphere-viewer/core");
        const activeContainer = containerRef.current;

        if (cancelled || !activeContainer) {
          return;
        }

        viewer = new Viewer({
          container: activeContainer,
          panorama: panoramaUrl,
          navbar: false,
          // Enable Photo Sphere Viewer's global keyboard listener only while
          // the panorama itself is focused, so form and map keys stay native.
          keyboard: false,
          mousewheel: true,
          mousewheelCtrlKey: false,
          touchmoveTwoFingers: false,
          defaultYaw: `${initialYawDegrees}deg`,
          defaultPitch: `${initialPitchDegrees}deg`,
          defaultZoomLvl: initialZoomLevel,
          // The prototype panoramas do not contain enough source pixels for a
          // close zoom. Keep maximum magnification near the configured opening
          // frame until higher-resolution production masters are accepted.
          minFov: MIN_VERTICAL_FOV_DEGREES,
          maxFov: MAX_VERTICAL_FOV_DEGREES,
          moveSpeed: 1.15,
          zoomSpeed: 1.1,
          moveInertia: 0.78,
          canvasBackground: "#07101a",
          loadingTxt: "",
        });
        viewerRef.current = viewer;
        viewer.addEventListener("panorama-error", () => {
          if (!cancelled) {
            viewer?.hideError();
            setFailure({ panoramaUrl, resetKey });
          }
        });
      } catch {
        if (!cancelled) {
          setFailure({ panoramaUrl, resetKey });
        }
      }
    }

    void createViewer();

    return () => {
      cancelled = true;

      if (viewerRef.current === viewer) {
        viewerRef.current = null;
      }

      viewer?.destroy();
    };
  }, [
    initialPitchDegrees,
    initialYawDegrees,
    initialZoomLevel,
    panoramaUrl,
    resetKey,
  ]);

  const hasFailed =
    failure?.panoramaUrl === panoramaUrl &&
    failure.resetKey === resetKey;

  return (
    <>
      <div
        ref={containerRef}
        className={styles.panorama}
        data-testid="panorama-viewer"
        aria-label="Interactive 360 degree historical panorama. Focus and use arrow keys, or drag to look around. Scroll to zoom."
        tabIndex={0}
        onFocus={() => viewerRef.current?.startKeyboardControl()}
        onBlur={() => viewerRef.current?.stopKeyboardControl()}
      />
      {hasFailed ? (
        <div className={styles.viewerFailure} role="alert">
          <strong>Panorama unavailable</strong>
          <span>Reload the page to try again.</span>
        </div>
      ) : null}
    </>
  );
}

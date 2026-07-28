"use client";

import type { Viewer as PhotoSphereViewer } from "@photo-sphere-viewer/core";
import { useEffect, useRef } from "react";
import styles from "./game.module.css";

type PanoramaViewerProps = {
  panoramaUrl: string;
  resetKey: number;
  onInteract: () => void;
};

export function PanoramaViewer({
  panoramaUrl,
  resetKey,
  onInteract,
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onInteractRef = useRef(onInteract);

  useEffect(() => {
    onInteractRef.current = onInteract;
  }, [onInteract]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let cancelled = false;
    let viewer: PhotoSphereViewer | null = null;

    const registerInteraction = () => onInteractRef.current();

    container.addEventListener("pointerdown", registerInteraction, {
      passive: true,
    });
    container.addEventListener("wheel", registerInteraction, { passive: true });
    container.addEventListener("keydown", registerInteraction);

    async function createViewer() {
      const { Viewer } = await import("@photo-sphere-viewer/core");

      if (cancelled || !containerRef.current) {
        return;
      }

      viewer = new Viewer({
        container: containerRef.current,
        panorama: panoramaUrl,
        navbar: false,
        keyboard: "always",
        mousewheel: true,
        mousewheelCtrlKey: false,
        touchmoveTwoFingers: false,
        defaultZoomLvl: 38,
        minFov: 32,
        maxFov: 92,
        moveSpeed: 1.15,
        zoomSpeed: 1.1,
        moveInertia: 0.78,
        canvasBackground: "#07101a",
        loadingTxt: "",
      });
    }

    void createViewer();

    return () => {
      cancelled = true;
      container.removeEventListener("pointerdown", registerInteraction);
      container.removeEventListener("wheel", registerInteraction);
      container.removeEventListener("keydown", registerInteraction);
      viewer?.destroy();
    };
  }, [panoramaUrl, resetKey]);

  return (
    <div
      ref={containerRef}
      className={styles.panorama}
      data-testid="panorama-viewer"
      aria-label="Interactive 360 degree historical panorama. Drag to look around and scroll to zoom."
      tabIndex={0}
    />
  );
}

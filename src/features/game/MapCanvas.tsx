"use client";

import type {
  CircleMarker,
  Map as LeafletMap,
  LeafletMouseEvent,
} from "leaflet";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Coordinates } from "./model";
import styles from "./game.module.css";

type LeafletNamespace = typeof import("leaflet");

type MapBundle = {
  leaflet: LeafletNamespace;
  map: LeafletMap;
  playerMarker: CircleMarker | null;
  correctMarker: CircleMarker | null;
};

export type MapCanvasHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
};

type MapCanvasProps = {
  playerLocation: Coordinates | null;
  correctLocation?: Coordinates;
  onLocationChange?: (location: Coordinates) => void;
  interactive?: boolean;
  className?: string;
};

const WORLD_CENTER: [number, number] = [24, 0];
const WORLD_ZOOM = 1;

export const MapCanvas = forwardRef<MapCanvasHandle, MapCanvasProps>(
  function MapCanvas(
    {
      playerLocation,
      correctLocation,
      onLocationChange,
      interactive = true,
      className,
    },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bundleRef = useRef<MapBundle | null>(null);
    const onLocationChangeRef = useRef(onLocationChange);
    const initializationFailedRef = useRef(false);
    const [failureMessage, setFailureMessage] = useState<string | null>(
      null,
    );

    useEffect(() => {
      onLocationChangeRef.current = onLocationChange;
    }, [onLocationChange]);

    useImperativeHandle(
      ref,
      () => ({
        zoomIn: () => bundleRef.current?.map.zoomIn(),
        zoomOut: () => bundleRef.current?.map.zoomOut(),
        resetView: () =>
          bundleRef.current?.map.setView(WORLD_CENTER, WORLD_ZOOM),
      }),
      [],
    );

    useEffect(() => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      let cancelled = false;
      let createdMap: LeafletMap | null = null;
      let consecutiveTileFailures = 0;
      initializationFailedRef.current = false;

      async function createMap() {
        try {
          const leafletModule = await import("leaflet");
          const leaflet = (leafletModule.default ??
            leafletModule) as LeafletNamespace;

          if (cancelled || !containerRef.current) {
            return;
          }

          const map = leaflet
            .map(containerRef.current, {
              zoomControl: false,
              attributionControl: true,
              minZoom: 1,
              maxZoom: 18,
              worldCopyJump: true,
              maxBoundsViscosity: 0.8,
              dragging: interactive,
              touchZoom: interactive,
              scrollWheelZoom: interactive,
              doubleClickZoom: interactive,
              keyboard: interactive,
            })
            .setView(WORLD_CENTER, WORLD_ZOOM);
          createdMap = map;

          map.setMaxBounds([
            [-85, -190],
            [85, 190],
          ]);
          map.attributionControl.setPrefix(false);

          const tileLayer = leaflet.tileLayer(
            "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            {
              subdomains: "abcd",
              maxZoom: 20,
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            },
          );
          tileLayer.on("tileerror", () => {
            if (!cancelled) {
              consecutiveTileFailures += 1;

              if (consecutiveTileFailures >= 3) {
                setFailureMessage(
                  "Map tiles are unavailable. Check your connection and reload.",
                );
              }
            }
          });
          tileLayer.on("tileload", () => {
            if (!cancelled) {
              consecutiveTileFailures = 0;
              setFailureMessage(null);
            }
          });
          tileLayer.addTo(map);

          if (interactive) {
            map.on("click", (event: LeafletMouseEvent) => {
              onLocationChangeRef.current?.({
                lat: event.latlng.lat,
                lng: event.latlng.lng,
              });
            });
          }

          bundleRef.current = {
            leaflet,
            map,
            playerMarker: null,
            correctMarker: null,
          };

          window.requestAnimationFrame(() => map.invalidateSize());
        } catch {
          if (!cancelled) {
            createdMap?.remove();
            bundleRef.current = null;
            initializationFailedRef.current = true;
            setFailureMessage(
              "Reload the page to try again.",
            );
          }
        }
      }

      void createMap();

      return () => {
        cancelled = true;
        bundleRef.current?.map.remove();
        bundleRef.current = null;
      };
    }, [interactive]);

    useEffect(() => {
      let active = true;
      let frame = 0;

      const updateMarkers = () => {
        if (!active) {
          return;
        }

        const bundle = bundleRef.current;

        if (!bundle) {
          if (initializationFailedRef.current) {
            return;
          }

          frame = window.requestAnimationFrame(updateMarkers);
          return;
        }

        const { leaflet, map } = bundle;

        if (playerLocation) {
          if (bundle.playerMarker) {
            bundle.playerMarker.setLatLng(playerLocation);
          } else {
            bundle.playerMarker = leaflet
              .circleMarker(playerLocation, {
                radius: 9,
                color: "#f7fbff",
                weight: 3,
                fillColor: "#4f98ff",
                fillOpacity: 1,
              })
              .addTo(map);
          }
        } else if (bundle.playerMarker) {
          bundle.playerMarker.remove();
          bundle.playerMarker = null;
        }

        if (correctLocation) {
          if (bundle.correctMarker) {
            bundle.correctMarker.setLatLng(correctLocation);
          } else {
            bundle.correctMarker = leaflet
              .circleMarker(correctLocation, {
                radius: 14,
                color: "#f0b85a",
                weight: 4,
                fillColor: "#f0b85a",
                fillOpacity: 0.18,
              })
              .addTo(map);
          }
        } else if (bundle.correctMarker) {
          bundle.correctMarker.remove();
          bundle.correctMarker = null;
        }

        bundle.correctMarker?.bringToBack();
        bundle.playerMarker?.bringToFront();

        if (!interactive && playerLocation && correctLocation) {
          const points: [number, number][] = [
            [playerLocation.lat, playerLocation.lng],
            [correctLocation.lat, correctLocation.lng],
          ];
          const distance = map.distance(playerLocation, correctLocation);

          if (distance < 1000) {
            map.setView(correctLocation, 8, { animate: false });
          } else {
            map.fitBounds(points, {
              animate: false,
              padding: [48, 48],
              maxZoom: 8,
            });
          }
        }
      };

      frame = window.requestAnimationFrame(updateMarkers);
      return () => {
        active = false;
        window.cancelAnimationFrame(frame);
      };
    }, [correctLocation, interactive, playerLocation]);

    return (
      <div className={`${styles.mapCanvasWrap} ${className ?? ""}`}>
        <div
          ref={containerRef}
          className={styles.mapCanvas}
          aria-label={
            interactive
              ? "World map. Click to place or move your location marker."
              : "Result map showing your marker and the correct location."
          }
        />
        {failureMessage ? (
          <div className={styles.mapFailure} role="alert">
            <strong>Map unavailable</strong>
            <span>{failureMessage}</span>
          </div>
        ) : null}
      </div>
    );
  },
);

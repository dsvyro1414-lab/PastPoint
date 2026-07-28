import type {
  PlayerAnswer,
  RoundResult,
  Scene,
  Coordinates,
} from "./model";

const EARTH_RADIUS_KM = 6371.0088;

export function normalizeAnswer(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function isAcceptedEventAnswer(value: string, scene: Scene) {
  const normalizedValue = normalizeAnswer(value);

  return scene.acceptedEventAliases.some(
    (alias) => normalizeAnswer(alias) === normalizedValue,
  );
}

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function haversineDistanceKm(
  start: Coordinates,
  end: Coordinates,
) {
  const latitudeDelta = degreesToRadians(end.lat - start.lat);
  const longitudeDelta = degreesToRadians(end.lng - start.lng);
  const startLatitude = degreesToRadians(start.lat);
  const endLatitude = degreesToRadians(end.lat);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;
  const clampedHaversine = Math.min(1, Math.max(0, haversine));

  return (
    2 *
    EARTH_RADIUS_KM *
    Math.atan2(
      Math.sqrt(clampedHaversine),
      Math.sqrt(1 - clampedHaversine),
    )
  );
}

export function evaluateAnswer(
  answer: PlayerAnswer,
  scene: Scene,
): RoundResult {
  return {
    eventCorrect: isAcceptedEventAnswer(answer.eventText, scene),
    yearDifference: Math.abs(answer.year - scene.year),
    distanceKm: haversineDistanceKm(answer.location, scene.location),
  };
}

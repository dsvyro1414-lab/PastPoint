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

function sphericalDistanceKm(
  start: Coordinates,
  end: Coordinates,
  radiusKm: number,
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
    radiusKm *
    Math.atan2(
      Math.sqrt(clampedHaversine),
      Math.sqrt(1 - clampedHaversine),
    )
  );
}

export function haversineDistanceKm(
  start: Coordinates,
  end: Coordinates,
) {
  return sphericalDistanceKm(start, end, EARTH_RADIUS_KM);
}

export function evaluateAnswer(
  answer: PlayerAnswer,
  scene: Scene,
): RoundResult {
  const correctBody = scene.location.body ?? "earth";
  const answerBody = answer.location.body ?? "earth";
  const locationBodyCorrect = answerBody === correctBody;
  const distanceKm =
    locationBodyCorrect &&
    answer.location.body !== "moon" &&
    correctBody === "earth"
      ? sphericalDistanceKm(
          answer.location,
          scene.location,
          EARTH_RADIUS_KM,
        )
      : null;

  return {
    eventCorrect: isAcceptedEventAnswer(answer.eventText, scene),
    yearDifference: Math.abs(answer.year - scene.year),
    locationBodyCorrect,
    distanceKm,
  };
}

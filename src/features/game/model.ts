export type Coordinates = {
  lat: number;
  lng: number;
};

export type CelestialBody = "earth" | "moon";

export type LocationGuess =
  | (Coordinates & {
      body?: "earth";
    })
  | {
      body: "moon";
    };

export type SceneLocation =
  | (Coordinates & {
      body?: "earth";
      coordinateSystem?: "geographic";
      label: string;
    })
  | (Coordinates & {
      body: "moon";
      coordinateSystem: "selenographic";
      label: string;
    });

export type YearRange = {
  min: number;
  max: number;
};

export type RoundConfiguration = {
  initialYear: number;
  yearRange: YearRange;
};

export type PanoramaConfiguration = {
  url: string;
  initialView: {
    yawDegrees: number;
    pitchDegrees: number;
    zoomLevel: number;
  };
};

export type Scene = {
  id: string;
  panorama: PanoramaConfiguration;
  event: string;
  acceptedEventAliases: string[];
  year: number;
  date: string;
  location: SceneLocation;
  explanation: string;
  round: RoundConfiguration;
};

export type PlayerAnswer = {
  eventText: string;
  year: number;
  location: LocationGuess;
};

export type RoundResult = {
  eventCorrect: boolean;
  yearDifference: number;
  locationBodyCorrect: boolean;
  distanceKm: number | null;
};

export type Submission = {
  answer: PlayerAnswer;
  result: RoundResult;
};

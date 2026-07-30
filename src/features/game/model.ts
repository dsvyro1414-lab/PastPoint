export type Coordinates = {
  lat: number;
  lng: number;
};

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
  location: Coordinates & {
    label: string;
  };
  explanation: string;
  round: RoundConfiguration;
};

export type PlayerAnswer = {
  eventText: string;
  year: number;
  location: Coordinates;
};

export type RoundResult = {
  eventCorrect: boolean;
  yearDifference: number;
  distanceKm: number;
};

export type Submission = {
  answer: PlayerAnswer;
  result: RoundResult;
};

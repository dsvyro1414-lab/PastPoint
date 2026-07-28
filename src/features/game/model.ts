export type Coordinates = {
  lat: number;
  lng: number;
};

export type Scene = {
  id: string;
  panoramaUrl: string;
  event: string;
  acceptedEventAliases: string[];
  year: number;
  date: string;
  location: Coordinates & {
    label: string;
  };
  explanation: string;
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

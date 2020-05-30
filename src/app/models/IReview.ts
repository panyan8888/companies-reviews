export enum Score {
  S1 = 1,
  S2 = 2,
  S3 = 3,
  S4 = 4,
  S5 = 5,
}

export interface IReview {
  id: number;
  userId: number;
  review: string;
  score: Score;
}

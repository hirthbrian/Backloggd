import { RatingSmall } from "../constants/Rating";

export const getRatingSmall = (rating: number) => {
  if (rating >= 90) return RatingSmall.mighty;
  else if (rating >= 75) return RatingSmall.strong;
  else if (rating >= 60) return RatingSmall.fair;
  else if (rating >= 20) return RatingSmall.weak;
};

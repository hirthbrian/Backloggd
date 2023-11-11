import { RatingBig, RatingSmall } from '../constants/Rating';

export const getRatingSmall = (rating: number) => {
	if (rating >= 90) return RatingSmall.mighty;
	if (rating >= 75) return RatingSmall.strong;
	if (rating >= 60) return RatingSmall.fair;
	if (rating >= 20) return RatingSmall.weak;
	return RatingSmall.weak;
};

export const getRatingBig = (rating: number) => {
	if (rating >= 90) return RatingBig.mighty;
	if (rating >= 75) return RatingBig.strong;
	if (rating >= 60) return RatingBig.fair;
	if (rating >= 20) return RatingBig.weak;
	return RatingBig.weak;
};

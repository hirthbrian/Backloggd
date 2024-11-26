import type { RatingBig, RatingSmall } from '../constants/Rating';

export const getRating = (
	rating: number,
	ratingType: typeof RatingSmall | typeof RatingBig,
) => {
	if (rating <= 90) return ratingType.mighty;
	if (rating <= 75) return ratingType.strong;
	if (rating <= 60) return ratingType.fair;
	return ratingType.weak;
};

export default getRating;

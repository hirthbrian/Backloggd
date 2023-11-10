export type GameDetails = {
	images: {
		box: {
			og: string;
			sm: string;
		};
		square: {
			og: string;
			xs: string;
			sm: string;
			lg: string;
		};
		masthead: {
			og: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
		};
		banner: {
			og: string;
			sm: string;
		};
		logo: {
			og: string;
		};
		screenshots: Array<{
			_id: string;
			og: string;
			sm: string;
		}>;
	};
	Rating: {
		value: string;
		imageSrc?: string;
	};
	hasLootBoxes: boolean;
	percentRecommended: number;
	numReviews: number;
	numTopCriticReviews: number;
	medianScore: number;
	topCriticScore: number;
	percentile: number;
	tier: string;
	name: string;
	description: string;
	screenshots?: Array<{
		_id: string;
		fullRes: string;
		thumbnail: string;
	}>;
	trailers: Array<{
		isOpenCritic: boolean;
		isSpecial: string;
		publishedDate: string;
		title: string;
		videoId: string;
		externalUrl: string;
		channelTitle: string;
		channelId: string;
		description: string;
		lastRefreshDate?: string;
		specialName: string;
		expectedName: string;
	}>;
	mastheadScreenshot?: {
		fullRes: string;
		thumbnail: string;
	};
	embargoDate?: string;
	Companies: Array<{
		name: string;
		type: string;
	}>;
	Platforms: Array<{
		id: number;
		name: string;
		shortName: string;
		imageSrc: string;
		releaseDate: string;
	}>;
	Genres: Array<{
		id: number;
		name: string;
	}>;
	id: number;
	firstReleaseDate: string;
	createdAt: string;
	updatedAt: string;
	firstReviewDate: string;
	latestReviewDate: string;
	logoScreenshot?: {
		fullRes: string;
		thumbnail: string;
	};
	bannerScreenshot?: {
		fullRes: string;
	};
	squareScreenshot?: {
		fullRes: string;
		thumbnail: string;
	};
	verticalLogoScreenshot?: {
		fullRes: string;
		thumbnail: string;
	};
	imageMigrationComplete: boolean;
	tenthReviewDate?: string;
	criticalReviewDate: string;
	biggestDiscountDollars: number;
	biggestDiscountPercentage: number;
	needsAdminDealReview?: boolean;
	url: string;
};

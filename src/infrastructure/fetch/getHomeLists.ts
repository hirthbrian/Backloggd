import { IGameShort } from '@entities/gameEntities';

import { getRequest } from '.';

const ENDPOINT = '/v4/multiquery';

const FIELDS = `
	cover.image_id,
	name
`;

const RECENTLY_TRENDING = `
	query games "Recently trending" {
		fields ${FIELDS};
		where total_rating_count > 100;
		sort rating_count desc;
		sort first_release_date desc;
	};
`;

const NEW_RELEASE = `
	query games "Coming soon" {
		fields ${FIELDS};
		where first_release_date > ${Math.round(Date.now() / 1000)};
		sort first_release_date asc;
	};
`;

const MOST_RATED = `
	query games "Most Rated" {
		fields ${FIELDS};
		where total_rating_count > 100;
		sort rating_count desc;
	};
`;

const getHomeLists = () =>
	getRequest<
		Array<{
			name: string;
			result: Array<IGameShort>;
		}>
	>(ENDPOINT, `${RECENTLY_TRENDING}${MOST_RATED}${NEW_RELEASE}`);

export default getHomeLists;

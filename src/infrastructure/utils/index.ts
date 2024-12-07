export type ImageSizeType =
	| 'cover_small'
	| 'screenshot_med'
	| 'cover_big'
	| 'logo_med'
	| 'screenshot_big'
	| 'screenshot_huge'
	| 'thumb'
	| 'micro'
	| '720p'
	| '1080p';

// https://api-docs.igdb.com/?javascript#images
export const getImageUrl = (id: string, size: ImageSizeType = 'logo_med') =>
	`https://images.igdb.com/igdb/image/upload/t_${size}/${id}.jpg`;

const BASE_URL =
	'https://lvuyogecjrygfkrievoa.supabase.co/storage/v1/object/public/avatar/';

export const getAvatarUrl = (id: string) => `${BASE_URL}${id}`;

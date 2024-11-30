type ImageSize =
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

export const getImageUrl = (id: string, size: ImageSize = 'cover_big') =>
	`https://images.igdb.com/igdb/image/upload/t_${size}/${id}.jpg`;

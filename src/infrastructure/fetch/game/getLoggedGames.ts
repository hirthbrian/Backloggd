import { StatusEnum } from '../../../domain/enum/StatusEnum';
import { supabase } from '../../lib/supabase';
import getGameByIds from './getGameByIds';

const getLoggedGames = async (
	userId = 'e9a4f011-1fe4-4144-acdd-30b2db5bfc13',
	filter: StatusEnum,
) => {
	let query = supabase
		.from('logs')
		.select('game_id,completed,playing,backlog')
		.eq('user_id', userId);

	if (filter === StatusEnum.PLAYING) {
		query = query.eq('playing', true);
	}
	if (filter === StatusEnum.COMPLETED) {
		query = query.eq('completed', true);
	}
	if (filter === StatusEnum.BACKLOG) {
		query = query.eq('backlog', true);
	}

	const ids = (await query.then(({ data }) =>
		data?.map((d) => d.game_id),
	)) as Array<number>;

	if (ids?.length === 0) {
		return [];
	}
	return getGameByIds(ids);
};

export default getLoggedGames;

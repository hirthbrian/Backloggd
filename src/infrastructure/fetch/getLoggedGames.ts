import { supabase } from '../lib/supabase';
import getGameByIds from './game/getGamesById';

const getLoggedGames = async (
	userId = 'e9a4f011-1fe4-4144-acdd-30b2db5bfc13',
) => {
	const ids = await supabase
		.from('logs')
		.select(`game_id`)
		.eq('user_id', userId)
		.then(({ data }) => data?.map((d) => d.game_id));
	return getGameByIds(ids);
};

export default getLoggedGames;

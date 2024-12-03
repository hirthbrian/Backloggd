import { supabase } from '../../lib/supabase';

const userId = 'e9a4f011-1fe4-4144-acdd-30b2db5bfc13';

const getLog = (gameId: number) => {
	return supabase
		.from('logs')
		.select()
		.eq('game_id', gameId)
		.eq('user_id', userId)
		.then(({ data }) => data[0]);
};

export default getLog;

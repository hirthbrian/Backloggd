import { supabase } from '../../lib/supabase';

const userId = 'e9a4f011-1fe4-4144-acdd-30b2db5bfc13';

const deleteLog = (gameId: number) => {
	return supabase
		.from('logs')
		.delete()
		.eq('game_id', gameId)
		.eq('user_id', userId);
};

export default deleteLog;

import { supabase } from '../../lib/supabase';

const userId = 'e9a4f011-1fe4-4144-acdd-30b2db5bfc13';

const updateRating = async (gameId: number, rating: number) => {
	await supabase.from('logs').upsert({
		game_id: gameId,
		user_id: userId,
		rating,
	});
	return;
};

export default updateRating;

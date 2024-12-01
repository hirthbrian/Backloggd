import { StatusEnum } from '../../domain/enum/StatusEnum';
import { supabase } from '../lib/supabase';

const userId = 'e9a4f011-1fe4-4144-acdd-30b2db5bfc13';

const insertLog = (gameId: number, status?: Array<StatusEnum>) => {
	const completed = !!status?.find((s) => s === StatusEnum.COMPLETED);
	const playing = !!status?.find((s) => s === StatusEnum.PLAYING);
	const backlog = !!status?.find((s) => s === StatusEnum.BACKLOG);

	console.log('completed', completed);
	console.log('playing', playing);
	console.log('backlog', backlog);

	return supabase.from('logs').upsert({
		game_id: gameId,
		user_id: userId,
		completed,
		playing,
		backlog,
	});
};

export default insertLog;

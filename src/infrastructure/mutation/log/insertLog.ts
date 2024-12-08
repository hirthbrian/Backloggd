import { StatusEnum } from '../../../domain/enum/StatusEnum';
import { supabase } from '../../lib/supabase';

const userId = 'e9a4f011-1fe4-4144-acdd-30b2db5bfc13';

const insertLog = async (gameId: number, status?: Array<StatusEnum>) => {
	const completed = !!status?.find((s) => s === StatusEnum.COMPLETED);
	const playing = !!status?.find((s) => s === StatusEnum.PLAYING);
	const backlog = !!status?.find((s) => s === StatusEnum.BACKLOG);

	await supabase.from('logs').upsert({
		game_id: gameId,
		user_id: userId,
		completed,
		playing,
		backlog,
	});
	return;
};

export default insertLog;

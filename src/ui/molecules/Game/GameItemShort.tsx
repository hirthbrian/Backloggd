import NormalRegular from '@texts/NormalRegular';
import SectionTitle from '@texts/SectionTitle';
import SmallRegular from '@texts/SmallRegular';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { IGameShort } from '../../../domain/entities/gameEntities';
import GamePoster from '../../atoms/GamePoster';
import LabelList from '../../atoms/LabelList';
import colors from '../../themes/colors';
import globalStyles from '../../themes/globalStyles';

type Props = {
	data: IGameShort;
	onPressGame: () => void;
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
		paddingVertical: 10,
		...globalStyles.paddingHorizontal,
	},
	info: {
		flex: 1,
		paddingTop: 5,
		gap: 10,
		justifyContent: 'space-between',
	},
});

const GameItemShort = ({ data, onPressGame }: Props) => {
	const formatedReleaseDate = useMemo(
		() => dayjs(data?.first_released_date).format('YYYY'),
		[data?.first_released_date],
	);

	const renderPlatforms = () => {
		if (data?.platforms) {
			return (
				<SmallRegular numberOfLines={3}>
					{'Available on: '}
					<LabelList labels={data?.platforms?.map((p) => p.name)} />
				</SmallRegular>
			);
		}
		return null;
	};

	return (
		<Pressable onPress={onPressGame}>
			{({ pressed }) => (
				<View
					style={[
						styles.container,
						{
							backgroundColor: pressed
								? colors.background_highlight
								: undefined,
						},
					]}
				>
					<GamePoster
						disableLongPress
						id={data.id}
						cover={data.cover}
						name={data.name}
						onPress={onPressGame}
						width={70}
					/>
					<View style={styles.info}>
						<View>
							<SectionTitle numberOfLines={2} color={colors.white}>
								{data?.name}
							</SectionTitle>
							<NormalRegular>{formatedReleaseDate}</NormalRegular>
						</View>
						{renderPlatforms()}
					</View>
				</View>
			)}
		</Pressable>
	);
};

export default GameItemShort;

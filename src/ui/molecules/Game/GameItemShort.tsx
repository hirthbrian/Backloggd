import React, { useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';

import { IGameShort } from '../../../domain/entities/gameEntities';
import GamePoster from '../../atoms/GamePoster';
import globalStyles from '../../themes/globalStyles';
import NormalRegular from '../../atoms/Texts/NormalRegular';
import dayjs from 'dayjs';
import SectionTitle from '../../atoms/Texts/SectionTitle';
import colors from '../../themes/colors';
import SmallRegular from '../../atoms/Texts/SmallRegular';
import LabelList from '../../atoms/LabelList';

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
		[],
	);

	const renderPlatforms = () => {
		if (data?.platforms)
			return (
				<SmallRegular numberOfLines={3}>
					{'Available on: '}
					<LabelList labels={data?.platforms?.map((p) => p.name)} />
				</SmallRegular>
			);
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
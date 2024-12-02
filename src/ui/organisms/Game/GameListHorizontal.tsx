import React, { useMemo } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import GamePoster from '../../atoms/GamePoster';
import { IGameShort } from '../../../domain/entities/gameEntities';
import SectionTitle from '../../atoms/Texts/SectionTitle';
import globalStyles from '../../themes/globalStyles';
import { useNavigation } from '@react-navigation/native';
import NormalRegular from '../../atoms/Texts/NormalRegular';
import colors from '../../themes/colors';

type Props = {
	data: Array<IGameShort>;
	title?: string;
	onPressSeeMore?: () => void;
};

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
	contentContainerStyle: {
		gap: 8,
		...globalStyles.paddingHorizontal,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		...globalStyles.paddingHorizontal,
	},
});

const GameListHorizontal = ({ data, title, onPressSeeMore }: Props) => {
	const navigation = useNavigation();

	const { width } = useWindowDimensions();

	const posterWidth = useMemo(
		() =>
			(width -
				8 * (3.5 - 1) -
				globalStyles.paddingHorizontal.paddingHorizontal * 2) /
			3.5,
		[width],
	);

	const onPressGame = (id: number) =>
		navigation.navigate('GameDetails', { id });

	const renderItem = ({ item }: { item: IGameShort }) => (
		<GamePoster
			key={item.id}
			id={item.id}
			cover={item.cover}
			name={item.name}
			width={posterWidth}
			onPress={() => onPressGame(item.id)}
		/>
	);

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				{title && <SectionTitle>{title}</SectionTitle>}
				{onPressSeeMore && (
					<NormalRegular onPress={onPressSeeMore} color={colors.text_highlight}>
						See more
					</NormalRegular>
				)}
			</View>
			<FlatList
				horizontal
				data={data}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.contentContainerStyle}
			/>
		</View>
	);
};

export default GameListHorizontal;

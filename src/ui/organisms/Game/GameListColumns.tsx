import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';

import { IGameShort } from '../../../domain/entities/gameEntities';
import GamePoster from '../../atoms/GamePoster';
import globalStyles from '../../themes/globalStyles';

type Props = {
	data: Array<IGameShort>;
	numColumns?: number;
};

const styles = StyleSheet.create({
	columnWrapperStyle: {
		gap: 10,
	},
	contentContainerStyle: {
		gap: 10,
		paddingVertical: 15,
		...globalStyles.withPadding,
	},
});

const GameListColumns = ({ data, numColumns = 4 }: Props) => {
	const navigation = useNavigation();
	const { width } = useWindowDimensions();

	const onPressGame = (id: number) =>
		navigation.navigate('GameDetailsScreen', { id });

	const posterWidth = useMemo(
		() => (width - 10 * (numColumns - 1) - 15 * 2) / numColumns,
		[numColumns, width],
	);

	const renderItem = ({ item }: { item: IGameShort }) => (
		<GamePoster
			key={item.id}
			id={item.id}
			cover={item.cover}
			name={item.name}
			onPress={() => onPressGame(item.id)}
			width={posterWidth}
		/>
	);

	return (
		<FlatList
			data={data}
			scrollEnabled={false}
			renderItem={renderItem}
			numColumns={numColumns}
			columnWrapperStyle={styles.columnWrapperStyle}
			contentContainerStyle={styles.contentContainerStyle}
		/>
	);
};

export default GameListColumns;

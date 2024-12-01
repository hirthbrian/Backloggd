import React, { useMemo } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import GamePoster from '../../atoms/GamePoster';
import { IGameShort } from '../../../domain/entities/gameEntities';
import SectionTitle from '../../atoms/Texts/SectionTitle';
import globalStyles from '../../themes/globalStyles';
import { useNavigation } from '@react-navigation/native';

type Props = {
	data: Array<IGameShort>;
	title?: string;
};

const styles = StyleSheet.create({
	container: {
		gap: 6,
	},
	contentContainerStyle: {
		gap: 8,
		...globalStyles.paddingHorizontal,
	},
	title: {
		...globalStyles.paddingHorizontal,
	},
});

const GameListHorizontal = ({ data, title }: Props) => {
	const navigation = useNavigation();

	const { width } = useWindowDimensions();

	const posterWidth = useMemo(
		() =>
			(width -
				8 * (3.5 - 1) -
				globalStyles.paddingHorizontal.paddingHorizontal * 2) /
			3.5,
		[],
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
			{title && <SectionTitle style={styles.title}>{title}</SectionTitle>}
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

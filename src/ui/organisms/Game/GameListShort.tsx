import { IGameShort } from '@entities/gameEntities';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import GameItemShort from '../../molecules/Game/GameItemShort';
import colors from '../../themes/colors';

type Props = {
	data: Array<IGameShort>;
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
	},
	separator: {
		height: 1,
		backgroundColor: colors.background_light,
		marginHorizontal: 15,
	},
});

const GameListShort = ({ data }: Props) => {
	const navigation = useNavigation();

	const onPressGame = (id: number) =>
		navigation.navigate('GameDetailsScreen', { id });

	const renderSeparator = () => <View style={styles.separator} />;

	const renderItem = ({ item }: { item: IGameShort }) => (
		<GameItemShort data={item} onPressGame={() => onPressGame(item.id)} />
	);

	return (
		<FlatList
			contentContainerStyle={styles.container}
			data={data}
			renderItem={renderItem}
			ItemSeparatorComponent={renderSeparator}
		/>
	);
};

export default GameListShort;

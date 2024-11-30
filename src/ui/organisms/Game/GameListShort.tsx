import React, { useMemo } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import { IGameShort } from '../../../domain/entities/gameEntities';
import globalStyles from '../../themes/globalStyles';
import GameItemShort from '../../molecules/Game/GameItemShort';
import colors from '../../themes/colors';
import { useNavigation } from '@react-navigation/native';

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
		navigation.navigate('GameDetails', { id });

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

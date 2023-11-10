import React from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import GamePoster from '../composants/GamePoster';
import { useNavigation } from '@react-navigation/native';

import mockGameList from '../mock';

type GameType = {
	images: {
		box: {
			og: string;
			sm: string;
		};
	};
	topCriticScore: number;
	tier: string;
	name: string;
	id: number;
};

function UserListScreen() {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();

	const onPress = (id: number, name: string) =>
		navigation.navigate('Details', { id, name });

	const renderItem = ({ item }: { item: GameType }) => (
		<GamePoster
			name={item.name}
			width={width / 3 - 15}
			score={item.topCriticScore}
			uri={`https://img.opencritic.com/${item.images.box.og}`}
			onPress={() => onPress(item.id, item.name)}
		/>
	);

	return (
		<View>
			<FlatList
				numColumns={3}
				data={mockGameList.popular}
				renderItem={renderItem}
				ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
				columnWrapperStyle={{ flex: 1, justifyContent: 'space-evenly' }}
			/>
		</View>
	);
}

export default UserListScreen;

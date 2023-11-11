import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GamePoster from '../components/GamePoster';
import { StatusEnum } from '../constants/Enums';
import mockGameList from '../mock';

const mock = {};
mock[StatusEnum.WANT] = mockGameList.want;
mock[StatusEnum.PLAYED] = mockGameList.played;
mock[StatusEnum.FAVORITED] = mockGameList.favorited;

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

function UserListScreen({ route }) {
	const type = route?.params?.type;
	const { width } = useWindowDimensions();
	const navigation = useNavigation();
	const onPress = (id: number, name: string) =>
		navigation.navigate('Details', { id, name });

	const renderSeparator = () => <View style={{ height: 15 }} />;

	const renderItem = ({ item }: { item: GameType }) => (
		<View style={{ flex: 1 / 3, alignItems: 'center' }}>
			<GamePoster
				name={item.name}
				width={width / 3 - 15}
				score={item.topCriticScore}
				uri={`https://img.opencritic.com/${item.images.box?.sm}`}
				onPress={() => onPress(item.id, item.name)}
			/>
		</View>
	);

	return (
		<View>
			<FlatList
				numColumns={3}
				data={mock[type]}
				renderItem={renderItem}
				ItemSeparatorComponent={renderSeparator}
				contentContainerStyle={{ paddingVertical: 10 }}
			/>
		</View>
	);
}

export default UserListScreen;

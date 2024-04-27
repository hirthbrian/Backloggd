import React, { useMemo, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import GamePoster from '../components/GamePoster';
import FilterBanner from '../components/list/FilterBanner';
import { StatusEnum } from '../constants/Enums';
import mockGameList from '../mock';

const filters = [
	{ id: StatusEnum.WANT, data: mockGameList.want, label: 'Want to Play' },
	{ id: StatusEnum.PLAYED, data: mockGameList.played, label: 'Played' },
	{
		id: StatusEnum.FAVORITED,
		data: mockGameList.favorited,
		label: 'Favorited',
	},
];

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
	const [selectedFilter, setSelectedFilter] = useState(StatusEnum.WANT);
	const insets = useSafeAreaInsets();

	const onPress = (id: number, name: string) =>
		navigation.navigate('Details', { id, name });

	const data = useMemo(
		() => filters.find((f) => f.id === selectedFilter)?.data,
		[selectedFilter],
	);

	const onFilterSelected = (filter: string) => setSelectedFilter(filter);

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
		<FlatList
			data={data}
			numColumns={3}
			renderItem={renderItem}
			stickyHeaderIndices={[0]}
			ListHeaderComponent={
				<FilterBanner
					filters={filters}
					onFilterSelected={onFilterSelected}
					highlightedFilter={selectedFilter}
				/>
			}
			ItemSeparatorComponent={renderSeparator}
			style={{ flex: 1 }}
			contentContainerStyle={{
				paddingBottom: 10,
			}}
		/>
	);
}

export default UserListScreen;

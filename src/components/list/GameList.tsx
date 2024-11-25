import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GamePoster from '../GamePoster';
import { BigLight, NormalRegular } from '../Texts';

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

type GameListProps = {
	title?: string;
	subtitle?: string;
	data: Array<GameType>;
};
function GameList({ title, subtitle, data }: GameListProps) {
	const navigation = useNavigation();

	const onPress = (id: number, name: string) =>
		navigation.navigate('Details', { id, name });

	const renderItem = ({ item }: { item: GameType }) => (
		<GamePoster
			name={item.name}
			score={item.topCriticScore}
			uri={`https://img.opencritic.com/${item.images.box.og}`}
			onPress={() => onPress(item.id, item.name)}
		/>
	);

	return (
		<View>
			<View style={styles.titles}>
				{title && (
					<View
						style={{
							paddingTop: 24,
							paddingBottom: 8,
						}}
					>
						<BigLight lineHeight={38.4}>{title}</BigLight>
					</View>
				)}

				{title && (
					<View
						style={{
							paddingBottom: 16,
						}}
					>
						<NormalRegular lineHeight={24}>{subtitle}</NormalRegular>
					</View>
				)}
			</View>
			<FlatList
				horizontal
				data={data}
				contentContainerStyle={{ paddingHorizontal: 15 }}
				ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				keyExtractor={({ id }) => id.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	titles: {
		paddingHorizontal: 15,
	},
});

export default GameList;

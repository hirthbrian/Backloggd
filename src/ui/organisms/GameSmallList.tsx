import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import NormalRegular from '../../ui/atoms/Texts/NormalRegular';
import NormalLight from '../../ui/atoms/Texts/NormalLight';
import NormalBold from '../../ui/atoms/Texts/NormalBold';
import LargeRegular from '../../ui/atoms/Texts/LargeRegular';
import { RatingSmall } from '../../domain/Rating';
import getRating from '../../infrastructure/utils/Rating';

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

type GameSmallListProps = {
	title?: string;
	subtitle?: string;
	data: Array<GameType>;
};

export default function GameSmallList({ title, data }: GameSmallListProps) {
	const navigation = useNavigation();
	const { colors } = useTheme();

	const onPress = (id: number, name: string) =>
		navigation.navigate('Details', { id, name });

	const renderSeparator = () => (
		<View
			style={{
				height: 1,
				opacity: 0.5,
				marginHorizontal: 15,
				backgroundColor: colors.border,
			}}
		/>
	);

	const renderFooter = () => (
		<View
			style={{
				paddingTop: 15,
				justifyContent: 'flex-end',
			}}
		>
			<NormalRegular textAlign="center" color={colors.blue}>
				View More
			</NormalRegular>
		</View>
	);

	const renderItem = ({ item }: { item: GameType }) => (
		<Pressable onPress={() => onPress(item.id, item.name)}>
			<View
				style={{
					paddingVertical: 6,
					paddingHorizontal: 15,
					alignItems: 'center',
					flexDirection: 'row',
				}}
			>
				<Image
					source={getRating(item.topCriticScore, RatingSmall)}
					style={styles.smallManIcon}
				/>
				<View style={{ paddingLeft: 5, paddingRight: 8 }}>
					<NormalBold>{item.topCriticScore.toFixed()}</NormalBold>
				</View>
				<NormalLight>{item.name}</NormalLight>
			</View>
		</Pressable>
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
						<LargeRegular lineHeight={38.4}>{title.toUpperCase()}</LargeRegular>
					</View>
				)}
			</View>
			<FlatList
				scrollEnabled={false}
				data={data.slice(0, 8)}
				renderItem={renderItem}
				ItemSeparatorComponent={renderSeparator}
				ListFooterComponent={renderFooter}
				showsHorizontalScrollIndicator={false}
				keyExtractor={({ id }) => id.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	poster: {
		width: 142,
		height: 213,
		borderRadius: 4,
	},
	smallManIcon: {
		width: 20,
		height: 24,
	},
	titles: {
		paddingHorizontal: 15,
	},
});

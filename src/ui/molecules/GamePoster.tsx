import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import getRating from '../../infrastructure/utils/Rating';
import { RatingSmall } from '../../domain/Rating';
import NormalBold from '../atoms/Texts/NormalBold';
import NormalLight from '../atoms/Texts/NormalLight';

type GamePosterProps = {
	uri: string;
	width: number;
	name: string;
	score: number;
	onPress: (id: string, name: string) => void;
};
function GamePoster({
	uri,
	width = 142,
	name,
	score,
	onPress,
}: GamePosterProps) {
	const { colors } = useTheme();

	return (
		<Pressable onPress={onPress}>
			<View>
				<Image
					source={{ uri }}
					style={{
						width,
						height: width * (3 / 2),
						borderRadius: 4,
						backgroundColor: colors.border,
					}}
				/>
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
					}}
				>
					<Image
						source={getRating(score, RatingSmall)}
						style={styles.smallManIcon}
					/>
					<View style={{ paddingLeft: 8 }}>
						<NormalBold lineHeight={24}>{score.toFixed()}</NormalBold>
					</View>
				</View>
				<View style={{ width }}>
					<NormalLight numberOfLines={2}>{name}</NormalLight>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	poster: {},
	smallManIcon: {
		width: 13,
		height: 16,
	},
});

export default GamePoster;

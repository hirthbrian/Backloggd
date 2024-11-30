import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { RatingSmall } from '../../domain/Rating';
import getRating from '../../infrastructure/utils/Rating';
import NormalSemiBold from '../atoms/Texts/NormalSemiBold';
import NormalRegular from './Texts/NormalRegular';

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

type Props = {
	data: GameType;
	onPress?: (id: number, name: string) => void;
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 6,
		paddingHorizontal: 15,
		alignItems: 'center',
		flexDirection: 'row',
	},
	smallManIcon: {
		width: 20,
		height: 24,
	},
});

const SmallListItem = ({ data, onPress }: Props) => {
	const source = useMemo(() => getRating(data.topCriticScore, RatingSmall), []);

	const fixedScore = useMemo(() => data.topCriticScore?.toFixed(), []);

	const onPressLocal = () => {
		if (onPress) onPress(data.id, data.name);
	};

	const renderScore = () => {
		if (data.topCriticScore)
			return (
				<>
					<Image source={source} style={styles.smallManIcon} />
					<NormalSemiBold style={{ paddingLeft: 5, paddingRight: 8 }}>
						{fixedScore}
					</NormalSemiBold>
				</>
			);
		return null;
	};

	return (
		<Pressable onPress={onPressLocal}>
			<View style={styles.container}>
				{renderScore()}
				<NormalRegular>{data.name}</NormalRegular>
			</View>
		</Pressable>
	);
};

export default SmallListItem;

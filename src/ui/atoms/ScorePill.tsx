import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import getRating from '../../infrastructure/utils/Rating';
import { RatingSmall } from '../../domain/Rating';
import NormalSemiBold from './Texts/NormalSemiBold';

type GamePosterProps = {
	score: number;
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: 3,
		paddingHorizontal: 6,
		borderRadius: 9,
		gap: 8,
	},
	smallManIcon: {
		width: 13,
		height: 16,
	},
});

function ScorePill({ score }: GamePosterProps) {
	const { colors } = useTheme();

	const source = useMemo(() => getRating(score, RatingSmall), []);

	const fixedScore = useMemo(() => score.toFixed(), []);

	return (
		<View style={[styles.container, { backgroundColor: `${colors.text}5A` }]}>
			<Image source={source} style={styles.smallManIcon} />
			<NormalSemiBold color={colors.background}>{fixedScore}</NormalSemiBold>
		</View>
	);
}

export default ScorePill;

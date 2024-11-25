// @flow
import React, { useEffect, useState } from 'react';
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	useWindowDimensions,
	View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import dayjs from 'dayjs';

import { getGameDetails } from '../api';
import GameUserStatus from '../components/GameUserStatus';
import { RatingBig } from '../constants/Rating';
import type { GameDetails } from '../constants/Types';
import mockGameList from '../mock';
import getRating from '../utils/Rating';
import BiggerRegular from '../ui/atoms/Texts/BiggerRegular';
import NormalRegular from '../ui/atoms/Texts/NormalRegular';
import NormalBold from '../ui/atoms/Texts/NormalBold';

export default function HomeScreen({ route }) {
	const id = route?.params?.id;
	const { width } = useWindowDimensions();
	const { colors } = useTheme();

	const [details, setDetails] = useState<GameDetails>();

	useEffect(() => {
		getGameDetails(id).then(setDetails);
		// if (mockGameList.game[id]) setDetails(mockGameList.game[id]);
	}, [id]);

	if (!details) return null;

	const renderScore = (score: number, title: string) => (
		<View style={styles.scroreContainer}>
			<View
				style={{
					width: 75,
					height: 75,
					borderRadius: 40,
					borderWidth: 5,
					borderColor: colors.primary,
					alignItems: 'center',
					justifyContent: 'center',
					// backgroundColor: colors.header,
				}}
			>
				<BiggerRegular color={colors.text}>{score.toFixed()}</BiggerRegular>
			</View>
			<NormalRegular textAlign="center">{title}</NormalRegular>
		</View>
	);

	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: colors.background,
			}}
		>
			<ImageBackground
				source={{
					uri: `https://img.opencritic.com/${details.images.square.og}`,
				}}
				style={{
					width,
					height: width,
					justifyContent: 'flex-end',
					alignItems: 'flex-end',
				}}
			>
				<GameUserStatus />
			</ImageBackground>
			<View
				style={{
					padding: 20,
					marginTop: -5,
					borderTopLeftRadius: 4,
					borderTopRightRadius: 4,
					backgroundColor: colors.background,
				}}
			>
				<BiggerRegular>{details.name}</BiggerRegular>
				<NormalRegular>
					{details.Companies.map(({ name }) => name).join(', ')}
				</NormalRegular>
				<NormalRegular>
					{dayjs(details.firstReleaseDate).format('MMM D, YYYY')}
					{' - '}
					<NormalBold>
						{details.Platforms.map(({ name }) => name).join(', ')}
					</NormalBold>
				</NormalRegular>
				<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
					<View style={styles.scroreContainer}>
						<Image
							style={{ width: 79, height: 74 }}
							source={{ uri: getRating(details.medianScore, RatingBig) }}
						/>
						<NormalRegular textAlign="center">OpenCritic Rating</NormalRegular>
					</View>
					{renderScore(details.topCriticScore, 'Top Critic Average')}
					{renderScore(details.percentRecommended, 'Critics Recommend')}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scroreContainer: {
		flex: 1,
		paddingHorizontal: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

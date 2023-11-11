import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	useWindowDimensions,
	View,
} from 'react-native';
import dayjs from 'dayjs';

import GameUserStatus from '../components/GameUserStatus';
import { BiggerRegular, NormalBold, NormalRegular } from '../components/Texts';
import Colors from '../constants/Colors';
import type { GameDetails } from '../constants/Types';
import mockGameList from '../mock';
import { getRatingBig } from '../utils/Rating';

export default function HomeScreen({ route }) {
	const id = route?.params?.id;
	const { width } = useWindowDimensions();

	const [details, setDetails] = useState<GameDetails>();

	useEffect(() => {
		if (mockGameList.game[id]) setDetails(mockGameList.game[id]);
	}, [id]);

	if (!details) return null;

	const renderScore = (score: number, title: string) => (
		<View style={styles.scroreContainer}>
			<View style={styles.scroreNumberContainer}>
				<BiggerRegular color={Colors.white}>{score.toFixed()}</BiggerRegular>
			</View>
			<NormalRegular textAlign="center">{title}</NormalRegular>
		</View>
	);

	return (
		<ScrollView style={styles.container}>
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
					backgroundColor: Colors.background,
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
							source={{ uri: getRatingBig(details.medianScore) }}
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
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	scroreContainer: {
		flex: 1,
		paddingHorizontal: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scroreNumberContainer: {
		width: 75,
		height: 75,
		borderRadius: 40,
		borderWidth: 5,
		borderColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.header,
	},
});

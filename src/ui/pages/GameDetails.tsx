import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'react-query';

import NormalRegular from '../atoms/Texts/NormalRegular';
import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import GamePoster from '../atoms/GamePoster';
import globalStyles from '../themes/globalStyles';
import dayjs from 'dayjs';
import getGameDetails from '../../infrastructure/fetch/getGameDetails';
import LoadingPage from '../templates/LoadingPage';
import ErrorPage from '../templates/ErrorPage';
import SectionTitle from '../atoms/Texts/SectionTitle';
import colors from '../themes/colors';
import ScreenshotCarousel from '../molecules/ScreenshotCarousel';
import LabelList from '../atoms/LabelList';
import Header from '../atoms/Texts/Header';
import PlatformList from '../organisms/Platform/PlatformList';
import Divider from '../atoms/Divider';

type Props = StaticScreenProps<{
	id: number;
}>;

const styles = StyleSheet.create({
	headerContainer: {
		gap: 5,
		flexDirection: 'row',
		...globalStyles.paddingHorizontal,
	},
	headerText: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	summary: {
		paddingTop: 20,
		...globalStyles.paddingHorizontal,
	},
	platformList: {
		gap: 5,
		...globalStyles.paddingHorizontal,
	},
});

const GameDetails = ({ route }: Props) => {
	const navigation = useNavigation();
	const response = useQuery(['gameDetails', route?.params?.id], () =>
		getGameDetails(route?.params?.id),
	);

	useEffect(() => {
		navigation.setOptions({ title: response?.data?.name || '' });
	}, [response?.data?.name]);

	const formatedReleaseDate = useMemo(
		() => dayjs(response?.data?.first_released_date).format('MMM D, YYYY'),
		[],
	);

	if (response?.isLoading) return <LoadingPage />;
	if (response?.isError) return <ErrorPage />;

	const renderCompanies = () => {
		return (
			<NormalRegular>
				{`by `}
				<LabelList
					labels={response?.data?.involved_companies
						?.filter((c) => c.developer)
						?.map((c) => c.company.name)}
				/>
			</NormalRegular>
		);
	};

	const renderHeader = () => {
		return (
			<View style={styles.headerContainer}>
				<View style={styles.headerText}>
					<Header
						numberOfLines={3}
						style={{ paddingBottom: 5 }}
						color={colors.white}
					>
						{response?.data?.name}
					</Header>
					<NormalRegular>
						{`released on `}
						<NormalRegular color={colors.text_highlight}>
							{formatedReleaseDate}
						</NormalRegular>
					</NormalRegular>
					{renderCompanies()}
				</View>
				<GamePoster cover={response?.data?.cover} name={response.data.name} />
			</View>
		);
	};

	const renderPlatforms = () => {
		return (
			<View style={styles.platformList}>
				<NormalRegular>Released on: </NormalRegular>
				<PlatformList data={response?.data?.platforms} />
			</View>
		);
	};

	return (
		<ScrollView style={{ flex: 1 }}>
			<ScreenshotCarousel screenshots={response?.data?.screenshots} />
			{renderHeader()}
			<View style={styles.summary}>
				<NormalRegular numberOfLines={3}>
					{response?.data?.summary}
				</NormalRegular>
			</View>
			<Divider />
			{renderPlatforms()}
		</ScrollView>
	);
};

export default GameDetails;

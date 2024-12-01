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
import colors from '../themes/colors';
import ScreenshotCarousel from '../molecules/ScreenshotCarousel';
import LabelList from '../atoms/LabelList';
import Header from '../atoms/Texts/Header';
import PlatformList from '../organisms/Platform/PlatformList';
import Divider from '../atoms/Divider';
import PrimaryButton from '../atoms/PrimaryButton';
import { SheetManager } from 'react-native-actions-sheet';
import { SheetIdEnum } from '../organisms/ActionSheet/sheets';

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
	const query = useQuery(['gameDetails', route?.params?.id], () =>
		getGameDetails(route?.params?.id),
	);

	useEffect(() => {
		navigation.setOptions({ title: query?.data?.name || '' });
	}, [query?.data?.name]);

	const formatedReleaseDate = useMemo(
		() => dayjs(query?.data?.first_released_date).format('MMM D, YYYY'),
		[],
	);

	if (query?.isLoading) return <LoadingPage />;
	if (query?.isError) return <ErrorPage />;

	const renderCompanies = () => {
		return (
			<NormalRegular>
				{`by `}
				<LabelList
					labels={query?.data?.involved_companies
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
						{query?.data?.name}
					</Header>
					<NormalRegular>
						{`released on `}
						<NormalRegular color={colors.text_highlight}>
							{formatedReleaseDate}
						</NormalRegular>
					</NormalRegular>
					{renderCompanies()}
				</View>
				<GamePoster
					id={query?.data?.id}
					cover={query?.data?.cover}
					name={query.data.name}
				/>
			</View>
		);
	};

	const renderPlatforms = () => {
		return (
			<View style={styles.platformList}>
				<NormalRegular>Released on: </NormalRegular>
				<PlatformList data={query?.data?.platforms} />
			</View>
		);
	};

	return (
		<ScrollView style={{ flex: 1 }}>
			<ScreenshotCarousel screenshots={query?.data?.screenshots} />
			{renderHeader()}
			<View style={styles.summary}>
				<NormalRegular numberOfLines={3}>{query?.data?.summary}</NormalRegular>
			</View>
			<Divider />
			{renderPlatforms()}
			<Divider />
			<View style={globalStyles.paddingHorizontal}>
				<PrimaryButton
					title="Log Game"
					onPress={() =>
						SheetManager.show(SheetIdEnum.LOG_GAME, {
							payload: { id: query?.data?.id, name: query?.data?.name },
						})
					}
				/>
			</View>
		</ScrollView>
	);
};

export default GameDetails;

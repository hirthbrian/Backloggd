import React, { useEffect, useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';

import NormalRegular from '../atoms/Texts/NormalRegular';
import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import GamePoster from '../atoms/GamePoster';
import globalStyles from '../themes/globalStyles';
import dayjs from 'dayjs';
import getGameDetails from '../../infrastructure/fetch/game/getGameDetails';
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
import { getImageUrl } from '../../infrastructure/utils';

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
	const query = useQuery(['getGameDetails', route?.params?.id], () =>
		getGameDetails(route?.params?.id),
	);

	useEffect(() => {
		navigation.setOptions({ title: query?.data?.name || '' });
	}, [navigation, query?.data?.name]);

	const formatedReleaseDate = useMemo(
		() => dayjs(query?.data?.first_released_date).format('MMM D, YYYY'),
		[query?.data?.first_released_date],
	);

	if (query?.isLoading) {
		return <LoadingPage />;
	}

	if (query?.isError) {
		return <ErrorPage />;
	}

	const showCoverFullscreen = () => {
		navigation.navigate('MediaGallery', {
			images: [query?.data?.cover],
		});
	};

	const showScreenshotsFullscreen = () => {
		navigation.navigate('MediaGallery', {
			images: query?.data?.screenshots,
		});
	};

	const renderCompanies = () => {
		return (
			<NormalRegular>
				{'by '}
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
						{'released on '}
						<NormalRegular color={colors.text_highlight}>
							{formatedReleaseDate}
						</NormalRegular>
					</NormalRegular>
					{renderCompanies()}
				</View>
				<GamePoster
					imageSize="cover_big"
					disableLongPress
					onPress={showCoverFullscreen}
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const renderScreenshots = () => {
		return (
			<View style={{ flexDirection: 'row', gap: 5 }}>
				{query?.data?.screenshots.map((s) => {
					return (
						<Pressable onPress={showScreenshotsFullscreen}>
							<Image
								style={{ width: 100, height: 100, borderRadius: 4 }}
								source={{ uri: getImageUrl(s.image_id) }}
							/>
						</Pressable>
					);
				})}
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
			{/* {renderScreenshots()} */}
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

import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import GameListHorizontal from '../organisms/Game/GameListHorizontal';
import { SafeAreaView } from 'react-native-safe-area-context';
import NormalSemiBold from '../atoms/Texts/NormalSemiBold';

type Props = StaticScreenProps<{
	id: number;
}>;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		gap: 5,
		flexDirection: 'row',
		...globalStyles.paddingHorizontal,
	},
	headerTitle: {
		paddingBottom: 5,
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
	logButtonContainer: {
		paddingTop: 10,
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
		if (query?.data?.cover) {
			navigation.navigate('MediaGallery', {
				images: [query?.data?.cover],
			});
		}
	};

	// const showScreenshotsFullscreen = () => {
	// 	if (query?.data?.screenshots) {
	// 		navigation.navigate('MediaGallery', {
	// 			images: query?.data?.screenshots,
	// 		});
	// 	}
	// };

	const renderCompanies = () => {
		return (
			<NormalRegular>
				{'by '}
				<LabelList
					highlightColor={colors.text_highlight}
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
						style={styles.headerTitle}
						color={colors.white}
					>
						{query?.data?.name}
					</Header>
					<NormalRegular>
						{'released on '}
						<NormalSemiBold color={colors.text_highlight}>
							{formatedReleaseDate}
						</NormalSemiBold>
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

	// const renderScreenshots = () => {
	// 	return (
	// 		<View style={{ flexDirection: 'row', gap: 5 }}>
	// 			{query?.data?.screenshots.map((s) => {
	// 				return (
	// 					<Pressable onPress={showScreenshotsFullscreen}>
	// 						<Image
	// 							style={{ width: 100, height: 100, borderRadius: 4 }}
	// 							source={{ uri: getImageUrl(s.image_id) }}
	// 						/>
	// 					</Pressable>
	// 				);
	// 			})}
	// 		</View>
	// 	);
	// };

	const renderCollections = () => {
		if (query?.data?.collections) {
			return query?.data?.collections.map((collection) => {
				return (
					<GameListHorizontal
						title={`In "${collection.name}" series`}
						data={collection.games}
						onPressSeeMore={() =>
							navigation.navigate('FilteredGames', {
								collectionId: collection.id,
							})
						}
					/>
				);
			});
		}
		return null;
	};

	return (
		<ScrollView style={styles.container}>
			<SafeAreaView edges={['bottom']}>
				<ScreenshotCarousel screenshots={query?.data?.screenshots} />
				{renderHeader()}
				<View style={styles.summary}>
					<NormalRegular numberOfLines={3}>
						{query?.data?.summary}
					</NormalRegular>
				</View>
				<Divider />
				{renderPlatforms()}
				<Divider />
				{renderCollections()}
				{/* <GameListHorizontal
					title="Similar Games"
					data={query?.data?.similar_games}
				/> */}
				{/* {renderScreenshots()} */}
				<View style={styles.logButtonContainer}>
					<PrimaryButton
						title="Create or Update Log"
						onPress={() =>
							SheetManager.show(SheetIdEnum.LOG_GAME, {
								payload: { id: query?.data?.id, name: query?.data?.name },
							})
						}
					/>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

export default GameDetails;

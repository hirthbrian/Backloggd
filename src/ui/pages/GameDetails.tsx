import dayjs from 'dayjs';

import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useDerivedValue,
	useScrollViewOffset,
	useSharedValue,
} from 'react-native-reanimated';
import { useQuery } from 'react-query';

import Header from '@texts/Header';
import NormalRegular from '@texts/NormalRegular';
import NormalSemiBold from '@texts/NormalSemiBold';

import getGameDetails from '../../infrastructure/fetch/game/getGameDetails';
import Divider from '../atoms/Divider';
import GamePoster from '../atoms/GamePoster';
import LabelList from '../atoms/LabelList';
import PrimaryButton from '../atoms/PrimaryButton';
import BackgroundCover from '../molecules/BackgroundCover';
import { SheetIdEnum } from '../organisms/ActionSheet/sheets';
import GameListHorizontal from '../organisms/Game/GameListHorizontal';
import PlatformList from '../organisms/Platform/PlatformList';
import ErrorPage from '../templates/ErrorPage';
import LoadingPage from '../templates/LoadingPage';
import colors from '../themes/colors';
import globalStyles from '../themes/globalStyles';

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
	const animatedRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(
		animatedRef.current ? animatedRef : null,
	);

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
						key={collection.id}
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
		<Animated.ScrollView ref={animatedRef} style={styles.container}>
			<BackgroundCover
				screenshots={query?.data?.screenshots}
				scrollOffset={scrollOffset}
			/>
			{renderHeader()}
			<View style={styles.summary}>
				<NormalRegular numberOfLines={3}>{query?.data?.summary}</NormalRegular>
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
		</Animated.ScrollView>
	);
};

export default GameDetails;

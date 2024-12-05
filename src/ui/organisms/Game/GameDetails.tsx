import { IGameShort } from '@entities/gameEntities';
import { useNavigation } from '@react-navigation/native';
import Header from '@texts/Header';
import NormalRegular from '@texts/NormalRegular';
import NormalSemiBold from '@texts/NormalSemiBold';
import SectionTitle from '@texts/SectionTitle';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import Animated, {
	interpolateColor,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';

import Divider from '../../atoms/Divider';
import GamePoster from '../../atoms/GamePoster';
import LabelList from '../../atoms/LabelList';
import PrimaryButton from '../../atoms/PrimaryButton';
import BackgroundCover from '../../molecules/BackgroundCover';
import colors from '../../themes/colors';
import globalStyles from '../../themes/globalStyles';
import { SheetIdEnum } from '../ActionSheet/sheets';
import PlatformList from '../Platform/PlatformList';
import GameListHorizontal from './GameListHorizontal';

type Props = {
	data: IGameShort;
};

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
		paddingTop: 20,
		...globalStyles.paddingHorizontal,
	},
});

const GameDetails = ({ data }: Props) => {
	const navigation = useNavigation();
	const animatedRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(animatedRef);

	const aStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			scrollOffset.value,
			[0, 200],
			['transparent', colors.background],
		),
	}));

	const aStyleText = useAnimatedStyle(() => ({
		color: interpolateColor(
			scrollOffset.value,
			[0, 200],
			['transparent', colors.white],
		),
	}));

	useEffect(() => {
		navigation.setOptions({
			headerBackground: () => <Animated.View style={[aStyle, { flex: 1 }]} />,
			headerTitle: () => (
				<SectionTitle>
					<Animated.Text style={[aStyleText]}>{data.name}</Animated.Text>
				</SectionTitle>
			),
		});
	}, [aStyle, aStyleText, data.name, navigation]);

	const formatedReleaseDate = useMemo(
		() => dayjs(data?.first_released_date).format('MMM D, YYYY'),
		[data?.first_released_date],
	);

	const showCoverFullscreen = () => {
		if (data?.cover) {
			navigation.navigate('MediaGallery', {
				images: [data?.cover],
			});
		}
	};

	// const showScreenshotsFullscreen = () => {
	// 	if (data?.screenshots) {
	// 		navigation.navigate('MediaGallery', {
	// 			images: data?.screenshots,
	// 		});
	// 	}
	// };

	const renderCompanies = () => {
		return (
			<NormalRegular>
				{'by '}
				<LabelList
					highlightColor={colors.text_highlight}
					labels={data?.involved_companies
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
						{data?.name}
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
					id={data?.id}
					cover={data?.cover}
					name={data.name}
				/>
			</View>
		);
	};

	const renderPlatforms = () => {
		if (data?.platforms) {
			return (
				<View style={styles.platformList}>
					<NormalRegular>Released on: </NormalRegular>
					<PlatformList data={data.platforms} />
				</View>
			);
		}
		return null;
	};

	// const renderScreenshots = () => {
	// 	return (
	// 		<View style={{ flexDirection: 'row', gap: 5 }}>
	// 			{data?.screenshots.map((s) => {
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
		if (data?.collections) {
			return data?.collections.map((collection) => {
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
				screenshots={data?.screenshots}
				scrollOffset={scrollOffset}
			/>
			{renderHeader()}
			<View style={styles.summary}>
				<NormalRegular numberOfLines={10}>{data?.summary}</NormalRegular>
			</View>
			<Divider />
			{renderPlatforms()}
			<Divider />
			{renderCollections()}
			{/* <GameListHorizontal
					title="Similar Games"
					data={data?.similar_games}
				/> */}
			{/* {renderScreenshots()} */}
			<View style={styles.logButtonContainer}>
				<PrimaryButton
					title="Create or Update Log"
					onPress={() =>
						SheetManager.show(SheetIdEnum.LOG_GAME, {
							payload: { id: data?.id, name: data?.name },
						})
					}
				/>
			</View>
		</Animated.ScrollView>
	);
};

export default GameDetails;

import { IGameShort } from '@entities/gameEntities';
import { useNavigation } from '@react-navigation/native';
import Header from '@texts/Header';
import NormalRegular from '@texts/NormalRegular';
import NormalSemiBold from '@texts/NormalSemiBold';
import SectionTitle from '@texts/SectionTitle';
import globalStyles from '@themes/globalStyles';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	interpolateColor,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Divider from '../../atoms/Divider';
import GamePoster from '../../atoms/GamePoster';
import LabelList from '../../atoms/LabelList';
import BackgroundCover from '../../molecules/BackgroundCover';
import ScreenshotCarousel from '../../molecules/Game/ScreenshotCarousel';
import LogStatus from '../../molecules/LogStatus';
import colors from '../../themes/colors';
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
		...globalStyles.withPadding,
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
		...globalStyles.withPadding,
	},
	platformList: {
		gap: 5,
		...globalStyles.withPadding,
	},
});

const GameDetails = ({ data }: Props) => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const animatedRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(animatedRef);

	const aStyle = useAnimatedStyle(() => ({
		flex: 1,
		backgroundColor: interpolateColor(
			scrollOffset.value,
			[0, 200],
			['transparent', colors.background],
		),
	}));

	const aStyleText = useAnimatedStyle(() => ({
		color: interpolateColor(
			scrollOffset.value,
			[100, 125],
			['transparent', colors.white],
		),
	}));

	const headerBackground = useCallback(
		() => <Animated.View style={aStyle} />,
		[aStyle],
	);
	const headerTitle = useCallback(
		() => (
			<SectionTitle numberOfLines={1}>
				<Animated.Text style={[aStyleText]}>{data.name}</Animated.Text>
			</SectionTitle>
		),
		[aStyleText, data.name],
	);

	useEffect(() => {
		navigation.setOptions({
			headerBackground,
			headerTitle,
		});
	}, [
		aStyle,
		aStyleText,
		data.name,
		headerBackground,
		headerTitle,
		navigation,
	]);

	const formatedReleaseDate = useMemo(
		() => dayjs.unix(data.first_release_date).format('MMM D, YYYY'),
		[data?.first_release_date],
	);

	const showCoverFullscreen = () => {
		if (data?.cover) {
			navigation.navigate('MediaGallery', {
				images: [data?.cover],
			});
		}
	};

	const showScreenshotsFullscreen = (index: number) => {
		if (data?.screenshots) {
			navigation.navigate('MediaGallery', {
				images: data?.screenshots,
				index,
			});
		}
	};

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

	const renderCollections = () => {
		if (data?.collections) {
			return (
				<>
					<GameListHorizontal
						key={data.collections[0].id}
						title={`In "${data.collections[0].name}" series`}
						data={data.collections[0].games}
						onPressSeeMore={() =>
							navigation.navigate('FilteredGames', {
								collectionId: data.collections[0].id,
							})
						}
					/>
					<Divider />
				</>
			);
		}
		return null;
	};

	const renderScreenshots = () => {
		if (data.screenshots) {
			return (
				<ScreenshotCarousel
					onPress={showScreenshotsFullscreen}
					data={data.screenshots}
				/>
			);
		}
		return null;
	};

	return (
		<Animated.ScrollView
			ref={animatedRef}
			style={[styles.container]}
			contentContainerStyle={{ paddingBottom: insets.bottom }}
		>
			<BackgroundCover
				screenshots={data?.screenshots}
				scrollOffset={scrollOffset}
			/>
			{renderHeader()}
			<View style={styles.summary}>
				<NormalRegular numberOfLines={10}>{data?.summary}</NormalRegular>
			</View>
			<Divider />
			<View style={globalStyles.withPadding}>
				<LogStatus gameId={data.id} />
			</View>
			<Divider />
			{renderPlatforms()}
			<Divider />
			{renderCollections()}
			{renderScreenshots()}
		</Animated.ScrollView>
	);
};

export default GameDetails;

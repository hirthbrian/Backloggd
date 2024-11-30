import React, { useEffect, useMemo } from 'react';
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	useWindowDimensions,
	View,
} from 'react-native';
import { useQuery } from 'react-query';

import NormalRegular from '../atoms/Texts/NormalRegular';
import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import Header from '../atoms/Texts/Header';
import GamePoster from '../atoms/GamePoster';
import globalStyles from '../themes/globalStyles';
import dayjs from 'dayjs';
import getGameDetails from '../../infrastructure/fetch/getGameDetails';
import LoadingPage from '../templates/LoadingPage';
import ErrorPage from '../templates/ErrorPage';
import SectionTitle from '../atoms/Texts/SectionTitle';
import colors from '../themes/colors';
import { getImageUrl } from '../../infrastructure/utils';
import { IImage } from '../../domain/entities/gameEntities';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
	screenshots: Array<IImage> | undefined;
};

const styles = StyleSheet.create({
	container: {
		height: 100,
	},
	image: {
		height: 200,
	},
});

const ScreenshotCarousel = ({ screenshots }: Props) => {
	const { width } = useWindowDimensions();

	if (!screenshots)
		return (
			<LinearGradient
				style={styles.container}
				locations={[0, 0.9]}
				colors={[colors.background_light, colors.background]}
			/>
		);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={{
					uri: getImageUrl(screenshots[0]?.image_id, '720p'),
				}}
				style={[styles.image, { width, opacity: 0.9 }]}
			>
				<LinearGradient
					style={styles.image}
					locations={[0, 0.9]}
					colors={[colors.background + '00', colors.background]}
				/>
			</ImageBackground>
		</View>
	);
};

export default ScreenshotCarousel;

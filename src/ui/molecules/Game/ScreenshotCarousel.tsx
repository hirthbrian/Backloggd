import { IImage } from '@entities/commonEntities';
import React from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { getImageUrl } from '../../../infrastructure/utils';

type Props = {
	data: Array<IImage>;
	height?: number;
	onPress: (index: number) => void;
};

const styles = StyleSheet.create({
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
});

const ScreenshotCarousel = ({ data, height = 250, onPress }: Props) => {
	const { width } = useWindowDimensions();

	const renderItem = ({ item, index }: { item: IImage; index: number }) => {
		return (
			<Pressable onPress={() => onPress(index)} style={styles.image}>
				<Image
					resizeMode="contain"
					source={{ uri: getImageUrl(item.image_id, '720p') }}
					width={width}
					height={height}
				/>
			</Pressable>
		);
	};

	return (
		<View>
			<Carousel
				loop={false}
				width={width}
				height={height}
				snapEnabled={true}
				pagingEnabled={true}
				data={data}
				style={{ width }}
				renderItem={renderItem}
			/>
		</View>
	);
};

export default ScreenshotCarousel;

import { IImage } from '@entities/commonEntities';
import colors from '@themes/colors';
import globalStyles from '@themes/globalStyles';
import React, { useMemo, useState } from 'react';
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
	onPress: (index: number) => void;
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.background_light,
		backgroundColor: colors.background_highlight,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	indexIndicatorContainer: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
		flexDirection: 'row',
		gap: 5,
		paddingHorizontal: 6,
		paddingVertical: 4,
		borderRadius: 6,
		backgroundColor: colors.background + '4A',
	},
	indicatorDot: {
		width: 5,
		height: 5,
		borderRadius: 5,
	},
});

const ScreenshotCarousel = ({ data, onPress }: Props) => {
	const { width } = useWindowDimensions();
	const [currentIndex, setCurrentIndex] = useState(0);

	const ratio = useMemo(() => {
		if (data[0].height && data[0].width) {
			return data[0].height / data[0].width;
		}
		return 9 / 16;
	}, [data]);

	const imageWidth = useMemo(() => width - 30, [width]);

	const imageHeight = useMemo(() => imageWidth * ratio, [imageWidth, ratio]);

	const renderItem = ({ item, index }: { item: IImage; index: number }) => {
		return (
			<Pressable onPress={() => onPress(index)} style={styles.image}>
				<Image
					resizeMode="contain"
					source={{ uri: getImageUrl(item.image_id, '720p') }}
					width={imageWidth}
					height={imageHeight}
				/>
			</Pressable>
		);
	};

	const renderIndexIndicator = () => {
		return (
			<View style={styles.indexIndicatorContainer}>
				{data?.map((d, index) => (
					<View
						key={d.id}
						style={[
							styles.indicatorDot,
							{
								backgroundColor:
									index === currentIndex ? colors.white : colors.text,
							},
						]}
					/>
				))}
			</View>
		);
	};

	const onProgressChange = (offsetProgress: number, absoluteProgress: number) =>
		setCurrentIndex(Math.round(absoluteProgress));

	return (
		<View>
			<Carousel
				loop={false}
				width={imageWidth}
				height={imageHeight}
				onProgressChange={onProgressChange}
				snapEnabled={true}
				pagingEnabled={true}
				data={data}
				style={styles.container}
				containerStyle={globalStyles.withPadding}
				renderItem={renderItem}
			/>
			{renderIndexIndicator()}
		</View>
	);
};

export default ScreenshotCarousel;

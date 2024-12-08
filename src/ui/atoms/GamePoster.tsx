import { IImage } from '@entities/commonEntities';
import SmallRegular from '@texts/SmallRegular';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { getImageUrl, ImageSizeType } from '../../infrastructure/utils';
import { SheetIdEnum } from '../organisms/ActionSheet/sheets';
import colors from '../themes/colors';

type Props = {
	cover: IImage | undefined;
	disableLongPress?: boolean;
	id: number;
	imageSize?: ImageSizeType;
	name: string;
	onPress?: () => void;
	width?: number;
};

const styles = StyleSheet.create({
	image: {
		borderRadius: 5,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.background_light,
	},
	placeholder: {
		borderRadius: 5,
		overflow: 'hidden',
		justifyContent: 'center',
		padding: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.background_light,
	},
});

const RATIO = 352 / 264;

function GamePoster({
	cover,
	disableLongPress,
	id,
	imageSize = 'logo_med',
	name,
	onPress,
	width = 100,
}: Props) {
	const opacity = useSharedValue<number>(1);

	const onLongPress = () => {
		if (!disableLongPress) {
			SheetManager.show(SheetIdEnum.LOG_GAME, {
				payload: { id, name },
			});
		}
	};

	const onPressIn = () => {
		if (onPress) {
			opacity.value = 0.6;
		}
	};

	const onPressOut = () => {
		if (onPress) {
			opacity.value = 1;
		}
	};

	const renderPlaceholder = () => (
		<View
			style={[
				styles.placeholder,
				{
					width,
					height: width * RATIO,
				},
			]}
		>
			<SmallRegular textAlign="center" numberOfLines={3}>
				{name}
			</SmallRegular>
		</View>
	);

	const animatedStyles = useAnimatedStyle(() => ({
		opacity: withTiming(opacity.value, { duration: 200 }),
	}));

	const renderImage = () => {
		if (cover) {
			return (
				<Animated.Image
					source={{ uri: getImageUrl(cover.image_id, imageSize) }}
					style={[
						styles.image,
						animatedStyles,
						{
							width,
							height: width * RATIO,
						},
					]}
				/>
			);
		}
		return null;
	};

	return (
		<Pressable
			onPress={onPress}
			onLongPress={onLongPress}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
		>
			{cover ? renderImage() : renderPlaceholder()}
		</Pressable>
	);
}

export default GamePoster;

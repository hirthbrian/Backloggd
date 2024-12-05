import { IImage } from '@entities/commonEntities';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
	SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getImageUrl } from '../../infrastructure/utils';
import colors from '../themes/colors';

type Props = {
	scrollOffset: SharedValue<number>;
	screenshots: Array<IImage> | undefined;
};

const styles = StyleSheet.create({
	container: {
		height: 200,
	},
	absolutePositioned: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
});

const BackgroundCover = ({ screenshots, scrollOffset }: Props) => {
	const insets = useSafeAreaInsets();

	const height = useMemo(() => 100 + insets.top, [insets.top]);

	const animatedStyles = useAnimatedStyle(() => ({
		height: height + 100 - scrollOffset.value,
		transform: [{ translateY: scrollOffset.value }],
	}));

	if (!screenshots) {
		return (
			<LinearGradient
				style={styles.container}
				locations={[0, 0.9]}
				colors={[colors.background_light, colors.background]}
			/>
		);
	}

	return (
		<View style={{ height }}>
			<Animated.View style={[styles.container, animatedStyles]}>
				<Image
					source={{
						uri: getImageUrl(screenshots[0]?.image_id, '720p'),
					}}
					style={styles.absolutePositioned}
				/>
				<LinearGradient
					style={styles.absolutePositioned}
					locations={[0, 0.9]}
					colors={[colors.background + '00', colors.background]}
				/>
			</Animated.View>
		</View>
	);
};

export default BackgroundCover;

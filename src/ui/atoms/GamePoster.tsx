import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import colors from '../themes/colors';
import { getImageUrl } from '../../infrastructure/utils';
import { IImage } from '../../domain/entities/gameEntities';
import SmallRegular from './Texts/SmallRegular';

type Props = {
	cover: IImage | undefined;
	name: string;
	onPress?: () => void;
	width?: number;
};

const styles = StyleSheet.create({
	image: {
		borderRadius: 5,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.text,
	},
	placeholder: {
		borderRadius: 5,
		overflow: 'hidden',
		justifyContent: 'center',
		padding: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.text,
	},
});

const RATIO = 352 / 264;

function GamePoster({ cover, name, onPress, width = 100 }: Props) {
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

	const renderImage = () => (
		<Image
			source={{ uri: getImageUrl(cover.image_id) }}
			style={[
				styles.image,
				{
					width,
					height: width * RATIO,
				},
			]}
		/>
	);

	return (
		<Pressable onPress={onPress}>
			{cover ? renderImage() : renderPlaceholder()}
		</Pressable>
	);
}

export default GamePoster;

import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

import { IPlatform } from '../../../domain/entities/gameEntities';
import NormalRegular from '../../atoms/Texts/NormalRegular';
import colors from '../../themes/colors';
import { getImageUrl } from '../../../infrastructure/utils';

type Props = {
	data: Array<IPlatform>;
};

const styles = StyleSheet.create({
	container: {
		gap: 6,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	item: {
		gap: 2,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 4,
		borderRadius: 4,
		borderColor: colors.text,
		borderWidth: StyleSheet.hairlineWidth,
	},
	image: {
		height: 15,
		width: 15,
		backgroundColor: 'red',
	},
});

const PlatformList = ({ data }: Props) => {
	const renderItem = (item: IPlatform) => (
		<View style={styles.item} key={item.id}>
			{/* <Image
				style={styles.image}
				source={{ uri: getImageUrl(item.platform_logo.image_id, 'thumb') }}
			/> */}
			<NormalRegular>{item.name}</NormalRegular>
		</View>
	);

	return <View style={styles.container}>{data?.map(renderItem)}</View>;
};

export default PlatformList;

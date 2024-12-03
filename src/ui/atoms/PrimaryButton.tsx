import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';

import NormalSemiBold from '@texts/NormalSemiBold';

import colors from '../themes/colors';

type Props = {
	title: string;
	onPress: () => void;
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		gap: 10,
		borderRadius: 4,
	},
});

const PrimaryButton = ({ title, onPress }: Props) => {
	return (
		<Pressable onPress={onPress}>
			{({ pressed }) => (
				<View
					style={[
						styles.container,
						{
							backgroundColor: pressed
								? colors.primary_highlight
								: colors.primary,
						},
					]}
				>
					<NormalSemiBold color={colors.white} textAlign="center">
						{title}
					</NormalSemiBold>
				</View>
			)}
		</Pressable>
	);
};

export default PrimaryButton;

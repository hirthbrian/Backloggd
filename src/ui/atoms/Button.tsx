import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import colors from '../themes/colors';
import NormalSemiBold from './Texts/NormalSemiBold';

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

const Button = ({ title, onPress }: Props) => {
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

export default Button;

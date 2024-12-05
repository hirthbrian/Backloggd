import NormalSemiBold from '@texts/NormalSemiBold';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import colors from '../themes/colors';

type Props = {
	LeftIcon?: (props: SvgProps) => React.JSX.Element;
	onPress: () => void;
	RightIcon?: (props: SvgProps) => React.JSX.Element;
	title?: string;
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		gap: 10,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: colors.text,
	},
});

const SecondaryButton = ({ LeftIcon, onPress, RightIcon, title }: Props) => {
	return (
		<Pressable onPress={onPress}>
			{({ pressed }) => (
				<View
					style={[
						styles.container,
						{
							backgroundColor: pressed
								? colors.background_highlight
								: colors.background,
						},
					]}
				>
					{LeftIcon && <LeftIcon width={16} height={16} color={colors.text} />}
					{title && (
						<NormalSemiBold color={colors.white} textAlign="center">
							{title}
						</NormalSemiBold>
					)}
					{RightIcon && (
						<RightIcon width={16} height={16} color={colors.text} />
					)}
				</View>
			)}
		</Pressable>
	);
};

export default SecondaryButton;

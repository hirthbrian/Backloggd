import React from 'react';
import type { ColorValue, TextStyle } from 'react-native';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import colors from '../../themes/colors';

export type TextBaseProps = {
	children: React.ReactNode;
	color?: ColorValue;
	numberOfLines?: number;
	onPress?: () => void;
	style?: TextStyle;
	textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
	uppercase?: boolean;
};

function TextBase({
	children,
	color,
	numberOfLines,
	onPress,
	style,
	textAlign = 'auto',
	uppercase,
}: TextBaseProps) {
	return (
		<Text
			numberOfLines={numberOfLines}
			onPress={onPress}
			style={[
				style,
				{
					color: color || colors.text,
					textAlign,
					textTransform: uppercase ? 'uppercase' : undefined,
				},
			]}
		>
			{children}
		</Text>
	);
}

export default TextBase;

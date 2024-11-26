import React from 'react';
import type { ColorValue, TextStyle } from 'react-native';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export type TextBaseProps = {
	children: React.ReactNode;
	color?: ColorValue;
	numberOfLines?: number;
	style?: TextStyle;
	textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
	uppercase?: boolean;
};

function TextBase({
	children,
	color,
	numberOfLines,
	style,
	textAlign = 'auto',
	uppercase,
}: TextBaseProps) {
	const { colors } = useTheme();

	return (
		<Text
			numberOfLines={numberOfLines}
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

import React from 'react';
import type { ColorValue, TextProps, TextStyle } from 'react-native';
import { Text } from 'react-native';
import { MyLightTheme } from '../../../constants/Theme';

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
	color = MyLightTheme.colors.text,
	numberOfLines,
	style,
	textAlign = 'auto',
	uppercase,
}: TextBaseProps) {
	return (
		<Text
			numberOfLines={numberOfLines}
			style={[
				style,
				{
					color,
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

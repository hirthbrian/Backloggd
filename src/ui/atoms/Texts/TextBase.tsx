import React from 'react';
import type { ColorValue, TextStyle } from 'react-native';
import { Text } from 'react-native';

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
				{
					color: color || colors.text,
					textAlign,
					textTransform: uppercase ? 'uppercase' : undefined,
				},
				style,
			]}
		>
			{children}
		</Text>
	);
}

export default TextBase;

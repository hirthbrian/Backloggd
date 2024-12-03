import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import type { TextBaseProps } from './TextBase';
import TextBase from './TextBase';
import fonts from '../../themes/fonts';

export type Props = {
	children: ReactNode;
} & TextBaseProps;

const styles = StyleSheet.create({
	text: {
		fontSize: 12,
		lineHeight: 18,
		fontFamily: fonts.regular,
		fontWeight: '400',
	},
});

function SmallRegular({ children, ...props }: Props) {
	return (
		<TextBase {...props} style={{ ...styles.text, ...props.style }}>
			{children}
		</TextBase>
	);
}

export default SmallRegular;

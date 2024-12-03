import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import type { TextBaseProps } from './TextBase';
import TextBase from './TextBase';
import fonts from '../../themes/fonts';

export type NormalRegularProps = {
	children: ReactNode;
} & TextBaseProps;

const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: fonts.regular,
		fontWeight: '400',
	},
});

function NormalRegular({ children, ...props }: NormalRegularProps) {
	return (
		<TextBase {...props} style={{ ...styles.text, ...props.style }}>
			{children}
		</TextBase>
	);
}

export default NormalRegular;

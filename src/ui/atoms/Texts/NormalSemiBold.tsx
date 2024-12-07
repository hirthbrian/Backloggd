import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import fonts from '../../themes/fonts';
import type { TextBaseProps } from './TextBase';
import TextBase from './TextBase';

export type NormalSemiBoldProps = {
	children: ReactNode;
} & TextBaseProps;

const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: fonts.semiBold,
		fontWeight: '600',
	},
});

function NormalSemiBold({ children, ...props }: NormalSemiBoldProps) {
	return (
		<TextBase {...props} style={{ ...styles.text, ...props.style }}>
			{children}
		</TextBase>
	);
}

export default NormalSemiBold;

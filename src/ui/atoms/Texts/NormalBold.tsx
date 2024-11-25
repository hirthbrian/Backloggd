import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import type { TextBaseProps } from './TextBase';
import TextBase from './TextBase';

export type NormalBoldProps = {
	children: ReactNode;
} & TextBaseProps;

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		fontFamily: 'Roboto-Bold',
		fontWeight: '700',
	},
});

function NormalBold({ children, ...props }: NormalBoldProps) {
	return (
		<TextBase {...props} style={{ ...styles.text, ...props.style }}>
			{children}
		</TextBase>
	);
}

export default NormalBold;

import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import type { TextBaseProps } from './TextBase';
import TextBase from './TextBase';

export type LargeRegularProps = {
	children: ReactNode;
} & TextBaseProps;

const styles = StyleSheet.create({
	text: {
		fontSize: 32,
		fontFamily: 'Roboto-Bold',
		fontWeight: '300',
	},
});

function LargeRegular({ children, ...props }: LargeRegularProps) {
	return (
		<TextBase {...props} style={{ ...styles.text, ...props.style }}>
			{children}
		</TextBase>
	);
}

export default LargeRegular;

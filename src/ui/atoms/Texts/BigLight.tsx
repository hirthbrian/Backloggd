import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import type { TextBaseProps } from './TextBase';
import TextBase from './TextBase';

export type BigLightProps = {
	children: ReactNode;
} & TextBaseProps;

const styles = StyleSheet.create({
	text: {
		fontSize: 32,
		fontFamily: 'Roboto-Light',
		fontWeight: '300',
	},
});

function BigLight({ children, ...props }: BigLightProps) {
	return (
		<TextBase {...props} style={{ ...styles.text, ...props.style }}>
			{children}
		</TextBase>
	);
}

export default BigLight;

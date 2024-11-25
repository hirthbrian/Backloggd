import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import type { TextBaseProps } from './TextBase';
import TextBase from './TextBase';

export type NormalLightProps = {
	children: ReactNode;
} & TextBaseProps;

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		fontFamily: 'Roboto-Light',
		fontWeight: '300',
	},
});

function NormalLight({ children, ...props }: NormalLightProps) {
	return (
		<TextBase {...props} style={{ ...styles.text, ...props.style }}>
			{children}
		</TextBase>
	);
}

export default NormalLight;

import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import type { TextBaseProps } from './TextBase';
import TextBase from './TextBase';

export type BiggerRegularProps = {
	children: ReactNode;
} & TextBaseProps;

const styles = StyleSheet.create({
	text: {
		fontSize: 40,
		fontFamily: 'Roboto-Regular',
		fontWeight: '400',
	},
});

function BiggerRegular({ children, ...props }: BiggerRegularProps) {
	return (
		<TextBase {...props} style={{ ...styles.text, ...props.style }}>
			{children}
		</TextBase>
	);
}

export default BiggerRegular;

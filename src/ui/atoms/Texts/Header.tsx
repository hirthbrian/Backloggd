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
		fontSize: 28,
		lineHeight: 34,
		fontFamily: fonts.semiBold,
		fontWeight: '600',
	},
});

function Header({ children, ...props }: Props) {
	return (
		<TextBase {...props} style={{ ...styles.text, ...props.style }}>
			{children}
		</TextBase>
	);
}

export default Header;

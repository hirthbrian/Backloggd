import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import styled from 'styled-components/native';

interface TextProps {
	color?: string;
	lineHeight?: number;
	textAlign?: string;
	children?: React.ReactNode;
}

export const TextInput = styled.TextInput`
	flex: 1;
	padding: 0px 10px;
	font-size: 18px;
	font-weight: 400;
	font-family: 'Roboto-Regular';
`;

function TextBase({ children, ...props }: TextProps) {
	const { colors } = useTheme();

	return (
		<Text
			{...props}
			style={{
				...props.style,
				color: props.color || colors.text,
				textAlign: props.textAlign || 'left',
				lineHeight: props.lineHeight || 0,
			}}
		>
			{children}
		</Text>
	);
}

export const NormalLight = styled(TextBase)`
	font-size: 16px;
	font-weight: 300;
	font-family: 'Roboto-Light';
`;

export const BigLight = styled(TextBase)`
	font-size: 32px;
	font-weight: 300;
	font-family: 'Roboto-Light';
`;

export const NormalRegular = styled(TextBase)`
	font-size: 16px;
	font-weight: 400;
	font-family: 'Roboto-Regular';
`;

export const BiggerRegular = styled(TextBase)`
	font-size: 40px;
	font-weight: 400;
	font-family: 'Roboto-Regular';
`;

export const NormalBold = styled(TextBase)`
	font-size: 16px;
	font-weight: 700;
	font-family: 'Roboto-Bold';
`;

export const LargeRegular = styled(TextBase)`
	font-size: 32px;
	font-weight: 800;
	font-family: 'Roboto-Bold';
`;

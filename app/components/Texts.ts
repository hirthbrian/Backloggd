import styled from 'styled-components/native';

import Colors from '../constants/Colors';

interface TextProps {
	color?: string;
	textAlign?: string;
	lineHeight?: number;
}

export const TextInput = styled.TextInput`
	margin: 12px;
	border-width: 1px;
	padding: 10px;
	border-radius: 4px;
	border-color: ${Colors.lightGrey};
	font-size: 18px;
	font-weight: 400;
	font-family: 'Roboto-Regular';
`;

const TextBase = styled.Text<TextProps>`
	color: ${(props: TextProps) => props.color || Colors.text};
	text-align: ${(props: TextProps) => props.textAlign || 'left'};
	line-height: ${(props: TextProps) =>
		props.lineHeight ? `${props.lineHeight}px` : 0};
`;

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

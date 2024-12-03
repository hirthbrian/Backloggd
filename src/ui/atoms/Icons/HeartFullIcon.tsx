import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const HeartFullIcon = ({ width = 24, height = 24, color }: SvgProps) => (
	<Svg fill={color} width={width} height={height} viewBox="0 -960 960 960">
		<Path d="m480-146.93-44.15-39.69q-99.46-90.23-164.5-155.07-65.04-64.85-103.08-115.43-38.04-50.57-53.15-92.27Q100-591.08 100-634q0-85.15 57.42-142.58Q214.85-834 300-834q52.38 0 99 24.5t81 70.27q34.38-45.77 81-70.27 46.62-24.5 99-24.5 85.15 0 142.58 57.42Q860-719.15 860-634q0 42.92-15.12 84.61-15.11 41.7-53.15 92.27-38.04 50.58-102.89 115.43Q624-276.85 524.15-186.62L480-146.93Z" />
	</Svg>
);

export default HeartFullIcon;

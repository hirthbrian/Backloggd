import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function PlayIcon({ width = 32, height = 32, color }: SvgProps) {
	return (
		<Svg fill={color} width={width} height={height} viewBox="0 0 384 512">
			<Path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
		</Svg>
	);
}

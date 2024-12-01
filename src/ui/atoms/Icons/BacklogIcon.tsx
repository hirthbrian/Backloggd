import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function BacklogIcon({ width = 32, height = 32, color }: SvgProps) {
	return (
		<Svg fill={color} width={width} height={height} viewBox="0 0 576 512">
			<Path d="M0 80v48c0 17.7 14.3 32 32 32h64V80c0-26.5-21.5-48-48-48S0 53.5 0 80zm112-48c10 13.4 16 30 16 48v304c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zm352 448c61.9 0 112-50.1 112-112 0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7v5.3c0 53-43 96-96 96h272z" />
		</Svg>
	);
}

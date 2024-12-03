import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function HomeFullIcon({ width = 24, height = 24, color }: SvgProps) {
	return (
		<Svg fill={color} width={width} height={height} viewBox="0 -960 960 960">
			<Path d="M180-140v-450l300-225.77L780-590v450H556.15v-267.69h-152.3V-140H180Z" />
		</Svg>
	);
}
export default HomeFullIcon;

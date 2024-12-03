import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function HomeIcon({ width = 24, height = 24, color }: SvgProps) {
	return (
		<Svg fill={color} width={width} height={height} viewBox="0 -960 960 960">
			<Path d="M240-200h133.85v-237.69h212.3V-200H720v-360L480-740.77 240-560v360Zm-60 60v-450l300-225.77L780-590v450H526.15v-237.69h-92.3V-140H180Zm300-330.38Z" />
		</Svg>
	);
}
export default HomeIcon;

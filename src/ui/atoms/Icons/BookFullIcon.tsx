import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function BookFullIcon({ width = 24, height = 24, color }: SvgProps) {
	return (
		<Svg fill={color} width={width} height={height} viewBox="0 -960 960 960">
			<Path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm200-440 100-60 100 60v-280H440v280Z" />
		</Svg>
	);
}

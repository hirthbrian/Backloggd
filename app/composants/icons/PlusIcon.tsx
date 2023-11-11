// @flow
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function PlusIcon({ width = 32, height = 32, color }: SvgProps) {
	return (
		<Svg fill={color} width={width} height={height} viewBox="0 0 448 512">
			<Path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
		</Svg>
	);
}

export default PlusIcon;

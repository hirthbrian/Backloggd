import * as React from 'react';
import Svg, { Path,SvgProps } from 'react-native-svg';

const SortByIcon = ({ width = 24, height = 24, color }: SvgProps) => (
	<Svg fill={color} width={width} height={height} viewBox="0 -960 960 960">
		<Path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
	</Svg>
);
export default SortByIcon;

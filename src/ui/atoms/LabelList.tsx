import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../themes/colors';
import NormalSemiBold from './Texts/NormalSemiBold';
import NormalRegular from './Texts/NormalRegular';

type Props = {
	highlightColor?: string;
	labels: Array<string> | undefined;
};

const styles = StyleSheet.create({
	label: {
		color: colors.text_highlight,
	},
});

const LabelList = ({ highlightColor, labels }: Props) => {
	return labels?.map((label, i) => (
		<NormalRegular key={label + i}>
			<NormalSemiBold color={highlightColor} style={styles.label}>
				{label}
			</NormalSemiBold>
			{i < labels.length - 1 && <Text>{', '}</Text>}
		</NormalRegular>
	));
};

export default LabelList;

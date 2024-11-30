import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../themes/colors';

type Props = {
	labels: Array<string> | undefined;
};

const styles = StyleSheet.create({
	label: {
		color: colors.text_highlight,
	},
});

const LabelList = ({ labels }: Props) => {
	return labels?.map((label, i) => (
		<Text key={label + i}>
			<Text style={styles.label}>{label}</Text>
			{i < labels.length - 1 && <Text>{', '}</Text>}
		</Text>
	));
};

export default LabelList;

import React from 'react';
import {
	StyleSheet,
	View,
	} from 'react-native';

import colors from "../../config/colors";

export default function Scanner(props) {
	return (
		<View
			style={styles.scanner}
		/>
	);
};

const styles = StyleSheet.create({
	scanner: {
		backgroundColor: colors.primary,
		width: "90%",
		aspectRatio: 1,
	},
});
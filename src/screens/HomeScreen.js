import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';

import colors from "../config/colors";
import Grid from "../components/Grid";

export default function HomeScreen() {
	return (
		<View style={styles.background}>
			<Grid />
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: colors.black,
		flex: 1,
	},
});
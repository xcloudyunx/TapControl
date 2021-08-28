import React, {useState} from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import {useDeviceOrientation} from "@react-native-community/hooks";

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
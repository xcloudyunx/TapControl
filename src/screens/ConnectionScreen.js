import React, {
	useState
	} from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View} from 'react-native';

import colors from "../config/colors";

export default function ConnectionScreen(props) {
	return (
		<View style={styles.container}>
			<Text
				style={styles.text}
			>
				SCAN QR CODE TO CONNECT
			</Text>
			<Text
				style={styles.text}>
				OR ENTER MANUALLY
			</Text>
			<TextInput
				style={styles.input}
				value={props.IP}
				onChangeText={props.onChangeIP}
				placeholder="ENTER IP ADDRESS HERE"
				placeholderTextColor={colors.white}
				keyboardType="numeric"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		flex: 1,
	},
	input: {
		color: colors.white,
		borderWidth: 1,
		borderColor: colors.white,
		textAlign: "center",
		fontSize: 20,
	},
	text: {
		color: colors.white,
		fontSize: 40,
		textAlign: "center",
	}
});
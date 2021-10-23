import React from 'react';
import {
	StyleSheet,
	TextInput,
	} from 'react-native';

import colors from "../config/colors";

export default function Input(props) {
	return (
		<TextInput
			style={styles.input}
			value={props.IP}
			onChangeText={props.onChangeIP}
			placeholder="OR ENTER IP ADDRESS MANUALLY"
			placeholderTextColor={colors.white}
			keyboardType="numeric"
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		color: colors.white,
		borderWidth: 1,
		borderColor: colors.white,
		textAlign: "center",
	},
});
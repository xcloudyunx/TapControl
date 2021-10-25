import React from 'react';
import {
	StyleSheet,
	Text,
	} from 'react-native';

import colors from "../config/colors";

export default function Header(props) {
	return (
		<Text
			style={styles.text}
			adjustsFontSizeToFit
			numberOfLines={1}
		>
			{props.value}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		color: colors.white,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 100,
	}
});
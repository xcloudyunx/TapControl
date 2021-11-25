import React from 'react';
import {
	StyleSheet,
	Text,
	View
	} from 'react-native';

import colors from "../../config/colors";

export default function Header(props) {
	return (
		<View
			style={[
					styles.container,
					props.style
				]}
		>
			<Text
				style={styles.text}
				adjustsFontSizeToFit
				numberOfLines={1}
			>
				{props.value}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-around",
	},
	text: {
		color: colors.white,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 100,
	}
});
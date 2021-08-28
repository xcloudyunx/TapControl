import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';

import colors from "../config/colors";
import IconButton from "./IconButton";

export default function Grid(props) {
	return (
		<View style={styles.container}>
			{props.row.map((col, j) => {
				return (
					<IconButton key={j} source={col} />
				)
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: colors.secondary,
	},
});
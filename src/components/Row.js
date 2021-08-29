import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import {useDeviceOrientation} from "@react-native-community/hooks";

import colors from "../config/colors";
import IconButton from "./IconButton";

export default function Grid(props) {
	const {portrait} = useDeviceOrientation();
	
	return (
		<View style={[
			styles.container,
			{flexDirection: portrait ? "row" : "column-reverse",},
		]}>
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
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: colors.secondary,
	},
});
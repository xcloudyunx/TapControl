import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import {useDeviceOrientation} from "@react-native-community/hooks";

import colors from "../config/colors";
import IconButton from "./IconButton";

export default function Row(props) {
	const {portrait} = useDeviceOrientation();
	
	return (
		<View style={[
			styles.container,
			{flexDirection: portrait ? "row" : "column-reverse",},
		]}>
			{[...Array(props.numOfCols)].map((x, j) => {
				return (
					<IconButton
						key={j}
						id={props.id*props.numOfCols+j}
						className={props.className}
						buttonDim={props.buttonDim}
						onPress={props.onPress}
					/>
				)
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-evenly",
		alignItems: "center",
		// backgroundColor: colors.secondary,
	},
});
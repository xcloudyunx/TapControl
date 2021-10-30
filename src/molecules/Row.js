import React, {
	useEffect,
	useState,
	} from 'react';
import {
	StyleSheet,
	View,
	} from 'react-native';

import colors from "../../config/colors";

import IconButton from "../atoms/IconButton";

export default function Row(props) {
	return (
		<View style={[
			styles.container,
			{
				flexDirection:
					props.orientation == "LANDSCAPE-LEFT" ? "column-reverse" : 
					props.orientation == "LANDSCAPE-RIGHT" ? "column" : "row"
			},
		]}>
			{[...Array(props.numOfCols)].map((x, j) => {
				return (
					<IconButton
						key={j}
						page={props.page}
						row={props.row}
						col={j.toString()}
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
	},
});
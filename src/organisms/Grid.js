import React, {
	useEffect,
	useState,
	} from 'react';
import {
	StyleSheet,
	View,
	} from 'react-native';

import Row from "../molecules/Row";

export default function Grid(props) {
	return (
		<View style={[
			styles.container,
			{
				flexDirection:
					props.orientation == "LANDSCAPE-LEFT" ? "row" : 
					props.orientation == "LANDSCAPE-RIGHT" ? "row-reverse" : "column",
			}
		]}>
			{[...Array(props.numOfRows)].map((x, i) => {
				return(
					<Row
						key={i}
						page={props.page}
						row={i.toString()}
						numOfCols={props.numOfCols}
						buttonDim={props.buttonDim}
						onPress={props.onPress}
						eventEmitter={props.eventEmitter}
					/>
				)
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
	},
});
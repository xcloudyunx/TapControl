import React from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
} from 'react-native';
import {useDeviceOrientation} from "@react-native-community/hooks";

import Row from "./Row";

export default function Grid(props) {
	const {portrait} = useDeviceOrientation();
	
	const window = Dimensions.get("window");
	const buttonDim = Math.min(
		Math.max(window.width, window.height)/(props.numOfRows+1),
		Math.min(window.width, window.height)/(props.numOfCols+1)
	);
	
	return (
		<View style={[
			styles.container,
			{flexDirection: portrait ? "column" : "row",}
		]}>
			{[...Array(props.numOfRows)].map((x, i) => {
				return(
					<Row
						key={i}
						id={i}
						className={props.className}
						numOfCols={props.numOfCols}
						buttonDim={buttonDim}
						onPress={(id) => {props.onPress(props.className, id)}}
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
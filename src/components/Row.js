import React, {
	useEffect,
	useState,
} from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';

import Orientation, {useOrientationChange} from "react-native-orientation-locker";

import colors from "../config/colors";
import IconButton from "./IconButton";

export default function Row(props) {
	const [orientation, setOrientation] = useState();
	
	useEffect(() => {
		setOrientation(Orientation.getInitialOrientation());
	}, []);
	
	useOrientationChange((orientation) => {
		setOrientation(orientation);
	});
	
	return (
		<View style={[
			styles.container,
			// flexDirection: portrait ? "row" : "column-reverse",
			{
				flexDirection:
					orientation == "LANDSCAPE-LEFT" ? "column-reverse" : 
					orientation == "LANDSCAPE-RIGHT" ? "column" : "row"
			},
		]}>
			{[...Array(props.numOfCols)].map((x, j) => {
				return (
					<IconButton
						key={j}
						id={props.id+j}
						className={props.className}
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
		justifyContent: "space-evenly",
		alignItems: "center",
	},
});
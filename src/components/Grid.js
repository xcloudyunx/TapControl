import React, {
	useEffect,
	useState,
} from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
} from 'react-native';

import Orientation, {useOrientationChange} from "react-native-orientation-locker";

import Row from "./Row";

export default function Grid(props) {
	// const {portrait} = useDeviceOrientation();
	const [orientation, setOrientation] = useState();
	
	const window = Dimensions.get("window");
	const buttonDim = Math.min(
		Math.max(window.width, window.height)/(props.numOfRows+1),
		Math.min(window.width, window.height)/(props.numOfCols+1)
	);
	
	useEffect(() => {
		Orientation.unlockAllOrientations();
		
		setOrientation(Orientation.getInitialOrientation());
	}, []);
	
	useOrientationChange((orientation) => {
		setOrientation(orientation);
	});
	
	return (
		<View style={[
			styles.container,
			{
				flexDirection:
					orientation == "LANDSCAPE-LEFT" ? "row" : 
					orientation == "LANDSCAPE-RIGHT" ? "row-reverse" : "column",
			}
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
						updatedIconButton={props.updatedIconButton}
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
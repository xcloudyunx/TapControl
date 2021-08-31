import React, {useState} from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
} from 'react-native';
import {useDeviceOrientation} from "@react-native-community/hooks";

import Row from "./Row";

export default function Grid(props) {
	const [numOfRows, setNumOfRows] = useState(4);
	const [numOfCols, setNumOfCols] = useState(2);
	const [iconButtons, setIconButtons] = useState(() => {
		const iB = [];
		for (let i=0; i<numOfRows; i++) {
			iB[i] = [];
			for (let j=0; j<numOfCols; j++) {
				iB[i][j] = require("../assets/favicon.png");
			}
		};
		return iB;
	});
	
	const {portrait} = useDeviceOrientation();
	
	const window = Dimensions.get("window");
	const buttonDim = Math.min(
		Math.max(window.width, window.height)/(numOfRows+1),
		Math.min(window.width, window.height)/(numOfCols+1)
	);
	
	return (
		<View style={[
			styles.container,
			{flexDirection: portrait ? "column" : "row",}
		]}>
			{iconButtons.map((row, i) => {
				return(
					<Row key={i} id={i} numOfCols={numOfCols} row={row} size={buttonDim}/>
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
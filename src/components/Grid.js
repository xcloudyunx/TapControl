import React, {useState} from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import {useDeviceOrientation} from "@react-native-community/hooks";

import colors from "../config/colors";
import Row from "./Row";

export default function Grid(props) {
	const [numOfRows, setNumOfRows] = useState(2);
	const [numOfCols, setNumOfCols] = useState(2);
	const [iconButtons, setIconButtons] = useState([[require("../assets/favicon.png"),require("../assets/favicon.png")],[require("../assets/favicon.png"),require("../assets/favicon.png")],[require("../assets/favicon.png"),require("../assets/favicon.png")]]);
	
	const {portrait} = useDeviceOrientation();
	alert(portrait);
	
	return (
		<View style={[
			styles.container,
			{flexDirection: portrait ? "column" : "row",}
		]}>
			{iconButtons.map((row, i) => {
				return(
					<Row key={i} row={row}/>
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
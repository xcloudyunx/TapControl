import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	ImageBackground,
	Dimensions,
} from 'react-native';

import colors from "../config/colors";
import constants from "../config/constants";

export default function IconButton(props) {
	const window = Dimensions.get("window");
	const buttonDim = Math.min(Math.max(window.width, window.height)/4, Math.min(window.width, window.height)/3);
	
	const handlePress = () => {
		alert("pressed");
	}
	
	return (
		<View style={{
			width: buttonDim,
			height: buttonDim,
		}}>
			<TouchableHighlight style={styles.touch} onPress={handlePress}>
				<View style={styles.button}>
					<ImageBackground
						source={props.source}
						style={styles.image}
						reziseMode="contain"
					/>
				</View>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		backgroundColor: colors.primary,
		borderRadius: constants.iconButtonRadius,
		padding: 5,
	},
	container: {
		flex: 1,
		height: "100%",
	},
	image: {
		flex: 1,
	},
	touch: {
		flex: 1,
		borderRadius: constants.iconButtonRadius,
	},
});
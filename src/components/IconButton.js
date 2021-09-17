import React from 'react';
import {
	StyleSheet,
	View,
	TouchableHighlight,
	Image,
} from 'react-native';

import colors from "../config/colors";
import constants from "../config/constants";

export default function IconButton(props) {
	return (
		<View style={{
			width: props.buttonDim,
			height: props.buttonDim,
		}}>
			<TouchableHighlight
				style={[styles.touch, {borderRadius: props.buttonDim/8}]}
				onPress={() => {props.onPress(props.id)}}
			>
				<View style={[styles.button, {borderRadius: props.buttonDim/8}]}>
					<Image
						source={require("../assets/favicon.png")}
						style={styles.image}
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
		padding: "5%",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	touch: {
		flex: 1,
	},
});
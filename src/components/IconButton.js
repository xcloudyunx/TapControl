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
	const handlePress = () => {
		console.log("pressed ", props.id);
	}
	
	return (
		<View style={{
			width: props.size,
			height: props.size,
		}}>
			<TouchableHighlight style={styles.touch} onPress={handlePress}>
				<View style={styles.button}>
					<Image
						source={props.source}
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
		borderRadius: constants.iconButtonRadius,
		padding: "5%",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	touch: {
		flex: 1,
		borderRadius: constants.iconButtonRadius,
	},
});
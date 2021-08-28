import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	ImageBackground,
} from 'react-native';

import colors from "../config/colors";
import constants from "../config/constants";

export default function IconButton(props) {
	return (
		<View style={styles.container}>
			<TouchableHighlight style={styles.touch} onPress={() => alert("test")}>
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
import React, {
	useEffect,
	useState,
	} from 'react';
import {
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View
	} from 'react-native';
	
import Orientation from "react-native-orientation-locker";
import KeepAwake from "react-native-keep-awake";

import colors from "../../config/colors";

import Header from "../atoms/Header";
import Scanner from "../atoms/Scanner";

export default function ConnectionScreen(props) {
	useEffect(() => {
		Orientation.lockToPortrait();
		KeepAwake.deactivate();
	}, []);
	
	// return (
		// <TouchableWithoutFeedback
			// onPress={Keyboard.dismiss}
		// >
			// <View
			// style={styles.container}
			// >
				// <Header
					// value="SCAN QR CODE TO CONNECT"
				// />
				// <Scanner 
					// onScan={props.onChangeIP}
				// />
				// <TextInput
					// style={styles.input}
					// value={props.IP}
					// onChangeText={props.onChangeIP}
					// onSubmitEditing={props.onSubmitIP}
					// placeholder="OR ENTER IP ADDRESS MANUALLY"
					// placeholderTextColor={colors.white}
					// keyboardType="numeric"
				// />
			// </View>
		// </TouchableWithoutFeedback>
	// );
	return (
		<View
		style={styles.container}
		>
			<Header
				value="SCAN QR CODE TO CONNECT"
				style={styles.header}
			/>
			<Scanner 
				onScan={props.onChangeIP}
				style={styles.scanner}
			/>
			<View
				style={styles.spacer}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	header: {
		flex: 3,
		justifyContent: "flex-end",
	},
	scanner: {
		flex: 14,
	},
	spacer: {
		flex: 2,
	}
	// input: {
		// color: colors.white,
		// borderWidth: 1,
		// borderColor: colors.white,
		// textAlign: "center",
		// width: "90%",
	// },
});
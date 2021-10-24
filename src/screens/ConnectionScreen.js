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
	View} from 'react-native';
	
import Orientation from "react-native-orientation";

import colors from "../config/colors";

import Header from "../components/Header";
import Scanner from "../components/Scanner";

export default function ConnectionScreen(props) {
	useEffect(() => {
		Orientation.lockToPortrait();
	}, []);
	
	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
		>
			<View
			style={styles.container}
			>
				<Header
					value="SCAN QR CODE TO CONNECT"
				/>
				<Scanner />
				<TextInput
					style={styles.input}
					value={props.IP}
					onChangeText={props.onChangeIP}
					onSubmitEditing={props.onSubmitIP}
					placeholder="OR ENTER IP ADDRESS MANUALLY"
					placeholderTextColor={colors.white}
					keyboardType="numeric"
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	input: {
		color: colors.white,
		borderWidth: 1,
		borderColor: colors.white,
		textAlign: "center",
		width: "90%",
	},
});
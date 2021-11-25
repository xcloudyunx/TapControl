import React from "react";
import {
	StyleSheet,
	View
	} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import {RNCamera} from "react-native-camera";

export default function Scanner(props) {
	return (
		<QRCodeScanner
			onRead={(e) => props.onScan(e.data)}
			containerStyle={[
				styles.container,
				props.style
			]}
			cameraStyle={styles.scanner}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	scanner: {
		overflow: "hidden",
		aspectRatio: 1,
		width: "90%",
	},
});
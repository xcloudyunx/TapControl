import React, {useEffect} from 'react';
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TcpSocket from "react-native-tcp-socket";

import constants from "./src/config/constants";

import HomeScreen from "./src/screens/HomeScreen";
import ConnectionScreen from "./src/screens/ConnectionScreen";

export default function App() {
	const storeData = async (key, value) => {
		try {
			const jsonValue = JSON.stringify(value)
			await AsyncStorage.setItem(key, jsonValue)
		} catch (e) {
			alert("storing data error");
		}
	};
	const getData = async (key, defaultValue) => {
		try {
			const jsonValue = await AsyncStorage.getItem(key)
			return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
		} catch(e) {
			alert("reading data error");
		}
	};
	
	useEffect(() => {
		const IP = "192.168.1.10";
		const client = TcpSocket.createConnection(
			{port: constants.PORT, host: IP},
			() => {
				console.log("connected")
			}
		);
	});
	
	
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
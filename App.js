import React, {
	useState
	} from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
	} from 'react-native';

import HomeScreen from "./src/screens/HomeScreen";
import ConnectionScreen from "./src/screens/ConnectionScreen";

export default function App() {
	const [IP, onChangeIP] = useState();
	
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
			<ConnectionScreen 
				IP={IP}
				onChangeIP={onChangeIP}
			/>
			{/*<HomeScreen
				IP={IP}
			/>*/}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
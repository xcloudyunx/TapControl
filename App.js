import React, {
	useState
	} from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	} from 'react-native';

import HomeScreen from "./src/screens/HomeScreen";
import ConnectionScreen from "./src/screens/ConnectionScreen";

export default function App() {
	const [IP, onChangeIP] = useState();
	
	const handleSubmitIP = () => {
		console.log("submitted "+IP);
		// change scene here
	}
	
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
			<ConnectionScreen 
				IP={IP}
				onChangeIP={onChangeIP}
				onSubmitIP={handleSubmitIP}
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
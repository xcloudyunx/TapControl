import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	} from 'react-native';

import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
			<HomeScreen />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
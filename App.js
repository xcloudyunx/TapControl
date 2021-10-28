import React, {
	useState,
	} from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	} from 'react-native';

import HomeScreen from "./src/pages/HomeScreen";
import ConnectionScreen from "./src/pages/ConnectionScreen";

export default function App() {
	const [IP, onChangeIP] = useState();
	const [IPValid, setIPValid] = useState(true);
	
	const handleSubmitIP = () => {
		setIPValid(true);
	}
	
	const handleDisconnect = () => {
		setIPValid(false);
	}
	
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
			{IPValid ? 
				<HomeScreen
					IP={IP}
					onDisconnect={handleDisconnect}
				/> :
				<ConnectionScreen 
					IP={IP}
					onChangeIP={onChangeIP}
					onSubmitIP={handleSubmitIP}
				/>
			}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
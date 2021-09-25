import React, {
	useEffect,
	useState
	} from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
	} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TcpSocket from "react-native-tcp-socket";

import constants from "./src/config/constants";

import HomeScreen from "./src/screens/HomeScreen";
import ConnectionScreen from "./src/screens/ConnectionScreen";

export default function App() {
	const [hash, setHash] = useState();
	const [numOfRows, setNumOfRows] = useState();
	const [numOfCols, setNumOfCols] = useState();
	const [numOfPages, setNumOfPages] = useState();
	const [readyToRender, setReadyToRender] = useState(0);
	
	useEffect(() => {
		// const IP = "192.168.1.10";
		// const client = TcpSocket.createConnection(
			// {
				// port: constants.PORT,
				// host: IP
			// },
			// () => {
				// client.setEncoding("utf8");
				// console.log("connected");
			// }
		// );
		// client.on("data", (data) => {
			// console.log(data);
			// obj = JSON.parse(data);
			// if (obj.hash) {
				// if (obj.hash == hash) {
					// client.write("True");
				// } else {
					// client.write("False");
				// }
			// } else if (obj.numOfRows) {
				// setNumOfRows(obj.numOfRows);
				// setNumOfCols(obj.numOfCols);
				// setNumOfPages(obj.numOfPages);
			// }
		// });
		// client.on("error", (error) => {
			// alert("an error occured with the socket");
		// });
		// client.on("close", () => {
			// alert("socket closed");
		// });
		
		fetchData("hash").then((h) => {
			setHash(h);
			fetchData("numOfRows", 4).then((r) => {
				setNumOfRows(r);
				fetchData("numOfCols", 2).then((c) => {
					setNumOfCols(c);
					fetchData("numOfPages", 1).then((p) => {
						setNumOfPages(p);
						setReadyToRender(1);
					});
				});
			});
		});
	}, []);
	
	useEffect(() => {
		storeData("numOfRows", numOfRows);
	}, [numOfRows]);
	useEffect(() => {
		storeData("numOfCols", numOfCols);
	}, [numOfCols]);
	useEffect(() => {
		storeData("numOfPages", numOfPages);
	}, [numOfPages]);
	
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
			{readyToRender ? <HomeScreen
				numOfRows={numOfRows}
				numOfCols={numOfCols}
				numOfPages={numOfPages}
			/> : <View />}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const storeData = async (key, value) => {
	if (value) {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
		} catch (e) {
			alert("storing data error "+key);
		}
	}
};
const fetchData = async (key, defaultValue=null) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
	} catch(e) {
		alert("reading data error "+key);
	}
};
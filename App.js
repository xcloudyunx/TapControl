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
import {Buffer} from "buffer";

import constants from "./src/config/constants";

import HomeScreen from "./src/screens/HomeScreen";
import ConnectionScreen from "./src/screens/ConnectionScreen";

export default function App() {
	const [numOfRows, setNumOfRows] = useState();
	const [numOfCols, setNumOfCols] = useState();
	const [numOfPages, setNumOfPages] = useState();
	const [readyToRender, setReadyToRender] = useState(0);
	const [clientGlobal, setClient] = useState();
	
	useEffect(() => {
		const handleData = (data) => {
			if (data.state) {
				syncGrid(data.state);
			} else if (data.imageName) {
				syncImage(data.imageName, data.imageData)
			}
		};
		
		const syncGrid = (state) => {
			setNumOfRows(state.numOfRows);
			setNumOfCols(state.numOfCols);
			setNumOfPages(state.numOfPages);
		};
		
		const syncImage = (imageName, imageData) => {
			if (imageData) {
				// create/update the image
			} else {
				// delete the image if it exists
			}
			// something to force re render of grid/iconbutton
		};
		
		let readBuffer = "";
		const IP = "192.168.1.12";
		const client = TcpSocket.createConnection(
			{
				port: constants.PORT,
				host: IP
			},
			() => {
				client.setEncoding("utf8");
				console.log("connected");
			}
		);
		client.on("data", (data) => {
			readBuffer += data;
			let splitIndex = readBuffer.indexOf("XXXXXX");
			if (splitIndex >= 0) {
				handleData(JSON.parse(readBuffer.substring(0, splitIndex)));
				readBuffer = readBuffer.substring(splitIndex+6);
			}
		});
		client.on("error", (error) => {
			alert("an error occured with the socket");
		});
		client.on("close", () => {
			alert("socket closed");
		});
		setClient(client);
	}, []);
	
	useEffect(() => {
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
	
	const handleIconButtonPress = (page, id) => {
		clientGlobal.write(page.toString()+"-"+id.toString());
		
	};
	
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
			{readyToRender ? <HomeScreen
				numOfRows={numOfRows}
				numOfCols={numOfCols}
				numOfPages={numOfPages}
				onIconButtonPress={handleIconButtonPress}
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
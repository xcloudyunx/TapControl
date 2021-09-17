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
	const [numOfRows, setNumOfRows] = useState();
	const [numOfCols, setNumOfCols] = useState();
	const [numOfPages, setNumOfPages] = useState();
	const [iconButtons, setIconButtons] = useState();
	const [testflag, setTestFlag] = useState(0);
	
	useEffect(() => {
		fetchData("numOfRows", 4).then((r) => {
			setNumOfRows(r);
			fetchData("numOfCols", 2).then((c) => {
				setNumOfCols(c);
				fetchData("numOfPages", 1).then((p) => {
					setNumOfPages(p);
					const defaultIB = () => {
						const iB = [[]];
						for (let k=1; k<=numOfPages; k++){
							iB[k] = [];
							for (let i=0; i<numOfRows; i++) {
								iB[k][i] = [];
								for (let j=0; j<numOfCols; j++) {
									iB[k][i][j] = "favicon";
								}
							}
						}
						return iB;
					};
					fetchData("iconButtons", defaultIB()).then((ib) => {
						setIconButtons(ib);
						setTestFlag(1);
					});
				});
			});
		})
	}, []);
	
	// useEffect(() => {
		// storeData("numOfRows", numOfRows);
	// }, [numOfRows]);
	// useEffect(() => {
		// storeData("numOfCols", numOfCols);
	// }, [numOfCols]);
	// useEffect(() => {
		// storeData("numOfPages", numOfPages);
	// }, [numOfPages]);
	// useEffect(() => {
		// storeData("iconButtons", iconButtons);
	// }, [iconButtons]);
	
	useEffect(() => {
		if (testflag) {
			const iB = [...iconButtons.slice(0, numOfPages+1)];
			for (let k=1; k<=numOfPages; k++){
				if (k >= iB.length) {
					iB[k] = [];
				} else {
					iB[k] = [...iconButtons[k].slice(0, numOfRows)];
				}
				for (let i=0; i<numOfRows; i++) {
					if (i >= iB[k].length) {
						iB[k][i] = [];
					} else {
						iB[k][i] = [...iconButtons[k][i].slice(0, numOfCols)];
					}
					for (let j=0; j<numOfCols; j++) {
						if (j >= iB[k][i].length) {
							iB[k][i][j] = require("./src/assets/favicon.png");
						}
					}
				}
			}
			setIconButtons(iB);
		}
	}, [testflag, numOfRows, numOfCols, numOfPages]);
	
	// useEffect(() => {
		// const IP = "192.168.1.10";
		// const client = TcpSocket.createConnection(
			// {
				// port: constants.PORT,
				// host: IP
			// },
			// () => {
				// console.log("connected")
			// }
		// );
	// }, []);
	
	
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
			{testflag ? <HomeScreen
				numOfRows={numOfRows}
				numOfCols={numOfCols}
				numOfPages={numOfPages}
				iconButtons={iconButtons}
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
	console.log("key "+key);
	console.log(value);
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		alert("storing data error "+key);
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
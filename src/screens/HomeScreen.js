import React, {
	useEffect,
	useState
	} from 'react';
import {
	StyleSheet,
	View
	} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import TcpSocket from "react-native-tcp-socket";
import RNFS from "react-native-fs";

import colors from "../config/colors";
import constants from "../config/constants";

import MainBar from "../components/MainBar";

export default function HomeScreen(props) {
	const [numOfRows, setNumOfRows] = useState();
	const [numOfCols, setNumOfCols] = useState();
	const [numOfPages, setNumOfPages] = useState();
	const [readyToRender, setReadyToRender] = useState(0);
	const [clientGlobal, setClient] = useState();
	const [updatedIconButton, setUpdatedIconButton] = useState("0-0");
	const [currentPage, setCurrentPage] = useState(1);
	
	useEffect(() => {
		const handleData = (data) => {
			if (data.state) {
				syncGrid(data.state);
			} else if (data.imageName) {
				syncImage(data.imageName, data.imageData);
			}
		};
		
		const syncGrid = (state) => {
			setNumOfRows(state.numOfRows);
			setNumOfCols(state.numOfCols);
			setNumOfPages(state.numOfPages);
		};
		
		const syncImage = (imageName, imageData) => {
			const path = RNFS.DocumentDirectoryPath+"/"+imageName+".png";
			if (imageData) {
				RNFS.writeFile(path, imageData, "base64").then((success) => {
					setUpdatedIconButton(imageName);
				}).catch((err) => {
					alert(err.message);
				});
			} else {
				RNFS.exists(path).then((exists) => {
					if (exists) {
						RNFS.unlink(path).then(() => {
							setUpdatedIconButton(imageName);
						}).catch((err) => {
							alert(err.message);
						});
					}
				});
			}
		};
		
		let readBuffer = "";
		const client = TcpSocket.createConnection(
			{
				port: constants.PORT,
				host: props.IP
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
			// exit to connection screen
			// onDisconnect?
		});
		client.on("close", () => {
			alert("socket closed");
			// exit to connection screen
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
	
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	
	return (
		<View style={styles.container}>
			{readyToRender ? <MainBar
				numOfRows={numOfRows}
				numOfCols={numOfCols}
				numOfPages={numOfPages}
				currentPage={currentPage}
				onIconButtonPress={handleIconButtonPress}
				onPageChange={handlePageChange}
				updatedIconButtonPage={updatedIconButton.split("-")[0]}
				updatedIconButtonIndex={updatedIconButton.split("-")[1]}
			/> : <View />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
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
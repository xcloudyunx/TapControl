import React, {
	useEffect,
	useState,
	} from 'react';
import {
	Dimensions,
	StyleSheet,
	View,
	} from 'react-native';

import EventEmitter from "eventemitter3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TcpSocket from "react-native-tcp-socket";
import RNFS from "react-native-fs";
import Orientation from "react-native-orientation-locker";

import colors from "../../config/colors";
import constants from "../../config/constants";

import MainBar from "../templates/MainBar";

export default function HomeScreen(props) {
	const [numOfRows, setNumOfRows] = useState();
	const [numOfCols, setNumOfCols] = useState();
	const [numOfPages, setNumOfPages] = useState();
	const [readyToRender, setReadyToRender] = useState(0);
	const [clientGlobal, setClient] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [eventEmitter, setEventEmitter] = useState(new EventEmitter());
	const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
	const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height);
	const [orientation, setOrientation] = useState(Orientation.getInitialOrientation());
	
	const buttonDim = Math.min(
		Math.max(screenWidth, screenHeight)/(numOfRows+1),
		Math.min(screenWidth, screenHeight)/(numOfCols+1)
	);
	
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
	
	const handleUpdateIconButton = (imageName) => {
		eventEmitter.emit(imageName);
	}
	
	const syncImage = (imageName, imageData) => {
		console.log("syncing image "+imageName);
		const path = RNFS.DocumentDirectoryPath+"/"+imageName+".png";
		if (imageData) {
			RNFS.writeFile(path, imageData, "base64").then((success) => {
				handleUpdateIconButton(imageName);
			}).catch((err) => {
				console.log("create/update image error");
				alert(err.message);
			});
		} else {
			RNFS.exists(path).then((exists) => {
				if (exists) {
					RNFS.unlink(path).then(() => {
						handleUpdateIconButton(imageName);
					}).catch((err) => {
						console.log("delete image error");
						alert(err.message);
					});
				}
			});
		}
	};
	
	useEffect(() => {
		let readBuffer = "";
		const client = TcpSocket.createConnection(
			{
				port: constants.PORT,
				host: props.IP
			},
			() => {
				client.setEncoding("utf8");
				console.log("connected");
				setClient(client);
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
			console.log("error");
			console.log(error);
			props.onDisconnect();
		});
		client.on("close", () => {
			console.log("close");
			props.onDisconnect();
		});
		
		Orientation.unlockAllOrientations();
		
		Dimensions.addEventListener("change", () => {
			setScreenWidth(Dimensions.get("window").width);
			setScreenHeight(Dimensions.get("window").height);
		});
		
		Orientation.addOrientationListener((orientation) => {
			setOrientation(orientation);
		});
		
		return () => {
			eventEmitter.removeAllListeners();
			Dimensions.removeEventListener("change");
			Orientation.removeAllListeners();
		}
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
	
	const handleIconButtonPress = (page, row, col) => {
		clientGlobal.write(page+"-"+row+"-"+col);
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
				eventEmitter={eventEmitter}
				screenWidth={screenWidth}
				screenHeight={screenHeight}
				buttonDim={buttonDim}
				orientation={orientation}
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
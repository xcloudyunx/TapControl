import React, {
	useEffect,
	useState,
	} from 'react';
import {
	Dimensions,
	StyleSheet,
	View,
	} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
// import TcpSocket from "react-native-tcp-socket";
import RNFS from "react-native-fs";
import Orientation from "react-native-orientation-locker";

import colors from "../../config/colors";
// import constants from "../../config/constants";

import Client from "../atoms/Client"
import EventEmitter from "../atoms/EventEmitter"
import MainBar from "../templates/MainBar";

export default function HomeScreen(props) {
	const [numOfRows, setNumOfRows] = useState();
	const [numOfCols, setNumOfCols] = useState();
	const [numOfPages, setNumOfPages] = useState();
	const [readyToRender, setReadyToRender] = useState(0);
	const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
	const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height);
	const [orientation, setOrientation] = useState(Orientation.getInitialOrientation());
	const [lastUpdateTime, setLastUpdateTime] = useState();
	
	const buttonDim = Math.min(
		Math.max(screenWidth, screenHeight)/(numOfRows+1),
		Math.min(screenWidth, screenHeight)/(numOfCols+1)
	);
	
	const handleData = (data) => {
		if (data.lastUpdateTime) {
			checkSync(data.lastUpdateTime);
		} else if (data.state) {
			syncGrid(data.state);
		} else if (data.imageName) {
			syncImage(data.imageName, data.imageData);
		}
	};
	
	const checkSync = (time) => {
		fetchData("lastUpdateTime", -1).then((t) => {
			setLastUpdateTime(t);
			if (time != t) {
				Client.getClient().write("0");
			} else {
				Client.getClient().write("1");
			}
			setReadyToRender(1);
		});			
	}
	
	const syncGrid = (state) => {
		setNumOfRows(state.numOfRows);
		setNumOfCols(state.numOfCols);
		setNumOfPages(state.numOfPages);
		setLastUpdateTime(state.lastUpdate);
	};
	
	const handleUpdateIconButton = (imageName) => {
		EventEmitter.getEventEmitter().emit(imageName);
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
		fetchData("numOfRows", 4).then((r) => {
			setNumOfRows(r);
			fetchData("numOfCols", 2).then((c) => {
				setNumOfCols(c);
				fetchData("numOfPages", 1).then((p) => {
					setNumOfPages(p);
					Client.setup(props.IP, handleData, props.onDisconnect);
				});
			});
		});
		
		Orientation.unlockAllOrientations();
		
		const dimListener = Dimensions.addEventListener("change", () => {
			setScreenWidth(Dimensions.get("window").width);
			setScreenHeight(Dimensions.get("window").height);
		});
		
		Orientation.addOrientationListener((orientation) => {
			setOrientation(orientation);
		});
		
		return () => {
			EventEmitter.getEventEmitter().removeAllListeners();
			dimListener.remove()
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
	useEffect(() => {
		storeData("lastUpdateTime", lastUpdateTime);
	}, [lastUpdateTime]);
	
	const handleIconButtonPress = (page, row, col) => {
		Client.getClient().write(page+"-"+row+"-"+col);
	};
	
	return (
		<View style={styles.container}>
			{readyToRender ? <MainBar
				numOfRows={numOfRows}
				numOfCols={numOfCols}
				numOfPages={numOfPages}
				onIconButtonPress={handleIconButtonPress}
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
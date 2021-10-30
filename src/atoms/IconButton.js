import React, {
	useState,
	useEffect,
	} from 'react';
import {
	StyleSheet,
	View,
	TouchableHighlight,
	Image,
	} from 'react-native';

import RNFS from "react-native-fs";

import colors from "../../config/colors";
import constants from "../../config/constants";

export default function IconButton(props) {
	const [source, setSource] = useState(null);
	
	const updateIconButton = () => {
		const path = "file://"+RNFS.DocumentDirectoryPath+"/"+props.page+"-"+props.row+"-"+props.col+".png";
		RNFS.exists(path).then((exists) => {
			if (exists) {
				setSource({uri:path+"#"+Date.now().toString()});
			} else {
				setSource(null);
			}
			// props.eventEmitter.emit("updateImage");
		});
	};
	
	useEffect(() => {
		updateIconButton();
		
		props.eventEmitter.addListener(props.page+"-"+props.row+"-"+props.col, () => {
			updateIconButton();
		});
	}, []);
	
	return (
		<View style={{
			width: props.buttonDim,
			height: props.buttonDim,
		}}>
			<TouchableHighlight
				style={[styles.touch, {borderRadius: props.buttonDim/8}]}
				onPress={() => {props.onPress(props.page, props.row, props.col)}}
			>
				<View style={[styles.button, {borderRadius: props.buttonDim/8}]}>
					<Image
						source={source}
						style={styles.image}
					/>
				</View>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		backgroundColor: colors.primary,
		padding: "5%",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	touch: {
		flex: 1,
	},
});
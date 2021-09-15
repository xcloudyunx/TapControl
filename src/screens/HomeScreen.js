import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import colors from "../config/colors";

import MainBar from "../components/MainBar";

export default function HomeScreen() {
	const [numOfRows, setNumOfRows] = useState(4);
	const [numOfCols, setNumOfCols] = useState(2);
	const [numOfPages, setNumOfPages] = useState(3);
	const [iconButtons, setIconButtons] = useState(() => {
		const iB = [[]];
		for (let k=1; k<=numOfPages; k++){
			iB[k] = [];
			for (let i=0; i<numOfRows; i++) {
				iB[k][i] = [];
				for (let j=0; j<numOfCols; j++) {
					iB[k][i][j] = require("../assets/favicon.png");
				}
			}
		}
		return iB;
	});
	const [currentPage, setCurrentPage] = useState(2);
	
	const handleIconButtonPress = (page, id) => {
		alert(page.toString()+" "+id.toString());
	};
	
	const handlePageChange = (page) => {
		setCurrentPage(page);
	}
	
	return (
		<View style={styles.container}>
			<MainBar
				numOfRows={numOfRows}
				numOfCols={numOfCols}
				numOfPages={numOfPages}
				iconButtons={iconButtons}
				currentPage={currentPage}
				onIconButtonPress={handleIconButtonPress}
				onPageChange={handlePageChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
	},
});
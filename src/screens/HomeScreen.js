import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import colors from "../config/colors";

import MainBar from "../components/MainBar";

export default function HomeScreen(props) {
	const [currentPage, setCurrentPage] = useState(1);
	
	const handleIconButtonPress = (page, id) => {
		alert(page.toString()+" "+id.toString());
	};
	
	const handlePageChange = (page) => {
		setCurrentPage(page);
	}
	
	return (
		<View style={styles.container}>
			<MainBar
				numOfRows={props.numOfRows}
				numOfCols={props.numOfCols}
				numOfPages={props.numOfPages}
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
		flex: 1,
	},
});
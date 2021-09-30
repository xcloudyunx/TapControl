import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import colors from "../config/colors";

import MainBar from "../components/MainBar";

export default function HomeScreen(props) {
	const [currentPage, setCurrentPage] = useState(1);
	
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	
	return (
		<View style={styles.container}>
			<MainBar
				numOfRows={props.numOfRows}
				numOfCols={props.numOfCols}
				numOfPages={props.numOfPages}
				currentPage={currentPage}
				onIconButtonPress={props.onIconButtonPress}
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
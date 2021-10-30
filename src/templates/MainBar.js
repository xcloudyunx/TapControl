import React from 'react';
import {
	FlatList,
	} from 'react-native';

import colors from "../../config/colors";

import Grid from "../organisms/Grid";

export default function MainBar(props) {
	const data = []
	for (let i=1; i<=props.numOfPages; i++) {
		data.push({pageNumber:i.toString()});
	}
	
	const renderItem = ({item}) => {
		return (
			<Grid
				page={item.pageNumber}
				numOfRows={props.numOfRows}
				numOfCols={props.numOfCols}
				onPress={props.onIconButtonPress}
				buttonDim={props.buttonDim}
				orientation={props.orientation}
				screenWidth={props.screenWidth}
				screenHeight={props.screenHeight}
			/>
		)
	}
	
	return (
		<FlatList
			renderItem={renderItem}
			data={data}
			pagingEnabled={true}
			initialNumToRender={1}
			maxToRenderPerBatch={1}
			windowSize={3}
			extraData={updateFlag}
			horizontal
		/>
	);
};
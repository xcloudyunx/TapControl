import React from 'react';
import {
	Animated,
	Dimensions,
	PanResponder,
	StyleSheet,
	View,
} from 'react-native';

import colors from "../config/colors";
import Grid from "../components/Grid";

export default function MainBar(props) {
	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;
	
	const pan = new Animated.Value(0);
	let time = 0;

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => false,
		onMoveShouldSetPanResponder: (evt, {dx}) => {
			time = 0;
			return Math.abs(dx) > 5;
		},
		onPanResponderMove: (evt, {dx}) => {
			time += evt.nativeEvent.timestamp*Math.pow(10, -9);
			pan.setValue(dx);
		},
		onPanResponderRelease: (evt, {dx, vx}) => {
			const averagevx = dx/time;
			if (props.currentPage != 1 && (dx > screenWidth/3 || averagevx > 50)) {
				Animated.spring(
					pan,
					{
						toValue: screenWidth,
						useNativeDriver: false
					}
				).start(() => {
					pan.setValue(0);
					props.onPageChange(props.currentPage-1);
				})
			} else if (props.currentPage != props.numOfPages && (dx < -screenWidth/3 || averagevx < -50)) {
				Animated.spring(
					pan,
					{
						toValue: -screenWidth,
						useNativeDriver: false
					}
				).start(() => {
					pan.setValue(0);
					props.onPageChange(props.currentPage+1);
				})
			} else {
				Animated.spring(
					pan,
					{
						toValue: 0,
						useNativeDriver: false
					}
				).start()
			}
		}
	});
	
	const renderPreviousGrid = () => {
		if (props.currentPage > 1) {
			return (
				<Grid
					className={props.currentPage-1}
					numOfRows={props.numOfRows}
					numOfCols={props.numOfCols}
					onPress={props.onIconButtonPress}
				/>
			);
		} else {
			return (
				<View
					style={styles.spacer}
				/>
			)
		}
	};
	const renderNextGrid = () => {
		if (props.currentPage < props.numOfPages) {
			return (
				<Grid
					className={props.currentPage+1}
					numOfRows={props.numOfRows}
					numOfCols={props.numOfCols}
					onPress={props.onIconButtonPress}
				/>
			);
		} else {
			return (
				<View
					style={styles.spacer}
				/>
			)
		}
	}
	
	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={[
				styles.container,
				{
					width: 3*screenWidth,
					height: screenHeight,
					right: screenWidth,
					transform: [{translateX: pan}]
				}
			]}
		>
			{renderPreviousGrid()}
			<Grid
				className={props.currentPage}
				numOfRows={props.numOfRows}
				numOfCols={props.numOfCols}
				onPress={props.onIconButtonPress}
			/>
			{renderNextGrid()}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.transparent,
		flexDirection: "row",
	},
	spacer: {
		flex: 1,
	}
});
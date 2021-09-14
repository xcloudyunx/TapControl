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
	const pan = new Animated.Value(0);

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => false,
		onMoveShouldSetPanResponder: (evt, {dx}) => {
			return Math.abs(dx) > 5;
		},
		onPanResponderMove: Animated.event(
			[
				null,
				{dx: pan}
			],
			{useNativeDriver: false}
		),
		onPanResponderRelease: (evt, {dx, vx}) => {
			const screenWidth = Dimensions.get("window").width;
			if (props.currentPage != 1 && (dx > screenWidth/3 || vx > 0.5)) {
				alert("decrement page");
			} else if (props.currentPage != props.numOfPages && (dx < -screenWidth/3 || vx <= -0.5)) {
				alert("increment page");
			} else {
				alert("stay the same");
			}
			Animated.spring(
				pan,
				{toValue: 0}
			).start()
		}
	});
	
	return (
		<View style={styles.background}>
			{() => {
				if (props.currentPage > 1) {
					return (
						<Grid
							className={props.currentPage-1}
							numOfRows={props.numOfRows}
							numOfCols={props.numOfCols}
							page={props.iconButtons[props.currentPage-1]}
							onPress={props.onIconButtonPress}
						/>
					);
				}
			}}
			<Animated.View
				{...panResponder.panHandlers}
				style={[styles.pan, {transform: [{translateX: pan}]}]}
			>
				<Grid
					className={props.currentPage}
					numOfRows={props.numOfRows}
					numOfCols={props.numOfCols}
					page={props.iconButtons[props.currentPage]}
					onPress={props.onIconButtonPress}
				/>
			</Animated.View>
			{() => {
				if (props.currentPage < props.numOfPages) {
					return (
						<Grid
							className={props.currentPage+1}
							numOfRows={props.numOfRows}
							numOfCols={props.numOfCols}
							page={props.iconButtons[props.currentPage+1]}
							onPress={props.onIconButtonPress}
						/>
					);
				}
			}}
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: colors.black,
		flex: 1,
	},
	pan: {
		backgroundColor: "transparent",
		flex: 1,
	}
});
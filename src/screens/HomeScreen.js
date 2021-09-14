import React, {useState} from 'react';

import MainBar from "../components/MainBar";

export default function HomeScreen() {
	const [numOfRows, setNumOfRows] = useState(4);
	const [numOfCols, setNumOfCols] = useState(2);
	const [numOfPages, setNumOfPages] = useState(2);
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
	const [currentPage, setCurrentPage] = useState(1);
	
	const handleIconButtonPress = (page, id) => {
		alert(page.toString()+" "+id.toString());
	};
	
	return (
		<MainBar
			numOfRows={numOfRows}
			numOfCols={numOfCols}
			numOfPages={numOfPages}
			iconButtons={iconButtons}
			currentPage={currentPage}
			onIconButtonPress={handleIconButtonPress}
		/>
	);
};
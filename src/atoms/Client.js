import TcpSocket from "react-native-tcp-socket";

import constants from "../../config/constants";

class Client {
	static client;
	
	static setup(IP, handleData, onDisconnect) {
		const timeout = setTimeout(() => {
			// add error message for user?
			alert("An error has occured.")
			console.log("can't connect");
			client.end()
		}, 1000);
		
		let readBuffer = "";
		client = TcpSocket.createConnection(
			{
				port: constants.PORT,
				host: IP
			},
			() => {
				clearTimeout(timeout);
				client.setEncoding("utf8");
				console.log("connected");
			}
		);
		client.on("data", (data) => {
			readBuffer += data;
			let splitIndex = readBuffer.indexOf(constants.EOF);
			while (splitIndex >= 0) {
				handleData(JSON.parse(readBuffer.substring(0, splitIndex)));
				readBuffer = readBuffer.substring(splitIndex+constants.EOF.length);
				splitIndex = readBuffer.indexOf(constants.EOF)
			}
		});
		client.on("error", (error) => {
			clearTimeout(timeout);
			alert("An error has occured.")
			console.log("error");
			console.log(error);
		});
		client.on("close", () => {
			console.log("close");
			onDisconnect();
		});
	}
	
	static getClient() {
		return client;
	}
}

export default Client;
import TcpSocket from "react-native-tcp-socket";

import constants from "../../config/constants";

class Client {
	static client;
	
	static setup(IP, handleData, onDisconnect) {
		let readBuffer = "";
		client = TcpSocket.createConnection(
			{
				port: constants.PORT,
				host: IP
			},
			() => {
				client.setEncoding("utf8");
				console.log("connected");
			}
		);
		client.on("data", (data) => {
			readBuffer += data;
			let splitIndex = readBuffer.indexOf("XXXXXX");
			if (splitIndex >= 0) {
				handleData(JSON.parse(readBuffer.substring(0, splitIndex)));
				readBuffer = readBuffer.substring(splitIndex+6);
			}
		});
		client.on("error", (error) => {
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
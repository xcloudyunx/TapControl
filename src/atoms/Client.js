import TcpSocket from "react-native-tcp-socket";

import constants from "../../config/constants";

class Client {
	constructor(IP, handleData, onDisconnect) {
		this.readBuffer = "";
		this.client = TcpSocket.createConnection(
			{
				port: constants.PORT,
				host: IP
			},
			() => {
				this.client.setEncoding("utf8");
				console.log("connected");
			}
		);
		this.client.on("data", (data) => {
			this.readBuffer += data;
			let splitIndex = this.readBuffer.indexOf("XXXXXX");
			if (splitIndex >= 0) {
				handleData(JSON.parse(readBuffer.substring(0, splitIndex)));
				this.readBuffer = this.readBuffer.substring(splitIndex+6);
			}
		});
		this.client.on("error", (error) => {
			console.log("error");
			console.log(error);
		});
		this.client.on("close", () => {
			console.log("close");
			onDisconnect();
		});
	}
	
	write(message) {
		this.client.write(message);
	}
}

export default Client;
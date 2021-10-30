import EventEmitter from "eventemitter3";

class eventEmitter {
	static ee = new EventEmitter();
	
	static getEventEmitter() {
		return this.ee;
	}
}

export default eventEmitter;
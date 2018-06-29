'use strict'

class Room {
    constructor(number, name) {
        this.id = newGuid();
        this.number = number;
        this.name = name;
        this.roomManager = '';
        this.transponders = [];
    }

    setRoomManager(roomManager) {
        this.roomManager = roomManager.id;
    }

    getRoomManager() {
        return this.roomManager;
    }

    addTransponder(transponder) {
        this.transponders.push(transponder.id);
    }

    removeTransponder(transponder) {
        var index = this.transponders.indexOf(transponder.id);

        if (index !== -1) {
            this.transponders.splice(index, 1);
        }
    }
}
'use strict'

class Room {
    constructor(number, name) {
        this.id = newGuid();
        this.number = number;
        this.name = name;
        this.roomManager = '';
        this.transponders = [];
        this.permissions = [];
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

    addPermission(personPermission) {
        this.permissions.push(personPermission.id);
    }

    removePermission(personPermission) {
        var index = this.permissions.indexOf(personPermission.id);

        if (index !== -1) {
            this.permissions.splice(index, 1);
        }
    }
}
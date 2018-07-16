'use strict'

class Transponder {
    constructor(number) {
        this.id = newGuid();
        this.no = number;
        this.rooms = [];
        this.permissions = [];
    }

    addRoom(newRoom) {
        this.rooms.push(newRoom.id);
    }

    removeRoom(rRoom) {
        var index = this.rooms.indexOf(rRoom.id);

        if (index !== -1) {
            this.roomms.splice(index, 1);
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
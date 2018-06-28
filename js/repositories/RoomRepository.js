'use strict'

const ROOM_TABLE = 'ROOM';

class RoomRepository {

    static add(room) {
        var rooms = this.getAll();

        rooms.push(room);

        this.save(rooms);
    }

    static remove(room) {
        var rooms = this.getAll();

        var index = this.getIndexByRoomId(room.id);

        if (index !== -1) {
            rooms.splice(index, 1);
        }

        this.save(rooms);
    }

    static update(room) {
        var rooms = this.getAll();

        var index = this.getIndexByRoomId(room.id);

        if (index !== -1) {
            rooms[index] = room;
        }

        this.save(rooms);
    }

    static getIndexByRoomId(roomId) {
        var rooms = this.getAll();

        for (var i = 0; i < rooms.length; ++i) {
            if (rooms[i].id === roomId)
                return i;
        }

        return -1;
    }

    static getAll() {
        var rooms = JSON.parse(sessionStorage.getItem(ROOM_TABLE));

        var r = [];

        if (rooms !== null) {
            for (var i = 0; i < rooms.length; ++i) {
                r.push(Object.assign(new Room, rooms[i]));
            }
        }

        return r;
    }

    static save(rooms) {
        sessionStorage.setItem(ROOM_TABLE, JSON.stringify(rooms));
    }

    static findById(roomId) {
        var rooms = this.getAll();

        for (var i = 0; i < rooms.length; ++i) {
            if (rooms[i].id === roomId) {
                return rooms[i];
            }
        }

        return null;
    }
}
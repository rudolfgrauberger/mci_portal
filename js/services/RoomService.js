'use strict'

class RoomService {

    static getAllAssignedRoomsForUser(user) {
        var roomIds = user.rooms;

        var rooms = [];

        for (var index = 0; index < roomIds.length; ++index) {
            var room = RoomRepository.findById(roomIds[index]);

            rooms.push(room);
        }

        return rooms;
    }

    static filterAssignedRoomsForUser(user, searchValue) {
        var allAssingedRooms = this.getAllAssignedRoomsForUser(user);

        return this.filterRoomsBySearchValue(allAssingedRooms, searchValue);
    }

    static filterRoomsBySearchValue(roomlist, searchValue) {
        var filterOn = !(searchValue === null || searchValue === '');
        var selectedRooms = [];
        for (var i = 0; i < roomlist.length; ++i) {
            if (filterOn === true) {
                if (searchEqualityCompare(roomlist[i].number, searchValue) ||
                    searchEqualityCompare(roomlist[i].name, searchValue))
                {
                    selectedRooms.push(roomlist[i]);
                }
            } else {
                selectedRooms.push(roomlist[i]);
            }
        }

        return selectedRooms;
    }

    static filterRoomsByTransponder(transponder) {
        var selectedRooms = [];
        var allRooms = RoomRepository.getAll();

        for (var i = 0; i < allRooms.length; ++i) {
            var allTransponders = allRooms[i].transponders;
            for (var t = 0; t < allTransponders.length; t++) {
                if (allTransponders[t] === transponder) {
                    if (!selectedRooms.some(x => { return x.number === allRooms[i].number })) {
                        selectedRooms.push(allRooms[i]);
                    }
                }
            }
        }

        return selectedRooms;
    }

    static filterRoomsBySearchString(searchValue) {
        return this.filterRoomsBySearchValue(RoomRepository.getAll(), searchValue);
    }

    static getRoomById(roomid) {
        return RoomRepository.findById(roomid);
    }
}
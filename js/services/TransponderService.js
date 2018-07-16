'use strict'

class TransponderService {

    static getTransponderById(transponderId) {
        return TransponderRepository.findById(transponderId);
    }

    static filterTransponderBySearchString(stringValue) {
        return this.filterTransponderBySearchValue(TransponderRepository.getAll(), stringValue);
    }

    static filterTransponderBySearchValue(transponderlist, searchValue) {
        var filterOn = !(searchValue === null || searchValue === '');
        var selectedTransponder = [];
        for (var i = 0; i < transponderlist.length; ++i) {
            if (filterOn === true) {
                if (searchEqualityCompare(transponderlist[i].no, searchValue))
                {
                    selectedTransponder.push(transponderlist[i]);
                }
                else if (transponderlist[i].rooms.length !== 0) {

                    var rooms = transponderlist[i].rooms;

                    // In Räumen?
                    for (var r = 0; r < rooms.length; ++r) {
                        var room = RoomService.getRoomById(rooms[r]);
                        if (searchEqualityCompare(room.number, searchValue) || searchEqualityCompare(room.name, searchValue)) {
                            if (!selectedTransponder.includes(transponderlist[i])) {
                                selectedTransponder.push(transponderlist[i]);
                            }
                        }
                    }
                }

            } else {
                selectedTransponder.push(transponderlist[i]);
            }
        }

        return selectedTransponder;
    }

    static filterTransponderBySearchStringForUser(user, searchValue) {
        var transponders = TransponderRepository.getAll();

        var transponderForUser = []
        for (var i = 0; i < transponders.length; ++i) {
            var rooms = transponders[i].rooms;

            for (var r = 0; r < rooms.length; ++r) {
                var room = RoomService.getRoomById(rooms[r]);

                if (room.roomManager === user.id) {
                    if (!transponderForUser.includes(transponders[i])) {
                        transponderForUser.push(transponders[i]);
                    }
                }
            }
        }

        return this.filterTransponderBySearchValue(transponderForUser, searchValue);
    }
}
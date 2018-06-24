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

        var filterOn = !(searchValue == null || searchValue == "");
        var selectedRooms = [];
        for (var i = 0; i < allAssingedRooms.length; ++i) {
            if (filterOn == true) {
                if (allAssingedRooms[i].number.search(new RegExp(searchValue, 'i')) != -1 ||
                allAssingedRooms[i].name.search(new RegExp(searchValue, 'i')) != -1) {
                selectedRooms.push(allAssingedRooms[i]);
                }
            } else {
                selectedRooms.push(allAssingedRooms[i]);
            }
        }
        
        return selectedRooms;
    }
}
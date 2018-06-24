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
}
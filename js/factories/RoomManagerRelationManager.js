'use strict'

class RoomManagerRelationManager {

    static addLinkBetweenRoomManagerAndRoom(manager, room) {
        room.setRoomManager(manager);
        manager.addRoom(room);
    }

    static removeLinkBetweenRoomManagerAndRoom(manager, room) {
        room.setRoomManager(null);
        manager.removeRoom(room);
    }
}
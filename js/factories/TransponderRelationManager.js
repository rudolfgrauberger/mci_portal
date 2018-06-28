'use strict'

class TransponderRelationManager {

    static addLinkBetweenTransponderAndRoom(transponder, room) {
        transponder.addRoom(room);
        room.addTransponder(transponder);
    }

    static removeLinkBetweenTransponderAndRoom(transponder, room) {
        transponder.removeRoom(room);
        room.removeTransponder(transponder);
    }
}
class TransponderRelationManager {

    static addLinkBetweenTransponderAndRoom(transponder, room) {
        transponder.addRoom(room);
        room.addTransponder(transponder);
    }

    static removeLinkBetweenTransponderAndRoom(transponder, roome) {
        transponder.removeRoom(room);
        room.removeTransponder(transponder);
    }
}
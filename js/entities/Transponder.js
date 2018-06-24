class Transponder {
    constructor(number) {
        this.id = newGuid();
        this.no = number;
        this.rooms = [];
    }

    addRoom(newRoom) {
        this.rooms.push(newRoom.id);
    };

    removeRoom(rRoom) {
        var index = this.rooms.indexOf(rRoom.id);

        if (index != -1) {
            this.roomms.splice(index, 1);
        }
    }
}
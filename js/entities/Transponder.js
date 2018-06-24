function Transponder (number) {
    this.id = guid();
    this.no = number;
    this.rooms = [];

    this.addRoom = function (newRoom) {
        this.rooms.push(newRoom.id);
    };

    this.removeRoom = function(rRoom) {
        var index = this.rooms.indexOf(rRoom.id);

        if (index != -1) {
            this.roomms.splice(index, 1);
        }
    }
}
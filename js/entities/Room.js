function Room (number, name) {
    this.id = guid();
    this.number = number;
    this.name = name;
    this.roomManager = "";
    this.transponders = [];
    this.permissions = [];

    this.setRoomManager = function(roomManager) {
        this.roomManager = roomManager.id;
    }
    this.getRoomManager = function() {
        return this.roomManager.id;
    }

    this.addTransponder = function(transponder) {
        this.transponders.push(transponder.id);
    }

    this.removeTransponder = function(transponder) {
        var index = this.transponders.indexOf(transponder.id);

        if (index != -1) {
            this.transponders.splice(index, 1);
        }
    }

    this.addPermission = function(personPermission) {
        this.permissions.push(personPermission.id);
    }

    this.removePermission = function(personPermission) {
        var index = this.permissions.indexOf(personPermission.id);
        
        if (index != -1) {
            this.permissions.splice(index, 1);
        }
    }
}
class User {
    constructor(firstname, lastname, username, pw, role) {
        this.id = guid();
        this.firstname =  firstname,
        this.lastname =  lastname,
        this.username =  username,
        this.pw =  pw,
        this.role = role;
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

    static getRoomManagerUser(firstname, lastname, username, pw) {
	    var user = new User(firstname, lastname, username, pw, "roomManager");
	    return user;
    }

    static getGateKeeperUser(firstname, lastname, username, pw) {
	    var user = new User(firstname, lastname, username, pw, "gateKeeper");
	    return user;
    }
}
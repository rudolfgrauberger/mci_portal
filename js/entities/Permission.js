class Permission {

    constructor (person, room, expires) {
        this.id = newGuid();
        this.person = person.id;
        this.room = room.id;
        this.expires = expires;
    }
}
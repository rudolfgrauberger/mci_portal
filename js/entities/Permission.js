class Permission {

    constructor (person, room, expires) {
        this.id = guid();
        this.person = person.id;
        this.room = room.id;
        this.expires = expires;
    }
}
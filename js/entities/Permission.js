'use strict'

class Permission {

    constructor (person, transponder, expires, manager) {
        this.id = newGuid();
        this.person = person.id;
        this.transponder = transponder.id;
        this.expires = expires;
        this.manager = manager ? manager.id : null;
    }
}
'use strict'

class Permission {

    constructor (person, transponder, expires) {
        this.id = newGuid();
        this.person = person.id;
        this.transponder = transponder.id;
        this.expires = expires;
    }
}
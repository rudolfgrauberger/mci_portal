'use strict'

class PermissionFactory {

    static create(transponder, person, expires) {
        var perm = new Permission(person, transponder, expires);

        transponder.addPermission(perm);
        person.addPermission(perm);
        return perm;
    }
}
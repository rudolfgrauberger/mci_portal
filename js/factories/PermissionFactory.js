'use strict'

class PermissionFactory {

    static create(transponder, person, expires, roomManager) {
        var perm = new Permission(person, transponder, expires, roomManager);

        transponder.addPermission(perm);
        person.addPermission(perm);
        return perm;
    }
}
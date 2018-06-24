class PermissionFactory {

    static create(room, person, expires) {
        var perm = new Permission(person, room, expires);

        room.addPermission(perm);
        person.addPermission(perm);
        return perm;
    }
}
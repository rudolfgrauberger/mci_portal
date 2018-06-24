const PERMISSION_TABLE = "PERMISSION";

class PermissionRepository {

    static add(permission) {
        var permissions = this.getAll();

        permissions.push(permission);

        this.save(permissions);
    }

    static remove(permission) {
        var permissions = this.getAll();

        var index = this.getIndexById(permission.id);

        if (index != -1) {
            permissions.splice(index, 1);
        }

        this.save(permissions);
    }

    static getIndexById(permissionId) {
        var permissions = this.getAll();

        for (var i = 0; i < permissions.length; ++i) {
            if (permissions[index].id == permissionId)
            return i;
        }

        return -1;
    }

    static getAll() {
        var permissions = JSON.parse(sessionStorage.getItem(PERMISSION_TABLE));

        if (permissions == null) {
            permissions = [];
        }

        return permissions;
    }

    static save(permissions) {
        sessionStorage.setItem(PERMISSION_TABLE, JSON.stringify(permissions));
    }

    static getPermissionsByRoomId(roomId) {
        var permissions = this.getAll();

        var perm = []
        for (var i = 0; i < permissions.length; ++i) {
            if (permissions[i].room == roomId) {
                perm.push(permissions[i]);
            }
        }

        return perm;
    }
}
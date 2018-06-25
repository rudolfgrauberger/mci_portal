class PermissionService {

    static filterPermissionsForRoom(currentRoom, searchValue) {
        var permissions = PermissionRepository.getPermissionsByRoomId(currentRoom.id);
        var filterOn = !(searchValue == null || searchValue == "");

        var selectedPermissions = [];
        for (var i = 0; i < permissions.length; ++i) {
            var person = PersonService.getPersonById(permissions[i].person);

            if (filterOn == false) {
                selectedPermissions.push(permissions[i]);
                continue;
            }

            var searchReg = new RegExp(searchValue, 'i');

            if (person.firstname.search(searchReg) != -1 ||
                person.lastname.search(searchReg) != -1 ||
                person.matrikelno.search(searchReg) != -1 ||
                person.company.search(searchReg) != -1) 
            {
                selectedPermissions.push(permissions[i]);
            }
        }

        return selectedPermissions;
    }

    static filterPermissionsForPerson(currentPerson, searchValue) {
        var permissions = PermissionRepository.getPermissionsByPersonId(currentPerson.id);
        var filterOn = !(searchValue == null || searchValue == "");

        var selectedPermissions = [];
        
        for (var i = 0; i < permissions.length; ++i) {
            if (filterOn == false) {
                selectedPermissions.push(permissions[i]);
                continue;
            }

            var room = RoomService.getRoomById(permissions[i].room);
            var manager = UserService.getUserById(room.roomManager);

            var searchReg = new RegExp(searchValue, 'i');

            if (room.number.search(searchReg) != -1 ||
                room.name.search(searchReg) != -1 ||
                manager.firstname.search(searchReg) != -1 ||
                manager.lastname.search(searchReg) != -1 ||
                manager.username.search(searchReg) != -1)
            {
                selectedPermissions.push(permissions[i]);
            }
        }

        return selectedPermissions;

    }

    static removePermissionById(permissionId) {
        var permission = PermissionRepository.findById(permissionId);
        var person = PersonRepository.findById(permission.person);
        var room = RoomRepository.findById(permission.room);

        person.removePermission(permission);
        room.removePermission(permission);

        PersonRepository.update(person);
        RoomRepository.update(room);
        PermissionRepository.remove(permission);
    }

    static addPermissionForPersonToRoom(person, room, expires) {

        var permissionsForRoom = this.filterPermissionsForRoom(room);

        for (var i = 0; i < permissionsForRoom.length; ++i) {
            var personWithPermission = PersonRepository.findById(permissionsForRoom[i].person);
            if (personWithPermission.id == person.id) {
                return;
            }
        }

        var permission = PermissionFactory.create(room, person, expires);
        PersonRepository.update(person);
        RoomRepository.update(room);
        PermissionRepository.add(permission);
    }
}
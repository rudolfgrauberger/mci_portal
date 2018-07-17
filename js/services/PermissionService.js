'use strict'

class PermissionService {

    static filterPermissionsForTransponder(transponder, searchValue) {
        var permissions = PermissionRepository.getPermissionsByTransponderId(transponder.id);
        var filterOn = !(searchValue === null || searchValue === '');

        var selectedPermissions = [];
        for (var i = 0; i < permissions.length; ++i) {
            var person = PersonService.getPersonById(permissions[i].person);

            if (filterOn === false) {
                selectedPermissions.push(permissions[i]);
                continue;
            }

            if (searchEqualityCompare(person.firstname, searchValue) ||
                searchEqualityCompare(person.lastname, searchValue) ||
                searchEqualityCompare(person.matrikelno, searchValue) ||
                searchEqualityCompare(person.company, searchValue))
            {
                selectedPermissions.push(permissions[i]);
            }
        }

        return selectedPermissions;
    }

    static filterPermissionsForPerson(currentPerson, searchValue) {
        var permissions = PermissionRepository.getPermissionsByPersonId(currentPerson.id);
        var filterOn = !(searchValue === null || searchValue === '');

        var selectedPermissions = [];

        for (var i = 0; i < permissions.length; ++i) {
            if (filterOn === false) {
                selectedPermissions.push(permissions[i]);
                continue;
            }

            var transponder = TransponderService.getTransponderById(permissions[i].transponder);

            for (var t = 0; t < transponder.rooms.length; ++t) {
                var room = RoomService.getRoomById(transponder.rooms[t]);
                var manager = UserService.getUserById(room.roomManager);

                if (searchEqualityCompare(room.number, searchValue) ||
                    searchEqualityCompare(room.name, searchValue))
                {
                    selectedPermissions.push(permissions[i]);
                }
                else if (manager) {
                    if (searchEqualityCompare(manager.firstname, searchValue) ||
                        searchEqualityCompare(manager.lastname, searchValue) ||
                        searchEqualityCompare(manager.username, searchValue)) 
                    {
                        selectedPermissions.push(permissions[i]);
                    }
                }
            }
        }

        return selectedPermissions;

    }

    static getPermissionForPersonAndRoom(person, room) {
        var permissions = PermissionRepository.getAll();
        var transponders = room.transponders;

        for (var i = 0; i < permissions.length; ++i) {
            if (permissions[i].person === person && transponders.some(x => x === permissions[i].transponder)) {
                return permissions[i];
            }
        }

        return null;
    }

    static getPermissionForPersonAndTransponder(person, transponder) {
        var permissions = PermissionRepository.getAll();

        for (var i = 0; i < permissions.length; ++i) {
            if (person === permissions[i].person && transponder === permissions[i].transponder) {
                return permissions[i];
            }
        }

        return null;
    }

    static getPermissionsForTransponder(transponder) {
        var permissions = PermissionRepository.getAll();
        var selectedPermissions = [];

        for (var i = 0; i < permissions.length; ++i) {
            if (transponder ===  permissions[i].transponder) {
                selectedPermissions.push(permissions[i]);
            }
        }

        return selectedPermissions;
    }

    static removePermissionById(permissionId) {
        var permission = PermissionRepository.findById(permissionId);
        var person = PersonRepository.findById(permission.person);
        var transponder = TransponderRepository.findById(permission.transponder);

        person.removePermission(permission);
        transponder.removePermission(permission);

        PersonRepository.update(person);
        TransponderRepository.update(transponder);
        PermissionRepository.remove(permission);
    }

    static addPermissionForPersonToTransponder(person, transponder, expires) {

        var permissionsForTransponder = PermissionRepository.getPermissionsByTransponderId(transponder.id);

        for (var i = 0; i < permissionsForTransponder.length; ++i) {
            var personWithPermission = PersonRepository.findById(permissionsForTransponder[i].person);
            if (personWithPermission.id === person.id) {
                return;
            }
        }

        var permission = PermissionFactory.create(transponder, person, expires);
        PersonRepository.update(person);
        TransponderRepository.update(transponder);
        PermissionRepository.add(permission);
    }
}
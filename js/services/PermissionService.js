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

            var searchReg = new RegExp(searchValue, 'i');

            if (person.firstname.search(searchReg) !== -1 ||
                person.lastname.search(searchReg) !== -1 ||
                person.matrikelno.search(searchReg) !== -1 ||
                person.company.search(searchReg) !== -1)
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

            var room = TransponderRepository.getPermissionsByTransponderId(permissions[i].transponder);
            var manager = UserService.getUserById(room.roomManager);

            var searchReg = new RegExp(searchValue, 'i');

            if (room.number.search(searchReg) !== -1 ||
                room.name.search(searchReg) !== -1 ||
                manager.firstname.search(searchReg) !== -1 ||
                manager.lastname.search(searchReg) !== -1 ||
                manager.username.search(searchReg) !== -1)
            {
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

        var permissionsForTransponder = this.filterPermissionsForTransponder(transponder);

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
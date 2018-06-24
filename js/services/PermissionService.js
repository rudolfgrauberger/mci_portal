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
}
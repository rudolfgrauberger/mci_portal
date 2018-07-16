'use strict'

class PersonService {

    static getPersonById(personId) {
        return PersonRepository.findById(personId);
    }

    static getPersonInfoAsString(person) {
        return person.firstname + ' ' + person.lastname;
    }

    static getPersonByFirstNameLastNameAndAdditionalInformation(mergesString) {
        var indexOf = mergesString.lastIndexOf('(');
        var firstnameAndLastname = mergesString.substring(0, indexOf -1);
        var indexOfSeperator = firstnameAndLastname.lastIndexOf(' ');
        var firstname = firstnameAndLastname.substring(0, indexOfSeperator);
        var lastname = firstnameAndLastname.substring(indexOfSeperator + 1, firstnameAndLastname.length);

        return PersonRepository.findByFirstNameAndLastName(firstname, lastname);
    }

    static filterPersonsWithPermissionForRoomAndBySearchString(room, searchString) {
        var persons = PersonRepository.getAll();
        var transponder = room.transponders;
        var selectedPersons = [];

        for (var t = 0; t < transponder.length; ++t) {
            var permissions = PermissionService.getPermissionsForTransponder(transponder[t]);

            for (var p = 0; p < permissions.length; ++p) {
                var person = PersonRepository.findById(permissions[p].person);
                if (!selectedPersons.some(x => x.id === person.id)) {
                    selectedPersons.push(PersonRepository.findById(permissions[p].person));
                }
            }
        }

        return this.filterPersonsBySearchValue(selectedPersons, searchString);
    }

    static filterPersonsForTransponderAndBySearchString(transponder, searchString) {
        var persons = PersonRepository.getAll();
        var permissions = PermissionService.getPermissionsForTransponder(transponder.id);
        var selectedPersons = [];

        for (var i = 0; i < persons.length; ++i) {
            for (var p = 0; p < permissions.length; ++p) {
                if (permissions[p].person === persons[i].id) {
                    selectedPersons.push(persons[i]);
                }
            }
        }

        return this.filterPersonsBySearchValue(selectedPersons, searchString);
    }

    static filterPersonsBySearchString(searchValue) {
        return this.filterPersonsBySearchValue(PersonRepository.getAll(), searchValue);
    }

    static filterPersonsBySearchValue(personlist, searchValue) {
        var filterOn = !(searchValue === null || searchValue === '');
        var selectedPersons = [];
        for (var i = 0; i < personlist.length; ++i) {
            if (filterOn === true) {
                if (searchEqualityCompare(personlist[i].firstname, searchValue) ||
                    searchEqualityCompare(personlist[i].lastname, searchValue) ||
                    searchEqualityCompare(personlist[i].matrikelno, searchValue) ||
                    searchEqualityCompare(personlist[i].company, searchValue))
                {
                    selectedPersons.push(personlist[i]);
                }
            } else {
                selectedPersons.push(personlist[i]);
            }
        }

        return selectedPersons;
    }

    static getAllPersons() {
        return PersonRepository.getAll();
    }
}
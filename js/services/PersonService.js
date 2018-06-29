'use strict'

class PersonService {

    static getPersonById(personId) {
        return PersonRepository.findById(personId);
    }

    static getPersonInfoAsString(person) {
        return person.firstname + ' ' + person.lastname + ' (' + (person.matrikelno ? person.matrikelno : person.company) + ')';
    }

    static getPersonByFirstNameLastNameAndAdditionalInformation(mergesString) {
        var indexOf = mergesString.lastIndexOf('(');
        var firstnameAndLastname = mergesString.substring(0, indexOf -1);
        var indexOfSeperator = firstnameAndLastname.lastIndexOf(' ');
        var firstname = firstnameAndLastname.substring(0, indexOfSeperator);
        var lastname = firstnameAndLastname.substring(indexOfSeperator + 1, firstnameAndLastname.length);

        return PersonRepository.findByFirstNameAndLastName(firstname, lastname);
    }

    static filterPersonsBySearchString(searchValue) {
        return this.filterPersonsBySearchValue(PersonRepository.getAll(), searchValue);
    }

    static filterPersonsBySearchValue(personlist, searchValue) {
        var filterOn = !(searchValue === null || searchValue === '');
        var selectedPersons = [];
        for (var i = 0; i < personlist.length; ++i) {
            if (filterOn === true) {
                var searchReg = new RegExp(searchValue, 'i');

                if (personlist[i].firstname.search(searchReg) !== -1 ||
                    personlist[i].lastname.search(searchReg) !== -1 ||
                    personlist[i].matrikelno.search(searchReg) !== -1 ||
                    personlist[i].company.search(searchReg) !== -1)
                {
                    selectedPersons.push(personlist[i]);
                }
            } else {
                selectedPersons.push(personlist[i]);
            }
        }

        return selectedPersons;
    }
}
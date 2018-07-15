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
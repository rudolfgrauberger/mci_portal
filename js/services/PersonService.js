class PersonService {

    static getPersonById(personId) {
        return PersonRepository.findById(personId);
    }

    static getAllPersonsAsStringArray() {
        var personsString = [];

        var persons = PersonRepository.getAll();

        for (var i = 0; i < persons.length; ++i) {
            personsString.push(persons[i].firstname + " " + persons[i].lastname + " (" + (persons[i].matrikelno ? persons[i].matrikelno : persons[i].company) + ")");
        }
        return personsString;
    }

    static getPersonByFirstNameLastNameAndAdditionalInformation(mergesString) {
        var indexOf = mergesString.lastIndexOf("(");
        var firstnameAndLastname = mergesString.substring(0, indexOf -1);
        var indexOfSeperator = firstnameAndLastname.lastIndexOf(" ");
        var firstname = firstnameAndLastname.substring(0, indexOfSeperator);
        var lastname = firstnameAndLastname.substring(indexOfSeperator + 1, firstnameAndLastname.length);

        return PersonRepository.findByFirstNameAndLastName(firstname, lastname);
    }
}
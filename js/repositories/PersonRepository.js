'use strict'

const PERSON_TABLE = 'PERSON';

class PersonRepository {

    static add(people) {
        var peoples = this.getAll();

        peoples.push(people);

        this.save(peoples);
    }

    static remove(people) {
        var peoples = this.getAll();

        var index = this.getIndexByPersonId(people.id);

        if (index !== -1) {
            peoples.splice(index, 1);
        }

        this.save(peoples);
    }

    static update(person) {
        var persons = this.getAll();

        var index = this.getIndexByPersonId(person.id);

        if (index !== -1) {
            persons[index] = person;
        }

        this.save(persons);
    }

    static getIndexByPersonId(personID) {
        var persons = this.getAll();

        for (var i = 0; i < persons.length; ++i) {
            if (persons[i].id === personID)
            return i;
        }

        return -1;
    }

    static getAll() {
        var persons = JSON.parse(sessionStorage.getItem(PERSON_TABLE));

        var p = [];

        if (persons !== null) {
            for (var i = 0; i < persons.length; ++i) {
                p.push(Object.assign(new Person, persons[i]));
            }
        }

        return p;
    }

    static save(persons) {
        sessionStorage.setItem(PERSON_TABLE, JSON.stringify(persons));
    }

    static findById(personId) {
        var persons = this.getAll();

        for (var i = 0; i < persons.length; ++i) {
            if (persons[i].id === personId) {
                return persons[i];
            }
        }

        return null;
    }

    static findByFirstNameAndLastName(firstname, lastname) {
        var persons = this.getAll();

        for (var i = 0; i < persons.length; ++i) {
            if (persons[i].firstname === firstname &&
                persons[i].lastname === lastname)
                {
                    return persons[i];
                }
        }

        return null;
    }
}
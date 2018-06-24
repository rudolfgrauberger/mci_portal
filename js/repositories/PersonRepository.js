const PERSON_TABLE = "PERSON";

class PersonRepository {

    static add(people) {
        var peoples = this.getAll();

        peoples.push(people);

        this.save(peoples);
    }

    static remove(people) {
        var peoples = this.getAll();
        
        var index = this.getIndexByPersonId(people.id);
        
        if (index != -1) {
            peoples.splice(index, 1);
        }

        this.save(peoples);
    }

    static getIndexByPersonId(personID) {
        var peoples = this.getAll();

        for (var i = 0; i < persons.length; ++i) {
            if (persons[i].id == personID)
            return i;
        }

        return -1;
    }

    static getAll() {
        var persons = JSON.parse(sessionStorage.getItem(PERSON_TABLE));

        if (persons == null) {
            persons = [];
        }

        return persons;
    }

    static save(persons) {
        sessionStorage.setItem(PERSON_TABLE, JSON.stringify(persons));
    }

    static findById(personId) {
        var persons = this.getAll();

        for (var i = 0; i < persons.length; ++i) {
            if (persons[i].id == personId) {
                return persons[i];
            }
        }

        return null;
    }

}
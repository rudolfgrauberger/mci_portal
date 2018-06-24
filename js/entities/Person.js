class Person {

    constructor (firstname, lastname, matrikelno, company) {
        this.id = guid();
        this.firstname = firstname;
        this.lastname = lastname;
        this.matrikelno = matrikelno;
        this.company = company;
        this.permissions = [];
    }

    addPermission(roomPermission) {
        this.permissions.push(roomPermission.id);
    }

    removePermission() {
        var index = this.permissions.indexOf(room.id);

        if (index != -1) {
            this.permissions.splice(index, 1);
        }
    }

    static getExternalPerson(firstname, lastname, company) {
        var person = new Person(firstname, lastname, "", company);
        return person;
    }
    
    static getStudent(firstname, lastname, matrikelno) {
        var person = new Person(firstname, lastname, matrikelno, "");
        return person;
    }
}
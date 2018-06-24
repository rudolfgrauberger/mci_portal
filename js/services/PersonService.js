class PersonService {

    static getPersonById(personId) {
        return PersonRepository.findById(personId);
    }
}
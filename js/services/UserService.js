class UserService {

    getUserByName(username) {
        return UserRepository.findByUserName(username);
    }
}
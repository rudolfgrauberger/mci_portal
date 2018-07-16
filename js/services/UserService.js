'use strict'

class UserService {

    loginUser(username, password) {
        return UserRepository.findByUsernameAndPassword(username, password);
    }

    getSuccessLoginRedirectPage(user) {
        if (user.role === 'roomManager'){
            return 'rv-start.html';
        } else if(user.role === 'gateKeeper'){
            return 'search.html';
        }

        return '';
    }

    static getUserById(userid) {
        return UserRepository.findById(userid);
    }

    static getUserInfoAsString(user) {
        return user.firstname + ' ' + user.lastname + ' (' + user.username + ')';
    }
}
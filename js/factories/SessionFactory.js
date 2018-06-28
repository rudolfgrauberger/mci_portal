'use strict'

class SessionFactory {

    static create(user) {
        var session = new Session();
        session.user = user;
        return session;
    }
}
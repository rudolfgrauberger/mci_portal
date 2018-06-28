'use strict'

class SessionService {

    static getCurrentSession() {
        return SessionRepository.get();
    }

    static setCurrentSession(session) {
        SessionRepository.save(session);
    }
}
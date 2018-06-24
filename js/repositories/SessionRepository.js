const SESSION_TABLE = "SESSION";

class SessionRepository {

    static get() {
        var session = JSON.parse(sessionStorage.getItem(SESSION_TABLE));
        return session;
    }

    static save(session) {
        sessionStorage.setItem(SESSION_TABLE, JSON.stringify(session));
    }
}
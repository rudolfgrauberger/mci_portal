
const  USER_TABLE = "USER";
class UserRepository {

    static add(user) {
        var users = this.getAll();

        users.push(user);

        this.save(users);
    }

    static remove(user) {
        var users = this.getAll();

        var index = this.getIndexByUserId(user.id);

        if (index != -1) {
            users.splice(index, 1);
        }

        this.save(users);
    }

    static getIndexByUserId(userId) {
        var users = this.getAll();

        for (var i = 0; i < users.length; ++i) {
            if (users[index].id == userId)
                return i;
        }

        return -1;
    }

    static getAll() {
        var users = JSON.parse(sessionStorage.getItem(USER_TABLE));

        var u = [];

        if (users != null) {
            for (var i = 0; i < users.length; ++i) {
                u.push(Object.assign(new User, users[i]));
            }
        }
        
        return u;
    }

    static save(users) {
        sessionStorage.setItem(USER_TABLE, JSON.stringify(users));
    }

    static findByUsernameAndPassword(username, password) {
        var users = this.getAll();

        for (var index = 0; index < users.length; ++index) {
            if (users[index].username == username && users[index].pw == password) {
                return users[index];
            }
        }

        return null;
    }
}
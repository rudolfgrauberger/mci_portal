const TRANSPONDER_TABLE = "TRANSPONDER";

class TransponderRepository {

    static add(transponder) {
        var transponders = this.getAll();

        transponders.push(transponder);

        this.save(transponders);
    }

    static remove(transponder) {
        var transponders = this.getAll();

        var index = this.getIndexByTransponderId(transponder.id);

        if (index != -1) {
            transponders.splice(index, 1);
        }

        this.save(transponders);
    }

    static getIndexByTransponderId(transponderId) {
        var transponders = this.getAll();

        for (var i = 0; i < transponders.length; ++i) {
            if (transponders[index].id == transponderId)
                return i;
        }

        return -1;
    }

    static getAll() {
        var transponders = JSON.parse(sessionStorage.getItem(TRANSPONDER_TABLE));

        var t = [];

        if (transponders != null) {
            for (var i = 0; i < transponders.length; ++i) {
                t.push(Object.assign(new Transponder, transponders[i]));
            }
        }

        return t;
    }

    static save(transponders) {
        sessionStorage.setItem(TRANSPONDER_TABLE, JSON.stringify(transponders));
    }
}
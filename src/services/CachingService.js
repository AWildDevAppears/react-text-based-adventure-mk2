export default new class DBService {
    dbPromise;

    cache = {
        Zone: {},
        Location: {},
        Scene: {},
        Item: {},
        Container: {},
    }

    // Array of times paired with the ids and types of objects that need to be removed at that time.
    cacheTimers = [];

    read(table, key) {
        if (this.cache[table][key] === undefined) return Promise.reject();

        return Promise.resolve(this.cache[table][key]);
    }

    update(table, key, value) {
        value.id = key;
        this.cache[table][key] = value;

        return Promise.resolve();
    }

    destroy(table, key) {
        delete this.cache[table][key]
    }
}();

import DBService from "../../services/DBService";

export default class CachedObject {
    static cleanCache() {
        // Remove entries from cache
        // Id date === -1, don't remove it ever in this function
    }

    static purgeCache() {
        // Delete everything
    }

    static replaceCache(cache) {
        // Remove everything from the cache and replace it with the cache we are passing in
        // This will be used for saves.
    }

    id = '';
    recordType = '';
    data = {};
    removeAt = 0; // removeAt is a value of days since the game started.

    constructor(object, date) {
        this.id = object.id;
        this.type  = object.type || object.getInstance();
        this.data = object;
        this.removeAt = date;

        DBService.update('Cache', this.id, this);
    }
}

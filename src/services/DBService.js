import idb from 'idb';

export default new class DBService {
    NAME = 'com.awilddevappears.textBasedAdventure';
    dbPromise;

    constructor() {
        // TODO: Allow us to keep the cache around
        indexedDB.deleteDatabase(this.NAME);

        this.dbPromise = idb.open(this.NAME, 1, upgradeDB => {
            upgradeDB.createObjectStore('Zone', { keyPath: 'id' });
            upgradeDB.createObjectStore('Location', { keyPath: 'id' });
            upgradeDB.createObjectStore('Scene', { keyPath: 'id' });
            upgradeDB.createObjectStore('Container', { keyPath: 'id' });

            upgradeDB.createObjectStore('Cache', { keyPath: 'id' });
        });
    }

    read(table, key) {
        return this.dbPromise.then((db) => {
            return db.transaction(table)
                .objectStore(table)
                .get(key);
        });
    }

    update(table, key, value) {
        value.id = key;

        return this.dbPromise.then((db) => {
            let tx = db.transaction(table, 'readwrite');
            tx.objectStore(table)
                .put(value);

            return tx.complete;
        });
    }

    destroy(table, key) {
        return this.dbPromise.then((db) => {
            let tx = db.transaction(table, 'readwrite');
            tx.objectStore(table)
                .destroy(key);

            return tx.complete;
        });
    }
}();

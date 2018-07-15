import idb from 'idb';

export default new class DBService {
    NAME = 'com.awilddevappears.textBasedAdventure';
    dbPromise;

    constructor () {
        this.dbPromise = idb.open(this.NAME, 1, upgradeDB => {
            upgradeDB.createObjectStore('Zone', { keyPath: 'id' });
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
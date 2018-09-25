import idb from 'idb';

export default new class SaveService {
    NAME = 'com.awilddevappears.textBasedAdventure';
    dbPromise;


    constructor() {
        this.dbPromise = idb.open(this.NAME, 1, upgradeDB => {
            upgradeDB.createObjectStore('Save', { keyPath: 'id' });
        });
    }


    saveBundle(bundle) {
              return this.dbPromise.then((db) => {
            let tx = db.transaction('Save', 'readwrite');
            tx.objectStore('Save')
                .put(bundle);

            return tx.complete;
        });
    }


    loadBundle(id) {
        this.dbPromise.then((db) => {
            return db.transaction('Save')
            .objectStore('Save')
            .get(id);
        })
    }


}();
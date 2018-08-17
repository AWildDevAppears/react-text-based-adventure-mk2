import idb from 'idb';

import APIService from './APIService';
import { ZoneActions } from '../store/ZoneStore';

export default new class DBService {
    NAME = 'com.awilddevappears.textBasedAdventure';
    dbPromise;

    constructor() {
        // TODO: Allow us to keep the cache around
        indexedDB.deleteDatabase(this.NAME);

        this.dbPromise = idb.open(this.NAME, 1, upgradeDB => {
            upgradeDB.createObjectStore('Zone', { keyPath: 'id' });
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

    getLocationFromZone(zoneId, locationId) {
        return this.read('Zone', zoneId).then((res) => {
            // If the zone and the location exists, use it
            // otherwise get the location from the DB
            if (res.map[locationId]) {
                return res.map[locationId];
            }
            return Promise.reject();
        }).catch((err) => {
            return APIService.client.getEntry(locationId).then((location) => {
                ZoneActions.changeLocation(
                    location.sys.id,
                    location,
                );

                return location;
            });
        });
    }
}();

import { createClient } from 'contentful';

import Zone from '../models/Zone';

import { CONFIG } from '../config';

export default new class APIService {
    client = createClient(CONFIG.api);

    getStartingLocation() {
        let obj = {};
        return this.client
            .getEntry('4psMRGoOhiOeg2QMCGo4wI')
            .then((location) => {
                obj.location = location;
                return this.client.getEntry('122M4MTkiGYaku8wUAaSWe');
            })
            .then((zone) => {
                obj.zone = new Zone(zone)
                return obj;
            })
    }

    getZones(options = {}) {
        return this.client.getEntries({
            ...options,
            'content_type': 'zone',
        });
    }

    getLocations(options = {}) {
        return this.client.getEntries({
            ...options,
            'content_type': 'location',
        });
    }

    getScenes(options = {}) {
        return this.client.getEntries({
            ...options,
            'content_type': 'scene',
        });
    }

    getItems(options = {}) {
        return this.client.getEntries({
            ...options,
            'content_type[all]': [
                'item',
                'itemAmmunition',
                'weaponMelee',
                'weapon',
                'armorBoots',
                'armorChest',
                'armor',
                'armorHead',
            ],
        });
    }

    getWeapons(options = {}) {
        return this.client.getEntries({
            ...options,
            'content_type[all]': [
                'weaponMelee',
                'weapon',
            ],
        });
    }

    getArmor(options = {}) {
        return this.client.getEntries({
            ...options,
            'content_type[all]': [
                'armorBoots',
                'armorChest',
                'armor',
                'armorHead',
            ],
        });
    }
}();
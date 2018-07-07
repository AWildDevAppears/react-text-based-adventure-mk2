import { createClient } from 'contentful';
import { CONFIG } from '../config';

export default new class APIService {
    client = createClient(CONFIG.api); 

    getStartingLocation() {
        return this.client
            .getEntry('4psMRGoOhiOeg2QMCGo4wI')
            .then((location) => {
                return {
                    zone: '122M4MTkiGYaku8wUAaSWe',
                    location,
                };
            });
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
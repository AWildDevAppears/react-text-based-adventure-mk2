import CachingService from './CachingService';
import APIService from '../services/APIService';

import Scene from '../models/Scene';
import BodyCopy from '../models/BodyCopy';
import SceneAction from '../models/SceneAction';
import Container from '../models/Container';
import WeaponMelee from '../models/WeaponMelee';
import Item from '../models/abstract/Item';
import WeaponRanged from '../models/WeaponRanged';
import Location from '../models/Location';
import Zone from '../models/Zone';

export default new class DataBuilderService {
    getScene(id) {
        return CachingService.read('Scene', id)
            .then((scene) => {
                if (!scene) {
                    return Promise.reject();
                }
                return scene;
            })
            .catch(() => {
                return APIService.client.getEntry(id)
                    .then((sceneObject) => {
                        let scene = new Scene();

                        scene.id = sceneObject.sys.id;
                        scene.title = sceneObject.fields.title;
                        scene.heading = sceneObject.fields.heading;

                        if (sceneObject.fields.conditions) {
                            sceneObject.fields.conditions.forEach((condition) => {
                                const [ operator, operand, value ] = condition.split(' ');

                                scene.conditions[operator] = {
                                    operand,
                                    value: Scene.convertValue(value),
                                };
                            })
                        }

                        let bodyPromises = sceneObject.fields.body.map((bodyLink) => {
                            return APIService.client.getEntry(bodyLink.sys.id);
                        });

                        let actionPromises = [];
                        if (sceneObject.fields.actions) {
                            actionPromises = sceneObject.fields.actions.map((actionLink) => {
                                return APIService.client.getEntry(actionLink.sys.id);
                            });
                        }

                        return Promise.all(bodyPromises)
                            .then((...body) => {
                                scene.body = body.map(BodyCopy.fromData);
                                return Promise.all(actionPromises)
                            })
                            .then((...actions) => {
                                // Filter out empty actions (when there are no actions).
                                actions = actions.filter(action => action.length > 0);

                                if (actions.length > 0) {
                                    scene.actions = actions.map(SceneAction.fromData);
                                }

                                // Store the result in our DB so we don't have to do
                                // this all again.
                                return CachingService.update('Scene', scene.id, scene);
                            })
                            .then(() => {
                                return scene;
                            });
                    });
            });
    }

    getZone(id) {
        return CachingService.read('Zone', id)
            .then((zone) => {
                if (!zone) {
                    return Promise.reject();
                }

                return zone;
            })
            .catch(() => {
                let zone;
                return APIService.client.getEntry(id)
                    .then((zoneObject) => {
                        zone = new Zone(zoneObject);

                        return CachingService.update('Zone', id, zone);
                    })
                    .then(() => zone);
            })
    }

    getContainer(id) {
        return CachingService.read('Container', id)
            .then((container) => {
                if (!container) {
                    return Promise.reject();
                }
                return new Container(container);
            })
            .catch(() => {
                let container = new Container();
                return APIService.client.getEntry(id)
                    .then((containerObject) => {
                        container.id = containerObject.sys.id;
                        container.name = containerObject.fields.identifier;
                        container.maxItems = containerObject.fields.maxItems;
                        container.minItems = containerObject.fields.minItems;
                        container.refills = containerObject.fields.refills;
                        container.possibleItems = containerObject.fields.possibleItems
                            .map((item) => item.sys.id);

                        return CachingService.update('Container', id, container);
                    })
                    .then(() => {
                        return container;
                    });
            });
    }

    getItem(id) {
        return CachingService.read('Item', id)
            .then((item) => {
                if (!item) {
                    return Promise.reject();
                }
                return item;
            })
            .catch(() => {
                let item = {};

                return APIService.client.getEntry(id)
                    .then((itemObject) => {
                        item.id = itemObject.sys.id;
                        item.type = itemObject.sys.contentType.sys.id; // Item / Weapon / Armor etc.

                        // All items
                        item.name = itemObject.fields.name;
                        item.isKeyItem = itemObject.fields.isKeyItem || false;
                        item.value = itemObject.fields.value;
                        item.weight = itemObject.fields.weight || 0;

                        // Weapons
                        item.subtype = itemObject.fields.subtype;
                        item.damageMinimum = itemObject.fields.damageMinimum;
                        item.damageMaximum = itemObject.fields.damageMaximum;

                        // Ranged Weapons
                        item.magasineSize = itemObject.fields.magasineSize;
                        item.roundsPerSecond = itemObject.fields.roundsPerSecond;
                        item.roundsPerBurst = itemObject.fields.roundsPerBurst;
                        item.reloadSpeed = itemObject.fields.reloadSpeed;
                        item.range = itemObject.fields.range;
                        item.ammoType = itemObject.fields.ammoType ? itemObject.fields.ammoType.map((ammoType) => ammoType.sys.id) : undefined;

                        return CachingService.update('Item', id, item);
                    })
                    .then(() => item);
            })
            .then((item) => {
                switch (item.type) {
                    case 'weaponMelee':
                        return new WeaponMelee(item);
                    case 'weaponRanged':
                        return new WeaponRanged(item);
                    case 'item':
                        return new Item(item);
                    default:
                        // TODO: Handle consumables and armor
                }
            });
    }

    getLocation(id) {
        return CachingService.read('Location', id)
            .then((location) => {
                if (!location) {
                    return Promise.reject();
                }
                return location;
            })
            .catch(() => {
                return APIService.client.getEntry(id)
                    .then((location) => {
                        let loc = new Location(location);
                        return CachingService.update('Location', loc.id, location)
                            .then(() => {
                                return location;
                            });
                    });
            })
            .then((loc) => {
                return new Location(loc);
            })
    }
}();

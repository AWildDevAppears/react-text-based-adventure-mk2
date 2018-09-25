import CachedObject from "./CachedObject";
import SaveService from "../../services/SaveService";
import CachingService from "../../services/CachingService";
import Dispatcher from "../../store/Dispatcher";
import { GAME_STATE_ACTIONS } from "../../store/GameStateStore";

export default new class SaveObject {
    id = '';
    initialSaveDate = 0;
    lastSaveDate = 0;
    cache = {};
    player = {};
    location = '';
    zone = '';
    zone = '';

    load(id) {
        return SaveService.loadBundle.then((save) => {
            this.id = id;
            this.initialSaveDate = save.initialSaveDate;
            this.lastSaveDate = save.lastSaveDate;
            this.cache = save.cache;
            this.player = save.player;

            this.location = save.location;
            this.zone = save.zone;

            Dispatcher.dispatch({
                type: GAME_STATE_ACTIONS.GAME_STATE_UPDATE_ALL,
                ...this,
            })
        });
    }

    save() {
        this.buildCache();
        return SaveService.saveBundle(this);
    }

    buildCache() {
        for (let zone in CachingService.cache.Zone) {
            let z = new CachedObject();
            z.id = zone.id;
            z.type = 'Zone';
            z.removeAt = -1;
            z.data = {
                variables: zone.variables,
            };

            this.cache[zone.id] = z;
        }

        for (let container in CachingService.cache.Container) {
            let c = new CachedObject();
            c.id = container.id;
            c.type = 'Container';
            c.removeAt = container.refills ? 0 : -1; // TODO set to ingame clock
            c.data = {
                inventory: container.inventory,
            };

            this.cache[container.id] = c;
        }
    }
}();

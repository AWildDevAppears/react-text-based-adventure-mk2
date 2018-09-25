import DBService from "../../services/DBService";

import CachedObject from "./CachedObject";
import SaveService from "../../services/SaveService";

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

            return CachedObject.replaceCache(this.cache);
        });
    }

    save() {
        return SaveService.saveBundle(this);
    }
}();

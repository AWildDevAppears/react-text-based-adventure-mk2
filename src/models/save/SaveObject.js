import DBService from "../../services/DBService";

import CachedObject from "./CachedObject";

export default new class SaveObject {
    id = '';
    initialSaveDate = 0;
    lastSaveDate = 0;
    cache = {};
    player = {};

    load(id) {
        return DBService.read('Save', id).then((save) => {
            this.id = id;
            this.initialSaveDate = save.initialSaveDate;
            this.lastSaveDate = save.lastSaveDate;
            this.cache = save.cache;
            this.player = save.player;
        }).then(() => {
            return CachedObject.replaceCache(this.cache);
        });
    }
}();

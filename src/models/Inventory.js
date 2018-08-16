export default class Inventory {
    store = {};
    maxItems = 0;

    get length() {
        return this.getAllItems().length;
    }

    getAllItems() {
        let items = [];

        for (let k in this.store) {
            items = items.concat(this._getItemsUnstacked(k));
        }

        return items;
    }

    getItems(keys) {
        if (!Array.isArray(keys)) {
            keys = [keys];
        }

        let items = [];
        keys.forEach((key) => {
            items = items.concat(this._getItemsUnstacked(key));
        });

        return items;
    }

    putItems(items) {
        if (!Array.isArray(items)) {
            items = [items];
        }

        items.forEach((item) => {
            if (this.store[item.id]) {
                this.store[item.id].count++;
            } else {
                this.store[item.id] = {
                    item,
                    count: 1,
                };
            }
        });
    }

    hasItem(key) {
        return !!(this.store[key] && this.store[key].id);
    }


    _getItemsUnstacked(key) {
        let items = [];
        if (this.store[key]) {
            for (let i = 0; i < this.store[key].count; i++) {
                items.push(this.store[key].item);
            }
        }

        return items;
    }
}

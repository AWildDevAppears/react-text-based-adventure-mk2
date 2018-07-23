export default class Inventory {
    store = {};

    getAllItems() {
        let items = [];

        for (let k in this.store) {
            items.push(this.store[k]);
        }

        return items;
    }

    getItems(keys) {
        if (Array.isArray(keys)) {
            return keys.map((key) => this.store[key]);
        }

        return this.store[keys];
    }

    putItems(items) {
        if (!Array.isArray(items)) {
            items = [items];
        }

        items.forEach((item) => {
            this.store[item.id] = item;
        });
    }

    hasItem(key) {
        return !!(this.store[key] && this.store[key].id);
    }
}
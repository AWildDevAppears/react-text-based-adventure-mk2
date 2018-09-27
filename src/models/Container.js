import Inventory from "./Inventory";
import DataBuilderService from "../services/DataBuilderService";
import CachingService from "../services/CachingService";

export default class Container {
    id = "";
    name = "";
    maxItems = 0;
    minItems = 0;
    refills = false;
    possibleItems = [];

    inventory = new Inventory();

    constructor(obj) {
        if (!obj) return;

        this.id = obj.id;
        this.name = obj.name;
        this.maxItems = obj.maxItems;
        this.minItems = obj.minItems;
        this.refills = obj.refills;
        this.possibleItems = obj.possibleItems;

        // Pull through a cached version of this objects inventory
        // as we've probably looted it before
        this.inventory = new Inventory(obj.inventory);
    }

    buildUp() {
        // Don't rebuild the inventory if we don't have to
        if (this.inventory.length > 0) return Promise.resolve();

        // TODO: Refactor this, maxItems does not describe this number
        if (this.inventory.maxItems === 0) {
            this.inventory.maxItems = Math.floor(Math.random() * (this.maxItems - this.minItems + 1) + this.minItems);
        }

        let promises = [];

        while (promises.length <= this.inventory.maxItems - this.inventory.length) {
            promises.push(DataBuilderService.getItem(this.possibleItems[Math.floor(Math.random() * this.possibleItems.length)]));
        }

        return Promise.all(promises)
            .then((items) => this.inventory.putItems(items))
            .then(() => CachingService.update("Container", this.id, this));
    }

    tearDown() {
        // Only remove all of the items if we plan to refill it.
        if (this.refills) {
            this.inventory = [];
        }
    }
}

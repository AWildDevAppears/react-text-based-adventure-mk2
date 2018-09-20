import Inventory from "./Inventory";
import DataBuilderService from "../services/DataBuilderService";

export default class Container {

    id = "";
    name = "";
    maxItems = 0;
    minItems = 0;
    refills = false;
    possibleItems = [];

    inventory = new Inventory();

    buildUp() {
        // TODO: Refactor this, maxItems does not describe this number
        if (this.inventory.maxItems === 0) {
            this.inventory.maxItems = Math.floor(Math.random() * (this.maxItems - this.minItems + 1) + this.minItems);;
        }

        let promises = [];

        while (promises.length <= this.inventory.maxItems - this.inventory.length) {
            promises.push(DataBuilderService.getItem(this.possibleItems[Math.floor(Math.random() * this.possibleItems.length)]));
        }

        return Promise.all(promises).then((items) => this.inventory.putItems(items));
    }

    tearDown() {
        // Only remove all of the items if we plan to refill it.
        if (this.refills) {
            this.inventory = [];
        }
    }
}

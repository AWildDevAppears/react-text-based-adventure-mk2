import Inventory from "./Inventory";

export default class Container {

    id = "";
    name = "";
    maxItems = 0;
    minItems = 0;
    refills = false;
    possibleItems = [];

    inventory = new Inventory();

    buildUp() {
        let itemCount = Math.floor(Math.random() * (this.maxItems - this.minItems + 1));

        while (this.possibleItems.length < itemCount) {
            this.inventory.putItems(this.possibleItems[Math.floor(Math.random() * (this.possibleItems.length + 1))]);
        }
    }

    tearDown() {
        // Only remove all of the items if we plan to refill it.
        if (this.refills) {
            this.inventory = [];
        }
    }
}

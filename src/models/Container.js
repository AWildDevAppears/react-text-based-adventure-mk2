export default class Container {

    id = "";
    name = "";
    maxItems = 0;
    minItems = 0;
    refills = false;
    possibleItems = [];

    currentItems = [];

    buildUp() {
        let itemCount = Math.floor(Math.random() * (this.maxItems - this.minItems + 1));

        while (this.possibleItems.length < itemCount) {
            this.currentItems.push(this.possibleItems[Math.floor(Math.random() * (this.possibleItems.length + 1))]);
        }
    }

    tearDown() {
        // Only remove all of the items if we plan to refill it.
        if (this.refills) {
            this.currentItems = [];
        }
    }
}

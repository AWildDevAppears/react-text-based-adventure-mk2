export default class Item {
    constructor(item) {
        this.id = item.id;
        this.type = item.type;

        this.description = item.description;

        this.name = item.name;
        this.isKeyItem = item.isKeyItem;
        this.value = item.value;
        this.weight = item.weight;
    }
}

export default class Item {
    constructor(item) {
        this.id = item.id;
        this.type = item.type;

        this.name = item.name;
        this.isKeyItem = item.isKeyItem;
        this.value = item.value;
        this.weight = item.weight;
    }
}

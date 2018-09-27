export default class Item {
    id = '';
    type = '';
    description = '';
    name = '';
    isKeyItem = false;
    value = 0;
    weight = 0;

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

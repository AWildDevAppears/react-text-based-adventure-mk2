export default class Trader {
    balance = 0;
    name = '';
    inventory = [];

    constructor(trader) {
        this.name = trader.name;
        this.inventory = trader.inventory;
        this.balance = trader.money || 0; // Containers don't have a balance.
    }
}

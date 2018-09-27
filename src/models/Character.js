import Pawn from "./abstract/Pawn";
import Inventory from "./Inventory";

export default class Character extends Pawn {
    // name
    forename = ''; // TODO: make this just one name for the player
    surname = '';

    equipment = {
        head: undefined,
        legs: undefined,
        chest: undefined,
        hands: undefined,
        feet: undefined,
        weapon: undefined,
    };

    // inventory
    inventory = new Inventory();
    maxItems = 0;

    money = 0;

    // Stats are between 0 - 20
    stats = {
        awareness: 0, // How likely you are to notice things
        charisma: 0, // How well you will do in speech checks
        dexterity: 0, // How fast you are / chance to dodge
        endurance: 0, // How long you can maintain abilities
        intelligence: 0, // Crafting / salvage chance
        luck: 0, // Boosts everything in a minor way
        strength: 0, // Increases damage output
        resilience: 0, // Decreases damage taken
    }

    // An array of all of the modifiers that change our player in some way (e.g. Buffs and De-buffs)
    modifiers = [];

    get name() {
        return `${this.forename} ${this.surname}`;
    }

    get damage() {
        // TODO: implement strength modifiers
        if (this.equipment.weapon && this.equipment.weapon !== '') {
            const weapon = this.equipment.weapon;

            return Math.floor(
                Math.random() * (weapon.damageMax - weapon.damageMin + 1)
            ) + weapon.damageMin;
        } else {
            return 0;
        }
    }

    constructor(playerObject) {
        super(playerObject);

        if (!playerObject) return;

        this.forename = playerObject.forename;
        this.surname = playerObject.surname;

        this.equipment = playerObject.equipment;
        this.inventory = new Inventory(playerObject.inventory); // TODO: This needs to be a real inventory
        this.maxItems = playerObject.maxItems;

        this.money = playerObject.money;

        this.stats = playerObject.stats;
        this.modifiers = playerObject.modifiers;
    }

    equipItemFromInventory(item) {
        let oldItem;

        switch (item.type) {
            case 'weaponMelee':
            case 'weaponRanged':
                oldItem = this.equipment.weapon;
                this.equipment.weapon = item;
            break;
            case 'armorBoots':
                oldItem = this.equipment.feet;
                this.equipment.feet = item;
            break;
            case 'armorChest':
                oldItem = this.equipment.chest;
                this.equipment.chest = item;
            break;
            case 'armorGloves':
                oldItem = this.equipment.hands;
                this.equipment.hands = item;
            break;
            case 'armorHead':
                oldItem = this.equipment.head;
                this.equipment.head = item;
            break;
            case 'armorLegs':
                oldItem = this.equipment.legs;
                this.equipment.legs = item;
            break;
        }

        this.inventory.removeItems(item);

        if (oldItem !== undefined) {
            this.inventory.putItems(oldItem);
        }
    }
}

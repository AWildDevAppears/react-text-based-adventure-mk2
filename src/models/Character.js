import Pawn from "./abstract/Pawn";
import Inventory from "./Inventory";

export default class Character extends Pawn {
    // name
    forename = '';
    surname = '';

    equipment = {
        head: undefined,
        legs: undefined,
        chest: undefined,
        hands: undefined,
        feet: undefined,
        weapon: undefined,
    }

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
}

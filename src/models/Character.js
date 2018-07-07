import Pawn from "./Pawn";

export default class Character extends Pawn {
    // name
    forename = 'Bill';
    surname = 'Clinton';

    equipment = {
        head: undefined,
        legs: undefined,
        chest: undefined,
        hands: undefined,
        feet: undefined,
        weapon: undefined,
    }

    // inventory
    inventory = [];
    maxItems = 0;

    money = 0;

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
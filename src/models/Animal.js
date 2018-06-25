import Pawn from "./Pawn";

export default class Animal extends Pawn {
    modifier  = '';
    breed = '';

    damageMin = 0;
    damageMax = 0;

    get name() {
        if (this.modifier && this.modifier !== '') {
            return `${modifier} ${breed}`;
        }
        return breed;
    }

    get damage() {
        return Math.floor(
            Math.random() * (this.damageMax - this.damageMin + 1)
        ) + this.damageMin;
    }
}
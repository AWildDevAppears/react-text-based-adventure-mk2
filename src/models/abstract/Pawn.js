export default class Pawn {
    // image
    image = '';

    // health
    health = 100;
    healthMax = 100;

    // stamina
    stamina = 50;
    staminaMax = 50;

    level = 1;

    get name() {
        return '';
    }

    get damage() {
        return 0;
    }

    constructor(pawnObject) {
        if (!pawnObject) return;

        this.level = pawnObject.level;

        this.health = pawnObject.health;
        this.healthMax = pawnObject.healthMax;

        this.stamina = pawnObject.stamina;
        this.staminaMax = pawnObject.staminaMax;

        this.image = pawnObject.image;
    }
}
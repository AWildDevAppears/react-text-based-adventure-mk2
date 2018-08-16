import Item from "./abstract/Item";

export default class WeaponRanged extends Item {
    constructor(weapon) {
        super(weapon);

        this.subtype = weapon.subtype
        this.damageMinimum = weapon.damageMinimum;
        this.damageMaximum = weapon.damageMaximum;

        this.magasineSize = weapon.magasineSize;
        this.roundsPerSecond = weapon.roundsPerSecond;
        this.roundsPerBurst = weapon.roundsPerBurst;
        this.reloadSpeed = weapon.reloadSpeed;
        this.range = weapon.range;
        this.ammoType = weapon.ammoType;
    }
}

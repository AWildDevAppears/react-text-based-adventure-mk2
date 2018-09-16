import Item from "./abstract/Item";

export default class WeaponMelee extends Item {
    constructor(weapon) {
       super(weapon);

       this.subtype = weapon.subtype
       this.damageMinimum = weapon.damageMinimum;
       this.damageMaximum = weapon.damageMaximum;
    }
}

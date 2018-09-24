export default class Zone {
    id = '';
    name = '';
    locations = [];
    variables = {};

    constructor(zoneObject) {
        this.id = zoneObject.sys.id;
        this.name = zoneObject.fields.name;
        this.locations = zoneObject.fields.locations.map((loc) => loc.sys.id);
        this.variables = zoneObject.fields.variables;
    }
}
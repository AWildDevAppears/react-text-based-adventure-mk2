import DataBuilderService from "../services/DataBuilderService";

export default class Location {
    name = '';
    combatChance = 0;

    scenes = [];

    locationToEast = '';
    distanceToEastLocation = 0;

    locationToWest = '';
    distanceToWestLocation = 0;

    locationToSouth = '';
    distanceToSouthLocation = 0;

    locationToNorth = '';
    distanceToNorthLocation = 0;

    // Scenes
    currentScene = {};

    constructor(locationObject) {
        this.id = locationObject.sys.id;

        this.name =  locationObject.fields.name;
        this.combatChance = locationObject.fields.combatChance;

        if (locationObject.fields.locationToEast) {
            this.locationToEast = locationObject.fields.locationToEast.sys.id;
            this.distanceToEastLocation = locationObject.fields.distanceToEastLocation;
        }

        if (locationObject.fields.locationToWest) {
            this.locationToWest = locationObject.fields.locationToWest.sys.id;
            this.distanceToWestLocation = locationObject.fields.distanceToWestLocation;
        }

        if (locationObject.fields.locationToSouth) {
            this.locationToSouth = locationObject.fields.locationToSouth.sys.id;
            this.distanceToSouthLocation = locationObject.fields.distanceToSouthLocation;
        }

        if (locationObject.fields.locationToNorth) {
            this.locationToNorth = locationObject.fields.locationToNorth.sys.id;
            this.distanceToNorthLocation = locationObject.fields.distanceToNorthLocation;
        }

        if (locationObject.fields.randomScenes) {
            this.scenes = locationObject.fields.randomScenes.map((scene) => scene.sys.id);
        }
    }

    getScene() {
        // TODO: Check the zone for any variables, then see if any scenes should take precedence because of those variables.
        let sceneLink = this.scenes[Math.floor(Math.random() * this.scenes.length)];
        return DataBuilderService.getScene(sceneLink)
           .then((scene) => {
               this.currentScene = scene;
           });
    }
}

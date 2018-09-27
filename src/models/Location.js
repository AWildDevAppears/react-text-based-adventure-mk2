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

    getScene(zone) {
        return Promise.all(this.scenes.map((scene) => DataBuilderService.getScene(scene)))
            .then((...scenes) => {
                let [s] = scenes

                const variableScenes = s.filter((scene) => Object.keys(scene.conditions).length > 0);
                const cleanScenes = s.filter((scene) => Object.keys(scene.conditions).length === 0);

                if (variableScenes.length > 0) {
                    variableScenes.forEach((scene) => {
                        for (let k in zone.variables) {
                            const val = zone.variables[k];
                            if (scene.conditions[k]) {
                                const cond = scene.conditions[k];

                                let isCorrectScene = false;

                                switch (cond.operand) {
                                    case '==':
                                        isCorrectScene = cond.value === val;
                                        break;
                                    case '!=':
                                        isCorrectScene = cond.value !== val;
                                        break;
                                    case '>':
                                        isCorrectScene = cond.value > val;
                                        break;
                                    case '<':
                                        isCorrectScene = cond.value < val;
                                        break;
                                    case '<=':
                                        isCorrectScene = cond.value <= val;
                                        break;
                                    case '>=':
                                        isCorrectScene = cond.value >= val;
                                        break;
                                    }

                                if (isCorrectScene) {
                                    this.currentScene = scene;
                                }
                            }
                        }
                    });
                    return;
                }

                const scene = cleanScenes[Math.floor(Math.random() * cleanScenes.length)];
                this.currentScene = scene;
            });
    }
}

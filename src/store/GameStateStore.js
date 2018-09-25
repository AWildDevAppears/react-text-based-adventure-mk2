import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

import APIService from '../services/APIService';

import SaveObject from '../models/save/SaveObject';
import Character from '../models/Character';
import Location from '../models/Location';
import CachingService from '../services/CachingService';
import DataBuilderService from '../services/DataBuilderService';
import Scene from '../models/Scene';

export const GAME_STATE_ACTIONS = {
    SAVE_GAME: 'SAVE_GAME',
    LOAD_GAME: 'LOAD_GAME',
    NEW_GAME: 'NEW_GAME',
    GAME_STATE_HAS_DATA: 'GAME_STATE_HAS_DATA',
    GAME_STATE_UPDATE_ALL: 'GAME_STATE_UPDATE_ALL',
    GAME_CHANGE_LOCATION: 'CHANGE_LOCATION',

    GAME_CHANGE_ZONE: 'actionChangeZone',
        // zone = id
        // fixedTime = integer
        // incrementTime = integer
    ZONE_ADD_VARIABLE: 'actionSetVariable',
        // prop = string
        // value = boolean | integer | string
        // scene = id
    CHANGE_SCENE: 'actionChangeScene',
        // scene = id
        // fixedTime = integer
        // incrementTime = integer
    LOOT_CONTAINER: 'actionLootContainer',
        // container = id
    TAKE_DAMAGE: 'actionTakeDamaqe',
        // scene = id
        // damage = number
};

export default new class GameStateStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        let player = new Character();

        // TODO: Replace this with the real player
        player.forename = 'Jennifer';
        player.surname = 'Bloggs';

        return {
            ...SaveObject,
            zone: {},
            location: {},
            player,
        }
    }

    reduce(state, action) {
        let s = { ...state };

        let zone = { ...s.zone };
        let loc = { ...s.location};

        switch (action.type) {
            case GAME_STATE_ACTIONS.NEW_GAME:
                APIService.getStartingLocation()
                    .then((res) => {
                        s.zone = res.zone;
                        s.location = new Location(res.location);

                        return CachingService.update('Zone', s.zone.id, s.zone)
                            .then(() => s.location.getScene(s.zone));
                    })
                    .then(() => {
                        Dispatcher.dispatch({
                            type: GAME_STATE_ACTIONS.GAME_STATE_HAS_DATA,
                            state: s,
                        });
                    });
                break;
            case GAME_STATE_ACTIONS.GAME_STATE_HAS_DATA:
                s = action.state;
                break;
            case GAME_STATE_ACTIONS.GAME_CHANGE_LOCATION:
                DataBuilderService.getLocation(action.id)
                    .then((loc) => {
                        s.location = loc;
                        return s.location.getScene(s.zone);
                    })
                    .then(() => {
                        Dispatcher.dispatch({
                            type: GAME_STATE_ACTIONS.GAME_STATE_HAS_DATA,
                            state: s,
                        });
                    })
                break;
            case GAME_STATE_ACTIONS.SAVE_GAME:
                console.log(action);
                SaveObject.id = 'xxxxxxxxx';
                SaveObject.player = action.player;
                SaveObject.location = action.location;
                SaveObject.zone = action.zone;

                SaveObject.save();
                break;
            case GAME_STATE_ACTIONS.LOAD_GAME:
                // TODO:
                break;
            case GAME_STATE_ACTIONS.GAME_CHANGE_ZONE:
                // TODO:
                break;
            case GAME_STATE_ACTIONS.ZONE_ADD_VARIABLE:


                if (!zone.variables) {
                    zone.variables = {};
                }

                // Values from actions need to be sanitised, as they are strings.
                // This is more commonly seen on Scenes.
                zone.variables[action.params.prop] = Scene.convertValue(action.params.value);
                s.zone = zone;

                CachingService.update('Zone', s.zone.id, s.zone)
                    .then(() => DataBuilderService.getScene(action.params.scene))
                    .then((scene) => {
                        loc.currentScene = scene;
                        s.location = loc;

                        Dispatcher.dispatch({
                            type: GAME_STATE_ACTIONS.GAME_STATE_HAS_DATA,
                            state: s,
                        });
                    });
                break;
            case GAME_STATE_ACTIONS.CHANGE_SCENE:
                DataBuilderService.getScene(action.params.scene)
                    .then((scene) => {
                        loc.currentScene = scene;
                        s.location = loc;

                        Dispatcher.dispatch({
                            type: GAME_STATE_ACTIONS.GAME_STATE_HAS_DATA,
                            state: s,
                        });
                    });
                break;
            case GAME_STATE_ACTIONS.TAKE_DAMAGE:
                // TODO:
                break;
            default:
        }

        return s;
    }

    updateZone(data) {
        CachingService.update('Zone', data.id, {
            ...data,
        });
    }
}();

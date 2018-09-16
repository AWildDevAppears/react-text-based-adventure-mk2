import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

import APIService from '../services/APIService';

import SaveObject from '../models/save/SaveObject';
import Character from '../models/Character';
import Location from '../models/Location';
import DBService from '../services/DBService';
import DataBuilderService from '../services/DataBuilderService';

export const GAME_STATE_ACTIONS = {
    SAVE_GAME: 'SAVE_GAME',
    LOAD_GAME: 'LOAD_GAME',
    NEW_GAME: 'NEW_GAME',
    GAME_STATE_HAS_DATA: 'GAME_STATE_HAS_DATA',
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
                        return s.location.getScene();
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
                        Dispatcher.dispatch({
                            type: GAME_STATE_ACTIONS.GAME_STATE_HAS_DATA,
                            state: s,
                        });
                    });
                break;
            case GAME_STATE_ACTIONS.SAVE_GAME:
                // TODO:
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

                zone.variables[action.params.prop] = action.params.value;
                s.zone = zone;

                // TODO: Store this in the database

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
        DBService.update('Zone', data.id, {
            ...data,
        });
    }
}();

import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';
import SaveObject from '../models/save/SaveObject';
import { ZoneActions } from './ZoneStore';
import APIService from '../services/APIService';
import Character from '../models/Character';
import Location from '../models/Location';

export const GAME_STATE_ACTIONS = {
    SAVE_GAME: 'SAVE_GAME',
    LOAD_GAME: 'LOAD_GAME',
    NEW_GAME: 'NEW_GAME',
    GAME_STATE_HAS_DATA: 'GAME_STATE_HAS_DATA',
};

export default new class GameStateStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            ...SaveObject,
            player: new Character(),
        }
    }

    reduce(state, action) {
        let s = { ...state };

        switch (action.type) {
            case GAME_STATE_ACTIONS.NEW_GAME:
                APIService.getStartingLocation()
                    .then((res) => {
                        s.zone = res.zone;
                        s.location = new Location(res.location);
                        ZoneActions.changeZone(s.zone);

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
            default:
        }

        return s;
    }
}();

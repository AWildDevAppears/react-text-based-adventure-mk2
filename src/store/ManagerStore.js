import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';
import { GAME_STATE_ACTIONS } from './GameStateStore';

export const MANAGER_VIEWS = {
    SHOW_SCENE: 'SHOW_SCENE',
    SHOW_INVENTORY: 'SHOW_INVENTORY',
    SHOW_SETTINGS: 'SHOW_SETTINGS',
    SHOW_CHARACTER: 'SHOW_CHARACTER',
}

export default new class ManagerStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            view: MANAGER_VIEWS.SHOW_SCENE,
            dateTime: Date.now(), // TODO: replace with actual game start date
        }
    }

    reduce(state, action) {
        let s = { ...state };

        switch(action.type) {
            // TODO: Show the trade view for monetary trades
            case 'TRADING_STORE_HAS_DATA':
                s.view = MANAGER_VIEWS.SHOW_TRADE_VIEW;
                break;
            case MANAGER_VIEWS.SHOW_INVENTORY:
                s.view = MANAGER_VIEWS.SHOW_INVENTORY;
                break;
            case MANAGER_VIEWS.SHOW_CHARACTER:
                s.view = MANAGER_VIEWS.SHOW_CHARACTER;
                break;
            case MANAGER_VIEWS.SHOW_SETTINGS:
                s.view = MANAGER_VIEWS.SHOW_SETTINGS;
                break;
            case MANAGER_VIEWS.SHOW_SCENE:
                s.view = MANAGER_VIEWS.SHOW_SCENE;
                break;
            case GAME_STATE_ACTIONS.CHANGE_SCENE:
                if (action.incrementTime) {
                    s.dateTime += action.incrementTime;
                }
                break;
            case 'SCENE_PROCESS_COMPLETED':
                s.view = MANAGER_VIEWS.SHOW_SCENE;
                break;
            default:
        }

        return s;
    }
}();

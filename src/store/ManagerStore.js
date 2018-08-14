import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

export const MANAGER_VIEWS = {
    SHOW_SCENE: 'SHOW_SCENE',
    SHOW_INVENTORY: 'SHOW_INVENTORY',
    SHOW_SETTINGS: 'SHOW_SETTINGS',
    SHOW_CHARACTER: 'SHOW_CHARACTER',
    SHOW_TRADE_VIEW: 'SHOW_TRADE_VIEW',
}

export default class ManagerStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            view: MANAGER_VIEWS.SHOW_SCENE,
        }
    }

    reduce(state, action) {
        let s = { ...state };

        switch(action.type) {
            case MANAGER_VIEWS.SHOW_TRADE_VIEW:
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
                s.view = SHOW_SCENE;
                break;
            case 'SCENE_PROCESS_COMPLETED':
                s.view = SHOW_SCENE;
                break;
        }

        return s;
    }
}

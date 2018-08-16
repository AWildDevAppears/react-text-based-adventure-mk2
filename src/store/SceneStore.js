import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

import DBService from '../services/DBService';

import Scene from '../models/Scene';
import { SCENE_ACTIONS } from '../models/SceneAction';
import DataBuilderService from '../services/DataBuilderService';

export const SceneActions = {
    updateScene(scene) {
        Dispatcher.dispatch({
            type: SCENE_ACTIONS.CHANGE_SCENE,
            params: {
                scene,
            }
        })
    }
}

export default new class SceneStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return new Scene();
    }

    reduce(state, action) {
        let s = { ...state };

        switch(action.type) {
            case SCENE_ACTIONS.CHANGE_SCENE:
                this.getScene(action.params.scene)
                    .then((scene) => {
                        Dispatcher.dispatch({
                            type: 'SCENE_PROCESS_COMPLETED',
                            state: scene,
                        });
                    })
                break;
            case 'SCENE_PROCESS_COMPLETED':
                s = action.state;
                break;
            default:
        }
        return s;
    }

    getScene(id) {
        return DataBuilderService.getScene(id);
    }
}();

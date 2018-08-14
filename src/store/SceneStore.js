import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

import DBService from '../services/DBService';
import APIService from '../services/APIService';

import Scene from '../models/Scene';
import Container from '../models/Container';
import BodyCopy from '../models/BodyCopy';
import SceneAction, { SCENE_ACTIONS } from '../models/SceneAction';

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
            case SCENE_ACTIONS.LOOT_CONTAINER:
                this.getContianer(action.params.contianer)
                    .then((container) => {
                        // Push the container to the trade menu and show it.
                    })
            case 'SCENE_PROCESS_COMPLETED':
                s = action.state;
                this.saveState(s);
                break;
        }
        return s;
    }

    saveState(state) {
        if (state.id === '') {
            return;
        }

        // state should be a valid Scene object, so we can just store it.
        DBService.update('Scene', state.id, state);
    }

    // TODO: Move this to its own store
    getContianer(id) {
        return DBService.read('Container', id)
            .then((contianer) => {
                if (!container) {
                    return Promise.reject();
                }
                return contianer;
            })
            .catch(() => {
                return APIService.client.getEntry(id)
                    .then((containerObject) => {
                        let contiainer = new Container();

                        contianer.id = contianerObject.sys.id;
                        contianer.name = containerObject.fields.identifier;
                        contianer.maxItems = containerObject.fields.maxItems;
                        container.minItems = containerObject.fields.minItems;
                        container.refills = containerObject.fields.refills;
                        container.possibleItems = containerObject.fields.possibleItems
                            .map((item) => item.sys.id);

                        return DBService.update('Container', id, container);
                    })
            });
    }

    getScene(id) {
        return DBService.read('Scene', id)
            .then((scene) => {
                if (!scene) {
                    return Promise.reject();
                }
                return scene;
            })
            .catch(() => {
                return APIService.client.getEntry(id)
                    .then((sceneObject) => {
                        let scene = new Scene();

                        scene.id = sceneObject.sys.id;
                        scene.title = sceneObject.fields.title;
                        scene.heading = sceneObject.fields.heading;

                        let bodyPromises = sceneObject.fields.body.map((bodyLink) => {
                            return APIService.client.getEntry(bodyLink.sys.id);
                        });

                        let actionPromises = [];
                        if (sceneObject.fields.actions) {
                            actionPromises = sceneObject.fields.actions.map((actionLink) => {
                                return APIService.client.getEntry(actionLink.sys.id);
                            });
                        }

                        return Promise.all(bodyPromises)
                            .then((...body) => {
                                scene.body = body.map(BodyCopy.fromData);
                                return Promise.all(actionPromises)
                            })
                            .then((...actions) => {
                                // Filter out empty actions (when there are no actions).
                                actions = actions.filter(action => action.length > 0);

                                if (actions.length > 0) {
                                    scene.actions = actions.map(SceneAction.fromData);
                                }

                                // Store the result in our DB so we don't have to do
                                // this all again.
                                return DBService.update('Scene', scene.id, scene);
                            })
                            .then(() => {
                                return scene;
                            });
                    });
            });

    }
}();

import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

import DBService from '../services/DBService';
import APIService from '../services/APIService';

import Scene from '../models/Scene';
import BodyCopy from '../models/BodyCopy';
import SceneAction from '../models/SceneAction';

export const SceneActions = {
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

        // handle actions here

        this.cacheState(s);
        return s;
    }

    cacheState(state) {
        if (state.id === '') {
            return;
        }

        // state should be a valid Scene object, so we can just store it.
        DBService.update('Scene', state.id, state);
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
                                scene.actions = actions.map(SceneAction.fromData);

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

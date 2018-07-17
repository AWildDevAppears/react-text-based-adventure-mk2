import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

import DBService from '../services/DBService';
import APIService from '../services/APIService';

import Scene from '../models/Scene';
import BodyCopy from '../models/BodyCopy';

const SCENE_ACTIONS = {
};

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
        this.cacheState(s);

        return s;
    }

    cacheState(state) {
        if (state.id === '') {
            return;
        }

        // DBService.update('Scene', state.id, {});
    }

    getScene(id) {
        return DBService.read('Scene', id)
            .catch((err) => {
                return APIService.client.getEntry(id)
                    .then((sceneObject) => {
                        let scene = new Scene();

                        scene.id = sceneObject.sys.id;
                        scene.title = sceneObject.fields.title;
                        scene.heading = sceneObject.fields.heading;

                        let bodyPromises = sceneObject.fields.body.map((bodyLink) => {
                            return APIService.client.getEntry(bodyLink.sys.id);
                        });

                        let actionPromises = sceneObject.fields.actions.map((actionLink) => {
                            return APIService.client.getEntry(actionLink.sys.id);
                        });

                        return Promise.all(bodyPromises)
                            .then((...body) => {
                                scene.body = body.map(BodyCopy.fromData);
                                return Promise.all(actionPromises)
                            })
                            .then((...actions) => {
                                scene.actions = actions;

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
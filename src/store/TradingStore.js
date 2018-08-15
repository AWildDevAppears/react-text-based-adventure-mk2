import { ReduceStore } from 'flux/utils';

import DBService from '../services/DBService';
import APIService from '../services/APIService';
import Dispatcher from './Dispatcher';

import { SCENE_ACTIONS } from '../models/SceneAction';
import  Container from '../models/Container';

export default class TradingStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            trader: {},
            player: {},
            isMonetaryTrade: false,
        };
    }

    reduce(state, action) {
        let s = { ...state };

        switch(action.type) {
            case SCENE_ACTIONS.LOOT_CONTAINER:
                this.getContianer(action.params.container)
                    .then((container) => {
                        s.trader = container;
                        s.isMonetaryTrade = false;
                    });
                break;
            default:
        }
        return s;
    }

    getContianer(id) {
        return DBService.read('Container', id)
            .then((container) => {
                if (!container) {
                    return Promise.reject();
                }
                return container;
            })
            .catch(() => {
                return APIService.client.getEntry(id)
                    .then((containerObject) => {
                        let container = new Container();

                        container.id = containerObject.sys.id;
                        container.name = containerObject.fields.identifier;
                        container.maxItems = containerObject.fields.maxItems;
                        container.minItems = containerObject.fields.minItems;
                        container.refills = containerObject.fields.refills;
                        container.possibleItems = containerObject.fields.possibleItems
                            .map((item) => item.sys.id);

                        return DBService.update('Container', id, container);
                    })
            });
    }

    getTrader(id) {
        // TODO: Implement this
    }
}

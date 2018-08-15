import { ReduceStore } from 'flux/utils';

import DBService from '../services/DBService';
import APIService from '../services/APIService';
import Dispatcher from './Dispatcher';

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

    getTrader(id) {
        // TODO: Implement this
    }
}

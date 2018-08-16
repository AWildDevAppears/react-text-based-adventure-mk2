import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

import { SCENE_ACTIONS } from '../models/SceneAction';

import DataBuilderService from '../services/DataBuilderService';

export default new class TradingStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            trader: {},
            isMonetaryTrade: false,
        };
    }

    reduce(state, action) {
        let s = { ...state };

        switch(action.type) {
            case SCENE_ACTIONS.LOOT_CONTAINER:
                this.getContainer(action.params.container)
                    .then((container) => {
                        container.buildUp().then(() => {
                            s.trader = container;
                            s.isMonetaryTrade = false;

                            Dispatcher.dispatch({
                                type: 'TRADING_STORE_HAS_DATA',
                                state: s,
                            });
                        });
                    });
                break;
            case 'TRADING_STORE_HAS_DATA':
                s = {
                    ...s,
                    ...action.state,
                };
            default:
        }
        return s;
    }

    getContainer(id) {
       return DataBuilderService.getContainer(id);
    }

    getTrader(id) {
        // TODO: Implement this
    }
}();

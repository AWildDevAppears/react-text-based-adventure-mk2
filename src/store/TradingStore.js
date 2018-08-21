import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

import Trader from '../models/Trader';

import DataBuilderService from '../services/DataBuilderService';
import { GAME_STATE_ACTIONS } from './GameStateStore';

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
            case GAME_STATE_ACTIONS.LOOT_CONTAINER:
                this.getContainer(action.params.container)
                    .then((container) => {
                        container.buildUp().then(() => {
                            s.trader = new Trader(container);
                            s.isMonetaryTrade = false;

                            Dispatcher.dispatch({
                                type: 'TRADING_STORE_HAS_DATA',
                                state: s,
                            });
                        });
                    });
                break;
            case 'TRADE_VIEW_UPDATE_PLAYER':
                s.player = new Trader(action.player);
                break;
            case 'MOVE_ITEM_TO_TRADER':
                if (!s.player) {
                    s.player = new Trader(action.player);
                }

                let player1 = { ...s.player };
                let trader1 = { ...s.trader };

                if (s.isMonetaryTrade) {
                    // Perform monetary swap
                }

                player1.inventory.removeItems(action.item);
                trader1.inventory.putItems(action.item);

                s.player = player1;
                s.trader = trader1;

                // commit change?
                break;
            case  'MOVE_ITEM_TO_PLAYER':
                if (!s.player) {
                    s.player = new Trader(action.player);
                }

                let player2 = { ...s.player };
                let trader2 = { ...s.trader };

                if (s.isMonetaryTrade) {
                    // Perform monetary swap
                }

                trader2.inventory.removeItems(action.item);
                player2.inventory.putItems(action.item);

                s.player = player2;
                s.trader = trader2;

                // commit change?
                break;
            case 'TRADING_STORE_HAS_DATA':
                s = {
                    ...s,
                    ...action.state,
                };
                break;
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

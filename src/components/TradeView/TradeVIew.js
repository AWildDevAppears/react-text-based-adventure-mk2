import React, { Component } from 'react';
import { Container } from 'flux/utils';

import TradingStore from '../../store/TradingStore';

import Trader from '../../models/Trader';

export class TradeView extends Component {
    static getStores() {
        return [TradingStore];
    }

    static calculateState(prevState) {
        let store = TradingStore.getState();

        return {
            ...prevState,
            isMonetaryTrade: store.isMonetaryTrade,
            player: new Trader(store.player),
            trader: new Trader(store.trader),
        };
    }

    render() {
        return (
            <div className="trade">
                { this.showProfileFor(this.state.player) }
                { this.showProfileFor(this.state.trader) }
            </div>
        );
    }

    showBalanceFor = (trader) => {
        let balanceBlock = this.state.isMonetaryTrade ? (<h3>trader.balance</h3>) : '';

        return (
            <div className="trade__panel">
                <h2>{ trader.name }</h2>
                { balanceBlock }
                <div className="trade__list">
                    { trader.inventory.getAllItems().map(this.createInventoryCell) }
                </div>
            </div>
        );
    }

    createInventoryCell = (item) => {
        return (
            <div>
                I am Item
            </div>
        );
    }
}

const tradeView = Container.create(TradeView);
export default tradeView;

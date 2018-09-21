import React, { Component } from 'react';
import { Container } from 'flux/utils';

import TradingStore from '../../store/TradingStore';

import Dispatcher from '../../store/Dispatcher';
import Trader from '../../models/Trader';

import './tradingView.css';
import ItemCard from '../ItemCard/ItemCard';

export class TradeView extends Component {
    state = {
        player: new Trader(this.props.player),
        trader: undefined,
        isMonetaryTrade: false,
    }

    static getStores() {
        return [TradingStore];
    }

    static calculateState(prevState) {
        return {
            ...prevState,
            ...TradingStore.getState(),
        };
    }
    render() {
        return (
            <div className="trade">
                { this.showProfileFor(this.state.player, 'left') }
                { this.showProfileFor(this.state.trader, 'right') }
            </div>
        );
    }

    showProfileFor = (trader, side) => {
        if (!trader) return;

        let balanceBlock = this.state.isMonetaryTrade ? (<h3>trader.balance</h3>) : '';
        let inventoryItems = this.createInventoryCellsFor(trader, side);

        return (
            <div className="trade__panel">
                <h2>{ trader.name }</h2>
                { balanceBlock }
                <div className="trade__list">
                    { inventoryItems }
                </div>
            </div>
        );
    }

    createInventoryCellsFor = (trader, side) => {
        return trader.inventory ? trader.inventory.getAllItems().map(
            (item, index) => (<ItemCard key={index} for={item} onClick={() => this.transferItem(item, side) }></ItemCard>)
        ) : [];
    }

    transferItem = (item, side) => {
        if (side === 'left') {
            Dispatcher.dispatch({
                type: 'MOVE_ITEM_TO_TRADER',
                player: this.state.player,
                item,
            });
        } else {
            Dispatcher.dispatch({
                type: 'MOVE_ITEM_TO_PLAYER',
                player: this.state.player,
                item,
            });
        }
    }
}

const tradeView = Container.create(TradeView);
export default tradeView;

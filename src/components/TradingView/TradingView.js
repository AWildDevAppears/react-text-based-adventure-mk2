import React, { Component } from 'react';
import { Container } from 'flux/utils';

import TradingStore from '../../store/TradingStore';

import Dispatcher from '../../store/Dispatcher';
import Trader from '../../models/Trader';

import './tradingView.css';

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
        return trader.inventory ? trader.inventory.getAllItems().map((item, index) => {
            let icon = '';

            switch (item.type) {
                case 'weaponMelee':
                    icon = (<i className="fas fa-screwdriver"></i>);
                    break;
                case 'weaponRanged':
                    icon = (<i className="fas fa-bullseye"></i>);
                    break;
                default:
                    icon = (<i className="fas fa-paperclip"></i>);
                    break;
            }

            return (
                <div className="item" key={ index } onClick={() => this.transferItem(item, side) }>
                    <h4 className="item__name">
                        { icon }
                        { item.name }
                    </h4>
                    <div className="item__value">
                        <i className="fas fa-money-bill"></i>
                        { item.value }
                    </div>
                    <div className="item__weight">
                        <i className="fas fa-weight-hanging"></i>
                        { item.weight }
                    </div>
                </div>
            )
        }) : [];
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

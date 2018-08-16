import React, { Component } from 'react';
import { Container } from 'flux/utils';

import TradingStore from '../../store/TradingStore';

import Trader from '../../models/Trader';

import './tradingView.css';

export class TradeView extends Component {
    state = {
        player: undefined,
        trader: undefined,
        isMonetaryTrade: false,
    }

    static getStores() {
        return [TradingStore];
    }

    static calculateState(prevState) {
        let store = TradingStore.getState();

        return {
            ...prevState,
            isMonetaryTrade: store.isMonetaryTrade,

            trader: new Trader(store.trader),
        };
    }
    render() {
        let player = new Trader(this.props.player);
        return (
            <div className="trade">
                { this.showProfileFor(player) }
                { this.showProfileFor(this.state.trader) }
            </div>
        );
    }

    showProfileFor = (trader) => {
        if (!trader) return;

        let balanceBlock = this.state.isMonetaryTrade ? (<h3>trader.balance</h3>) : '';
        let inventoryItems = trader.inventory ? trader.inventory.getAllItems().map(this.createInventoryCell) : [];

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

    createInventoryCell = (item, index) => {
        let icon = '';

        switch (item.type) {
            case 'weaponMelee':
                icon = (<i class="fas fa-screwdriver"></i>);
                break;
            case 'weaponRanged':
                icon = (<i class="fas fa-bullseye"></i>);
                break;
            default:
                icon = (<i class="fas fa-paperclip"></i>);
                break;
        }

        return (
            <div className="item" key={ index }>
                <h4 className="item__name">
                    { icon }
                    { item.name }
                </h4>
                <div className="item__value">
                    <i class="fas fa-money-bill"></i>
                    { item.value }
                </div>
                <div className="item__weight">
                    <i class="fas fa-weight-hanging"></i>
                    { item.weight }
                </div>
            </div>
        );
    }
}

const tradeView = Container.create(TradeView);
export default tradeView;

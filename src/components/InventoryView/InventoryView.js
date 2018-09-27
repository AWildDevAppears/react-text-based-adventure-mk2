import React, { Component, Fragment } from 'react';

import ItemCard from '../ItemCard/ItemCard';
import Character from '../../models/Character';
import Dispatcher from '../../store/Dispatcher';

import './inventory-view.css';
import { GAME_STATE_ACTIONS } from '../../store/GameStateStore';

export default class InventoryView extends Component {
    state = {
        ...new Character(),
        currentItem: undefined,
    }

    static getDerivedStateFromProps(props, state) {
        if (props.for) {
            state = {
                ...state,
                player: props.for,
            }

            return state;
        }
    }

    render() {
        return (
            <Fragment>
                <div className="inventory-view">
                    {
                        this.state.player.inventory
                            .getAllItems()
                            .map((item, index) => <ItemCard
                                key={index}
                                for={item}
                                onClick={() => this.showMoreInformationFor(item)}
                            ></ItemCard>)
                    }
                </div>
                { this.moreInformationBlock() }
            </Fragment>
        )
    }

    showMoreInformationFor = (item) => {
        this.setState({
            ...this.state,
            currentItem: item,
        });
    }

    moreInformationBlock = () => {
        if (!this.state.currentItem) {
            return '';
        }

        const item = this.state.currentItem;
        let contextButtons = '';

        switch (item.type) {
            case 'weaponMelee':
            case 'weaponRanged':
                contextButtons = (
                    <Fragment>
                        <button type="button" onClick={ () => this.onEquipItem(item) }>Equip</button>
                        <button type="button" onClick={ () => this.onDropItem(item) }>Drop</button>
                    </Fragment>
                )
                break;
            default:
                contextButtons = (
                    <Fragment>
                        <button type="button" onClick={ () => this.onDropItem(item) }>Drop</button>
                    </Fragment>
                )
        }

        return (
            <div className="inventory__interations">
                <h2>{ item.name }</h2>
                <p>{ item.description }</p>

                { contextButtons }
            </div>
        )
    }

    onDropItem = (item) => {
        this.setState({
            ...this.state,
            currentItem: undefined,
        });

        Dispatcher.dispatch({
            type: GAME_STATE_ACTIONS.PLAYER_DROP_ITEM,
            player: this.state.player,
            item,
        });
    }

    onEquipItem = (item) => {
        this.setState({
            ...this.state,
            currentItem: undefined,
        });

        Dispatcher.dispatch({
            type: GAME_STATE_ACTIONS.PLAYER_EQUIP_ITEM,
            player: this.state.player,
            item,
        });
    }
}
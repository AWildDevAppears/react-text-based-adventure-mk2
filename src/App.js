import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Sidebar from './components/Sidebar/Sidebar';
import SceneViewer from './components/SceneViewer/SceneViewer';
import Modal from './components/Modal/Modal';
import TradingView from './components/TradingView/TradingView';

import ManagerStore, { MANAGER_VIEWS } from './store/ManagerStore';
import Dispatcher from './store/Dispatcher';

import './css/index.css'
import GameStateStore, { GAME_STATE_ACTIONS } from './store/GameStateStore';
import ItemCard from './components/ItemCard/ItemCard';
import StatusBlock from './components/StatusBlock/StatusBlock';


export class App extends Component {
    state = {
        location: undefined,
        zone: '',
        player: undefined,
    }

    static getStores() {
        return [ManagerStore, GameStateStore];
    }

    static calculateState(prevState) {
        return {
            ...prevState,
            ...GameStateStore.getState(),
            mgr: ManagerStore.getState(),
        };
    }

    render() {
        return (
            <div className="app">
                <StatusBlock for={ this.state.player }></StatusBlock>

                <Sidebar
                    date={ this.formatDate(this.state.mgr.dateTime) }
                    player={ this.state.player }
                    location={ this.state.location }
                    moveTo={ this.moveTo }
                    onInventoryButtonPressed={ this.onInventoryButtonPressed }
                    onCharacterButtonPressed={ this.onCharacterButtonPressed }
                    onSettingsButtonPressed={ this.onSettingsButtonPressed }

                />

                <SceneViewer
                    location={ this.state.location }
                />

                <Modal visible={ this.state.mgr.view === MANAGER_VIEWS.SHOW_INVENTORY }>
                    <h1>Inventory</h1>
                    { this.state.player.inventory.getAllItems().map((item, index) => <ItemCard key={index} for={item}></ItemCard>) }
                </Modal>

                <Modal visible={ this.state.mgr.view === MANAGER_VIEWS.SHOW_CHARACTER }>
                    <h1>Character</h1>
                </Modal>

                <Modal visible={ this.state.mgr.view === MANAGER_VIEWS.SHOW_SETTINGS }>
                    <h1>Options</h1>

                    <button type="button" onClick={this.onSaveButtonPressed}>Save</button>
                </Modal>

                <Modal visible={ this.state.mgr.view === MANAGER_VIEWS.SHOW_TRADE_VIEW }>
                    <TradingView player={ this.state.player } />
                </Modal>
            </div>
        );
    }

    componentDidMount() {
        Dispatcher.dispatch({
            type: GAME_STATE_ACTIONS.NEW_GAME,
        });
    }

    // @Pragma mark - end @Override

    onInventoryButtonPressed = () => {
        Dispatcher.dispatch({
            type: MANAGER_VIEWS.SHOW_INVENTORY,
        });
    }

    onCharacterButtonPressed = () => {
        Dispatcher.dispatch({
            type: MANAGER_VIEWS.SHOW_CHARACTER,
        });
    }

    onSettingsButtonPressed = () => {
        Dispatcher.dispatch({
            type: MANAGER_VIEWS.SHOW_SETTINGS,
        });
    }

    onSaveButtonPressed = () => {
        // TODO: Show a spinner until this completes
        Dispatcher.dispatch({
            type: GAME_STATE_ACTIONS.SAVE_GAME,
            player: this.state.player,
            location: this.state.location.id,
            zone: this.state.zone.id,
        });
    }

    formatDate = (date) => {
        return new Date(date).toLocaleString({
           year: 'numeric',
           month: 'long',
           day: 'numeric'
        })
    }
}

const app = Container.create(App);
export default app;

import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Sidebar from './components/Sidebar/Sidebar';
import SceneViewer from './components/SceneViewer/SceneViewer';
import Modal from './components/Modal/Modal';
import TradingView from './components/TradingView/TradingView';
import StatusBlock from './components/StatusBlock/StatusBlock';

import ManagerStore, { MANAGER_VIEWS } from './store/ManagerStore';
import GameStateStore, { GAME_STATE_ACTIONS } from './store/GameStateStore';
import Dispatcher from './store/Dispatcher';

import './css/index.css'


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
            <div className="app" className={ this.getMenuStatus() }>
                <StatusBlock for={ this.state.player }></StatusBlock>

                <Sidebar
                    date={ this.formatDate(this.state.mgr.dateTime) }
                    player={ this.state.player }
                    location={ this.state.location }
                    view={ this.state.mgr.view }
                />

                <SceneViewer
                    location={ this.state.location }
                />

                <Modal visible={ this.state.mgr.view === MANAGER_VIEWS.SHOW_SETTINGS }>
                    <h1>Options</h1>

                    <button type="button" onClick={this.onSaveButtonPressed}>Save</button>
                    <button type="button" onClick={this.onLoadButtonPressed}>Load</button>
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

    onSaveButtonPressed = () => {
        // TODO: Show a spinner until this completes
        Dispatcher.dispatch({
            type: GAME_STATE_ACTIONS.SAVE_GAME,
            player: this.state.player,
            location: this.state.location.id,
            zone: this.state.zone.id,
        });
    }

    onLoadButtonPressed = () => {
        Dispatcher.dispatch({
            type: GAME_STATE_ACTIONS.LOAD_GAME,
            id: 'xxxxxxxxx',
        });
    }

    formatDate = (date) => {
        return new Date(date).toLocaleString({
           year: 'numeric',
           month: 'long',
           day: 'numeric'
        })
    }

    getMenuStatus = () => {
        switch (this.state.mgr.view) {
            case MANAGER_VIEWS.HIDDEN:
                return '';
            default:
                return 'app app--open-left';
        }
    }
}

const app = Container.create(App);
export default app;

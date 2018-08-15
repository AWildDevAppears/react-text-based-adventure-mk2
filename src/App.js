import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Sidebar from './components/Sidebar/Sidebar';
import SceneViewer from './components/SceneViewer/SceneViewer';
import Modal from './components/Modal/Modal';
import { TradeView } from './components/TradeView/TradeView';

import DBService from './services/DBService';
import APIService from './services/APIService';

import { ZoneActions } from './store/ZoneStore';
import ManagerStore, { MANAGER_VIEWS } from './store/ManagerStore';
import Dispatcher from './store/Dispatcher';

import Character from './models/Character';

import './css/index.css'

class App extends Component {
    state = {
        location: undefined,
        zone: '',
        player: new Character(),
    }

    static getStores() {
        return [ManagerStore];
    }

    static calculateState(prevState) {
        return {
            ...prevState,
            mgr: ManagerStore.getState(),
        };
    }

    render() {
        return (
            <div className="app">
                <Sidebar
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
                </Modal>

                <Modal visible={ this.state.mgr.view === MANAGER_VIEWS.SHOW_CHARACTER }>
                    <h1>Character</h1>
                </Modal>

                <Modal visible={ this.state.mgr.view === MANAGER_VIEWS.SHOW_SETTINGS }>
                    <h1>Options</h1>
                </Modal>

                <Modal visible={ this.state.mgr.view === MANAGER_VIEWS.SHOW_TRADE_VIEW }>
                    <TradeView />
                </Modal>
            </div>
        );
    }

    componentDidMount() {
        APIService.getStartingLocation()
        .then((res) => {
            this.setState({
                ...this.state,
                ...res,
            });

            ZoneActions.changeZone(this.state.zone);
        });
    }

    // @Pragma mark - end @Override

    moveTo = (id) => {
        DBService.getLocationFromZone(this.state.zone, id).then((location) => {
            this.setState({
                ...this.state,
                location,
            });
        });
    }

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
}

const app = Container.create(App);
export default app;

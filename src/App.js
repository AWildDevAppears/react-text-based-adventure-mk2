import React, { Component } from 'react';

import Sidebar from './components/Sidebar/Sidebar';
import SceneViewer from './components/SceneViewer/SceneViewer';
import Modal from './components/Modal/Modal';

import DBService from './services/DBService';
import APIService from './services/APIService';

import { ZoneActions } from './store/ZoneStore';

import Character from './models/Character';

import './css/index.css'

class App extends Component {
    state = {
        location: undefined,
        zone: '',
        player: new Character(),
        showInventory: false,
        showOptions: false,
        showCharacter: false,
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


                <Modal visible={ this.state.showInventory }>
                    <h1>Inventory</h1>
                </Modal>

                <Modal visible={ this.state.showCharacter }>
                    <h1>Character</h1>
                </Modal>

                <Modal visible={ this.state.showOptions }>
                    <h1>Optionsh</h1>
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


    // TODO: Move these to ManagerStore
    onInventoryButtonPressed = () => {
        this.setState({
            showInventory: true,
        });
    }

    // TODO: Move these to ManagerStore
    onCharacterButtonPressed = () => {
        this.setState({
            showCharacter: true,
        });
    }

    // TODO: Move these to ManagerStore
    onSettingsButtonPressed = () => {
        this.setState({
            showOptions: true,
        });
    }
}

export default App;

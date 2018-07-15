import React, { Component } from 'react';

import Sidebar from './components/Sidebar/Sidebar';
import SceneViewer from './components/SceneViewer/SceneViewer';

import DBService from './services/DBService';
import APIService from './services/APIService';

import { ZoneActions } from './store/ZoneStore';

import Character from './models/Character';

import './index.css'

class App extends Component {
    state = {
        location: undefined,
        zone: '',
    }

    render() {
        return (
            <div className="app">
                <Sidebar
                    player={ new Character() }
                    location={ this.state.location }
                    moveTo={this.moveTo}
                />
                <SceneViewer
                    location={ this.state.location }
                />
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
}

export default App;

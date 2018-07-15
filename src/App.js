import React, { Component } from 'react';

import Sidebar from './components/Sidebar/Sidebar';

import APIService from './services/APIService';

import Character from './models/Character';

import './index.css'
import SceneViewer from './components/SceneViewer/SceneViewer';
import ZoneStore, { ZoneActions } from './store/ZoneStore';
import DBService from './services/DBService';

class App extends Component {
    state = {
        location: {
        },
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
        DBService.read('Zone', this.state.id, id).then((res) => {
            this.setState({
                ...this.state,
                location: res.map[id],
            });
        }).catch((err) => {
            APIService.client.getEntry(id).then((location) => {
                this.setState({
                    ...this.state,
                    location,
                });

                ZoneActions.changeLocation(
                    this.state.location.sys.id,
                    this.state.location,
                );
            })
        })

    }
}

export default App;

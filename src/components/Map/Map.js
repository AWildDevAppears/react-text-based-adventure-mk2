import React, { Component } from 'react';

import './map.css';
import Dispatcher from '../../store/Dispatcher';
import { GAME_STATE_ACTIONS } from '../../store/GameStateStore';

export default class Map extends Component {
    state = {
        here: {},
        north: '',
        south: '',
        east: '',
        west: '',
    };

    static getDerivedStateFromProps(props, state) {
        if (!props.location || !props.location.name) return state;

        state.here = props.location;
        state.east = {
            'data-loc': props.location.locationToEast,
        };
        state.west = {
            'data-loc': props.location.locationToWest,
        };
        state.north = {
            'data-loc': props.location.locationToNorth,
        };
        state.south = {
            'data-loc': props.location.locationToSouth,
        };

        return state;
    }

    render() {
        return (
            <div className="map">
                <div className="map__segment">
                </div>
                <div className="map__segment fas fa-arrow-up" { ...this.state.north } onClick={this.moveLocation} tabIndex="1">
                </div>
                <div className="map__segment">
                </div>
                <div className="map__segment fas fa-arrow-left" { ...this.state.west } onClick={this.moveLocation} tabIndex="1">
                </div>
                <div className="map__segment">
                    { this.state.here.name }
                </div>
                <div className="map__segment fas fa-arrow-right" { ...this.state.east } onClick={this.moveLocation} tabIndex="1">
                </div>
                <div className="map__segment">
                </div>
                <div className="map__segment fas fa-arrow-down" { ...this.state.south } onClick={this.moveLocation} tabIndex="1">
                </div>
                <div className="map__segment">
                </div>
            </div>
        )
    }

    moveLocation = (e) => {
        const id = e.target.getAttribute('data-loc');
        if (!id) return;

        Dispatcher.dispatch({
           type: GAME_STATE_ACTIONS.GAME_CHANGE_LOCATION,
           id,
        });

    }
}

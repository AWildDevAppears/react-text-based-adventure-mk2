import React, { Component, Fragment } from 'react';

import './map.css';

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
            id: props.location.locationToEast,
        };
        state.west = {
            id: props.location.locationToWest,
        };
        state.north = {
            id: props.location.locationToNorth,
        };
        state.south = {
            id: props.location.locationToSouth,
        };

        return state;
    }

    render() {
        return (
            <div className="map">
                <div className="map__segment">
                </div>
                <div className="map__segment" { ...this.state.north } onClick={this.moveLocation} tabIndex="1">
                    <i className="fas fa-arrow-up"></i>
                </div>
                <div className="map__segment">
                </div>
                <div className="map__segment" { ...this.state.west } onClick={this.moveLocation} tabIndex="1">
                    <i className="fas fa-arrow-left"></i>
                </div>
                <div className="map__segment">
                    { this.state.here.name }
                </div>
                <div className="map__segment" { ...this.state.east } onClick={this.moveLocation} tabIndex="1">
                    <i className="fas fa-arrow-right"></i>
                </div>
                <div className="map__segment">
                </div>
                <div className="map__segment" { ...this.state.south } onClick={this.moveLocation} tabIndex="1">
                    <i className="fas fa-arrow-down"></i>
                </div>
                <div className="map__segment">
                </div>
            </div>
        )
    }

    moveLocation = (e) => {
        const id = e.target.getAttribute('id');

        if (id) {
            this.props.moveTo(id);
        }

    }

    displayLocation = (location, compassDirection)  => {
        if (!location.name || location.name === location.id) {
            return '';
        }

        return (
            <Fragment>
                    <span className="map__segment__name">{ compassDirection }</span>
                    { location.name }
            </Fragment>
        );
    }
}

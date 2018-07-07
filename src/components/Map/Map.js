import React, { Component } from 'react';

import APIService from '../../services/APIService';

import './map.css';

export default class Map extends Component {
    static baseState = {
        here: { name: '', id: '' },
        north: { name: '', id: '' },
        northwest: { name: '', id: '' },
        northeast: { name: '', id: '' },
        west: { name: '', id: '' },
        east: { name: '', id: '' },
        southwest: { name: '', id: '' },
        south: { name: '', id: '' },
        southeast: { name: '', id: '' },
    }

    state = { ...Map.baseState }

    render() {
        return (
            <div className="map">
                <div className="map__segment" data-target={ this.state.northwest.id } onClick={this.moveLocation} tabIndex="1">
                    <span className="map__segment__name">North west</span>
                    { this.state.northwest.name }
                </div>
                <div className="map__segment" data-target={ this.state.north.id } onClick={this.moveLocation} tabIndex="1">
                    <span className="map__segment__name">North</span>
                    { this.state.north.name }
                </div>
                <div className="map__segment" data-target={ this.state.northeast.id } onClick={this.moveLocation} tabIndex="1">
                    <span className="map__segment__name">North east</span>
                    { this.state.northeast.name }
                </div>
                <div className="map__segment" data-target={ this.state.west.id } onClick={this.moveLocation} tabIndex="1">
                    <span className="map__segment__name">West</span>
                    { this.state.west.name }
                </div>
                <div className="map__segment">
                    { this.state.here.name }
                </div>
                <div className="map__segment" data-target={ this.state.east.id } onClick={this.moveLocation} tabIndex="1">
                    <span className="map__segment__name">East</span>
                    { this.state.east.name }
                </div>
                <div className="map__segment" data-target={ this.state.southwest.id } onClick={this.moveLocation} tabIndex="1">
                    <span className="map__segment__name">South west</span>
                    { this.state.southwest.name }
                </div>
                <div className="map__segment" data-target={ this.state.south.id } onClick={this.moveLocation} tabIndex="1">
                    <span className="map__segment__name">South</span>
                    { this.state.south.name }
                </div>
                <div className="map__segment" data-target={ this.state.southeast.id } onClick={this.moveLocation} tabIndex="1">
                    <span className="map__segment__name">South east</span>
                    { this.state.southeast.name }
                </div>
            </div>
        )
    }

    componentDidUpdate(_, prevState) {
        const promises = [];

        for (let k in this.state) {
            const reference = this.state[k];

            if (reference.id !== '' && reference.id === reference.name) {
                promises.push(APIService.client.getEntry(reference.id).then(res => {
                    return {
                        [k]: {
                            name: res.fields.name,
                            id: reference.id,
                        }
                    };
                }));
            }
        }

        Promise.all(promises)
            .then(res => {
                if (res.length <= 0) return;

                const updatedFields = Object.assign({}, ...res);

                this.setState({
                    ...this.state,
                    ...updatedFields,
                });
            })
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.location || !props.location.fields) return state;

        if (state.here && props.location.sys.id === state.here.id) {
            return state;
        }

        const locationFields = props.location.fields;

        state = { ...Map.baseState };

        if (!locationFields) {
            return state;
        }

        state.here = {
            id: props.location.sys.id,
            name: props.location.sys.id,
        };

        if (locationFields.locationToNorth) {
            state.north = {
                id: locationFields.locationToNorth.sys.id,
                name: locationFields.locationToNorth.sys.id,
            };
        }

        if (locationFields.locationToSouth) {
            state.south = {
                id: locationFields.locationToSouth.sys.id,
                name: locationFields.locationToSouth.sys.id,
            };
        }


        if (locationFields.locationToEast) {
            state.east = {
                id: locationFields.locationToEast.sys.id,
                name: locationFields.locationToEast.sys.id,
            };
        }

        if (locationFields.locationToWest) {
            state.west = {
                id: locationFields.locationToWest.sys.id,
                name: locationFields.locationToWest.sys.id,
            };
        }

        return state;
    }


    // @Pragma mark - end @Override

    moveLocation = (e) => {
        const id = e.target.getAttribute('data-target');

        if (id) {
            this.props.moveTo(id);
        }

    }
}
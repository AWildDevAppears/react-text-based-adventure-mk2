import React, { Component } from 'react';


import './scene-viewer.css';

export default class SceneViewer extends Component {
    state = {
        locationName: '',
        scene: undefined,
    }

    render() {
        return (
            <div className="scene-viewer">
                <h1>{ this.state.locationName }</h1>
            </div>
        )
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.location) return state;

        state.locationName = props.location.fields.name;

        return state;
    }
}
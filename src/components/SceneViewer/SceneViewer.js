import React, { Component } from 'react';


import './scene-viewer.css';
import SceneStore from '../../store/SceneStore';

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

        let scenes = props.location.fields.randomScenes;
        if (scenes) {
            let sceneLink = scenes[Math.floor(Math.random() * scenes.length)];
            SceneStore.getScene(sceneLink.sys.id)
                .then((scene) => {
                    state.scene = scene;
                });
        }
        return state;
    }
}
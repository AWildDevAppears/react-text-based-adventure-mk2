import React, { Component } from 'react';


import './scene-viewer.css';
import SceneStore from '../../store/SceneStore';

export default class SceneViewer extends Component {
    state = {
        locationName: '',
        scene: {},
    }
    render() {
        return (
            <div className="scene-viewer">
                <h1>{ this.state.locationName }</h1>

                <h2>{ this.state.scene.heading }</h2>

                { this.displayBody() }
            </div>
        )
    }

    componentDidUpdate(_, prevState) {
        if (this.state.locationName !== this.props.location.fields.name) {
            this.setState({
                locationName: this.props.location.fields.name,
            });

            let scenes = this.props.location.fields.randomScenes;
            if (scenes) {
                let sceneLink = scenes[Math.floor(Math.random() * scenes.length)];
                SceneStore.getScene(sceneLink.sys.id)
                    .then((scene) => {
                        this.setState({
                            scene,
                        });
                    });
            }
        }
    }

    displayBody = () => {
        let body = this.state.scene.body;

        if (!body) return '';
        return this.state.scene.body.map((ref) => ref.content);
    }

}
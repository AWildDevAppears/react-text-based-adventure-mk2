import React, { Component } from 'react';
import { Container } from 'flux/utils';

import './scene-viewer.css';
import SceneStore, { SceneActions } from '../../store/SceneStore';
import SceneAction, { SCENE_ACTIONS } from '../../models/SceneAction';
import ZoneStore from '../../store/ZoneStore';
import Dispatcher from '../../store/Dispatcher';

class SceneViewer extends Component {
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

                <div>
                    { this.displayActions() }
                </div>
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
                SceneActions.updateScene(sceneLink.sys.id);
            }
        }
    }

    displayBody = () => {
        let body = this.state.scene.body;

        if (!body) return '';
        return body.map((ref) => ref.content);
    }

    displayActions = () => {
        let actions = this.state.scene.actions;

        if (!actions) return '';
        return actions.map((action) => {
            return (<button key={ action.id } onClick={ e => this.onSendAction(action) }>{ action.text }</button>);
        });
    }

    onSendAction = (action) => {
        Dispatcher.dispatch(action);
    }

    static getStores() {
        return [SceneStore];
    }

    static calculateState(prevState) {
        return {
            locationName: prevState ? prevState.locationName : '',
            scene: SceneStore.getState(),
        };
    }
}

const sceneViewer = Container.create(SceneViewer);
export default sceneViewer;
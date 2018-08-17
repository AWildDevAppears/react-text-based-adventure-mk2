import React, { Component } from 'react';
import { Container } from 'flux/utils';

import SceneStore, { SceneActions } from '../../store/SceneStore';

import Dispatcher from '../../store/Dispatcher';

import './scene-viewer.css';

export class SceneViewer extends Component {
    state = {
        locationName: '',
    }

    render() {
        return (
            <div className="scene-viewer">
                <h1>{ this.state.locationName }</h1>

                { this.displayBody() }

                <div>
                    { this.displayActions() }
                </div>
            </div>
        )
    }

    componentDidUpdate(_, prevState) {
        if (!this.props.location || this.props.scene) {
            return;
        }

        if (this.state.locationName !== this.props.location.name) {
            this.setState({
                locationName: this.props.location.name,
            });
        }
    }

    displayBody = () => {
        console.log(this.props.location);
        if (!this.props.location.name) {
            return;
        }
        //  // <h2>{ this.props.location.currentScene.heading }</h2>
        // let body = this.state.scene.body;

        // if (!body) return '';
        // return body.map((ref) => ref.content);
        return '';
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

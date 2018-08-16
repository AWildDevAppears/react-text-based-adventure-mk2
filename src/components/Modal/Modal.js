import React, { Component } from 'react';

import Dispatcher from '../../store/Dispatcher';

import { MANAGER_VIEWS } from '../../store/ManagerStore';

import '../../css/fontawesome.css';
import '../../css/solid.css'
import './modal.css';

export default class Modal extends Component {
    state = {}

    render() {
        if (!this.props.visible) return '';
        return (
            <div className="modal">
                <div className="modal__content">
                    <button className="modal__close fa fas fa-times fa-lg" label="close" onClick={ this.onDismiss }></button>
                    { this.props.children }
                </div>
            </div>
        );
    }

    onDismiss = () => {
        Dispatcher.dispatch({
            type: MANAGER_VIEWS.SHOW_SCENE,
        });
    }
}

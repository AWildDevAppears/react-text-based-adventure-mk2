import React, { Component } from 'react';

import './modal.css';

export default class Modal extends Component {
    state = {}

    render() {
        if (!this.props.visible) return '';
        console.log(this.props)
        return (
            <div className="modal">
                <div className="modal__content">
                    { this.props.children }
                </div>
            </div>
        );
    }
}
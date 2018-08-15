import React, { Component } from 'react';

import './fab.css';
import '../../css/fontawesome.css';
import '../../css/solid.css';

export default class FloatingActionButton extends Component {
    state = {}

    render() {
        return (
            <button
                className={ this.state.className }
                onClick={ this.props.onClick }
                aria-label={ this.props.label }
            >
                { this.props.text }
            </button>
        );
    }

    static getDerivedStateFromProps(props) {
        let size = props.size ? `fa-${props.size}` : '';
        let icon = props.icon ? `fa-${props.icon}` : '';

        return {
            className: `fab fas ${size} ${icon}`,
        }
    }
}

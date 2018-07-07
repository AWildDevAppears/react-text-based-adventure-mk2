import React, { Component } from 'react';

import './status-bar.css';

export default class Profile extends Component {
    state = {
        percentageFull: '100%',
    }

    static getDerivedStateFromProps(props, state) {
        state.percentageFull = ((props.now / props.max) * 100) + '%';
        return state;
    }

    render() {
        return (
            <div
                className={ 'status-bar ' + this.props.modifier }
                style={{ backgroundColor: this.props.backgroundColor }}
            >
                <div
                    className="status-bar__inner"
                    style={{
                        backgroundColor: this.props.statusColor,
                        width: this.state.percentageFull,
                    }}
                >
                    { this.props.now }
                </div>
            </div>
        );
    }
}
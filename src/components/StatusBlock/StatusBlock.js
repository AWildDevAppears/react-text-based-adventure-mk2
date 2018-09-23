import React, { Component } from 'react';

import StatusBar from '../StatusBar/StatusBar';

import './status-block.css';

export default class Profile extends Component {
    state = {
        name: '',
        imgPath: '',
        healthMax: 100,
        health: 100,
        stamina: 50,
        staminaMax: 50,
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.for) return state;

        state.health = props.for.health;
        state.healthMax = props.for.healthMax;
        state.stamina = props.for.stamina;
        state.staminaMax = props.for.staminaMax;

        return state;
    }

    render() {
        return (
            <div className="status-block">
                <StatusBar
                    now={ this.state.stamina }
                    max={ this.state.staminaMax }
                    statusColor="yellow"
                    backgroundColor="orange"
                    modifier="status-bar--stamina"
                />

                <StatusBar
                    now={ this.state.health }
                    max={ this.state.healthMax }
                    statusColor="red"
                    backgroundColor="maroon"
                    modifier="status-bar--health"
                />
            </div>
        );
    }
}
import React, { Component } from 'react';

import StatusBar from './StatusBar';

import './profile.css';

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
        state.name = props.for.name;
        state.imgPath = props.for.image;
        state.health = props.for.health;
        state.healthMax = props.for.healthMax;
        state.stamina = props.for.stamina;
        state.staminaMax = props.for.staminaMax;

        return state;
    }

    render() {
        return (
            <div className="profile">
                <img src={ this.state.imgPath } className="profile__avatar" />
                <h3>{ this.state.name }</h3>

                <StatusBar
                    now={ this.state.health }
                    max={ this.state.healthMax }
                    statusColor="green"
                    backgroundColor="red"
                />

                <StatusBar
                    now={ this.state.stamina }
                    max={ this.state.staminaMax }
                    statusColor="blue"
                    backgroundColor="yellow"
                />
            </div>
        );
    }
}
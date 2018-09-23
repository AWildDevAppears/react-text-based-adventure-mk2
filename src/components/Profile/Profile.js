import React, { Component } from 'react';

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
        if (!props.for) return state;

        state.name = props.for.name;
        state.imgPath = props.for.image;

        state.stats = props.for.stats;

        return state;
    }

    render() {
        return (
            <div className="profile">
                <ul className="profile__stats-list">
                    {Object.keys(this.state.stats).map((key) => {
                        return (
                            <li key={ key } className="profile__stats__item">
                                <span className="profile__stats__key">{ key }</span>
                                { this.state.stats[key] }
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

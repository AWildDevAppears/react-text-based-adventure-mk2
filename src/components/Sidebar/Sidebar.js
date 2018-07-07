import React, { Component } from 'react';

import Character from '../../models/Character';

import Profile from '../Profile/Profile'
import Map from '../Map/Map';

import './sidebar.css';

export default class Sidebar extends Component {
    render() {
        return (
        <aside className="sidebar">
            <Profile for={ this.props.player }  />
            <Map
                location={ this.props.location }
                moveTo={ this.props.moveTo }
            />
        </aside>
        );
    }
}
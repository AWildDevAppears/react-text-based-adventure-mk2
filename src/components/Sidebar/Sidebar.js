import React, { Component } from 'react';

import Character from '../../models/Character';

import Profile from '../Profile/Profile'
import Map from '../Map/Map';

import './sidebar.css';

export class Sidebar extends Component {
    render() {
        return (
        <aside className="sidebar">
            <Profile for={ new Character() }  />
            <Map />
        </aside>
        );
    }
}
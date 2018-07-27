import React, { Component } from 'react';

import Profile from '../Profile/Profile'
import Map from '../Map/Map';
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton';

import './sidebar.css';

export default class Sidebar extends Component {
    render() {
        return (
        <aside className="sidebar">
            <Profile for={ this.props.player }  />

            <div className="button--bar">
                <FloatingActionButton
                    icon="user"
                    role="character"
                />
                <FloatingActionButton
                    icon="box-open"
                    role="inventory"
                />
                <FloatingActionButton
                    icon="cog"
                    role="settings"
                />
            </div>
            <Map
                location={ this.props.location }
                moveTo={ this.props.moveTo }
            />
        </aside>
        );
    }
}
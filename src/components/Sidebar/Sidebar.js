import React, { Component } from 'react';

import Profile from '../Profile/Profile'
import Map from '../Map/Map';
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton';

import './sidebar.css';

export default class Sidebar extends Component {
    render() {
        return (
            <aside className="sidebar">
                <div className="sidebar__block">{ this.props.date }</div>
                <Profile for={ this.props.player }  />

                <div className="button--bar">
                    <FloatingActionButton
                        icon="user"
                        label="character"
                        onClick={ this.props.onCharacterButtonPressed }
                    />
                    <FloatingActionButton
                        icon="box-open"
                        label="inventory"
                        onClick={ this.props.onInventoryButtonPressed }
                    />
                    <FloatingActionButton
                        icon="cog"
                        label="settings"
                        onClick={ this.props.onSettingsButtonPressed }
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

import React, { Component, Fragment } from 'react';

import Profile from '../Profile/Profile'
import Map from '../Map/Map';
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton';
import InventoryView from '../InventoryView/InventoryView';

import { MANAGER_VIEWS } from '../../store/ManagerStore';
import Dispatcher from '../../store/Dispatcher';

import './sidebar.css';

export default class Sidebar extends Component {
    state = {
        player: undefined,
        location: undefined,
        view: MANAGER_VIEWS.SHOW_SCENE,
    }

    static getDerivedStateFromProps(props, state) {
        state = {
            ...state,
            player: props.player,
            location: props.location,
            view: props.view,
        }

        return state;
    }


    render() {
        return (
            <aside className="sidebar">
                { this.displayViewForState() }
            </aside>
        );
    }

    displayViewForState = () => {
        switch (this.state.view) {
            case MANAGER_VIEWS.SHOW_INVENTORY:
                return (
                    <InventoryView for={ this.props.player }></InventoryView>
                );
            case MANAGER_VIEWS.SHOW_CHARACTER:
                return (
                    <h1>Character</h1>
                );
            case MANAGER_VIEWS.SHOW_SETTINGS:
                return (
                    <Fragment>
                        <h1>Options</h1>

                        <button type="button" onClick={this.onSaveButtonPressed}>Save</button>
                        <button type="button" onClick={this.onLoadButtonPressed}>Load</button>
                    </Fragment>
                )
            case MANAGER_VIEWS.HIDDEN:
                return '';
            default:
                return (
                    <Fragment>
                        <Profile for={ this.props.player }/>

                        <div className="button--bar">
                            <FloatingActionButton
                                icon="user"
                                label="character"
                                onClick={ this.onCharacterButtonPressed }
                            />
                            <FloatingActionButton
                                icon="box-open"
                                label="inventory"
                                onClick={ this.onInventoryButtonPressed }
                            />
                            <FloatingActionButton
                                icon="cog"
                                label="settings"
                                onClick={ this.onSettingsButtonPressed }
                            />
                        </div>
                        <Map
                            location={ this.props.location }
                        />
                    </Fragment>
                );
        }

    }

    onInventoryButtonPressed = () => {
        Dispatcher.dispatch({
            type: MANAGER_VIEWS.SHOW_INVENTORY,
        });
    }

    onCharacterButtonPressed = () => {
        Dispatcher.dispatch({
            type: MANAGER_VIEWS.SHOW_CHARACTER,
        });
    }

    onSettingsButtonPressed = () => {
        Dispatcher.dispatch({
            type: MANAGER_VIEWS.SHOW_SETTINGS,
        });
    }
}

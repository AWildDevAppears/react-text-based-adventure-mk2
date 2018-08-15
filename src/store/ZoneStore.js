import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher';

import DBService from '../services/DBService';

import { SCENE_ACTIONS } from '../models/SceneAction';

const ZONE_ACTIONS = {
    CHANGE_ZONE: 'CHANGE_ZONE',
    ADD_VARIABLE: 'ADD_VARIABLE',
    CHANGE_LOCATION: 'CHANGE_LOCATION',
};

export const ZoneActions = {
    changeZone(id) {
        Dispatcher.dispatch({
            type: ZONE_ACTIONS.CHANGE_ZONE,
            props: {
                id,
            },
        })
    },

    addVariable(key, value) {
        Dispatcher.dispatch({
            type: ZONE_ACTIONS.ADD_VARIABLE,
            props: {
                [key]: value,
            },
        });
    },

    changeLocation(id, location) {
        Dispatcher.dispatch({
            type: ZONE_ACTIONS.CHANGE_LOCATION,
            props: {
                id,
                location,
            },
        });
    },
}

export default new class ZoneStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            id: '',
            map: {},
            variables: {},
        };
    }

    reduce(state, action) {
        let s = { ...state };
        switch (action.type) {
            case ZONE_ACTIONS.CHANGE_ZONE:
                s.id = action.props.id;
                s.map = {};
                s.variables = {};
                break;
            case ZONE_ACTIONS.ADD_VARIABLE:
                s.variables = {
                    ...state.variables,
                    ...action.props,
                };
                break;
            case ZONE_ACTIONS.CHANGE_LOCATION:
                s.map[action.props.id] = action.props.location;
                break;
            case SCENE_ACTIONS.SET_ZONE_VARIABLE:
                s.variables[action.params.prop] = action.params.value;
                break;
            default:
        }

        this.saveState(s);
        return s;
    }

    saveState(state) {
        if (state.id === '') {
            return;
        }

        DBService.update('Zone', state.id, {
            map: state.map,
            variables: state.variables,
        });
    }
}();

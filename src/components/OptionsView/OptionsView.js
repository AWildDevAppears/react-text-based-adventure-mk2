import React, { Component } from 'react';
import { Container } from 'flux/utils';

export class OptionsView extends Component {
    static getStores() {
        // return [OptionsStore];
    }

    static calculateState(prevState) {
        return {
            ...prevState,
            // ...OptionsStore.getState(),
        };
    }

    render() {
        return (
            <div className="options">

            </div>
        );
    }
}

const optionsView = Container.create(OptionsView);
export default optionsView;

import React, { Component } from 'react';


export default class ItemCard extends Component {
    state = {
        id: '',
        type: '',

        name: '',
        isKeyItem: false,
        value: 0,
        weight: 0,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.for) {
            state = {
                ...state,
                ...props.for,
            }

            return state;
        }
    }

    render() {
        let icon = '';

        switch (this.state.type) {
            case 'weaponMelee':
                icon = (<i className="fas fa-screwdriver"></i>);
                break;
            case 'weaponRanged':
                icon = (<i className="fas fa-bullseye"></i>);
                break;
            default:
                icon = (<i className="fas fa-paperclip"></i>);
                break;
        }

        return (
            <div className="item" onClick={ this.props.onClick }>
                <h4 className="item__name">
                    { icon }
                    { this.state.name }
                </h4>
                <div className="item__value">
                    <i className="fas fa-money-bill"></i>
                    { this.state.value }
                </div>
                <div className="item__weight">
                    <i className="fas fa-weight-hanging"></i>
                    { this.state.weight }
                </div>
            </div>
        )
    }
}

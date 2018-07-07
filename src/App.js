import React, { Component } from 'react';

import Sidebar from './components/Sidebar/Sidebar';

import APIService from './services/APIService';

import Character from './models/Character';

import './index.css'

class App extends Component {
  state = {
    location: {
    },
    zone: '',
  }

  render() {
    return (
      <div className="app">
        <Sidebar
          player={ new Character() }
          location={ this.state.location }
          moveTo={this.moveTo}
        />
      </div>
    );
  }

  componentDidMount() {
    APIService.getStartingLocation()
      .then((res) => {
        this.setState({
          ...this.state,
          ...res,
        })
      })
  }

  // @Pragma mark - end @Override

  moveTo = (id) => {
    APIService.client.getEntry(id).then((location) => {
      this.setState({
        ...this.state,
        location,
      });
    })
  }
}

export default App;

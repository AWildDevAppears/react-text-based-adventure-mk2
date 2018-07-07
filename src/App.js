import React, { Component } from 'react';

import { Sidebar } from './components/Sidebar/Sidebar';

import './index.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sidebar />
      </div>
    );
  }
}

export default App;

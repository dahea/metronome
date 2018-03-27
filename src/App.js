import React, { Component } from 'react';
import './App.css';
import Metronome from './metronome.js';

//--------------------------------------------------------------------------

class App extends Component {
  render() {
    return (
      <div>
        <Metronome />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import Metronome from './metronome.js';

//--------------------------------------------------------------------------

class PracticeSet extends Component {

  state = {
    tracklist: []
  };


  createTrack = (e) => {

    var tracklistarray = this.state.tracklist.slice();
    tracklistarray.push('song');
    this.setState(prevState => ({
      tracklist: tracklistarray
    }));
    console.log(this.state.tracklist);
  }

  render() {

    return (
      <div className="playlist-wrapper">
        <div className="playlistcollection-wrapper">

        {this.state.tracklist.length ? (
          this.state.tracklist.map(function(name, index){
                    return <div key={index}>{name}</div>;
                  })
        ) : (
          'Please add a track'
        )}

        </div>
        <button onClick={this.createTrack}>Add practice track</button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Metronome />
        <PracticeSet />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import Metronome from './metronome.js';

//--------------------------------------------------------------------------

class Playlist extends Component {

  state = {
    playlistTitle: 'My playlist',
    playlistDesc: 'This is a desc of my playlist',
    songlist: []
  }

  // will delete itself and add songs
  deletePlaylist = (e) => {
    console.log('set up confirmation and then delete');
  }

  editPlaylist = (e) => {
    console.log('edit playlist title only');
  }

  addPlaylistItem = (e) => {

    const playlistRef = firebase.database().ref('playlist');
    const song = {
      songTitle: 'song title',
      songBpm: 'song bpm rate',
      songTime: 'song duration in minutes',
      songBars: 'song duration in bars',
      songDesc: 'song desc, not required'
    };

    playlistRef.push(song);

  }

  render() {
    return (
      <div>
        <div>{this.state.playlistTitle}</div>
        <div>{this.state.playlistDesc}</div>
      {/* add this later: display "empty playlist. please add a song" message as default message/if no songs in playlist */}
      {/* it should actually display info from localstorage */}

        <div>
          {

            // this.state.songlist.map((songlist, index) => 
            // <div>{songlist} {index+1}</div>
            //)

          }
        </div>
      
        <button onClick={this.deletePlaylist}>Delete playlist</button>
        <button onClick={this.editPlaylist}>Edit playlist</button>
        <button onClick={this.addPlaylistItem}>Add song</button>
      </div>
    );
  }
}

class PlaylistCollection extends Component {

  createPlaylist = (e) => {

    const playlistCollection = firebase.database().ref('playlistCollection');
    const playlist = {
      playlistTitle: 'My playlist',
      playlistDesc: 'This is a desc of my playlist',
      songlist: {}
    };

    playlistCollection.push(playlist);

  }

  render() {
    var playlists

    if (!firebase.database().ref()) {
      playlists = <Playlist />
      console.log('playlists already exist');

    } else {
      playlists = 'You have no playlists. Please add one.';
    }

    return (
      <div className="playlist-wrapper">
        <div className="playlistcollection-wrapper">
          {playlists}
        </div>
        <button>Create new playlist</button>
      </div>
    );
  }
}



class App extends Component {
  render() {
    return (
      <div>
        <Metronome />
        <PlaylistCollection />
      </div>
    );
  }
}

export default App;

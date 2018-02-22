import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import Metronome from './metronome.js';

//--------------------------------------------------------------------------

class PlaylistItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      songTitle: 'song title',
      songBpm: 'song bpm rate',
      songTime: 'song duration in minutes',
      songBars: 'song duration in bars',
      songDesc: 'song desc, not required'
    }
  }

  deleteItem = () => {

  }

  editItem = () => {

  }

  render() {
    return (
      <div>Song details:<br />
      {this.state.songTitle}<br />
      {this.state.songBpm}<br />
      {this.state.songTime}<br />
      {this.state.songBars}<br />
      {this.state.songDesc}
      </div>
    );
  }
}

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
    var song = {
      songTitle: 'song title',
      songBpm: 'song bpm rate',
      songTime: 'song duration in minutes',
      songBars: 'song duration in bars',
      songDesc: 'song desc, not required'
    };

    console.log(song);

    this.state.songlist.push(song);

    localStorage.setItem("songlist", JSON.stringify(this.state.songlist));

    console.log(this.state.songlist);

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

  // will render all playlists and add playlists


  createPlaylist = () => {

  }

  render() {
    return (
      <div className="playlist-wrapper">
        Eventually, all play lists will show up here.
        <br />
        <br />
        <Playlist />
        <br />
        <br />
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
        <Playlist />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

class TempoList extends Component {

  render() {
    const {clickAudio, clickInterval, setBpm} = this.props;
    const allBPMs = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144, 152, 160, 168, 176, 184, 192, 200, 208];

    return (
      <div>
          {allBPMs.map((bpm, index) => 
            <Tempos
              key={index}
              setBpm={setBpm}
              bpm={bpm}
              clickInterval={clickInterval}
              clickAudio={clickAudio}
            />
          )}
      </div>
    )
  }
}

class Tempos extends Component {
  render() {
    const {clickAudio, clickInterval, setBpm, bpm} = this.props;
    return (
      <button className="tempo-marker" onClick={setBpm} data-tempo={bpm} clickInterval={clickInterval} clickAudio={clickAudio} >
        {this.props.bpm}
      </button>
    );
  }
}

class MetronomeSwitch extends Component {
  render() {
    const {toggleAction, clickInterval, playClick, stopClick, clickAudio, metronomeState} = this.props;
    return (
      <button className="tempo-starter" onClick={toggleAction} clickInterval={clickInterval} playClick={playClick} stopClick={stopClick} clickAudio={clickAudio} >
        {metronomeState ? 'Stop Metronome' : 'Start Metronome'}
      </button>
    );
  }
}

class Metronome extends Component {
  state = {
    isMetronomeOn: false,
    currentBpm: 88,
    clickInterval: 681.8181818181818,
    clickPlayer: 0,
    clickAudio: new Audio('./click.mp3')
  }

  runMetronome = () => {
    this.setState(prevState => ({
      isMetronomeOn: !prevState.isMetronomeOn
    }));

    this.setState(prevState => ({
      clickInterval: (60 / this.state.currentBpm)*1000
    }));

    if (!this.state.isMetronomeOn) {
      this.playClick();
    }

    if (this.state.isMetronomeOn) {
      console.log(this.state.clickPlayer);
      this.stopClick();
    }
  }

  playClick = () => {
    const {currentBpm, clickInterval, clickAudio} = this.state;
    console.log('metronome is playing at '+ currentBpm + ' which is every '+clickInterval+' ms');
    this.setState((prevState) => {
      const clickSound = clickAudio;
      return {clickPlayer: setInterval(function(){
        clickSound.play();
        console.log('click');
      }, clickInterval)};
    });
  }

  stopClick = () => {
    console.log('metronome stopped');
    clearInterval(this.state.clickPlayer);
  }

  changeBpm = (e) => {
    const newBpm = e.target.dataset.tempo;
    const newClickRate = (60 / newBpm)*1000;

    console.log(this.state.currentBpm);
    this.setState((prevState) => {
      localStorage.setItem("prevBpm", this.state.currentBpm);
      return {currentBpm: newBpm};
    });

    this.setState((prevState) => {
      return {clickInterval: newClickRate};
    });

    if (!this.state.isMetronomeOn) {
      console.log('metronome is off ' + newBpm);
    }

    if (this.state.isMetronomeOn) {
      clearInterval(this.state.clickPlayer);
      console.log('prev clicker stopped');
      this.setState((prevState) => {
        const clickSound = this.state.clickAudio;
        return {clickPlayer: setInterval(function(){
          clickSound.play();
          console.log('updated click');
        }, newClickRate)};
      });
    }
  }

  render() {
    return (
      <div className="metronome-wrapper">
        <div className="status">
        Metronome is {this.state.isMetronomeOn ? 'On' : 'Off'}<br />
        bpm is set to: {this.state.currentBpm}
        </div>
        <div className="metronomer">
          <MetronomeSwitch toggleAction={this.runMetronome} clickInterval={this.state.clickInterval} playClick={this.playClick} stopClick={this.stopClick} metronomeState={this.state.isMetronomeOn} clickAudio={this.state.clickAudio} />
          <TempoList setBpm={this.changeBpm} clickInterval={this.state.clickInterval} playClick={this.playClick} stopClick={this.stopClick} clickAudio={this.state.clickAudio} />
        </div>
      </div>
    );
  }
}

class PlaylistCollection extends Component {


  createPlaylist = () => {

  }

  deletePlaylist = () => {

  }



  render() {
    return (
      <div className="playlist-wrapper">
        Eventually, all play lists will show up here.
        <br />
        <button>Create new playlist</button>
      </div>
    );
  }
}

class Playlist extends Component {


  createPlaylist = () => {

  }

  deletePlaylist = () => {

  }



  render() {
    return (
      <div>This is a playlist</div>
    );
  }
}

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

  createItem = () => {

  }

  deleteItem = () => {

  }

  editItem = () => {

  }

  render() {
    return (
      <div>This is a playlist</div>
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

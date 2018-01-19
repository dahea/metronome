import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class TempoList extends Component {

  render() {
    const clickInterval = this.props.clickInterval;
    const setBpm = this.props.setBpm;
    const allBPMs = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144, 152, 160, 168, 176, 184, 192, 200, 208];

    return (
      <div>
          {allBPMs.map(function(bpm, index){
            return <Tempos key={index} setBpm={setBpm} bpm={bpm} clickInterval={clickInterval} />;
          })}
      </div>
    )
  }
}

class Tempos extends Component {
  render() {
    return (
      <button className="tempo-marker" onClick={this.props.setBpm} data-tempo={this.props.bpm} clickInterval={this.props.clickInterval} >
        {this.props.bpm}
      </button>
    );
  }
}

class MetronomeSwitch extends Component {
  render() {
    return (
      <button className="tempo-starter" onClick={this.props.toggleAction} clickInterval={this.props.clickInterval} playClick={this.props.playClick} stopClick={this.stopClick} >
        {this.props.metronomeState ? 'Stop Metronome' : 'Start Metronome'}
      </button>
    );
  }
}

class Metronome extends Component {

  constructor(props){
    super(props);
    this.state = {
      isMetronomeOn: false,
      currentBpm: 88,
      clickInterval: 0,
      clickPlayer: 0
    };
    this.runMetronome = this.runMetronome.bind(this);
    this.changeBpm = this.changeBpm.bind(this);
    this.playClick = this.playClick.bind(this);
  }

  runMetronome(){
    this.setState(prevState => ({
      isMetronomeOn: !prevState.isMetronomeOn
    }));

    this.state.clickInterval = (60 / this.state.currentBpm)*1000;
    var clickPlayer;

    if (!this.state.isMetronomeOn) {
      console.log('metronome is playing at '+ this.state.currentBpm + ' which is every '+this.state.clickInterval+' ms');
      this.playClick();
    } 

    if (this.state.isMetronomeOn) {
      console.log('metronome should stop');
      console.log(clickPlayer);
      this.stopClick();
    } 
  }

  playClick(){
    this.state.clickPlayer = setInterval(function(){console.log('click');}, this.state.clickInterval);
  }

  stopClick(){
    clearInterval(this.state.clickPlayer);
  }

  changeBpm(e){
    console.log(this.state.currentBpm);
    this.state.currentBpm = e.target.dataset.tempo;
    this.state.clickInterval = (60 / this.state.currentBpm)*1000;
    console.log('metronome has been updated to ' + this.state.currentBpm + ' which is every '+this.state.clickInterval+' ms');
  }

  render() {

    return (
      <div className="metronome-wrapper">
        <div className="status">
        Metronome is {this.state.isMetronomeOn ? 'On' : 'Off'}<br />
        {/* and now for some reason this is not working properly. it only updates when start/stop button works, but not when clicking on tempos */}
        bpm is set to: {this.state.currentBpm}
        </div>
        <div className="metronomer">
          <MetronomeSwitch toggleAction={this.runMetronome} clickInterval={this.state.clickInterval} playClick={this.playClick} stopClick={this.stopClick} metronomeState={this.state.isMetronomeOn} />

          <TempoList setBpm={this.changeBpm} clickInterval={this.state.clickInterval} playClick={this.playClick} stopClick={this.stopClick} />

        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Metronome />
    );
  }
}

export default App;

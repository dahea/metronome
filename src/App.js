import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class TempoList extends Component {

  render() {
    const setBpm = this.props.setBpm;
    const allBPMs = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144, 152, 160, 168, 176, 184, 192, 200, 208];

    return (
      <div>
          {allBPMs.map(function(bpm, index){
            return <Tempos key={index} setBpm={setBpm} bpm={bpm} />;
          })}
      </div>
    )
  }
}

class Tempos extends Component {
  render() {
    return (
      <button className="tempo-marker" onClick={this.props.setBpm} data-tempo={this.props.bpm}>
        {this.props.bpm}
      </button>
    );
  }
}

class MetronomeSwitch extends Component {
  render() {
    return (
      <button className="tempo-starter" onClick={this.props.toggleAction}>
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
      currentBpm: 88
    };
    this.runMetronome = this.runMetronome.bind(this);
    this.changeBpm = this.changeBpm.bind(this);
    this.playClick = this.playClick.bind(this);
  }

  runMetronome(){
    this.setState(prevState => ({
      isMetronomeOn: !prevState.isMetronomeOn
    }));

    var clickInterval = (60 / this.state.currentBpm)*1000;
    var clickPlayer;

    {/*
      am going to try messing with this

      var clickPlayer = setInterval(function() {
        if (!this.state.isMetronomeOn) clearInterval(clickPlayer); 
      }, clickInterval);

    */}


    if (!this.state.isMetronomeOn) {
      console.log('metronome is playing at '+ this.state.currentBpm + ' which is every '+clickInterval+' ms');
      clickPlayer = setInterval(function(){console.log('click');}, clickInterval);
      console.log(clickPlayer);
    } else {
      console.log('metronome should stop');
      console.log(clickInterval);
      clearInterval(clickPlayer);
    }

  }

  playClick(){
    
  }

  changeBpm(e){
    this.setState({currentBpm: e.target.dataset.tempo});
  }

  render() {

    return (
      <div className="metronome-wrapper">
        <div className="status">
        Metronome is {this.state.isMetronomeOn ? 'On' : 'Off'}<br />
        bpm is set to: {this.state.currentBpm}
        </div>
        <div className="metronomer">
          <MetronomeSwitch toggleAction={this.runMetronome} metronomeState={this.state.isMetronomeOn} />

          <TempoList setBpm={this.changeBpm} />

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

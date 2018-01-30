import React, { Component } from 'react';
import './App.css';

class TempoList extends Component {

  render() {
    const clickAudio = this.props.clickAudio;
    const clickInterval = this.props.clickInterval;
    const setBpm = this.props.setBpm;
    const allBPMs = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144, 152, 160, 168, 176, 184, 192, 200, 208];

    // Nit: formatting of components with many props should be done like:
    // <Component
    //    prop1={abc}
    //    prop2={xyz}
    //    ...
    // />
    // for legibility
    return (
      <div>
          {allBPMs.map(function(bpm, index){
            return <Tempos key={index} setBpm={setBpm} bpm={bpm} clickInterval={clickInterval} clickAudio={clickAudio} />;
          })}
      </div>
    )
  }
}

class Tempos extends Component {
  render() {

    return (
      <button className="tempo-marker" onClick={this.props.setBpm} data-tempo={this.props.bpm} clickInterval={this.props.clickInterval} clickAudio={this.props.clickAudio} >
        {this.props.bpm}
      </button>
    );
  }
}

class MetronomeSwitch extends Component {
  render() {

    return (
      <button className="tempo-starter" onClick={this.props.toggleAction} clickInterval={this.props.clickInterval} playClick={this.props.playClick} stopClick={this.stopClick} clickAudio={this.props.clickAudio} >
        {this.props.metronomeState ? 'Stop Metronome' : 'Start Metronome'}
      </button>
    );
  }
}

class Metronome extends Component {
  // if you don't need to call super functions look into declaring state like so:
  // state = {
  //   abc: '',
  //   xyz: ''
  // }
  // more concise

  constructor(props){
    super(props);
    this.state = {
      isMetronomeOn: false,
      currentBpm: 88,
      clickInterval: 681.8181818181818,
      clickPlayer: 0,
      clickAudio: new Audio('./click.mp3')
    };

    // if you use () => {} syntaxt binding these is no longer necessary as arrow maintain scope of parent block
    this.runMetronome = this.runMetronome.bind(this);
    this.changeBpm = this.changeBpm.bind(this);
    this.playClick = this.playClick.bind(this);
    this.stopClick = this.stopClick.bind(this);
  }

  runMetronome(){
    console.log(this.state.clickAudio);

    this.setState(prevState => ({
      isMetronomeOn: !prevState.isMetronomeOn
    }));

    // Do what you did above (passing in prevState) to ensure you're doing the math
    // on the latest state
    this.setState({clickInterval: (60 / this.state.currentBpm)*1000});

    if (!this.state.isMetronomeOn) {
      this.playClick();
    }

    if (this.state.isMetronomeOn) {
      console.log(this.state.clickPlayer);
      this.stopClick();
    }
  }

  playClick(){
    // Nitpick (legibility):
    // Destructure state and/or props at the beginning of functions to make it easier to read.
    // e.g:
    // const {currentBpm, clickInterval, clickAudio} = this.state;
    // then you can remove all the `this.state.abc`'s from the function body.
    // There is nothing wrong with what you did, this just cleans it up a little
    console.log('metronome is playing at '+ this.state.currentBpm + ' which is every '+this.state.clickInterval+' ms');
    this.setState((prevState) => {

      const clickSound = this.state.clickAudio;

      return {clickPlayer: setInterval(function(){
        clickSound.play();
        console.log('click');
      }, this.state.clickInterval)};
    });
  }

  stopClick(){
    console.log('metronome stopped');
    clearInterval(this.state.clickPlayer);
  }

  changeBpm(e){
    const newBpm = e.target.dataset.tempo;
    const newClickRate = (60 / newBpm)*1000;

    console.log(this.state.currentBpm);
    this.setState((prevState) => {
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

class App extends Component {
  render() {
    return (
      <Metronome />
    );
  }
}

export default App;

import { useState, useEffect, Component } from 'react';
import './App.css'

//Import views
import Video from './views/video';
import Quiz from './views/quiz';
import Response from './views/response';
import Results from './views/results';
import Profile from './views/profile';


class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      pages: [<Video setStep={this.setStep} />, 
        <Quiz setStep={this.setStep} />, 
        <Response setStep={this.setStep} />, 
        <Results setStep={this.setStep} />, 
        <Profile setStep={this.setStep} />],

    }
  }

  setStep = (stepNum) => {
    this.setState({ step: stepNum });
  };


  render() {
    return (
      <section className='main' >
        {this.state.pages[this.state.step]}
      </section>

    )
  }
}

export default App;

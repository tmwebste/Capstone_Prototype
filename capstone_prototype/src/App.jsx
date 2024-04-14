import { useState, useEffect, Component } from 'react';
import './App.css'

//Import views
import Video from './views/video';
import Quiz from './views/quiz';
import Response from './views/response';
import Results from './views/results';
import Profile from './views/profile';

//Import components
import serverInterface from './components/serverInterface';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quizGrade: 0,
      userResponse: '',
      responseGrade: 0,
      step: 2,
      quizData: null,
      chartData: {
        original: {
            data:[0.6, .4, .5, .3, .8, .2, .5, 0.9],
            labels:['Attribute 1','Attribute 2','Attribute 3','Attribute 4','Attribute 5','Attribute 6','Attribute 7','Attribute 8']
        },
        final: { 
            data:[1.0, .5, .4, .6, .9, .3, .1, 0.9],
            labels:['Attribute 1','Attribute 2','Attribute 3','Attribute 4','Attribute 5','Attribute 6','Attribute 7','Attribute 8']
        }
    },
    }
  }


  setStep = (stepNum) => {
    this.setState({ step: stepNum });
  };

  setQuizData = (quizData) => {
    console.log(quizData);
    this.setState(
      {quizData: quizData}
    )
  }
  
  setQuizGrade = (grade) => {
    const newGrade =  (grade / 5) * 100;
    this.setState(
      {quizGrade: newGrade}
    )
  }

  gptAttributes = async () => {
    try {
      const attributeResponse = await serverInterface.getAttributes(this.state.userResponse, this.state.quizData);
      console.log("Server Response:", attributeResponse);
  
      // Manually adjust the response string to be valid JSON
      const correctedResponse = attributeResponse.response
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/\n/g, ''); // Remove newlines
  
      // Now parse the corrected string into JSON
      const parsedResponse = JSON.parse(correctedResponse);
  
      let attributeNames = [];
      let scores = [];
  
      // Extract names and scores from the parsed JSON
      for (let key in parsedResponse) {
        if (parsedResponse.hasOwnProperty(key)) {
          attributeNames.push(parsedResponse[key].name);
          scores.push(parsedResponse[key].score);
        }
      }
  
      // Update the chartData in the state with new names and scores
      this.setState(prevState => ({
        chartData: {
          ...prevState.chartData,
          final: {
            ...prevState.chartData.final,
            data: scores,
            labels: attributeNames
          }
        }
      }));
    } catch (error) {
      console.error("Failed to process attributes:", error);
    }
  }
  
  

  setResponseGrade = (response) => {
    const newGrade =  Math.floor(Math.random() * 101);
    this.setState(
      {responseGrade: newGrade, 
        userResponse: response
      }
    )
  }

  render() {
    return (
      <section className='main'>
        {this.state.step === 0 && <Video setStep={this.setStep} />}
        {this.state.step === 1 && <Quiz setStep={this.setStep} setQuizGrade={this.setQuizGrade} setQuizData={this.setQuizData}/>}
        {this.state.step === 2 && <Response setStep={this.setStep} getAttributes={serverInterface.getAttributes} setResponseGrade={this.setResponseGrade} gptAttributes={this.gptAttributes}/>}
        {this.state.step === 3 && <Results setStep={this.setStep} responseGrade={this.state.responseGrade} quizGrade={this.state.quizGrade} />}
        {this.state.step === 4 && <Profile setStep={this.setStep} chartData={this.state.chartData} />}
      </section>

    )
  }
}

export default App;
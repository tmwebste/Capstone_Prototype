import React, { Component } from 'react';
// import axios from 'axios';



class ServerInterface extends Component {
  constructor() {
    super();
    this.state = {
        //   SERVER_IP:'https://mystery-server.fly.dev/', //Server URL for deployed server
      
        //   SERVER_IP:'http://172.26.112.93:5000/' //Server URL for local dev server

        SERVER_IP:'http://172.26.70.227:80/'
        // SERVER_IP:'http://127.0.0.1:80/'
        
    }
  }

  // Run on load, gets a random existing JSON story file from the server
  getStory = async () => {
    try {
      const response = await fetch(this.state.SERVER_IP);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      // console.log(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // Get a response from the server
  getAttributes = async (message, quizData) => {
    let endpoint = "get_attributes";
    try {
      // Define the request data
      const requestData = {
        message,
        quizData, 
      };
      console.log(requestData);

      // Make a POST request to the Flask server
      let response = await fetch( this.state.SERVER_IP + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      

      if (response.ok) {
        // Parse the JSON response from the server
        response = await response.json();
        console.log(response);
        // Return the character response
        return response;
      } else {
        // Handle server error
        console.error('Server returned an error');
      }
    } catch (error) {
      // Handle client error
      console.error('Client-side error:', error);
    }
  }

  getResponseGrade = async (message) => {
    let endpoint = "get_response_grade";
    try {
      // Define the request data
      const requestData = {
        message,
      };
      console.log(requestData);

      // Make a POST request to the Flask server
      const response = await fetch( this.state.SERVER_IP + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      

      if (response.ok) {
        // Parse the JSON response from the server
        const gptResponse = await response.json();
        console.log(gptResponse);
        // Return the character response
        return gptResponse;
      } else {
        // Handle server error
        console.error('Server returned an error');
      }
    } catch (error) {
      // Handle client error
      console.error('Client-side error:', error);
    }
  }
  

  render() {
  }
}

export default new ServerInterface();
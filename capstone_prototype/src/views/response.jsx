import React, { Component } from 'react';
import './response.css';

class Response extends Component {
    constructor() {
        super();
        this.state = {
            question: "Describe the steps and key considerations to keep in mind when steaming milk for a latte. Highlight the importance of milk temperature and texture in achieving the perfect latte.",
            responseText: '',  // To store user's response
            isSubmitted: false // To track whether the response has been submitted
        };
    }

    handleChange = (event) => {
        this.setState({ responseText: event.target.value });
    }

    submitEverything = () => {
        this.handleSubmit();
        if (this.state.isSubmitted){
            this.props.gptAttributes();
        } else{
            console.log('attribute request not submitted')
        }
        this.props.setStep(3);
    }

    handleSubmit = () => {
        // Handling the submit action
        this.props.setResponseGrade(this.state.responseText);
        this.setState({ isSubmitted: true });
        console.log(this.props.responseGrade);
        // Optionally process the responseText here or pass it to parent component
    }

    render() {
        return (
            <div className='response'>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Text Response</h3></nav>
                
                <section className='response-section'>
                    <div className='question-title'>
                        <h2>{this.state.question}</h2>
                    </div>
                    <section className='text-entry'>
                        <textarea 
                            className='text-box'
                            value={this.state.responseText} 
                            onChange={this.handleChange} 
                            disabled={this.state.isSubmitted}
                        />
                    </section>
                    {!this.state.isSubmitted && (
                        <div className='submit-button'>
                            <button className='dark-button' onClick={this.handleSubmit}>Submit Response</button>
                        </div>
                    )}
                    {this.state.isSubmitted && <p>Thank you for your response!</p>}
                </section>

                <button className='light-button' onClick={() => this.props.setStep(1)}>Quiz</button>
                {this.state.isSubmitted || this.props.devMode? (
                    <button className='dark-button' onClick={() => this.submitEverything()}>Results</button>
                ):(
                    <button className='dark-button' onClick={() => this.submitEverything()} disabled={true}>Results</button>
                )}
                
            </div>
        );
    }
}

export default Response;

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

    handleSubmit = () => {
        // Handling the submit action
        this.setState({ isSubmitted: true });
        // Optionally process the responseText here or pass it to parent component
    }

    render() {
        return (
            <div>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Text Response</h3></nav>
                
                <div className='response-section'>
                    <p>{this.state.question}</p>
                    <textarea 
                        value={this.state.responseText} 
                        onChange={this.handleChange} 
                        disabled={this.state.isSubmitted}
                    />
                    {!this.state.isSubmitted && (
                        <button onClick={this.handleSubmit}>Submit Response</button>
                    )}
                    {this.state.isSubmitted && <p>Thank you for your response!</p>}
                </div>

                <button onClick={() => this.props.setStep(1)}>Quiz</button>
                <button onClick={() => this.props.setStep(3)}>Results</button>
            </div>
        );
    }
}

export default Response;

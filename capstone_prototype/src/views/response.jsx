import React, { Component } from 'react';
import './response.css'

class Response extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Text Response</h3></nav>
                <button onClick={()=>this.props.setStep(1)}>Quiz</button>
                <button onClick={()=>this.props.setStep(3)}>Results</button>
            </div>
        );
    }
}

export default Response;
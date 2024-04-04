import React, { Component } from 'react';
import './quiz.css'

class Quiz extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Quiz</h3></nav>
                <button onClick={()=>this.props.setStep(0)}>Video</button>
                <button onClick={()=>this.props.setStep(2)}>Response</button>

            </div>
        );
    }
}

export default Quiz;
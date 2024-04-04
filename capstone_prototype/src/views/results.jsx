import React, { Component } from 'react';
import './results.css'

class Results extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Results</h3></nav>
                <button onClick={()=>this.props.setStep(2)}>Response</button>
                <button onClick={()=>this.props.setStep(4)}>Profile</button>
            </div>
        );
    }
}

export default Results;
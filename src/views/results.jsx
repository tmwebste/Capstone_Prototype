import React, { Component } from 'react';
import './results.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Results extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <section className='results-page'>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Results</h3></nav>
                <section className='grade-grid'>
                    <section className='quiz-grade'>
                        <h1>QUIZ</h1>
                        <CircularProgressbar value={this.props.quizGrade} maxValue={100} text={`${this.props.quizGrade}%`} />

                    </section>
                    <section className='response-grade'>
                        <h1>RESPONSE</h1>
                        <CircularProgressbar value={this.props.responseGrade} maxValue={100} text={`${this.props.responseGrade}%`}/>
                    </section>
                    {/* <h1>{this.props.quizGrade}</h1>
                    <h1>{this.props.responseGrade}</h1> */}
                </section>
                <button className='light-button' onClick={()=>this.props.setStep(2)}>Response</button>
                <button className='dark-button' onClick={()=>this.props.setStep(4)}>Profile</button>
            </section>
        );
    }
}

export default Results;
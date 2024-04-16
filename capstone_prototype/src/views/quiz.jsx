import React, { Component } from 'react';
import './quiz.css';
import { index } from 'd3';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            answers: Array(5).fill(null),
            score: null,
            questions: [
                {
                    questionText: 'Where should the steam wand be placed in the milk?',
                    answerOptions: [
                        { answerText: 'Deep below the surface', isCorrect: false },
                        { answerText: 'Just off-center and barely under the surface', isCorrect: true },
                        { answerText: 'Above the surface', isCorrect: false },
                    ],
                    userCorrect:null
                },
                {
                    questionText: 'What sound indicates that air is being introduced into the milk?',
                    answerOptions: [
                        { answerText: 'A ripping or tearing sound', isCorrect: true },
                        { answerText: 'A humming sound', isCorrect: false },
                        { answerText: 'A whistling sound', isCorrect: false }
                    ],
                    userCorrect:null
                },
                {
                    questionText: 'When should you turn the steam wand off?',
                    answerOptions: [
                        { answerText: 'When the milk starts swirling', isCorrect: false },
                        { answerText: 'After two minutes', isCorrect: false },
                        { answerText: 'When the pitcher is too hot to hold', isCorrect: true }
                    ],
                    userCorrect:null
                },
                {
                    questionText: 'What is the final step in milk steaming?',
                    answerOptions: [
                        { answerText: 'Grooming and maintenance', isCorrect: true },
                        { answerText: 'Pouring the milk', isCorrect: false },
                        { answerText: 'Adding sugar', isCorrect: false }
                    ],
                    userCorrect:null
                },
                {
                    questionText: 'What is an acceptable amount of milk left in the pitcher after steaming?',
                    answerOptions: [
                        { answerText: '2-3 ounces', isCorrect: false },
                        { answerText: 'None, all should be used', isCorrect: false },
                        { answerText: 'An ounce or so', isCorrect: true }
                        
                    ],
                    userCorrect:null
                },
            ]
        };
    }

    handleAnswerSelect = (questionIndex, isCorrect) => {
        
            const newAnswers = this.state.answers.slice();
            newAnswers[questionIndex] = isCorrect;
            // if (newAnswers[questionIndex]){
            //     score +=1;
            // }
            
            const allAnswered = newAnswers.every(answer => answer !== null);

            const newQuestionData = this.state.questions;
           
            newQuestionData[questionIndex].userCorrect = newAnswers[questionIndex];

            const newScore = allAnswered ? newAnswers.filter(Boolean).length : this.state.score;
            console.log(newScore);
            this.props.setQuizGrade(newScore);
            this.props.setQuizData(this.state.questions);
            // this.setState(
            //     {questions: newQuestionData}
            // )

            this.setState ({
            answers: newAnswers,
                allAnswered: allAnswered,
                score: newScore,
                questions: newQuestionData
            });
            
            
            console.log(this.state.score);

            // return {
            //     answers: newAnswers,
            //     allAnswered: allAnswered,
            //     score: allAnswered ? newAnswers.filter(Boolean).length : prevState.score,
            //     questions: newQuestionData
            // };
        ;
    };

    renderQuestion = (question, index) => {
        return (
            <div key={index} className='question'>
                <h2 className='question-text'>{question.questionText}</h2>
                <div className='answer-section'>
                    {question.answerOptions.map((option, optionIndex) => (
                        <label key={optionIndex}>
                            <input 
                                type="radio" 
                                className='quiz-radio'
                                name={`question-${index}`} 
                                onChange={() => this.handleAnswerSelect(index, option.isCorrect)}
                                // disabled={this.state.answers[index] !== null}
                            />
                            {option.answerText}
                        </label>
                    ))}
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className='quiz-view'>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Quiz</h3></nav>

                {this.state.questions.map(this.renderQuestion)}

                {this.state.allAnswered && (
                    <div className='score-section'>
                        Score: {this.state.score} out of {this.state.questions.length}
                    </div>

                )}

                <button className='light-button' onClick={() => this.props.setStep(0)}>Video</button>
                {(this.state.allAnswered || this.props.devMode) ? (
                    <button className='dark-button' onClick={() => this.props.setStep(2)} >Response</button>
                ) : (
                    // Comment and uncomment to 
                    // <button className='dark-button' onClick={() => this.props.setStep(2)} disabled='true'>Response</button>
                    <button className='dark-button' onClick={() => this.props.setStep(2)} disabled >Response</button>
                )}
            </div>
        );
    }
}

export default Quiz;

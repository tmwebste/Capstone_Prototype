import React, { Component } from 'react';
import './quiz.css';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: Array(5).fill(null),
            score: 0,
            questions: [
                {
                    questionText: 'Where should the steam wand be placed in the milk?',
                    answerOptions: [
                        { answerText: 'Deep below the surface', isCorrect: false },
                        { answerText: 'Just off-center and barely under the surface', isCorrect: true },
                        { answerText: 'Above the surface', isCorrect: false },
                    ],
                },
                {
                    questionText: 'What sound indicates that air is being introduced into the milk?',
                    answerOptions: [
                        { answerText: 'A humming sound', isCorrect: false },
                        { answerText: 'A ripping or tearing sound', isCorrect: true },
                        { answerText: 'A whistling sound', isCorrect: false },
                    ],
                },
                {
                    questionText: 'When should you turn the steam wand off?',
                    answerOptions: [
                        { answerText: 'When the milk starts swirling', isCorrect: false },
                        { answerText: 'When the pitcher is too hot to hold', isCorrect: true },
                        { answerText: 'After two minutes', isCorrect: false },
                    ],
                },
                {
                    questionText: 'What is the final step in milk steaming?',
                    answerOptions: [
                        { answerText: 'Pouring the milk', isCorrect: false },
                        { answerText: 'Grooming and maintenance', isCorrect: true },
                        { answerText: 'Adding sugar', isCorrect: false },
                    ],
                },
                {
                    questionText: 'What is an acceptable amount of milk left in the pitcher after steaming?',
                    answerOptions: [
                        { answerText: '2-3 ounces', isCorrect: false },
                        { answerText: 'An ounce or so', isCorrect: true },
                        { answerText: 'None, all should be used', isCorrect: false },
                    ],
                },
            ]
        };
    }
    handleAnswerSelect = (questionIndex, isCorrect) => {
        this.setState(prevState => {
            const newAnswers = prevState.answers.slice();
            newAnswers[questionIndex] = isCorrect;

            const allAnswered = newAnswers.every(answer => answer !== null);

            return {
                answers: newAnswers,
                allAnswered: allAnswered,
                score: allAnswered ? newAnswers.filter(Boolean).length : prevState.score,
            };
        });
    };

    renderQuestion = (question, index) => {
        return (
            <div key={index} className='question'>
                <div className='question-text'>{question.questionText}</div>
                <div className='answer-section'>
                    {question.answerOptions.map((option, optionIndex) => (
                        <label key={optionIndex}>
                            <input 
                                type="radio" 
                                name={`question-${index}`} 
                                onChange={() => this.handleAnswerSelect(index, option.isCorrect)}
                                disabled={this.state.answers[index] !== null}
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
            <div>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Quiz</h3></nav>

                {this.state.questions.map(this.renderQuestion)}

                {this.state.allAnswered && (
                    <div className='score-section'>
                        Score: {this.state.score} out of {this.state.questions.length}
                    </div>
                )}

                <button onClick={() => this.props.setStep(0)}>Video</button>
                <button onClick={() => this.props.setStep(2)}>Response</button>
            </div>
        );
    }
}

export default Quiz;

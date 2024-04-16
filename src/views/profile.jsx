import React, { Component } from 'react';
import './profile.css'
import Chart from '../components/chart';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    getTopSkills = (attributeData) => {
        // console.log(attributeData);
        let combined = attributeData.labels.map((label, index) => ({
            label,
            value: attributeData.data[index]
        }));

        // Sort the combined array based on the value in descending order
        combined.sort((a, b) => b.value - a.value);
        combined = combined.slice(0, 3);
        console.log(combined);

        
        return (
            <div className='profile-attributes'>
                {combined.map(item => (
                    <div className='top-attribute'>
                        <p key={item.label}>{`${item.label}: ${item.value}`}</p>
                    </div>
                ))}
            </div>
          );
    }

    render() {
        return (
            <div>
                <nav className='title-bar'><h3>Your Profile</h3></nav>
                <section className='profile-grid'>
                    <section className='profile-left'>
                        <img className='profile-photo' alt='profile photo'  src='./profile-pic.png' />
                        <h1>Olivia Williams</h1>
                        <h2>Top Skills</h2>
                        <div className='top-skills'>
                            {this.getTopSkills(this.props.chartData.final)}
                        </div>
                    </section>
                    <section className='profile-right'>
                        <Chart className='attribute-chart' dataset1={this.props.chartData.original} dataset2={this.props.chartData.final}></Chart>
                    </section>
                </section>
                <button className='light-button' onClick={() => this.props.setStep(3)}>Results</button>
            </div>
        );
    }
}

export default Profile;
import React, { Component } from 'react';
import './profile.css'
import Chart from '../components/chart';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Profile</h3></nav>
                <section className='profile-grid'>
                    <section className='profile-left'>
                        <img className='profile-photo' alt='profile photo' type="image/svg+xml" src='./profile-photo.svg'/>
                        <h1>YOUR NAME</h1>
                        <p>This is where information about your profile is shown</p>
                    </section>
                    <section className='profile-right'>
                        <Chart className='attribute-chart' dataset1 = {this.props.chartData.original} dataset2 = {this.props.chartData.final}></Chart>
                    </section>
                </section>
                <button onClick={()=>this.props.setStep(3)}>Results</button>
            </div>
        );
    }
}

export default Profile;
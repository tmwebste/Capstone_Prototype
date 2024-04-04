import React, { Component } from 'react';
import './profile.css'

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
                <button onClick={()=>this.props.setStep(3)}>Results</button>
            </div>
        );
    }
}

export default Profile;
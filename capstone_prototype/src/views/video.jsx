import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './video.css'

class Video extends Component {
    constructor() {
        super();
        this.state = {
            video: {
                id: "NuR76h7j6pQ",
                playervars: {
                    height: 600,
                    width: 1000,
                    playing:false
                }
            }

        };
        this.player = null;
    }

    //Ref to youtube player
    ref = player => {
        this.player = player;
    }

    jumpToTime = (seconds) => {
        if (this.player) {
            this.player.seekTo(seconds);
            this.setState(state => (state.video.playervars.playing = true, state))

        }
    }



    render() {
        return (
            <div className='video-view'>
                <nav className='title-bar'><h3>How To Steam Milk For A Latte - Video</h3></nav>
                <section className='video-grid'>

                    <section className='video-left'>
                        <ReactPlayer
                            ref={this.ref}
                            playing={this.state.video.playervars.playing}
                            url={"https://www.youtube.com/watch?v=" + this.state.video.id}
                            height={this.state.video.playervars.height}
                            width={this.state.video.playervars.width}
                        />
                        
                    </section>

                    <section className='video-right'>
                        <ol className='time-stamps'>
                            <li className = 'time-stamp' onClick={() => this.jumpToTime(100.0)}>Prepare the Steam Wand & Choose the Right Pitcher</li>
                            <li className = 'time-stamp' onClick={() => this.jumpToTime(100.0)}>Start Steaming & Texture the Milk</li>
                            <li className = 'time-stamp' onClick={() => this.jumpToTime(100.0)}>Monitor Temperature</li>
                            <li className = 'time-stamp' onClick={() => this.jumpToTime(100.0)}>Finish Steaming</li>
                            <li className = 'time-stamp' onClick={() => this.jumpToTime(100.0)}>Tap and Swirl & Pour and Serve</li>

                        </ol>
                    </section>

                </section>

                <section className='nav-buttons'>
                    {/* <button className="light-button" onClick={() => this.props.setStep(1)}>Quiz</button> */}
                    <button className="dark-button" onClick={() => this.props.setStep(1)}>Quiz</button>
                </section>

            </div>
        );
    }
}

export default Video;
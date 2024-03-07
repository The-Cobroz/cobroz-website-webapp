import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./WebsiteStyles.css";
import WebsiteFooter from './WebsiteFooter.js';
import WebsiteNavbar from './WebsiteNavbar.js';

const CobrozWorking = () => {
    return (
        <>
            <WebsiteNavbar/>
            <div className='cobrozWorking'>
                <div className='workingText'>
                    <div className='row cobrozWorkRow'>
                        <div className='col-md-6 cobrozWorkText'>
                            <h4>Post your queries on the public forum</h4>
                            <h4>Add the tags to make your posts reach the correct people</h4>
                        </div>
                        <div className='col-md-6'>
                            <img alt='post-card-cobroz-graphic'/>
                        </div>
                    </div>
                    <div className='row cobrozWorkRow'>
                        <div className='col-md-6'>
                            <img alt='post-interaction-forum-graphic' />
                        </div>
                        <div className='col-md-6 cobrozWorkText'>
                            <h4>An Interactive and engaging design to enhance your QnA experience</h4>
                            <h4>Choose your legal advisor through adding comments, likes and dislikes</h4>
                        </div>
                    </div>
                    <div className='row cobrozWorkRow'>
                        <div className='col-md-6 cobrozWorkText'>
                            <h4>We support a private and secured chat room for our members</h4>
                            <h4>Chat with fellow community members for better clarification of legal problems</h4>
                        </div>
                        <div className='col-md-6'>
                            <img alt='chat-room-graphics' />
                        </div>
                    </div>
                </div>
                <div className='authButtons signUpWork'>
                    <h5>Join our platform to understand more about it👇</h5>
                    <button className='btn btn-primary'>Sign Up</button>
                </div>
            </div>
            <WebsiteFooter/>
        </>
    );
}

export default CobrozWorking;

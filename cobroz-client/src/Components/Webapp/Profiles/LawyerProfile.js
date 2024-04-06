import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./ProfileStyles.css";
import defProfPhoto from "../../../Images/default-profile-img.jpg";
//import ksProfile from "../../../Images/WhatsApp Image 2024-03-20 at 18.35.16_5d44e2c9.jpg"

const LawyerProfile = ({name, username, bio, posts, broz}) => {
  return (
    <div className='row'>
        <div className='col-sm-3'></div>
        <div className='col-sm-6 profile-page'>
            <div className='profile-info-card'>
                <div className='profile-name-bar row'>
                    <div className='col-sm-9'>
                        <strong>{name}</strong>
                        <p>{username}</p>
                    </div>
                    <div className='col-sm-3'>
                        <button className='btn btn-secondary'>Edit Profile</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 profile-photo'>
                        <img src={defProfPhoto} alt='profile-photo'/>
                    </div>
                    <div className='col-sm-8'>
                        <div className='row'>
                            <div className='col-6'>
                                <strong>{posts}</strong>
                                <p>Posts</p>
                            </div>
                            <div className='col-6'>
                                <strong>{broz}</strong>
                                <p>Broz</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div>
                        {bio}
                    </div>
                </div>
            </div>
            <div className='lawyer-info-card'>
                <h5>Education & Court</h5>
                <div className='row'>
                    <div className='col-sm-6'>
                        <h6>Education</h6>
                        <strong>College Name</strong>
                        <p>Year of Passing</p>
                    </div>
                    <div className='col-sm-6'>
                        <h6>Court</h6>
                        <strong>Current Court, State</strong>
                        <p>Since year</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='col-sm-3'></div>
    </div>
  )
}

export default LawyerProfile

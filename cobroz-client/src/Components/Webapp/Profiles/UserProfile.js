import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./ProfileStyles.css";
import profPhoto from "../../../Images/default-profile-img.jpg"
import BrozComponent from './ProfileComps/BrozComponent.js';
import PostComponent from './ProfileComps/PostComponent.js';

const UserProfile = ({name, username, bio, posts, broz}) => {
  return (
    <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6 profile-page'>
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
                    <div className='col-4 profile-photo'>
                        <img src={profPhoto} alt='profile-photo'/>
                    </div>
                    <div className='col-8'>
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
            <div>
                <h5>BROZ/POSTS</h5>
                {/* <BrozComponent/>
                <BrozComponent/>
                <BrozComponent/> */}
                <PostComponent/>
                <PostComponent/>
                <PostComponent/>
            </div>
        </div>
        <div className='col-md-3'></div>
    </div>
  )
}

export default UserProfile

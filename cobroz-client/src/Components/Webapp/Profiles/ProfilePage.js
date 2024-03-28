import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./ProfileStyles.css";
import AppNavbar from "../AppNavbar.js";
import UserProfile from './UserProfile.js';

const ProfilePage = () => {
  return (
    <>
        <AppNavbar/>
        <div className='cobroz-webapp-background'>
            <UserProfile/>
        </div>
    </>
  )
}

export default ProfilePage;

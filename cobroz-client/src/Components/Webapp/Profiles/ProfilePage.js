import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./ProfileStyles.css";
import AppNavbar from "../AppNavbar.js";
import UserProfile from './UserProfile.js';
import LawyerProfile from './LawyerProfile.js';
import axios from 'axios';

const ProfilePage = () => {

  const [userData , setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    posts: 0,
    broz: 0,
    lawyer: 0
  });

  useEffect(() => {
    async function getDetails(){
      try{
        const response = await axios.get("http://localhost:5000/profile/userProfile", {withCredentials: true});
        setUserData(response.data);
      }
      catch(error){
        alert("Error fetching details:", error);
      }
    }

    getDetails();
  }, []);

  return (
    <>
        <AppNavbar/>
        <div className='cobroz-webapp-background'>
            {userData.lawyer ? LawyerProfile(userData) : UserProfile(userData)}
        </div>
    </>
  )
}

export default ProfilePage;

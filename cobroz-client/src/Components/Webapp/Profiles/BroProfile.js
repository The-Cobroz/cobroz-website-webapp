import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./ProfileStyles.css";
import AppNavbar from '../AppNavbar.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BroLawyer from './BrozProfile/BroLawyer.js';
import BroUser from './BrozProfile/BroUser.js';

const BroProfile = () => {

    const {username} = useParams();

    const [userDetails, setUserDetails] = useState({
        user_id: "",
        name: "",
        username: "",
        lawyer: 0,
        bio: ""
    });
    const [isUser, setIsUser] = useState(true);

    useEffect(() => {
        async function getBroDetails(){
            try{
                await axios
                        .get(`http://localhost:5000/profile/broData/${username}`, {withCredentials: true})
                        .then(response => {
                            if(response.status === 200){
                                if(response.data.length === 0){
                                    setIsUser(false);
                                }
                                else{
                                    setUserDetails(response.data);
                                }
                            }
                        })
            }
            catch(error){
                //alert("Connection Issues, Please Check");
                console.log(error);
            }
        }

        getBroDetails();
    }, []);

    function returnProfiles(){
        if(userDetails.lawyer){
            return <BroLawyer data={userDetails}/>
        }
        else{
            return <BroUser data={userDetails}/>
        }
    }

    function noUser(){
        return(
            <div className='sorryPage'>
                <h6>Sorry, this page isn't available</h6>
                <p>The page may either be broken or removed, <a href='/app'>Go back to Cobroz</a></p>
            </div>
        )
    }

    return (
        <>
            <AppNavbar/>
            <div className='cobroz-webapp-background'>
                {isUser ? returnProfiles() : noUser()}
            </div>
        </>
    )
}

export default BroProfile

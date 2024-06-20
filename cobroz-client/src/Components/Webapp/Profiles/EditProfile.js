import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./ProfileStyles.css";
import AppNavbar from '../AppNavbar.js';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';


const EditProfile = () => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [uniqueUsername, setUniqueUsername] = useState(true);

    useEffect(() => {
        function getDataFromLocal(){//fetching basic user data from local storage
            const userData = JSON.parse(localStorage.getItem("userLocalData"));
            if(userData){
                setName(userData.name);
                setUsername(userData.username);
                setBio(userData.bio);
            }
        }

        getDataFromLocal();
    },[]);

    async function checkUsername(){
        try{
            await axios
                    .get("http://localhost:5000/auth/checkUsername", {params: {username: username}, withCredentials: true})
                    .then(response => {
                        if(response){
                            setIsLoading(false);
                            if(response.status === 200){
                                setUniqueUsername(true);
                            }
                        }
                    })
        }   
        catch(error){
            console.log(error);
            alert("Connection Issues, Please Check");
        }
    }

    function handleUsernameChange(e){
        setUsername(e.target.value);
        setIsLoading(true);
        setUniqueUsername(false);
        checkUsername();
    }

    function handleUnique () {
        if(uniqueUsername){
            return (
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#05f515" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                </p>
            )
        }
        else{
            return (
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e00000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </p>
            )
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios
                    .put("http://localhost:5000/profile/editProfile", {
                            name,
                            username,
                            bio
                        },
                        {
                            withCredentials: true
                        }
                    )
                    .then(response => {
                        if(response.status === 200){
                            setTimeout(() => {
                                window.location.href = "/app/profile";
                            }, 1500);
                        }
                        else{
                            alert("Error updating, try again later");
                        }
                    })
        }
        catch(error){
            console.log(error);
            alert("Connection Issues, Please Check");
        }
    }

    return (
        <>
            <AppNavbar/>
            <div className='row cobroz-apppage'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6 editPage'>
                    <h5>Edit Profile</h5>
                    <div className='editPageDiv'>
                        <form onSubmit={handleSubmit}>
                            <input
                                name='name'
                                type='text'
                                value={name}
                                onChange={handleUsernameChange}
                                placeholder='Your Name'
                            />
                            <div className='username'>
                                <input
                                    name='username'
                                    type='text'
                                    value={username}
                                    onChange={(e) => {setUsername(e.target.value)}}
                                    placeholder='Your Username'
                                />
                                {isLoading ? <p>Checking...</p> : handleUnique()}
                            </div>
                            <textarea
                                name='bio'
                                type='text'
                                value={bio}
                                onChange={(e) => {setBio(e.target.value)}}
                                maxLength={100}
                                placeholder='Add Bio'
                            />
                            <button className='btn btn-primary editProfBtn' type="submit">Submit</button>
                        </form>
                    </div>
                    <div>
                        <a href='/app/settings'>Edit Advance settings</a>
                    </div>
                </div>
                <div className='col-sm-3'></div>
            </div>
        </>
    )
}

export default EditProfile

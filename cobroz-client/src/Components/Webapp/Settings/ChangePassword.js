import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "./SettingsStyle.css";
import AppNavbar from '../AppNavbar.js';
import axios from 'axios';

const ChangePassword = () => {
    const [passVerified, setPassVerified] = useState(false);
    const [currPassword, setCurrPassword] = useState("");
    const [newPass, setNewPass] = useState("");
    const [cnfmPass, setCnfmPass] = useState("");

    async function checkPassword(e){
        e.preventDefault();

        try{
            await axios
                    .post("http://localhost:5000/auth/checkPassword", 
                        {
                            password: currPassword
                        },
                        {
                            withCredentials: true
                        }
                    )
                    .then(response => {
                        if(response.status === 200){
                            setPassVerified(true);
                        }
                        else{
                            alert("Wrong Password");
                        }
                    })
                    .catch(console.error())
        }
        catch(error){
            console.log(error);
            alert("Connection Issues, please check");
        }
    }

    function verifyComp(){
        return(
            <div>
                <p>We need to verify it's you. Please enter your current password</p>
                <form className='settings-form' onSubmit={checkPassword}>
                    <input
                        name='currPassword'
                        type='password'
                        value={currPassword}
                        onChange={(e) => {setCurrPassword(e.target.value)}}
                        placeholder='Current Password'
                        required
                    />
                    <button className='btn btn-primary' type='submit'>Next</button>
                </form>
            </div>
        )
    }

    async function addNewPassword(e){
        e.preventDefault();


        try{
            if(newPass !== cnfmPass){
                alert("Password didn't match");
            }
            else if(newPass.length < 8){
                alert("Password must be atleast 8 characters long");
            }
            else{
                await axios 
                    .put("http://localhost:5000/profile/changePassword",
                        {
                            password: newPass
                        },
                        {
                            withCredentials: true
                        }
                    )
                    .then(response => {
                        if(response.status === 200){
                            alert("Password Changed");
                            window.location.href = "/app/settings";
                        }
                        else{
                            alert("Unable to change password");
                        }
                    })
                    .catch(console.error())
            }
        }
        catch(error){
            console.log(error);
            alert("Connection Issues, please check");
        }
    }

    function newPasswordComp(){
        return (
            <div className='changePassword'>
                <ul>
                    <li>Enter your new password.</li>
                    <li>Password must be atleast 8 characters long.</li>
                    <li>It must contain a number, an alphabet and a special character</li>
                </ul>
                <form className='settings-form' onSubmit={addNewPassword}>
                    <input
                        name='newPass'
                        type='password'
                        value={newPass}
                        onChange={(e) => {setNewPass(e.target.value)}}
                        placeholder='New Password'
                        required
                    />
                    <input
                        name='cnfmPass'
                        type='password'
                        value={cnfmPass}
                        onChange={(e) => {setCnfmPass(e.target.value)}}
                        placeholder='Confirm Password'
                        required
                    />
                    <button className='btn btn-success' type='submit'>Change Password</button>
                </form>
            </div>
        )
    }

    return (
        <>
            <AppNavbar/>
            <div className='row cobroz-apppage'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                    {passVerified ? newPasswordComp() : verifyComp()}
                </div>
                <div className='col-sm-3'></div>
            </div>
        </>
    )
}

export default ChangePassword

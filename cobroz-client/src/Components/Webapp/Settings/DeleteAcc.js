import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "./SettingsStyle.css";
import AppNavbar from '../AppNavbar.js';
import axios from 'axios';


const DeleteAcc = () => {
    
    const [password, setPassword] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    function handleDialog(){
        setOpenDialog((prevDialog) => !prevDialog);
    }

    async function deleteAccount(){
        try{
            await axios
                    .put("http:/localhost:5000/auth/deleteUser", {withCredentials: true})
                    .then(response => {
                        if(response.status === 200){
                            alert("Account Deleted Successfully !!");
                            window.location.href = "/auth/signup/user";
                        }

                    })
        }
        catch(error){
            console.log(error);
            alert("Connection Issues, Please Check");
        }
    }

    function deleteDialog(){
        return (
            <div className='switchDialog'>
                <p>Are you sure you want to delete your account?</p>
                <p>Your will lose all your data once clicked "Confirm"</p>
                <button className='btn btn-danger' onClick={deleteAccount}>Confirm</button>
                <button className='btn btn-secondary' onClick={handleDialog}>Cancel</button>
            </div>
        )
    }

    async function checkPassword(e){
        e.preventDefault();

        try{
            await axios
                    .post("http://localhost:5000/auth/checkPassword",
                        {
                            password
                        },
                        {
                            withCredentials: true
                        }
                    )
                    .then(response => {
                        if(response.status === 200){
                            handleDialog();
                        }
                        else{
                            alert("Wrong Password");
                        }
                    })
                    .catch(error => {
                        console.log(error);
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
                <div className='col-sm-6'>
                    <div>
                        <p>We are sorry to see you go!</p>
                        <p>Feel free to send us your feedback regarding Cobroz at <strong>team@cobroz.com</strong></p>
                    </div>
                    {openDialog ? deleteDialog() : ""}
                    <div>
                        <p>In order to proceed we need to confirm it's you. Please enter your password.</p>
                        <form className='settings-form' onSubmit={checkPassword}>
                            <input
                                name='password'
                                type='password'
                                value={password}
                                placeholder='Confirm Your Password'
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <button className='btn btn-danger' type='submit'>Delete</button>
                        </form>
                    </div>
                </div>
                <div className='col-sm-3'></div>
            </div>
        </>
    )
}

export default DeleteAcc

import React, { useDebugValue, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "./SettingsStyle.css";
import AppNavbar from '../AppNavbar.js';
import { getCookieVal } from '../../../UtilFunctions/getCookie.js';
import axios from 'axios';

const ChangeAcc = () => {

    const [accType, setAccType] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if(getCookieVal("CobrozAccType") === "1"){
            setAccType(1);
        }   
    }, []);

    function handleSwitchDialog(){
        setOpenDialog((prevOpenDialog) => !prevOpenDialog);
    }

    function changeAccDialogBox(){
        return(
            <div className='switchDialog'>
                <p>Are you sure you want to change your Account to <strong>{accType ? "User" : "Lawyer"}</strong> account</p>
                {accType ? <p>On confirming you will lose your lawyer data.</p> : ""}
                <button className='btn btn-primary' onClick={handleSwitch}>Confirm</button>
                <button className='btn btn-secondary' onClick={handleSwitchDialog}>Cancel</button>
            </div>
        )
    }

    const handleSwitch = async(e) => {
        try{    
            await axios
                    .put("http://localhost:5000/profile/updateType", 
                        {
                            type : !accType
                        },
                        {
                            withCredentials: true
                        }
                    )
                    .then(response => {
                        if(response.status === 200){
                            alert("Account Type Changed, Login Again");
                            window.location.href = "/auth/signin";
                        }
                        else{
                            alert("Error, Try again later");
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
                    <h5>Change Your Account Type</h5>
                    {openDialog ? changeAccDialogBox(): ""}
                    <div className='switchBtn' onClick={handleSwitchDialog}>
                        Switch to {accType ? "User" : "Lawyer"} Account
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                </div>
                <div className='col-sm-3'></div>
            </div>
        </>
    )
}

export default ChangeAcc

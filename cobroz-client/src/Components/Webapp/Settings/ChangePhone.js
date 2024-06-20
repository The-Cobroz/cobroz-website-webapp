import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "./SettingsStyle.css";
import AppNavbar from '../AppNavbar.js';
import axios from 'axios';

const ChangePhone = () => {

    const [phone, setPhone] = useState();

    useEffect(() => {
        async function getPhone(){
            try{
                await axios 
                        .get("http://localhost:5000/profile/userPhone", {withCredentials: true})
                        .then(response => {
                            if(response.status === 200){
                                if(response.data !== null){
                                    setPhone(response.data.phone);
                                }
                            }
                        })
                        .catch(console.error())
            }
            catch(error){
                alert("Connection Issues, Please Check");
            }
        }

        getPhone();
    }, []);

    async function handlePhone(e){
        e.preventDefault();

        try{

            if(phone.length === 10){
                await axios
                        .put("http://localhost:5000/profile/editProfile", 
                            {
                                phone: phone
                            },
                            {
                                withCredentials: true
                            }
                        )
                        .then(response => {
                            if(response.status === 200){
                                alert("Phone Number added");
                                window.location.href = "/app/settings";
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
            }
            else{
                alert("Phone Number must be 10 digits long");
            }
        }
        catch(error){
            console.log(error);
            alert("Connection Issues, Please check");
        }
    }

    return (
        <>
            <AppNavbar/>
            <div className='row cobroz-apppage'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                    <div>
                        <h5>Your Phone Number</h5>
                        <form className='settings-form' onSubmit={handlePhone}>
                            <input
                                name='phone'
                                type='text'
                                value={phone}
                                onChange={(e) => {setPhone(e.target.value)}}
                                placeholder='Your Phone Number'
                            />
                            <button className='btn btn-success' type='submit'>Add</button>
                        </form>
                    </div>
                </div>
                <div className='col-sm-3'></div>
            </div>
        </>
    )
}

export default ChangePhone

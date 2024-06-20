import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./SettingsStyle.css";
import AppNavbar from '../AppNavbar.js';

const SettingsPage = () => {
    return (
        <>
            <AppNavbar/>
            <div className='row cobroz-apppage'>
                <div className='col-sm-2'></div>
                <div className='col-sm-8 settings'>
                    <h3>Settings</h3>
                    <br/>
                    <section className='settings-section'>
                        <h5>Personal Information</h5>
                        <div>
                            <div className='setting-option' onClick={() => {window.location.href = "/profile/edit"}}>Personal Information</div>
                            <div className='setting-option' onClick={() => {window.location.href = "/app/settings/phonenumber"}}>Add/Edit Mobile Number</div>
                            <div className='setting-option' onClick={() => {window.location.href = "/app/settings/password"}}>Change Password</div>
                        </div>
                    </section>
                    <section className='settings-section'>
                        <h5>Account Settings</h5>
                        <div>
                            <div className='setting-option' onClick={() => {window.location.href = "/app/account/type_change"}}>Account Type</div>
                            <div className='setting-option' onClick={() => {window.location.href = "/app/account/delete"}}>Delete Account</div>
                        </div>
                    </section>
                </div>
                <div className='col-sm-2'></div>
            </div>
        </>
    )
}

export default SettingsPage

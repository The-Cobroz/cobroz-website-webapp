import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "../ProfileStyles.css";

const BrozComponent = () => {
    return (
        <div className='row bro-component'>
            <div className='col'>
                <img src='' alt='profile-photo-bro'/>
            </div>
            <div className='col'>
                <h6>Name Surname</h6>
                <p>Username</p>
            </div>
            <div className='col bro-btn'>
                <button className='btn btn-outline-dark'>Unbro</button>
            </div>
        </div>
    )
}

export default BrozComponent;

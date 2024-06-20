import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "../ProfileStyles.css";
import AppNavbar from '../../AppNavbar';

const MiscDetails = () => {
    const [verifId, setVerifId] = useState("");
    const [cllg, setCllg] = useState("");
    const [passYear, setPassYear] = useState();
    const [court, setCourt] = useState("");
    const [sinceYear, setSinceYear] = useState();
    const [lawId, setLawId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <AppNavbar/>
            <div className='row cobroz-apppage'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                    <div className='miscDetails'>
                        <form className='miscDetailsForm' onSubmit={handleSubmit}>
                            <h6>Education Details</h6>
                            <input
                                name='cllg'
                                type='text'
                                value={cllg}
                                onChange={(e) => {setCllg(e.target.value)}}
                                placeholder='Your Institution'
                                required
                            />
                            <input
                                name='passYear'
                                type='year'
                                value={passYear}
                                onChange={(e) => {setPassYear(e.target.value)}}
                                placeholder='Passing Year'
                                required
                            />
                            <h6>Work Details</h6>
                            <input
                                name='court'
                                type='text'
                                value={court}
                                onChange={(e) => {setCourt(e.target.value)}}
                                placeholder='Court where you practice'
                                requried
                            />
                            <input
                                name='sinceYear'
                                type='year'
                                value={sinceYear}
                                onChange={(e) => {setSinceYear(e.target.value)}}
                                placeholder='Practicing Since'
                                required
                            />
                            <input
                                name='lawId'
                                type='text'
                                value={lawId}
                                onChange={(e) => {setLawId(e.target.value)}}
                                placeholder='Your Unique Lawyer ID'
                                required
                            />
                            <button className='btn btn-primary' type='submit'>Confirm</button>
                        </form> 
                    </div>
                </div>
                <div className='col-sm-3'></div>
            </div>
        </>
    )
}

export default MiscDetails

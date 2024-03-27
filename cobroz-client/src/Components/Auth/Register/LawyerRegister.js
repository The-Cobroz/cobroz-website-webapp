import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "../AuthStyles.css";
import WebsiteFooter from '../../Website/WebsiteFooter';
import WebsiteNavbar from '../../Website/WebsiteNavbar';

const LawyerRegister = () => {

    const [personalData, setPersonalData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        lawyer: 1
    });
    const [showPassword, setShowPassword] = useState(false);
    const [cnfmPassword, setCnfmPassword] = useState("");

    const handlePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleNewUser = (e) => {
        e.preventDefault();
    }    

    const personalForm = () => {
        return(
            <form className='signForm' onSubmit={handleNewUser}>
                <h6>Personal Data</h6>
                <div className='signInput'>
                    <input
                        name='name'
                        type='text'
                        placeholder='Your Name'
                        required
                    />
                </div>
                <div className='signInput'>
                    <input
                        name='email'
                        type='email'
                        placeholder='Your Email'
                        required
                    />
                </div>
                <div className='signInput'>
                    <input
                        name='username'
                        type='text'
                        placeholder='Your Username'
                        required
                    />
                </div>
                 <div className='signInput'>
                    <input
                        id='password'
                        name='password'
                        type={showPassword? "text" : "password"}
                        placeholder='Your Password'
                        required
                    />
                    {showPassword ? <svg onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg> : <svg onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>}
                    </div>
                <div className='signInput'>
                    <input
                        name='cnfmPassword'
                        type='password'
                        placeholder='Confirm your Password'
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Sign Up</button>
            </form>
        );
    }

    // const lawAuthForm = () => {
    //     return(
    //         <form className='signForm'>
    //             <h6>Lawyer Data</h6>
    //             <div className='signInput'>
    //                 <select name='courtName' required>
    //                     <option>Select Your Court</option>
    //                     <option value="Supreme Court of India">Supreme Court of India</option>
    //                     <option value="High Court of Delhi">High Court of Delhi</option>
    //                     <option value="Tis Hazari Court(Kashmere Gate)">Tis Hazari Court(Kashmere Gate)</option>
    //                     <option value="Patiala House Court">Patiala House Court</option>
    //                     <option value="Karkardooma Court(Anand Vihar)">Karkardooma Court(Anand Vihar)</option>
    //                     <option value="Rohini Court">Rohini Court</option>
    //                     <option value="Dwarka Court">Dwarka Court</option>
    //                     <option value="Saket Court">Saket Court</option>
    //                     <option value="Rouse Avenue Court(ITO, Delhi)">Rouse Avenue Court(ITO, Delhi)</option>
    //                 </select>
    //             </div>
    //             <div className='signInput'>
    //                 <input
    //                     name='lawID'
    //                     required
    //                     type='text'
    //                     placeholder='Your Lawyer ID'

    //                 />
    //             </div>
    //             <div className='signInput'>
    //                 <input
    //                     name='certOfPrac'
    //                     required
    //                     type='file'
    //                     placeholder='Upload Your Certificate of Practice'
    //                 />
    //             </div>
    //             <button className='btn btn-primary' type='submit'>Submit</button>
    //         </form>
    //     )
    // }

    return (
        <>
            <WebsiteNavbar/>
            <div className='authPage'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6 formArea'>
                        <h3>Sign Up to Cobroz</h3>
                        <h5>A Lawyer Account</h5>
                        {personalForm()}
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
            <WebsiteFooter/>
        </>   
    )
}

export default LawyerRegister

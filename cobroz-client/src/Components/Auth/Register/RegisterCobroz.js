import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "../AuthStyles.css";
import WebsiteFooter from '../../Website/WebsiteFooter';
import WebsiteNavbar from '../../Website/WebsiteNavbar';
import axios from 'axios';

const RegisterCobroz = () => {

    const [showPassword ,setShowPassword] = useState(false);
    const [cnfmPassword, setCnfmPassword] = useState("");
    const [lawyer, setLawyer] = useState(0);
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        lawyer: lawyer
    });

    function handleLawyer(){
        const updatedVal = !lawyer;
        
        setLawyer(updatedVal);
        setUserData({...userData, lawyer: updatedVal});
    }

    function checkUsername(){
        try{    
            axios
                .get("http://localhost:5000/auth/checkUsername", {withCredentials: true, params: {username: userData.username}})
                .then(response => {
                    if(response.status === 200){
                        return true;
                    }
                    else{
                        window.alert("This username is already taken");
                    }
                })
                .catch(error => {
                    console.log(error);
                    window.alert("Error connecting to Server for username");
                })
        }
        catch(error){
            console.log(error);
            window.alert("Error connecting to Server for username try");
        }
    }

    function checkEmail(){
        try{
            axios   
                .get("http://localhost:5000/auth/checkEmail",{withCredentials: true, params:{email: userData.email}})
                .then(response => {
                    if(response.status === 200){
                        return true;
                    }
                    else{
                        window.alert("This email already has an account");
                    }
                })
                .catch(error => {
                    console.log(error);
                    window.alert("Error connecting to Server for Email");
                })
        }
        catch(error){
            console.log(error);
            window.alert("Error connecting to Server for email try")
        }
    }

    useEffect(()=> {
        try{
            if(userData.username){
                checkUsername();
            }
            if(userData.email){
                checkEmail();
            }
        }
        catch(error){
            console.log(error);
            window.alert("Error connecting to Server for useEffect");
        }
    },[userData])

    const handleChange = (e) => {
        e.preventDefault();

        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    }

    function handlePassword() {
        if(showPassword){
            setShowPassword(false);
        }
        else{
            setShowPassword(true);
        }
    }

    function handleNewUser(e){
        e.preventDefault();

        if(userData.password !== cnfmPassword){
            window.alert("Password doesn't match!");
        }
        else{
            try{
                console.log(userData.lawyer);
                axios   
                    .post("http://localhost:5000/auth/register", userData, {withCredentials: true})
                    .then(response => {
                        if(response.status === 200){
                            window.location.href = "/app";
                        }
                        else if(response.status === 205){
                            window.alert("Error connecting to server, Try again later");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        window.alert("Credentials already exists, Try Again");
                    });
            }
            catch(error){
                console.log(error);
            }
        }
    }


    return (
        <>
            <WebsiteNavbar/>
            <div className='authPage'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6 formArea'>
                        <h3>Sign Up to Cobroz</h3>
                        <h5>An {lawyer ? "Lawyer" : "User"} Account</h5>
                        <form className='signForm' onSubmit={handleNewUser}>
                            <div className='signInput'>
                                <input
                                    name='name'
                                    type='text'
                                    placeholder='Your Name'
                                    required
                                    value={userData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='signInput'>
                                <input
                                    name='username'
                                    type='text'
                                    placeholder='Your Username'
                                    required
                                    value={userData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='signInput'>
                                <input
                                    name='email'
                                    type='email'
                                    placeholder='Your Email'
                                    required
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='signInput'>
                                <input
                                    id='password'
                                    name='password'
                                    type={showPassword? "text" : "password"}
                                    placeholder='Your Password'
                                    required
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                                {showPassword ? <svg onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg> : <svg onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>}
                                </div>
                            <div className='signInput'>
                                <input
                                    name='cnfmPassword'
                                    type='password'
                                    placeholder='Confirm your Password'
                                    required
                                    value={cnfmPassword}
                                    onChange={(e) => setCnfmPassword(e.target.value)}
                                />
                            </div>
                            <button className='btn btn-primary' type='submit'>Sign Up</button>
                        </form>
                        <button className='btn btn-secondary' onClick={handleLawyer}>{lawyer ? "Sign Up as User" : "Sign Up as Lawyer"}</button>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
            <WebsiteFooter/>
        </>
    )
}

export default RegisterCobroz

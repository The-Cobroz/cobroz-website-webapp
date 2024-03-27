import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./AuthStyles.css";
import WebsiteNavbar from "../Website/WebsiteNavbar";
import WebsiteFooter from "../Website/WebsiteFooter";
import axios from "axios";

const LoginCobroz = () => {

  const [loginByEmail, setLoginByEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: ""
  });

  function handlePassword(){
    setShowPassword(!showPassword);
  }

  function LoginOption(){
    var optionButton = document.getElementById("optionBtn");

    setLoginData({ //resetting the members to empty string to avoid collision between incomplete filled values of username and email
      username: "",
      email: "",
      password: ""
    });

    if(loginByEmail){
      optionButton.innerHTML = "Sign In using Username";
      setLoginByEmail(false);
    }
    else{
      optionButton.innerHTML = "Sign In using Email";
      setLoginByEmail(true);
    }
  }

  const handleChange = (e) => { //function to handle change in input field and assign it to the formData object
    e.preventDefault();

    const {name, value} = e.target;
    setLoginData({...loginData, [name]: value});
  }

  const handleLogin = (e) => {
    e.preventDefault();
    try{
      console.log(loginData);
      axios
        .post("http://localhost:5000/auth/login", loginData, {withCredentials: true})
        .then(response => {
          if(response.status === 200){
            window.location.href = "/app";
          }
          else if(response.status === 203){
            alert("Wrong Password");
          }
          else if(response.status === 204){
            window.alert("Wrong Username/Email not found");
          }
          else{
            alert("Error connecting to server, Try again later");
          }
        })
        .catch(error => console.log(error));
    }
    catch(error){
      console.log(error);
    }
  }
 
  const LoginByEmail = () => {
    return(
      <form className='signForm' onSubmit={handleLogin}>
        <div className='signInput'>
          <input
            placeholder='Your Email'
            name='email'
            type='email'
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='signInput'>
          <input
            placeholder='Your Password'
            name='password'
            type={showPassword ? "text" : "password"}
            id='password'
            onChange={handleChange}
            value={loginData.password}
            required
          />
          {showPassword ? 
            <svg onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg> : <svg onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          }
        </div>
        <button className='btn btn-primary' type='submit'>Sign In</button>
      </form>
    );
  }

  const LoginByUsername = () => {
    return(
      <form className='signForm' onSubmit={handleLogin}>
        <div className='signInput'>
          <input
            placeholder='Your Username'
            name='username'
            type='username'
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='signInput'>
          <input
            placeholder='Your Password'
            name='password'
            type={showPassword ? "text" : "password"}
            value={loginData.password}
            onChange={handleChange}
            id='password'
            required
          />
          {showPassword ? 
            <svg onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg> : <svg onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          }
        </div>
        <button className='btn btn-primary' type='submit'>Sign In</button>
      </form>
    );
  }
  return (
    <>
      <WebsiteNavbar/>
      <div className='authPage'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6 formArea'>
            <h3>Sign In to Cobroz</h3>
            {loginByEmail ? LoginByUsername() : LoginByEmail()}
            <button className='btn btn-secondary' id='optionBtn' onClick={LoginOption}>Sign In using Username</button>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
      <WebsiteFooter/>
    </>
  )
}

export default LoginCobroz

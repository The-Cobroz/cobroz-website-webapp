import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import Homepage from '../Components/Website/Homepage';
import AboutPage from '../Components/Website/AboutPage';
import CobrozWorking from '../Components/Website/CobrozWorking';
import ContactCobroz from '../Components/Website/ContactCobroz';
import LoginCobroz from '../Components/Auth/LoginCobroz';
import RegisterCobroz from '../Components/Auth/Register/RegisterCobroz';
import LawyerRegister from '../Components/Auth/Register/LawyerRegister';
import CobrozApp from '../Components/Webapp/CobrozApp';
import ProfilePage from '../Components/Webapp/Profiles/ProfilePage';


const AppRouter = () => {
    return (
      <>
          <BrowserRouter>
            <Routes>
              <Route path='/' Component={Homepage}/>
              <Route path='/about' Component={AboutPage}/>
              <Route path='/cobroz-works' Component={CobrozWorking}/>
              <Route path='/contact-cobroz' Component={ContactCobroz}/>
              <Route path='/auth/signin' Component={LoginCobroz}/>
              <Route path='/auth/signup/user' Component={RegisterCobroz}/>
              <Route path='/auth/signup/lawyer' Component={LawyerRegister}/>
              <Route path='/app' Component={CobrozApp}/>
              <Route path='/app/profile' Component={ProfilePage}/>
            </Routes>
          </BrowserRouter>
      </>
    )
}

export default AppRouter

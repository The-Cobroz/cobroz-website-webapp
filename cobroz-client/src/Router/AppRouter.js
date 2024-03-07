import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import Homepage from '../Components/Website/Homepage';
import AboutPage from '../Components/Website/AboutPage';
import CobrozWorking from '../Components/Website/CobrozWorking';
import ContactCobroz from '../Components/Website/ContactCobroz';


const AppRouter = () => {
    return (
      <>
          <BrowserRouter>
            <Routes>
              <Route path='/' Component={Homepage}/>
              <Route path='/about' Component={AboutPage}/>
              <Route path='/cobroz-works' Component={CobrozWorking}/>
              <Route path='/contact-cobroz' Component={ContactCobroz}/>
            </Routes>
          </BrowserRouter>
      </>
    )
}

export default AppRouter

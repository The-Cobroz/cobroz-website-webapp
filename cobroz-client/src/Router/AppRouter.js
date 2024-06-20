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
import NewPost from '../Components/Webapp/Post/NewPost';
import IndividualPost from '../Components/Webapp/Post/IndividualPost';
import EditPost from '../Components/Webapp/Post/EditPost';
import BroProfile from '../Components/Webapp/Profiles/BroProfile';
import EditProfile from '../Components/Webapp/Profiles/EditProfile';
import SettingsPage from '../Components/Webapp/Settings/SettingsPage';
import ChangePhone from '../Components/Webapp/Settings/ChangePhone';
import ChangePassword from '../Components/Webapp/Settings/ChangePassword';
import ChangeAcc from '../Components/Webapp/Settings/ChangeAcc';
import DeleteAcc from '../Components/Webapp/Settings/DeleteAcc';
import MiscDetails from '../Components/Webapp/Profiles/EditComponents/MiscDetails';

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
              <Route path='/post/new' Component={NewPost}/>
              <Route path='/post/:id' Component={IndividualPost}/>
              <Route path='/post/edit/:id' Component={EditPost}/>
              <Route path='/:username' Component={BroProfile}/>
              <Route path='/profile/edit' Component={EditProfile}/>
              <Route path='/app/settings' Component={SettingsPage}/>
              <Route path='/app/settings/phonenumber' Component={ChangePhone}/>
              <Route path='/app/settings/password' Component={ChangePassword}/>
              <Route path='/app/account/type_change' Component={ChangeAcc}/>
              <Route path='/app/account/delete' Component={DeleteAcc}/>
              <Route path='/profile/add_Lawyer_Info' Component={MiscDetails}/>
            </Routes>
          </BrowserRouter>
      </>
    )
}

export default AppRouter

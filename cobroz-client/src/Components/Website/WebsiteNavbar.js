import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import cobrozLogo from "../../Images/cobroz-icon.png";
import "./WebsiteStyles.css";

const WebsiteNavbar = () => {
  return (
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div className='navbar-brand cobroz-logo' onClick={() => {window.location.href = "/"}}>
                <img src={cobrozLogo}/>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse websiteLinks" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href='/about'><h6>About</h6></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href='/cobroz-works'><h6>How does this work</h6></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href='/contact-cobroz'><h6>Contact Us</h6></a>
                    </li>
                </ul>
            </div>
            <div className='authButtons'>
                <button className='btn btn-primary'>Sign In</button>
                <button className='btn btn-primary'>Sign Up</button>
            </div>
        </div>
    </nav>
  )
}

export default WebsiteNavbar;

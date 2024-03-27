import React from 'react';
import "./WebsiteStyles.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../../Images/cobroz-icon.png"

const WebsiteFooter = () => {
    return (
        <div className='row websiteFooter'>
            <div className='col-lg-4'>
                <div className='footerLogo' onClick={() => {window.location.href = "/"}}>
                    <img src={logo}/>
                </div>
                <h6 className='logoFontTag taglineFooter'>Ask Learn Resolve</h6>
            </div>
            <div className='col-lg-4 conBox'>
                <h6>Features</h6>
                <h6 onClick={() => {
                    window.location.href = "/about";
                }}>About Cobroz</h6>
                <h6 onClick={() => {
                    window.location.href= "/contact-cobroz"
                }}>Contact Us</h6>
                <h6 onClick={() => {window.location.href = "/auth/signin"}}>Sign In to Platform</h6>
            </div>
            <div className='col-lg-4 contactFooter'>
                <div className='contact-info'>
                    <a href='mailto:team@cobroz.com'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokelinejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>: team@cobroz.com
                </div>
                <div className='contact-social'>
                    <a href='https://www.linkedin.com/company/cobroz'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
                    <a href='https://www.instagram.com/cobrozhq'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
                </div>
            </div>
            <div>
                <p>©️Cobroz 2024</p>
            </div>
        </div>
    )
}

export default WebsiteFooter

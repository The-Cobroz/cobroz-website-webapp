import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import WebsiteNavbar from './WebsiteNavbar.js';
import "./WebsiteStyles.css";
import cobrozLogo from "../../Images/cobroz-icon.png";
import legalGraphic from "../../Images/legal-Comm-Graphic.png"
import WebsiteFooter from './WebsiteFooter.js';

const Homepage = () => {
  return (
    <>
        <header>
            <WebsiteNavbar/>
        </header>
        <div className='websiteHomepage'>
            <div className='row'>
                <div>
                    <div className='row'>
                        <div className='col-md-5 cobrozLogo'>
                            <p className='logoFontTag'>Unlock Legal Clarity at</p>
                            <img src={cobrozLogo} alt='cobroz Logo'/>
                            <h1 className='logoFont'>COBROZ</h1>
                            <h6 className='logoFontTag'>Ask Learn Resolve</h6>
                            <p>
                                Cobroz as a platform aims to simplify the process of navigating legal landscape.
                            </p>
                            <button className='btn btn-outline-light' onClick={() => {window.location.href = "/signin"}}>Sign In</button>
                        </div>
                        <div className='col-md-7 cobrozText'>
                            <img src={legalGraphic}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section id="features">
        <h1>Why Join Cobroz?</h1>
        <div>
            <div class='row feature-row'>
                <h4>For Clients</h4>
                <div class='col-md-4 feature-card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                        stroke="#310665" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-check-circle-2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                    <h6><strong>Verified Lawyers</strong></h6>
                    <p>All the lawyers on the platform are varified to maintain integrity </p>
                </div>
                <div class='col-md-4 feature-card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                        stroke="#310665" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-circle-dot">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="1" />
                    </svg>
                    <h6><strong>Choosing becomes Easier</strong></h6>
                    <p>Choosing lawyer becomes easier you get to see the solution they are offering</p>
                </div>
                <diV class='col-md-4 feature-card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                        stroke="#310665" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-goal">
                        <path d="M12 13V2l8 4-8 4" />
                        <path d="M20.55 10.23A9 9 0 1 1 8 4.94" />
                        <path d="M8 10a5 5 0 1 0 8.9 2.02" />
                    </svg>
                    <h6><strong>One Stop to Legal Queries</strong></h6>
                    <p>All your legal queries can be solved here</p>
                </diV>
            </div>
            <div class='row feature-row'>
                <h4>For Lawyers</h4>
                <div class='col-md-4 feature-card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                        stroke="#310665" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-book-user">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        <circle cx="12" cy="8" r="2" />
                        <path d="M15 13a3 3 0 1 0-6 0" />
                    </svg>
                    <h6><strong>Access to Clients</strong></h6>
                    <p>Increase your access to the client who need your expertise</p>
                </div>
                <div class='col-md-4 feature-card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                        stroke="#310665" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-circle-user-round">
                        <path d="M18 20a6 6 0 0 0-12 0" />
                        <circle cx="12" cy="10" r="4" />
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                    <h6><strong>Online Presence</strong></h6>
                    <p>Increase your online presence through this platform</p>
                </div>
                <div class='col-md-4     feature-card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                        stroke="#310665" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-scale">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                        <path d="M7 21h10" />
                        <path d="M12 3v18" />
                        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
                    </svg>
                    <h6><strong>Skills over Experience</strong></h6>
                    <p>Your past experience won't cause any problem as people can choose for what you offer them</p>
                </div>
            </div>
        </div>
    </section>
        <footer>
            <WebsiteFooter/>
        </footer>
    </>
  )
}

export default Homepage

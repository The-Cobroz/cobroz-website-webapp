import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./WebsiteStyles.css";
import WebsiteFooter from './WebsiteFooter';
import WebsiteNavbar from './WebsiteNavbar';

const ContactCobroz = () => {
    return (
        <>
            <WebsiteNavbar/>
            <div className='contactCobroz'>
                <h5>Facing a problem? Any Complaint? Any Feedback?</h5>
                <h5>Feel free to share, our community members are our top priority</h5>
                <form>
                    <div>
                        <input
                            name='name'
                            type='name'
                            placeholder='Your Name'
                        />
                    </div>
                    <div>
                        <input
                            name='email'
                            type='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <textarea
                            name="query"
                            type="text"
                            placeholder='What do you want to say?'
                            rows={10}
                            cols={70}
                            resizeable="none"
                        />
                    </div>
                    <button className='btn btn-outline-success' type='submit'>Submit</button>
                </form>
                <div className='contactEmail'>
                    <h5><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> Mail us at: team@cobroz.com</h5>
                </div>
            </div>
            <WebsiteFooter/>
        </>
    )
}

export default ContactCobroz

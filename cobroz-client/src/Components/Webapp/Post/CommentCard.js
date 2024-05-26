import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./PostStyles.css";

const CommentCard = () => {
    return (
        <div className='commentcard'>
            <div className='row'>
                <div className='col-1'>
                    <img src='' alt='ac'/>
                </div>
                <div className='col-9'>
                    <p>Name Surname</p>
                    <p>Surname</p>
                </div>
                <div className='col-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </div>
            </div>
            <div className='commentcontent'>
                <p>Comment</p>
            </div>
            <div className='commenttools'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
            </div>
        </div>
    )
}

export default CommentCard

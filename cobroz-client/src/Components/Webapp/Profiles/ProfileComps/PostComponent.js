import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "../ProfileStyles.css";


const PostComponent = ({data}) => {
  return (
    <div className='profile-post-comp' onClick={() => [window.location.href = `/post/${data.post_id}`]}>
        <strong>{data.heading}</strong>
        <p>{data.content.slice(0,100)}</p>
        {/* <div className='profile-post-img'>
            <img src='' alt='any associated image/file'/>
        </div> */}
        <div className='profile-post-likes'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up"><path d="m17 11-5-5-5 5"/><path d="m17 18-5-5-5 5"/></svg>
            <p>{data.like_count}</p>
        </div>
    </div>
  )
}

export default PostComponent

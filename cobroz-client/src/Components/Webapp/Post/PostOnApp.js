import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "./PostStyles.css";
import profile from "../../../Images/default-profile-img.jpg"

const PostOnApp = ({data}) => {

    const [viewOptions, setViewOptions] = useState(false);

    const options = () => {
        setViewOptions(prevOption => !prevOption);
        console.log(viewOptions);
    }

    function postOptionsCard(){
        return(
            <div className='optionsCard'>
                <p onClick={() => {window.location.href = `/post/edit/${data.post_id}`}}>Edit Post</p>
                <p>Delete Post</p>
                <p>Share Post</p>
            </div>
        )
    }
    
    useEffect(() => {
        console.log(data);
    },[]);

    return (
        <div className='postonapp'>
            <div className='row postauthorapp'>
                <div className='col-2'>
                    <img src={profile} alt={data.name} className='profilePhoto'/>
                </div>
                <div className='col-8'>
                    <h6>{data.type === "N" ? data.name : "Anonymous"}</h6>
                    <p>{data.type === "N" ? "@"+data.username : ""}</p>
                </div>
                <div className='col-2' onClick={options}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    {viewOptions && postOptionsCard()}
                </div>
            </div>
            <div className='row'>
                <div className='postheadingapp'>
                    <h4>{data.heading}</h4>
                </div>
                <div className='postcontentapp'>
                    {data.content}
                </div>
                <div className='postimageapp'>
                    {data.upload_id === null ? "" : "post image"}
                </div>
                <div className='posttoolsapp' onClick={() => {window.location.href = `/post/${data.post_id}`}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                    {/* <Link to={{pathname: `/post/${data.post_id}`, state: data}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                    </Link> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" onClick={() => {window.location.href = `/post/edit/${data.post_id}`}}/></svg>
                </div>
            </div>
        </div>
    )
}

export default PostOnApp

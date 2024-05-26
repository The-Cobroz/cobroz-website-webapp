import React, {useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "./PostStyles.css";
import AppNavbar from '../AppNavbar';
import CommentCard from './CommentCard';
import axios from 'axios';

const IndividualPost = () => {

    const { id } = useParams();
    const location = useLocation();

    const [viewOptions, setViewOptions] = useState(false);
    const [postData, setPostData] = useState(location.state ? location.state.data : null);
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(prevLiked => !prevLiked);

        setTimeout(() => {
            if(liked){
                try{
                    axios.post(`http://localhost:5000/post/addLike/${id}`, {}, {withCredentials: true});
                }
                catch(error){
                    alert("Unable to like");
                }
            }
        }, 2000); //2 sec timeout to allow if someone liked the post by mistake.
    }

    
    useEffect(() => {
        async function fetchPost(){
            try{
                await axios
                        .get(`http://localhost:5000/post/getPost/${id}`, {withCredentials: true})
                        .then(response => {
                            console.log(response);
                            setPostData(response.data);
                        })
                        .catch(error => {
                            alert("Post not found");
                        })
            }
            catch(error){
                console.log(error);
                alert("Error fetching post");
            }
        }
        async function fetchtags(){
            await axios
                    .get(`http://localhost:5000/post/getAllTags/${id}`, {withCredentials: true})
                    .then(response => {
                        setTags(response.data);
                    })
                    .catch(error => {
                        alert("Tags not found");
                    })
        }
        async function fetchComments(){

        }

        if(!postData){
            fetchPost();
        }
        if(postData){
            fetchtags();
        }

        console.log(postData);
        console.log(tags);
    },[id, postData]);

    const dispTags = () => {
        return tags.map((tag, index) => (
            <div key={index} className='tagonpost'>
                <p>{tag.tagName}</p>
            </div>
        ));
    }

    const options = () => {
        setViewOptions(prevOption => !prevOption);
        console.log(viewOptions);
    }

    function postOptionsCard(){
        return(
            <div className='optionsCard'>
                <p onClick={() => {window.location.href = `/post/edit/${id}`}}>Edit Post</p>
                <p>Delete Post</p>
                <p>Share Post</p>
            </div>
        )
    }

    const printcomments = () => {

    }

    if(!postData){
        return(
            <p>Loading ...</p>
        )
    }

    return(
        <>
            <AppNavbar/>
            <div className='cobroz-apppage row'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                    <div className='indipostdata'>
                        <div className='row postauthorapp'>
                            <div className='col-2'>
                                <img src='' alt='author'/>
                            </div>
                            <div className='col-8'>
                                <h6>{postData.name}</h6>
                                <p>{postData.username}</p>
                            </div>
                            <div className='col-2'>
                                <div onClick={options}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                                </div>
                                {viewOptions && postOptionsCard()}  
                            </div>
                        </div>
                        <div>
                            <h5>{postData.heading}</h5>
                            <p>{postData.content}</p>
                            <div>{postData.upload_id === null ? "" : "Post Images"}</div>
                            <div className='postTags'>{dispTags()}</div>
                        </div>
                        <div className='posttoolsapp' onClick={handleLike}>
                            {liked ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0008ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>}
                        </div>
                    </div>
                    <div className='commentonpost'>
                        <form>
                            <input
                                type='text'
                                placeholder='Add Your Comment'
                            />
                            <button className='btn btn-primary'>Add Comment</button>
                        </form>
                    </div>
                    <div className='commentsforpost'>
                        {comments.length > 0 ? printcomments() : <p>No Comments added</p>}
                    </div>
                </div>
                <div className='col-sm-3'></div>
            </div>
        </>
    )
}

export default IndividualPost

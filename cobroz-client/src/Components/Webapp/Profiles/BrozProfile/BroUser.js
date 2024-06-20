import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "../ProfileStyles.css";
import profPhoto from "../../../../Images/default-profile-img.jpg";
import PostComponent from '../ProfileComps/PostComponent.js';
import axios from 'axios';

const BroUser = ({data}) => {

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await axios.get(`http://localhost:5000/post/broPosts/${data.username}`, { withCredentials: true });
                if (response.status === 200) {
                    setUserPosts(response.data);
                }
            }
            catch (error) {
                alert("Connection Issues, Please Check");
            }
        }

        getPosts();
        console.log("Posts:", userPosts);
    }, []);

    const profilePosts = () => {
        if (userPosts.length === 0) {
            return (
                <div>
                    <h6>No post added yet.</h6>
                </div>
            );
        } else {
            return userPosts.map((post, index) => {
                return (
                    <PostComponent key={index} data={post} />
                )
            });
        }
    }
    
    return (
        <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6 profile-page'>
                <div className='profile-info-card'>
                    <div className='profile-name-bar row'>
                        <div className='col-sm-9'>
                            <strong>{data.name}</strong>
                            <p>{data.username}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-4 profile-photo'>
                            <img src={profPhoto} alt='profile-photo' />
                        </div>
                        <div className='col-sm-8'>
                            <div className='row'>
                                <div>
                                    <strong>{userPosts.length}</strong>
                                    <p>Posts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div>
                            {data.bio}
                        </div>
                    </div>
                </div>
                <div className='postCompProfile'>
                    <h5>POSTS</h5>
                    {profilePosts()}
                </div>
            </div>
            <div className='col-md-3'></div>
        </div>
    )
}

export default BroUser;

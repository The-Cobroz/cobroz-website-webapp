import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./ProfileStyles.css";
import profPhoto from "../../../Images/default-profile-img.jpg";
import PostComponent from './ProfileComps/PostComponent.js';
import axios from 'axios';

const UserProfile = ({ name, username, bio}) => {

    const [broOption, setBroOption] = useState(false);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            try {
                await axios
                    .get("http://localhost:5000/post/getPostsbyUser", { withCredentials: true })
                    .then(response => {
                        if (response.status === 200) {
                            setUserPosts(response.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert("Error fetching data for posts");
                    })
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
                <div onClick={() => { window.location.href = "/post/new" }}>
                    <h6>You haven't posted anything, Click to add your first post</h6>
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

    const handleEditProfile = () => {
        localStorage.setItem("userLocalData", JSON.stringify({ name, username, bio }));
        window.location.href = "/profile/edit";
    }
    
    return (
        <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6 profile-page'>
                <div className='profile-info-card'>
                    <div className='profile-name-bar row'>
                        <div className='col-sm-9'>
                            <strong>{name}</strong>
                            <p>{username}</p>
                        </div>
                        <div className='col-sm-3'>
                            <button className='btn btn-secondary' onClick={handleEditProfile}
                            >Edit Profile</button>
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
                            {bio}
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

export default UserProfile;

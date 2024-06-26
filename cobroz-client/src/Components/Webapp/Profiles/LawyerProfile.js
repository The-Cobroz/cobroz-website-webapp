import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./ProfileStyles.css";
import defProfPhoto from "../../../Images/default-profile-img.jpg";
import axios from "axios";
import PostComponent from './ProfileComps/PostComponent.js';
import MiscDetails from './EditComponents/MiscDetails.js';

const LawyerProfile = ({ name, username, bio }) => {
    const [profData, setProfData] = useState({
        profInfo: false,
        cllg: "",
        year: "",
        court: "",
        since: ""
    });
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchLawyerData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/lawyer/getData");
                setProfData({
                    profInfo: true, 
                    cllg: response.data.cllg,
                    year: response.data.year,
                    court: response.data.court,
                    since: response.data.since
                });
            } catch (error) {
                alert("Error fetching professional data");
                console.log("Error: ", error);
            }
        };

        const getPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/post/getPostsbyUser", { withCredentials: true });
                if (response.status === 200) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.log(error);
                alert("Error fetching posts");
            }
        };

        fetchLawyerData();
        getPosts();
    }, []); 

    const lawyerInfoCard = () => {
        if (profData.profInfo) {
            return (
                <>
                    <div className='col-sm-6'>
                        <h6>Education</h6>
                        <strong>{profData.cllg}</strong>
                        <p>Year of Passing: {profData.year}</p>
                    </div>
                    <div className='col-sm-6'>
                        <h6>Court</h6>
                        <strong>{profData.court}</strong>
                        <p>Since: {profData.since}</p>
                    </div>
                </>
            );
        } else {
            return (
                <p>Add this information to improve your profile</p>
            );
        }
    };

    const profilePosts = () => {
        if (posts.length === 0) {
            return (
                <div onClick={() => { window.location.href = "/post/new" }}>
                    <h6>No posts are added, click to add first post</h6>
                </div>
            )
        } else {
            return posts.map((post, index) => (
                <PostComponent key={index} data={post} />
            ));
        }
    };

    const handleEditProfile = () => {
        localStorage.setItem("userLocalData", JSON.stringify({ name, username, bio }));
        window.location.href = "/profile/edit";
    }

    return (
        <div className='row'>
            <div className='col-sm-3'></div>
            <div className='col-sm-6 profile-page'>
                <div className='profile-info-card'>
                    <div className='profile-name-bar row'>
                        <div className='col-sm-9'>
                            <strong>{name}</strong>
                            <p>{username}</p>
                        </div>
                        <div className='col-sm-3'>
                            <button className='btn btn-secondary' onClick={handleEditProfile}>Edit Profile</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-4 profile-photo'>
                            <img src={defProfPhoto} alt='profile-photo' />
                        </div>
                        <div className='col-sm-8'>
                            <div className='row'>
                                <div>
                                    <strong>{posts.length > 0 ? posts.length : "0"}</strong>
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
                <div className='lawyer-info-card'>
                    <div className="heading-info-card">
                        <h5>Education & Court</h5>
                        <button className='btn btn-secondary' onClick={() => {window.location.href = "/profile/add_Lawyer_Info"}}>Add Details</button>
                    </div>
                    <div className='row'>
                        {lawyerInfoCard()}
                    </div>
                </div>
                <div className='postCompProfile'>
                    <h5>POSTS</h5>
                    {profilePosts()}
                </div>
            </div>
            <div className='col-sm-3'></div>
        </div>
    );
};

export default LawyerProfile;

import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "../ProfileStyles.css";
import defProfPhoto from "../../../../Images/default-profile-img.jpg";
import axios from "axios";
import PostComponent from '../ProfileComps/PostComponent.js';
//import MiscDetails from './EditComponents/MiscDetails.js';

const BroLawyer = ({data}) => {
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
                //alert("Error fetching professional data");
                console.log("Error: ", error);
            }
        };

        const getPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/post/broPosts/${data.username}`, { withCredentials: true });
                if (response.status === 200) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.log(error);
                //alert("Error fetching posts");
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
        }
    };

    const profilePosts = () => {
        if (posts.length === 0) {
            return (
                <div>
                    <h6>No posts added yet.</h6>
                </div>
            )
        } else {
            return posts.map((post, index) => (
                <PostComponent key={index} data={post} />
            ));
        }
    };

    function eduAndCrtDetails(){
        return (
            <div className='lawyer-info-card'>
                <div className="heading-info-card">
                    <h5>Education & Court</h5>
                    <button className='btn btn-secondary'>Add Details</button>
                </div>
                <div className='row'>
                    {lawyerInfoCard()}
                </div>
            </div>
        )
    }

    return (
        <div className='row'>
            <div className='col-sm-3'></div>
            <div className='col-sm-6 profile-page'>
                <div className='profile-info-card'>
                    <div className='profile-name-bar row'>
                        <div className='col-sm-9'>
                            <strong>{data.name}</strong>
                            <p>{data.username}</p>
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
                            {data.bio}
                        </div>
                    </div>
                </div>
                {profData.profInfo ? eduAndCrtDetails() : ""}
                <div className='postCompProfile'>
                    <h5>POSTS</h5>
                    {profilePosts()}
                </div>
            </div>
            <div className='col-sm-3'></div>
        </div>
    );
};

export default BroLawyer;

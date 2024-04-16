import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./ProfileStyles.css";
import defProfPhoto from "../../../Images/default-profile-img.jpg";
import axios from "axios";
//import ksProfile from "../../../Images/WhatsApp Image 2024-03-20 at 18.35.16_5d44e2c9.jpg"

const LawyerProfile = ({name, username, bio, posts, broz}) => {

    const [profData, setProfData] = useState({
        profInfo: false,
        cllg:"",
        year: "",
        court: "",
        since: ""
    });

    useEffect(() => {
        async function fetchLawyerData(){
            try{
                const response = await axios.get("http://localhost:5000/lawyer/getData");
                setProfData({
                    ...profData,
                    profInfo: true, // Set profInfo to true to indicate that data has been fetched
                    cllg: response.data.cllg,
                    year: response.data.year,
                    court: response.data.court,
                    since: response.data.since
                });
            }
            catch(error){
                alert("Error fetching professional data");
                console.log("Error: ",error);
            }
        }

        fetchLawyerData();
    }, []) // Empty dependency array to ensure useEffect runs only once on component mount

    function lawyerinfoCard() {
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
                            <button className='btn btn-secondary'>Edit Profile</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-4 profile-photo'>
                            <img src={defProfPhoto} alt='profile-photo'/>
                        </div>
                        <div className='col-sm-8'>
                            <div className='row'>
                                <div className='col-6'>
                                    <strong>{posts}</strong>
                                    <p>Posts</p>
                                </div>
                                <div className='col-6'>
                                    <strong>{broz}</strong>
                                    <p>Broz</p>
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
                        <button className='btn btn-secondary'>Add Details</button>
                    </div>
                    <div className='row'>
                        {lawyerinfoCard()}
                    </div>
                </div>
            </div>
            <div className='col-sm-3'></div>
        </div>
    )
}

export default LawyerProfile

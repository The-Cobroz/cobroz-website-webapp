import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./PostStyles.css";
import AppNavbar from '../AppNavbar.js';
import axios from 'axios';
import {getCookieVal} from "../../../UtilFunctions/getCookie.js";


const NewPost = () => {

    const [postData, setPostData] = useState({
        type: "N",
        viewers: "law",
        heading: "",
        content: "",
        tags: []
    });

    const [userDetails, setUserDetails] = useState({
        name: "",
        username: ""
    })

    const [newTag, setNewTag] = useState([]);

    function toggleArray(tag){
        let index = newTag.indexOf({tag_id: tag});

        if(index === -1){
            newTag.push({tag_id: tag});
        }
        else{
            newTag.splice(index, 1);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPostData({...postData, [name]: value});
    }

    function addTag(){
        setPostData({...postData, tags: newTag})
    }

    const handleTags = (e) => {

        const clickedTag = e.currentTarget;

        const selected = clickedTag.getAttribute("select");
        const value = clickedTag.getAttribute("id");

        if(selected === "true"){
            clickedTag.setAttribute("select", "false");
            toggleArray(value);
        }
        else{
            clickedTag.setAttribute("select", "true");
            toggleArray(value);
        }

        clickedTag.classList.toggle("tagBtn");
        clickedTag.classList.toggle("selectedTagBtn");
        setNewTag([...newTag]);
        addTag();
    }

    useEffect(() => {
        async function callUserDetails(){
            const userID = getCookieVal("loggedCobroz"); //cookie value against user id

            try{
                await axios.get("http://localhost:5000/profile/userGeneralData", { withCredentials: true, params: {user_id: userID}})
                           .then(response => {
                            setUserDetails({
                                name: response.data.name,
                                username: response.data.username
                            });
                           })  
                           .catch(error => {
                            alert("Error fetching your details");
                            console.log(error);
                           })

            }
            catch(error){
                alert("Error connecting to server");
                console.log(error);
            }
        }

        callUserDetails();
    },[]);

    const handlePost = async(e) => {
        try{

            const postType = e.currentTarget.id;
            //console.log(postType);
            if(postType === "anonymous"){
                setPostData({...postData, type: "A"});
            }

            //console.log(postData);

            await axios.post("http://localhost:5000/post/new", postData, {withCredentials: true})
                .then(response => {
                    if(response.status === 200){
                        alert("post created");
                        window.location.href = `/post/${response.data.post_id}`
                    }
                    else{
                        alert("unable to post, try again later");
                    }
                })
                .catch(error => {
                    console.error();
                }) 
        }
        catch(error){
            alert("Unable to add post");
            console.log(error);
        }
    }

  return (
    <>
        <AppNavbar/>
        <div className='newPostComp'>
            <h4>Create new post</h4>
            <div className='postDataArea'>
                <div className='postUserDetails'>
                    <div className='postUserProfile'>
                        <img src='' alt='Your Photo'/>
                    </div>
                    <div className='viewershipDetails'>
                        <h5>{userDetails.name ? userDetails.name :"YOU"}</h5>
                        <select name='viewers' value={postData.viewers} onChange={handleChange}>
                            <option value="all">Everyone can view</option>
                            <option value="law">Only Lawyers can view</option>
                        </select>
                    </div>
                </div>
                <div className='postData'>
                    <input
                        placeholder='Create heading for your post'
                        type='text'
                        name='heading'
                        value={postData.heading}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />
                    <textarea
                        placeholder='Explain your post here'
                        name='content'
                        value={postData.content}
                        maxLength={255}
                        onChange={handleChange}
                    />
                    <p>Add Tags to your post</p>
                    <div>
                        <button className='btn tagBtn' id='CT0000000001' select="false" onClick={handleTags}>Civil</button>
                        <button className='btn tagBtn' id='CT0000000002' select="false" onClick={handleTags}>Criminal</button>
                        <button className='btn tagBtn' id='CT0000000003' select="false" onClick={handleTags}>Family</button>
                        <button className='btn tagBtn' id='CT0000000004' select="false" onClick={handleTags}>Corporate</button>
                        <button className='btn tagBtn' id='CT0000000005' select="false" onClick={handleTags}>Divorce</button>
                    </div>
                </div>
                <button className='btn btn-primary postBtn' onClick={handlePost}>Post</button>
                <button className='btn btn-secondary postBtn' id='anonymous' onClick={handlePost}>Post Anonymously</button>
            </div>
        </div>
    </>
  )
}

export default NewPost;

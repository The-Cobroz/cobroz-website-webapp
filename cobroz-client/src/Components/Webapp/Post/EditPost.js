import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import AppNavbar from '../AppNavbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditPost = () => {

    const { id } = useParams();
    const [postData, setPostData] = useState({});
    const [tags, setTags] = useState([]);
    const [name, setName] = useState("");
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [viewers, setViewers] = useState("");

    useEffect(() => {
        async function getPostData(){
            try {
                console.log("getting post data");
                const response = await axios.get(`http://localhost:5000/post/getPost/${id}`, { withCredentials: true });
                console.log("data received");
                setPostData(response.data);
                setName(response.data.name);
                setHeading(response.data.heading);
                setContent(response.data.content);
                setViewers(response.data.viewers);
            } catch (error) {
                alert("Unable to fetch data");
            }
        }

        async function getTags(){
            console.log("fetching tags");
            try {
                const response = await axios.get(`http://localhost:5000/post/getAllTagsId/${id}`, { withCredentials: true });
                console.log("received tags");
                setTags(response.data);
            } catch (error) {
                alert("No tags found");
            }
        }

        getPostData();
        getTags();

        console.log(postData);
        console.log(tags);
    }, [id]);

    useEffect(() => {
        function setInnerText() {
            console.log(postData);
            console.log(tags);

            tags.forEach(tag => {
                console.log(tag);
                const tagComponent = document.getElementById(tag.tag_id);
                if (tagComponent) {
                    tagComponent.classList.toggle("selectedTagBtn");
                    tagComponent.classList.toggle("tagBtn");

                    tagComponent.setAttribute("select", "true");
                }
            });
        }

        if (postData && tags.length > 0) {
            setInnerText();
        }
    }, [postData, tags]);

    const handleTags = (e) => {
        const clickedTag = e.target;

        var isSelected = clickedTag.getAttribute("select");
        var tagId = clickedTag.getAttribute("id");
        if(isSelected === "true"){
            var tagList = tags;
            let index = tagList.indexOf({tag_id: tagId});

            tagList.splice(index,1);
            setTags(tagList);
        }
        else{
            var tagList = tags;
            tagList.push({tag_id: tagId});;
            setTags(tagList);
        }

        console.log(tags);

        //changing color of tag button
        clickedTag.classList.toggle("tagBtn");
        clickedTag.classList.toggle("selectedTagBtn");
    }

    const handleSubmit = async() => {
        try{
            const updatedData = {
                posted_by: postData.posted_by,
                heading: heading,
                content: content,
                viewers: viewers,
                tags: tags
            };

            console.log(updatedData);

            await axios
                    .put(`http://localhost:5000/post/edit/${id}`, updatedData, {withCredentials: true})
                    .then(response => {
                        if(response.status === 200){
                            alert("Changes Saved");
                            window.location.href = `/post/${id}`;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert("Error connecting to Server");
                    })
        }
        catch(error){
            console.log(error);
            alert("Unable to save changes. Try again later!!");
        }
    }

    const handleDelPost = async() => {

    }

    if (!postData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AppNavbar />
            <div className='newPostComp'>
                <h4>Edit your post</h4>
                <div className='postDataArea'>
                    <div className='postUserDetails'>
                        <div className='postUserProfile'>
                            <img src='' alt='Your Photo' />
                        </div>
                        <div className='viewershipDetails'>
                            <h5 id='name'>{name || "YOU"}</h5>
                            <select name='viewers' value={viewers} onClick={(e) => {setViewers(e.target.value)}}>
                                <option value="all">Everyone can view</option>
                                <option value="law">Only Lawyers can view</option>
                            </select>
                        </div>
                    </div>
                    <div className='postData'>
                        <input
                            placeholder='Create heading for your post'
                            type='text'
                            id='heading'
                            name='heading'
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            maxLength={50}
                            required
                        />
                        <textarea
                            placeholder='Explain your post here'
                            id='content'
                            name='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={255}
                        />
                        <p>Choose Tags to your post</p>
                        <div>
                            <button className='btn tagBtn' id='CT0000000001' select="false" onClick={handleTags}>Civil</button>
                            <button className='btn tagBtn' id='CT0000000002' select="false" onClick={handleTags}>Criminal</button>
                            <button className='btn tagBtn' id='CT0000000003' select="false" onClick={handleTags}>Family</button>
                            <button className='btn tagBtn' id='CT0000000004' select="false" onClick={handleTags}>Corporate</button>
                            <button className='btn tagBtn' id='CT0000000005' select="false" onClick={handleTags}>Divorce</button>
                        </div>
                    </div>
                    <button className='btn btn-success postBtn' onClick={handleSubmit}>Confirm Changes</button>
                    <button className='btn btn-danger postBtn' onClick={handleDelPost}>Delete Post</button>
                </div>
            </div>
        </>
    )
}

export default EditPost;

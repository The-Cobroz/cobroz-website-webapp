import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./PostStyles.css";
import axios from 'axios';
import ReplyCard from './ReplyCard.js';
import profile from "../../../Images/default-profile-img.jpg"
import { useParams } from 'react-router-dom';

const CommentCard = ({data}) => {

    const {id} = useParams();

    const [addReply, setAddReply] = useState(false);
    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState([]);
    const [moreReplies, setMoreReplies] = useState(false);

    async function fetchReplies(){
        try{
            await axios
                    .get(`http://localhost:5000/comments/allReps/${id}/${data.comment_id}`, {withCredentials: true})
                    .then(response => {
                        setReplies(response.data);
                        console.log(replies);
                    })
                    .catch(error => {
                        return "";  
                    })

        }
        catch(error){
            alert("Error connecting to server, check connection");
        }
    }

    function showReply(){
        setAddReply(prevAddReply => !prevAddReply);
    }

    function yesMoreMessage(isMore){
        setMoreReplies(isMore);

        if(isMore){
            fetchReplies();
        }
    }

    useEffect(() => {
        fetchReplies();
    }, [])

    const handleReply = async(e) => {
        e.preventDefault();

        try{
            await axios
                    .post("http://localhost:5000/comments/newReply", {
                        post_id: id,
                        comment_id: data.comment_id,
                        reply_value: reply
                    }, {withCredentials: true})
                    .then(response => {
                        if(response.status === 200){
                            alert("Reply sent");
                            fetchReplies();
                        }
                    })
        }
        catch(error){
            alert("Unable to send message");
        }
    }

    return (
        <div className='commentcard'>
            <div className='row'>
                <div className='col-1'>
                    <img src={profile} alt={data.name} className='profilePhotoComm'/>
                </div>
                <div className='col-10'>
                    <p>{data.name}</p>
                    <p>@{data.username}</p>
                </div>
                <div className='col-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </div>
            </div>
            <div className='commentcontent'>
                <p>{data.comment_value}</p>
            </div>
            <div className='commenttools'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle" onClick = {() => showReply()}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            </div>
            {addReply ? 
                <>
                    <div className='commentonpost'>
                        <form>
                            <input
                                name='reply'
                                value={reply}
                                type='text'
                                placeholder='Your Reply'
                                onChange={(e) => {setReply(e.target.value)}}
                            />
                            <button className='btn btn-primary' onClick = {handleReply}>Send</button>
                        </form>
                    </div>
                    <div>
                        {replies.length > 0 ? replies.map((rep, index) => <ReplyCard key={index} data={rep} changeReply={yesMoreMessage}/>) :""}
                    </div>
                </>
            :""}
        </div>
    )
}

export default CommentCard

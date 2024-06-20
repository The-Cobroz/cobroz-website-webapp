import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./PostStyles.css";
import axios from 'axios';

const ReplyCard = ({data, changeReply}) => {

    const [replyInput, setReplyInput] = useState(false);
    const [reply, setReply] = useState("");

    const showReply = () => {
        setReplyInput(prevReplyInput => !prevReplyInput);
    }

    const sendReply = async(e) => {
        e.preventDefault();

        try{
            await axios
                    .post("http://localhost:5000/comments/newReply", {
                            post_id: data.post_id,
                            comment_id: data.comment_id,
                            parent_id: data.reply_id,
                            reply_value: reply
                        },
                        {
                            withCredentials: true
                        }
                    )
                    .then(response => {
                        if(response.status === 200){
                            alert("reply added");
                            changeReply(true);
                        }
                    })
        }
        catch(error){
            alert("Connection Issues, try again");
        }
    }

    return (
        <div className='reply-card'>
            <div className='row'>
                <div className='col-11' onClick={() => {window.location.href = `/${data.author_username}`}}>
                    <h6>{data.name}</h6>
                    <p>@{data.author_username}</p>
                </div>
                <div className='col-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </div>
            </div>
            <div onClick={() => {window.location.href = `/${data.parent_author}`}}>
                {data.parent_author ? "@" + data.parent_author : ""} {data.reply_value}
            </div>
            <div className='commenttools'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle" onClick = {() => showReply()}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            </div>
            {replyInput ?
                <div className='commentonpost'>
                    <form onSubmit={sendReply}>
                        <input
                            name='reply'
                            placeholder='Your Reply'
                            type='text'
                            value={reply}
                            onChange={(e) => {setReply(e.target.value)}}
                        />
                        <button className='btn btn-primary' type='submit'>Send</button>
                    </form>
                </div>
            : ""}
        </div>
    )
}

export default ReplyCard

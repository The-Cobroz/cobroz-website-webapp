import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

//Controller functions

import { createCommentId, addComment, addReply, checkId, getComments, getReplies, checkIdRep, editComm, editReply } from "../Controllers/CommentsController.js";

const router = express.Router();


router.use(express.json());
router.use(cookieParser());
router.use(bodyParser.json());
router.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

router.post("/newComment", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const postedBy = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY); //commenter's id

    const {post_id, comment_value} = req.body; //comment data

    try{
        let commId = createCommentId("CCR"); //abbreviation for Cobroz-Comment-Reply
        while(true){
            const noComm = await checkId(commId);
            if(!noComm){
                commId = createCommentId("CCR");
            }
            else{
                break;
            }
        }//unique primary key generated for this comment

        const comment = await addComment(commId, post_id, postedBy.user_id, comment_value);
        if(comment){
            res.status(200).json({
                msg: "Comment added"
            });
        }
        else{
            console.log(comment);
            res.status(204).json({
                msg: "Error adding comment"
            });
        }
    }   
    catch(error){
        console.log("Error: ", error);
        res.status(500).json(error);
    }
});

router.post("/newReply", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const postedBy = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY); //replier's id

    const {post_id, reply_value, comment_id, parent_id} = req.body; //reply data

    try{
        let commId = createCommentId("CR"); //abbreviation for Cobroz-Comment-Reply
        while(true){
            const noComm = await checkIdRep(commId);
            if(!noComm){
                commId = createCommentId("CR");
            }
            else{
                break;
            }
        }//unique primary key generated for this reply

        const reply = await addReply(commId,post_id,comment_id,postedBy.user_id, reply_value, parent_id);
        if(reply){
            res.status(200).json({
                msg: "Reply added"
            });
        }
        else{
            console.log(reply);
            res.status(204).json({
                msg: "Error adding reply"
            });
        }
    }   
    catch(error){
        console.log("Error: ", error);
        res.status(500).json(error);
    }
});

router.get("/allComms/:id", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const post_id = req.params.id;

    try{
        const comments = await getComments(post_id);

        if(comments){
            res.status(200).json(comments);
        }
        else{
            res.status(204).json({
                msg: "No comments found"
            });
        }
    }
    catch(error){
        console.log("Error fetching all the comments: ", error);
        res.status(500).json(error);
    }
});

router.get("/allReps/:postid/:commid", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const {postid, commid} = req.params;

    try{
        const replies = await getReplies(postid, commid);

        if(replies){
            res.status(200).json(replies);
        }
        else{
            res.status(204).json({
                msg: "No Replies found"
            });
        }
    }
    catch(error){
        console.log("Error fetching all the replies: ", error);
        res.status(500).json(error);
    }
});

router.put("/edit/comment/:commId", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const comm_id = req.params.commId;
    const {newComm, commAuthor} = req.body;
    const userid = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);

    try{
        if(commAuthor !== userid.user_id){
            res.status(401).json({
                msg: "Not authorized"
            });
        }
        else{
            const commUpdate = await editComm(comm_id, newComm);

            if(commUpdate){
                res.status(200).json({
                    msg: "edit successful"
                });
            }
            else{
                res.status(203).json({
                    msg: "No edit"
                });
            }
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.put("/edit/reply/:repId", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const rep_id = req.params.repId;
    const {newRep, repAuthor} = req.body;
    const userid = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);

    try{
        if(repAuthor !== userid.user_id){
            res.status(401).json({
                msg: "Not authorized"
            });
        }
        else{
            const repUpdate = await editReply(rep_id, newRep);

            if(repUpdate){
                res.status(200).json({
                    msg: "edit successful"
                });
            }
            else{
                res.status(203).json({
                    msg: "No edit"
                });
            }
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

export default router;
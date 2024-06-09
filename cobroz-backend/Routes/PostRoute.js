import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

//middleware functions
import {checkPostId, newPost, addTag, delPost, viewPost, viewPosts, viewTags, editPost, addLike, viewTagsId, delTags} from "../Controllers/PostController.js";
import {generateUserId} from "../Controllers/AuthControllers.js";

const router = express.Router();

//MIDDLEWARE dependencies
router.use(express.json());
router.use(cors(
    {
        origin: "https://localhost:3000",
        credentials: true
    }
));
router.use(cookieParser());

//REST APIs
router.post("/new", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const userId = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
    const {viewers, type, heading, content, tags, upId, upType} = req.body;
    console.log(heading);
    try{
        const id = generateUserId("CP", Math.pow(10, 15));

        console.log(id);
        while(true){
            const idExistNot = await checkPostId(id);
            console.log(idExistNot);
            if(idExistNot === false){
                break;
            }
            else{
                id = generateUserId("CP", Math.pow(10, 15));
            }
        }
        
        console.log("selected id: "+id);

        const newpost = await newPost(id, userId.user_id, type, heading, content, viewers, upType, upId);
        if(newpost === "error" || newpost === "problem"){
            res.status(205).json({
                msg: "error in posting"
            });
        }
        else{
            const addtags = await addTag(tags, id);
            if(addtags === "error" || addtags === "problem"){
                const delPost = await delPost(id);
                res.status(205).json({
                    msg: "unable to upload"
                });
            }
            else{
                res.status(200).json({
                    msg: "Post added to forum",
                    post_id: id
                });
            }
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.get("/getPost/:id", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const postId = req.params.id;
    console.log("post id:", postId);

    try{
        console.log("In try block");

        const postData = await viewPost(postId);

        if(postData){
            res.status(200).json(postData[0]);
        }
        else{
            res.status(205).json({
                msg: "No post found"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/getPosts/:type", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const type = req.params.type;
    console.log("account type: ", type);

    const id = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);

    try{
        const posts = await viewPosts(type, id.user_id);

        if(posts){
            res.status(200).json(posts);
        }
        else{
            res.status(204).json({
                msg: "Posts not found"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);  
    }
});

router.get("/getAllTags/:postid", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const id = req.params.postid;
    console.log("post id:", id);

    try{
        const tags = await viewTags(id);

        if(tags){
            res.status(200).json(tags);
        }
        else{
            res.status(204).json({
                msg: "no tags added"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/getAllTagsId/:postid", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const id = req.params.postid;
    console.log("post id:", id);

    try{
        const tags = await viewTagsId(id);

        if(tags){
            res.status(200).json(tags);
        }
        else{
            res.status(204).json({
                msg: "no tags added"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.delete("/delete/:id", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const post_id = req.params.id;
    const postBy = req.body.posted_by;

    try{
        const currUser = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
        if(currUser.user_id !== postBy){
            res.status(403).json({
                msg: "Not authorized"
            });
        }
        else{
            const del = await delPost(post_id);
            if(del){
                res.status(200).json({
                    msg: "post deleted"
                });
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});



router.put("/edit/:id", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const id = req.params.id;

    try{
        const currUser = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
        if(currUser.user_id !== req.body.posted_by){
            res.status(403).json({
                msg: "user not authorized"
            });
        }
        else{
            const editedData = await editPost(id, req.body.heading, req.body.content, req.body.viewers);
            
            if(editedData){
                const tagsDeleted = await delTags(id);
                if(req.body.tags.length > 0){
                    await addTag(req.body.tags, id);
                }
                res.status(200).json({
                    msg: "post edited",
                    post_id: id
                });
            }
            else{
                res.status(204).json({
                    msg: "error editing"
                });
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.post("/addLike/:id", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const id = req.params.id;
    const userId = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);

    try{
        const LikeAdded = await addLike(id, userId.user_id);

        if(LikeAdded){
            res.status(200).json({
                msg: "like added"
            });
        }
        else{
            res.status(204).json({
                msg: "error in adding like"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

export default router;


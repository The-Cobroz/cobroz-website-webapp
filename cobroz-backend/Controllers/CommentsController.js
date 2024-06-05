import pool from "../Config/db.config.js";

export function addComment(comment_id, post_id, user_id, value){
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO comments(comment_id, post_id, commentby, comment_value) VALUES (?, ?, ?, ?)", [comment_id,post_id, user_id, value], (err, results) => {
            if(err){
                console.log("Error in add Comments: ", err);
                reject("error");
            }
            else if(results.affectedRows > 0){
                resolve(results);
            }
            else{
                console.log("Problem in add comments");
                reject("problem");
            }
        });
    });
}

export function addReply(reply_id, post_id, comment_id, reply_by, comment_value){
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO replies(reply_id, post_id, comment_id, reply_by, reply_value) VALUES(?, ?, ?, ?, ?)", [reply_id,post_id,comment_id,reply_by,comment_value], (err, results) => {
            if(err){
                console.log("Error in add reply function: ", err);
                reject("error");
            }
            else if(results.affectedRows > 0){
                resolve(results);
            }
            else{
                console.log("Problem in addReply function");
                reject("problem");
            }
        });
    });
}

export function createCommentId(prefix){
    let commId = Math.floor(Math.random()*Math.pow(10, 12));
    commId = prefix + commId;

    return commId; //returning random primary key for the comment
}

export function checkId(commId){
    return new Promise((resolve, reject) => {
        pool.query("SELECT comment_value FROM comments WHERE comment_id = ?", [commId], (err, results) => {
            if(err){
                console.log("Error in checkID function for comment: ", err);
                reject("error");
            }
            else if(results.length == 0){
                //console.log(results);
                resolve(true);
            }
            else{
                resolve(false);
            }
        });
    });
}

export function checkIdRep(repId){
    return new Promise((resolve, reject) => {
        pool.query("SELECT reply_value FROM replies WHERE reply_id = ?", [repId], (err, results) => {
            if(err){
                console.log("Error in checkID function for reply: ", err);
                reject("error");
            }
            else if(results.length == 0){
                //console.log(results);
                resolve(true);
            }
            else{
                resolve(false);
            }
        });
    });
}

export function getComments(post_id){
    let sqlQuery = `SELECT comments.comment_id, comments.comment_value, comments.created_at, user.name, user.username, user.user_id FROM comments INNER JOIN user ON user.user_id = comments.commentby WHERE comments.post_id = "${post_id}"`;


    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, results) => {
            if(err){
                console.log("Error in getComments function: ", err);
                reject("error");
            }
            else if(results.length > 0){
                resolve(results);
            }
            else{
                reject("problem in getComments");
            }
        });
    });
}

export function getReplies(post_id, comment_id){
    let sqlQuery = `SELECT replies.reply_id, replies.reply_value, replies.created_at, user.name, user.username, user.user_id FROM replies INNER JOIN user ON user.user_id = replies.reply_by WHERE replies.post_id = "${post_id}" AND replies.comment_id = "${comment_id}"`;


    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, results) => {
            if(err){
                console.log("Error in getReplies function: ", err);
                reject("error");
            }
            else if(results.length > 0){
                resolve(results);
            }
            else{
                reject("problem in getReplies");
            }
        });
    });
}
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

export function addReply(reply_id, post_id, comment_id, reply_by, comment_value, parent_id){
    let sqlQuery = "";

    if(parent_id){
        sqlQuery = `INSERT INTO replies(reply_id, post_id, comment_id, parent_replyid, reply_value, reply_by) VALUES("${reply_id}", "${post_id}", "${comment_id}", "${parent_id}", "${comment_value}", "${reply_by}")`;
    }
    else{
         sqlQuery = `INSERT INTO replies(reply_id, post_id, comment_id, reply_value, reply_by) VALUES("${reply_id}", "${post_id}", "${comment_id}", "${comment_value}", "${reply_by}")`;
    }

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, results) => {
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
    let sqlQuery = `SELECT A.reply_id, A.post_id, A.comment_id, A.reply_value, A.replyAt, userA.name, userA.username AS author_username, userB.username AS parent_author FROM replies A LEFT JOIN replies B ON A.parent_replyid = B.reply_id INNER JOIN user userA ON userA.user_id = A.reply_by LEFT JOIN user userB ON userB.user_id = B.reply_by WHERE A.post_id = "${post_id}" AND A.comment_id = "${comment_id}"`;


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

export function editComm(comm_id, comm_value){
    return new Promise((resolve, reject) => {
        pool.query("UPDATE comments SET comment_value = ? WHERE comment_id = ?", [comm_value, comm_id], (err, results) => {
            if(err){
                console.log("Error in update comment function:", err);
                reject("error");
            }
            else if(results.affectedRows > 0){
                resolve(results);
            }
            else{
                reject("problem in comm update function");
            }
        });
    });
}

export function editReply(reply_id, reply_value){
    return new Promise((resolve, reject) => {
        pool.query("UPDATE replies SET reply_value = ? WHERE reply_id = ?", [reply_value, reply_id], (err, results) => {
            if(err){
                console.log("Error in update replies function:", err);
                reject("error");
            }
            else if(results.affectedRows > 0){
                resolve(results);
            }
            else{
                reject("problem in reply update function");
            }
        });
    });
}

export function delCommByUser(id){
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM comments WHERE commentby = ?", [id], (err, results) => {
            if(err){
                console.log("Error in deleting comments by user:", err);
                reject("error");
            }
            else if(results.affectedRows >= 0){
                resolve(results);
            }
        });
    });
}

export function delRepsByUser(id){
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM replies WHERE reply_by = ?", [id], (err, results) => {
            if(err){
                console.log("Error in deleting replies by user:", err);
                reject("error");
            }
            else if(results.affectedRows >= 0){
                resolve(results);
            }
        });
    });
}
import pool from "../Config/db.config.js";

export function newPost(id, by, type, heading, content, viewers, upType, upId){
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO post(post_id, type, posted_by, heading, content, uploadType, upload_id, viewers, timestamp) VALUES(?, ?, ?, ?, ?, ?, ?, ?, NOW())", [id,type,by,heading,content,upType, upId, viewers], (err, results) => {
            if(err){
                console.log("Error in promise function:" + err);
                reject("error");
            }
            else if(results.affectedRows > 0){
                resolve(results);
            }
            else{
                reject("problem");
            }
        });
    });
}

export function checkPostId(id){
    return new Promise((resolve, reject) => {
        pool.query("SELECT heading FROM post WHERE post_id = ?", [id], (err, results) => {
            if(err){
                console.log("Error in check function");
                reject("error");
            }
            else if(results.rows === 0){
                resolve(true);
            }
            else{
                resolve(false);
            }
        });
    });
}

export function addTag(tags, post_id){

    var values = [];
    console.log("in addtag")

    for (var i = 0; i < tags.length; i++) {
        values.push([tags[i].tag_id, post_id]);
    }

    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO tagtopost(tag_id, post_id) VALUES ?", [values], (err, results) => {
            if(err){
                console.log("tags function error:" + err);
                reject("error");
            }
            else if(results.affectedRows > 0){
                resolve(results);
            }
        });
    });
}

export function delPost(post_id){

    // const queries = [
    //     `DELETE post, upload FROM post INNER JOIN upload ON post.upload_id = upload.upload_id WHERE post.post_id = "${post_id}"`,
    //     //`DELETE FROM comments WHERE post_id = "${post_id}"`,
    //     `DELETE FROM interaction WHERE post_id = "${post_id}"`,
    //     `DELETE FROM tagtopost WHERE post_id = "${post_id}"`
    // ]

    const sqlQuery = `DELETE post, upload FROM post INNER JOIN upload ON post.upload_id = upload.upload_id WHERE post.post_id = "${post_id}"; DELETE FROM interaction WHERE post_id = "${post_id}"; DELETE FROM tagtopost WHERE post_id = "${post_id};`
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, results) => {
            if(err){
                console.log("error in delete function: ", err);
                reject("error");
            }
            else if(results.affectedRows > 0){
                resolve(results);
            }
            else{
                reject("problem");
            }
        })
    })
}

export function editPost(post_id, heading, content, viewers) {
    let sqlQuery = "UPDATE post SET";
    let params = [];
    
    if (heading) {
        sqlQuery += ` heading = ?,`;
        params.push(heading);
    }
    if (content) {
        sqlQuery += ` content = ?,`;
        params.push(content);
    }
    if (viewers !== undefined) { // ensure viewers is not undefined (allow 0 as a valid value)
        sqlQuery += ` viewers = ?`;
        params.push(viewers);
    } else {
        // Remove the trailing comma
        sqlQuery = sqlQuery.slice(0, -1);
    }

    sqlQuery += ` WHERE post_id = ?`;
    params.push(post_id);

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, params, (err, results) => {
            if (err) {
                console.log("Error in updating content: " + err);
                reject("error");
            } else if (results.affectedRows > 0) {
                resolve(results);
            } else {
                reject("problem");
            }
        });
    });
}

export function addLike(post_id, likeBy){
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO interaction(post_id, user_id) VALUES(?, ?)", [post_id, likeBy], (err, results) => {
            if(err){
                console.log("Error in adding like");
                reject("error");
            }
            else if(results.affectedRows > 0){
                resolve(results);
            }
            else{
                reject("problem");
            }
        });
    });
}

export function viewPost(post_id){

    console.log(post_id)
    const sqlQuery = `SELECT post.*, user.username, user.name, user.profile FROM post INNER JOIN user ON user.user_id = post.posted_by WHERE post_id = "${post_id}"`;

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, results) => {
            if(err){
                console.log("error in viewPost function:", err);
                reject("error");
            }
            else if(results){
                resolve(results);
            }
            else{
                reject("problem");
            }
        });
    });
}

export function viewPosts(type, id){

    let sqlQuery = "SELECT post.*, user.username, user.name, user.profile FROM post INNER JOIN user ON user.user_id = post.posted_by";

    if(type === "client"){
        sqlQuery += ` WHERE post.viewers = "all" OR post.posted_by = "${id}"`;
    }
    else{
        sqlQuery += ' post.viewers = "law"';
    }

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, results) => {
            if(err){
                console.log("Facing error in getting posts: ", err);
                reject("error");
            }
            else if(results){
                console.log("is results an array: ", Array.isArray(results));
                console.log("Length: ", results.length);
                console.log(results);
                resolve(results);
            }
            else{
                reject("problem");
            }
        });
    });
}

export function viewTags(postId){

    let sqlQuery = `SELECT tag.tagName, tag.tag_id FROM tag INNER JOIN tagtopost ON tag.tag_id = tagtopost.tag_id WHERE tagtopost.post_id = "${postId}"`;

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, results) => {
            if(err){
                console.log("Error in viewTags function: ", err);
                reject("error");
            }
            else if(results){
                resolve(results);
            }
            else{
                reject("problem");
            }
        });
    });
}

export function viewTagsId(postId){

    let sqlQuery = `SELECT tag.tag_id FROM tag INNER JOIN tagtopost ON tag.tag_id = tagtopost.tag_id WHERE tagtopost.post_id = "${postId}"`;

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, results) => {
            if(err){
                console.log("Error in viewTags function: ", err);
                reject("error");
            }
            else if(results){
                resolve(results);
            }
            else{
                reject("problem");
            }
        });
    });
}

export function delTags(post_id) {
    const selectQuery = `SELECT * FROM tagtopost WHERE post_id = "${post_id}"`;
    const deleteQuery = `DELETE FROM tagtopost WHERE post_id = "${post_id}"`;

    console.log(`Executing select query: ${selectQuery}`);

    return new Promise((resolve, reject) => {
        pool.query(selectQuery, (selectError, selectResults) => {
            if (selectError) {
                console.log("Error in select function: ", selectError);
                reject("error in select");
            } else if (selectResults.length === 0) {
                // console.log("No matching post_id found.");
                // reject("No matching post_id");
                resolve(selectResults); //no tags added
            } else {
                console.log(`Executing delete query: ${deleteQuery}`);
                pool.query(deleteQuery, (deleteError, deleteResults) => {
                    if (deleteError) {
                        console.log("Error in del function: ", deleteError);
                        reject("error");
                    } else if (deleteResults.affectedRows > 0) {
                        console.log(deleteResults);
                        resolve(deleteResults);
                    } else {
                        console.log("No rows affected.");
                        reject("problem in del");
                    }
                });
            }
        });
    });
}

export function viewPostByUser(user_id){

    var sqlQuery = "SELECT post.post_id, post.type, post.heading, post.content, COUNT(interaction.interact_id) as like_count FROM post LEFT JOIN interaction ON interaction.post_id = post.post_id WHERE post.posted_by = ? GROUP BY post.post_id;";

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [user_id], (err, results) => {
            if(err){
                console.log("Error getting posts for profile page: ", err);
                reject("error");
            }
            else if(results){
                resolve(results);
            }
            else{
                reject("Problem in getting posts for profile page");
            }
        });
    });
}

export function broPosts(username){
    var sqlQuery = "SELECT post.post_id, post.heading, post.content, COUNT(interaction.interact_id) AS like_count FROM post LEFT JOIN interaction ON interaction.post_id = post.post_id INNER JOIN user ON post.posted_by = user.user_id WHERE post.type = 'N' AND user.username = ? GROUP BY post.post_id";

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [username], (err, results) => {
            if(err){
                console.log("Error in fetching bro posts:", err);
                reject("error");
            }
            else if(results){
                resolve(results);
            }
            else{
                reject("Problem in bro post function");
            }
        })
    })
}

export function delPostsofUser(id){
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM post WHERE posted_by = ?", [id], (err, results) => {
            if(err){
                console.log("Error in deleting posts by user:", err);
                reject("error");
            }
            else if(results.affectedRows >= 0){
                resolve(results);
            }
        });
    });
}
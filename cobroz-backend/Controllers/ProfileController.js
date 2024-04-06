import pool from "../Config/db.config.js";

export function getProfile(userId){
    return new Promise((resolve, reject) => {
        pool.query("SELECT name, username, email, phone, bio, posts, broz, lawyer FROM user WHERE user_id = ?", [userId], (err, results) => {
            if(err){
                reject("error");
            }
            else if(results[0]){
                resolve(results[0]);
            }
            else{
                reject("no user");
            }
        });
    });
}

// router.put("/editProfile", async(req, res) => { ... }

export function editProfile(id, name, username, phone , bio) {
    let sqlStatement = "UPDATE user SET ";

    const updateFields = [];
    // adding all the fields to the SQL statement which are edited
    if (name) {
        updateFields.push(`name = '${name}'`);
    }
    if (username) {
        updateFields.push(`username = '${username}'`);
    }
    if (phone) {
        updateFields.push(`phone = '${phone}'`);
    }
    if (bio) {
        updateFields.push(`bio = '${bio}'`);
    }

    sqlStatement += updateFields.join(", ") + ` WHERE user_id = '${id}'`;

    return new Promise((resolve, reject) => {
        pool.query(sqlStatement, (err, results) => {
            if (err) {
                reject("error");
            } else if (results.affectedRows > 0) { // Check if any rows were affected
                resolve(results);
            } else {
                reject("no user");
            }
        });
    });
}

import { experimentalSetDeliveryMetricsExportedToBigQueryEnabled } from "firebase/messaging/sw";
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

export function editProfileBasicData(id, name, username, bio) {
    let sqlStatement = "UPDATE user SET ";
    const updateFields = [];
    const values = [];

    // adding all the fields to the SQL statement which are edited
    if (name) {
        updateFields.push("name = ?");
        values.push(name);
    }
    if (username) {
        updateFields.push("username = ?");
        values.push(username);
    }
    if (bio) {
        updateFields.push("bio = ?");
        values.push(bio);
    }

    sqlStatement += updateFields.join(", ") + " WHERE user_id = ?";
    values.push(id);

    console.log(sqlStatement, values);

    return new Promise((resolve, reject) => {
        pool.query(sqlStatement, values, (err, results) => {
            if (err) {
                console.log("Error: ", err);
                reject("error");
            } else if (results.affectedRows) {
                //console.log(results);
                resolve(results);
            } else {
                reject("no user");
            }
        });
    });
}


export function editPhoneNumber(is, phone){
    return new Promise((resolve, reject) => {
        pool.query("UPDATE user SET phone = ? WHERE user_id = ?", [phone, is], (err, results) => {
            if(err){
                console.log("Error updating phone number: ", err);
                reject("error");
            }
            else if(results.affectedRows === 1){
                resolve(results);
            }
            else{
                reject("problem");
            }
        })
    })
}

export function editPassword(id, newPassword){
    return new Promise((resolve, reject) => {
        pool.query("UPDATE user SET password = ? WHERE user_id = ?", [newPassword, id], (err, results) => {
            if(err){
                console.log("Error in updating password: ", err);
                reject("error");
            }
            else if(results.affectedRows === 1){
                resolve(results);
            }
            else{
                reject("problem");
            }
        })
    })
}

export function addProfessionalData(id, lawyer_id, cllg, year, court, since, lawID){
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO lawyerData(verif_id, lawyer_id, cllg, pass_year, court, since_year, law_id) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [id, lawyer_id, cllg, year, court, since, lawID],
            (err, results) => {
                if(err){
                    reject("error");
                    console.log("Error in adding data:", err);
                }
                else if(results.affectedRows > 0){
                    resolve(results);
                }
                else{
                    reject("Problem occured");
                }
            }
        );
    });
}

export function checkLawDataSerialId(id){
    return new Promise((resolve, reject) => {
        pool.query("SELECT lawyer_id FROM lawyerData WHERE verif_id = ?", [id], (err, results) => {
            if(err){
                reject("error");
                console.log("Error connecting to database");
            }
            else if(results.length > 0){
                resolve(results);
            }
        });
    });
}

export function checkLawId(lawID){
    return new Promise((resolve, reject) => {
        pool.query("SELECT verif_id FROM lawyerData WHERE law_id = ?", [lawID], (err, results) => {
            if(err){
                reject("error");
                console.log("Error connecting to database");
            }
            else if(results[0]){
                resolve(results);
            }
            else{
                reject("Problem");
            }
        });
    });
}

export function generalData(id){

    return new Promise((resolve, reject) => {
        pool.query("SELECT name, username FROM user WHERE user_id = ?", [id], (err, results) => {
            if(err){
                console.log("Error in generalData function: "+ err);
                reject("error");
            }
            else if(results.length > 0){
                resolve(results);
            }
            else{
                reject(new Error("No data found"));
            }
        });
    });
}

export function generalDataviaUsername(username){
    return new Promise((resolve, reject) => {
        pool.query("SELECT user_id, name, username, bio, lawyer FROM user WHERE username = ?", [username], (err, results) => {
            if(err){
                console.log("Error fetching bro details: ", err);
                reject("error");
            }
            else if(results){
                resolve(results);
            }
            else{
                reject("Problem in fetching bro details");
            }
        });
    });
}

export function getPhone(userid){
    const sql = "SELECT phone FROM user WHERE user_id = ?";

    return new Promise((resolve, reject) => {
        pool.query(sql, [userid], (err, results) => {
            if(err){
                console.log("Error in getting phone number: ", err);
                reject("error");
            }
            else{
                console.log(results);
                resolve(results);
            }
        })
    })
}

export function changeType(id, type){
    return new Promise((resolve, reject) => {
        pool.query("UPDATE user SET lawyer = ? WHERE user_id = ?", [type, id], (err, results) => {
            if(err){
                console.log("Error in changing type: ", err);
                reject("error");
            }
            else if(results.affectedRows === 1){
                resolve(results);
            }
            else{
                console.log(results);
                reject("problem");
            }
        })
    })
}

export function deleteLawData(id) {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM lawyerdata WHERE lawyer_id = ?", [id], (err, results) => {
            if(err){
                console.log("Error in deleting data:", err);
                reject("error");
            }
            else if(results.affectedRows >= 1){
                resolve(results);
            }
        });
    });
}

export function delIntByUser(id){
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM interaction WHERE user_id = ?", [id], (err, results) => {
            if(err){
                console.log("Error in deleting likes by user:", err);
                reject("error");
            }
            else if(results.affectedRows >= 0){
                resolve(results);
            }
        });
    });
}
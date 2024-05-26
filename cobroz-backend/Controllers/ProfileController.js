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


export function addProfessionalData(id, lawyer_id, cllg, year, court, since, lawID, copAdd, degAdd){
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO lawyerData(verif_id, lawyer_id, cllg, pass_year, court, since_year, law_id, cop_add, deg_add) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [id, lawyer_id, cllg, year, court, since, lawID, copAdd, degAdd],
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
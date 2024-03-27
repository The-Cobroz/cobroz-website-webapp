import bcrypt from "bcrypt";
import pool from "../Config/db.config.js";
import mysql from "mysql";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


//node mailer setup
let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: "SSL/TLS",
    auth: {
        user: "team@cobroz.com",
        pass: process.env.EMAIL_PASS
    }
});

const welcomeTextUser = "Welcome to Cobroz";

//functions required in authentication of users throughout the platform
//in Promise functions resolve comes before reject in the argument section

export function genPassword(password){
    const newPassword = bcrypt.hash(password, 15);
    return newPassword;
}

export function checkPassword(userPassword, inputPassword){
    console.log(userPassword);
    console.log(inputPassword);
    const val = bcrypt.compareSync(inputPassword, userPassword);
    console.log(val);
    if(val){
        return true;
    }
    else{
        return false;
    }
}

export function checkUser(username, email) {
    return new Promise((resolve, reject) => {
        if (username) {
            pool.query("SELECT user_id, password FROM user WHERE username = ?", [username], (err, results) => {
                if (err) {
                    reject("error");
                }
                if (results && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve("no user");
                }
            });
        } else if(email) {
            pool.query("SELECT user_id FROM user WHERE email = ?", [email], (err, results) => {
                if (err) {
                    reject("error");
                }
                if (results && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve("no user");
                }
            });
        }
    });
}

export function checkEmail(email){
    return new Promise((resolve, reject) => {
        pool.query("SELECT user_id FROM user WHERE email = ?", [email], (err, results) => {
            if(err){
                reject(err);
            }
            else if(results[0]){
                console.log(results[0]);
                resolve("exists");
            }
            else{
                resolve("no user found");
            }
        });
    });
}

export function checkUsername(username){
    return new Promise((resolve, reject) => {
        pool.query("SELECT user_id FROM user WHERE username = ?", [username], (err, results) => {
            if(err){
                reject(err);
            }
            else if(results[0]){
                resolve("exists");
            }
            else{
                resolve("no user found");
            }
        });
    });
}

export function generateUserId(prefix, max){
    var id = Math.floor((Math.random()* max));
    id = prefix + id;

    return id;
}

export function checkUserid(userID){
    return new Promise((resolve, reject) => {
        pool.query("SELECT user_id FROM user WHERE user_id = ?",[userID] , (err, result) => {
            if(err){
                reject(err);
            }
            else if(result.length == 0){
                resolve("OK");
            }
            else{
                resolve("FOUND");
            }
        });
    });
}


export function addUser(userID, name, username, password, email, lawyer){
    var lawyerVal;
    if(lawyer){
        lawyerVal = 1;
    }
    else{
        lawyerVal = 0;
    }

    return new Promise((resolve, reject) => { 
        pool.query("INSERT INTO user(user_id, name, username, password, email, lawyer) VALUES (?, ?, ?, ?, ?, ?)", [userID, name, username, password, email, lawyerVal], (err, results) => { 
            if(err){
                reject(err);
            }
            else if(results){
                //console.log(results);
                resolve(results);
            }
        })
    });
}

export function sendEmailtoUser(to, subject){
    const mailOption = {
        from: "team@cobroz.com",
        to: to,
        subject: subject,
        text: welcomeTextUser
    };

    transporter.sendMail(mailOption, (error, info) => {
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent"+info.response);
        }
    });

};
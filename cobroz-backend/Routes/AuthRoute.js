import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import express from "express";
import sql from "mysql";
import crypto from "crypto";
import session from "express-session";
import bodyParser from "body-parser";
import MySQLStore from "express-mysql-session";
import pool from "../Config/db.config.js";
import { checkUser, genPassword, checkPassword, checkUsername, checkEmail, generateUserId, checkUserid, addUser, sendEmailtoUser } from "../Controllers/AuthControllers.js";
import { config as dotenvConfig } from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import { send } from "process";

dotenvConfig();

const app = express.Router();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

//PASSPORT MIDDLEWARE
passport.serializeUser((user, done) => {
    console.log("Inside");
    done(null, user.user_id);
});

passport.deserializeUser((userId, done) => {
    console.log("Outside");
    pool.query("SELECT * FROM user WHERE user_id = ?", [userId], (error, result) => {
        done(null, result[0]);
    });
});

//serialization is the process of converting a user object into an encrypted token string, which happens when a user logs in. Deserialization is the process of extracting the user information from the token to verify it, which happens when the token is sent to the server.


app.post("/login", async(req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);

    const {username, email, password} = req.body;
    
    try{
        const userValue = await checkUser(username, email);

        console.log("uservalue: " + userValue);
        if(userValue == "error"){
            res.status(205).json({msg:"error connecting to server"});
        }
        else if(userValue == "no user"){
            res.status(204).json({
                message: "No user found with this username"
            });
        }
        else{
            console.log(userValue);
            if(checkPassword(userValue.password, password)){
                const loginCookieValue = jwt.sign({user_id : userValue.user_id}, process.env.LOGIN_KEY);

                res.cookie("loggedCobroz", loginCookieValue);
                console.log("Password verified")
                res.status(200).json({
                    message: "Welcome to Cobroz"
                });
            }
            else{
                res.status(203).json({
                    message: "Wrong Password"
                });
            }
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

app.post("/register", async(req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    try{
        const {name, username, email, password, lawyer} = req.body;

        var userID;

        while(true){
            userID = generateUserId("CU", Math.pow(10,8));
            const checkID = await checkUserid(userID);
            if(checkID === "OK"){
                break;
            }
        } //this loop will generate the unique ID for a user
        console.log(userID)
        const hashPassword = await genPassword(password);

        const newUser = await addUser(userID, name, username, hashPassword, email, lawyer);
        if(newUser){

            sendEmailtoUser(email, "Welcome to Cobroz");

            const cookieValue = jwt.sign(userID, process.env.LOGIN_KEY);
            res.cookie("loggedCobroz", cookieValue);

            res.status(200).json({
                msg: "user added"
            });
        }
        else{
            res.status(205).json({
                msg: "ERROR"
            })
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

app.get("/checkUsername", async(req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    try{
        const {username} = req.params; 

        const usernameExists = await checkUsername(username);
        if(usernameExists === "exists"){
            res.status(205).json({
                message: "User with this username exists"
            });
        }
        else if(usernameExists === "no user found"){
            res.status(200).json({
                msg: "No user found"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

app.get("/checkEmail", async(req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    try{
        const email = req.query.email;
        console.log(email);

        const emailExists = await checkEmail(email);
        if(emailExists === "exists"){
            res.status(205).json({
                message: "User with this username exists"
            });
        }
        else if(emailExists === "no user found"){
            res.status(200).json({
                msg: "No user found"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});


export default app;
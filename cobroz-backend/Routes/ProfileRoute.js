import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import uploadConfig from "../Config/multer.config.js";

//CONTROLLER FUNCTIONS
import {getProfile, addProfessionalData, checkLawId, generalData, generalDataviaUsername, editProfileBasicData, editPhoneNumber, editPassword, getPhone, changeType, checkLawDataSerialId} from "../Controllers/ProfileController.js";
import { genPassword, generateUserId } from "../Controllers/AuthControllers.js";


const router = express.Router();

//MIDDLEWARES
router.use(express.json());
router.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(cookieParser());


//REST APIs

router.get("/userProfile", async(req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);

    //console.log(req.cookies.loggedCobroz);

    const userId = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
    //console.log("id: ", userId.user_id);
    try{
        const userData = await getProfile(userId.user_id);

        if(userData === "error"){
            res.status(205).json({
                message: "Error Fetching data"
            });
        }
        else if(userData === "no user"){
            res.status(204).json({
                message: "User doesn't exists"
            });
        }
        else{
            res.status(200).json(userData);
        }
    }
    catch(error){
        //console.log("In catch block:" + error);
        res.status(500).json(error);
    }
});

router.put("/editProfile", async(req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "PUT");
    res.header("Access-Control-Allow-headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", true);

    const userid = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
    //console.log(userid.user_id);
    const {name, username, bio, phone} = req.body;

    try{
        var edited = null;
        if(phone){
            edited = await editPhoneNumber(userid.user_id, phone);
        }
        else if(name || username || bio){
            edited = await editProfileBasicData(userid.user_id, name, username, bio);
        }

        if(edited){
            res.status(200).json({
                msg: "Edit successful"
            });
        }
        else{
            res.status(204).json({
                msg: "Not successful"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.put("/changePassword", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const user = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
    const newPassword = req.body.password;

    try{
        const hashedPassword = await genPassword(newPassword);
        console.log(hashedPassword);
        const updatesPass = await editPassword(user.user_id, hashedPassword);

        if(updatesPass){
            res.status(200).json(updatesPass);
        }
        else{
            res.status(204).json({
                msg: "Unable to change password"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.get("/userPhone", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const user = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);

    try{
        const userPhone = await getPhone(user.user_id);

        if(userPhone){
            res.status(200).json(userPhone);
        }
        else{
            res.status(204).json({
                msg: "Not found"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.put("/updateType", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const user = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
    const {type} = req.body;

    try{
        const updatedType = await changeType(user.user_id, type);

        if(updatedType){
            res.status(200).json({
                msg: "Update Successful"
            });
        }
        else{
            res.status(204).json({
                msg: "Unable to update"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//LAWYER PROFESSIONAL INFORMATION REST APIs

router.post("/addLawData", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const {cllg, year, court, since, law_id, cop_add, deg_add} = req.body;
    const lawyer_id = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);

    try{
        var id = generateUserId("CLD", 10);
        while(true){
            const checkId = await checkLawDataSerialId(id);
            if(checkId.length > 0){
                id = generateUserId("CLD", 10);
            }
            else{
                break;
            }
        }
        
        const response = await addProfessionalData(id, lawyer_id,cllg,year, court, since, law_id);
        if(response === "error"){
            res.status(205).json({
                msg: "error in adding data, try again later"
            });
        }   
        else if(response === "Problem"){
            res.status(205).json({
                msg: "error in adding data, try again later"
            });
        }
        else{
            res.status(200).json({
                msg : "Details added"
            });
        }
    }
    catch(error){
        console.log("Error:",error);
        res.status(500).json(error);
    }
});

router.get("/checkLawId", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-headers", "Content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const {lawID} = req.query;
    try{

        const response = await checkLawId(lawID);

        if(response === "error" || response === "Problem"){
            res.status(205).json({
                msg: "error connecting"
            });
        }
        else{
            res.status(200).json(response);
        }

    }
    catch(error){
        res.status(500).json(error);
    }
});

router.get("/userGeneralData", async(req, res) => {
    try{
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Credentials", true);

        const user_id = req.query.id;
        console.log(user_id);
        const loggedUser = jwt.decode(req.query.user_id, process.env.LOGIN_KEY);
        console.log(loggedUser);
    
        let userGenData = {};
        if(user_id){
            userGenData = await generalData(user_id);
        }
        else{
            userGenData = await generalData(loggedUser.user_id);
        }

        if(userGenData === "error" || userGenData === "problem"){
            res.status(205).json({
                msg: "error"
            });
        }
        else{
            res.status(200).json(userGenData[0]);
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.get("/broData/:username", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const username = req.params.username;
    console.log(username);
    const user = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
    try{
        if(user.user_id){
            const details = await generalDataviaUsername(username);
            console.log(details);
            if(details){
                res.status(200).json(details[0]);
            }
            else{
                res.status(204).json({
                    msg: "No details found"
                });
            }
        }
        else{
            res.status(404).json({
                msg: "Not authorized"
            });
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})


export default router;
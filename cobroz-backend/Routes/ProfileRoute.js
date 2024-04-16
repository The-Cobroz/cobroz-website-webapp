import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import uploadConfig from "../Config/multer.config.js";

//CONTROLLER FUNCTIONS
import {getProfile, editProfile, addProfessionalData, checkLawId} from "../Controllers/ProfileController.js";

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
        const resultToEdit = await editProfile(userid.user_id, name, username, phone, bio);

        if(resultToEdit === "error"){
            res.status(205).json({
                msg: "error connecting to database"
            });
        }
        else if(resultToEdit === "no user"){
            res.status(204).json({
                msg: "no user found"
            });
        }
        else{
            res.status(200).json({
                msg: "Edit successful"
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
        var id = "iheiofoisdhfls";
        const response = await addProfessionalData(id, lawyer_id,cllg,year, court, since, law_id, cop_add, deg_add);
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


export default router;
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

//middleware functions

const router = express.Router();

//MIDDLEWARE dependencies
router.use(express.json());
router.use(cors(
    {
        origin: "https://localhost:3000",
        credentials: true
    }
));
router.use(cookieParser());

//REST APIs
router.post("/new", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const userId = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
    const {heading, content, tags} = req.body;

    try{
        
    }
    catch(error){
        res.status(500).json(error);
    }
})
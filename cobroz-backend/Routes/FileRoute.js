import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import uploadConfig from "../Config/multer.config.js";

import {addFileDetails, checkFileId} from "../Controllers/FileController.js";
import {generateUserId} from "../Controllers/AuthControllers.js"

const router = express.Router();

// middlewares for fileroute

router.use(express.json());
router.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));
router.use(cookieParser());

//REST APIs

router.post("/upload", uploadConfig.single('file'), async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const {as} = req.body;
    const lawyerId = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);

    try{
        var fileId;
        while(true){
            fileId = generateUserId("CF", Math.pow(10,20));
            var checkId = await checkFileId(fileId);
            if(!checkId){
                break;
            }
        }

        const response = await addFileDetails(fileId, lawyerId.user_id, as, req.file.path);
        if(response === "error" || response === "Problem"){
            res.status(205);
        }
        else{
            res.status(200).json({
                msg: "File Uploaded Successfully",
                uploadId: fileId
            });
        }
    }
    catch(error){
        console.log("Error encountered in API")
        res.status(500).json(error);
    }
});

export default router;
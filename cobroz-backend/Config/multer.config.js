import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function(req, file, cb){ //cb is the call back function
        const idObj = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
        const id = idObj.user_id;
        
        var fileDestinationPath = `../uploads/${id}`;//folder path for the particular user

        if(fs.existsSync(fileDestinationPath)){ //checking if the folder exists
            cb(null, fileDestinationPath);
        }
        else{ 
            fs.mkdirSync(fileDestinationPath); //creating folder if it doesn't exists
            cb(null, fileDestinationPath);
        }
    },

    filename: function(req, file, cb){
        var newFileName = file.originalname + Date.now(); //unique file name by adding the timestamp to the file's name
        cb(null, newFileName);
    }
});

const uploadConfig = multer({storage: storage});

export default uploadConfig;
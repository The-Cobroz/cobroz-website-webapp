import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";

// const __dirname = path.dirname(new URL(import.meta.url).pathname);//absolute oath for the Node directory
const __dirname = process.cwd() //returns the current working directory
console.log(__dirname);


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const idObj = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
        const id = idObj.user_id;
        
        const fileDestinationPath = path.join(__dirname, "..", "cobroz-backend", "upload", id); //using the absolute path for the user's folder

        fs.stat(fileDestinationPath, function(err, stats) {
            if (err) {
                if (err.code === 'ENOENT') { // Directory doesn't exist
                    fs.mkdir(fileDestinationPath, { recursive: true }, function(err) {
                        if (err) {
                            return cb(err);
                        }
                        cb(null, fileDestinationPath);
                    });
                } else {
                    return cb(err);
                }
            } else {
                if (stats.isDirectory()) {
                    cb(null, fileDestinationPath);
                } else {
                    return cb(new Error(`${fileDestinationPath} is not a directory`));
                }
            }
        });
    },

    filename: function(req, file, cb) {
        var newFileName = Date.now() + file.originalname;
        cb(null, newFileName);
    }
});

const uploadConfig = multer({ storage: storage });

export default uploadConfig;

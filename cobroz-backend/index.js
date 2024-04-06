import express from "express";
import cors from "cors";
import sql from "mysql";
import pool from "./Config/db.config.js";
import jwt from "jsonwebtoken";
import multer from "multer";

//Route imports
import authRoute from "./Routes/AuthRoute.js";
import profileRoute from "./Routes/ProfileRoute.js";

const app = express();

//utilities
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.options("*", cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origins", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

//testing database connectivity
// pool.query("SELECT * FROM user WHERE username = ?", ["ks"], (err, results) => {
//     if(err){
//         console.log(err.stack);
//         return;
//     }
//     if(results){
//         console.log(results);
//     }
// })

// multer storage

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'upload/')
    },
    filename: function(req, file, cb){
        const userid = jwt.decode(req.cookies.loggedCobroz, process.env.LOGIN_KEY);
        var newFileName = file.originalname + Date.now() + "by" + userid.user_id;

        cb(null, newFileName);
    }
})


//Routes
app.get("/",(req, res) => {
    res.json({message: "OK"});
});

app.use("/auth", authRoute);
app.use("/profile", profileRoute);

app.listen(5000, () => {
    console.log("server connected");
});
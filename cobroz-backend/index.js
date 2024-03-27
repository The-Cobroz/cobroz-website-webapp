import express from "express";
import cors from "cors";
import sql from "mysql";
import pool from "./Config/db.config.js";

//Route imports
import authRoute from "./Routes/AuthRoute.js";

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

//Routes
app.get("/",(req, res) => {
    res.json({message: "OK"});
});

app.use("/auth", authRoute);

app.listen(5000, () => {
    console.log("server connected");
});
import express from "express";
import cors from "cors";
import sql from "mysql";

const app = express();

const connectSql = sql.createConnection({
    host: "local",
    port: 3306,
    user: "root",
    password: "|0799Vd2",
    database: "cobrozwebapp"
});

connectSql.connect((error) => {
    if(error){
        console.log("Error connecting to Database");
    }

    console.log("Database Connected");  
});

app.use(express.json());
app.use(cors());

//Routes


app.listen(5000, () => {
    console.log("server connected");
})
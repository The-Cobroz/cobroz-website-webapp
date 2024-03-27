import sql from "mysql";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const pool = sql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'cobrozwebapp',
    password: process.env.DB_PSWD,
    timeout: 60000
});

export default pool;
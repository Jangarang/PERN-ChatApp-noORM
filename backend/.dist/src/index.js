import "./config/env.js";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { dbConnection, dbSetup } from "./db/db.js";
import { dbReset } from "./db/reset-db.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(cookieParser()); // for parsing cookies
app.use(express.json()); //parsing request data
/** Two different endpoints */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
/*DB connection*/
await dbConnection();
// await dbSetup();
//await dbDropUsers();
//TODO where to put this? 
if (process.env.NODE_ENV === 'development') {
    process.stdin.on('data', async (data) => {
        const input = data.toString().trim();
        if (input === 'drop') {
            console.log('Dropping tables...');
            dbReset().catch((err) => {
                console.error('Error dropping tables: ', err);
                process.exit(1);
            });
            console.log('Tables dropped 🚨');
        }
    });
}
;
if (process.env.NODE_ENV === 'development') {
    process.stdin.on('data', async (data) => {
        const input = data.toString().trim();
        if (input === 'create tables') {
            console.log('Creating tables...');
            dbSetup().catch((err) => {
                console.error('Error dropping tables: ', err);
                process.exit(1);
            });
            console.log('Tables created!');
        }
    });
}
;

import "./config/env.js";
import express from "express"
import cors from "cors";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "@/routes/message.route.js";
import { dbConnection} from "./db/db-init.js";
import cookieParser from "cookie-parser";
import '@/utils/dbTester.js';

const app = express();


app.use(cors({ origin: "http://localhost:5000", credentials: true }));

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); //parsing request data

/** Two different endpoints */
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);



app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

/*DB connection*/
await dbConnection();
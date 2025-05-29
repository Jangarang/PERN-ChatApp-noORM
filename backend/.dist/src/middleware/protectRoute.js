import jwt from 'jsonwebtoken';
import { find_by_id_query } from '../db/find_queries.js';
;
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }
        ;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ", decoded);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        ;
        const user = await find_by_id_query(decoded.userId);
        console.log('userId: ', user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        ;
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export default protectRoute;

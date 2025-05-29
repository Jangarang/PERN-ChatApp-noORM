import jwt,  {type JwtPayload } from 'jsonwebtoken';

import type { Request, Response, NextFunction } from 'express';
import { find_by_id_query, find_username_query } from '../db/find_queries.js';
import type { User } from '../db/types.js';

interface DecodedToken extends JwtPayload {
    userId: string;
};

/** Move this to a different file */
declare global {
    namespace Express {
        export interface Request {
            user?: User
        }
    }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction):Promise<any> => {

    try {
        const token = req.cookies.jwt;
        console.log(token); 
        if (!token) {
            return res.status(401).json({error: "Unauthorized - No token provided"});
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        console.log("decoded: ",decoded);

        if (!decoded) {
            return res.status(401).json({error: "Unauthorized - Invalid Token"});
        };

        const user = await find_by_id_query(decoded.userId);
    
        console.log('userId: ', user);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        };

        req.user = user;


        next();
    } catch (error: any) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }

};

export default protectRoute;
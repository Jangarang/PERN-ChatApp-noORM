import jwt,  {type JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN } from '@/constants.js';
import type { Request, Response, NextFunction } from 'express';
import { find_by_id_query } from '../db/find_user_queries.js';
import type { UserExpiry } from '@/db/types.js';

interface DecodedToken extends JwtPayload {
    userId: string;
};
// Need to understand how this works
/** Move this to a different file */
declare global {
    namespace Express {
        export interface Request {
            user?: UserExpiry
        }

    }
}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const protectRoute = async (req: Request, res: Response, next: NextFunction):Promise<any> => {

    try {
        console.log("cookies ", req.cookies);
        const token = req.cookies.accessTokenCookie;
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

      
        var expiry;
        if (typeof decoded === 'object' && decoded !== null && 'exp' in decoded && decoded.exp !== undefined) {
           req.user = {
            ...user,
            expiry: decoded.exp * 1000
        }
        }
        

        next();
    } catch (error: any) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }

};

export default protectRoute;
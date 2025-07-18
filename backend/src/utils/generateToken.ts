import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import type { User } from '../db/types.js';

const  generateAccessTokenAndCookie = (user: User, res: Response) => {
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!,  {
        expiresIn: "10s"
    });

    //console.log('/utils/generateToken access token: ', token);
    res.cookie("accessTokenCookie", token, {
        httpOnly: true, // prevent XSS cors site scripting
        sameSite: "strict", // CSRF
        secure: process.env.NODE_ENV !== "development" // HTTPS
    });

    return token;
}

export default  generateAccessTokenAndCookie;
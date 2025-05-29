import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateCookie = (token: string, res: Response) => {
    res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 1000, //MS
            httpOnly: true, // prevent XSS cors site scripting
            sameSite: "strict", // CSRF
            secure: process.env.NODE_ENV !== "development" // HTTPS
        });
};